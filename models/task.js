const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: true
    },
    description:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    assignedBy:{
        type: String, 
        require: true
    },
    assignedTo:{
        // type: ObjectId,
        // ref: "User",
        type: String,
        require: true
    }
},{timestamps:true})

mongoose.model("Tasks", taskSchema);