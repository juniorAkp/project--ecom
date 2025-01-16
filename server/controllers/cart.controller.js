const Cart = require('../model/cartItem')
const mongoose = require("mongoose");

const addToCart = async(req,res)=>{
  const {productId} = req.body;
  const {userId} = req.params;
  if(!mongoose.isValidObjectId(userId,productId)){
      return res.status(400).json({error: "not a valid input",success: false})
  }
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
      cart = new Cart({ user: userId, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.toString() === productId);
  if (existingItem) {
      existingItem.quantity += existingItem.quantity;
  } else {
      cart.items.push({ product: productId});
  }

  await cart.save();
  res.status(200).json({ cart });
}

const updateCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
  
    try {
      // Find the user's cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found', success: false });
      }
  
      // Find the cart item
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Product not found in cart', success: false });
      }
  
      // Update the quantity or remove the item if quantity is 0 or less
      if (quantity > 0) {
        cart.items[itemIndex].quantity = quantity;
      } else {
        cart.items.splice(itemIndex, 1);
      }
  
      // Save the updated cart
      await cart.save();
  
      return res.status(200).json({ message: 'Cart updated successfully', cart, success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  };




const deleteCart = async (req, res) => {
    const { userId, productId } = req.params; // Assuming productId is passed in the request

    try {
        // Find the user's cart
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found', success: false });
        }

        // Check if items array exists and is an array
        if (!Array.isArray(cart.items)) {
            return res.status(400).json({ message: 'Cart items array is not properly initialized', success: false });
        }

        // Remove the item from the cart's items array
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart', success: false });
        }

        // Remove the item from the cart's items array
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        return res.status(200).json({ message: 'Item removed from cart successfully', cart, success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
};


const getUserCart = async (req, res) => {
    const { userId } = req.params;
  
    // Validate the user ID
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID", success: false });
    }
  
    try {
      // Find the cart by userId
      const cartItems = await Cart.findOne({ user: userId }).populate('items.product'); // Populate product details if needed
  
      // Check if the cart exists and contains items
      if (!cartItems || cartItems.items.length === 0) {
        return res.status(200).json({ message: "Cart is empty", success: true, data: [] });
      }
  
      return res.status(200).json({ message: "Cart is ready", cartItems, success: true });
    } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({ error: error.message, success: false });
    }
  };

module.exports = {
  addToCart,
  deleteCart,
  getUserCart,
  updateCart
}
