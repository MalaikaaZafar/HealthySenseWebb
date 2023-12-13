const express = require('express');
const { registerDoctor } = require('../controllers/DoctorController');
const { consultations } = require('../controllers/DoctorController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/register', auth, registerDoctor);
router.get("/consultations", auth, consultations);
router.get("/consultations/:id",auth, consultations);

module.exports = router;