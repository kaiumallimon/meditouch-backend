// imports
const express = require('express');
const authController = require('../controllers/auth.controller');
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const multer = require('multer');
const router = express.Router();


/*
* New method to upload image to gdrive
*/
const upload = multer();

// use upload.any() to upload image and get the first image from the array in the controller...

router.post('/register', permissionMiddleware('write'), upload.any(), authController.register);
router.post('/login', permissionMiddleware('read'), authController.login);
router.get('/users', permissionMiddleware('read'), authController.getUsers);
router.get('/user/:id', permissionMiddleware('read'), authController.getUserById);
router.post('/user/send-verification-email', permissionMiddleware('read'), authController.sendVerificationCode);
router.post('/user/reset-password/:id', permissionMiddleware('write'), authController.resetPassword);
router.get('/user/check-email/', permissionMiddleware('read'), authController.checkEmail);

// Export the router
module.exports = router;
