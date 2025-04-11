const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: String,
    material: String,
    country: String,
    year: Number,
    price: Number
});

module.exports = mongoose.model('Coin', coinSchema);