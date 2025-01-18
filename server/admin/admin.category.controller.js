const Category = require('../model/category');
const mongoose = require("mongoose");

const addCategory = async(req,res)=>{
  const {name} = req.body;
  try {
      if(!name) return res.status(400).json({error
              : "all field required",success: false});

      const category = new Category({
          name
      })
      await category.save();
      return res.status(200).json({newCategory: category,success: true})
  }catch (e) {
      return res.status(500).json({message:e.message,success:false})
  }
}

const getCategory = async(req,res)=>{
    const {id} = req.params
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({error:"invalid category",success: false});
        }
        const category = await Category.findById(id);
        if(!category){
            return res.status(200).json({message: "no category found",success: true, data:[]})
        }
        return res.status(200).json({message:"categories found", category, success: true})
    } catch (error) {
        
    }
}

const updateCategory = async(req,res)=>{
  const {id} = req.params;
  const {name,color} = req.body;
  try {
      if(!mongoose.isValidObjectId(id)){
          return res.status(400).json({error:"invalid category",success: false});
      }
      const updateCategory = await Category.findByIdAndUpdate(id,{
          name: name,
          color: color
      },{new: true})
      return res.status(200).json({category: updateCategory, success: true})
  }catch (e){
      return res.status(500).json({error: e.message,success: false})
  }
}

const deleteCategory = async(req,res)=>{
  const {id} = req.params;
  try {
      if(!id){
          return res.status(400).json({error:"invalid category",success: false});
      }
      const deletedCategory = await Category.findByIdAndDelete(id);
      return res.status(200).json({deletedCategory: deletedCategory, success: true})
  }catch (e){
      return res.status(500).json({error: e.message,success: false})
  }
}

const getCategories = async(req,res)=>{
  const categoryList = await Category.find();
  try {
      if(!categoryList){
          return res.status(400).json({error: "no categories found", success: false})
      }
      return res.status(200).json({categories: categoryList})
  }catch (e){
      return res.status(500).json({error: e.message,success: false})
  }
}

const countCategories = async(req,res)=>{
  try {
    const countedCategory = await Category.countDocuments();
    if(!countedCategory) return res.status(400).json({message: "cannot count categories",success: false})
    return res.status(200).json({countedDocuments: countedCategory,success: true})
}catch (e){
    return  res.status(500).json({message: e.message, success:false})
}
}

module.exports = {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  countCategories
}