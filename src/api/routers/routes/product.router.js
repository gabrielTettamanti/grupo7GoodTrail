//***** Require´s *****/
const { Router } = require('express');
const productRouter = Router();
const ExpierenceAPI = require('../../services/experience.api');

productRouter.get('/:id', ExpierenceAPI.getExperience);

module.exports = productRouter;