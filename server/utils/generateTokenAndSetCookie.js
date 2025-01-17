const jwt = require('jsonwebtoken')
 const generateTokenAndSetCookie = async(res,userId,isAdmin)=>{
  
  const token = jwt.sign({userId,isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'})
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
   sameSite: "None"
    maxAge: 24 * 60 * 60 * 1000,
  })
  return token
}
const generateTokenAndSetCookie2 = async(res,userId,isAdmin)=>{
  const token = jwt.sign({userId,isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'})
  res.cookie("token2", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: default,
    maxAge: 24 * 60 * 60 * 1000,
  })
  return token
}
module.exports = {generateTokenAndSetCookie,generateTokenAndSetCookie2}
