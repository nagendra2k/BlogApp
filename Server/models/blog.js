const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    likes :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments :[
            {
                text:String,
                postedBy:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                }
            }
    ],
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Blog", blogSchema);