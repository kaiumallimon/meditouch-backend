const express = require('express');
const gDriveController = require('../controllers/gdrive.controller');   
const router = express.Router();
const multer = require("multer");

// upload middleware
const upload = multer();

// routes
router.post("/test",upload.any(),gDriveController.testDrive);

// export router
module.exports = router;
