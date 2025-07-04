const notes = require('../models/noteModel')

const getNotes = async (req,res) => {
    try{
        const Allnotes = await notes.find({user:req.user.id})
        res.status(200).json(Allnotes)
    }catch(err){
        res.status(500).json({message:"error in getting notes", err})
    }
}

const postNotes = async (req,res) => {
    try{
        const postNotes = new notes({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            category:req.body.category,
            user:req.user.id
        })
        await postNotes.save()
        res.status(201).json({message:"notes posted successfully"})
    }catch(err){
        res.status(500).json({message:"error in posting the notes", err})
    }
}

const deleteNote = async (req, res) => {
    try{
        await notes.findByIdAndDelete({_id:req.params.id,user:req.user.id})
        res.status(200).json({message:"Note deleted successfully"})
    }catch(err){
        res.status(500).json({message:"couldn't find the id to delete the note", err})
    }
}

const updateNote = async (req, res) => {
    try{
      const updatedNote = await notes.findByIdAndUpdate(
           {_id: req.params.id,
            user:req.user.id
           },
            req.body,
            {new:true}
        )
        res.status(200).json({message:"updated successfully", updatedNote})
    }catch(Err){
        res.status(500).json({message:"could not update the note", Err})
    }
}

module.exports = { getNotes, deleteNote, updateNote, postNotes }
