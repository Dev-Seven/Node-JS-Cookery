const db = require("../context/ContextManager");
const moment = require("moment");

// <---------------================== show Interest =======================----------------->

exports.showInterest = async (req, res) => {
  try {
    let isUserExist = await db.userModel.findOne({
      _id: req.body.userId,
      status: true,
    });

    if (isUserExist) {
      let isProduct = await db.productModel.findById({
        _id: req.body.productId,
      });

      if (isProduct) {
        // let todayDate = new Date();
        let today = new Date();
        let todayDate = moment(today).utcOffset("+05:30").format("llll");

        let showInterest = await new db.showInterestModel({
          userId: req.body.userId,
          productId: req.body.productId,
          date: todayDate,
          // date: moment(todayDate).format("llll"),
        });
        await showInterest.save();

        res.status(200).json({
          message: "Thank you for showing interest!",
          data: showInterest,
          code: 200,
        });
      } else {
        res.status(400).json({ message: "Product not found!", code: 400 });
      }
    } else {
      res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to user show interest  :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL SHOW INTEREST =======================----------------->

exports.getAllShowInterest = async (req, res) => {
  try {
    let showInterest = await db.showInterestModel.find({});

    if (showInterest) {
      let allUserInterestedProduct = [];
      for (let i = 0; i < showInterest.length; i++) {
        let tempObj = {};

        //***** FIND USER DETAILS ********/
        let isUserExist = await db.userModel.findOne({
          _id: showInterest[i].userId,
          status: true,
        });

        if (isUserExist) {
          tempObj._id = showInterest[i]._id;
          tempObj.date = showInterest[i].date;
          tempObj.userName = isUserExist.firstName + " " + isUserExist.lastName;
          tempObj.mobile = isUserExist.mobile;
          tempObj.email = isUserExist.email;

          //***** FIND PRODUCT DETAILS *******/
          let isProduct = await db.productModel.findById({
            _id: showInterest[i].productId,
          });

          if (isProduct) {
            tempObj.productTitle = isProduct.title;
            tempObj.catName = isProduct.catName;
            allUserInterestedProduct.push(tempObj);
          }
        }
      }

      res.status(200).json({
        message: "All showing user interest product!",
        data: allUserInterestedProduct,
        code: 200,
      });
    } else {
      res.status(400).json({
        message: "There is no user interested products!",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to user show interest  :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== DELETE INTEREST =======================----------------->

exports.deleteInterest = async (req, res) => {
  try {
    const interest = await db.showInterestModel.findByIdAndDelete({
      _id: req.body._id,
    });

    if (interest) {
      return res.status(200).json({
        message: "User interest deleted successfully.",
        code: 200,
      });
    } else {
      return res
        .status(400)
        .json({ message: "User interest not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete user interest :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
