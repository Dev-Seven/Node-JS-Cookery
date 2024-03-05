const db = require("../context/ContextManager");

//<-------============= CREAT TESTIMONIAL ===============----------->

exports.creatTestimonial = async (req, res) => {
  try {
    // image file path set here.
    let path = "";
    if (req.file) {
      path = req.file.path.replace(/\\/g, "/");
    }

    const creatTestimonial = new db.testimonialModel({
      name: req.body.name,
      designation: req.body.designation,
      comment: req.body.comment,
      image: path,
    });

    await creatTestimonial.save();

    if (creatTestimonial) {
      return res.status(200).json({
        message: "Testimonial added successfully.",
        code: 200,
        data: creatTestimonial,
      });
    } else {
      return res
        .status(400)
        .json({ message: "something Went Wrong ", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to add testimonial: ", error);
    return res.status(400).json({ message: "something Went Wrong", code: 400 });
  }
};

//<-------============= EDIT TESTIMONIAL ===============----------->

exports.editTestimonial = async (req, res) => {
  try {
    const isTestimonial = await db.testimonialModel.findOne({
      _id: req.body._id,
    });

    // image file path set here.
    let path = "";
    if (req.file) {
      path = req.file.path.replace(/\\/g, "/");
    } else {
      path = req.body.image;
    }

    if (isTestimonial) {
      const updatedTestimonial = {
        name: req.body.name,
        designation: req.body.designation,
        comment: req.body.comment,
        image: path,
      };

      const updateTestimonial = await db.testimonialModel.findByIdAndUpdate(
        req.body._id.toString(),
        updatedTestimonial,
        { new: true }
      );

      await updateTestimonial.save();

      return res.status(200).json({
        message: "Testimonial updated successfuly.",
        code: 200,
        data: updateTestimonial,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Testimonial not found!", code: 400 });
    }
  } catch (error) {
    console.log("Getting error while update testimonial:", error);
    return res
      .status(400)
      .json({ message: "something Went Wrong ", code: 400 });
  }
};

//<-------============= DELETE TESTIMONIAL ===============----------->

exports.deleteTestimonial = async (req, res) => {
  try {
    let deleteTestimonial = await db.testimonialModel.findByIdAndDelete({
      _id: req.body._id,
    });
    if (deleteTestimonial) {
      return res.status(200).json({
        message: "Testimonial deleted successfully.",
        code: 200,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Testimonial not found!", code: 400 });
    }
  } catch (error) {
    console.log("Geting error while delete testimonial:", error);
    return res.status(400).json({ message: "Somthing went wrong", code: 400 });
  }
};

//<-------============= GET ALL TESTIMONIAL ===============----------->

exports.getAllTestimonial = async (req, res) => {
  try {
    const testimonial = await db.testimonialModel.find({});
    if (testimonial.length > 0) {
      return res
        .status(200)
        .json({ message: "Succeed.", code: 200, data: testimonial });
    } else {
      return res
        .status(400)
        .json({ message: "testimonial not found!", code: 200 });
    }
  } catch (error) {
    console.log("Getting Error to get all testimonial:", error);
    return res
      .status(400)
      .json({ message: "something went Wrong.", code: 400 });
  }
};
