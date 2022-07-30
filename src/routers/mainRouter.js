//******* Require´s *******
const express = require("express");
const router = express.Router()
const mainController = require("../controllers/mainController")

//******* Get home view*******
router.get("/", mainController.index)

//******* Search *******
router.get("/search/:page", mainController.search);

//******* Get experience catalog view *******
router.get("/experienceCatalog/:page", mainController.experienceCatalog )

//******* Get not found view *******
router.get("*", mainController.notFound)

module.exports = router