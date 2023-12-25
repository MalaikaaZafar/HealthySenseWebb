const express = require('express');
const { registerDoctor, rescheduleAppt, cancelAppt } = require('../controllers/DoctorController');
const { consultations , getConsultationById, addSlots} = require('../controllers/DoctorController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.post('/register', auth, registerDoctor);
router.get("/consultations", consultations);
router.get("/consultations/:id", getConsultationById);
router.post("/consultations/reschedule", rescheduleAppt);
router.put("/consultations/cancel", cancelAppt);
router.put("/addSlots", addSlots)
module.exports = router;