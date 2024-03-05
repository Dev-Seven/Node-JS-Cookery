const db = require("../context/ContextManager");

// <---------------================== EDIT PROFILE =======================----------------->

exports.editProfile = async (req, res) => {
  try {
    let isUserValid = await db.userModel.findOne({ _id: req.body.id });
    if (isUserValid) {
      // image file path set here.
      let path = "";
      if (req.file) {
        path = req.file.path.replace(/\\/g, "/");
      } else {
        path = req.body.image;
      }
      const extraUserDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        image: path,
      };

      let updateUserDetail = await db.userModel.findByIdAndUpdate(
        req.body.id,
        extraUserDetails,
        { new: true }
      );

      await updateUserDetail.save();

      return res.status(200).json({
        message: "Profile updated successfully.",
        code: 200,
        data: {
          _id: updateUserDetail._id,
          firstName: updateUserDetail.firstName,
          lastName: updateUserDetail.lastName,
          mobile: updateUserDetail.mobile,
          email: updateUserDetail.email,
          isEmailVerified: updateUserDetail.isEmailVerified,
          image: updateUserDetail.image,
        },
      });
    } else {
      return res.status(400).json({
        message: "Account is not verified.",
        code: 400,
      });
    }
  } catch (error) {
    console.log("Getting error while updating profile:", error);
    res.status(400).json({
      message: "somting went wrong",
      code: 404,
    });
  }
};

// <---------------================== REGISTER EMAIL =======================----------------->

exports.register_email = async (req, res) => {
  try {
    let isUserValid = await db.userModel.findOne({
      _id: req.body.id,
    });

    // let otp = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets: false,
    // });

    let GanretedEmailOneTimePassword = "0000";

    if (isUserValid) {
      const extraUserDetails = {
        oneTimePassword: GanretedEmailOneTimePassword,
      };

      let updateUserDetail = await db.userModel.findByIdAndUpdate(
        req.body.id,
        extraUserDetails,
        { new: true }
      );

      await updateUserDetail.save();

      return res.status(200).json({
        message: "OTP sent successfully.",
        code: 200,
      });
    } else {
      return res.status(400).json({
        message: "User not found.",
        code: 400,
      });
    }
  } catch (error) {
    console.log("Getting error while Send Otp on Email::", error);
    res.status(400).json({
      message: "somting went wrong",
      code: 404,
    });
  }
};

// <---------------================== VERIFY EMAIL OTP =======================----------------->

exports.verify_email_otp = async (req, res) => {
  try {
    let isOtpValid = await db.userModel.findOne({
      _id: req.body.id,
      oneTimePassword: req.body.otp,
    });

    if (isOtpValid) {
      let updatedEmail = {
        email: req.body.email,
        isEmailVerified: true,
      };

      let verifyEmail = await db.userModel.findByIdAndUpdate(
        req.body.id,
        updatedEmail,
        { new: true }
      );

      await verifyEmail.save();

      return res.status(200).json({
        message: "Email is verified.",
        code: 200,
        data: verifyEmail,
      });
    } else {
      return res.status(400).json({
        message: "OTP invalide!",
        code: 400,
      });
    }
  } catch (error) {
    console.log("Getting error while verify email Otp :", error);
    res.status(400).json({
      message: "somting went wrong",
      code: 400,
    });
  }
};

// <---------------================== DELETE ACCOUNT =======================----------------->

exports.deleteAccount = async (req, res) => {
  try {
    await db.userModel
      .findOneAndDelete({ _id: req.body.id })
      .then((resp) => {
        if (resp) {
          res.status(200).json({
            code: 200,
            message: " Account deleted successfuly.",
          });
        } else {
          res.status(400).json({
            code: 400,
            message: " User not found!",
          });
        }
      })
      .catch((error) => {
        console.log("getting error to delete user :", error);
        res.status(400).json({
          code: 400,
          message: "User not found.",
        });
      });
  } catch (error) {
    console.log("Getting error to deleting  account :", error);
    res.status(400).json({
      message: "somting went wrong",
      code: 404,
    });
  }
};
