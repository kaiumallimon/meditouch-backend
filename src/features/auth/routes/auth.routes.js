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

// Export the router
module.exports = router;
