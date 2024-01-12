const express = require('express');
const router = express.Router();

const medicationController = require('../controllers/medicationController')

router.post("", medicationController.createMedicationData)

module.exports = router