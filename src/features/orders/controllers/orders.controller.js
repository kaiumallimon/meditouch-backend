const mongoose = require('mongoose');
const Orders = require('./../../../models/orders.model');
const Cart = require("../../../models/cart.model");

// Place an order and remove the ordered medicines from the cart
exports.placeOrder = async (req, res) => {
    try {
        res.setHeader('Content-Type', 'application/json');

        const { user, medicines, total_price, payment_method, payment_status, shipping_address } = req.body;

        // Create a new order
        const newOrder = new Orders({
            user: user,
            medicines: medicines,
            total_amount: total_price,
            payment_method: payment_method,
            payment_status: payment_status,
            shipping_address: shipping_address
        });

        // Save the order
        const order = await newOrder.save();

        // Remove ordered medicines from the cart
        const medicineIds = medicines.map(med => med.id); // Extract medicine IDs

        // Update the cart by removing the ordered medicines
        await Cart.findOneAndUpdate(
            { user: user },
            { $pull: { medicines: { id: { $in: medicineIds } } } }, // $pull removes the medicines from the cart
            { new: true } // Return the updated cart
        );

        res.status(201).json({ message: 'Order placed successfully, and medicines removed from cart', order: order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Pagination utility
const paginateResults = async (query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const results = await query.skip(skip).limit(limit);
    const totalCount = await Orders.countDocuments(query.getFilter());
    return { results, totalCount, totalPages: Math.ceil(totalCount / limit), currentPage: page };
};

// Get all delivered orders of a user with pagination
exports.getDeliveredOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;

        const query = Orders.find({ user: userId, status: 'Delivered' });
        const { results, totalCount, totalPages, currentPage } = await paginateResults(query, page);

        res.status(200).json({

            totalCount,
            totalPages,
            currentPage,
            orders: results,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Pending or Shipped orders of a user with pagination
exports.getPendingOrShippedOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;

        const query = Orders.find({ user: userId, status: { $in: ['Pending', 'Shipped'] } });
        const { results, totalCount, totalPages, currentPage } = await paginateResults(query, page);

        res.status(200).json({

            totalCount,
            totalPages,
            currentPage,
            orders: results,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all cancelled orders of a user with pagination
exports.getCancelledOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;

        const query = Orders.find({ user: userId, status: 'Cancelled' });
        const { results, totalCount, totalPages, currentPage } = await paginateResults(query, page);

        res.status(200).json({

            totalCount,
            totalPages,
            currentPage,
            orders: results,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders of a user with pagination
exports.getAllOrders = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;

        const query = Orders.find({ user: userId });
        const { results, totalCount, totalPages, currentPage } = await paginateResults(query, page);

        res.status(200).json({

            totalCount,
            totalPages,
            currentPage,
            orders: results,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
