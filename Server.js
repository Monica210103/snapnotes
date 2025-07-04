const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const noteRoutes = require('./Routes/noteRoutes')
const authRoute = require('./Routes/AuthRoutes')

dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database is connectedd successfully")
})
.catch((err) => {
    console.log("error in database connection", err)
})

// authroutes
app.use('/api/auth',authRoute)

// routes
app.use('/api/notes',noteRoutes)

app.listen(process.env.PORT || 10000 , () => {
    console.log("Server is running")
})