const Order = require('../model/order')
const cartItem = require('../model/cartItem');
const mongoose = require('mongoose')
const Cart = require('../model/cartItem');

const getOrder = async(req,res)=>{
  const {userId} = req.params;
  try {
      const userOrders = await Order.find({user:userId}).populate('user','name email')
          .populate({
              path: 'orderItems', populate: { path: 'product', populate: 'category' }
          }).sort({dateOrdered: -1})
      return res.status(200).json({orders: userOrders, success: true})
  }catch (e) {
      return res.status(500).json({error: e.message,success: false})
  }
}
const addOrder = async (req, res) => {
    try {
        const { userId, shippingAddress1, shippingAddress2, city, zip, country, phone } = req.body;

        // Check for missing shipping details
        if (!shippingAddress1 || !city || !zip || !country || !phone) {
            return res.status(400).json({ message: 'All shipping details are required.', success: false });
        }

        // Find the cart for the user and populate the product details
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.', success: false });
        }

        // Map cart items to order items structure
        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        // Calculate total price
        const totalPrice = cart.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        // Create and save the order
        const order =  Order({
            user: userId,
            orderItems,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            totalPrice,
        });

        await order.save();

        // Remove the user's cart after order creation
        await Cart.findOneAndDelete({ user: userId });

        res.status(201).json({ order, success: true });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};



const updateToPaid = async (req,res)=>{
    try {
        const { orderId } = req.params;
    
        // Find the order and update its status
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: 'Order not found.', success: false });
        }
    
        // Update the order status to 'paid'
        order.status = 'Paid';
        await order.save();
    
        res.status(200).json({ success: true, message: 'Order status updated to paid.' });
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Internal server error.', success: false });
      }
}
const deleteOrder = async(req,res)=>{
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid order ID", success: false });
  }

  try {
      // Find and delete the order
      const order = await Order.findByIdAndDelete(id);

      if (!order) {
          return res.status(404).json({ message: "Order not found", success: false });
      }

      // Delete associated cart items
      await Promise.all(order.orderItems.map(async (orderItemId) => {
          await cartItem.findByIdAndDelete(orderItemId);
      }));

      return res.status(200).json({ message: "Order and associated cart items deleted successfully", success: true });
  } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ error: "Server error while deleting order", success: false });
  }
}

module.exports = {
  getOrder,
  deleteOrder,
  addOrder,
  updateToPaid
}