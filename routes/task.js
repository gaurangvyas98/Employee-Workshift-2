const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/key");
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();
const Tasks = mongoose.model("Tasks");

//POST TO - Create Task - ONLY ADMIN
router.post("/Create-Task", requireLogin, (req,res)=>{
    //if role other than user..then not authorized
    const { role } = req.user;
    if(role !== 'ADMIN'){
        return res.status(403).json({ error: "Not authorized"})
    }

    const { name, description, duration, assignedBy, assignedTo } = req.body
    if(!name || !description || !duration || !assignedBy || !assignedTo){
        return res.status(422).json({ error: "Fill all the fields..."})
    }

    const task = new Tasks({
        name,
        description,
        duration,
        assignedBy,
        assignedTo
    })
    task.save().then(task => {
        res.json({ message: "Task given to user successfully "})
    }).catch(err=>{
        console.log(err);
    })
})

// VIEW ALL THE TASK -- USER
router.get("/getAllTask", requireLogin, (req,res)=>{
    console.log(req.user.name)
    Tasks.find({ assignedTo: req.user._id })
    .populate("name", " assignedBy")
    .then(mytask=>{
        console.log(mytask)
        res.json({mytask})
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router;