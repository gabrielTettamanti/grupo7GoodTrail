//***** Require´s *****/
const { Router } = require('express');
const apiRouter = Router();
const experienceRouter = require('./routes/product.router');

apiRouter.use('/products', experienceRouter);

module.exports = apiRouter;
