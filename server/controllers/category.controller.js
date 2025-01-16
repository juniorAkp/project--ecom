const mongoose = require("mongoose");
const Category = require('../model/category');

const category = async(req,res)=>{
  const {id} = req.params;
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({error:"invalid category",success: false})
        }
        const category = await Category.findById(id);
        if(!category) return res.status(400).json({error:"invalid category id",success: false})

        return res.status(200).json({category: category, success: true})
    }catch (e){
        return res.status(500).json({error: e.message,success: false})
    }
}

const getCategory = async(req,res)=>{
    try{
        const category = await Category.find();
        if(!category) return res.status(200).json({message: "no category found", success: true, data:[]})
        return res.status(200).json({category, success: true})
    }catch (e) {
        return res.status(500).json({message: e.message, success: false})
    }

}
module.exports = {
    category,
    getCategory
}