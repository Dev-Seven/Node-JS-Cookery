const router = require('express').Router()
const FAQController = require('../controller/FAQController');
 
// FAQ 
router.post('/frequently-asked-questions/createQuestion',  FAQController.createQuestion);
router.post('/frequently-asked-questions/editQuestion',  FAQController.editQuestion);
router.post('/frequently-asked-questions/deleteQuestion',  FAQController.deleteQuestion);
router.post('/frequently-asked-questions/getAllFAQ',  FAQController.getAllFAQ);

module.exports = router