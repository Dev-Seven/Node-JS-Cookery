var mongoose = require("mongoose");

const feedBack = new mongoose.Schema(
  {
    feedback: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedBack);
