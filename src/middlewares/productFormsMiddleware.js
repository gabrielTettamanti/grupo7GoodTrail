//******* Require´s *******
const { body } = require('express-validator');

const validateForm = [
    body('name').notEmpty().withMessage('La experiencia debe tener un nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre de la experiencia debe contener al menos 5 caracteres'),
    body('description').notEmpty().withMessage('La experiencia debe tener una descripción').bail()
        .isLength({ min: 20 }).withMessage('La descripción de la experiencia debe tener al menos 20 caracteres'),
    body('location').notEmpty().withMessage('La experiencia debe tener un destino').bail()
    .isLength({ min: 20 }).withMessage('La descripción de la experiencia debe tener al menos 2 caracteres'),
    body('people_quantity').notEmpty().withMessage('La experiencia debe tener la cantidad de personas').bail()
        .isInt({min:1}).withMessage('La cantidad de personas debe ser un número mayor a cero'),
    body('duration').notEmpty().withMessage('La experiencia debe tener una duración')
    .isInt({min:1}).withMessage('La duración de la experiencia debe ser mayor a cero'),
    body('price').notEmpty().withMessage('La experiencia debe tener un precio')
        .isNumeric().withMessage('El precio debe contener solo números')  
];

module.exports = validateForm;
