////// Require´s ///////
const express = require("express");
const userRouter = express.Router()
const userAPI = require("../../services/user.api")

//******* Get User *******
userRouter.get('/users', userAPI.usersList);
