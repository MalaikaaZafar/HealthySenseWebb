const express = require('express');
const { login, signup } = require('../controllers/UserController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;