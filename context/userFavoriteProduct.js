var mongoose = require("mongoose");

const userFavoritProductSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    ProductId: {
      type: String,
    },
    is_repository: {
      type: Boolean,
      default: false,
    },
    is_personalized: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("userFavoritProduct", userFavoritProductSchema);
