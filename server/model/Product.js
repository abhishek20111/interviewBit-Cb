const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: String,
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageUrl: String,
    piecesRemaining: {
        type: Number,
        default: 0 
    },
    sales: {
        type: Number,
        default: 0 
    },
    discount:{
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    features: [String],
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
