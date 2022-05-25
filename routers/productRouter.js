//******* Require´s *******
const express = require("express");
const productRouter = express.Router();
const multer = require('multer');
const path = require('path');

//******* Product´s controller*******
const productController = require("../controllers/productController");

//******* Multer configuration *******
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/img/cardImages');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + '-' + file.originalname + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

//******* Get Product Detail *******
productRouter.get("/productDescription/:id", productController.productDescription);

//******* Product Edition *******
productRouter.get("/editor/:id", productController.editor);

//******* Product Creation *******
productRouter.get("/creation", productController.creacion);
productRouter.post("/creation", upload.array('image') , productController.store);

module.exports = productRouter;