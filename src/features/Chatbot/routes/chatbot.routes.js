const express = require('express');
const router = express.Router();
const { runFlowController } = require('../controller/chatbot.controller');

// Rename the endpoint to `/callchat`
router.post('/callchat', runFlowController);

module.exports = router;
