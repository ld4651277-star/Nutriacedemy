const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// GET /api/careers/pathways
router.get('/pathways', careerController.getCareerPathways);

// GET /api/careers/pathways/:id
router.get('/pathways/:id', careerController.getPathwayById);

module.exports = router;
