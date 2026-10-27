const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact
router.post('/', contactController.submitContactMessage);

// GET /api/contact/messages
router.get('/messages', contactController.getMessages);

// GET /api/contact/faq
router.get('/faq', contactController.getFAQs);

module.exports = router;
