const express = require("express");
const taskRoute = express.Router();

/* -------------------------------------------------------------------------------------------------------------- */

const { createProduct,getProducts,updateProduct,deleteProduct,addTocart,getCart } = require("../controller/store");

//////////////////////////////

taskRoute.post("/createproduct", createProduct);
 taskRoute.post("/getProducts", getProducts);
 taskRoute.post("/deleteProduct", deleteProduct);
 taskRoute.post("/updateProduct", updateProduct);
 taskRoute.post("/addtocart", addTocart);
 taskRoute.post("/getcart", getCart);
/// exports
module.exports = taskRoute;
