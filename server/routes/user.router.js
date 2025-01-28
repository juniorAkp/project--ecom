const express = require('express');
const router = express.Router()

const { getProduct, products, getProductsByCategoriesFilter, featuredProducts} = require('../controllers/product.controller');

const {register,login,checkAuth,updateUser,getUser, logout} = require('../controllers/user.controller')


const { getOrder, addOrder, deleteOrder, updateToPaid, clearCart } = require('../controllers/order.controller');

const { addToCart, updateCart, deleteCart, getUserCart } = require('../controllers/cart.controller');


const verify = require('../middlewares/verify')
const {category,getCategory} = require("../controllers/category.controller");
const { getLocations, getLocation } = require('../controllers/location.controller');


//locations routes
router.get('/get-locations',getLocations)
router.get('/get-location/:id',getLocation)

// product routes
router.get('/products/:id',getProduct)
router.get('/featured',featuredProducts);
router.get('/products', products)
router.get('/filter', getProductsByCategoriesFilter);

//user routes
router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/user/:id',verify,getUser)
router.get('/check-auth',verify,checkAuth)
router.put('/user/update-details/:id',verify,updateUser)

//order routes
router.get('/orders/user/:userId',verify,getOrder)
router.put('/update-orders/:orderId/pay',updateToPaid)
router.post('/add-order',verify, addOrder);
router.delete('/orders/:id',verify, deleteOrder);

//cart routes
router.post('/add-to-cart/:userId',verify,addToCart)
router.put('/cart/:userId',verify,updateCart);
router.delete('/delete-cart/:userId/:productId',verify,deleteCart);
router.delete('/clear-cart/:id',verify, clearCart)
router.get('/cart/:userId',verify,getUserCart)

//category routes
router.get('/category/:id',category)
router.get('/categories',getCategory)

module.exports = router