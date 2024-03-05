const router = require('express').Router()
const userFavoriteProductController = require('../controller/userFavoriteProductController');
const { verifyToken } = require('../middleware/auth');

// router.post('/product/userFavoriteProduct', verifyToken, userFavoriteProductController.userFavoriteProduct);
router.post('/product/userFavoriteProduct', verifyToken, userFavoriteProductController.userFavoriteProduct);
router.post('/product/getAllUserFavoriteProduct', verifyToken, userFavoriteProductController.getAllUserFavoriteProduct);
router.post('/product/AllFavoriteInspiredProduct', userFavoriteProductController.AllFavoriteInspiredProduct);

module.exports = router
