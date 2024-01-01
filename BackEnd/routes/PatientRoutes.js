const express = require('express');
const patientController = require('../controllers/PatientController');
const auth = require('../middleware/auth/UserAuth');
const patientAuth = require('../middleware/auth/PatientAuth');
const router = express.Router();

router.get('/users/:id', patientController.getPatient);
router.get('/favorites', auth, patientController.getFavorites);
router.post('/favorites/:id', auth, patientAuth, patientController.addFavorite);
router.delete('/favorites/:id', auth, patientAuth, patientController.removeFavorite);
router.get("/consultations",auth, patientAuth, patientController.consultations);
router.get("/consultations/:id", patientController.getConsultationById);
router.post("/consultations/reschedule", patientController.rescheduleAppt);
router.put("/consultations/cancel", patientController.cancelAppt);
router.get("/account/:id", patientController.getAccountDetails);
router.post("/update/:id", patientController.updateAccountDetails);
router.get("/diagnosis/:id", patientController.getPatientDiagnosis);

router.get("/doctors", patientController.getDoctors);
router.get("/doctors/:id", patientController.getDoctorById);
router.post("/consultations/bookAppt",auth, patientAuth, patientController.bookAppointment);
router.post("/doctor-compact/:id", auth, patientController.getCompactDoctor);
router.post("/review/:id", auth, patientController.addReview);
module.exports = router;