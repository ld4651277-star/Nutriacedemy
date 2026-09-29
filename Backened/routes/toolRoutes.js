const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

// POST /api/tools/bmi
router.post('/bmi', toolController.calculateBMI);

// POST /api/tools/bmr
router.post('/bmr', toolController.calculateBMR);

// POST /api/tools/tdee
router.post('/tdee', toolController.calculateTDEE);

// POST /api/tools/macros
router.post('/macros', toolController.calculateMacros);

// POST /api/tools/water
router.post('/water', toolController.calculateWater);

module.exports = router;
