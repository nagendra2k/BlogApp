const User = require('../models/user');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/key');

const signup = async (req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({
            error: "Please fill all fields"
        })
    }
    let user = await User.findOne({email:email});
    if(!user){
        let hashedPassword = await bycrpt.hash(password,10);
        let newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
    }
    res.json({
        success: "Successfully Registered"
    })
}

const signin = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let user = await User.findOne({email:email});
    if(!user){
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }
    let passCheck = await bycrpt.compare(password,user.password);
    if(passCheck){
        const token = jwt.sign({_id:user._id}, JWT_KEY);
        res.json({
            success: "Successfully LoggedIn",
            token,
            user
        });
    }else{
        return res.status(422).json({
            error: "Incorrect Credentials!"
        })
    }

}

module.exports = {
    signup,
    signin
}
