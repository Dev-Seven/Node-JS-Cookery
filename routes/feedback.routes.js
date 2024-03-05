const router = require("express").Router();
const feedbackController = require("../controller/feedbackController");

router.post("/feedback", feedbackController.feedback);
router.post("/feedback/getAllfeedback", feedbackController.getAllfeedback);
router.post("/feedback/deleteFeedback", feedbackController.deleteFeedback);

module.exports = router;
