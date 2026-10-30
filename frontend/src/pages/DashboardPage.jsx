import React from 'react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/SidebarNav';
import { useToast } from '../context/ToastContext';

export default function DashboardPage() {
  const { showToast } = useToast();

  return (
    <div className="min-h-screen flex bg-background text-on-background font-body-md pt-20 lg:pt-0">
      {/* Desktop Sidebar */}
      <SidebarNav activeItem="dashboard" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full relative">
        <main className="flex-grow p-margin-mobile md:p-margin-desktop bg-surface pb-24 md:pb-margin-desktop max-w-[1400px] w-full mx-auto">
          {/* Top Header */}
          <header className="flex justify-between items-center mb-8 mt-4">
            <div>
              <h1 className="text-headline-lg font-headline-lg font-bold text-on-surface tracking-tight">
                Student Overview
              </h1>
              <p className="text-body-md text-on-surface-variant">
                Track your active curriculum progress, upcoming certifications, and mock exam analytics.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div
                onClick={() => showToast('You have 1 pending exam reminder and 2 course announcements.')}
                className="relative cursor-pointer hover:bg-surface-variant p-2 rounded-full transition-colors"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </div>
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[minmax(180px,auto)]">
            {/* 1. Progress Tracker (Circular Chart) - 4 cols */}
            <section className="col-span-1 md:col-span-4 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <div className="flex justify-between items-center mb-md">
                <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                  Course Progress
                </h3>
                <span className="text-xs bg-primary-container/20 text-primary px-2.5 py-1 rounded-full font-bold">
                  Active
                </span>
              </div>

              <div className="flex justify-center items-center py-4">
                <svg className="circular-chart text-primary w-44 h-44" viewBox="0 0 36 36">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  ></path>
                  <path
                    className="circle stroke-primary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    strokeDasharray="68, 100"
                  ></path>
                  <text className="percentage" x="18" y="20.35">
                    68%
                  </text>
                </svg>
              </div>

              <div className="text-center pt-2 border-t border-outline-variant/30">
                <p className="text-label-md font-bold text-on-surface">Clinical Nutrition Basics</p>
                <p className="text-xs text-on-surface-variant">Module 8 of 12 Completed</p>
              </div>
            </section>

            {/* 2. Career Roadmap - 8 cols */}
            <section className="col-span-1 md:col-span-8 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
              <div className="flex justify-between items-center mb-lg">
                <div>
                  <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                    Career Roadmap
                  </h3>
                  <p className="text-label-sm text-on-surface-variant">Milestone trajectory</p>
                </div>
                <span className="text-label-sm font-label-sm px-3 py-1 bg-surface-container-high rounded-full text-primary font-bold">
                  Registered Dietitian Pathway
                </span>
              </div>

              <div className="relative py-6">
                {/* Desktop Track line */}
                <div className="absolute top-1/2 left-0 w-full h-2 bg-surface-container-high -translate-y-1/2 rounded-full hidden md:block"></div>
                <div className="absolute top-1/2 left-0 w-1/2 h-2 bg-secondary -translate-y-1/2 rounded-full hidden md:block"></div>

                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-md md:gap-0">
                  {/* Step 1: Completed */}
                  <div className="flex flex-row md:flex-col items-center gap-md md:gap-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-label-md font-label-md font-bold text-on-surface">
                        Foundations
                      </p>
                      <p className="text-label-sm text-emerald-700 font-medium">Completed Jan '24</p>
                    </div>
                  </div>

                  {/* Step 2: Active */}
                  <div className="flex flex-row md:flex-col items-center gap-md md:gap-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest border-4 border-secondary text-secondary flex items-center justify-center shadow-md animate-pulse">
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-label-md font-label-md font-bold text-on-surface">
                        Core Clinical
                      </p>
                      <p className="text-label-sm text-secondary font-bold">In Progress</p>
                    </div>
                  </div>

                  {/* Step 3: Upcoming */}
                  <div className="flex flex-row md:flex-col items-center gap-md md:gap-sm">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant">
                      <span className="material-symbols-outlined text-[18px]">lock</span>
                    </div>
                    <div className="text-left md:text-center">
                      <p className="text-label-md font-label-md text-on-surface-variant font-medium">
                        Internship
                      </p>
                      <p className="text-label-sm text-on-surface-variant">Requires Core (2025)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-outline-variant/30 flex justify-end">
                <Link
                  to="/careers"
                  className="text-primary text-label-sm font-bold hover:underline flex items-center gap-1"
                >
                  View Full Career Guidance →
                </Link>
              </div>
            </section>

            {/* 3. Saved Courses List - 6 cols */}
            <section className="col-span-1 md:col-span-6 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
              <div className="flex justify-between items-center mb-md">
                <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                  Saved Courses
                </h3>
                <Link to="/learn" className="text-primary hover:underline text-label-sm font-label-sm font-semibold">
                  View All
                </Link>
              </div>

              <div className="space-y-md">
                {/* Course Item 1 */}
                <Link
                  to="/learn"
                  className="flex items-center gap-md p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">local_dining</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-label-md font-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                      Advanced Dietetics
                    </h4>
                    <p className="text-label-sm text-on-surface-variant">Dr. Sarah Jenkins • 12 Modules</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </Link>

                {/* Course Item 2 */}
                <Link
                  to="/learn"
                  className="flex items-center gap-md p-3 rounded-lg hover:bg-surface-container-low transition-colors group cursor-pointer border border-transparent hover:border-outline-variant"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary">sports_gymnastics</span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-label-md font-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                      Sports Nutrition
                    </h4>
                    <p className="text-label-sm text-on-surface-variant">Prof. Mark Davis • 8 Modules</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </Link>
              </div>
            </section>

            {/* 4. Recent Exam Scores - 6 cols */}
            <section className="col-span-1 md:col-span-6 bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md transition-shadow relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary-fixed-dim"></div>
              <div className="flex justify-between items-center mb-md">
                <h3 className="text-headline-md font-headline-md text-on-surface font-semibold">
                  Recent Exams
                </h3>
                <Link to="/exams" className="text-primary hover:underline text-label-sm font-label-sm font-semibold">
                  Take New Test
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant">
                      <th className="pb-sm font-medium">Exam Name</th>
                      <th className="pb-sm font-medium text-center">Score</th>
                      <th className="pb-sm font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md text-sm">
                    <tr className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="py-3 font-medium text-on-surface">Metabolism Basics Quiz</td>
                      <td className="py-3 text-center font-bold text-primary">92%</td>
                      <td className="py-3 text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container text-label-sm font-bold">
                          Passed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 font-medium text-on-surface">Vitamins &amp; Minerals Midterm</td>
                      <td className="py-3 text-center font-bold text-tertiary-container">78%</td>
                      <td className="py-3 text-right">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold">
                          Review
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
