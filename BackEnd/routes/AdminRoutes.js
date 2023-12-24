const express = require('express');
const { getAllDoctors, getAllPatients } = require('../controllers/AdminControllers');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.get("/doctorList", getAllDoctors);
router.get("/patientList", getAllPatients)
module.exports = router;