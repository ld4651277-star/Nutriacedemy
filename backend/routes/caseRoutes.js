const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

// GET /api/cases
router.get('/', caseController.getCases);

// GET /api/cases/:id
router.get('/:id', caseController.getCaseById);

// POST /api/cases/:id/assessment
router.post('/:id/assessment', caseController.submitAssessment);

module.exports = router;
