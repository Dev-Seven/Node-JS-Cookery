const router = require("express").Router();
const connectToDesignerController = require("../controller/connectToDesignerController");
const { verifyToken } = require("../middleware/auth");

router.post(
  "/connectToDesigner/connectUserToDesigner",
  verifyToken,
  connectToDesignerController.connectUserToDesigner
);
router.post(
  "/connectToDesigner/getAllConnectUserProject",
  connectToDesignerController.getAllConnectUserProject
);
router.post(
  "/connectToDesigner/connectUserToDesignerGetInspired",

  connectToDesignerController.connectUserToDesignerGetInspired
);
router.post(
  "/connectToDesigner/getAllConnectUserProduct",
  connectToDesignerController.getAllConnectUserProduct
);

module.exports = router;
