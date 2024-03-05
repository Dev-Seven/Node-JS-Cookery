const db = require("../context/ContextManager");

// <---------------================== INSERT FEEL =======================----------------->

exports.insertFeel = async (req, res) => {
  try {
    let isFeelExists = await db.feelModel.findOne({
      feelName: req.body.feelName,
    });

    if (isFeelExists) {
      res.send({
        message: "Feel already exists!",
        code: 400,
      });
    } else {
      const insertFeel = await new db.feelModel({
        feelName: req.body.feelName,
      });

      await insertFeel.save();

      return res.status(200).json({
        message: "Feel added successfuly.",
        data: insertFeel,
        code: 200,
      });
    }
  } catch (erorr) {
    console.log("Getting error to add feel:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== EDIT FEEL =======================----------------->

exports.editFeel = async (req, res) => {
  try {
    const isFeel = await db.feelModel.findOne({ _id: req.body._id });

    if (isFeel) {
      let UpdatedFeel = {
        feelName: req.body.feelName,
      };

      let updatFeel = await db.feelModel.findByIdAndUpdate(
        req.body._id,
        UpdatedFeel,
        { new: true }
      );

      updatFeel.save();

      return res.status(200).json({
        message: "Feel updated successfully.",
        data: updatFeel,
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "Feel not found ",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to Edit Feel :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE FEEL  =======================----------------->

exports.deleteFeel = async (req, res) => {
  try {
    let deleteFeel = await db.feelModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleteFeel) {
      return res.status(200).json({
        message: "Feel deleted successfully.",
        code: 200,
      });
    } else {
      return res.status(400).json({ message: "Feel not found", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to Delete Feel:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL FEEL =======================----------------->

exports.getAllFeel = async (req, res) => {
  try {
    const getAllFeel = await db.feelModel.find({});

    return res
      .status(200)
      .json({ message: "Succeed.", code: 200, data: getAllFeel });
  } catch (erorr) {
    console.log("Getting error to fatch All Feel :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
