const router = require('express').Router()
const homeCatagoryController = require('../controller/home-categoryController');
 
// Catagory Routes
router.post('/home-catagory/insertHomeCatagory',  homeCatagoryController.insertHomeCatagory);
router.post('/home-catagory/editHomeCatagory',  homeCatagoryController.editHomeCatagory);
router.post('/home-catagory/deleteHomeCatagory',  homeCatagoryController.deleteHomeCatagory);
router.post('/home-catagory/getAllHomeCatagory',  homeCatagoryController.getAllHomeCatagory);

module.exports = router