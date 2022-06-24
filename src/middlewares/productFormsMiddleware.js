//******* Require´s *******
const { body } = require('express-validator');

const validateForm = [
    body('name').notEmpty().withMessage('La experiencia debe tener un nombre').bail()
        .isAlpha().withMessage('El nombre de la experiencia solo puede contener letras')
        .isLength({ min: 4 }).withMessage('El nombre de la experiencia debe contener más de 3 caracteres'),
    body('description').notEmpty().withMessage('La experiencia debe tener una descripción').bail()
        .isLength({ min: 10 }).withMessage('La descripción de la experiencia debe tener más de 9 caracteres'),
    body('ubication').notEmpty().withMessage('La experiencia debe tener un destino').bail(),
    body('peopleQuantity').notEmpty().withMessage('La experiencia debe tener la cantidad de personas').bail()
        .isInt().withMessage('La cantidad de personas debe ser un número'),
    body('duration').notEmpty().withMessage('La experiencia debe tener una duración'),
    body('price').notEmpty().withMessage('La experiencia debe tener un precio')
        .isNumeric().withMessage('El precio debe contener solo números')  
];

module.exports = validateForm;
