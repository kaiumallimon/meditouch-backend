const mongoose = require('mongoose');

// create the user schema
const healthTips = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    time: {
        type: Date, // Corrected from Timestamp to Date
        required: false,
        default: Date.now
    },
    image: {
        type: String,
        required: false,
        default: null
    },
}, {
    collection: 'healthtips',
});

// export the model
module.exports = mongoose.model('healthtips', healthTips);
