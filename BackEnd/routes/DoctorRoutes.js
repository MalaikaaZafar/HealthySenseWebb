const express = require('express');
const { registerDoctor } = require('../controllers/DoctorController');
const { consultations , getConsultationById, updateConsultation} = require('../controllers/DoctorController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/register', auth, registerDoctor);
router.get("/consultations", consultations);
router.get("/consultationsByDateTime", getConsultationById);
router.put("/updateConsultation", updateConsultation);
module.exports = router;