const Nurse = require("../../../models/nurse.model");
const createUpload = require("../../../utils/image.upload");
const { sendMail, sendPassword } = require('../../../features/mail/mail.sender');
const jwt = require('jsonwebtoken');
const generatePassword = require("../../../utils/generate.random.password");


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
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;
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
            image: imageUrl,
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