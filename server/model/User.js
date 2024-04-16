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
        unique: true
    },
    age: Number,
    gender: String,
    city: String,
    transaction:[{
        type: ObjectId,
        ref: "Transaction",
        default:[]
    }],
    preferences: [String],
    cart:[{
        type: ObjectId,
        ref: "Product",
        default:[]
    }]

},{timestamps: true})

module.exports = mongoose.model('User', userSchema);