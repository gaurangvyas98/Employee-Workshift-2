const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "USER",
        enum: ["USER", "ADMIN"]
    }
},{timestamps: true})
//added timestamp to add createdAt field to sort latest post first order

mongoose.model("User",userSchema)