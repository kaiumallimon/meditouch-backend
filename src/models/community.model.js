const mongoose = require('mongoose');

// Create the comment schema

const commentSchema = new mongoose.Schema({
    user: {
        type: String, // Reference to the user who commented
        required: true,
    },
    text: {
        type: String, // Comment content
        required: true,
    },
    replies: [
        {
            user: {
                type: String, // User replying to a comment
                required: true,
            },
            text: {
                type: String, // Reply content
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the community post schema
const communitySchema = new mongoose.Schema({
    title: {
        type: String, // Title of the community post
        required: true,
    },
    content: {
        type: String, // Paragraph-like text
        required: true,
    },
    image: {
        type: String, // Optional image URL
        required: false,
        default: null,
    },
    reactions: [
        {
          user: {
            type: String, // User identifier, e.g., user ID or username
            required: true,
          },
          type: {
            type: String, // 'like' or 'dislike'
            enum: ['like', 'dislike'],
            required: true,
          },
        },
      ],
    comments: [commentSchema], // Array of comments
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'community',
});

// Export the model
module.exports = mongoose.model('Community', communitySchema);
