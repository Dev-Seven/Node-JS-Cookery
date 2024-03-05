const router = require("express").Router();
const ratingController = require("../controller/ratingController");
const { verifyToken } = require('../middleware/auth');


// RATING ROUTES 
router.post("/rating/ratingProject", ratingController.ratingProject);
router.post("/rating/ProjectByProduct", ratingController.ProjectByProduct);
router.post("/rating/getProjectByReting", ratingController.getProjectByReting);
router.post("/rating/userReplyOnProject",verifyToken, ratingController.userReplyOnProject);


module.exports = router;
