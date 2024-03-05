var mongoose = require("mongoose");

const UsershowInterestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productId: {
      type: String,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("UsershowInterest", UsershowInterestSchema);
