// imports
const express = require('express');
const orderController = require('./../controllers/orders.controller');
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const router = express.Router();


// Place order route
router.post('/place-order', permissionMiddleware("write"), orderController.placeOrder);

// Get all orders by user id
router.get('/get-all-orders/:userId', permissionMiddleware("read"), orderController.getAllOrders);

// get all delivered orders of a user
router.get('/get-delivered-orders/:userId', permissionMiddleware("read"), orderController.getDeliveredOrders);

// get all Pending or Shipped orders of a user
router.get('/get-pending-or-shipped-orders/:userId', permissionMiddleware("read"), orderController.getPendingOrShippedOrders);

// get all cancelled orders of a user
router.get('/get-cancelled-orders/:userId', permissionMiddleware("read"), orderController.getCancelledOrders);


// export router
module.exports = router;