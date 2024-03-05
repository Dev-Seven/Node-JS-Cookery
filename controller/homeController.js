const db = require("../context/ContextManager");
const moment = require("moment");

// <---------------================== Insert Home Catagory =======================----------------->

exports.insertHome = async (req, res) => {
  try {
    isHomeExist = await db.homeModel.findOne({
      address: req.body.address,
      Aprt_type: req.body.Aprt_type,
      building_name: req.body.building_name,
      home_block: req.body.home_block,
      numeric_block: req.body.numeric_block,
      alphabet_block: req.body.alphabet_block,
    });
    if (isHomeExist) {
      res.send({
        message: "Duplicate home identifier.",
        code: 400,
      });
    } else {
      const HomeType = await db.homeCatModel.findOne({
        _id: req.body.home_cat_id,
      });

      const newHome = await new db.homeModel({
        address: req.body.address,
        building_name: req.body.building_name,
        alphabet_block: req.body.alphabet_block,
        city: req.body.city,
        State: req.body.State,
        home_block: req.body.home_block,
        home_cat_id: req.body.home_cat_id,
        Aprt_type: req.body.Aprt_type,
        product_id: req.body.product_id.split(","),
        numeric_block: req.body.numeric_block,
        home_cat_name: HomeType.home_cat_name,
        // latitude: req.body.latitude,
        // longitude: req.body.longitude,
        // place_id: req.body.place_id,
      });

      // ************ plan Image **************
      if (
        typeof req.files.plan_image !== "undefined" &&
        req.files.plan_image.length > 0
      ) {
        newHome.plan_image = req.files.plan_image[0].path.replace(/\\/g, "/");
      }
      if (typeof req.body.plan_image !== "undefined" && req.body.plan_image) {
        newHome.plan_image = req.body.plan_image;
      }

      // ************ Building Image **************
      if (
        typeof req.files.building_image !== "undefined" &&
        req.files.building_image.length > 0
      ) {
        newHome.building_image = req.files.building_image[0].path.replace(
          /\\/g,
          "/"
        );
      }
      if (
        typeof req.body.building_image !== "undefined" &&
        req.body.building_image
      ) {
        newHome.building_image = req.body.building_image;
      }

      await newHome.save();

      res.status(200).json({
        message: "Home added successfuly.",
        data: newHome,
        code: 200,
      });
    }
  } catch (erorr) {
    console.log("Getting error to add home :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== Edit Home Catagory =======================----------------->

exports.editHome = async (req, res) => {
  try {
    const isHomeCatagory = await db.homeModel.findOne({ _id: req.body._id });

    isHomeExist = await db.homeModel.findOne({
      address: req.body.address,
      Aprt_type: req.body.Aprt_type,
      building_name: req.body.building_name,
      home_block: req.body.home_block,
      numeric_block: req.body.numeric_block,
      alphabet_block: req.body.alphabet_block,
    });

    // IF HOME NOT EXIST THEN UPDATE HERE.
    if (isHomeExist === null) {
      if (isHomeCatagory) {
        const HomeType = await db.homeCatModel.findOne({
          _id: req.body.home_cat_id,
        });

        let updatedHome = {
          address: req.body.address,
          building_name: req.body.building_name,
          alphabet_block: req.body.alphabet_block,
          city: req.body.city,
          State: req.body.State,
          home_block: req.body.home_block,
          home_cat_id: req.body.home_cat_id,
          Aprt_type: req.body.Aprt_type,
          product_id: req.body.product_id.split(","),
          numeric_block: req.body.numeric_block,
          home_cat_name: HomeType.home_cat_name,
          // place_id: req.body.place_id,
          // latitude: req.body.latitude,
          // longitude: req.body.longitude,
        };

        let updateHome = await db.homeModel.findByIdAndUpdate(
          req.body._id,
          updatedHome,
          { new: true }
        );

        // ************ Plan Image **************
        if (
          typeof req.files.plan_image !== "undefined" &&
          req.files.plan_image.length > 0
        ) {
          updateHome.plan_image = req.files.plan_image[0].path.replace(
            /\\/g,
            "/"
          );
        }
        if (typeof req.body.plan_image !== "undefined" && req.body.plan_image) {
          updateHome.plan_image = req.body.plan_image;
        }
        // ************ Building Image **************
        if (
          typeof req.files.building_image !== "undefined" &&
          req.files.building_image.length > 0
        ) {
          updateHome.building_image = req.files.building_image[0].path.replace(
            /\\/g,
            "/"
          );
        }
        if (
          typeof req.body.building_image !== "undefined" &&
          req.body.building_image
        ) {
          updateHome.building_image = req.body.building_image;
        }

        updateHome.save();

        return res.status(200).json({
          message: "Home updated successfully.",
          data: updateHome,
          code: 200,
        });
      } else {
        return res.status(400).json({
          message: "Home not found!",
          code: 400,
        });
      }
    }
    //  IF UPDATE HOME WITHOUT CHNAGES.
    if (isHomeExist._id.toString() === isHomeCatagory._id.toString()) {
      if (isHomeCatagory) {
        const HomeType = await db.homeCatModel.findOne({
          _id: req.body.home_cat_id,
        });

        let updatedHome = {
          address: req.body.address,
          building_name: req.body.building_name,
          alphabet_block: req.body.alphabet_block,
          city: req.body.city,
          State: req.body.State,
          home_block: req.body.home_block,
          home_cat_id: req.body.home_cat_id,
          Aprt_type: req.body.Aprt_type,
          product_id: req.body.product_id.split(","),
          numeric_block: req.body.numeric_block,
          home_cat_name: HomeType.home_cat_name,
          // place_id: req.body.place_id,
          // latitude: req.body.latitude,
          // longitude: req.body.longitude,
        };

        let updateHome = await db.homeModel.findByIdAndUpdate(
          req.body._id,
          updatedHome,
          { new: true }
        );

        // ************ Plan Image **************
        if (
          typeof req.files.plan_image !== "undefined" &&
          req.files.plan_image.length > 0
        ) {
          updateHome.plan_image = req.files.plan_image[0].path.replace(
            /\\/g,
            "/"
          );
        }
        if (typeof req.body.plan_image !== "undefined" && req.body.plan_image) {
          updateHome.plan_image = req.body.plan_image;
        }
        // ************ Building Image **************
        if (
          typeof req.files.building_image !== "undefined" &&
          req.files.building_image.length > 0
        ) {
          updateHome.building_image = req.files.building_image[0].path.replace(
            /\\/g,
            "/"
          );
        }
        if (
          typeof req.body.building_image !== "undefined" &&
          req.body.building_image
        ) {
          updateHome.building_image = req.body.building_image;
        }

        updateHome.save();

        return res.status(200).json({
          message: "Home updated successfully.",
          data: updateHome,
          code: 200,
        });
      } else {
        return res.status(400).json({
          message: "Home not found!",
          code: 400,
        });
      }
    } else {
      res.send({
        message: "Duplicate home identifier.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to update home Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== Delete Home Catagory =======================----------------->

exports.deleteHome = async (req, res) => {
  try {
    let deleteHome = await db.homeModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleteHome) {
      return res.status(200).json({
        message: "Home deleted successfully.",
        code: 200,
      });
    } else {
      return res.status(400).json({ message: "Home not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete home :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL HOME CATAGORY =======================----------------->

exports.getAllHome = async (req, res) => {
  try {
    const getAllHome = await db.homeModel.find({});

    let homes = [];
    for (let i = 0; i < getAllHome.length; i++) {
      let tempHomeObj = getAllHome[i].toObject();
      tempHomeObj.creatTime = moment(tempHomeObj.createdAt)
        .utcOffset("+05:30")
        .format("llll");
      tempHomeObj.updatedTime = moment(tempHomeObj.updatedAt)
        .utcOffset("+05:30")
        .format("llll");

      if (tempHomeObj) {
        homes.push(tempHomeObj);
      }
    }

    return res.status(200).json({
      message: "Succeed.",
      code: 200,
      data: homes,
    });
  } catch (erorr) {
    console.log("Getting error to get all home :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== Verify Address =======================----------------->

exports.verifyAddressOld = async (req, res) => {
  try {
    const isVerified = await db.homeModel.find({ place_id: req.body.place_id });

    if (isVerified.length > 0) {
      let alphabet_block = [];
      let numeric_block = [];
      let Aprt_type = [];
      let home_cat_name = [];

      for (let i = 0; i < isVerified.length; i++) {
        if (isVerified[i].alphabet_block !== "") {
          alphabet_block.push(isVerified[i].alphabet_block);
        }
        if (isVerified[i].numeric_block !== "") {
          numeric_block.push(isVerified[i].numeric_block);
        }
        if (isVerified[i].Aprt_type !== "") {
          Aprt_type.push(isVerified[i].Aprt_type);
        }
        if (isVerified[i].home_cat_name !== "") {
          home_cat_name.push(isVerified[i].home_cat_name);
        }
      }
      // remove null string
      let alpha = [...new Set(alphabet_block)];
      let num = [...new Set(numeric_block)];
      let aprt_type = [...new Set(Aprt_type)];
      let home_cat = [...new Set(home_cat_name)];
      // set order of Alphabate
      alpha.sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      aprt_type.sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      num.sort(function (a, b) {
        return a - b;
      });
      home_cat.sort(function (a, b) {
        return a - b;
      });

      return res.status(200).json({
        message: "Home data found.",
        code: 200,
        data: isVerified,
        alphabet_block: alpha,
        numeric_block: num,
        aprt_type: aprt_type,
        home_category: home_cat,
      });
    } else {
      return res.status(400).json({
        message: "Home not found with this address.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to verify address :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== Verify Address =======================----------------->

exports.verifyAddress = async (req, res) => {
  try {
    const isVerified = await db.homeModel.find({
      address: req.body.address,
      city: req.body.city,
      State: req.body.State,
    });

    if (isVerified.length > 0) {
      let alphabet_block = [];
      let numeric_block = [];
      let Aprt_type = [];
      let home_cat_name = [];

      for (let i = 0; i < isVerified.length; i++) {
        if (isVerified[i].alphabet_block !== "") {
          alphabet_block.push(isVerified[i].alphabet_block);
        }
        if (isVerified[i].numeric_block !== "") {
          numeric_block.push(isVerified[i].numeric_block);
        }
        if (isVerified[i].Aprt_type !== "") {
          Aprt_type.push(isVerified[i].Aprt_type);
        }
        if (isVerified[i].home_cat_name !== "") {
          home_cat_name.push(isVerified[i].home_cat_name);
        }
      }
      // remove null string
      let alpha = [...new Set(alphabet_block)];
      let num = [...new Set(numeric_block)];
      let aprt_type = [...new Set(Aprt_type)];
      let home_cat = [...new Set(home_cat_name)];
      // set order of Alphabate
      alpha.sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      aprt_type.sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      num.sort(function (a, b) {
        return a - b;
      });
      home_cat.sort(function (a, b) {
        return a - b;
      });

      return res.status(200).json({
        message: "Home data found.",
        code: 200,
        data: isVerified,
        alphabet_block: alpha,
        numeric_block: num,
        aprt_type: aprt_type,
        home_category: home_cat,
      });
    } else {
      return res.status(400).json({
        message: "Home not found with this address.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to verify address :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET BLOCK BY ADDRESS =======================----------------->

exports.getBlocksByAprtType = async (req, res) => {
  try {
    const isVerified = await db.homeModel.find({
      // place_id: req.body.place_id,
      address: req.body.address,
      city: req.body.city,
      State: req.body.State,
      Aprt_type: req.body.Aprt_type,
    });

    if (isVerified.length > 0) {
      let alphabet_block = [];
      let numeric_block = [];
      for (let i = 0; i < isVerified.length; i++) {
        if (isVerified[i].alphabet_block !== "") {
          alphabet_block.push(isVerified[i].alphabet_block);
        }
        if (isVerified[i].numeric_block !== "") {
          numeric_block.push(isVerified[i].numeric_block);
        }
      }
      // remove null string
      let alpha = [...new Set(alphabet_block)];
      let num = [...new Set(numeric_block)];

      // set order of Alphabate
      alpha.sort(function (a, b) {
        return a.localeCompare(b); //using String.prototype.localCompare()
      });
      num.sort(function (a, b) {
        return a - b;
      });
      return res.status(200).json({
        message: "Home blocks found!",
        code: 200,
        alphabet_block: alpha,
        numeric_block: num,
      });
    } else {
      return res.status(400).json({
        message: "Home not found with this address.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to verify address :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== get All Full HomeBy Address =======================----------------->

exports.getAllFullHomeByAddress = async (req, res) => {
  try {
    let fullHomeByAddress = [];

    // alpha & numeric are not
    if (!req.body.numeric_block && !req.body.alphabet_block) {
      fullHomeByAddress = await db.homeModel.find({
        // place_id: req.body.place_id,
        address: req.body.address,
        city: req.body.city,
        State: req.body.State,
        Aprt_type: req.body.Aprt_type,
      });
    }

    // if Numeric-block
    if (req.body.numeric_block) {
      fullHomeByAddress = await db.homeModel.find({
        // place_id: req.body.place_id,
        address: req.body.address,
        city: req.body.city,
        State: req.body.State,
        Aprt_type: req.body.Aprt_type,
        numeric_block: req.body.numeric_block,
      });
    }
    // if Alpha-block
    else if (req.body.alphabet_block) {
      fullHomeByAddress = await db.homeModel.find({
        // place_id: req.body.place_id,
        address: req.body.address,
        city: req.body.city,
        State: req.body.State,
        Aprt_type: req.body.Aprt_type,
        alphabet_block: req.body.alphabet_block,
      });
    }
    if (fullHomeByAddress.length > 0) {
      let ProductId = [];
      let ProductData = [];

      for (let i = 0; i < fullHomeByAddress.length; i++) {
        prodArray = fullHomeByAddress[i].product_id;
        for (let j = 0; j < prodArray.length; j++) {
          ProductId.push(prodArray[j]);
        }
      }

      for (let j = 0; j < ProductId.length; j++) {
        singleProduct = {};
        singleProduct = await db.productModel.findOne({ _id: ProductId[j] });
        // ***********************************************************************************************
        // HERE IS FILTER ONLY FULL HOME BY STYLE &  FEEL BY ADDRESS
        //**************** Filter by Style feel ****************
        if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            feel_id: { $in: req.body.feel_id },
            isFullHome: true,
          });
        }
        //**************** Only Style ****************
        else if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            style_id: { $in: req.body.style_id },
            isFullHome: true,
          });
        }
        //**************** Style & Feel ****************
        else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],

            $and: [
              {
                style_id: { $in: req.body.style_id },
                feel_id: { $in: req.body.feel_id },
                isFullHome: true,
              },
            ],
          });
        }
        //**************** WithOut Filter ****************
        else {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            isFullHome: true,
          });
        }
        // PUSH SINGLE FULL HOME INTO ARRAY
        if (singleProduct) {
          ProductData.push(singleProduct);
        }
      }

      // ADD IS FAVORITE KEY

      let userFavorite = await db.userFavoriteProduct.find({
        userId: req.body.user_id,
        is_repository: false,
        is_personalized: true,
      });
      let newProduct = [];

      if (req.body.user_id) {
        for (let i = 0; i < ProductData.length; i++) {
          let prod = ProductData[i].toObject();
          for (let j = 0; j < userFavorite.length; j++) {
            if (ProductData[i]._id == userFavorite[j].ProductId) {
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
        ProductData = newProduct;
      }
      // ***********************************************************************************************
      // HERE IS FILTER ALL SINGLE CATEGORY BY STYLE &  FEEL

      //**************** Filter by Style feel ****************
      if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
        isSingleProduct = await db.productModel.find({
          feel_id: { $in: req.body.feel_id },
          isFullHome: false,
        });
      }
      //**************** Only Style ****************
      else if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
        isSingleProduct = await db.productModel.find({
          style_id: { $in: req.body.style_id },
          isFullHome: false,
        });
      }
      //**************** Style & Feel ****************
      else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
        isSingleProduct = await db.productModel.find({
          $and: [
            {
              style_id: { $in: req.body.style_id },
              feel_id: { $in: req.body.feel_id },
              isFullHome: false,
            },
          ],
        });
      }
      //**************** WithOut Filter ****************
      else {
        isSingleProduct = await db.productModel.find({ isFullHome: false });
      }

      // ***********************************************************************************************

      let unique_cats = isSingleProduct
        //*********  let unique_cats= merged*********
        .map((item) => item.catName)
        .filter((value, index, self) => self.indexOf(value) === index);

      let allCategories = {};
      let userFavorite1 = await db.userFavoriteProduct.find({
        userId: req.body.user_id,
        is_repository: false,
        is_personalized: true,
      });
      unique_cats.map(async (name) => {
        //********* Get Categopry Name by *********
        let product = isSingleProduct.filter((item) => item?.catName === name);

        let newProduct = [];
        // Login
        if (req.body.user_id) {
          for (let i = 0; i < product.length; i++) {
            let prod = product[i].toObject();
            for (let j = 0; j < userFavorite1.length; j++) {
              if (product[i]._id == userFavorite1[j].ProductId) {
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

      allCategories["Full Home"] = ProductData;
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

      //  HERE IS SET ORDER .
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
        message: "Full Home data found.",
        code: 200,
        data: finalList,
      });
    } else {
      return res.status(400).json({
        message: "Product not found with this address.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get all product by address :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
exports.getAllFullHomeByAddressOld = async (req, res) => {
  try {
    let fullHomeByAddress = [];

    // alpha & numeric are not
    if (!req.body.numeric_block && !req.body.alphabet_block) {
      fullHomeByAddress = await db.homeModel.find({
        place_id: req.body.place_id,
        Aprt_type: req.body.Aprt_type,
      });
    }

    // if Numeric-block
    if (req.body.numeric_block) {
      fullHomeByAddress = await db.homeModel.find({
        place_id: req.body.place_id,
        Aprt_type: req.body.Aprt_type,
        numeric_block: req.body.numeric_block,
      });
    }
    // if Alpha-block
    else if (req.body.alphabet_block) {
      fullHomeByAddress = await db.homeModel.find({
        place_id: req.body.place_id,
        Aprt_type: req.body.Aprt_type,
        alphabet_block: req.body.alphabet_block,
      });
    }

    if (fullHomeByAddress.length > 0) {
      let ProductId = [];
      let ProductData = [];

      for (let i = 0; i < fullHomeByAddress.length; i++) {
        ProductId.push(fullHomeByAddress[i].product_id);
      }

      for (let j = 0; j < ProductId.length; j++) {
        singleProduct = {};
        singleProduct = await db.productModel.findOne({ _id: ProductId[j] });
        // ***********************************************************************************************
        // HERE IS FILTER ONLY FULL HOME BY STYLE &  FEEL BY ADDRESS
        //**************** Filter by Style feel ****************
        if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            feel_id: { $in: req.body.feel_id },
            isFullHome: true,
          });
        }
        //**************** Only Style ****************
        else if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            style_id: { $in: req.body.style_id },
            isFullHome: true,
          });
        }
        //**************** Style & Feel ****************
        else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],

            $and: [
              {
                style_id: { $in: req.body.style_id },
                feel_id: { $in: req.body.feel_id },
                isFullHome: true,
              },
            ],
          });
        }
        //**************** WithOut Filter ****************
        else {
          singleProduct = await db.productModel.findOne({
            _id: ProductId[j],
            isFullHome: true,
          });
        }
        // PUSH SINGLE FULL HOME INTO ARRAY
        if (singleProduct) {
          ProductData.push(singleProduct);
        }
      }

      // ADD IS FAVORITE KEY

      let userFavorite = await db.userFavoriteProduct.find({
        userId: req.body.user_id,
        is_repository: false,
        is_personalized: true,
      });
      let newProduct = [];

      if (req.body.user_id) {
        for (let i = 0; i < ProductData.length; i++) {
          let prod = ProductData[i].toObject();
          for (let j = 0; j < userFavorite.length; j++) {
            if (ProductData[i]._id == userFavorite[j].ProductId) {
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
        ProductData = newProduct;
      }
      // ***********************************************************************************************
      // HERE IS FILTER ALL SINGLE CATEGORY BY STYLE &  FEEL

      //**************** Filter by Style feel ****************
      if (req.body.feel_id.length > 0 && req.body.style_id.length == 0) {
        isSingleProduct = await db.productModel.find({
          feel_id: { $in: req.body.feel_id },
          isFullHome: false,
        });
      }
      //**************** Only Style ****************
      else if (req.body.feel_id.length == 0 && req.body.style_id.length > 0) {
        isSingleProduct = await db.productModel.find({
          style_id: { $in: req.body.style_id },
          isFullHome: false,
        });
      }
      //**************** Style & Feel ****************
      else if (req.body.feel_id.length > 0 && req.body.style_id.length > 0) {
        isSingleProduct = await db.productModel.find({
          $and: [
            {
              style_id: { $in: req.body.style_id },
              feel_id: { $in: req.body.feel_id },
              isFullHome: false,
            },
          ],
        });
      }
      //**************** WithOut Filter ****************
      else {
        isSingleProduct = await db.productModel.find({ isFullHome: false });
      }

      // ***********************************************************************************************

      let unique_cats = isSingleProduct
        //*********  let unique_cats= merged*********
        .map((item) => item.catName)
        .filter((value, index, self) => self.indexOf(value) === index);

      let allCategories = {};
      let userFavorite1 = await db.userFavoriteProduct.find({
        userId: req.body.user_id,
        is_repository: false,
        is_personalized: true,
      });
      unique_cats.map(async (name) => {
        //********* Get Categopry Name by *********
        let product = isSingleProduct.filter((item) => item?.catName === name);

        let newProduct = [];
        // Login
        if (req.body.user_id) {
          for (let i = 0; i < product.length; i++) {
            let prod = product[i].toObject();
            for (let j = 0; j < userFavorite1.length; j++) {
              if (product[i]._id == userFavorite1[j].ProductId) {
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

      allCategories["Full Home"] = ProductData;
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

      //  HERE IS SET ORDER .
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
        message: "Full Home data found.",
        code: 200,
        data: finalList,
      });
    } else {
      return res.status(400).json({
        message: "Product not found with this address.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get all product by address :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== PERSONALIZED FULL HOME FILTER =======================----------------->

exports.personalizedFullHome = async (req, res) => {
  try {
    let personliedFullHome = [];

    let location = req.body.location;
    let building = req.body.building_name;
    // HERE IS ONLY BUILDING NAME WITH ADDRESS OF FULL HOMES
    if (building && !location) {
      let buildingWithAddress = building.split(",");
      let buildingName = buildingWithAddress.splice(0, 1);
      let address = buildingWithAddress.join(",");
      let building_name = buildingName[0].trim();

      // let Home = await db.homeModel
      //   .find({
      //     building_name: { $regex: building_name, $options: "i" },
      //   })
      //   .sort({ building_name: 1 });

      // let Home = await db.homeModel.find({
      //   building_name: building_name,
      //   address: address.trim(),
      // });

      let Home = await db.homeModel.aggregate([
        { $match: { building_name: { $regex: building_name, $options: "i" } } },
        {
          $group: {
            _id: {
              building_name: "$building_name",
              address: "$address",
            },
          },
        },
      ]);

      finalArray = [];
      // find document by unique (Address & Building Name)
      for (let i = 0; i < Home.length; i++) {
        let objOfKey = Home[i]._id;
        let values = Object.values(objOfKey);

        let oneAddress = await db.homeModel.findOne({
          building_name: values[0],
          address: values[1],
        });
        if (oneAddress) {
          finalArray.push(oneAddress);
        }
      }
      // sort Array by Alphabates

      finalArray.sort(function (a, b) {
        var textA = a.building_name.toUpperCase();
        var textB = b.building_name.toUpperCase();

        return textA.localeCompare(textB);
      });

      personliedFullHome = finalArray;
    }
    // HERE IS ONLY LOCATION ( CITY & STATE ) OF FULL HOMES
    else if (location && !building) {
      let differLocation = location.split(",");
      city = differLocation[0].trim();
      State = differLocation[1].trim();

      // let Home = await db.homeModel
      //   .find({
      //     city: city,
      //     State: State,
      //   })
      //   .sort({ building_name: 1 });

      let Home = await db.homeModel.aggregate([
        { $match: { city: city, State: State } },
        {
          $group: {
            _id: {
              building_name: "$building_name",
              address: "$address",
            },
          },
        },
      ]);

      finalArray = [];
      // find document by unique (Address & Building Name)
      for (let i = 0; i < Home.length; i++) {
        let objOfKey = Home[i]._id;
        let values = Object.values(objOfKey);

        let oneAddress = await db.homeModel.findOne({
          building_name: values[0],
          address: values[1],
        });
        if (oneAddress) {
          finalArray.push(oneAddress);
        }
      }
      // sort Array by Alphabates

      finalArray.sort(function (a, b) {
        var textA = a.building_name.toUpperCase();
        var textB = b.building_name.toUpperCase();

        return textA.localeCompare(textB);
      });

      personliedFullHome = finalArray;
    }
    // HERE IS  LOCATION & BUILDING NAME  OF FULL HOMES
    else if (building && location) {
      // DIFIN BULDING & ADDRESS
      let buildingWithAddress = building.split(",");
      let buildingName = buildingWithAddress.splice(0, 1);
      let address = buildingWithAddress.join(",");
      let building_name = buildingName[0].trim();

      // DIFIN LOCATION
      let differLocation = location?.split(",");
      city = differLocation[0]?.trim();
      State = differLocation[1]?.trim();

      // let Home = await db.homeModel
      //   .find({
      //     $and: [
      //       { city: city },
      //       { State: State },
      //       { building_name: { $regex: building_name, $options: "i" } },
      //     ],
      //   })
      //   .sort({ building_name: 1 });
      // let Home = await db.homeModel.find({
      //   $and: [
      //     { city: city },
      //     { State: State },
      //     { building_name: building_name },
      //     { address: address.trim() },
      //   ],
      // });

      let Home = await db.homeModel.aggregate([
        {
          $match: {
            city: city,
            State: State,
            building_name: { $regex: building_name, $options: "i" },
          },
        },
        {
          $group: {
            _id: {
              building_name: "$building_name",
              address: "$address",
            },
          },
        },
      ]);

      finalArray = [];
      // find document by unique (Address & Building Name)
      for (let i = 0; i < Home.length; i++) {
        let objOfKey = Home[i]._id;
        let values = Object.values(objOfKey);

        let oneAddress = await db.homeModel.findOne({
          building_name: values[0],
          address: values[1],
        });
        if (oneAddress) {
          finalArray.push(oneAddress);
        }
      }
      // sort Array by Alphabates

      finalArray.sort(function (a, b) {
        var textA = a.building_name.toUpperCase();
        var textB = b.building_name.toUpperCase();

        return textA.localeCompare(textB);
      });

      personliedFullHome = finalArray;
    }

    // HERE IS WITHOUT LOCATION & BUILDING
    else {
      // check unique value in database

      let Home = await db.homeModel.aggregate([
        {
          $group: {
            _id: {
              building_name: "$building_name",
              address: "$address",
            },
          },
        },
      ]);

      finalArray = [];
      // find document by unique (Address & Building Name)
      for (let i = 0; i < Home.length; i++) {
        let objOfKey = Home[i]._id;
        let values = Object.values(objOfKey);

        let oneAddress = await db.homeModel.findOne({
          building_name: values[0],
          address: values[1],
        });
        if (oneAddress) {
          finalArray.push(oneAddress);
        }
      }
      // sort Array by Alphabates

      finalArray.sort(function (a, b) {
        var textA = a.building_name.toUpperCase();
        var textB = b.building_name.toUpperCase();

        return textA.localeCompare(textB);
      });

      personliedFullHome = finalArray;
    }

    res.send({
      message: "Personlized full homes.",
      code: 200,
      data: personliedFullHome,
    });
  } catch (erorr) {
    console.log("Getting error to get all personalied full home :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== GET ALL LOCATIONS =======================----------------->

exports.getAllLocation = async (req, res) => {
  try {
    let allLocation = [];

    let allHome = await db.homeModel.find({});

    for (let i = 0; i < allHome.length; i++) {
      let finalLocation = allHome[i].city + "," + allHome[i].State;
      allLocation.push(finalLocation);
    }

    // TRIM ALL VALUES ( REMOVE SPACE)
    const results = allLocation.map((element) => {
      return element.trim();
    });
    // SET UNIQUE VALUE
    let uniqueLocation = [...new Set(results)];
    // SOER BY ALPHABATE
    uniqueLocation.sort(function (a, b) {
      return a.localeCompare(b);
    });

    res.send({
      message: "All locations",
      code: 200,
      data: uniqueLocation,
    });
  } catch (erorr) {
    console.log("Getting error to get all location :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== GET ALL BUILDING NAME WITH ADDRESS =======================----------------->

exports.getBuildingName = async (req, res) => {
  try {
    let allBuildingName = [];

    let allHome = await db.homeModel.find({});

    for (let i = 0; i < allHome.length; i++) {
      let finalBuildingName =
        allHome[i].building_name + "," + allHome[i].address;
      allBuildingName.push(finalBuildingName);
    }

    res.send({
      message: "All building name with address.",
      code: 200,
      data: allBuildingName,
    });
  } catch (erorr) {
    console.log("Getting error to get all location :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== VERIFY BUILDING IMAGE =======================----------------->

exports.verifyBuildingImage = async (req, res) => {
  try {
    let isHomeExist = await db.homeModel.findOne({
      address: req.body.address,
      Aprt_type: req.body.Aprt_type,
      building_name: req.body.building_name,
      home_block: req.body.home_block,
      numeric_block: req.body.numeric_block,
      alphabet_block: req.body.alphabet_block,
    });

    if (isHomeExist) {
      res.send({
        message: "Home is exist.",
        code: 200,
        data: isHomeExist,
      });
    } else {
      res.send({
        message: "Home does not exist.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get all location :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== CHECK IS HOME EXIST =======================----------------->

exports.isHomeExist = async (req, res) => {
  try {
    let isHomeExist = await db.homeModel.findOne({
      address: req.body.address,
      building_name: req.body.building_name,
    });

    if (isHomeExist) {
      res.send({
        message: "Home is exist.",
        code: 200,
        data: isHomeExist,
      });
    } else {
      res.send({
        message: "Home does not exist.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to get all location :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
