const router = require("express").Router();
const feelController = require("../controller/feelController");

// FEEL Routes
router.post("/feel/insertFeel", feelController.insertFeel);
router.post("/feel/editFeel", feelController.editFeel);
router.post("/feel/deleteFeel", feelController.deleteFeel);
router.post("/feel/getAllFeel", feelController.getAllFeel);

module.exports = router;
