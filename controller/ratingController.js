const db = require("../context/ContextManager");
const moment = require("moment");

// <---------------================== RATING PRODUCT =======================----------------->

exports.ratingProject = async (req, res) => {
  try {
    let isProjectExist = await db.userMoodboardModel.findById({
      _id: req.body.projectId,
    });

    if (isProjectExist) {
      let todayDate = new Date();

      let rating = await new db.ratingModel({
        userId: req.body.userId,
        projectId: req.body.projectId,
        name: req.body.name,
        Comment: req.body.Comment,
        userReplay: "",
        rating: req.body.rating,
        date: moment(todayDate).format("DD-MM-YYYY"),
        userCommentReply: false,
      });
      await rating.save();

      res.status(200).json({
        message: "Thank you for rating .",
        data: rating,
        code: 200,
      });
    } else {
      res.status(400).json({ message: "Project not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to rating project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== USER REPLY ON COMMENT =======================----------------->

exports.userReplyOnProject = async (req, res) => {
  try {
    let todayDate = new Date();

    let userComment = {
      userReplay: req.body.userReplay,
      replyDate: moment(todayDate).format("DD-MM-YYYY"),
      userCommentReply: true,
    };

    let userReplay = await db.ratingModel.findByIdAndUpdate(
      req.body.commentId,
      userComment,
      { new: true }
    );
    await userReplay.save();

    res.status(200).json({
      message: "Reply submited.",
      data: userReplay,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to reply on comment on project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== get Product By Reting =======================----------------->

exports.getProjectByReting = async (req, res) => {
  try {
    let product = {};

    let products = [];

    let project = await db.userMoodboardModel.findById({
      _id: req.body.projectId,
    });

    let prodIds = project.productId;

    for (let i = 0; i < prodIds.length; i++) {
      let isProduct = await db.productModel.findById({
        _id: prodIds[i].ProductId,
      });
      if (isProduct) {
        let tempObj = {
          _id: isProduct._id,
          listing_image: isProduct.listing_image,
          title: isProduct.title,
          feelName: isProduct.feelName,
          styleName: isProduct.styleName,
          buildingName: project.buildingName,
          max_price: isProduct.max_price,
          min_price: isProduct.min_price,
        };
        products.push(tempObj);
      }
    }
    // fatch reting here
    let ratedProduct = await db.ratingModel.find({
      projectId: req.body.projectId,
    });

    let retingNumber = [];
    let ratingProject = [];

    for (let i = 0; i < ratedProduct.length; i++) {
      let retedProduct = ratedProduct[i].toObject();
      let tempUserDetail = {};

      tempUserDetail._id = retedProduct._id;
      tempUserDetail.userId = retedProduct.userId;
      tempUserDetail.projectId = retedProduct.projectId;
      tempUserDetail.name = retedProduct.name;
      tempUserDetail.Comment = retedProduct.Comment;
      tempUserDetail.userReplay = retedProduct.userReplay;
      tempUserDetail.rating = retedProduct.rating;
      tempUserDetail.date = retedProduct.date;
      tempUserDetail.replyDate = retedProduct.replyDate;
      tempUserDetail.userCommentReply = retedProduct.userCommentReply;

      let isUser = await db.userModel.findById({
        _id: retedProduct.userId,
      });

      let userDetail = isUser.toObject();
      tempUserDetail.userImage = userDetail.image;
      tempUserDetail.userName =
        userDetail.firstName + " " + userDetail.lastName;

      retingNumber.push(retedProduct.rating);
      ratingProject.push(tempUserDetail);
    }

    const average =
      retingNumber.reduce((a, b) => a + b, 0) / retingNumber.length;
    product["Average_rating"] = Math.round(average);
    product["product"] = products;
    product["rating"] = ratingProject;

    res.status(200).json({
      message: "Project reting Succeed.",
      data: product,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to Get Product by reting:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== get Product By Reting =======================----------------->

exports.ProjectByProduct = async (req, res) => {
  try {
    let products = [];

    let project = await db.userMoodboardModel.findById({
      _id: req.body.projectId,
    });

    let prodIds = project.productId;

    for (let i = 0; i < prodIds.length; i++) {
      let isProduct = await db.productModel.findById({
        _id: prodIds[i].ProductId,
      });
      // console.log("isProduct :", isProduct)
      if (isProduct) {
        let tempObj = {
          _id: isProduct._id,
          listing_image: isProduct.listing_image,
          title: isProduct.title,
          feelName: isProduct.feelName,
          styleName: isProduct.styleName,
        };
        products.push(tempObj);
      }
    }

    res.status(200).json({
      message: "Project by products.",
      data: products,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to Get Product by reting:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
