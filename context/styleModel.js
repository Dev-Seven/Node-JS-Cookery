var mongoose = require("mongoose");


const styleSchema = new mongoose.Schema(
  {
    styleName: {
      type: String,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("style", styleSchema);
