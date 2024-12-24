const stream = require('stream');
const { google } = require('googleapis');

const googleService = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
const scopes = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
    credentials: googleService,  // Use credentials here instead of keyFile
    scopes: scopes,
});

const folderId = process.env.GDRIVE_FOLDER_ID;

exports.uploadFile = async (fileObject) => {
    try {
        // ensuring the file object is valid
        if (!fileObject || !fileObject.buffer || !fileObject.mimetype || !fileObject.originalname) {
            throw new Error("Invalid file object received.");
        }

        // create a readable stream from the file buffer
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);

        // Upload the file to Google Drive
        const drive = google.drive({ version: 'v3', auth });
        const { data } = await drive.files.create({
            media: {
                mimeType: fileObject.mimetype,
                body: bufferStream,  // Using the buffer stream
            },
            requestBody: {
                name: fileObject.originalname,
                parents: folderId ? [folderId] : [],  // Ensure folderId is set
            },
            fields: 'id,name',
        });


        // Make the file publicly accessible
        await drive.permissions.create({
            fileId: data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Generate the file's public URL
        const fileUrl = `https://drive.google.com/uc?export=view&id=${data.id}`;

        return { fileName: data.name, fileUrl };  // Return the file name and URL
    } catch (err) {
        console.error("Error uploading file to Google Drive:", err.message);
        throw new Error(`Error uploading file to Google Drive: ${err.message}`);
    }
};
