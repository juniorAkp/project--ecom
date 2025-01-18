 const generateTokenAndSetCookie = async(req,userId,isAdmin)=>{
    req.session.userId = userId;
    req.session.isAdmin = isAdmin;
}
module.exports = generateTokenAndSetCookie
