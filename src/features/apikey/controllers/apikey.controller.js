// apikey controller

const ApiKeys = require("../../../models/apikeys.model");
const bcrypt = require('bcrypt');
const { sendMail } = require('../../../features/mail/mail.sender');
const { generateApiKey } = require("../../../utils/generate.random.password");

// retreive the local api key from the .env file to ensure that only the server can create an API key   
const API_KEY = process.env.X_API_KEY;

exports.createApiKey = async (req, res) => {
    try {
        // use a local key to ensure that only the server can create an API key 

        if (req.headers['x-api-key'] !== API_KEY) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { read, write } = req.body;

        // Generate a new API key
        const apiKey = generateApiKey();

        //encrypt the api key before saving it to the database

        const salt = await bcrypt.genSalt(10);

        const hashedApiKey = await bcrypt.hash(apiKey, salt);

        // Save the new API key to the database
        const newApiKey = new ApiKeys({
            key: hashedApiKey,
            permission: {
                read: read,
                write: write,
            }
        });

        await newApiKey.save();

        // Send the API key to the user via response
        res.status(201).json({
            status: "success",
            message: "API key created successfully",
            apiKey: apiKey,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Check if the API key is valid by comparing it with all the stored keys in the database
exports.checkApiKey = async function (apiKey) {
    try {
        // Retrieve all API keys from the database
        const keys = await ApiKeys.find({});

        if (!keys || keys.length === 0) {
            return {
                status: "error",
                message: "No API keys found",
                permission: { read: false, write: false } // Ensure permission exists even in error
            };
        }

        // Iterate over all the stored keys and check if any match the provided API key
        for (let key of keys) {
            const isMatch = await bcrypt.compare(apiKey, key.key); // Compare the incoming API key with the stored hashed key

            if (isMatch) {
                // If a match is found, return success and permissions
                return {
                    status: "success",
                    message: "API key is valid",
                    permission: key.permission || { read: false, write: false }  // Ensure permission exists
                };
            }
        }

        // If no match is found after checking all keys, return an error
        return {
            status: "error",
            message: "API key is invalid",
            permission: { read: false, write: false } // Return permissions as false
        };
    } catch (error) {
        console.error("Error checking API key:", error);
        return {
            status: "error",
            message: "Error checking API key",
            permission: { read: false, write: false } // Return permissions as false
        };
    }
};
