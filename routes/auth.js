const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../config/key");
const router = express.Router();

const User = mongoose.model("User");

//POST To - signup
router.post("/signup", (req,res)=>{
    const {name, email, password, role} = req.body;

    if(!name || !email || !password){
        return res.status(442).json({ error : "Please enter all the fields..!!!"});
    }

    User.findOne({ email: email})
        .then((savedUser)=>{
            //if email is already registered
            if(savedUser){
                return res.status(442).json({ error : "Email already registered..!!!"});
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    //saving data to the db
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name,
                        role
                    })
                    user.save()
                        .then(user=>{
                            res.json({ message: "SIGNUP successfully..!!" })
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                })
        })
        .catch(err=>{
            console.log(err);
        })
})

//POST TO - LOGIN
router.post("/login", (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(442).json({ error : "Please enter all the fields..!!!"});
    }

    User.findOne({ email: email })
        .then(savedUser =>{
            //If no email id found then
            if(!savedUser){
                return res.status(442).json({ error : "Invalid EMAIL or PASSWORD..!!!"});
            }
            //comparing password comming from client with the password saved in the database // return boolean value
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if(doMatch){
                        //generating token using user_id
                        const token = jwt.sign({ _id: savedUser._id}, JWT_SECRET);
                        // const token = jwt.sign({ _id: savedUser._id, role: savedUser.role }, JWT_SECRET);
                        
                        // sending token and user data like id,name & email of the user to FRONT END
                        const {_id, name, email, role, pic } = savedUser
                        // res.header('x-auth-header', token).send({ user: {_id, name, email, role} })
                        
                        //if role is admin then send all users info in that ---ALL USERS DATA TO FRONTEND
                        // if(role === 'ADMIN'){
                        //     return User.find().then(allUsersData => {
                        //         // let { name, email, _id } = allUsersData
                        //         res.json({token, user: {_id, name, email, role}, allUsersData: [allUsersData] })
                        //     })
                        // //    return  User.find().then(allUsersData => const {name, email, _id} = allUsersData; res.json({ token, user: {_id, name, email, role}, allUsersData:  }))   
                        // }
    
                        res.json({ token, user: {_id, name, email, role, pic} })
                    }
                    else{
                        return res.status(442).json({ error : "Invalid EMAIL or PASSWORD..!!!"});
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        })
})

router.get('/name', (req, res) => {
    const data =  {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});


module.exports = router;





//sending welcome mail to user when he/she signup for instagram
// transporter.sendMail({
//     from: "gaurangvyas156@gmail.com", // sender address
//     to: user.email,
//     subject: "SignUP Success ✔ ", 
//     html: "<h1>WELCOME TO INSTAGRAM BY GAURANG VYAS 🤘</h1>",  
// })