// Imports
const Cart = require("../../../models/cart.model");

// Add to Cart Controller
exports.addToCart = async (req, res) => {
    const { userId, medicine } = req.body;

    if (!userId || !medicine) {
        return res.status(400).json({ message: "User ID and medicine data are required" });
    }

    try {
        // Check if the user already has a cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({
                user: userId,
                medicines: [medicine]
            });
        } else {
            // If cart exists, check if the medicine is already in the cart
            const medicineIndex = cart.medicines.findIndex(med => med.id === medicine.id);

            if (medicineIndex > -1) {
                // If medicine exists, update its quantity
                cart.medicines[medicineIndex].quantity += medicine.quantity;
            } else {
                // If medicine does not exist, add it to the cart
                cart.medicines.push(medicine);
            }
        }

        // Save the updated cart
        const updatedCart = await cart.save();
        res.status(200).json({
            message: "Cart updated successfully",
            cart: updatedCart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get Cart by User ID Controller (fetch all cart items)
exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Get all cart documents for the user
        const carts = await Cart.find({ user: userId });

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: "No carts found for this user" });
        }

        res.status(200).json({
            message: "Carts retrieved successfully",
            carts: carts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Remove a specific medicine from the cart
exports.removeMedicineFromCart = async (req, res) => {
    try {
        const { userId, medicineId } = req.params;

        if (!userId || !medicineId) {
            return res.status(400).json({ message: "User ID and Medicine ID are required" });
        }

        // Find the user's cart and remove the medicine by its id
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { medicines: { id: medicineId } } }, // Removes the medicine with the specific id
            { new: true } // Return the updated cart
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found for this user" });
        }

        res.status(200).json({ message: "Medicine removed from cart successfully", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
