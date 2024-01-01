const express = require('express');
const userController = require('../controllers/UserController');
const auth = require('../middleware/auth/UserAuth');
const reportController = require('../controllers/ReportController');

const router = express.Router();

router.get('/verifyuser', auth, userController.getUserType);
router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/messages/:id', auth, userController.getMessages);
router.post('/messages', auth, userController.sendMessage);

router.get('/report/:id', reportController.getReport);
router.get('/report/appointment/:id', reportController.getSpecificReport);

router.get('/doctor-detail/:id', auth, userController.getDoctorDetails);

module.exports = router;