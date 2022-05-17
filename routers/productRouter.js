const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController")

productRouter.get("/productDescription/:id", productController.productDescription)

productRouter.get("/editor", productController.editor)

productRouter.get("/creacion", productController.creacion)

module.exports = productRouter