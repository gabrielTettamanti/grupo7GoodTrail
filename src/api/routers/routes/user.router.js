////// Require´s ///////
const { Router } = require('express');
const userRouter = Router();
const userAPI = require('../../services/user.api');

//******* Get User List *******
userRouter.get('/', userAPI.usersList);

//******* Get User *******
userRouter.get('/:id', userAPI.getUser);

module.exports = userRouter;
