//imports
const express = require('express');
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const cartController = require('../controllers/cart.controller');
const router = express.Router();


router.post('/add-to-cart', permissionMiddleware('write'),cartController.addToCart);
router.get('/get-cart/:userId', permissionMiddleware('read'),cartController.getCartByUserId);  
router.delete('/delete-cart/:userId/:medicineId', permissionMiddleware('write'),cartController.removeMedicineFromCart);

// export the router
module.exports = router;