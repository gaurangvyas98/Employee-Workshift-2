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
    },
    pic: {
        type: String,
        default: "https://res.cloudinary.com/gaurangvyas/image/upload/v1596096267/debbie-molle-6DSID8Ey9-U-unsplash_k2xyap.jpg"
    },
},{timestamps: true})
//added timestamp to add createdAt field to sort latest post first order

mongoose.model("User",userSchema)