const db = require("../context/ContextManager");

// <---------------================== Insert Home Catagory =======================----------------->

exports.insertHomeCatagory = async (req, res) => {
  try {
    let isHomeCatExist = await db.homeCatModel.findOne({
      home_cat_name: req.body.home_cat_name,
    });

    if (isHomeCatExist) {
      res.send({
        message: "Home Catagory already exists!",
        code: 400,
      });
    } else {
      const createHomeCatagory = await new db.homeCatModel({
        home_cat_name: req.body.home_cat_name,
      });

      await createHomeCatagory.save();

      res.status(200).json({
        message: "Home Category added successfuly.",
        data: createHomeCatagory,
        code: 200,
      });
    }
  } catch (erorr) {
    console.log("Getting error to insert Home Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== Edit Home Catagory =======================----------------->

exports.editHomeCatagory = async (req, res) => {
  try {
    const isHomeCatagory = await db.homeCatModel.findOne({ _id: req.body._id });
    if (isHomeCatagory) {
      let UpdatedHomeCatagory = {
        home_cat_name: req.body.home_cat_name,
      };

      let updateHomeCatagory = await db.homeCatModel.findByIdAndUpdate(
        req.body._id,
        UpdatedHomeCatagory,
        { new: true }
      );

      updateHomeCatagory.save();

      return res.status(200).json({
        message: "Home Category updated successfully.",
        data: updateHomeCatagory,
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "Home Category not found! ",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to Edit home Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== Delete Home Catagory =======================----------------->

exports.deleteHomeCatagory = async (req, res) => {
  try {
    let deleteHomeCatagory = await db.homeCatModel.findByIdAndDelete({
      _id: req.body._id,
    });
    if (deleteHomeCatagory) {
      return res.status(200).json({
        message: "Home Category deleted successfully.",
        code: 200,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Home category not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to Delete Home Catagory:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL HOME CATAGORY =======================----------------->

exports.getAllHomeCatagory = async (req, res) => {
  try {
    const getHomeAllCatagory = await db.homeCatModel.find({});

    return res.status(200).json({
      message: "Succeed.",
      code: 200,
      data: getHomeAllCatagory,
    });
  } catch (erorr) {
    console.log("Getting error to fatch All Home Catagory :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
