const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const grocerySchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

const Grocery = mongoose.model('Grocery', grocerySchema);

const electronicSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const Electronic = mongoose.model('Electronic', electronicSchema);


const utilitySchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const Utility = mongoose.model('Utility', utilitySchema);


const clothingSchema = new mongoose.Schema({
    productId: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    targetAudience: {
        type: String,
        required: true
    },
    age: Number,
    brand: {
        type: String,
        required: true
    }
});

const Clothing = mongoose.model('Clothing', clothingSchema);


module.exports = { Grocery, Electronic, Utility, Clothing };