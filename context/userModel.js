var mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },

    mobile: {
      type: String,
    },
    oneTimePassword : {
        type: String
    },
    image :{
      type: String
    },
    isEmailVerified : {
      type: Boolean ,
      default :false
  },
    status : {
      type: Boolean
  },
    isLoggedIn : {
      type: Boolean
  },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
