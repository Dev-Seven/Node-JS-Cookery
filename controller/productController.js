const moment = require("moment");
const db = require("../context/ContextManager");

// <---------------================== CREATE PRODUCT =======================----------------->

exports.insertProduct = async (req, res) => {
  try {
    isFullHome = false;
    let Style = await db.styleModel.findOne({ _id: req.body.style_id });
    let Feel = await db.feelModel.findOne({ _id: req.body.feel_id });
    let catagory = await db.CatagoryModel.findById({ _id: req.body.cat_id });

    var FH = "Full Home";
    let pro_description = [];
    let full_Home_product = [];
    if (FH.toLowerCase() == catagory.Cat_name.trim().toLowerCase()) {
      // if (
      //   catagory._id == "631b39c838e3f27f76065a60" ||
      //   catagory._id == "62e794618f3fb4d0e33f5774" ||
      //   catagory._id == "634e84797894f0cac324541b" ||
      //   catagory._id == "632b0424d002a479109e3090"
      // )
      isFullHome = true;
      // if full home
      full_Home_product = JSON.parse(req.body.full_Home_product);
    } else {
      // if Single
      pro_description = JSON.parse(req.body.pro_description);
    }

    const createProduct = await new db.productModel({
      title: req.body.title,
      description: req.body.description,
      min_price: req.body.min_price,
      max_price: req.body.max_price,
      min_TimeLine: req.body.min_TimeLine,
      max_TimeLine: req.body.max_TimeLine,
      cat_id: req.body.cat_id,
      feel_id: req.body.feel_id,
      style_id: req.body.style_id,
      feelName: Feel.feelName,
      styleName: Style.styleName,
      catName: catagory.Cat_name,
      isFullHome: isFullHome,
      // pro_description: req.body.pro_description,
      pro_description: pro_description,
      full_Home_product: full_Home_product,
    });

    // ************ Listing Image **************
    if (
      typeof req.files.listing_image !== "undefined" &&
      req.files.listing_image.length > 0
    ) {
      createProduct.listing_image = req.files.listing_image[0].path.replace(
        /\\/g,
        "/"
      );
    }
    if (
      typeof req.body.listing_image !== "undefined" &&
      req.body.listing_image
    ) {
      createProduct.listing_image = req.body.listing_image;
    }
    // ************ Banner Image **************

    // if (
    //   typeof req.files.banner_image !== "undefined" &&
    //   req.files.banner_image.length > 0
    // ) {
    //   createProduct.banner_image = req.files.banner_image[0].path.replace(
    //     /\\/g,
    //     "/"
    //   );
    // }
    // if (typeof req.body.banner_image !== "undefined" && req.body.banner_image) {
    //   createProduct.banner_image = req.body.banner_image;
    // }

    // ************ First Image **************

    if (
      typeof req.files.first_image !== "undefined" &&
      req.files.first_image.length > 0
    ) {
      createProduct.first_image = req.files.first_image[0].path.replace(
        /\\/g,
        "/"
      );
    }
    if (typeof req.body.first_image !== "undefined" && req.body.first_image) {
      createProduct.first_image = req.body.first_image;
    }

    // ************ second Image **************

    if (
      typeof req.files.second_image !== "undefined" &&
      req.files.second_image.length > 0
    ) {
      createProduct.second_image = req.files.second_image[0].path.replace(
        /\\/g,
        "/"
      );
    }
    if (typeof req.body.second_image !== "undefined" && req.body.second_image) {
      createProduct.second_image = req.body.second_image;
    }

    await createProduct.save();

    return res.status(200).json({
      message: "Product added Successfuly.",
      data: createProduct,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to add Product :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== EDIT PRODUCT =======================----------------->

exports.editProduct = async (req, res) => {
  try {
    isFullHome = false;
    let catagory = await db.CatagoryModel.findOne({ _id: req.body.cat_id });
    let pro_description = [];
    let full_Home_product = [];
    var FH = "Full Home";
    if (FH.toLowerCase() == catagory.Cat_name.trim().toLowerCase()) {
      isFullHome = true;
      // if full home
      full_Home_product = JSON.parse(req.body.full_Home_product);
    } else {
      // if Single
      pro_description = JSON.parse(req.body.pro_description);
    }
    const isProduct = await db.productModel.findOne({ _id: req.body._id });

    let Style = await db.styleModel.findOne({ _id: req.body.style_id });
    let Feel = await db.feelModel.findOne({ _id: req.body.feel_id });

    if (isProduct) {
      let UpdatedProduct = {
        title: req.body.title,
        description: req.body.description,
        min_price: req.body.min_price,
        isFullHome: isFullHome,
        max_price: req.body.max_price,
        min_TimeLine: req.body.min_TimeLine,
        max_TimeLine: req.body.max_TimeLine,
        cat_id: req.body.cat_id,
        feel_id: req.body.feel_id,
        style_id: req.body.style_id,
        feelName: Feel.feelName,
        styleName: Style.styleName,
        catName: catagory.Cat_name,
        // pro_description: req.body.pro_description,
        pro_description: pro_description,
        full_Home_product: full_Home_product,
      };

      let updateProduct = await db.productModel.findByIdAndUpdate(
        req.body._id,
        UpdatedProduct,
        { new: true }
      );
      // ************ Listing Image **************
      if (
        typeof req.files.listing_image !== "undefined" &&
        req.files.listing_image.length > 0
      ) {
        updateProduct.listing_image = req.files.listing_image[0].path.replace(
          /\\/g,
          "/"
        );
      }
      if (
        typeof req.body.listing_image !== "undefined" &&
        req.body.listing_image
      ) {
        updateProduct.listing_image = req.body.listing_image;
      }

      // banner_image
      // if (
      //   typeof req.files.banner_image !== "undefined" &&
      //   req.files.banner_image.length > 0
      // ) {
      //   updateProduct.banner_image = req.files.banner_image[0].path.replace(
      //     /\\/g,
      //     "/"
      //   );
      // }
      // if (
      //   typeof req.body.banner_image !== "undefined" &&
      //   req.body.banner_image
      // ) {
      //   updateProduct.banner_image = req.body.banner_image;
      // }

      //      first_image

      if (
        typeof req.files.first_image !== "undefined" &&
        req.files.first_image.length > 0
      ) {
        updateProduct.first_image = req.files.first_image[0].path.replace(
          /\\/g,
          "/"
        );
      }
      if (typeof req.body.first_image !== "undefined" && req.body.first_image) {
        updateProduct.first_image = req.body.first_image;
      }

      //      second_image
      if (
        typeof req.files.second_image !== "undefined" &&
        req.files.second_image.length > 0
      ) {
        updateProduct.second_image = req.files.second_image[0].path.replace(
          /\\/g,
          "/"
        );
      }
      if (
        typeof req.body.second_image !== "undefined" &&
        req.body.second_image
      ) {
        updateProduct.second_image = req.body.second_image;
      }

      updateProduct.save();

      return res.status(200).json({
        message: "Product updated successfully.",
        data: updateProduct,
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "Product not found!",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to update Product :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE PRODUCT =======================----------------->

exports.deleteProduct = async (req, res) => {
  try {
    let deleteProduct = await db.productModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleteProduct) {
      return res.status(200).json({
        message: "Product deleted successfully.",
        code: 200,
      });
    } else {
      return res.status(400).json({ message: "Product not found", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete Product:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL PRODUCT =======================----------------->

exports.getAllProduct = async (req, res) => {
  try {
    const getAllproduct = await db.productModel.find({});
    let products = [];
    for (let i = 0; i < getAllproduct.length; i++) {
      let tempProObj = getAllproduct[i].toObject();
      tempProObj.creatTime = moment(tempProObj.createdAt)
        .utcOffset("+05:30")
        .format("llll");
      tempProObj.updatedTime = moment(tempProObj.updatedAt)
        .utcOffset("+05:30")
        .format("llll");

      if (tempProObj) {
        products.push(tempProObj);
      }
    }

    return res
      .status(200)
      .json({ message: "Succeed.", code: 200, data: products });
  } catch (erorr) {
    console.log("Getting error to fatch all product :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL PRODUCT =======================----------------->

exports.getProductWithFav = async (req, res) => {
  let product = await db.productModel.find();

  let userFavorite = await db.userFavoritFullHome.find({
    userId: "62fcb8fcb46d77b1c1676325",
  });

  let newProduct = [];
  for (let i = 0; i < product.length; i++) {
    let prod = product[i].toObject();
    for (let j = 0; j < userFavorite.length; j++) {
      if (product[i]._id.toString() == userFavorite[j].ProductId) {
        prod.isFavorite = true;
      } else {
        prod.isFavorite = false;
      }
    }

    newProduct.push(prod);
  }

  // userFavorite.forEach(usrFav => {
  //   console.log("product", product);
  //   let obj = product.find(o => o._id.toString() == usrFav.ProductId);
  //   console.log("obj", obj);
  // });

  // let product = await db.userFavoritFullHome.aggregate([
  //   { $lookup:
  //      {
  //        from: 'products',
  //        localField: 'ProductId',
  //        foreignField: '_id',
  //        as: 'userfavorite'
  //      }
  //    }
  //   ]);

  return res.status(200).json({
    message: "Succeed.",
    code: 200,
    data: newProduct,
  });
};
// <---------------================== GET PRODUCT BY CATEGORY =======================----------------->

exports.getProductByCategory = async (req, res) => {
  try {
    let filteredFeel = [];

    //**************** Filter by min max Price ****************

    if (req.body.min_price && req.body.min_price) {
      //**************** Filter by min max Price & style ****************
      if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
        filteredFeel = await db.productModel.find({
          $and: [
            { min_price: { $gte: req.body.min_price } },
            { max_price: { $lte: req.body.max_price } },
            { style_id: { $in: req.body.style_id } },
          ],
          // $or: [
          //   // { min_price: { $gte: req.body.min_price } },
          //   // { max_price: { $lte: req.body.max_price } },
          //   // { style_id: { $in: req.body.style_id } },
          // ],
          isFullHome: true,
        });
      }
      //**************** Filter by min max Price & Feel ****************
      else if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
        filteredFeel = await db.productModel.find({
          $and: [
            { min_price: { $gte: req.body.min_price } },
            { max_price: { $lte: req.body.max_price } },
            { feel_id: { $in: req.body.feel_id } },
          ],
          // $or: [
          //   // { min_price: { $gte: req.body.min_price } },
          //   // { max_price: { $lte: req.body.max_price } },
          //   { feel_id: { $in: req.body.feel_id } },
          // ],
          isFullHome: true,
        });
      }
      //**************** Filter by min max Price & Feel & Style ****************
      else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
        filteredFeel = await db.productModel.find({
          $and: [
            // 500 < 501 || 1000 > 999
            { min_price: { $gte: req.body.min_price } },
            { max_price: { $lte: req.body.max_price } },
            // { feel_id: { $in: req.body.feel_id } },
            // { style_id: { $in: req.body.style_id } },
          ],
          // new for style or feel are accept
          $or: [
            { feel_id: { $in: req.body.feel_id } },
            { style_id: { $in: req.body.style_id } },
          ],
          isFullHome: true,
        });
      }
      //**************** Only min max Price ****************
      else {
        filteredFeel = await db.productModel.find({
          $and: [
            { min_price: { $gte: req.body.min_price } },
            { max_price: { $lte: req.body.max_price } },
          ],
          isFullHome: true,
        });
      }
    }
    //**************** Filter by Style feel ****************
    else if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
      filteredFeel = await db.productModel.find({
        feel_id: { $in: req.body.feel_id },
      });
    }
    //**************** Only Style ****************
    else if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
      filteredFeel = await db.productModel.find({
        style_id: { $in: req.body.style_id },
      });
    }
    //**************** Style & Feel ****************
    else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
      filteredFeel = await db.productModel.find({
        $and: [
          {
            style_id: { $in: req.body.style_id },
            feel_id: { $in: req.body.feel_id },
          },
        ],
      });
    }
    //**************** WithOut Filter ****************
    else {
      filteredFeel = await db.productModel.find();
    }
    //**************** User favorite product Checking.  ****************

    //**************** set Dynamic key of Category name  ****************

    let unique_cats = filteredFeel
      //*********  let unique_cats= merged*********
      .map((item) => item.catName)
      .filter((value, index, self) => self.indexOf(value) === index);

    let allCategories = {};
    let userFavorite = await db.userFavoriteProduct.find({
      userId: req.body.user_id,
      is_repository: true,
      is_personalized: false,
    });
    unique_cats.map(async (name) => {
      //********* Get Categopry Name by *********
      let product = filteredFeel.filter((item) => item?.catName === name);

      let newProduct = [];
      // Login
      if (req.body.user_id) {
        for (let i = 0; i < product.length; i++) {
          let prod = product[i].toObject();
          for (let j = 0; j < userFavorite.length; j++) {
            if (product[i]._id == userFavorite[j].ProductId) {
              prod.isFavorite = true;
            } else {
              // if loop change varible value
              if (prod.isFavorite == true) {
                prod.isFavorite = true;
              } else {
                prod.isFavorite = false;
              }
            }
          }
          newProduct.push(prod);
        }
      }
      // not Login
      else {
        newProduct = product;
      }

      allCategories[name] = newProduct;
    });
    //***************************  HERE IS SET NULL CATEGORU PRODUCT ARRAY ***************************//

    let findCate = await db.CatagoryModel.find({});
    let dbCat = [];
    for (let i = 0; i < findCate.length; i++) {
      dbCat.push(findCate[i].Cat_name);
    }
    let objKeys = Object.keys(allCategories);
    const data = dbCat.filter((element) => !objKeys.includes(element));
    if (data) {
      for (let k = 0; k < data.length; k++) {
        allCategories[data[k]] = [];
      }
    }

    //*************************** HERE IS SET ORDER .***************************//

    let catagories = await db.CatagoryModel.find().sort("order");
    let finalList = {};
    catagories.forEach((cat) => {
      Object.keys(allCategories).forEach((c) => {
        if (c == cat.Cat_name) {
          finalList[c] = allCategories[c];
        }
      });
    });

    return res.status(200).json({
      message: "Succeed.",
      code: 200,
      data: finalList,
    });
  } catch (error) {
    console.log("Getting error to fatch all product :", error);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }

  //************************************* old Logic ***********************************************/
  // try {
  //   const ProductByCategory = await db.productModel.find({
  //     cat_id: req.body.id,
  //   });

  //   if (ProductByCategory.length > 0) {

  //     return res.send({
  //       message: "success",
  //       code: 200,
  //       data: ProductByCategory,
  //     });
  //   } else {
  //     return res.send({
  //       message: "No product found by this catagory",
  //       code: 200,
  //     });
  //   }
  // } catch (erorr) {
  //   console.log("Getting error to fatch All Product :", erorr);
  //   res.send({
  //     message: "Something went wrong",
  //     code: 400,
  //   });
  // }
};

// <---------------================== PRODUCT IMAGE =======================----------------->

exports.productImage = async (req, res) => {
  try {
    let path = req.file.path.replace(/\\/g, "/");

    res.send({ message: " success", code: 200, path: path });
  } catch (error) {
    res.send({ message: "Something went wrong", code: 400 });
  }
};

// <---------------================== GET ALL FULL HOME =======================----------------->

exports.getAllFullHome = async (req, res) => {
  try {
    // const allFullHome = await db.productModel.find({cat_id :"62e794618f3fb4d0e33f5774"});
    const allFullHome = await db.productModel.find({ isFullHome: true });
    return res.status(200).json({
      message: "Succeed.",
      code: 200,
      data: allFullHome,
    });
  } catch (error) {
    console.log("Geting error get all full home :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};
// <---------------================== PRODUCT FILTER =======================----------------->

exports.producFilter = async (req, res) => {
  try {
    // const product = await db.productModel.find({ price: { $gte: 50, $lte: 10000 } } )

    const ProductByCategory = await db.productModel.find({
      cat_id: req.body.cat_id,
    });

    if (ProductByCategory.length > 0) {
      let filteredFeel = [];
      let filteredStyle = [];

      if (req.body.min_price && req.body.max_price) {
        //**************** Filter by Feel with Price ****************
        if (req.body.feel_id.length > 0) {
          filteredFeel = await db.productModel.find({
            feel_id: { $in: req.body.feel_id },
            cat_id: req.body.cat_id,
            min_price: { $lt: req.body.min_price },
            max_price: { $gt: req.body.max_price },
          });

          // console.log("product category :", filteredFeel);
        } else {
          filteredFeel = await db.productModel.find({
            feel_id: { $exists: true },
            cat_id: req.body.cat_id,
            min_price: { $lt: req.body.min_price },
            max_price: { $gt: req.body.max_price },
          });
          // console.log("564564654", filteredFeel);
        }
        // **************** Filter by Style  with Price ****************
        if (req.body.style_id.length > 0) {
          filteredStyle = await db.productModel.find({
            style_id: { $in: req.body.style_id },
            cat_id: req.body.cat_id,
            min_price: { $lt: req.body.min_price },
            max_price: { $gt: req.body.max_price },
          });
        } else {
          filteredStyle = await db.productModel.find({
            style_id: { $exists: true },
            cat_id: req.body.cat_id,
            min_price: { $lt: req.body.min_price },
            max_price: { $gt: req.body.max_price },
          });
        }
      } else {
        //**************** Filter by Feel without Price ****************
        if (req.body.feel_id.length > 0) {
          filteredFeel = await db.productModel.find({
            feel_id: { $in: req.body.feel_id },
            cat_id: req.body.cat_id,
          });
        } else {
          filteredFeel = await db.productModel.find({
            feel_id: { $exists: true },
            cat_id: req.body.cat_id,
          });
        }
        // **************** Filter by Style  without Price ****************
        if (req.body.style_id.length > 0) {
          filteredStyle = await db.productModel.find({
            style_id: { $in: req.body.style_id },
            cat_id: req.body.cat_id,
          });
          // console.log("filteredStyle :", filteredStyle);
        } else {
          filteredStyle = await db.productModel.find({
            style_id: { $exists: true },
            cat_id: req.body.cat_id,
          });
          // console.log("filteredStyle with oute chouce:", filteredStyle);
        }
      }

      // **************** Merge Style And Feel ****************

      var ids = new Set(filteredFeel.map((d) => d.feel_id));
      var merged = [
        ...filteredFeel,
        ...filteredStyle.filter((d) => !ids.has(d.feel_id)),
      ];

      return res.status(200).json({
        message: "Succeed.",
        code: 200,
        data: merged,
      });
    } else {
      return res.status(400).json({
        message: "No product found by this catagory",
        code: 400,
      });
    }
  } catch (error) {
    console.log("Geting error while filter product :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};

// <-----===== GET FULL HOME BT STYLE & FEEL IN PERSONALIZED ========----------------->

exports.getFullHomeByFeelStyle = async (req, res) => {
  try {
    const fullHomeByAddress = await db.homeModel.find({
      place_id: req.body.place_id,
    });

    if (fullHomeByAddress.length > 0) {
      let ProductData = [];
      let ProductId = [];

      for (let i = 0; i < fullHomeByAddress.length; i++) {
        ProductId.push(fullHomeByAddress[i].product_id);
      }

      for (let j = 0; j < ProductId.length; j++) {
        if (req.body.style_id) {
          singleProduct = await db.productModel.findOne({
            $and: [
              { _id: ProductId[j] },
              { style_id: req.body.style_id },
              { isFullHome: true },
            ],
          });

          if (singleProduct) {
            ProductData.push(singleProduct);
          }
        }

        if (req.body.feel_id) {
          singleProduct = await db.productModel.findOne({
            $and: [
              { _id: ProductId[j] },
              { feel_id: req.body.feel_id },
              { isFullHome: true },
            ],
          });

          if (singleProduct) {
            ProductData.push(singleProduct);
          }
        }
      }

      return res.status(200).json({
        message: "Succeed.",
        code: 200,
        data: ProductData,
      });
    } else {
      return res.status(400).json({
        message: "Product not found with this address.",
        code: 400,
      });
    }

    //////////////////////////////////////////////////////////////////////////

    // const ProductByCategory = await db.productModel.find({
    //   isFullHome: true,
    // });

    // if (ProductByCategory.length > 0) {
    //   let filteredFeel = [];
    //   let filteredStyle = [];

    //   // let feels = await db.feelModel.find({_id : req.body.feel_id});
    //   // let style = await db.feelModel.find({_id : req.body.style_id});

    //   // if(feels.length > 0){
    //   //   filteredFeel.push()
    //   // }

    //   //**************** Filter by Feel ****************
    //   if (req.body.feel_id) {
    //     filteredFeel = await db.productModel.find({
    //       feel_id: req.body.feel_id,
    //       isFullHome: true,
    //       // feel_id: { $in: req.body.feel_id },
    //       // cat_id: req.body.cat_id,
    //       // $or:[{cat_id: "631b39c838e3f27f76065a60"},{cat_id:"62e794618f3fb4d0e33f5774"}]
    //     });
    //   } else {
    //     filteredFeel = await db.productModel.find({
    //       feel_id: { $exists: true },
    //       isFullHome: true,
    //       // cat_id: req.body.cat_id,
    //       // $or:[{cat_id: "631b39c838e3f27f76065a60"},{cat_id:"62e794618f3fb4d0e33f5774"}]
    //     });
    //   }
    //   // **************** Filter by Style ****************
    //   if (req.body.style_id) {
    //     filteredStyle = await db.productModel.find({
    //       style_id: req.body.style_id,
    //       isFullHome: true,
    //       // cat_id: req.body.cat_id,
    //       // $or:[{cat_id: "631b39c838e3f27f76065a60"},{cat_id:"62e794618f3fb4d0e33f5774"}]
    //     });
    //   } else {
    //     filteredStyle = await db.productModel.find({
    //       style_id: { $exists: true },
    //       isFullHome: true,

    //       // cat_id: req.body.cat_id,
    //       // $or:[{cat_id: "631b39c838e3f27f76065a60"},{cat_id:"62e794618f3fb4d0e33f5774"}]
    //     });
    //   }

    //   // **************** Merge Style And Feel ****************

    //   var ids = new Set(filteredFeel.map((d) => d.feel_id));
    //   var merged = [
    //     ...filteredFeel,
    //     ...filteredStyle.filter((d) => !ids.has(d.feel_id)),
    //   ];

    //   return res.send({
    //     message: "success",
    //     code: 200,
    //     data: merged,
    //   });
    // } else {
    //   return res.send({
    //     message: "No product found.",
    //     code: 200,
    //   });
    // }
  } catch (error) {
    console.log("Geting error while get full home by feel & style:", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};

// <---------------================== PRODUCT BY CAT ID=======================----------------->

exports.productByCat = async (req, res) => {
  try {
    let product = await db.productModel.find({ cat_id: req.body.cat_id });

    res.status(200).json({ message: " Succeed.", code: 200, data: product });
  } catch (error) {
    console.log("Getting error to product by catagory :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};
// <---------------================== GET PRODUCT DETAIL BY ID =======================----------------->

exports.getProductDetail = async (req, res) => {
  try {
    let finalProduct = [];

    let product = await db.productModel.findById({ _id: req.body.id });

    if (product) {
      finalProduct = product.toObject();

      if (req.body.user_id) {
        // FIND USER FAVORITE PRODUCT
        let userFavorite = await db.userFavoriteProduct.findOne({
          userId: req.body.user_id,
          ProductId: req.body.id,
          is_repository: true,
          is_personalized: false,
        });

        if (userFavorite) {
          finalProduct.isFavorite = true;
        } else {
          // if loop change varible value
          if (finalProduct.isFavorite == true) {
            finalProduct.isFavorite = true;
          } else {
            finalProduct.isFavorite = false;
          }
        }
      }

      let fullHomeSubProducts = finalProduct?.full_Home_product;

      if (fullHomeSubProducts?.length > 0) {
        let subProduct = [];
        for (let i = 0; i < fullHomeSubProducts.length; i++) {
          // FATCH PRODUCT

          let subProduct1 = await db.productModel.findById({
            _id: fullHomeSubProducts[i].product_id,
          });
          let temObj = {
            catName: subProduct1.catName,
            first_image: subProduct1.first_image,
            second_image: subProduct1.second_image,
            pro_description: subProduct1.pro_description.reverse(),
          };
          subProduct.push(temObj);
        }
        finalProduct.full_Home_product = subProduct;
      }
      //  HERE IS REVERS SINGLE PRODUCT DESCRIPTION FOR FRONT END VIEW
      finalProduct.pro_description.reverse();
      res
        .status(200)
        .json({ message: "Succeed.", code: 200, data: finalProduct });
    } else {
      res.status(400).json({ message: "Product not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to get product detail :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};
// <---------------================== GET PRODUCT DETAIL BY ID =======================----------------->

exports.getProductById = async (req, res) => {
  try {
    let product = await db.productModel.findById({ _id: req.body.id });

    if (product) {
      res.status(200).json({ message: "Succeed.", code: 200, data: product });
    } else {
      res.status(400).json({ message: "Product not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to get product detail :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};

// <---------------================== getPersonlizedProductDetail =======================----------------->

exports.getPersonlizedProductDetail = async (req, res) => {
  try {
    let finalProduct = [];

    let product = await db.productModel.findById({ _id: req.body.id });

    if (product) {
      finalProduct = product.toObject();

      if (req.body.user_id) {
        // FIND USER FAVORITE PRODUCT
        let userFavorite = await db.userFavoriteProduct.findOne({
          userId: req.body.user_id,
          ProductId: req.body.id,
          is_repository: false,
          is_personalized: true,
        });

        if (userFavorite) {
          finalProduct.isFavorite = true;
        } else {
          // if loop change varible value
          if (finalProduct.isFavorite == true) {
            finalProduct.isFavorite = true;
          } else {
            finalProduct.isFavorite = false;
          }
        }
      }

      let fullHomeSubProducts = finalProduct.full_Home_product;

      if (fullHomeSubProducts.length > 0) {
        let subProduct = [];
        for (let i = 0; i < fullHomeSubProducts.length; i++) {
          // FATCH PRODUCT

          let subProduct1 = await db.productModel.findById({
            _id: fullHomeSubProducts[i].product_id,
          });
          let temObj = {
            catName: subProduct1.catName,
            first_image: subProduct1.first_image,
            second_image: subProduct1.second_image,
            pro_description: subProduct1.pro_description.reverse(),
          };
          subProduct.push(temObj);
        }
        finalProduct.full_Home_product = subProduct;
      }
      //  HERE IS REVERS SINGLE PRODUCT DESCRIPTION FOR FRONT END VIEW
      finalProduct.pro_description.reverse();
      res
        .status(200)
        .json({ message: "Succeed.", code: 200, data: finalProduct });
    } else {
      res.status(400).json({ message: "Product not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to get persnalized product detail :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};

// <---------------================== GET PROJECT PRODUCT =======================----------------->

exports.getProjectProduct = async (req, res) => {
  try {
    let products = [];
    let prodId = req.body.productIds;

    for (let i = 0; i < prodId.length; i++) {
      let product = await db.productModel.findById({
        _id: prodId[i],
      });

      if (product) {
        products.push(product);
      }
    }

    res.status(200).json({ message: "Succeed.", code: 200, data: products });
  } catch (error) {
    console.log("Getting error to get persnalized product detail :", error);
    res.status(400).json({ message: "Something went wrong", code: 400 });
  }
};
