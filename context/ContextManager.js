const userModel = require("./userModel");
const loginModel = require("./loginOtpModel");
const testimonialModel = require("./testimonialModel");
const FAQModel = require("./FAQModel");
const feelModel = require("./feelModel");
const styleModel = require("./styleModel");
const CatagoryModel = require("./CatagoryModel");
const productModel = require("./productModel");
const homeCatModel = require("./home-categoryModel");
const homeModel = require("./homeModel");
const userFavoriteProduct = require("./userFavoriteProduct");
const adminModel = require("./adminModel");
const userMoodboardModel = require("./userMoodboardModel");
const ratingModel = require("./ratingModel");
const showInterestModel = require("./showInterestModel");
const connectToDesignerModel = require("./connectToDesignerModel");
const connectToDesigneGetInspiredModel = require("./connectToDesigneGetInspiredModel");
const feedbackModel = require("./feedbackModel");

const _manager = {
  userModel: userModel,
  loginModel: loginModel,
  testimonialModel: testimonialModel,
  FAQModel: FAQModel,
  feelModel: feelModel,
  styleModel: styleModel,
  CatagoryModel: CatagoryModel,
  productModel: productModel,
  homeCatModel: homeCatModel,
  homeModel: homeModel,
  userFavoriteProduct: userFavoriteProduct,
  adminModel: adminModel,
  userMoodboardModel: userMoodboardModel,
  ratingModel: ratingModel,
  showInterestModel: showInterestModel,
  connectToDesignerModel: connectToDesignerModel,
  connectToDesigneGetInspiredModel: connectToDesigneGetInspiredModel,
  feedbackModel: feedbackModel,
};

module.exports = _manager;
