const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    userId:{
        type: ObjectId,
        ref: "User",
    },
    paymentMethod: String,
    status: String,
    amount:{
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        trim: true // Trim whitespace
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    }

},{timestamps: true})

module.exports = mongoose.model('transaction', userSchema);