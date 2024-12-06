// imports
const Cart = require("../../../models/cart.model");


// addToCart controller
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
        res.status(200).json({ message: "Cart updated successfully", cart: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
};



// get cart by user ID controller

exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "No cart found for this user" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
