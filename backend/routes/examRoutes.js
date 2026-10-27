const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

// GET /api/exams/categories
router.get('/categories', examController.getCategories);

// GET /api/exams
router.get('/', examController.getExams);

// GET /api/exams/analytics/weak-topics
router.get('/analytics/weak-topics', examController.getWeakTopics);

// GET /api/exams/planner
router.get('/planner', examController.getStudyPlanner);

// POST /api/exams/planner
router.post('/planner', examController.addStudyPlannerItem);

// GET /api/exams/:id
router.get('/:id', examController.getExamById);

// POST /api/exams/:id/submit
router.post('/:id/submit', examController.submitExam);

module.exports = router;
