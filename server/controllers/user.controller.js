const User = require('../model/user')
const bcrypt = require('bcrypt');

const mongoose = require("mongoose");


const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');

const register = async(req,res)=>{
  const {name,email,password} = req.body;
    try {
        const userExists = await User.findOne({email})
        if(userExists){
          return res.status(400).json({message:"User already exists", success:false})
        }
        if(!name || !email || !password){
          return res.status(400).json({message:"All fields are required",success:false})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          name,
          email,
          password:hashedPassword
        });
        return res.status(201).json({message:"User created successfully", success:true, user:{
          ...user._doc,
          password:undefined
        }})
      } catch (error) {
        return res.status(500).json({message:error.message, success:false})
      }
}

const login = async(req,res)=>{
  const {email, password} = req.body
  try {
    if(!email || !password){
      return res.status(400).json({message:"All fields are required", success:false})
    }
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"Invalid email or password", success:false})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.json({error:"Invalid email or password", success:false})
    }
    user.lastLogin = new Date(Date.now());
    const token = await generateTokenAndSetCookie(res, user._id,user.isAdmin)
    return res.status(200).json({message:"User logged in successfully", success:true, user:{
      ...user._doc,
      password:undefined
    },token})

  } catch (error) {
    return res.status(500).json({message:error.message, success:false, })
  }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token',{
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        }
          );
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Logout failed' });
    }
};

module.exports = logout;

const checkAuth = async(req,res)=>{
  try {
    const user = await User.findById(req.userId)
    if(!user){
      return res.status(400).json({message:"User not found", success:false})
    }
    return res.status(200).json({message:"User found", success:true, user:{
      ...user._doc,
      password:undefined
    }})
  } catch (error) {
    return res.status(500).json({message:error.message, success:false})
  }
}

const updateUser = async(req,res)=>{
  const {id} = req.params;
  const {name,email,phone,street,zip,city,country} = req.body;
  if(!id) return res.status(400).json({error: "invalid user id", success: false});
  const updatedDetails = await User.findByIdAndUpdate(id,{
      name,
      email,
      phone,
      street,
      zip,
      city,
      country
  })
  if(!updatedDetails) return res.status(400).json({error: "cannot update user details", success: false});
  return res.status(200).json({updatedDetails: updatedDetails, success: true})
}

const getUser = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.isValidObjectId(id)) return res.status(400).json({error:"invalid id",success: true})

  const user = await User.findById(id).select('-password');

  if(!user) return res.status(400).json({error:"invalid id",success: true})

  return res.status(200).json({user: user, success: true})
}

module.exports={
  register,
  login,
  logout,
  checkAuth,
  updateUser,
  getUser
}
