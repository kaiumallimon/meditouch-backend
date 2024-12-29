const express = require('express');
const router = express.Router();
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const ChatController = require('../controller/chatbot.controller');


router.post('/sendChat',permissionMiddleware('write'), ChatController.runFlowController);
router.post('/getDocAvailablity',permissionMiddleware('write'), ChatController.findDoctorAndAvailableTimes);

module.exports = router;
