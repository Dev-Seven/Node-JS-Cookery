const router = require("express").Router();
const interestController = require("../controller/interestController");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/interest/interestProduct",
  verifyToken,
  interestController.showInterest
);
router.post(
  "/interest/getAllShowInterest",
  interestController.getAllShowInterest
);
router.post("/interest/deleteInterest", interestController.deleteInterest);

module.exports = router;
