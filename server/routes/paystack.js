const express = require('express');
const {paystack, verifyPayment} = require('../controllers/paystack.controller');
const router = express.Router();

router.get('/paystack',paystack)
router.get('/paystack/verify',verifyPayment)

module.exports = router;