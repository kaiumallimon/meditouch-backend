//imports
const passport = require('passport');
const Doctor = require('../../../models/doctor.model');
const createUpload = require("../../../utils/image.upload");
const generatePassword = require("../../../utils/generate.random.password");
const {sendMail, sendPassword} = require('../../../features/mail/mail.sender'); 


exports.register = async (req, res) => {
    try {
        console.log(req.file); // Debugging the file

        const { name, email, phone, gender, dob, district, image, licenceId, speciality, experience, visitingFee, reviews, education, timeSlots } = req.body;

        // Check if the doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists with this email" });
        }

        // If no doctor exists, check if an image is uploaded
        let imageUrl = null;
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;  // Make sure this matches the static path
        }

        //generate password
        const randomPassword = generatePassword();

        // Create a new doctor
        const newDoctor = new Doctor({
            name,
            email, 
            password: randomPassword,
            phone,
            gender,
            dob,
            district,
            image: imageUrl,
            licenceId,
            speciality,
            experience,
            visitingFee,
            reviews,
            education,
            timeSlots
        });

        // Save the new doctor to the database
        await newDoctor.save();

        // send email to the doctor
        await sendPassword(name, email, randomPassword);
        

        res.status(201).json({
            status: "success",
            message: "Doctor added successfully",
            doctor: {
                id: newDoctor._id,
                name: newDoctor.name,
                email: newDoctor.email,
                imageUrl: newDoctor.image, // Include the image URL in the response, even if null
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login controller: to login a doctor
exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, doctor, info) => {
        if (err) {
            return next(err);
        }
        if (!doctor) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(doctor, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                doctor: doctor
            });
        });
    })(req, res, next);
};




// Doctors controller: to get all doctors
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find(); // Retrieve all doctors from the database
        res.status(200).json({ doctors }); // Return the doctors as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
