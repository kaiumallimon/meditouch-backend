const { checkApiKey } = require("../features/apikey/controllers/apikey.controller");


// Middleware to check API Key and permissions (read/write)
const permissionMiddleware = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const apiKey = req.headers['x-api-key'];

            if (!apiKey) {
                return res.status(401).json({ message: "API Key is required." });
            }

            const keyData = await checkApiKey(apiKey);
            if (keyData.status !== 'success') {
                return res.status(401).json({ message: "Invalid API Key" });
            }

            // Check if the API key has the required permission (read or write)
            if (!keyData.permission[requiredPermission]) {
                return res.status(401).json({ message: "Unauthorized access." });
            }

            req.apiKeyData = keyData;  // Store the key data for later use
            next();  // Pass control to the next middleware or route handler
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
};

module.exports = permissionMiddleware;
