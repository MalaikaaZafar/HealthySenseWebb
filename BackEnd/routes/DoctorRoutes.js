const express = require('express');
const auth = require('../auth/UserAuth');
const doctorController = require('../controllers/DoctorController');

const router = express.Router();

router.post('/register', auth, doctorController.registerDoctor);
router.get("/consultations", doctorController.consultations);
router.get("/consultations/:id", doctorController.getConsultationById);
router.post("/consultations/reschedule", doctorController.rescheduleAppt);
router.put("/consultations/cancel", doctorController.cancelAppt);
router.put("/addSlots", doctorController.addSlots)
router.get("/specialties", doctorController.getSpecialties);
router.get("/search", doctorController.searchDoctors);
router.get("/appointments/:id", doctorController.getAppintmentDetails);
module.exports = router;