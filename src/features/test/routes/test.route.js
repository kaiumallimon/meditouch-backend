// Import express
const express = require('express');

// Import the controller
const testController = require('../controllers/test.controller');

// Get the router
const router = express.Router();

// Define the routes for '/text' and '/json' using .get()
// These are GET routes, so we use router.get() instead of router.use()
router.get('/text', testController.textResponse);
router.get('/json', testController.jsonResponse);

// Export the router
module.exports = router;
