let mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    min_price: {
      type: Number,
    },
    max_price: {
      type: Number,
    },
    min_TimeLine: {
      type: String,
    },
    max_TimeLine: {
      type: String,
    },
    cat_id: {
      type: String,
    },
    feel_id: {
      type: String,
    },
    style_id: {
      type: String,
    },

    feelName: {
      type: String,
    },
    styleName: {
      type: String,
    },
    catName: {
      type: String,
    },
    listing_image: {
      type: String,
      default: "",
    },
    // banner_image: {
    //   type: String,
    //   default: "",
    // },
    first_image: {
      type: String,
      default: "",
    },
    second_image: {
      type: String,
      default: "",
    },
    pro_description: {
      type: Array,
    },
    full_Home_product: {
      type: Array,
    },
    isFullHome: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
