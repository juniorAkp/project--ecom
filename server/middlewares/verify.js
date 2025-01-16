const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const verify = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.Authorization || req.headers.authorization
    if(!token){
      return res.status(401).json({message:"Unauthorized", success:false})
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
      return res.status(401).json({message:"Unauthorized", success:false})
    }
    req.userId = decoded.userId
    req.user = decoded.isAdmin
    next()
  } catch (error) {
    return res.status(500).json({message:error.message, success:false})
  }
}

module.exports = verify;