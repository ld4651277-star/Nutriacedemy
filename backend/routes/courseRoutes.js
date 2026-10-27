const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET /api/courses
router.get('/', courseController.getCourses);

// GET /api/courses/:id
router.get('/:id', courseController.getCourseById);

// PUT /api/courses/:id/progress
router.put('/:id/progress', courseController.updateCourseProgress);

module.exports = router;
