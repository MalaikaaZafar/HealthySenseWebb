const express = require('express');
const patientController = require('../controllers/PatientController');
const auth = require('../auth/UserAuth');
const router = express.Router();


router.get('/favorites', auth, patientController.getFavorites);
router.post('/favorites', auth, patientController.addFavorite);
router.get("/consultations", patientController.consultations);
router.get("/consultations/:id", patientController.getConsultationById);
router.post("/consultations/reschedule", patientController.rescheduleAppt);
router.put("/consultations/cancel", patientController.cancelAppt);
router.get("/doctors", patientController.getDoctors);
router.get("/doctors/:id", patientController.getDoctorById);
router.post("/consultations/bookAppt", patientController.bookAppointment);
module.exports = router;