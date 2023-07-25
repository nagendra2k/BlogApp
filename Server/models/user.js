const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    photo:{
        type: String,
        default: 'https://res.cloudinary.com/hari03cloud/image/upload/v1656234037/R_lelvbn.png'
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    popularity:{
        type:Number,
        default: 0
    }
})

module.exports = mongoose.model("User", userSchema);