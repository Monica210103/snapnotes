const jwt = require('jsonwebtoken')

const protect = (req,res,next) => {
    try{
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"token not available"})
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = {id: decoded.id}
    next()

   }catch(Err){
     res.status(401).json({message:"error in protected routes", Err})
   }
    
}

module.exports = protect;
