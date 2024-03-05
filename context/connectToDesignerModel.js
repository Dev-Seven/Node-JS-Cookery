var mongoose = require("mongoose");

const connectToDesignerSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    projectId: {
      type: String,
    },
    date: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("connectToDesigner", connectToDesignerSchema);
