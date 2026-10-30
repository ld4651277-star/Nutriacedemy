import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast(`Thank you! ${email} has been subscribed to our newsletter.`);
    setEmail('');
  };

  return (
    <footer className="w-full py-3xl px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-xl bg-surface-container-highest dark:bg-on-background mt-3xl border-t border-outline-variant/30">
      {/* Brand Info */}
      <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">spa</span>
          <span className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary">
            NutriAcademy
          </span>
        </Link>
        <p className="text-body-md font-body-md text-on-surface-variant">
          Your complete learning platform for nutrition and dietetics excellence. Bridging evidence-based education with real-world practice.
        </p>
        <p className="text-label-sm font-label-sm text-on-surface-variant mt-auto pt-2">
          © {new Date().getFullYear()} NutriAcademy. All rights reserved.
        </p>
      </div>

      {/* Platform Links */}
      <div className="col-span-1 flex flex-col gap-2">
        <h4 className="text-label-md font-label-md font-bold text-on-surface mb-2">Platform</h4>
        <Link
          to="/learn"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Courses & Learning
        </Link>
        <Link
          to="/exams"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Mock Exams & Prep
        </Link>
        <Link
          to="/tools"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Nutrition Calculators
        </Link>
        <Link
          to="/diet-planner"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Custom Diet Planner
        </Link>
        <Link
          to="/library"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Academic Library
        </Link>
        <Link
          to="/case-studies"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Clinical Case Studies
        </Link>
        <Link
          to="/careers"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Career Pathways
        </Link>
      </div>

      {/* About & Legal */}
      <div className="col-span-1 flex flex-col gap-2">
        <h4 className="text-label-md font-label-md font-bold text-on-surface mb-2">About & Legal</h4>
        <Link
          to="/about"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          About NutriAcademy
        </Link>
        <Link
          to="/about#contact"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Contact Support
        </Link>
        <Link
          to="/about"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Privacy Policy
        </Link>
        <Link
          to="/about"
          className="text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-all text-body-md font-body-md"
        >
          Terms of Service
        </Link>
        <div className="flex gap-4 mt-4 text-on-surface-variant">
          <a
            href="https://github.com/ld4651277-star/Nutriacedemy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
            title="GitHub Repository"
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
          </a>
          <span className="material-symbols-outlined text-[20px] hover:text-primary cursor-pointer transition-colors" title="Global Health Network">
            public
          </span>
          <span className="material-symbols-outlined text-[20px] hover:text-primary cursor-pointer transition-colors" title="Share">
            share
          </span>
        </div>
      </div>

      {/* Newsletter */}
      <div className="col-span-1 flex flex-col gap-4">
        <h4 className="text-label-md font-label-md font-bold text-on-surface">Subscribe to our Newsletter</h4>
        <p className="text-body-md font-body-md text-on-surface-variant">
          Get weekly nutrition research digests, case summaries, and exam prep tips directly in your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
          <input
            className="w-full bg-surface-container-lowest border border-outline-variant sm:border-r-0 rounded-lg sm:rounded-r-none px-3 py-2 text-body-md font-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 sm:mt-0 bg-primary text-on-primary px-4 py-2 rounded-lg sm:rounded-l-none hover:bg-surface-tint transition-colors text-label-md font-label-md whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}
