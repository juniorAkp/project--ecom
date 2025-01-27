const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
