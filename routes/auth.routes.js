const router = require("express").Router();
const authController = require("../controller/authController");
const validator = require("../validators/auth.validators");

// register
router.post(
  "/auth/register_mobile",
  validator.userMobile,
  authController.register_mobile
);
router.post(
  "/auth/register_verify_otp",
  validator.userMobile,
  authController.register_verify_otp
);
router.post(
  "/auth/register_user",
  validator.userSignup,
  authController.register_user
);

// sing in
router.post("/auth/login_sent_otp", authController.login_sent_otp);
router.post("/auth/login_verify_otp", authController.login_verify_otp);
router.post("/auth/deleteUser", authController.deleteUser);
router.post("/auth/getAllUser", authController.getAllUser);
router.post("/auth/logOut", authController.logOut);

// router.post('/auth/register-mobile', validator.userMobile, authController.registerMobile);

// Admin Signin

router.post("/auth/admin/signIn", authController.AdminSignIn);
router.post("/auth/admin/creatSupperAdmin", authController.creatSupperAdmin);

module.exports = router;
