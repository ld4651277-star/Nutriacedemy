import React, { useState } from 'react';
import SidebarNav from '../components/SidebarNav';
import QuizModal from '../components/QuizModal';
import { useToast } from '../context/ToastContext';

export default function ExamsPage() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('UGC NET');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const categories = [
    'UGC NET',
    'University Exams',
    'Entrance Exams',
    'Food Safety Officer',
    'Competitive Exams',
  ];

  return (
    <div className="min-h-screen flex bg-background text-on-background font-body-md pt-20 lg:pt-0">
      {/* Desktop Sidebar */}
      <SidebarNav activeItem="exams" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64 w-full relative">
        <main className="flex-1 p-margin-mobile md:p-margin-desktop bg-background pb-24 md:pb-margin-desktop max-w-[1400px] w-full mx-auto">
          {/* Welcome Header */}
          <div className="mb-3xl flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
            <div>
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-2 font-bold">
                Exam Preparation Hub
              </h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Your centralized dashboard for focused study, mock test simulations, and performance tracking.
              </p>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full text-label-sm font-label-sm text-primary font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Next Mock Test: Tomorrow, 10 AM
              </span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Main Focus Column (Left 8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-gutter">
              {/* Exam Categories (Pills) */}
              <section>
                <h2 className="text-headline-md font-headline-md text-on-surface mb-4 font-semibold">
                  Exam Categories
                </h2>
                <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 px-5 py-2 rounded-full text-label-md font-label-md font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-secondary text-on-secondary ambient-shadow-hover shadow-sm'
                          : 'bg-surface-container-low border border-outline-variant text-on-surface-variant hover:bg-surface-variant'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* Feature Widgets Grid */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-2">
                {/* Widget 1: MCQ Practice */}
                <div
                  onClick={() => setIsQuizOpen(true)}
                  className="bg-surface-container-lowest rounded-xl p-6 border-t-4 border-t-primary border-l border-r border-b border-outline-variant/30 ambient-shadow-surface hover:ambient-shadow-hover transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-primary-container/20 p-3 rounded-lg text-primary">
                      <span className="material-symbols-outlined">quiz</span>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
                      arrow_forward
                    </span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-2 font-semibold">
                    MCQ Practice
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant mb-6 flex-grow">
                    Daily bitesize questions to keep core concepts fresh and reinforced.
                  </p>
                  <div className="mt-auto">
                    <div className="w-full bg-surface-container-high rounded-full h-2 mb-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      Daily Goal: 65% completed
                    </span>
                  </div>
                </div>

                {/* Widget 2: Mock Tests */}
                <div
                  onClick={() => setIsQuizOpen(true)}
                  className="bg-surface-container-lowest rounded-xl p-6 border-t-4 border-t-secondary border-l border-r border-b border-outline-variant/30 ambient-shadow-surface hover:ambient-shadow-hover transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-secondary-container/20 p-3 rounded-lg text-secondary">
                      <span className="material-symbols-outlined">timer</span>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">
                      arrow_forward
                    </span>
                  </div>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-2 font-semibold">
                    Mock Tests
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant mb-6 flex-grow">
                    Full-length timed simulations mirroring UGC NET & clinical board standards.
                  </p>
                  <div className="mt-auto flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-container text-sm">
                      schedule
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant font-medium">
                      2 pending simulations
                    </span>
                  </div>
                </div>

                {/* Widget 3: Previous Year Questions */}
                <div
                  onClick={() => showToast('Accessing Previous Year Question papers archive (2018-2023)...')}
                  className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface hover:ambient-shadow-hover transition-all cursor-pointer group flex items-center gap-4"
                >
                  <div className="bg-surface-variant p-4 rounded-full text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shrink-0">
                    <span className="material-symbols-outlined">history</span>
                  </div>
                  <div>
                    <h3 className="text-label-md font-label-md font-bold text-on-surface">
                      Previous Year Questions
                    </h3>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Browse archives by year & topic
                    </p>
                  </div>
                </div>

                {/* Widget 4: Topic-wise Tests */}
                <div
                  onClick={() => showToast('Opening Topic-wise Test selector...')}
                  className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface hover:ambient-shadow-hover transition-all cursor-pointer group flex items-center gap-4"
                >
                  <div className="bg-surface-variant p-4 rounded-full text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors shrink-0">
                    <span className="material-symbols-outlined">library_books</span>
                  </div>
                  <div>
                    <h3 className="text-label-md font-label-md font-bold text-on-surface">
                      Topic-wise Tests
                    </h3>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      Focus on specific syllabus areas
                    </p>
                  </div>
                </div>

                {/* Widget 5: Revision Quizzes Banner */}
                <div className="md:col-span-2 bg-gradient-to-r from-surface-container-low to-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface hover:ambient-shadow-hover transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-headline-md font-headline-md text-on-surface mb-1 font-semibold">
                      Revision Quizzes
                    </h3>
                    <p className="text-body-md font-body-md text-on-surface-variant">
                      Quick fire rounds to test retention and assess immediate diagnostic recall.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsQuizOpen(true)}
                    className="bg-surface text-primary border border-primary px-6 py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap font-semibold shadow-sm"
                  >
                    Start Quick Quiz
                  </button>
                </div>
              </section>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-gutter mt-8 lg:mt-0">
              {/* Performance Chart Card */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="text-label-md font-label-md font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">trending_up</span>
                  Score Tracking
                </h3>
                {/* CSS Line / Bar Graph */}
                <div className="h-32 w-full flex items-end gap-2 mb-4 relative pt-4">
                  <div className="absolute top-4 left-0 w-full border-t border-dashed border-outline-variant/30 z-0"></div>
                  <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-outline-variant/30 z-0"></div>
                  <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
                    <div className="w-full max-w-[24px] bg-surface-variant rounded-t-sm h-[40%] group-hover:bg-primary/50 transition-colors"></div>
                    <span className="text-[10px] text-on-surface-variant mt-2 font-label-sm">W1</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
                    <div className="w-full max-w-[24px] bg-surface-variant rounded-t-sm h-[55%] group-hover:bg-primary/50 transition-colors"></div>
                    <span className="text-[10px] text-on-surface-variant mt-2 font-label-sm">W2</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
                    <div className="w-full max-w-[24px] bg-surface-variant rounded-t-sm h-[45%] group-hover:bg-primary/50 transition-colors"></div>
                    <span className="text-[10px] text-on-surface-variant mt-2 font-label-sm">W3</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-end items-center group relative z-10">
                    <div className="w-full max-w-[24px] bg-primary rounded-t-sm h-[75%] ambient-shadow-surface"></div>
                    <span className="text-[10px] text-primary font-bold mt-2 font-label-sm">W4</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface-variant">Last Test: 75%</span>
                  <span className="text-primary font-bold">+12% vs avg</span>
                </div>
              </div>

              {/* Weak Topic Analysis */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface">
                <h3 className="text-label-md font-label-md font-bold text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-container text-sm">
                    radar
                  </span>
                  Weak Topics Focus
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-error"></div>
                        <span className="text-label-md font-label-md text-on-surface">
                          Micronutrients
                        </span>
                      </div>
                      <span className="text-label-sm font-label-sm font-bold text-error">42%</span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5">
                      <div className="bg-error h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-tertiary-container"></div>
                        <span className="text-label-md font-label-md text-on-surface">
                          Food Chemistry
                        </span>
                      </div>
                      <span className="text-label-sm font-label-sm font-bold text-tertiary-container">
                        58%
                      </span>
                    </div>
                    <div className="w-full bg-surface-container-high rounded-full h-1.5">
                      <div
                        className="bg-tertiary-container h-1.5 rounded-full"
                        style={{ width: '58%' }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('Opening Micronutrient high-yield revision flashcards...')}
                    className="mt-2 text-primary text-label-sm font-label-sm font-bold hover:underline self-start flex items-center gap-1"
                  >
                    Review Topic Material →
                  </button>
                </div>
              </div>

              {/* Study Planner */}
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30 ambient-shadow-surface flex-grow flex flex-col">
                <h3 className="text-label-md font-label-md font-bold text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    calendar_month
                  </span>
                  Study Planner
                </h3>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-surface-variant text-on-surface-variant">
                    <span className="text-[10px] font-label-sm uppercase">Mon</span>
                    <span className="text-label-md font-bold">12</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-primary text-on-primary ambient-shadow-surface">
                    <span className="text-[10px] font-label-sm uppercase opacity-80">Tue</span>
                    <span className="text-label-md font-bold">13</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-surface-variant text-on-surface-variant relative">
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-tertiary-container"></div>
                    <span className="text-[10px] font-label-sm uppercase">Wed</span>
                    <span className="text-label-md font-bold">14</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center p-2 rounded-lg bg-surface-variant text-on-surface-variant">
                    <span className="text-[10px] font-label-sm uppercase">Thu</span>
                    <span className="text-label-md font-bold">15</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="bg-surface p-3 rounded-lg border-l-4 border-l-primary flex flex-col">
                    <span className="text-[10px] font-label-sm text-on-surface-variant mb-1">
                      10:00 AM - 12:00 PM
                    </span>
                    <span className="text-label-sm font-label-sm font-bold text-on-surface">
                      UGC NET Mock Test 4
                    </span>
                  </div>
                  <div className="bg-surface p-3 rounded-lg border-l-4 border-l-secondary flex flex-col">
                    <span className="text-[10px] font-label-sm text-on-surface-variant mb-1">
                      2:00 PM - 4:00 PM
                    </span>
                    <span className="text-label-sm font-label-sm font-bold text-on-surface">
                      Review: Food Safety Standards
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
