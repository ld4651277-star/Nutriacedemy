/**
 * NutriAcademy Platform - Node.js Express Backend Server
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static API docs from public/
app.use('/public', express.static(path.join(__dirname, 'public')));

// Path to frontend pages
const FRONTEND_DIR = path.join(__dirname, '..', 'stitch_nutriacademy_digital_education_platform');
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

// API Health Check & Endpoint Directory
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    platform: 'NutriAcademy Digital Education Platform API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
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

// Frontend Page Serving
const sendPage = (subfolder) => (req, res) => {
  const filePath = path.join(FRONTEND_DIR, subfolder, 'code.html');
  res.sendFile(filePath);
};

app.get('/', sendPage('home_nutriacademy'));
app.get('/home', sendPage('home_nutriacademy'));
app.get('/about', sendPage('about_contact_nutriacademy'));
app.get('/contact', sendPage('about_contact_nutriacademy'));
app.get('/learn', sendPage('learn_nutriacademy'));
app.get('/exams', sendPage('exams_nutriacademy'));
app.get('/tools', sendPage('tools_nutriacademy'));
app.get('/diet-planner', sendPage('diet_planner_nutriacademy'));
app.get('/library', sendPage('library_nutriacademy'));
app.get('/case-studies', sendPage('case_studies_nutriacademy'));
app.get('/careers', sendPage('careers_nutriacademy'));
app.get('/dashboard', sendPage('dashboard_nutriacademy'));
app.get('/vitality', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'vitality_core', 'DESIGN.md'));
});

// Interactive API Documentation Dashboard
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` NutriAcademy Node.js Backend Server is running!`);
  console.log(` Web App URL:      http://localhost:${PORT}`);
  console.log(` API Docs & Test:  http://localhost:${PORT}/api-docs`);
  console.log(` REST API Base:    http://localhost:${PORT}/api`);
  console.log(`====================================================`);
});
