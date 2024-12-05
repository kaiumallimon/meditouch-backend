//api key route

const express = require('express');
const router = express.Router();
const { createApiKey } = require('../controllers/apikey.controller');

// Create a new API key
router.post('/create', createApiKey);

module.exports = router;
