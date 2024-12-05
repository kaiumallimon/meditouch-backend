const express = require('express');
const communityController = require('../controllers/community.controller');
const createUpload = require('../../../utils/image.upload');  // Import createUpload
const router = express.Router();

// Set up multer upload instance with the path where images will be saved
const upload = createUpload();  // Define the path for image storage

// Define the routes
// Use the upload.single('profileImage') middleware in the register route to handle the image upload


router.post("/add",upload.single('image'),communityController.addCommunityPosts); // add post

// get all post and get post by id
router.get("/get",communityController.getCommunityPosts); // get all post
router.get("/get/:id",communityController.getCommunityPostById); // get post by id

// update and delete post
router.put("/update/:id",upload.single('image'),communityController.updateCommunityPost); // update post
router.delete("/delete/:id",communityController.deleteCommunityPost); // delete post

//all like and dislike related endpoints
router.put("/like/:id",communityController.likePost);
router.put("/dislike/:id",communityController.dislikePost);

//all comment and reply related endpints
router.post("/comment/:id",communityController.addComment);
router.put("/comment/:id",communityController.updateComment);
router.delete("/comment/:id",communityController.deleteComment);

router.post("/reply/:id/:commendId",communityController.addReply);
router.put("/reply/:id/:commentId",communityController.updateReply);
router.delete("/reply/:id/:commentId",communityController.deleteReply);

//search post
router.get("/search",communityController.searchCommunityPosts);

// Export the router
module.exports = router;
