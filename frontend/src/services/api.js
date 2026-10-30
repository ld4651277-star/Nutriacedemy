/**
 * NutriAcademy API Client
 * Seamlessly interfaces with Node.js Express Backend REST API
 */

const getApiBase = () => {
  if (typeof window !== 'undefined') {
    if (window.NUTRI_API_BASE && window.NUTRI_API_BASE.trim() !== '') {
      return window.NUTRI_API_BASE.trim().replace(/\/+$/, '');
    }
    const metaApi = document.querySelector('meta[name="nutri-api-url"]');
    if (metaApi && metaApi.content && !metaApi.content.includes('your-backend')) {
      return metaApi.content.trim().replace(/\/+$/, '');
    }
    try {
      const stored = localStorage.getItem('NUTRI_API_BASE');
      if (stored && stored.trim() !== '') {
        return stored.trim().replace(/\/+$/, '');
      }
    } catch (_) {}

    // In dev mode with Vite proxy, use relative '/api' or fallback to http://localhost:5000
    const port = window.location.port;
    if (port === '3000' || port === '5173') {
      return ''; // Vite proxy forwards /api to localhost:5000
    }
    if (port === '5000') {
      return window.location.origin;
    }
  }
  return '';
};

export const API_BASE = getApiBase();

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[NutriAcademy API] Error calling ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  // Tools
  calculateBmi: (height, weight) =>
    request('/api/tools/bmi', {
      method: 'POST',
      body: JSON.stringify({ height, weight }),
    }),

  calculateBmr: ({ age, gender, height, weight }) =>
    request('/api/tools/bmr', {
      method: 'POST',
      body: JSON.stringify({ age, gender, height, weight }),
    }),

  calculateTdee: ({ bmr, activityLevel }) =>
    request('/api/tools/tdee', {
      method: 'POST',
      body: JSON.stringify({ bmr, activityLevel }),
    }),

  calculateMacros: ({ targetCalories, goal }) =>
    request('/api/tools/macros', {
      method: 'POST',
      body: JSON.stringify({ targetCalories, goal }),
    }),

  // Diet Planner
  generateDietPlan: (payload) =>
    request('/api/diet-planner/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getSavedDietPlans: () => request('/api/diet-planner/saved'),

  // Contact
  submitContact: (payload) =>
    request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Exams
  getExams: () => request('/api/exams'),
  getExamById: (id) => request(`/api/exams/${id}`),
  submitExam: (id, answers) =>
    request(`/api/exams/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    }),

  // Courses
  getCourses: () => request('/api/courses'),
  getCourseById: (id) => request(`/api/courses/${id}`),

  // Library
  getLibrary: () => request('/api/library'),

  // Case Studies
  getCases: () => request('/api/cases'),
  submitCaseAssessment: (id, payload) =>
    request(`/api/cases/${id}/assessment`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Careers
  getCareerPathways: () => request('/api/careers/pathways'),

  // Dashboard
  getDashboardSummary: () => request('/api/dashboard'),
};
