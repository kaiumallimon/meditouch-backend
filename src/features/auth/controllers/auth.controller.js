//imports
const passport = require('passport');
const User = require('../../../models/user.model');
const createUpload = require("../../../utils/image.upload");
const {sendMail,sendPassword,sendVerificationCode} = require('../../../features/mail/mail.sender');

exports.register = async (req, res) => {
    try {
        console.log(req.file); 

        const { name, phone, email, password, gender, dob } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // If no user exists, check if an image is uploaded
        let imageUrl = null;
        if (req.file) {
            const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
            imageUrl = `${serverBaseUrl}/uploads/${req.file.filename}`;  // Make sure this matches the static path
        }

        // Create a new user
        const newUser = new User({
            name,
            phone,
            email,
            password,
            gender,
            dob,
            image: imageUrl, // Only set imageUrl if a file was uploaded
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                imageUrl: newUser.image, // Include the image URL in the response, even if null
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// login controller: to login a user
exports.login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({
                status: 'success',
                message: 'Login successful',
                user: user
            });
        });
    })(req, res, next);
};




// users controller: to get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        // exclude the password from the response
        users.forEach(user => {
            user.password = undefined;
        });
        res.status(200).json({ users }); // Return the users as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};


// user controller: get a single user by id

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Retrieve the user by id
        // exclude the password from the response
        user.password = undefined;
        res.status(200).json({ user }); // Return the user as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
}

// user controller: reset password

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Retrieve the user by id
        user.password = req.body.password; // Set the new password
        await user.save(); // Save the updated user
        res.status(200).json({ message: "Password reset successful" }); // Return a success message
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
}


/**
 * Controller to handle sending verification code.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
exports.sendVerificationCode = async (req, res) => {
    const { code, email } = req.body;

    // Validate input
    if (!code || !email) {
        return res.status(400).json({
            success: false,
            message: 'Both email and verification code are required.',
        });
    }

    try {
        // Call the sendVerificationCode function
        await sendVerificationCode(code, email);

        // Send success response to the client
        return res.status(200).json({
            success: true,
            message: 'Verification code sent successfully.',
        });
    } catch (error) {
        // Log the error and send failure response
        console.error('Error sending verification code:', error.message);

        return res.status(500).json({
            success: false,
            message: 'Failed to send verification code. Please try again later.',
        });
    }
};


exports.checkEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}