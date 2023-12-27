const express = require('express');
const userController = require('../controllers/UserController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/messages', userController.getMessages);
router.post('/messages', userController.sendMessage);
module.exports = router;