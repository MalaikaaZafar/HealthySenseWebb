const express = require('express');
const auth = require('../middleware/auth/UserAuth');
const adminController = require('../controllers/AdminController');
const adminAuth = require('../middleware/auth/AdminAuth');

const router = express.Router();

router.get("/doctorList", adminController.getAllDoctors);
router.get("/patientList", adminController.getAllPatients);
router.get("/getDoctorsDetails", adminController.getDoctorsDetails);
router.get("/doctor/search", adminController.searchDoctors);
router.get("/patient/search", adminController.searchPatients);
router.get("/activity", adminController.getActivity);
router.put("/:id", auth, adminAuth, adminController.banUser);
module.exports = router;