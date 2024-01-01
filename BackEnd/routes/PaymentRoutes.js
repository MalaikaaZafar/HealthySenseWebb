const express = require('express');
const paymentController = require('../controllers/PaymentController');
const router = express.Router();

router.get('/create-payment-intent/:id', paymentController.getClientSecret);
router.post('/create-payment/:id', paymentController.createPayment);

module.exports = router;