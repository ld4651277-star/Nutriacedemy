/**
 * Contact & Inquiries Controller
 * Handles student/user inquiries, contact form submissions, and FAQs
 */

const { readData, writeData } = require('../utils/db');

exports.submitContactMessage = (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required: name, email, message."
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address."
      });
    }

    const messages = readData('messages.json') || [];

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: "pending"
    };

    messages.unshift(newMessage);
    writeData('messages.json', messages);

    return res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. A NutriAcademy advisor will respond to your email within 24 hours.",
      data: {
        id: newMessage.id,
        createdAt: newMessage.createdAt
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMessages = (req, res) => {
  try {
    const messages = readData('messages.json') || [];
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFAQs = (req, res) => {
  try {
    const faqs = readData('faq.json') || [];
    return res.json({ success: true, data: faqs });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
