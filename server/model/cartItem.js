const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'product',
            required: true
        },
        quantity:{
            type: Number,
            default: 1,
            min:1,
            max: 255
        }
    }],
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

cartSchema.virtual('id').get(function () {
        return this._id.toHexString();
    });

cartSchema.set('toJSON',
    {
        virtuals: true,
    });
const cart = mongoose.model('cart',cartSchema)
module.exports = cart;