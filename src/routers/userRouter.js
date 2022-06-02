//******* Require´s *******
const express = require("express");
const userRouter = express.Router()
const userController = require("../controllers/userController")

//******* Get experience buy cart view *******
userRouter.get("/buyCart", userController.buyCart)

//******* Get Register form view *******
userRouter.get("/registerFormulary", userController.registerFormulary)

//******* Register User *******
userRouter.post('/registerFormulary', userController.saveUser);

//******* Get Login form view *******
userRouter.get("/login", userController.login)

//******* User Loggin *******
userRouter.post('/login', userController.checkLogin);

//******* Get User Profile *******
userRouter.get('/profile', userController.userProfile);

module.exports = userRouter