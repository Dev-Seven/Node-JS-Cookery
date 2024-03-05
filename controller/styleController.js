const db = require("../context/ContextManager");

// <---------------================== INSERT STYLE =======================----------------->

exports.insertStyle = async (req, res) => {
  try {
    let isStyleExists = await db.styleModel.findOne({
      styleName: req.body.styleName,
    });

    if (isStyleExists) {
      res.send({
        message: "Style already exists!",
        code: 400,
      });
    } else {
      const insertStyle = await new db.styleModel({
        styleName: req.body.styleName,
      });

      await insertStyle.save();

      return res.status(200).json({
        message: "Style added successfuly.",
        data: insertStyle,
        code: 200,
      });
    }
  } catch (erorr) {
    console.log("Getting error to add style:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== EDIT STYLE =======================----------------->

exports.editStyle = async (req, res) => {
  try {
    const isStyle = await db.styleModel.findOne({ _id: req.body._id });

    if (isStyle) {
      let UpdatedStyle = {
        styleName: req.body.styleName,
      };

      let updatStyle = await db.styleModel.findByIdAndUpdate(
        req.body._id,
        UpdatedStyle,
        { new: true }
      );

      updatStyle.save();

      return res.status(200).json({
        message: "Style updated successfully.",
        data: updatStyle,
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "Style not found!",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to update style :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE STYLE  =======================----------------->

exports.deleteStyle = async (req, res) => {
  try {
    let deleteStyle = await db.styleModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleteStyle) {
      return res.status(200).json({
        message: "Style deleted successfully.",
        code: 200,
      });
    } else {
      return res.status(400).json({ message: "Style not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete style :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL FEEL =======================----------------->

exports.getAllStyle = async (req, res) => {
  try {
    const getAllStyle = await db.styleModel.find({});

    return res
      .status(200)
      .json({ message: "Succeed.", code: 200, data: getAllStyle });
  } catch (erorr) {
    console.log("Getting error to fatch all style :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
