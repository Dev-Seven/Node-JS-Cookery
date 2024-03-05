const router = require("express").Router();
const CatagoryController = require("../controller/CatagoryController");

// Catagory Routes
router.post("/catagory/insertCatagory", CatagoryController.insertCatagory);
router.post("/catagory/editCatagory", CatagoryController.editCatagory);
router.post("/catagory/deleteCatagory", CatagoryController.deleteCatagory);
router.post("/catagory/getAllCatagory", CatagoryController.getAllCatagory);
router.post("/catagory/getCategoryById", CatagoryController.getCategoryById);

module.exports = router;
