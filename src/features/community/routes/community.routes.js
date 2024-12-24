const express = require('express');
const communityController = require('../controllers/community.controller');
const permissionMiddleware = require('../../../middlewares/apikey.middleware');
const multer = require('multer');
const router = express.Router();

// Set up multer upload instance with the path where images will be saved
const upload = multer();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload


router.post("/add",permissionMiddleware('write'),upload.any(),communityController.addCommunityPosts); // add post

// get all post and get post by id
router.get("/get",permissionMiddleware('read'),communityController.getCommunityPosts); // get all post
router.get("/get/:id",permissionMiddleware('read'),communityController.getCommunityPostById); // get post by id

// update and delete post
router.put("/update/:id",permissionMiddleware('write'),upload.any(),communityController.updateCommunityPost); // update post
router.delete("/delete/:id",permissionMiddleware('write'),communityController.deleteCommunityPost); // delete post

//all like and dislike related endpoints
router.put("/like/:id",permissionMiddleware('write'),communityController.likePost);
router.put("/dislike/:id",permissionMiddleware('write'),communityController.dislikePost);

//all comment and reply related endpints
//all commnent by post id
router.get("/comment/:id",permissionMiddleware('read'),communityController.getComments);
router.post("/comment/:id",permissionMiddleware('write'),communityController.addComment);
router.put("/comment/:id",permissionMiddleware('write'),communityController.updateComment);
router.delete("/comment/:id",permissionMiddleware('write'),communityController.deleteComment);

router.post("/reply/:id/:commendId",permissionMiddleware('write'),communityController.addReply);
router.put("/reply/:id/:commentId",permissionMiddleware('write'),communityController.updateReply);
router.delete("/reply/:id/:commentId",permissionMiddleware('write'),communityController.deleteReply);

//search post
router.get("/search",permissionMiddleware('read'),communityController.searchCommunityPosts);

// Export the router
module.exports = router;
