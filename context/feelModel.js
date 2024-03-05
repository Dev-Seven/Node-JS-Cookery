var mongoose = require("mongoose");


const feelSchema = new mongoose.Schema(
  {
    feelName: {
      type: String,
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("feel", feelSchema);
