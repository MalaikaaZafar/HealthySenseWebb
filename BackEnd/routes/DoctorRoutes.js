const express = require('express');
const auth = require('../auth/UserAuth');
const doctorController = require('../controllers/DoctorController');

const router = express.Router();

router.post('/register', auth, doctorController.registerDoctor);

router.get("/consultations", doctorController.consultations);
router.get("/consultations/:id", doctorController.getConsultationById);
router.post("/consultations/reschedule", doctorController.rescheduleAppt);
router.put("/consultations/cancel", doctorController.cancelAppt);

router.put("/addSlots", doctorController.addSlots);
router.get("/slots", doctorController.getSlots);
router.put("/deleteSlot", doctorController.deleteSlots);

router.get("/specialties", doctorController.getSpecialties);
router.get("/search", doctorController.searchDoctors);
router.get("/appointments/:id", doctorController.getAppintmentDetails);

router.post("/appointments/:id/diagnosis", doctorController.createDiagnosis);
router.get("/account/:id", doctorController.getAccountDetails);
router.put("/account/:id", doctorController.updateAccount);
router.get("/patient/history/:id", doctorController.getPatientHistory);

router.post("/complaint/:id",auth, doctorController.addComplaint); //add doctor auth

module.exports = router;