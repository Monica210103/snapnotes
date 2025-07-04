const mongoose = require('mongoose')

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxlength:10
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String
    },
},
    {timestamps:true}
)
const User = mongoose.model('user', user)
module.exports = User;