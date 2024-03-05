const db = require("../context/ContextManager");

// <---------------================== CREATE QUESTION =======================----------------->

exports.createQuestion = async (req, res) => {
  try {
    const createFAQ = await new db.FAQModel({
      question: req.body.question,
      answer: req.body.answer,
    });

    await createFAQ.save();

    return res.status(200).json({
      message: "QA is inserted Successfuly",
      data: createFAQ,
      code: 200,
    });
  } catch (erorr) {
    console.log("Getting error to insert Question:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== EDIT QUESTION =======================----------------->

exports.editQuestion = async (req, res) => {
  try {
    const isQA = await db.FAQModel.findOne({ _id: req.body._id });

    if (isQA) {
      let UpdatedQA = {
        question: req.body.question,
        answer: req.body.answer,
      };

      let updateQA = await db.FAQModel.findByIdAndUpdate(
        req.body._id,
        UpdatedQA,
        { new: true }
      );

      updateQA.save();

      return res.status(200).json({
        message: "QA is Update Successfully ",
        data: updateQA,
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "QA not found ",
        code: 400,
      });
    }
  } catch (erorr) {
    console.log("Getting error to Edit Question:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE QUESTION =======================----------------->

exports.deleteQuestion = async (req, res) => {
  try {
    let deleteQA = await db.FAQModel.findByIdAndDelete({
      _id: req.body.id,
    });
    if (deleteQA) {
      return res.status(200).json({
        message: "QA is delete successfully",
        code: 200,
      });
    } else {
      return res.status(400).json({ message: "QA not found", code: 400 });
    }
  } catch (erorr) {
    console.log("Getting error to Delete Question:", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};

// <---------------================== GET ALL FAQ =======================----------------->

exports.getAllFAQ = async (req, res) => {
  try {
    const getAllQA = await db.FAQModel.find({});

    return res.status(200).json({ message: "success", code: 200, data: getAllQA });
  } catch (erorr) {
    console.log("Getting error to fatch All FAQ :", erorr);
    res.status(400).json({
      message: "Something went wrong",
      code: 400,
    });
  }
};
