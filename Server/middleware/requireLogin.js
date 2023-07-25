const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_KEY} = require('../config/key')

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    //authorization === Bearer embjhbzjcb
    if(!authorization){
        return res.status(401).json({
            error: "You must be logged in authorisation error :(",
            type: ''
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,JWT_KEY,(err,payload) => {
        if(err){
            return res.status(401).json({
                error:"you must be logged in :(",
                type: '1'
            });
        }
        const {_id} = payload;
        User.findById(_id).then(user => {
            req.user = user;
            next();
        })
    })
}
