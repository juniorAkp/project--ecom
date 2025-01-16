const mongoose = require('mongoose');
const {Schema} = mongoose

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    richDescription:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    images:[{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    countInStock:{
        type: Number,
        required: true,
        min:0,
        max: 255
    },
    rating:{
        type:Number,
        default: 0
    },
    reviews:{
        type: Number,
        default: 0,
    },
    dateCreated:{
        type: Date,
        default: Date.now()
    }
})

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON',
    {
        virtuals: true,
    });

const product = mongoose.model('product',ProductSchema);
module.exports = product;