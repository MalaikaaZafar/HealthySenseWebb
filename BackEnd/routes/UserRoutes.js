const express = require('express');
const userController = require('../controllers/UserController');
const auth = require('../auth/UserAuth');
const reportController = require('../controllers/ReportController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/messages', userController.getMessages);
router.post('/messages', userController.sendMessage);

router.get('/report/:id', reportController.getReport);

module.exports = router;