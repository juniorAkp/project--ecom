const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    deliveryLocation: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Location', 
        required: true
    },
    phone: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Delivered', 'Pending', 'Paid'],
        default: 'Pending',
    },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateOrdered: { type: Date, default: Date.now },
    paymentReference: { type: String },
});

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
