<<<<<<< HEAD
 const generateTokenAndSetCookie = async(req,userId,isAdmin)=>{
    req.session.userId = userId;
    req.session.isAdmin = isAdmin;
=======
const jwt = require('jsonwebtoken')
 const generateTokenAndSetCookie = async(res,userId,isAdmin)=>{
  
  const token = jwt.sign({userId,isAdmin}, process.env.JWT_SECRET, {expiresIn: '1d'})
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  })
  return token
>>>>>>> 070e2d193aa2642aee14654fb232b1cbb1f753d0
}

module.exports = generateTokenAndSetCookie;
