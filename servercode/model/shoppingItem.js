// allows interaction between mongodb
const mongoose = require('mongoose');

// A mongoDB schema
const shopping_item_schema = mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    item_quantity: {
        type: Number,
        required: true
    },
    item_bought: {
        type: Boolean,
        required: true
    },
});

// exporting a module
const Item = module.exports = mongoose.model('Item', shopping_item_schema);