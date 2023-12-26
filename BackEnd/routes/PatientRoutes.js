const express = require('express');
const patientController = require('../controllers/PatientController');
const auth = require('../auth/UserAuth');

const router = express.Router();

router.get('/favorites', auth, patientController.getFavorites);
router.post('/favorites', auth, patientController.addFavorite);

module.exports = router;