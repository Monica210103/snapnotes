const bcrypt = require('bcryptjs')
const User = require('../models/AuthModel')
const jwt = require('jsonwebtoken')

const signup = async (req,res) => {
    try{
        const {username,email,password} = req.body
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(409).json({message:"User already existing"})
        }

        if(password.length < 8){
            return res.status(400).json({message:"Password should be more than 8 characters"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)

        const newuser = new User({
            username,
            email,
            password:hashedPassword
        })
        await newuser.save()

        const token = jwt.sign(
            {id:newuser._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}

        )
        res.status(200).json({message:"Signed Up sucessfully",token})

    }catch(err){
        res.status(500).json({message:"There is an error in signup", err})
    }
}

const login = async (req, res) => {
    try{
        const { password, email} = req.body
        const loginUser = await User.findOne({email})

        if(!loginUser){
            return res.status(401).json({message:"user not found"})
        }

        const isMatched = await bcrypt.compare(password,loginUser.password)
        if(!isMatched){
            return res.status(401).json({message:"enter valid credentials"})
        }
        
        const token = jwt.sign(
            {id:loginUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )

        res.status(200).json({message:"Loged In successfully", token})
    }catch(err){
        res.status(500).json({message:"their is an error in log in", err})
    }
}


module.exports = {signup, login}