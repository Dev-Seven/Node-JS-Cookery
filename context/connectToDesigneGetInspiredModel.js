var mongoose = require("mongoose");

const connectToDesignerGetInspiredSchema = new mongoose.Schema(
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

module.exports = mongoose.model(
  "connectToDesignerGetInspired",
  connectToDesignerGetInspiredSchema
);
