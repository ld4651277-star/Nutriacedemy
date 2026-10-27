const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

// GET /api/library
router.get('/', libraryController.getBooks);

// GET /api/library/:id
router.get('/:id', libraryController.getBookById);

// POST /api/library/:id/bookmark
router.post('/:id/bookmark', libraryController.toggleBookmark);

module.exports = router;
