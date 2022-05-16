const express = require("express");
const userRouter = express.Router()
const userController = require("../controllers/userController")

userRouter.get("/buyCart", userController.buyCart)

userRouter.get("/login", userController.login)

userRouter.get("/registerFormulary", userController.registerFormulary)

module.exports = userRouter