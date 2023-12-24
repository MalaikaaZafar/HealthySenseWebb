const express = require('express');
const { getAllDoctors, getAllPatients, getDoctorsDetails } = require('../controllers/AdminControllers');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.get("/doctorList", getAllDoctors);
router.get("/patientList", getAllPatients);
router.get("/getDoctorsDetails",  getDoctorsDetails);
module.exports = router;