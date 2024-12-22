const express = require('express');
const router = express.Router();
const { processQuery } = require('../controller/chatbot.controller');

// Rename the endpoint to `/callchat`
router.post('/callchat', processQuery);

module.exports = router;
