const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const {JWT_SECRET}= require("../config/keys")
const requireLogin = require("../middleware/requireLogin")
const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")
//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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.get("/protected",requireLogin,(req,res)=>{
    res.send("hello user");
})

router.post("/signup", (req, res) => {
    const { name, email, password,pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields!" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name,
                        pic
                    })
                    user.save()
                        .then(user => {
                            transporter.sendMail({
                                to:user.email,
                                from:"maverickhasarrived@gmail.com",
                                subject:"Sign Up Sucess",
                                html:"<h1>Welcome to Papparazo</h1>"
                            })
                            res.json({ message: "Sign Up Sucessful" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"Please provide email or password"});
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error: "Invalid Email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} =savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
            return res.status(422).json({error: "Invalid Email or password"});
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})
module.exports = router