// Import mongoose (no need for destructuring)
const mongoose = require("mongoose");

// Define schema for storing API keys
const apiKeysSchema = new mongoose.Schema({
    key: {
        type: String,  // This ensures only one API key per document
        required: true,  // Ensure the 'keys' field is required
    },
    permission: {
        read: {
            type: Boolean,
            default: false,  // Default value for 'read' permission
        },
        write: {
            type: Boolean,
            default: false,  // Default value for 'write' permission
        },
    }
}, {
    collection: 'apikeys'  // Custom collection name in the MongoDB database
});

// Create a model based on the schema
const ApiKeys = mongoose.model("ApiKeys", apiKeysSchema);

// Export the model
module.exports = ApiKeys;
