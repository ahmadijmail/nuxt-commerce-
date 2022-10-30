const { sequelize } = require("../models/index");

const createProductService = async (ProductDTO) => {
  try {
    return await sequelize.models.Product.create(ProductDTO);
  } catch (error) {
    throw error;
  }
};

const updateRecordStatus = async (newStatus, id) => {
  try {
    return await sequelize.models.Product.update(
      {
        recordStatus: newStatus,
      },
      {
        where: {
          id: id,
          recordStatus: "LATEST",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const updateUsers = async (
  id,

  recordStatus
) => {
  try {
    return await sequelize.models.Users.update(
      {
        recordStatus: recordStatus,
      },
      {
        where: {productId:id, recordStatus: "LATEST" },
      }
    );
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createProductService,
  updateRecordStatus,
  updateUsers,
};
