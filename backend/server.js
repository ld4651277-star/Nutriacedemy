/**
 * NutriAcademy Platform - Node.js Express Backend Server
 * Professional Full-Stack REST API and Static Page Server
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static API documentation & public assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Serve Frontend Static Assets
app.use('/assets', express.static(path.join(FRONTEND_DIR, 'assets')));
app.use(express.static(FRONTEND_DIR));
// Backwards-compatibility alias
app.use('/frontend-assets', express.static(FRONTEND_DIR));

// Import modular API routes
const toolRoutes = require('./routes/toolRoutes');
const dietRoutes = require('./routes/dietRoutes');
const examRoutes = require('./routes/examRoutes');
const courseRoutes = require('./routes/courseRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const caseRoutes = require('./routes/caseRoutes');
const careerRoutes = require('./routes/careerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// API Health Check & System Status
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Root Directory & Documentation Index
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    platform: 'NutriAcademy Digital Education Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      tools: {
        bmi: 'POST /api/tools/bmi',
        bmr: 'POST /api/tools/bmr',
        tdee: 'POST /api/tools/tdee',
        macros: 'POST /api/tools/macros',
        water: 'POST /api/tools/water'
      },
      dietPlanner: {
        generate: 'POST /api/diet-planner/generate',
        save: 'POST /api/diet-planner/save',
        savedList: 'GET /api/diet-planner/saved',
        delete: 'DELETE /api/diet-planner/saved/:id'
      },
      exams: {
        categories: 'GET /api/exams/categories',
        list: 'GET /api/exams',
        getById: 'GET /api/exams/:id',
        submit: 'POST /api/exams/:id/submit',
        weakTopics: 'GET /api/exams/analytics/weak-topics',
        planner: 'GET /api/exams/planner',
        addPlanner: 'POST /api/exams/planner'
      },
      courses: {
        list: 'GET /api/courses',
        getById: 'GET /api/courses/:id',
        updateProgress: 'PUT /api/courses/:id/progress'
      },
      library: {
        list: 'GET /api/library',
        getById: 'GET /api/library/:id',
        bookmark: 'POST /api/library/:id/bookmark'
      },
      cases: {
        list: 'GET /api/cases',
        getById: 'GET /api/cases/:id',
        submitAssessment: 'POST /api/cases/:id/assessment'
      },
      careers: {
        pathways: 'GET /api/careers/pathways',
        getById: 'GET /api/careers/pathways/:id'
      },
      contact: {
        submit: 'POST /api/contact',
        messages: 'GET /api/contact/messages',
        faq: 'GET /api/contact/faq'
      },
      dashboard: {
        summary: 'GET /api/dashboard',
        updateProfile: 'PUT /api/dashboard/profile'
      }
    }
  });
});

// Mount API Routes
app.use('/api/tools', toolRoutes);
app.use('/api/diet-planner', dietRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Frontend Page Routing Helper
const sendPage = (pageFile) => (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, pageFile));
};

// Web Application Page Routes
app.get(['/', '/home', '/index.html'], sendPage('index.html'));
app.get(['/about', '/contact', '/about.html'], sendPage('about.html'));
app.get(['/learn', '/learn.html'], sendPage('learn.html'));
app.get(['/exams', '/exams.html'], sendPage('exams.html'));
app.get(['/tools', '/tools.html'], sendPage('tools.html'));
app.get(['/diet-planner', '/diet-planner.html'], sendPage('diet-planner.html'));
app.get(['/library', '/library.html'], sendPage('library.html'));
app.get(['/case-studies', '/case-studies.html'], sendPage('case-studies.html'));
app.get(['/careers', '/careers.html'], sendPage('careers.html'));
app.get(['/dashboard', '/dashboard.html'], sendPage('dashboard.html'));

// Design system documentation route
app.get('/vitality', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'assets', 'docs', 'DESIGN.md'));
});

// Interactive API Documentation Dashboard
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 Handler for Unknown API Endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API Endpoint Not Found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` NutriAcademy Node.js Backend Server is running!`);
  console.log(` Web App URL:      http://localhost:${PORT}`);
  console.log(` API Docs & Test:  http://localhost:${PORT}/api-docs`);
  console.log(` REST API Base:    http://localhost:${PORT}/api`);
  console.log(` Health Check:     http://localhost:${PORT}/health`);
  console.log(`====================================================`);
});

// Graceful Shutdown Handling
const gracefulShutdown = (signal) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forcefully terminating server.');
    process.exit(1);
  }, 5000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;
