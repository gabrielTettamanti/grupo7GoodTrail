const express = require("express");
const router = express.Router()
const mainController = require("../controllers/mainController")

router.get("/", mainController.index)

router.get("/experienceCatalog", mainController.experienceCatalog )

router.get("/productDescription", mainController.productDescription )

router.get("/buyCart", mainController.buyCart )

router.get("/login", mainController.login)

router.get("/registerFormulary", mainController.registerFormulary)

router.get("*", mainController.notFound)

module.exports = router