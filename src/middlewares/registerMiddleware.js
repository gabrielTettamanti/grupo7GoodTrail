const { body } = require('express-validator');

const validateRegister = [
    body("userEmail").notEmpty().withMessage("Debe tener un email").bail()
        .isEmail().withMessage("Debe tener formato de email"),
    body("userName").notEmpty().withMessage("Debes escribir un nombre"),
    body("userPassword").notEmpty().withMessage("Debes escribir una contraseña"),
    body("passwordConfirmation").notEmpty().withMessage("Debes escribir una contraseña de confirmación")
];

module.exports = validateRegister;