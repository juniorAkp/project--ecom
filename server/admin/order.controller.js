const Order = require('../model/order');
const mongoose = require("mongoose");

const editOrder = async(req,res)=>{
  const {id} = req.params;
  try {
      if(!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid order ID", success: false });
      const updatedStatus = await Order.findByIdAndUpdate(id,{
          status: req.body.status
      },{new: true})
      if(!updatedStatus) return res.status(400).json({message:"Cannot find order to update",success:false})
      return res.status(200).json({update:updatedStatus, success:false})
  }catch (e) {
      return res.status(500).json({message:e.message,success:false})
  }
}

const getOrders = async (req, res) => {
    try {
      const orders = await Order.find({ status: { $ne: 'Pending' } }) // Exclude orders with status 'pending'
        .sort({ dateOrdered: -1 })
        .populate('user', 'name')
        .populate('deliveryLocation', 'name');
  
      if (!orders || orders.length === 0) {
        return res.status(400).json({ error: "No orders found", success: false });
      }
  
      return res.status(200).json({ orders, success: true });
    } catch (e) {
      return res.status(500).json({ error: e.message, success: false });
    }
  };
  

const getOrdersCount = async(req,res)=>{
  try{
    const orderCount = await Order.countDocuments();
    if(!orderCount) return res.status(200).json({error: "no orders found",success: true,data:[]})
    return res.status(200).json({count: orderCount, success: true})
}catch (e){
    return res.status(500).json({message: e.message,success: false})
}
}
const getOrder = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.isValidObjectId(id)) return res.status(400).json({error: "invalid id",success: false})
  try {
      const order = await Order.findById(id)
          .populate('user','name email phone')
      if(!order) return res.status(400).json({error: "invalid id",success: false})
      return res.status(200).json({order: order, success: true})
  }catch (e) {
      return res.status(500).json({error: e.message,success: false})
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

const getTotalSales = async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        // Match only paid orders
        { $match: { status: 'Paid' } },
        // Group the orders and sum the total price
        { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } }
      ]);
  
      if (!totalSales || totalSales.length === 0) {
        return res.status(400).json({ error: "No paid orders found", success: false });
      }
  
      return res.status(200).json({ totalSales: totalSales[0].totalSales, success: true });
    } catch (e) {
      return res.status(500).json({ error: e.message, success: false });
    }
  };
  
module.exports = {
  getOrders,
  editOrder,
  getTotalSales,
  deleteOrder,
  getOrder,
  getOrdersCount
}