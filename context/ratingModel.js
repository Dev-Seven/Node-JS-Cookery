var mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    projectId: {
      type: String,
    },
    name: {
      type: String,
    },
    Comment: {
      type: String,
    },
    userReplay: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
    },
    date: {
      type: String,
    },
    replyDate: {
      type: String,
      default : ''
    },
    userCommentReply: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("rating", ratingSchema);
