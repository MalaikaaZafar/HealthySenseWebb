const express = require('express');
const auth = require('../auth/UserAuth');
const adminController = require('../controllers/AdminController');

const router = express.Router();

router.get("/doctorList", adminController.getAllDoctors);
router.get("/patientList", adminController.getAllPatients);
router.get("/getDoctorsDetails", adminController.getDoctorsDetails);
module.exports = router;