const express = require('express');
const paymentController = require('../controllers/PaymentController');
const auth = require('../middleware/auth/UserAuth');
const router = express.Router();

router.get('/create-payment-intent/:id', paymentController.getClientSecret);
router.post('/create-payment/:id', paymentController.createPayment);

module.exports = router;