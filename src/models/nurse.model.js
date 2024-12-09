const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'], 
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Date of birth cannot be in the future',
    },
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  education: {
    type: [
      {
        degree: {
          type: String,
          required: [true, 'Degree is required'],
        },
        institute: {
          type: String,
          required: [true, 'Institute is required'],
        },
        year: {
          type: String,
          required: [true, 'Year is required'],
          match: [/^\d{4}$/, 'Please enter a valid year (e.g., 2020)'],
        },
      },
    ],
    default: [],
  },
  experience: {
    type: [
      {
        hospital: {
          type: String,
          required: [true, 'Hospital name is required'],
        },
        year: {
          type: String,
          required: [true, 'Year is required'],
          match: [/^\d{4}$/, 'Please enter a valid year (e.g., 2020)'],
        },
      },
    ],
    default: [],
  },
  image: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg',
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/, 'Please enter a valid image URL'],
  },
  reviews: {
    type: [
      {
        rating: {
          type: Number,
          required: [true, 'Rating is required'],
          min: [1, 'Rating must be at least 1'],
          max: [5, 'Rating cannot exceed 5'],
        },
        message: {
          type: String,
          required: [true, 'Review message is required'],
          trim: true,
        },
      },
    ],
    default: [],
  },
  chargePerVisit: {
    type: Number,
    required: [true, 'Charge per visit is required'],
    min: [0, 'Charge per visit cannot be negative'],
  },
});

// Export the model
const Nurse = mongoose.model('Nurse', nurseSchema);

module.exports = Nurse;
