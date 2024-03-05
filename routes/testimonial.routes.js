const router = require('express').Router()
const testimonialController = require('../controller/testimonialController');
const { uploadTestimonialImage } = require('../middleware/upload.middleware');
// const validator = require('../validators/auth.validators');
 
// TESTIMONIAL 
router.post('/testimonial/creatTestimonial',  uploadTestimonialImage.single('image'), testimonialController.creatTestimonial);
router.post('/testimonial/editTestimonial',  uploadTestimonialImage.single('image'), testimonialController.editTestimonial);
router.post('/testimonial/deleteTestimonial',  testimonialController.deleteTestimonial);
router.post('/testimonial/getAllTestimonial',  testimonialController.getAllTestimonial);

module.exports = router