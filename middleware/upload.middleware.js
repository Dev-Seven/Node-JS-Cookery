const path = require("path");
const multer = require("multer");
require("dotenv").config();

//<-----------======== TESTIMONIAL IMAGE ===============----------------->

let testimonialImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "testimonial" + "-" + Date.now() + ext);
  },
});

exports.uploadTestimonialImage = multer({
  storage: testimonialImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpe"
      
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});

//<-----------======== Home Plan IMAGE ===============----------------->

let planImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "Home-image" + "-" + Date.now() + ext);
  },
});

exports.UploadPlanlImage = multer({
  storage: planImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpe"
      
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});

//<-----------======== AVATAR IMAGE ===============----------------->

let avatarImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "avatar" + "-" + Date.now() + ext);
  },
});

exports.avatarImage = multer({
  storage: avatarImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpe"
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});


//<-----------======== PRODUCT IMAGE ===============----------------->

let ProductImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.AVATAR_PATH);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    // cb(null, Date.now() + ext);
    cb(null, "Product" + "-" + Date.now() + ext);
  },
});

exports.ProductImage = multer({
  storage: ProductImage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpe"
    ) {
      callback(null, true);
    } else {
      // callback(null, false);               // this is For callBack False and Console print Only.
      // console.log("Only image/jpeg & image/png & image/webp files are supported!");

      callback("Only image/jpeg & image/png & image/webp files are supported!");
    }
  },
});