//***** Require´s */
const { Router } = require('express');
const apiRouter = Router();
const experienceRouter = require('./routes/product.router');

apiRouter.use('/product', experienceRouter);

module.exports = apiRouter;
