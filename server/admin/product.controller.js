const Product = require('../model/product');
const Category = require('../model/category');
const multer = require('multer')
const mongoose = require("mongoose");
const { isValidObjectId } = require("mongoose");
const cloudinary = require('../utils/cloudinary');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads'); // Temporary upload folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  

  const getProduct = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({message: "invalid id",success:false})
    const product = await Product.findById(id);
    if(!product) return res.status(200).json({message: "no product found", success: true, data:[]})

    return res.status(200).json({message: "product found", product,success: true})
  }
  const createProducts = async (req, res) => {
    const { name, description, richDescription, price, category, isFeatured, countInStock, rating, reviews } = req.body;
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded", success: false });
      }
  
      // Use req.file.path to access the uploaded file path
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
  
      if (!mongoose.isValidObjectId(category)) {
        return res.status(400).json({ error: "Invalid category ID", success: false });
      }
  
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ error: "Category not found", success: false });
      }
  
      const newProduct = new Product({
        name,
        description,
        richDescription,
        image: result.secure_url,
        price,
        category,
        isFeatured,
        countInStock,
        rating,
        reviews,
      });
  
      const savedProduct = await newProduct.save();
  
      return res.status(201).json({ message: "Product created successfully", product: savedProduct, success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message, success: false });
    }
  };
  
  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, richDescription, price, category, isFeatured, countInStock, rating, reviews } = req.body;
  
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid product ID", success: false });
    }
  
    try {
      const updateData = { name, description, richDescription, price, category, isFeatured, countInStock, rating, reviews };
  
      // If a new image file is uploaded
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
        });
        updateData.image = result.secure_url;
      }
  
      // Validate category ID
      if (category) {
        if (!mongoose.isValidObjectId(category)) {
          return res.status(400).json({ error: "Invalid category ID", success: false });
        }
  
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
          return res.status(404).json({ error: "Category not found", success: false });
        }
      }
  
      // Update product in the database
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found", success: false });
      }
  
      return res.status(200).json({ message: "Product updated successfully", product: updatedProduct, success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message, success: false });
    }
  };
  
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid product ID", success: false });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found", success: false });
    }

    const publicId = product.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

const getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    return res.status(200).json({ count: productCount, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
};

module.exports = {
    upload,
  createProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
};
