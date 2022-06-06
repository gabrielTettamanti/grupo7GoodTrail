//******* Require´s *******
const express = require("express");
const userRouter = express.Router()
const userController = require("../controllers/userController")
const multer = require('multer');
const authenticatorMiddleware = require('../middlewares/authenticatorMiddleware');

//******* Multer configuration *******
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd()+'/public/img/usersImages');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + '-' +file.originalname;
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

//******* Get experience buy cart view *******
userRouter.get("/buyCart", authenticatorMiddleware, userController.buyCart)

//******* Get Register form view *******
userRouter.get("/registerFormulary", userController.registerFormulary)

//******* Register User *******
userRouter.post('/registerFormulary', upload.single('profileImage'), userController.saveUser);

//******* Get Login form view *******
userRouter.get("/login", userController.login)

//******* User Loggin *******
userRouter.post('/login', userController.checkLogin);

//******* Get User Profile *******
userRouter.get('/profile', authenticatorMiddleware, userController.userProfile);

module.exports = userRouter