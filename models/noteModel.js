const mongoose = require('mongoose')

const notesModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    category:{
        type:String,
        default:"General"
    },
    
    status:{
        type:String,
        enum:["Done", "Important", "Normal"],
        default:"Normal"
    },
    createdAt:{
        type: Date,
        default:Date.now,
    },
    image:{
        type:String
    }
})

const notes = mongoose.model('note', notesModel)
module.exports = notes