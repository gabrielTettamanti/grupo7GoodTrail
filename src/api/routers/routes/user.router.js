////// Require´s ///////
const { Router } = require('express');
const userRouter = Router();
const userAPI = require("../../services/user.api");

//******* Get User *******
userRouter.get('/', userAPI.usersList);

module.exports = userRouter;
