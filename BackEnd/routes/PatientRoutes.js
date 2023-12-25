const express = require('express');
const auth = require('../auth/UserAuth');
const patientController = require('../controllers/PatientController');

const router = express.Router();

router.get("/consultations", patientController.consultations);
router.get("/consultations/:id", patientController.getConsultationById);
router.post("/consultations/reschedule", patientController.rescheduleAppt);
router.put("/consultations/cancel", patientController.cancelAppt);
// router.put("/addSlots", doctorController.addSlots);

module.exports = router;