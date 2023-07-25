const User = require('../models/user');

const edituser = async (req, res) => {
    const {name,image} = req.body;
    await User.updateOne({
        _id: req.user._id
    }, {
        $set: {
            name: name,
            photo: image
        }
    });
    const user = await User.findOne({_id:req.user._id});
    res.json({success: "Profile updated successfully", user});    
}

module.exports = {
    edituser
}