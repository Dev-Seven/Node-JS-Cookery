const db = require("../context/ContextManager");

// <---------------================== INSERT FEEDBACK =======================----------------->

exports.feedback = async (req, res) => {
  try {
    if (req.body.feedback) {
      const feedback = await new db.feedbackModel({
        feedback: req.body.feedback,
      });

      await feedback.save();

      return res.status(200).json({
        message: "Thank you for submitting feedback.",
        data: feedback,
        code: 200,
      });
    } else {
      return res.status(200).json({
        message: "Feedback is required.",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to  submitting feedback.:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL  FEEDBACK =======================----------------->

exports.getAllfeedback = async (req, res) => {
  try {
    const feedback = await db.feedbackModel.find({});

    return res.status(200).json({
      message: " All feed backs",
      data: feedback,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to  submitting feedback.:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
// <---------------================== DELETE FEEDBACK =======================----------------->

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await db.feedbackModel.findByIdAndDelete({
      _id: req.body._id,
    });

    if (feedback) {
      return res.status(200).json({
        message: "Feedback deleted successfully.",
        code: 200,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Feedback not found!", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to delete feedback.:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
