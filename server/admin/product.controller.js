const Product = require('../model/product')
const Category = require('../model/category')
const mongoose = require("mongoose");
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const {isValidObjectId} = require("mongoose");
const multer = require('multer');

const FILE_NAME_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_NAME_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_NAME_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

const createProducts = async(req,res)=>{
  const {name,description,richDescription,price,category,isFeatured,countInStock,rating,reviews}  = req.body;
    const file = req.file;
    if(!file) return res.status(400).json({error: "no image provided", success: false})

    const filename = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
    try {
        // Check if the provided category ID is valid
        if (!mongoose.isValidObjectId(category)) {
            return res.status(400).json({ error: "Invalid category ID", success: false });
        }

        // Check if the category exists in the database
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category not found", success: false });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            richDescription,
            image:`${basePath}${filename}`,
            price,
            category,
            isFeatured,
            countInStock,
            rating,
            reviews
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        return res.status(201).json({ message: "Product created successfully", product: savedProduct, success: true });

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false });
    }
}

const updateProduct = async(req,res)=>{
  const {id} = req.params;
  const {name,description,richDescription,price,category,isFeatured,countInStock,rating,reviews}  = req.body;
  try {
      if(!mongoose.isValidObjectId(category)) {
          return res.status(400).json({ error: "Invalid category ID", success: false });
      }
      const file = req.file;

      const filename = file.fileName
      const basePath = `${req.protocol}://${req.get('host')}/uploads/`;
      // Check if the category exists in the database
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
          return res.status(404).json({ error: "Category not found", success: false });
      }
      const updatedProducts = await Product.findByIdAndUpdate(id,{
          name,
          image:`${basePath}${filename}`,
          description,
          richDescription,
          price,
          category,
          isFeatured,
          countInStock,
          rating,
          reviews
      })
      return res.status(200).json({updatedProducts: updatedProducts, success: true})

  }catch (e){
      return res.status(500).json({ error: e.message, success: false });
  }
}

const deleteProduct = async(req,res)=>{
  try {
    if(!isValidObjectId(req.body.id)){return res.status(400).json({error: "invalid ID",success: false})}
    
    //delete image too
    const image = await Product.findOne({_id: req.body.id})
    const imageToDelete = image.image.split('/uploads/')[1]
    await unlinkAsync(`public/uploads/${imageToDelete}`)
    await Product.findByIdAndDelete(req.body.id);
    //fs.unlinkSync(imageToDelete)
    return res.json({message: "deleted successfully",success: true})
}catch (e){
    return res.status(500).json({ error: e.message, success: false });
}
}

const getProductCount = async(req,res)=>{
  try {
    const productCount = await Product.countDocuments();
    if(!productCount) return res.status(400).json({error:"cannot get product count", success: false})
    return res.status(200).json({count: productCount,success: true})
}catch (e) {
    return res.status(500).json({error: e.message,success: false})
}
}

const uploadProductImages = async(req,res)=>{
  try {
    const { id } = req.params;
    if(!mongoose.isValidObjectId(id)) return res.status(400).json({error: "invalid ID",success: false});
    const files = req.files;
    const filePath = [];
    const basePath = `${req.protocol}://${req.get('host')}/uploads/`;

    if(files){
        files.map(file => {
            filePath.push(`${basePath}${file.filename}`)
        })
    }
    const productImages = await Product.findByIdAndUpdate(id,{
        images: filePath
    },{new: true})
    if(!productImages) return res.status(400).json({error: "invalid ID",success: false})
    return res.status(200).json({productImages: productImages,success: true})

}catch (e) {
    return res.status(500).json({error: e.message,success: false})
}
}

module.exports = {
  uploadOptions,
  createProducts,
  updateProduct,
  deleteProduct,
  getProductCount,
  uploadProductImages
}