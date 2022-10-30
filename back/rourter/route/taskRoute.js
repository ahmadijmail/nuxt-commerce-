const express = require("express");
const taskRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const { createProduct,getProducts,updateProduct,deleteProduct } = require("../controller/store");

//////////////////////////////

taskRoute.post("/createproduct", createProduct);
 taskRoute.post("/getProducts", getProducts);
 taskRoute.post("/deleteProduct", deleteProduct);
 taskRoute.post("/updateProduct", updateProduct);

/// exports
module.exports = taskRoute;
