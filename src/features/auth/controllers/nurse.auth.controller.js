const Nurse = require("../../../models/nurse.model");
const createUpload = require("../../../utils/image.upload");
const { sendMail, sendPassword, sendVerificationCode } = require('../../../features/mail/mail.sender');
const jwt = require('jsonwebtoken');
const generatePassword = require("../../../utils/generate.random.password");
const gdriveUtil = require("./../../../utils/gdrive/gdrive.util");

// controller to register a nurse:

exports.register = async (req, res) => {
    try {
        const { name, email, phone, gender, dob, address, department, education, experience, chargePerVisit } = req.body;

        // Check if the nurse already exists
        const existingNurse = await Nurse.findOne({ email });
        if (existingNurse) {
            return res.status(400).json({ message: "Nurse already exists with this email" });
        }

        // Handle image upload
        let imageUrl = null;


        const file = req.files[0];

        // If an image is uploaded, upload it to gdrive
        if (file) {
            imageUrl = await gdriveUtil.uploadFile(file);
        }

        // Generate random password
        const randomPassword = generatePassword.generateRandomPassword();

        // Create a new Nurse
        const newNurse = new Nurse({
            name,
            email,
            password: randomPassword,
            phone,
            gender,
            dob,
            address,
            department,
            education,
            experience,
            chargePerVisit,
            image: imageUrl 
        });

        // Save the new nurse
        await newNurse.save();

        // Send email with the password
        await sendPassword(name, email, randomPassword);

        res.status(201).json({
            status: "success",
            message: "Nurse registered successfully",
            nurse: {
                id: newNurse._id,
                name: newNurse.name,
                email: newNurse.email,
                imageUrl: newNurse.image,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller to login a nurse:
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the nurse by email
        const nurse = await Nurse.findOne({ email });
        if (!nurse) {
            return res.status(400).json({ message: 'No nurse found with that email' });
        }

        // Check if password matches
        const isMatch = await nurse.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { nurseId: nurse._id, email: nurse.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        nurse.password = undefined; // Exclude password in response

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            nurse,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get All Nurses
exports.getNurses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const nurses = await Nurse.find().skip(skip).limit(limit);

        // Remove password from response
        nurses.forEach(nurse => {
            nurse.password = undefined;
        });

        const totalNurses = await Nurse.countDocuments();

        res.status(200).json({
            status: 'success',
            currentPage: page,
            totalPages: Math.ceil(totalNurses / limit),
            totalNurses,
            nurses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id);
        if (!nurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }

        nurse.password = req.body.password; // Set new password
        await nurse.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Send Verification Code
exports.sendVerification = async (req, res) => {
    const { code, email } = req.body;

    if (!code || !email) {
        return res.status(400).json({
            success: false,
            message: 'Both email and verification code are required.',
        });
    }

    try {
        await sendVerificationCode(code, email);

        res.status(200).json({
            success: true,
            message: 'Verification code sent successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to send verification code. Please try again later.',
        });

    }
};

// Check if Nurse exists
exports.checkEmail = async (req, res) => {
    try {
        const nurse = await Nurse.findOne({ email: req.body.email });
        if (!nurse) {
            return res.status(404).json({ message: 'Nurse not found' });
        }
        res.status(200).json({ message: 'Nurse found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};