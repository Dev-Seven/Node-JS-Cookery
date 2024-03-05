const router = require('express').Router()
const userController = require('../controller/userController');
const { avatarImage } = require('../middleware/upload.middleware');
// const validator = require('../validators/auth.validators');
 
// TESTIMONIAL 
router.post('/user/editProfile',  avatarImage.single('image'), userController.editProfile);
router.post('/user/register_email', userController.register_email);
router.post('/user/verify_email_otp', userController.verify_email_otp);
router.post('/user/deleteAccount',  userController.deleteAccount);


module.exports = router