//***** Require´s *****/
const { Router } = require('express');
const productRouter = Router();
const ExpierenceAPI = require('../../services/experience.api');

//***** Get Experiences *****/
productRouter.get('/', ExpierenceAPI.getExperiences);

//***** Get Experience by ID *****/
productRouter.get('/:id', ExpierenceAPI.getExperience);

module.exports = productRouter;