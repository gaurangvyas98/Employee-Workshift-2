const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/key");
const requireLogin = require('../middleware/requireLogin');
const router = express.Router();
const Tasks = mongoose.model("Tasks");
const User = mongoose.model("User");

//POST TO - Create Task - ONLY ADMIN
router.post("/Create-Task", requireLogin, (req,res)=>{
    //if role other than user..then not authorized
    const { role } = req.user;
    if(role !== 'ADMIN'){
        return res.status(403).json({ error: "Not authorized"})
    }

    const { taskName, description, duration, assignedBy, assignedTo } = req.body
    console.log(taskName, description, duration, assignedBy, assignedTo)
    if(!taskName || !description || !duration || !assignedBy || !assignedTo){
        return res.status(422).json({ error: "Fill all the fields..."})
    }

    assignedTo.map((assignedTo, index) => {
        const task = new Tasks({
            taskName,
            description,
            duration,
            assignedBy,
            assignedTo
        })
        task.save().then(() => console.log("saved for user : ", index+1))
    })
    //ASSIGNING MULTIPLE USERS SAME TASK
    // const task = new Tasks({
    //     taskName,
    //     description,
    //     duration,
    //     assignedBy
    // })
    // task.save().then(result =>{
    //     res.json({ message: "Task assigned to ALL user successfully "})
    // }).catch(err=>{
    //     console.log(err)
    // })


  return res.json({ message: "Task assigned to ALL user successfully "})
    
})

// VIEW ALL THE TASK -- USER
router.get("/getAllTask", requireLogin, (req,res)=>{
    // console.log(req.user._id)
    // console.log(req.body)
    Tasks.find({ assignedTo: req.user.email })
    .populate("name", "assignedBy")
    .then(mytask=>{
        // console.log(mytask)
        res.json({mytask})
    })
    .catch(err=>{
        console.log(err)
    })
})


//GET ALL USERS 
router.get("/getAllUsers", requireLogin, (req,res)=>{
    User.find().then(foundUser => {
        return res.json({ allUsersData: foundUser})
    })
})
module.exports = router;