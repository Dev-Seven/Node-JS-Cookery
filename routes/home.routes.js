const router = require("express").Router();
const homeController = require("../controller/homeController");
const { UploadPlanlImage } = require("../middleware/upload.middleware");

// Home Routes
router.post(
  "/home/insertHome",
  UploadPlanlImage.fields([
    { name: "plan_image", maxCount: 1 },
    { name: "building_image", maxCount: 1 },
  ]),
  homeController.insertHome
);
router.post(
  "/home/editHome",
  UploadPlanlImage.fields([
    { name: "plan_image", maxCount: 1 },
    { name: "building_image", maxCount: 1 },
  ]),
  homeController.editHome
);
router.post("/home/deleteHome", homeController.deleteHome);
router.post("/home/getAllHome", homeController.getAllHome);
router.post("/home/verifyAddress", homeController.verifyAddress);
router.post(
  "/home/getAllFullHomeByAddress",
  homeController.getAllFullHomeByAddress
);
router.post("/home/getBlocksByAprtType", homeController.getBlocksByAprtType);
router.post("/home/personalizedFullHome", homeController.personalizedFullHome);
router.post("/home/getAllLocation", homeController.getAllLocation);
router.post("/home/getBuildingName", homeController.getBuildingName);
router.post("/home/verifyBuildingImage", homeController.verifyBuildingImage);
router.post("/home/isHomeExist", homeController.isHomeExist);

module.exports = router;
