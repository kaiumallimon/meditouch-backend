// imports
const express = require('express');
const authController = require('../controllers/doctor.auth.controller');  // Import the auth controller
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const router = express.Router();


// Set up multer upload instance with the path where images will be saved
const upload = createUpload();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload
router.post('/register',permissionMiddleware('write'), upload.single('image'), authController.register);  
router.post('/login',permissionMiddleware('read'), authController.login);
router.get('/doctors',permissionMiddleware('read'), authController.getDoctors);
router.post('/send-verification-email',permissionMiddleware('read'), authController.sendVerification);  
router.post('/reset-password/:id',permissionMiddleware('write'), authController.resetPassword);
router.get('/check-email/',permissionMiddleware('read'), authController.checkEmail);

// Export the router
module.exports = router;
