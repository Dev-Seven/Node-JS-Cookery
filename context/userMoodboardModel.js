var mongoose = require("mongoose");

const userMoodboardSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    productId: {
      type: Array,
    },
    projectName: {
      type: String,
    },
    buildingName: {
      type: String,
    },
    aprt_type: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    State: {
      type: String,
    },
    // location: {
    //   type: String,
    // },
    // place_id: {
    //   type: String,
    // },
    alphabet_block: {
      type: String,
    },
    numeric_block: {
      type: String,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("UserMoodboard", userMoodboardSchema);
