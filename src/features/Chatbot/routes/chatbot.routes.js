const express = require('express');
const router = express.Router();
const { runFlowController } = require('../controller/chatbot.controller');


router.post('/sendChat', runFlowController);
router.post('/getDoc', runFlowController);

module.exports = router;
