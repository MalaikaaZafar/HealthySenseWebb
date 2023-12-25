const express = require('express');
const { registerDoctor } = require('../controllers/DoctorController');
const auth = require('../auth/UserAuth');
const doctorController = require('../controllers/DoctorController');

const router = express.Router();

router.post('/register', auth, doctorController.registerDoctor);
router.get('/all', doctorController.getAllDoctors);
router.get("/consultations", doctorController.consultations);
router.get("/consultationsByDateTime", doctorController.getConsultationById);
router.put("/updateConsultation", doctorController.updateConsultation);
router.get('/specialties', doctorController.getSpecialties);

module.exports = router;