const router = require("express").Router();
const userMoodboardController = require("../controller/userMoodboardController");
const { verifyToken } = require("../middleware/auth");

// FEEL Routes
router.post(
  "/moodboard/saveProject",
  verifyToken,
  userMoodboardController.saveProject
);
router.post(
  "/moodboard/saveProjectList",
  verifyToken,
  userMoodboardController.saveProjectList
);
router.post(
  "/moodboard/deleteProject",
  verifyToken,
  userMoodboardController.deleteProject
);
router.post(
  "/moodboard/getProjectProduct",
  verifyToken,
  userMoodboardController.getProjectProduct
);
router.post(
  "/moodboard/updateProject",
  verifyToken,
  userMoodboardController.updateProject
);
router.post(
  "/moodboard/cancleUpdateProject",
  verifyToken,
  userMoodboardController.cancleUpdateProject
);
router.post(
  "/moodboard/getAllMoodboardProject",
  // verifyToken,
  userMoodboardController.getAllMoodboardProject
);
router.post(
  "/moodboard/userFavoriteProductCheck",
  verifyToken,
  userMoodboardController.userFavoriteProductCheck
);

module.exports = router;
