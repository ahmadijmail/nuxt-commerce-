const { sequelize } = require("../../models/index");
const { Op } = require("sequelize");
const uuid = require("uuid");

const {
  createProductService,
  updateRecordStatus,
  updateUsers,
  createCartService,
} = require("../../services/productService");
const { createUserService } = require("../../services/users");
const { whereINDataType, wherINJSON } = require("../../shared/queryBuilder");

const createProduct = async (req, res) => {
  try {
    let { name, price, users, image, date } = req.body;
    console.log(req.body);
    if (!users) users = [];
    const id = uuid.v4();
    if (!date) date = getCurrentDateAndTime();
    const ProductDTO = {
      id,
      name,
      price,
      date: date ? date : datefun,
      image,
    };
    const newProduct = await createProductService(ProductDTO);
    const addedUsers = await assigneUsersToTask(id, users);
    res.status(201).json({ ...newProduct.dataValues, users: addedUsers });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const getProducts = async (req, res) => {
  try {
    let {
      id,
      name,
      price,
      date,
      dateFrom,
      dateTo,
      userId,
      recordStatus,
      offset,
      limit,
    } = req.body;
    if (!recordStatus) recordStatus = "LATEST";
    let dateQuery;
    if (dateFrom || dateTo) {
      dateQuery = setCorrentQueryAccordRange(dateFrom, dateTo);
      console.log(dateQuery, "dateQuery");
    }
    /////////
    if (limit && offset) {
      offset = (offset - 1) * limit;
    }
    /////////
    let productIdsFromUserId;
    if (userId) productIdsFromUserId = await findproductsIdsByUserId(userId);
    let products = await sequelize.models.Product.findAndCountAll({
      where: {
        [Op.and]: [
          id ? whereINDataType("id", "eq", id) : "",
          name ? whereINDataType("name", "like", name) : "",
          price ? whereINDataType("name", "like", price) : "",
          dateQuery ? whereINDataType(...dateQuery) : "",
          productIdsFromUserId
            ? whereINDataType("id", "in", productIdsFromUserId)
            : "",
          whereINDataType("recordStatus", "eq", recordStatus),
        ],
      },
      offset,
      limit,
    });
    products.rows = await getUsersForTasks(products.rows);
    res
      .status(200)
      .json({ pages: Math.ceil(products.count / limit), ...products });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await updateRecordStatus("DELETED", id);
    const task = await sequelize.models.Product.findOne({
      where: {
        id: id,
        recordStatus: "DELETED",
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id, name, price, image, users, date } = req.body;
    if (!users) users = [];
    const oldProduct = await sequelize.models.Product.findOne({
      where: {
        id: id,
        recordStatus: "LATEST",
      },
    });

    if (!date) datefun = getCurrentDateAndTime();
    await updateRecordStatus("UPDATED", id);
    await updateUsers(id, "UPDATED");

    const ProductDTO = {
      id,
      name: name ? name : oldProduct.name,
      price: price ? price : oldProduct.price,
      image: image ? image : oldProduct.image,
      date: date ? date : datefun,
    };

    const newProduct = await createProductService(ProductDTO);

    addedUsers = await assigneUsersToTask(id, users);

    res.status(200).json({ ...newProduct.dataValues, users: addedUsers });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const addTocart = async (req, res) => {
  try {
    let { name, price, image } = req.body;
    console.log(req.body);
    const id = uuid.v4();
    const createCart = {
      id,
      name,
      price,
      image,
    };

    const newCart = await createCartService(createCart);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

const getCart = async (req, res) => {
  try {
    let { id, name, price, recordStatus } = req.body;
    if (!recordStatus) recordStatus = "LATEST";

    let cart = await sequelize.models.Cart.findAndCountAll({
      where: {
        [Op.and]: [
          id ? whereINDataType("id", "eq", id) : "",
          name ? whereINDataType("name", "like", name) : "",
          price ? whereINDataType("name", "like", price) : "",
          whereINDataType("recordStatus", "eq", recordStatus),
        ],
      },
    });

    let totalprices = 0;
    cart.rows.map((el) => (totalprices += el.price));

    res.status(200).json({ totalprices: totalprices, ...cart });
  } catch (error) {
    res.status(400).json(error.stack);
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  addTocart,
  getCart,
};

const setCorrentQueryAccordRange = (dueDateFrom, dueDateTO) => {
  try {
    if (!dueDateFrom) return ["date", "lte", dueDateTO];
    else if (!dueDateTO) return ["date", "gte", dueDateFrom];
    else return ["date", "between", [dueDateFrom, dueDateTO]];
  } catch (error) {
    throw error;
  }
};

const assigneUsersToTask = async (id, users) => {
  try {
    let response = [];
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      const userDTO = {
        id: uuid.v4(),
        productId: id,
        user: element,
      };
      const newUser = await createUserService(userDTO);
      response.push(newUser);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const getUsersForTasks = async (products) => {
  try {
    let response = [];
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      const users = await sequelize.models.Users.findAll({
        where: {
          recordStatus: "LATEST",
          productId: element.id,
        },
      });
      response.push({ ...element.dataValues, users });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const findproductsIdsByUserId = async (id) => {
  try {
    const users = await sequelize.models.Users.findAll({
      where: {
        [Op.and]: [
          whereINDataType("recordStatus", "eq", "LATEST"),
          wherINJSON("user", "eq", "id", id),
        ],
      },
    });
    console.log(users);
    const arr = users.map((ele) => ele.productId);

    console.log(arr);
    return arr;
  } catch (error) {}
};

const getCurrentDateAndTime = () => {
  try {
    let today = new Date();
    let CurrentDate = new Date(
      Date.now() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .substr(0, 10);
    let hour =
      today.getHours() + "".length == 1
        ? "0" + today.getHours()
        : today.getHours() + "";
    let min = today.getMinutes() + "";
    if (hour.length === 1) hour = "0" + hour;
    if (min.length === 1) min = "0" + min;
    let currentTime = hour + ":" + min;
    return CurrentDate;
  } catch (error) {
    throw error;
  }
};
