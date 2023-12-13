const express = require('express');
const { registerDoctor } = require('../controllers/DoctorController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/register', auth, registerDoctor);

module.exports = router;