const Product = require('../model/product')
const Category = require('../model/category')
const mongoose = require("mongoose");

const getProduct = async(req,res)=>{
  const {id} =req.params;
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({error: "invalid ID",success: false})

    const product = await Product.findById(id);
    if(!product) return res.status(400).json({error: "invalid ID",success: false})
    return res.status(200).json({product: product, success: true})
}

const products = async(req,res)=>{
  try {
    const products = await Product.find();
    if(!products) return res.status(200).json({message:"no products",success: true,data:[]})
    return res.status(200).json({products: products,success: true})
}catch (e) {
    return res.status(500).json({message: e.message, success: false})
}
}

const featuredProducts = async (req,res)=>{
  try {
    const products = await Product.find({isFeatured: true});
    if(!products) return res.status(200).json({message:"no products", success: true, data:[]});
    return res.status(200).json({products: products,success: true})
  }catch (e){
    return res.status(500).json({message: "error", success: false})
  }
}
const getProductsByCategoriesFilter = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category || category.trim() === "") {
      return res.status(400).json({ error: "Category query is required", success: false });
    }
    // Fetch products based on the filter
    const categorizedProducts = await Product.find({category: category}).populate('category');

    // Check if products are found
    if (categorizedProducts.length === 0) {
      return res.status(200).json({
        message: "No products found for the specified category",
        success: true,
        categorizedProducts: [],
      });
    }

    // Return products if found
    return res.status(200).json({ success: true, categorizedProducts });
  } catch (error) {
    console.error("Error fetching categorized products:", error);
    return res.status(500).json({ error: "An internal server error occurred", success: false });
  }
};

module.exports = {
  products,
  featuredProducts,
  getProduct,
  getProductsByCategoriesFilter,
}