const { body } = require('express-validator');
const path = require('path');

const validateRegister = [
    body("userEmail").notEmpty().withMessage("Debe tener un email").bail()
        .isEmail().withMessage("Debe tener formato de email"),
    body("userName").notEmpty().withMessage("Debes escribir un nombre").isLength({ min: 2 }).withMessage("Debe tener por lo menos 2 caracteres."),
    body("userPassword").notEmpty().withMessage("Debes escribir una contraseña").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener más de 8 caracteres"),
    body("passwordConfirmation").notEmpty().withMessage("Debes escribir una contraseña de confirmación").bail()
        .custom((password, { req }) => {
            if(password != req.body.userPassword) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    body("profileImage").bail().custom((value, { req }) => {
        let file = req.file == undefined ? false : req.file.filename;
        console.log(file)
		let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];
        if(file){
            let fileExtension = path.extname(file);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`La imagen debe ser ${acceptedExtensions.join(', ')}`);
			}
        }
        return true;
	    })
];

module.exports = validateRegister;