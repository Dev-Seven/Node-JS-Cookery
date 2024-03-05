const db = require("../context/ContextManager");
const moment = require("moment");

// <---------------================== ConnectUser To Designer =======================----------------->

exports.connectUserToDesigner = async (req, res) => {
  try {
    let isUserExist = await db.userModel.findOne({
      _id: req.body.userId,
      status: true,
    });

    if (isUserExist) {
      let isProjectExist = await db.userMoodboardModel.findById({
        _id: req.body.projectId,
      });

      if (isProjectExist) {
        let today = new Date();
        let todayDate = moment(today).utcOffset("+05:30").format("llll");

        let connectUser = await new db.connectToDesignerModel({
          userId: req.body.userId,
          projectId: req.body.projectId,
          date: todayDate,
        });
        await connectUser.save();

        res.status(200).json({
          message: "We will connect with you within 6 working hours!",
          data: connectUser,
          code: 200,
        });
      } else {
        res.status(400).json({ message: "Project not found!", code: 400 });
      }
    } else {
      res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to connect User To Designer :", error);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== ConnectUser To Designer =======================----------------->

exports.connectUserToDesignerGetInspired = async (req, res) => {
  try {
    let isUserExist = await db.userModel.findOne({
      _id: req.body.userId,
      status: true,
    });

    if (isUserExist) {
      let isProductExist = await db.productModel.findById({
        _id: req.body.productId,
      });

      if (isProductExist) {
        let today = new Date();
        let todayDate = moment(today).utcOffset("+05:30").format("llll");

        let connectUser = await new db.connectToDesigneGetInspiredModel({
          userId: req.body.userId,
          productId: req.body.productId,
          date: todayDate,
        });
        await connectUser.save();

        res.status(200).json({
          message: "We will connect with you within 6 working hours!",
          data: connectUser,
          code: 200,
        });
      } else {
        res.status(400).json({ message: "product not found!", code: 400 });
      }
    } else {
      res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (error) {
    console.log(
      "Getting error to connect User To Designer inspired product :",
      error
    );
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL SHOW INTEREST =======================----------------->

exports.getAllConnectUserProject = async (req, res) => {
  try {
    let allConnectedUser = await db.connectToDesignerModel.find({});

    if (allConnectedUser) {
      let allUserConnectedProject = [];
      for (let i = 0; i < allConnectedUser.length; i++) {
        let tempObj = {};

        //***** FIND USER DETAILS ********/
        let isUserExist = await db.userModel.findOne({
          _id: allConnectedUser[i].userId,
          status: true,
        });

        if (isUserExist) {
          //***** FIND PRODUCT DETAILS *******/
          let isProject = await db.userMoodboardModel.findById({
            _id: allConnectedUser[i].projectId,
          });

          if (isProject) {
            // ********  GET USER DETAILS ***********

            tempObj.date = allConnectedUser[i].date;
            tempObj.userName =
              isUserExist.firstName + " " + isUserExist.lastName;
            tempObj.mobile = isUserExist.mobile;
            tempObj.email = isUserExist.email;

            // ********  GET PROJECT DETAILS ***********
            tempObj.projectName = isProject.projectName;
            tempObj.city = isProject.city;
            tempObj.buildingName = isProject.buildingName;
            tempObj.aprt_type = isProject.aprt_type;

            allUserConnectedProject.push(tempObj);
          }
        }
      }

      res.status(200).json({
        message: "All user connected project!",
        data: allUserConnectedProject,
        code: 200,
      });
    } else {
      res.status(400).json({
        message: "There is no user connected project!",
        code: 400,
      });
    }
  } catch (error) {
    console.log("Getting error to get All Connected User Project :", error);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== GET ALL SHOW INTEREST MOODBOARD  INSPIRED PRODUCT FOR ADMIN =======================----------------->

exports.getAllConnectUserProduct = async (req, res) => {
  try {
    let allConnectedUser = await db.connectToDesigneGetInspiredModel.find({});

    if (allConnectedUser) {
      let allUserConnectedProduct = [];
      for (let i = 0; i < allConnectedUser.length; i++) {
        let tempObj = {};

        //***** FIND USER DETAILS ********/
        let isUserExist = await db.userModel.findOne({
          _id: allConnectedUser[i].userId,
          status: true,
        });

        if (isUserExist) {
          //***** FIND PRODUCT DETAILS *******/
          let isProduct = await db.productModel.findById({
            _id: allConnectedUser[i].productId,
          });

          if (isProduct) {
            // ********  GET USER DETAILS ***********

            tempObj.date = allConnectedUser[i].date;
            tempObj.userName =
              isUserExist.firstName + " " + isUserExist.lastName;
            tempObj.mobile = isUserExist.mobile;
            tempObj.email = isUserExist.email;

            // ********  GET PRODUCT DETAILS ***********
            tempObj.productName = isProduct.title;

            allUserConnectedProduct.push(tempObj);
          }
        }
      }

      res.status(200).json({
        message: "All user connected product!",
        data: allUserConnectedProduct,
        code: 200,
      });
    } else {
      res.status(400).json({
        message: "There is no user connected product!",
        code: 400,
      });
    }
  } catch (error) {
    console.log(
      "Getting error to get All Connected User get inspired product :",
      error
    );
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
