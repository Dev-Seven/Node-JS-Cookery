const router = require("express").Router();
const styleController = require("../controller/styleController");

// FEEL Routes
router.post("/style/insertStyle", styleController.insertStyle);
router.post("/style/editStyle", styleController.editStyle);
router.post("/style/deleteStyle", styleController.deleteStyle);
router.post("/style/getAllStyle", styleController.getAllStyle);

module.exports = router;
