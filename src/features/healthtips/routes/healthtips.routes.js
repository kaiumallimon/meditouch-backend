// imports
const express = require('express');
const healthtipsController = require('../controllers/healthtips.controller');   
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const multer = require('multer');
const router = express.Router();



const upload = multer() 


router.post("/add",permissionMiddleware('write'),upload.any(),healthtipsController.addHealthTip);
router.get("/get",permissionMiddleware('read'),healthtipsController.getHealthTips);
router.get("/get/:id",permissionMiddleware('read'),healthtipsController.getHealthTipById);
router.put("/update/:id",permissionMiddleware('write'),upload.single('image'),healthtipsController.updateHealthTip);
router.delete("/delete/:id",permissionMiddleware('write'),healthtipsController.deleteHealthTip);
// Export the router
module.exports = router;
