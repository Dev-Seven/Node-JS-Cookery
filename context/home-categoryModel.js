let mongoose = require("mongoose");

const HomeCatagorySchema = new mongoose.Schema(
  {
    home_cat_name: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("home-category", HomeCatagorySchema);
