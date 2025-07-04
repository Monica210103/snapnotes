const express = require('express')
const router = express.Router()
const protect = require('../Middlewares/AuthMiddleware')
const { getNotes, deleteNote, updateNote, postNotes } = require('../Controllers/noteController')

// to get notes
router.get('/getnotes',protect,getNotes)

// to post notes
router.post('/postnote',protect,postNotes)

// to delete posts
router.delete('/deletenote/:id',protect,deleteNote)

// to update notes
router.put('/updatenote/:id',protect,updateNote)


module.exports = router
