const express = require('express');
const router = express.Router();

const { countUsers, getUsers } = require('../admin/user.controller');

const { createProducts, updateProduct, deleteProduct, getProductCount, uploadProductImages, uploadOptions } = require('../admin/product.controller');

const { updateCategory, deleteCategory, addCategory, getCategories, countCategories } = require('../admin/admin.category.controller');

const { editOrder, getOrders, getOrdersCount, getOrder, deleteOrder, getTotalSales } = require('../admin/order.controller');

const adminOnly = require('../middlewares/adminOnly');
const verify = require('../middlewares/verify');
//user routes
router.get('/user/count',countUsers)
router.get('/user',getUsers)

//product routes
router.post('/products', uploadOptions.single('image'),createProducts)
router.put('/products/:id',uploadOptions.single('image'),updateProduct)
router.delete('/products',deleteProduct)
router.get('/products/count',getProductCount)
router.put('/products/images/:id',uploadOptions.array('images',10),uploadProductImages)

//category routes
router.put('/category/:id',updateCategory)
router.delete('/category/:id',deleteCategory)
router.post('/category',verify,adminOnly,addCategory)
router.get('/category',verify,adminOnly,getCategories)
router.get('/category/count',countCategories)

//order routes
router.put('/order/edit-status/:id',editOrder)
router.get('/orders',getOrders)
router.get('/orders/count',getOrdersCount)
router.get('/orders/:id',getOrder)
router.delete('/orders/:id',deleteOrder);
router.get('/orders/total-sales',getTotalSales)

module.exports = router;
