//******* Require´s *******
const express = require("express");
const userRouter = express.Router()
const userController = require("../controllers/userController")
const multer = require('multer');
const authenticatorMiddleware = require('../middlewares/authenticatorMiddleware');
const accessUserMiddleware = require('../middlewares/accessUserMiddleware');
const registerMiddleware = require("../middlewares/registerMiddleware")
const loginMiddleware = require("../middlewares/loginMiddleware")
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

userRouter.post("/productDescription/:id", authenticatorMiddleware, userController.addBuyCart);

//******* Get Register form view *******
userRouter.get("/registerFormulary", accessUserMiddleware, userController.registerFormulary)

//******* Register User *******
userRouter.post('/registerFormulary', upload.single('profileImage'), registerMiddleware, userController.saveUser);

//******* Get Login form view *******
userRouter.get("/login", accessUserMiddleware, userController.login)

//******* User Loggin *******
userRouter.post('/login',  loginMiddleware, userController.checkLogin);

//******* Get User Profile *******
userRouter.get('/profile', authenticatorMiddleware, userController.userProfile);

//******* Update User Profile *******
userRouter.put('/update', userController.updateUser);

//******* Get user password configuration view *******
userRouter.get('/password', userController.passwordConfiguration);

//******* Get User Logout *******
userRouter.get("/logout", authenticatorMiddleware, userController.logout)

//******* Get Reset password view *******
userRouter.get('/reset', userController.getResetPassword);

//******* Sending email with random password *******
userRouter.post('/sendEmail', userController.sendPasswordEmail);

module.exports = userRouter