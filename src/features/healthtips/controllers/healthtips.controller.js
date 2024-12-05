//imports
const healthtipsModel = require('../../../models/healthtips.model');

// healthtips.controller.js: addHealthTip

exports.addHealthTip = async (req, res) => {
    try {
        const { title, author, body } = req.body;

        let imageUrl = null;
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;  // Make sure this matches the static path
        }

        const newTip = new healthtipsModel({
            title,
            author,
            body,
            image: imageUrl
        });
        await newTip.save();
        res.status(201).json({ message: "Health Tip added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// healthtips.controller.js: getHealthTips

exports.getHealthTips = async (req, res) => {
    try {
        const tips = await healthtipsModel.find();
        res.status(200).json(tips);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// healthtips.controller.js: getHealthTipById

exports.getHealthTipById = async (req, res) => {
    try {
        const tip = await healthtipsModel.findById(req.params.id);
        res.status(200).json(tip);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// healthtips.controller.js: updateHealthTip

exports.updateHealthTip = async (req, res) => {
    try {
        const { title, author, body } = req.body;

        // Validate required fields
        if (!title || !author || !body) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the existing tip
        const existingTip = await healthtipsModel.findById(req.params.id);
        if (!existingTip) {
            return res.status(404).json({ message: "Health Tip not found" });
        }

        // Handle the image URL
        let imageUrl = existingTip.image; // Default to existing image
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;
        }

        // Update the document
        const updatedTip = await healthtipsModel.findByIdAndUpdate(
            req.params.id,
            { title, author, body, image: imageUrl },
            { new: true }
        );

        res.status(200).json({
            message: "Health Tip updated successfully",
            updatedTip,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// healthtips.controller.js: deleteHealthTip

exports.deleteHealthTip = async (req, res) => {
    try {
        await healthtipsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Health Tip deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


