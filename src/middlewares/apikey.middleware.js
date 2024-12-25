const dotenv = require("dotenv");
dotenv.config();

// Middleware to check API Key and permissions (read/write)
const permissionMiddleware = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const apiKey = req.headers['x-api-key'];

            if (!apiKey) {
                return res.status(401).json({ message: "API Key is required." });
            }

            // Compare the API key with the one in the .env file
            if (apiKey !== process.env.X_API_KEY) {
                return res.status(401).json({ message: "Invalid API Key" });
            }

            // Optionally handle permissions, if needed
            const permissions = process.env.API_PERMISSIONS ? JSON.parse(process.env.API_PERMISSIONS) : {};
            if (!permissions[requiredPermission]) {
                return res.status(403).json({ message: "Unauthorized access." });
            }

            req.apiKeyData = { apiKey, permissions }; // Attach API key data for later use
            next(); // Pass control to the next middleware or route handler
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

module.exports = permissionMiddleware;
