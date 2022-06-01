//******* Require´s *******
const express = require("express");
const userRouter = express.Router()
const userController = require("../controllers/userController")

//******* Get experience buy cart view *******
userRouter.get("/buyCart", userController.buyCart)

//******* Get Login form view *******
userRouter.get("/login", userController.login)

//******* Get Register form view *******
userRouter.get("/registerFormulary", userController.registerFormulary)

module.exports = userRouter