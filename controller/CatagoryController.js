const db = require("../context/ContextManager");

// <---------------================== CREATE CATAGORY =======================----------------->

exports.insertCatagory = async (req, res) => {
  try {
    var s = "full home";
    if (s == req.body.Cat_name.trim().toLowerCase()) {
      console.log("mathced");
      res.send({
        message: "Category already exists!",
        code: 400,
      });
      return;
    }

    let isExist = await db.CatagoryModel.find({
      Cat_name: new RegExp(req.body.Cat_name.trim(), "i"),
    });

    if (isExist.length) {
      res.send({
        message: "Category already exists!",
        code: 400,
      });
    } else {
      // here is check order of category
      let isOrder = await db.CatagoryModel.findOne({
        order: req.body.order,
      });
      if (isOrder) {
        res.send({
          message: "Order is already exists!",
          code: 400,
        });
      } else {
        const createCatagory = await new db.CatagoryModel({
          Cat_name: req.body.Cat_name.trim(),
          order: req.body.order,
        });

        await createCatagory.save();

        res.status(200).json({
          message: "Category inserted Successfuly.",
          data: createCatagory,
          code: 200,
        });
      }
    }
  } catch (erorr) {
    console.log("Getting error to insert Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== EDIT CATAGORY =======================----------------->

exports.editCatagory = async (req, res) => {
  try {
    var s = "Full Home";
    if (s.toLowerCase() == req.body.Cat_name.trim().toLowerCase()) {
      res.send({
        message: "Category already exists!",
        code: 400,
      });
      return;
    }

    const isCatagory = await db.CatagoryModel.findOne({
      _id: req.body._id,
    });
    if (isCatagory) {
      const dbName = await db.CatagoryModel.findOne({
        Cat_name: req.body.Cat_name.trim(),
      });
      if (dbName) {
        if (
          dbName._id != req.body._id &&
          dbName.Cat_name == req.body.Cat_name.trim()
        ) {
          res.send({
            message: "Name is already exists!",
            code: 400,
          });
          return;
        }
      }

      const dbOrder = await db.CatagoryModel.findOne({ order: req.body.order });
      if (dbOrder) {
        if (dbOrder._id != req.body._id && isCatagory.order != req.body.order) {
          res.send({
            message: "Order is already exists!",
            code: 400,
          });
          return;
        }
      }

      let UpdatedCatagory = {
        Cat_name: req.body.Cat_name.trim(),
        order: req.body.order,
      };

      let updateCatagory = await db.CatagoryModel.findByIdAndUpdate(
        req.body._id,
        UpdatedCatagory,
        { new: true }
      );

      updateCatagory.save();

      // UPDATE CATEGORY IN PRODUCT TABLE AS WELL :

      let updatedProd = {
        catName: req.body.Cat_name,
        cat_id: req.body._id,
      };

      let updateProduct = await db.productModel.updateMany(
        { cat_id: req.body._id },
        updatedProd,
        { new: true }
      );

      // SEND RESPONSE
      return res.status(200).json({
        message: "Category updated successfully.",
        data: updateCatagory,
        code: 200,
      });
    } else {
      return res.send({
        message: "Category not found! ",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to update Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE CATAGORY =======================----------------->

exports.deleteCatagory = async (req, res) => {
  try {
    let deleteCatagory = await db.CatagoryModel.findByIdAndDelete({
      _id: req.body.id,
    });

    if (deleteCatagory) {
      // DELETE PRODUCT OF CATEGORY AS WELL.
      let deleteProduct = await db.productModel.deleteMany({
        cat_id: req.body.id,
      });
      // RESPONSE
      return res.status(200).json({
        message: "Category and it product deleted successfully.",
        code: 200,
      });
    } else {
      return res.send({ message: "Category not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete category:", erorr);
    res.send({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL CATAGORY =======================----------------->

exports.getAllCatagory = async (req, res) => {
  try {
    const getAllCatagory = await db.CatagoryModel.find({});

    return res
      .status(200)
      .json({ message: "Succeed.", code: 200, data: getAllCatagory });
  } catch (erorr) {
    console.log("Getting error to fatch All Catagory :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET CATAGORY BY ID=======================----------------->

exports.getCategoryById = async (req, res) => {
  try {
    const category = await db.CatagoryModel.findById({ _id: req.body._id });

    if (category) {
      return res
        .status(200)
        .json({ message: "Succeed.", code: 200, data: category });
    } else {
      return res
        .status(200)
        .json({ message: "Category not found.", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to fatch All Catagory :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
