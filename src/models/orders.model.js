const mongoose = require('mongoose');

// schema
const orderSchema = new mongoose.Schema({
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

            price: {
                type: Number,
                required: true
            },

            discount_type: {
                type: String,
                required: true
            },

            discount_value: {
                type: Number,
                required: true
            },

            total_price: {
                type: Number,
                required: true
            },

            image_url: {
                type: String,
                required: true
            }
        }
    ],

    total_amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    payment_method: {
        type: String,
        enum: ['Cash on Delivery', 'Bkash'],
        required: true
    },

    payment_status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
        required: true
    },

    shipping_address: {
        full_name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },

    order_date: {
        type: Date,
        default: Date.now
    },

    delivered_date: {
        type: Date,
        default: null
    }

}, {
    collection: 'orders',
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Indexing user for efficient lookup
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });

// model
const Order = mongoose.model('Order', orderSchema);

// export the model
module.exports = Order;
