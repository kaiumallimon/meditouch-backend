const mongoose = require('mongoose');

// schema
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    medicines: [
        {
            id: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            generic_name: {
                type: String,
                required: true
            },

            slug: {
                type: String,
                required: true
            },

            category: {
                type: String,
                required: true
            },

            manufacturer: {
                type: String,
                required: true
            },

            strength: {
                type: String,
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },

            selected_unit: {
                type: String,
                required: true
            },

            prices: [
                {
                    price: {
                        type: Number,
                        required: true
                    },

                    unit: {
                        type: String,
                        required: true
                    },

                    unit_size: {
                        type: Number,
                        required: true
                    }
                }
            ],

            discount_type: {
                type: String,
                required: true
            },

            discount_value: {
                type: Number,
                required: true
            },

            image_url: {
                type: String,
                required: true
            },

            medicine_url: {
                type: String,
                required: true
            },

            added_on: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, {
    collection: 'cart',
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// // index user for efficient lookup
// cartSchema.index({ user: 1 });

// model
const Cart = mongoose.model('Cart', cartSchema);

// export the model
module.exports = Cart;
