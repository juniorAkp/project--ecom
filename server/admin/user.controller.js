const User = require('../model/user')

const countUsers = async(req,res)=>{
  try {
    const users =await User.countDocuments();
    if(!users) return res.status(400).json({message: "cannot count documents",success: false})
    return res.status(200).json({ users,success: true})
}catch (e) {
    return res.status(500).json({message:e.message, success: false})
}
}

const getUsers = async(req,res)=>{
  const users = await User.find().select('name email');
  if(!users) return res.status(400).json({error: "cannot get users", success: false})
  return res.status(200).json({users: users, success: true})
}

module.exports = {
  countUsers,
  getUsers
}