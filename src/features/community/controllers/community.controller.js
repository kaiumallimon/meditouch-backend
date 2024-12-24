const Community = require("../../../models/community.model"); // Import the community model
const gDriveUtil = require("./../../../utils/gdrive/gdrive.util");

const communityController = {
  // Add a new community post
  async addCommunityPosts(req, res) {
    try {
      const { title, content } = req.body;
      
      
      let imageUrl = null;


      const file = req.files[0];

      // If an image is uploaded, upload it to gdrive
      if (file) {
        imageUrl = await gDriveUtil.uploadFile(file);
      }

      const newPost = new Community({ title, content, image:imageUrl });
      await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all community posts
  async getCommunityPosts(req, res) {
    try {
      const posts = await Community.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Socket.IO: Get all community posts
  async getCommunityPostsSocket(socket) {
    try {
      const posts = await Community.find();
      socket.emit('community_posts', posts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
      socket.emit('error', { error: error.message });
    }
  },

  // Get a specific community post by ID
  async getCommunityPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a community post
  async updateCommunityPost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      
      let imageUrl = null;


      const file = req.files[0];

      // If an image is uploaded, upload it to gdrive
      if (file) {
        imageUrl = await gDriveUtil.uploadFile(file);
      }

      const updatedPost = await Community.findByIdAndUpdate(
        id,
        { title, content, image: imageUrl },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res
        .status(200)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a community post

  async deleteCommunityPost(req, res) {
    try {
      const postId = req.params.id;
      console.log("Attempting to delete post with ID:", postId); // Log the ID you're deleting

      const post = await Community.findByIdAndDelete(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      console.log("Post deleted successfully");
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error); // Log any errors
      res.status(500).json({ message: error.message });
    }
  },
  // Like a post
  async likePost(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body; // Get user ID or username from the request body

      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Find if the user has already reacted
      const existingReaction = post.reactions.find(r => r.user === user);

      if (existingReaction) {
        if (existingReaction.type === "like") {
          return res.status(400).json({ message: "User already liked this post" });
        } else {
          // Change dislike to like
          existingReaction.type = "like";
        }
      } else {
        // Add a new like reaction
        post.reactions.push({ user, type: "like" });
      }

      await post.save();
      res.status(200).json({ message: "Post liked successfully", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Dislike a post
  async dislikePost(req, res) {
    try {
      const { id } = req.params;
      const { user } = req.body; // Get user ID or username from the request body

      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Find if the user has already reacted
      const existingReaction = post.reactions.find(r => r.user === user);

      if (existingReaction) {
        if (existingReaction.type === "dislike") {
          return res.status(400).json({ message: "User already disliked this post" });
        } else {
          // Change like to dislike
          existingReaction.type = "dislike";
        }
      } else {
        // Add a new dislike reaction
        post.reactions.push({ user, type: "dislike" });
      }

      await post.save();
      res.status(200).json({ message: "Post disliked successfully", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //get all comments by post id 
  async getComments(req, res) {
    try {
      const { id } = req.params; // Post ID from the URL

      // Find the post by its ID
      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Retrieve the comments for the post
      const comments = post.comments;

      res.status(200).json({ message: "Comments retrieved successfully", comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



  // Add a comment
  async addComment(req, res) {
    try {
      const { id } = req.params;
      const { user, text } = req.body;

      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.comments.push({ user, text });
      await post.save();
      res.status(201).json({ message: "Comment added", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a comment
  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const { commentId, text } = req.body;

      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      comment.text = text;
      await post.save();
      res.status(200).json({ message: "Comment updated", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a comment
  async deleteComment(req, res) {
    try {
      const { id } = req.params; // ID of the post
      const { commentId } = req.body; // ID of the comment to be deleted

      // Find the post by ID
      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Remove the comment using Mongoose's pull
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Pull (remove) the comment from the comments array
      post.comments.pull(commentId);

      // Save the post after modifying the comments array
      await post.save();

      res.status(200).json({ message: "Comment deleted", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add a reply to a comment

  async addReply(req, res) {
    try {
      // Log the entire params object to ensure the route is matching correctly
      //console.log('Request Parameters:', req.params);

      const { id, commendId } = req.params; // Get post and comment IDs from the URL params
      //console.log( "comment id : " + commendId );
      const { user, text } = req.body;

      // Find the post by its ID
      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      console.log(post.comments);

      // Find the comment by its ObjectId within the post
      const comment = post.comments.id(commendId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Add the reply to the comment's replies array
      comment.replies.push({ user, text });

      // Save the updated post
      await post.save();

      // Respond with success message and updated post data
      res.status(200).json({ message: "Reply added successfully", post });
    } catch (error) {
      // Handle any server errors
      res.status(500).json({ error: error.message });
    }
  },

  // Update a reply
  async updateReply(req, res) {
    try {
      console.log("Request Parameters:", req.params);
      const id = req.params.id;
      const commentId = req.params.commentId;
      const { replyId, text } = req.body;

      // Find the post by its ID
      const post = await Community.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Find the comment by its ObjectId within the post
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Find the reply by its ObjectId within the comment's replies array
      const reply = comment.replies.id(replyId);
      if (!reply) {
        return res.status(404).json({ message: "Reply not found" });
      }

      // Update the reply text
      reply.text = text;

      // Save the updated post
      await post.save();

      // Respond with success message and updated post data
      res.status(200).json({ message: "Reply updated successfully", post });
    } catch (error) {
      // Handle any server errors
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a reply
  async deleteReply(req, res) {
    try {
      const { id, commentId } = req.params; // ID of the post and comment
      const { replyId } = req.body; // ID of the reply to delete

      const post = await Community.findById(id); // Find the community post
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Find the comment by its ID
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Filter out the reply to delete by its ID
      comment.replies = comment.replies.filter((reply) => reply._id.toString() !== replyId);
      await post.save(); // Save the updated post

      res.status(200).json({ message: "Reply deleted", post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  // Search posts
  async searchCommunityPosts(req, res) {
    try {
      const { query } = req.query;
      const posts = await Community.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = communityController;
