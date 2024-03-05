var mongoose = require("mongoose");


const loginOtpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
    },
    oneTimePassword : {
        type: String
    },
    status : {
        type: Boolean
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("OtpRecord", loginOtpSchema);
