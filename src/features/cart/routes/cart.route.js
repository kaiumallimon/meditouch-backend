//imports
const express = require('express');
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const cartController = require('../controllers/cart.controller');
const router = express.Router();


router.post('/add-to-cart', permissionMiddleware('write'),cartController.addToCart);
router.get('/get-cart/:userId', permissionMiddleware('read'),cartController.getCartByUserId);  

// export the router
module.exports = router;