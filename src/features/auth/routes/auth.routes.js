// imports
const express = require('express');
const authController = require('../controllers/auth.controller');   
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const router = express.Router();

// Set up multer upload instance with the path where images will be saved
const upload = createUpload();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload
router.post('/register', upload.single('profileImage'), authController.register);  
router.post('/login', authController.login);
router.get('/users', authController.getUsers);
router.get('/user/:id', authController.getUserById);
router.post('/user/send-verification-email', authController.sendVerificationCode);  
router.post('/user/reset-password/:id', authController.resetPassword);
router.get('/user/check-email/', authController.checkEmail);

// Export the router
module.exports = router;
