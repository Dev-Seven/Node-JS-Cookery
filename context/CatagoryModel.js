let mongoose = require("mongoose");

const CatagorySchema = new mongoose.Schema(
  {
    Cat_name: {
      type: String,
    },
    order: {
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Catagory", CatagorySchema);
