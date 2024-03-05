const db = require("../context/ContextManager");

//<-------============= userFavoriteProduct ===============----------->

exports.userFavoriteProduct = async (req, res) => {
  try {
    const valideProduct = await db.productModel.findOne({
      _id: req.body.ProductId,
    });
    const valideUser = await db.userModel.findOne({ _id: req.body.userId });

    if (req.body.status === "1" || req.body.status === 1) {
      if (valideUser) {
        if (valideProduct) {
          const isExist = await db.userFavoriteProduct.findOne({
            userId: req.body.userId,
            ProductId: req.body.ProductId,
            is_personalized: req.body.is_personalized,
            is_repository: req.body.is_repository,
          });

          if (isExist) {
            return res.status(400).json({
              message: "Product already favorite.",
              code: 400,
            });
          } else {
            if (req.body.is_personalized) {
              const userFavoriteProduct = await new db.userFavoriteProduct({
                userId: req.body.userId,
                ProductId: req.body.ProductId,
                is_personalized: req.body.is_personalized,
              });
              userFavoriteProduct.save();
            } else if (req.body.is_repository) {
              const userFavoriteProduct = await new db.userFavoriteProduct({
                userId: req.body.userId,
                ProductId: req.body.ProductId,
                is_repository: req.body.is_repository,
              });
              userFavoriteProduct.save();
            }
            return res.status(200).json({
              message: " This product is fevorite.",
              code: 200,
            });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Product not found!", code: 400 });
        }
      } else {
        return res.status(400).json({ message: "User not found!", code: 400 });
      }
    }
    if (req.body.status === "0" || req.body.status === 0) {
      if (valideUser) {
        if (valideProduct) {
          const userFavoriteProduct =
            await db.userFavoriteProduct.findOneAndDelete({
              userId: req.body.userId,
              ProductId: req.body.ProductId,
              is_personalized: req.body.is_personalized,
              is_repository: req.body.is_repository,
            });

          if (userFavoriteProduct) {
            return res.status(200).json({
              message: " This product is unfevorite.",
              code: 200,
            });
          } else {
            return res.status(400).json({
              message: " This product ss already unfavorite!",
              code: 400,
            });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Product not found!", code: 400 });
        }
      } else {
        return res
          .status(400)
          .json({ message: "User is not found!", code: 400 });
      }
    }

    return res
      .status(400)
      .json({ message: "Please provide valide status", code: 400 });
  } catch (error) {
    console.log("Getting error to user favorite Product :", error);
    return res
      .status(400)
      .json({ message: "Something went wrong !", code: 400 });
  }
};

//<-------============= Get All User Favorite Products ===============----------->

exports.getAllUserFavoriteProduct = async (req, res) => {
  try {
    const userProduct = await db.userFavoriteProduct.find({
      userId: req.body.userId,
    });

    if (userProduct) {
      let userFavoriteProducts = [];

      for (let i = 0; i < userProduct.length; i++) {
        const product = await db.productModel.findOne({
          _id: userProduct[i].ProductId,
        });

        if (product) {
          userFavoriteProducts.push(product);
        }
      }

      return res.status(200).json({
        message: "User favorite product.",
        code: 200,
        data: userFavoriteProducts,
      });
    } else {
      return res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to user favorite Product :", error);
    return res
      .status(400)
      .json({ message: " Something went wrong !", code: 400 });
  }
};

//<-------============= User favorite Personalize Product ===============----------->

exports.AllFavoriteInspiredProduct = async (req, res) => {
  try {
    const userProduct = await db.userFavoriteProduct.find({
      userId: req.body.userId,
      is_personalized: false,
      is_repository: true,
    });

    if (userProduct) {
      let userFavoriteProducts = [];

      for (let i = 0; i < userProduct.length; i++) {
        const product = await db.productModel.findOne({
          _id: userProduct[i].ProductId,
        });
        if (product) {
          userFavoriteProducts.push(product);
        }
      }

      return res.status(200).json({
        message: "User favorite Personalized products.",
        code: 200,
        data: userFavoriteProducts,
      });
    } else {
      return res.status(400).json({ message: "User not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to user favorite Product :", error);
    return res
      .status(400)
      .json({ message: " Something went wrong !", code: 400 });
  }
};
