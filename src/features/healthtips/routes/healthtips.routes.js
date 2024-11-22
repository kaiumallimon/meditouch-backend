// imports
const express = require('express');
const healthtipsController = require('../controllers/healthtips.controller');   
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const router = express.Router();

// Set up multer upload instance with the path where images will be saved
const upload = createUpload();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload
// router.post('/register', upload.single('profileImage'), authController.register);  
// router.post('/login', authController.login);
// router.get('/users', authController.getUsers);

router.post("/add",upload.single('image'),healthtipsController.addHealthTip);
router.get("/get",healthtipsController.getHealthTips);
router.get("/get/:id",healthtipsController.getHealthTipById);
router.put("/update/:id",upload.single('image'),healthtipsController.updateHealthTip);
router.delete("/delete/:id",healthtipsController.deleteHealthTip);
// Export the router
module.exports = router;
