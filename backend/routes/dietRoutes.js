const express = require('express');
const router = express.Router();
const dietController = require('../controllers/dietController');

// POST /api/diet-planner/generate
router.post('/generate', dietController.generateDietPlan);

// POST /api/diet-planner/save
router.post('/save', dietController.saveDietPlan);

// GET /api/diet-planner/saved
router.get('/saved', dietController.getSavedPlans);

// DELETE /api/diet-planner/saved/:id
router.delete('/saved/:id', dietController.deleteSavedPlan);

module.exports = router;
