const db = require("../context/ContextManager");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret = process.env.SECRET;
const otpGenerator = require("otp-generator");

// <---------------================== REGISTER MOBILE NUMBER =======================----------------->

exports.register_mobile = async (req, res) => {
  try {
    // let otp = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets: false,
    // });

    let userExist = await db.userModel.findOne({
      mobile: req.body.mobile,
      status: true,
    });

    if (userExist === null) {
      let userMobile = await db.userModel.findOne({ mobile: req.body.mobile });

      if (userMobile === null) {
        const register = new db.userModel({
          mobile: req.body.mobile,
          oneTimePassword: "0000",
          status: false,
        });

        await register.save();

        return res.status(200).json({
          message: "OTP sent successfuly!",
          code: 200,
          data: { _id: register._id },
        });
      } else {
        // creating confusion (when it comes here)
        const updateData = {
          oneTimePassword: "0000",
          status: false,
        };

        const userVerify = await db.userModel.findOne({
          mobile: req.body.mobile,
        });
        const userExist = await db.userModel.findByIdAndUpdate(
          userVerify._id,
          updateData,
          { new: true }
        );

        await userExist.save();
        return res.status(200).json({
          message: "OTP sent Successfuly!",
          code: 200,
          data: { _id: userExist._id },
        });
      }
    } else {
      // if user leave without completing activation process
      if (userExist.status === false) {
        const updateData = {
          oneTimePassword: "0000",
          status: false,
        };

        const userExist = await db.userModel.findOneAndUpdate(
          req.body.mobile,
          updateData,
          { new: true }
        );

        await userExist.save();
        return res.status(200).json({
          message: "OTP sent Successfuly.",
          code: 200,
          data: { _id: userExist._id },
        });
      }

      return res
        .status(400)
        .json({ message: "User already exists.", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to register user :", error);
    return res
      .status(400)
      .json({ message: "something Went Wrong ", code: 400 });
  }
};

// <---------------================== REGISTER VERIFY OTP =======================----------------->

exports.register_verify_otp = async (req, res) => {
  let isOtpValid = await db.userModel.findOne({
    mobile: req.body.mobile,
    oneTimePassword: req.body.otp,
  });
  if (isOtpValid) {
    // let verifyUser = await db.userModel.findOneAndUpdate(
    //   { mobile: req.body.mobile },
    //   { $set: { status: true } },
    //   { new: true }
    // );
    // await verifyUser.save();

    return res.status(200).json({
      message: "OTP is Verified!",
      code: 200,
    });
  } else {
    return res.status(400).json({
      message: "Invalid OTP!",
      code: 400,
    });
  }
};

// <---------------================== REGISTER USER =======================----------------->

exports.register_user = async (req, res) => {
  try {
    let isUserValid = await db.userModel.findOne({
      _id: req.body.id,
      status: false,
    });

    if (isUserValid) {
      // ganrated JWT Token
      let token = jwt.sign({ mobile: req.body.mobile }, secret, {
        algorithm: "HS256",
        // expiresIn: "8h",
        // expiresIn: "900s", 15 minutes
      });

      const extraUserDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isLoggedIn: true,
        status: true,
        image: "",
      };

      let userRegister = await db.userModel.findByIdAndUpdate(
        req.body.id,
        extraUserDetails,
        { new: true }
      );

      //await userRegister.save();

      return res.status(200).json({
        message: "Registration completed successfully.",
        code: 200,
        data: userRegister,
        token: token,
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid request for register user ", code: 400 });
    }
  } catch (error) {
    console.log("Getting error to user register :", error);
    return res
      .status(400)
      .json({ message: "something Went Wrong ", code: 400 });
  }
};

// <---------------================== LOG IN SENT OTP  =======================----------------->

exports.login_sent_otp = async (req, res) => {
  try {
    // let otp = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets: false,
    // });
    let otp = "0000";

    let isUserValid = await db.userModel.findOne({
      mobile: req.body.mobile,
      status: true,
    });

    if (isUserValid) {
      let isUserLogin = await db.userModel.findOne({
        mobile: req.body.mobile,
      });
      if (isUserLogin) {
        // Logedin remains
        const logedIndata = {
          oneTimePassword: "0000",
          isUserLogin: false,
        };

        const userLogedIn = await db.userModel.findOneAndUpdate(
          req.body.mobile,
          logedIndata,
          { new: true }
        );

        await userLogedIn.save();

        return res.status(200).json({
          message: "OTP sent successfuly.",
          code: 200,
          data: { _id: userLogedIn._id },
        });
      } else {
        return res.status(400).json({
          message: "This mobile number is not verified",
          code: 400,
        });
      }
    } else {
      return res.status(400).json({
        message: "This mobile number has not been registered.",
        code: 400,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "something Went Wrong ", code: 400 });
  }
};

// <---------------================== LOGIN VERIFY OTP =======================----------------->

exports.login_verify_otp = async (req, res) => {
  try {
    let isUserValid = await db.userModel.findOne({
      mobile: req.body.mobile,
      oneTimePassword: req.body.otp,
    });

    if (isUserValid) {
      // ganrated JWT Token
      let token = jwt.sign({ mobile: req.body.mobile }, secret, {
        algorithm: "HS256",
        // expiresIn: "8h", //900s
      });

      const logedIn = await db.userModel.findOneAndUpdate(
        { mobile: req.body.mobile },
        { $set: { isLoggedIn: true } },
        { new: true }
      );
      await logedIn.save().then(
        setTimeout(async () => {
          const logedIn = await db.userModel.findOneAndUpdate(
            { mobile: req.body.mobile },
            { $set: { isLoggedIn: false } },
            { new: true }
          );
          await logedIn.save();
        }, 28800000) // 900000
      );

      res.status(200).json({
        code: 200,
        message: "You have successfully signed in.",
        data: logedIn,
        token: token,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: "Invalide OTP.",
      });
    }
  } catch (error) {
    console.log("Getting error to login verify otp :", error);
    res.status(400).json({
      code: 400,
      message: "Something went wrong.",
    });
  }
};

// <---------------================== LogOut =======================----------------->

exports.logOut = async (req, res) => {
  try {
    let logedOut = {
      isLoggedIn: false,
    };

    let logoute = await db.userModel.findByIdAndUpdate(req.body.id, logedOut, {
      new: true,
    });

    await logoute.save();

    res.status(200).json({ message: "You have been logged out.", code: 200 });
  } catch (error) {
    console.log("Getting Error to LogOut:", error);
    res.status(400).json({
      code: 400,
      message: "Something went wrong.",
    });
  }
};
///////////////////// ADMINSIGNIN ////////////////////////

exports.AdminSignIn = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Please fill all required field",
      });
    }
    // convert password in crypto password
    const cryptoPassword = await crypto
      .createHmac("sha256", secret)
      .update(req.body.password)
      .digest("hex");

    // ganrated JWT Token
    let token = jwt.sign({ email: req.body.email }, secret, {
      algorithm: "HS256",
    });

    await db.adminModel
      .findOne({
        $and: [{ email: req.body.email }, { password: cryptoPassword }],
      })
      .then((resp) => {
        if (resp) {
          res.send({
            data: resp,
            code: 200,
            message: "You are successfully logged in.",
            token: token,
          });
        } else {
          res.send({
            code: 400,
            message: "Wrong credentials!",
          });
        }
      })
      .catch((error) => {
        console.log("Error to login admin:", error);
      });
  } catch (error) {
    console.log("Getting error to admin login:", error);
    res.status(400).json("somthing went wrong:", error);
  }
};
///////////////////// ADD SUPPER ADMIN ////////////////////////

exports.creatSupperAdmin = async (req, res) => {
  try {
    const cryptoPassword = await crypto
      .createHmac("sha256", secret)
      .update(req.body.password)
      .digest("hex");

    let supperAdmin = await new db.adminModel({
      email: req.body.email,
      password: cryptoPassword,
    });

    await supperAdmin.save();

    res.send({
      code: 200,
      message: "Supper admin added successfuly",
      data: supperAdmin,
    });
  } catch (error) {
    console.log("Getting error to create supper admin :", error);
    res.status(400).json("somthing went wrong:", error);
  }
};

///////////////////// getAllUser ////////////////////////

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await db.userModel.find({ status: true });
    res.status(200).json({ message: "Success", data: allUser, code: 200 });
  } catch (error) {
    console.log("Getting error to get all users:", error);
    res.status(400).json({ message: "somthing went wrong.", code: 400 });
  }
};
///////////////////// Delete User ////////////////////////

exports.deleteUser = async (req, res) => {
  try {
    const User = await db.userModel.findByIdAndDelete({
      _id: req.body.user_id,
    });
    res.send({ message: "User deleted successfuly.", code: 200 });
  } catch (error) {
    console.log("Getting error to get all users:", error);
    res.status(400).json({ message: "Something went wrong.", code: 400 });
  }
};
