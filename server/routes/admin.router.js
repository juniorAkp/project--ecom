const express = require('express');
const router = express.Router();

const { countUsers, getUsers } = require('../admin/user.controller');

const { createProducts, updateProduct, deleteProduct, getProductCount, upload, getProduct, } = require('../admin/product.controller');

const { updateCategory, deleteCategory, addCategory, getCategories, countCategories, getCategory } = require('../admin/admin.category.controller');

const { editOrder, getOrders, getOrdersCount, getOrder, deleteOrder, getTotalSales } = require('../admin/order.controller');
const { createLocation, updateLocation, deleteLocation } = require('../admin/location.controller');


//location routes
router.post('/create-location',createLocation);
router.put('/edit-locations/:id',updateLocation);
router.delete('/delete-location/:id',deleteLocation)

//user routes
router.get('/count-users',countUsers)
router.get('/user',getUsers)

//product routes
router.post('/products' ,upload.single('image'), createProducts)
router.put('/product-update/:id',upload.single('image'),updateProduct)
router.delete('/delete-product/:id',deleteProduct)
router.get('/products/:id',getProduct)
router.get('/count-products',getProductCount)

//category routes
router.put('/category/:id',updateCategory)
router.delete('/category/:id',deleteCategory)
router.post('/add-category',addCategory)
router.get('/category/:id',getCategory)
router.get('/category',getCategories)
router.get('/category/count',countCategories)

//order routes
router.put('/edit-status/:id',editOrder)
router.get('/get-all-orders',getOrders)
router.get('/orders/count',getOrdersCount)
router.get('/get-order/:id',getOrder)
router.delete('/orders/:id',deleteOrder);
router.get('/total-sales',getTotalSales)

module.exports = router;
