var mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    home_cat_id: {
      type: String,
    },
    Aprt_type: {
      type: String,
    },
    product_id: {
      type: Array,
    },
    plan_image: {
      type: String,
      default: "",
    },
    building_image: {
      type: String,
      default: "",
    },
    home_block: {
      type: String,
    },
    home_cat_name: {
      type: String,
    },
    numeric_block: {
      type: String,
    },
    building_name: {
      type: String,
    },
    alphabet_block: {
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
    // place_id: {
    //   type: String,
    // },
    // latitude: {
    //   type: String,
    // },
    // longitude: {
    //   type: String,
    // },
  },

  { timestamps: true }
);

module.exports = mongoose.model("home", homeSchema);
