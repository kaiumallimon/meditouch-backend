// imports
const express = require('express');
const authController = require('../controllers/auth.controller');
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const router = express.Router();


// Set up multer upload instance with the path where images will be saved
const upload = createUpload();  // Define the path for image storage

// Define the routes

router.post('/register', permissionMiddleware('write'), upload.single('profileImage'), authController.register);
router.post('/login', permissionMiddleware('read'), authController.login);
router.get('/users', permissionMiddleware('read'), authController.getUsers);
router.get('/user/:id', permissionMiddleware('read'), authController.getUserById);
router.post('/user/send-verification-email', permissionMiddleware('read'), authController.sendVerificationCode);
router.post('/user/reset-password/:id', permissionMiddleware('write'), authController.resetPassword);
router.get('/user/check-email/', permissionMiddleware('read'), authController.checkEmail);

// Export the router
module.exports = router;
