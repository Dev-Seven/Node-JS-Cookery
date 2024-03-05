const db = require("../context/ContextManager");
const moment = require("moment");

// <---------------==================save Project to moodboard=======================----------------->

exports.saveProject = async (req, res) => {
  try {
    const isUserExist = await db.userModel.findById({ _id: req.body.userId });

    if (isUserExist) {
      const isPersonalizedFav = await db.userFavoriteProduct.find({
        userId: req.body.userId,
        is_personalized: true,
      });
      if (isPersonalizedFav.length > 0) {
        const isSaveLimit = await db.userMoodboardModel.find({
          userId: req.body.userId,
        });
        //  PROJECT SAME NAME CAN NOT SAVE.
        const isProjectNameExist = await db.userMoodboardModel.findOne({
          userId: req.body.userId,
          projectName: req.body.projectName,
        });
        if (!isProjectNameExist) {
          let today = new Date();
          let todayDate = moment(today).utcOffset("+05:30").format("llll");
          if (isSaveLimit.length < 4) {
            let moodboardProducts = new db.userMoodboardModel({
              userId: req.body.userId,
              projectName: req.body.projectName,
              buildingName: req.body.buildingName,
              alphabet_block: req.body.alphabet_block,
              numeric_block: req.body.numeric_block,
              aprt_type: req.body.aprt_type,
              address: req.body.address,
              city: req.body.city,
              State: req.body.State,
              productId: isPersonalizedFav,
              date: todayDate,

              // place_id: req.body.place_id,
              // location: req.body.location,
            });

            await moodboardProducts.save();

            // DESLIKE ALL PRODUCT FOR USER

            let disLikeProdUser = await db.userFavoriteProduct.find({
              userId: req.body.userId,
            });

            if (disLikeProdUser) {
              for (let i = 0; i < disLikeProdUser.length; i++) {
                let updateLike = {
                  is_personalized: false,
                };
                obj = disLikeProdUser[i].toObject();
                let wipeLikes = await db.userFavoriteProduct.findByIdAndUpdate(
                  obj._id.toString(),
                  updateLike,
                  { new: true }
                );
                wipeLikes.save();
              }
            }

            // DELETE ENTRY WICH BOTH VARIABLES ARE FALSE REPO & PERSONALIZE

            let unwanted = await db.userFavoriteProduct.find({
              is_repository: false,
              is_personalized: false,
            });
            if (unwanted) {
              for (let i = 0; i < unwanted.length; i++) {
                let deleteUnwanted =
                  await db.userFavoriteProduct.findByIdAndDelete({
                    _id: unwanted[i]._id,
                  });
              }
            }

            res.status(200).json({
              message: "Project saved in moodboard",
              data: moodboardProducts,
              code: 200,
            });
          } else {
            res.status(400).json({
              message: "You are save already 4 project. you cant't save more.",
              code: 400,
            });
          }
        } else {
          res.status(400).json({
            message: "You can not save project with the same name.",
            code: 400,
          });
        }
      } else {
        res.status(400).json({
          message: "There is no favorite product to save in moodboard.",
          code: 400,
        });
      }
    } else {
      res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to save moodboard project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------==================save Project to moodboard=======================----------------->

exports.updateProject = async (req, res) => {
  try {
    const isUserExist = await db.userModel.findById({ _id: req.body.userId });

    if (isUserExist) {
      const isPersonalizedFav = await db.userFavoriteProduct.find({
        userId: req.body.userId,
        is_personalized: true,
      });
      if (isPersonalizedFav.length > 0) {
        let today = new Date();
        let todayDate = moment(today).utcOffset("+05:30").format("llll");

        let updatedProgect = {
          productId: isPersonalizedFav,
          date: todayDate,
        };

        let moodboardProducts = await db.userMoodboardModel.findByIdAndUpdate(
          req.body.projectId,
          updatedProgect,
          { new: true }
        );
        await moodboardProducts.save();

        // DESLIKE ALL PRODUCT FOR USER

        let disLikeProdUser = await db.userFavoriteProduct.find({
          userId: req.body.userId,
        });

        if (disLikeProdUser) {
          for (let i = 0; i < disLikeProdUser.length; i++) {
            let updateLike = {
              is_personalized: false,
            };
            obj = disLikeProdUser[i].toObject();
            let wipeLikes = await db.userFavoriteProduct.findByIdAndUpdate(
              obj._id.toString(),
              updateLike,
              { new: true }
            );
            wipeLikes.save();
          }
        }

        // DELETE ENTRY WICH BOTH VARIABLES ARE FALSE REPO & PERSONALIZE

        let unwanted = await db.userFavoriteProduct.find({
          is_repository: false,
          is_personalized: false,
        });
        if (unwanted) {
          for (let i = 0; i < unwanted.length; i++) {
            let deleteUnwanted = await db.userFavoriteProduct.findByIdAndDelete(
              {
                _id: unwanted[i]._id,
              }
            );
          }
        }

        res.status(200).json({
          message: "Project updated succesfuly.",
          data: moodboardProducts,
          code: 200,
        });
      } else {
        res.status(400).json({
          message: "There is no favorite product to update to moodboard.",
          code: 400,
        });
      }
    } else {
      res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to save moodboard project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== DELETE SAVE PROJECT =======================----------------->

exports.deleteProject = async (req, res) => {
  try {
    const isProjectExist = await db.userMoodboardModel.findByIdAndDelete({
      _id: req.body.id,
    });

    if (isProjectExist) {
      res
        .status(200)
        .json({ message: "Project deleted successfuly.", code: 200 });
    } else {
      res.status(400).json({ message: "Project not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete moodboard project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== Save Project List =======================----------------->

exports.saveProjectList = async (req, res) => {
  try {
    const isPersonalizedFav = await db.userMoodboardModel.find({
      userId: req.body.userId,
      is_personalized: true,
    });

    if (isPersonalizedFav.length > 0) {
      SaveMoodBoardList = [];

      for (let i = 0; i < isPersonalizedFav.length; i++) {
        tempObj = isPersonalizedFav[i].toObject();
        SaveMoodBoardObj = {};

        SaveMoodBoardObj._id = tempObj._id;
        SaveMoodBoardObj.projectName = tempObj.projectName;
        SaveMoodBoardObj.buildingName = tempObj.buildingName;
        SaveMoodBoardObj.aprt_type = tempObj.aprt_type;
        SaveMoodBoardObj.alphabet_block = tempObj.alphabet_block;
        SaveMoodBoardObj.numeric_block = tempObj.numeric_block;
        SaveMoodBoardObj.address = tempObj.address;
        SaveMoodBoardObj.city = tempObj.city;
        SaveMoodBoardObj.State = tempObj.State;
        // SaveMoodBoardObj.location = tempObj.location;
        // SaveMoodBoardObj.place_id = tempObj.place_id;

        let prodId = isPersonalizedFav[i].productId;
        let temArry = [];
        for (let j = 0; j < prodId.length; j++) {
          tempId = prodId[j].ProductId;
          let product = await db.productModel.findById({
            _id: tempId.toString(),
          });
          if (product) {
            temArry.push(product);
          }
        }
        SaveMoodBoardObj.product = temArry;

        SaveMoodBoardList.push(SaveMoodBoardObj);
      }

      res.status(200).json({
        message: "User moodboard list.",
        data: SaveMoodBoardList,
        code: 200,
      });
    } else {
      res
        .status(200)
        .json({ message: "There is no saved projects.", code: 200 });
    }
  } catch (erorr) {
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== PROJECT PRODUCT FOR EDIT =======================----------------->

exports.getProjectProduct = async (req, res) => {
  try {
    let project = await db.userMoodboardModel.findOne({
      _id: req.body.projectId,
      userId: req.body.userId,
    });
    let finalProduct = [];
    if (project) {
      let productArray = project.productId;

      for (let index = 0; index < productArray.length; index++) {
        let product = await db.productModel.findById({
          _id: productArray[index].ProductId,
        });
        if (product) {
          let tempObj = product.toObject();
          tempObj.isFavorite = true;
          finalProduct.push(tempObj);

          // SET DEFAULT LIKE WITH THIS PRODUCTS

          const isExist = await db.userFavoriteProduct.findOne({
            userId: req.body.userId,
            ProductId: product._id,
            is_personalized: true,
          });
          if (!isExist) {
            const userFavoriteProduct = await new db.userFavoriteProduct({
              userId: req.body.userId,
              ProductId: product._id,
              is_personalized: true,
            });
            userFavoriteProduct.save();
          }
        }
      }

      res.status(200).json({
        message: "Project of products",
        code: 200,
        data: finalProduct,
      });
    } else {
      res.status(400).json({
        message: "User have no saved projects.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get Project by Product:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== CANCLE EDITE BUTTON CALL =======================----------------->

exports.cancleUpdateProject = async (req, res) => {
  try {
    let project = await db.userMoodboardModel.findOne({
      _id: req.body.projectId,
      userId: req.body.userId,
    });

    if (project) {
      let productArray = project.productId;

      for (let index = 0; index < productArray.length; index++) {
        let product = await db.productModel.findById({
          _id: productArray[index].ProductId,
        });
        if (product) {
          // REMOVE DEFAULT LIKE WITH THIS PRODUCTS

          const userFavoriteProduct =
            await db.userFavoriteProduct.findOneAndDelete({
              userId: req.body.userId,
              ProductId: product._id,
              is_personalized: true,
            });
        }
      }

      res.status(200).json({
        message: "Cancle success action.",
        code: 200,
      });
    } else {
      res.status(400).json({
        message: "User have no saved projects.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to cancle Update Project:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------==================   GET ALL MOODBOARD SAVE PROJECT FOR ADMIN =======================----------------->

exports.getAllMoodboardProject = async (req, res) => {
  try {
    let project = await db.userMoodboardModel.find();

    if (project) {
      let moodboardProject = [];
      for (let i = 0; i < project.length; i++) {
        let tempObj = {};

        //***** FIND USER DETAILS ********/
        let isUserExist = await db.userModel.findOne({
          _id: project[i].userId,
          status: true,
        });

        if (isUserExist) {
          productIds = [];
          tempObj.date = project[i].date;
          tempObj.city = project[i].city;
          tempObj.projectName = project[i].projectName;
          tempObj.userId = project[i].userId;
          tempObj.userName = isUserExist.firstName + " " + isUserExist.lastName;
          tempObj.mobile = isUserExist.mobile;
          tempObj.email = isUserExist.email;

          //***** FIND PRODUCT DETAILS *******/
          products = project[i].productId;
          for (let k = 0; k < products.length; k++) {
            let isProject = await db.productModel.findById({
              _id: products[k].ProductId,
            });
            if (isProject) {
              productIds.push(isProject._id);
            }
          }
          tempObj.productIds = productIds;
          moodboardProject.push(tempObj);
        }
      }

      res.status(200).json({
        message: "All moodboard projects!",
        data: moodboardProject,
        code: 200,
      });
    } else {
      res.status(400).json({
        message: "There is no user connected project!",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get all moodboard project for admin:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------==================  USER FAVORITE PRODUCT CHECK =======================----------------->

exports.userFavoriteProductCheck = async (req, res) => {
  try {
    const isUserExist = await db.userModel.findById({ _id: req.body.userId });

    if (isUserExist) {
      const isPersonalizedFav = await db.userFavoriteProduct.find({
        userId: req.body.userId,
        is_personalized: true,
      });
      if (isPersonalizedFav.length > 0) {
        res.status(200).json({
          message: `${isPersonalizedFav.length} product is ready to save.`,
          code: 200,
        });
      } else {
        res.status(400).json({
          message: "There is no favorite product to save in moodboard.",
          code: 400,
        });
      }
    } else {
      res.status(400).json({
        message: "User not found!",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log(
      "Getting error to check user favorite personalized product:",
      erorr
    );
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
