const mongoose = require('mongoose')
const schema = mongoose.Schema;

const categorySchema = new schema({
    name:{
        type: String,
        required: true
    }
})

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON',{
    virtuals: true,
})
const category = mongoose.model('category',categorySchema);
module.exports = category;