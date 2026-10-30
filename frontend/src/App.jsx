import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import ExamsPage from './pages/ExamsPage';
import ToolsPage from './pages/ToolsPage';
import DietPlannerPage from './pages/DietPlannerPage';
import LibraryPage from './pages/LibraryPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CareersPage from './pages/CareersPage';
import DashboardPage from './pages/DashboardPage';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout({ children }) {
  const { pathname } = useLocation();
  // On Exams & Dashboard on desktop, the Sidebar handles navigation, but TopNavbar can still show or hide
  const isDashboardView = pathname === '/dashboard' || pathname === '/exams';

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <Navbar />
      <div className="flex-grow">{children}</div>
      {!isDashboardView && <Footer />}
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Home Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/index.html" element={<HomePage />} />

            {/* About & Contact */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<AboutPage />} />
            <Route path="/about.html" element={<AboutPage />} />

            {/* Learn */}
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn.html" element={<LearnPage />} />

            {/* Exams */}
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/exams.html" element={<ExamsPage />} />

            {/* Tools */}
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools.html" element={<ToolsPage />} />

            {/* Diet Planner */}
            <Route path="/diet-planner" element={<DietPlannerPage />} />
            <Route path="/diet-planner.html" element={<DietPlannerPage />} />

            {/* Library */}
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library.html" element={<LibraryPage />} />

            {/* Case Studies */}
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies.html" element={<CaseStudiesPage />} />

            {/* Careers */}
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/careers.html" element={<CareersPage />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard.html" element={<DashboardPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}
