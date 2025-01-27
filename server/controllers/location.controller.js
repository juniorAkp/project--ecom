const { default: mongoose } = require('mongoose');
const Location = require('../model/Locations');

const getLocations = async(req,res)=>{
  try {
    const locations = await Location.find().select('name')
    if(!locations){
      return res.status(200).json({message: "no location found", success: true, data:[]})
    }
    return res.status(200).json({message: "locations found", locations, success: true })
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
    const location = await Location.findById(id).select('name');
    if(!location){
      return res.status(200).json({message: "no location found", success: true, data:[]})
    }
    return res.status(200).json({message: "location found", success: true, location})
  } catch (error) {
    return res.status(500).json({message: error.message, success: false})
  }
}

module.exports = {
  getLocations,
  getLocation
}