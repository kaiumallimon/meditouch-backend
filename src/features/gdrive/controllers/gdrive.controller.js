const gdriveUtils = require("./../../../utils/gdrive/gdrive.util");

exports.testDrive = async (req, res) => {
    try {
        const file = req.files[0];

        console.log(file)

        // Check if a file is provided
        if (!file) {
            return res.status(400).json({ message: "No file provided" });
        }

        const {fileName, fileUrl} = await gdriveUtils.uploadFile(file); 

        // Return success response
        res.status(200).json({
            message: "File uploaded successfully",
            fileName,
            fileUrl,
        });
    } catch (error) {
        // Log the error and respond with a message
        console.error("Error uploading file to Google Drive:", error.message);
        res.status(500).json({ message: "Error uploading file to Google Drive", error: error.message });
    }
};
