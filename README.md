# NutriAcademy - Digital Nutrition & Dietetics Education Platform

A full-stack digital education platform for students and practitioners of Nutrition and Dietetics. Built with a clean separation of concerns between client frontend and backend REST services.

---

## 📁 Repository Structure

```
stitch_nutriacademy_digital_education_platform/
├── backend/                                # Node.js / Express REST API & Server
│   ├── controllers/                        # Business logic handlers
│   │   ├── careerController.js
│   │   ├── caseController.js
│   │   ├── contactController.js
│   │   ├── courseController.js
│   │   ├── dashboardController.js
│   │   ├── dietController.js
│   │   ├── examController.js
│   │   ├── libraryController.js
│   │   └── toolController.js
│   ├── data/                               # JSON database & persistent mock records
│   │   ├── careers.json
│   │   ├── cases.json
│   │   ├── courses.json
│   │   ├── diet_plans.json
│   │   ├── exams.json
│   │   ├── faq.json
│   │   ├── library.json
│   │   ├── messages.json
│   │   └── user_profile.json
│   ├── public/                             # Static API documentation assets
│   │   └── index.html                      # Interactive Swagger-style API console
│   ├── routes/                             # Express modular route definitions
│   │   ├── careerRoutes.js
│   │   ├── caseRoutes.js
│   │   ├── contactRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── dietRoutes.js
│   │   ├── examRoutes.js
│   │   ├── libraryRoutes.js
│   │   └── toolRoutes.js
│   ├── scripts/                            # Utility & automation scripts
│   │   └── inject-bridge.js
│   ├── utils/
│   │   └── db.js                           # Thread-safe JSON database read/write
│   ├── .env.example                        # Backend environment variable template
│   ├── .gitignore                          # Backend gitignore
│   ├── package.json                        # Backend dependencies & scripts
│   └── server.js                           # Express entry point
│
├── frontend/                               # Client-Side Application
│   ├── assets/
│   │   ├── docs/                           # Design specifications & tokens
│   │   │   └── DESIGN.md                   # Vitality Core design guidelines
│   │   └── js/
│   │       └── nutri-bridge.js             # Client bridge connecting UI to REST APIs
│   ├── index.html                          # Homepage & Platform Introduction
│   ├── learn.html                          # Courses, Syllabus & Learning Pathways
│   ├── exams.html                          # Exam Preparation & Mock Tests
│   ├── library.html                        # Digital Nutrition Library & Clinical Papers
│   ├── tools.html                          # Clinical Calculators (BMI, BMR, TDEE, Macros)
│   ├── diet-planner.html                   # Personalized Diet Plan Generator
│   ├── case-studies.html                   # Clinical Patient Case Studies
│   ├── careers.html                        # Dietetics Career Pathways & Licensing
│   ├── dashboard.html                      # Student Progress & Analytics Dashboard
│   ├── about.html                          # About Us & Contact Inquiries Form
│   ├── vercel.json                         # Vercel deployment configuration
│   ├── netlify.toml                        # Netlify deployment configuration
│   ├── package.json                        # Frontend preview scripts
│   └── .gitignore                          # Frontend gitignore
│
├── .dockerignore                           # Docker build ignore rules
├── .gitignore                              # Root monorepo gitignore
├── Dockerfile                              # Production multi-stage Docker container
├── package.json                            # Root workspace scripts
├── Procfile                                # Heroku / Render / Railway process definition
├── render.yaml                             # Render infrastructure blueprint
└── README.md                               # Project documentation
```

---

## 🚀 Quick Start & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### 1. Installation
Install all backend dependencies:
```bash
npm run install:all
```
*(or run `cd backend && npm install`)*

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp backend/.env.example backend/.env
```

### 3. Run the Application

#### Option A: Unified Full-Stack Server (Recommended)
Runs the Express backend which serves both the REST API and the frontend pages:
```bash
npm start
```
- **Web Application:** [http://localhost:5000](http://localhost:5000)
- **Interactive API Documentation:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **API Health Check:** [http://localhost:5000/health](http://localhost:5000/health)
- **REST API Base:** [http://localhost:5000/api](http://localhost:5000/api)

#### Option B: Independent Frontend & Backend
If developing the frontend and backend in isolation:

1. **Start Backend (Port 5000):**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (Port 3000):**
   ```bash
   cd frontend
   npm start
   ```
   *(or open `frontend/index.html` with VS Code Live Server or any static web server)*

---

## 📡 REST API Reference

| Domain | Method | Endpoint | Description |
|---|---|---|---|
| **System** | `GET` | `/health` | Health check & uptime |
| **System** | `GET` | `/api` | Directory of all available API endpoints |
| **Tools** | `POST` | `/api/tools/bmi` | Calculates BMI, classification & ideal weight range |
| **Tools** | `POST` | `/api/tools/bmr` | Calculates Basal Metabolic Rate (Mifflin-St Jeor / Harris-Benedict) |
| **Tools** | `POST` | `/api/tools/tdee` | Calculates Total Daily Energy Expenditure by activity level |
| **Tools** | `POST` | `/api/tools/macros` | Calculates macronutrient grams and calorie distribution |
| **Diet** | `POST` | `/api/diet-planner/generate` | Generates personalized diet prescription and meal plan |
| **Exams** | `GET` | `/api/exams` | Lists available mock exams |
| **Exams** | `GET` | `/api/exams/:id` | Gets test questions for examination |
| **Exams** | `POST` | `/api/exams/:id/submit` | Submits answers for instant grading & topic analytics |
| **Courses**| `GET` | `/api/courses` | Lists nutrition courses with modules and syllabus |
| **Library**| `GET` | `/api/library` | Clinical textbooks, papers, and resource guides |
| **Cases**  | `GET` | `/api/cases` | Clinical patient case files with lab results |
| **Cases**  | `POST` | `/api/cases/:id/assessment` | Submits student PES diagnosis and care plan |
| **Careers**| `GET` | `/api/careers/pathways` | Dietetics career milestones, licensing & salaries |
| **Contact**| `POST` | `/api/contact` | Submits contact inquiries & student questions |
| **Dashboard**| `GET` | `/api/dashboard` | Aggregated user metrics, active courses, and quiz scores |

---

## 🚢 Production Deployment

### 1. Render / Railway / Heroku (Full-Stack Unified)
1. Link your repository.
2. Build Command: `cd backend && npm install`
3. Start Command: `node backend/server.js`
4. Set environment variable: `NODE_ENV=production`

### 2. Docker Deployment
A production-ready [Dockerfile](file:///Dockerfile) is included:
```bash
# Build Docker image
docker build -t nutriacademy-platform .

# Run Docker container
docker run -d -p 5000:5000 --name nutriacademy nutriacademy-platform
```

### 3. Separate Deployment (Frontend on Vercel + Backend on Render)
> [!NOTE]
> For the complete, beginner-friendly click-by-click instructions, read the **[Full Vercel & Render Deployment Guide](file:///DEPLOYMENT.md)**.

- **Frontend (Vercel):**
  - Root directory: `frontend`
  - Preconfigured with [frontend/vercel.json](file:///frontend/vercel.json) for clean HTML5 URL routing.
  - Set your live Render URL in [frontend/assets/js/config.js](file:///frontend/assets/js/config.js) or configure Vercel rewrites.
- **Backend (Render):**
  - Root directory: `backend`
  - Build command: `npm install`
  - Start command: `node server.js`
  - Set `CORS_ORIGIN=*` and `NODE_ENV=production`.

---

## 🛠️ Technology Stack
- **Frontend:** HTML5, Modern CSS (TailwindCSS CDN + Vitality Design System Tokens), Vanilla JavaScript, Material Symbols, Google Inter Fonts.
- **Backend:** Node.js, Express.js, CORS, Morgan logger, Dotenv.
- **Database:** File-based JSON database engine with thread-safe persistence.
