//imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create the doctor schema
const doctorSchema = new mongoose.Schema({
    name: {
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
    phone: {
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
    },
    district: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    licenceId: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    
    visitingFee: {
        type: String,
        required: true
    },
    reviews: {
        type: [
            {
                rating: {
                    type: Number,
                },
                message: {
                    type: String,
                },
            },
        ],
        default: [], // Default to an empty array
    },
    education: {
        type: [
            {
                degree: {
                    type: String,
                    required: true,
                },
                institute: {
                    type: String,
                    required: true,
                },
                year: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [], // Default to an empty array
    },

    all_timeslots: {
        type: [
            {
                date: {
                    type: String, // Keeping as String for flexibility (can parse as needed)
                    required: true,
                },
                intervals: {
                    type: [
                        {
                            start: {
                                type: String, // Using String for time values
                                required: true,
                            },
                            end: {
                                type: String,
                                required: true,
                            },
                        },
                    ],
                    default: [], // Default to an empty array
                },
                timePerInterval: {
                    type: Number,
                    required: true,
                },
            },
        ],
        default: [], // Default to an empty array
    },
},{
    collection: 'doctors',
})


//hash the password before saving

doctorSchema.pre('save', async function (next) {
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
})


// compare the password

doctorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


//export the model
module.exports = mongoose.model('Doctor', doctorSchema);