// imports
const express = require('express');
const healthtipsController = require('../controllers/healthtips.controller');   
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const router = express.Router();



const upload = createUpload();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload
// router.post('/register', upload.single('profileImage'), authController.register);  
// router.post('/login', authController.login);
// router.get('/users', authController.getUsers);

router.post("/add",permissionMiddleware('write'),upload.single('image'),healthtipsController.addHealthTip);
router.get("/get",permissionMiddleware('read'),healthtipsController.getHealthTips);
router.get("/get/:id",permissionMiddleware('read'),healthtipsController.getHealthTipById);
router.put("/update/:id",permissionMiddleware('write'),upload.single('image'),healthtipsController.updateHealthTip);
router.delete("/delete/:id",permissionMiddleware('write'),healthtipsController.deleteHealthTip);
// Export the router
module.exports = router;
