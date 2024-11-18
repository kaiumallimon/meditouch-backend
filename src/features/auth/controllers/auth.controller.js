//imports
const passport = require('passport'); 
const User = require('../../../models/user.model'); 


// register controller: to register a new user
exports.register = async (req, res) => {
    try {
        // get the user details from the request body
        const { name, phone, email, password, gender, dob } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create a new user
        const newUser = new User({
            name,
            phone,
            email,
            password,
            gender,
            dob
        });

        // save the user
        await newUser.save();

        // return a response
        res.status(201).json({
            status: 'success',
            message: 'User created successfully'
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
        res.status(200).json({ users }); // Return the users as a JSON response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
