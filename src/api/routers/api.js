//***** Require´s *****/
const { Router } = require('express');
const apiRouter = Router();
const experienceRouter = require('./routes/product.router');
const userRouter = require('./routes/user.router');

apiRouter.use('/products', experienceRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;