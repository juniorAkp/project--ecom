const { default: mongoose } = require('mongoose');
const Location = require('../model/Locations');

const createLocation = async(req,res)=>{
  const {name,city,country} = req.body;
  try {
    if(!name || !city || !country){
      return res.status(400).json({message:"all fields are required", success: false})
    }
    const location = new Location({
      name,
      city,
      country
    });
    await location.save();
    return res.status(201).json({message: "location created", location, success: true})
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const getLocation = async(req,res)=>{
  const {id}= req.params;
  try {
    if(!mongoose.isValidObjectId(id) || ! id){
      return res.status(400).json({message: "invalid or no id provided", success: false})
    }
    const location = await Location.findById(id);
    if(!location){
      return res.status(200).json({message: "no location found", success: true, data:[]})
    }
    return res.status(200).json({message: "location found", success: true, location})
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}
const updateLocation = async(req,res)=>{
  const {name,city,country} = req.body;
  const {id} = req.params;
  try {
    if(!mongoose.isValidObjectId(id) || !id){
      return res.status(400).json({message: "invalid id", success: false})
    }
    const location = await Location.findByIdAndUpdate(id,{
      name,
      city,
      country
    },{new: true})
    return res.status(200).json({message:"updated successfully", location, success: true})
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

const deleteLocation = async(req,res)=>{
  const {id} = req.params;
  try {
      if(!id){
          return res.status(400).json({error:"invalid category",success: false});
      }
      const deletedLocation = await Location.findByIdAndDelete(id);
      return res.status(200).json({deletedLocation, success: true})
  }catch (e){
      return res.status(500).json({error: e.message,success: false})
  }
}
module.exports = {
  createLocation,
  updateLocation,
  deleteLocation,
  getLocation
}