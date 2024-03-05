var mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    image: {
      type: String,
    },
    comment: {
        type: String
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("testimonial", testimonialSchema);
