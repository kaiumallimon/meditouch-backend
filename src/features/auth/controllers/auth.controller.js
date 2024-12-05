//imports
const jwt = require('jsonwebtoken');
const User = require('../../../models/user.model');
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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'No user found with that email' });
        }

        // 2. Compare the entered password with the stored hash
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        // 3. Generate a JWT token (you can also store user in a session, but JWT is more scalable)
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET,                   // Secret key for signing the token
            { expiresIn: '1h' }                      // Expiration time (optional)
        );

        user.password = undefined; // Exclude the password from the user object

        // 4. Send the response with the token and user details
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,  // Send the token to the client
            user: user,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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