const router = require("express").Router();
const productController = require("../controller/productController");
const { ProductImage } = require("../middleware/upload.middleware");

// Product Routes
router.post(
  "/product/productImage",
  ProductImage.single("image"),
  productController.productImage
);
router.post(
  "/product/insertProduct",
  ProductImage.fields([
    { name: "listing_image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
    { name: "first_image", maxCount: 1 },
    { name: "second_image", maxCount: 1 },
  ]),
  productController.insertProduct
);

router.post(
  "/product/editProduct",
  ProductImage.fields([
    { name: "listing_image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 },
    { name: "first_image", maxCount: 1 },
    { name: "second_image", maxCount: 1 },
  ]),
  productController.editProduct
);
router.post("/product/deleteProduct", productController.deleteProduct);
router.post("/product/getAllProduct", productController.getAllProduct);
router.post(
  "/product/getProductByCategory",
  productController.getProductByCategory
);
router.post("/product/producFilter", productController.producFilter);
router.post("/product/getAllFullHome", productController.getAllFullHome);
router.post(
  "/product/getFullHomeByFeelStyle",
  productController.getFullHomeByFeelStyle
);
router.post("/product/getProductWithFav", productController.getProductWithFav);
router.post("/product/productByCat", productController.productByCat);
router.post("/product/getProductDetail", productController.getProductDetail);
router.post(
  "/product/getPersonlizedProductDetail",
  productController.getPersonlizedProductDetail
);
router.post("/product/getProjectProduct", productController.getProjectProduct);
router.post("/product/getProductById", productController.getProductById);

module.exports = router;
