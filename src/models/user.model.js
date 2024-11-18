const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

// hash the password before saving
userSchema.pre('save', async function(next) {
    // Check if the password is modified (new or changed)
    if (!this.isModified('password')) {
        return next();  // if not modified, skip the hashing
    }
    try {
        // Hash the password with bcrypt and set it to the password field
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        return next(err);  // pass any error to the next middleware
    }
});

// compare the password

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);    
}

// export the model
module.exports = mongoose.model('User', userSchema);
