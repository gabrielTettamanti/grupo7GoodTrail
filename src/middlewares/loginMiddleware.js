const { body } = require('express-validator');

const validateLogin = [
    body("userEmail").notEmpty().withMessage("Debe tener un email").bail()
        .isEmail().withMessage("Debe tener formato de email"),
    body("userPassword").notEmpty().withMessage("Debes escribir una contraseña"),
];

module.exports = validateLogin;