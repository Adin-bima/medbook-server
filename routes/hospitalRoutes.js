const express = require('express');
const hospitalAccessController = require('../controllers/hospitalAccessController');
const hospitalController = require('../controllers/hospitalController')
const router = express.Router();

router.get("/access", hospitalAccessController.generateJwt)
router.post('/', hospitalController.registerHospital)

module.exports = router;