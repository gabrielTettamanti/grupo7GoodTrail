//******* Require´s *******
const express = require("express");
const productRouter = express.Router();
const multer = require('multer');
const authenticatorMiddleware = require('../middlewares/authenticatorMiddleware');
const editionMiddleware = require('../middlewares/editionExperienceMiddleware');
const creationMiddleware = require('../middlewares/creationExperienceMiddleware');

//******* Product´s controller*******
const productController = require("../controllers/productController");

//******* Multer configuration *******
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd()+'/public/img/cardImages');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + '-' + file.originalname;
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

//***** Get Product filtered *****/
productRouter.get('/filter/:page', productController.filterExperiences);

productRouter.get('/filterPrice/:page', productController.filterExperiencesByPrice);

//******* Get Product Detail *******
productRouter.get("/productDescription/:id", productController.productDescription);

//******* Product Edition *******
productRouter.get("/editor", authenticatorMiddleware, productController.listProductsToEdit)
productRouter.get("/editor/:id",authenticatorMiddleware, productController.editor); 
productRouter.put("/editor/:id", upload.single('image'), editionMiddleware, productController.update);

//******* Product Destroy *******
productRouter.delete("/delete/:id", authenticatorMiddleware, productController.destroy);

//******* Product Creation *******
productRouter.get("/creation", authenticatorMiddleware, productController.creation);
productRouter.post("/creation", upload.single('image') , creationMiddleware, productController.store);

module.exports = productRouter;