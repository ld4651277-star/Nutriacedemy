import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function LearnPage() {
  const { showToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [bookmarked, setBookmarked] = useState({});
  const [courses, setCourses] = useState([
    {
      id: 'course-1',
      title: 'Macro-nutrients Masterclass',
      category: 'Human Nutrition',
      level: 'Intermediate',
      description: 'Deep dive into carbohydrates, proteins, and fats. Understand their metabolic pathways and clinical significance in modern dietetics.',
      duration: '8h 30m',
      lessons: '12 Lessons',
      progress: 45,
      borderTopColor: 'border-t-primary',
      badgeColor: 'bg-surface-container-low text-primary',
      btnColor: 'bg-primary-container text-on-primary-container',
      btnText: 'Continue Learning',
    },
    {
      id: 'course-2',
      title: 'Clinical Dietetics 101',
      category: 'Clinical Nutrition',
      level: 'Beginner',
      description: 'Fundamental principles of clinical nutrition assessment and intervention strategies for common acute conditions.',
      duration: '12h 15m',
      lessons: '18 Lessons',
      progress: 0,
      borderTopColor: 'border-t-secondary',
      badgeColor: 'bg-surface-container-low text-primary',
      btnColor: 'bg-tertiary-container text-on-tertiary-container',
      btnText: 'Start Learning',
    },
    {
      id: 'course-3',
      title: 'Food Safety Standards',
      category: 'Food Science',
      level: 'Advanced',
      description: 'Advanced protocols for institutional food safety, regulatory compliance, and risk management in commercial kitchens.',
      duration: '6h 45m',
      lessons: '8 Lessons',
      progress: 15,
      borderTopColor: 'border-t-primary',
      badgeColor: 'bg-error-container text-on-error-container',
      btnColor: 'bg-primary-container text-on-primary-container',
      btnText: 'Continue Learning',
    },
    {
      id: 'course-4',
      title: 'Pediatric Growth & Micronutrients',
      category: 'Therapeutic Nutrition',
      level: 'Intermediate',
      description: 'Nutritional requirements during infancy, childhood, and adolescence with an emphasis on mineral absorption and development.',
      duration: '9h 10m',
      lessons: '14 Lessons',
      progress: 80,
      borderTopColor: 'border-t-secondary',
      badgeColor: 'bg-surface-container-low text-primary',
      btnColor: 'bg-primary-container text-on-primary-container',
      btnText: 'Continue Learning',
    },
    {
      id: 'course-5',
      title: 'Nutritional Biochemistry & Metabolism',
      category: 'Biochemistry',
      level: 'Advanced',
      description: 'Cellular respiration, enzymatic co-factors, Krebs cycle kinetics, and lipid peroxidation in health and metabolic syndromes.',
      duration: '14h 20m',
      lessons: '22 Lessons',
      progress: 0,
      borderTopColor: 'border-t-primary',
      badgeColor: 'bg-error-container text-on-error-container',
      btnColor: 'bg-tertiary-container text-on-tertiary-container',
      btnText: 'Start Learning',
    },
    {
      id: 'course-6',
      title: 'Community Public Health Nutrition',
      category: 'Community Nutrition',
      level: 'Beginner',
      description: 'Designing community interventions, epidemiological dietary surveys, and fortification policies for vulnerable populations.',
      duration: '7h 00m',
      lessons: '10 Lessons',
      progress: 30,
      borderTopColor: 'border-t-secondary',
      badgeColor: 'bg-surface-container-low text-primary',
      btnColor: 'bg-primary-container text-on-primary-container',
      btnText: 'Continue Learning',
    },
  ]);

  useEffect(() => {
    // Attempt fetching courses from backend if available
    api.getCourses()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          // Merge or supplement
          const mapped = res.data.map((c, i) => ({
            id: c.id || `backend-course-${i}`,
            title: c.title,
            category: c.category || 'General',
            level: c.difficulty || 'Intermediate',
            description: c.description,
            duration: c.duration || '8h 00m',
            lessons: `${c.modulesCount || 10} Lessons`,
            progress: c.progress || 0,
            borderTopColor: i % 2 === 0 ? 'border-t-primary' : 'border-t-secondary',
            badgeColor: 'bg-surface-container-low text-primary',
            btnColor: c.progress > 0 ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container text-on-tertiary-container',
            btnText: c.progress > 0 ? 'Continue Learning' : 'Start Learning',
          }));
          setCourses(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    'All Courses',
    'Basics',
    'Human Nutrition',
    'Clinical Nutrition',
    'Dietetics',
    'Food Science',
    'Safety',
    'Community Nutrition',
    'Biochemistry',
    'Therapeutic Nutrition',
  ];

  const toggleBookmark = (id, title) => {
    setBookmarked((prev) => {
      const isBookmarked = !prev[id];
      showToast(isBookmarked ? `"${title}" bookmarked!` : `Bookmark removed.`);
      return { ...prev, [id]: isBookmarked };
    });
  };

  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      activeCategory === 'All Courses' ||
      c.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(c.category.toLowerCase());
    const matchesQuery =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff =
      !difficulty || c.level.toLowerCase() === difficulty.toLowerCase();
    return matchesCategory && matchesQuery && matchesDiff;
  });

  return (
    <main className="flex-grow pt-24 px-margin-mobile md:px-margin-desktop pb-3xl flex flex-col md:flex-row gap-xl max-w-7xl mx-auto w-full">
      {/* Sidebar Categories */}
      <aside className="w-full md:w-64 flex-shrink-0 mb-xl md:mb-0">
        <h2 className="text-headline-md font-headline-md text-primary mb-md font-bold">Categories</h2>
        <div className="flex flex-col gap-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-left px-4 py-2.5 rounded-lg font-label-md text-label-md transition-all ${
                activeCategory === cat
                  ? 'bg-secondary text-on-secondary shadow-sm font-semibold'
                  : 'bg-surface text-on-surface hover:bg-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col gap-lg">
        {/* Header & Search/Filter */}
        <div className="flex flex-col gap-md">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary font-bold">
            LEARN NUTRITION Hub
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-3xl">
            Explore our comprehensive library of nutrition courses designed for students and professionals.
          </p>

          <div className="flex flex-col md:flex-row gap-md mt-sm bg-surface p-md rounded-xl shadow-sm border border-outline-variant">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#F1F5F9] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-body-md font-body-md bg-white text-on-surface"
                placeholder="Search courses by keyword..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-sm">
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[#F1F5F9] bg-white text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer text-on-surface"
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-low rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
            <p className="text-body-lg text-on-surface-variant">No courses match your filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('All Courses');
                setSearchQuery('');
                setDifficulty('');
              }}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-label-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-lg">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`course-card bg-white rounded-xl border border-[#E2E8F0] overflow-hidden flex flex-col h-full shadow-sm border-t-4 ${course.borderTopColor}`}
              >
                <div className="p-lg flex-grow flex flex-col gap-md">
                  <div className="flex justify-between items-start">
                    <span className={`px-3 py-1 ${course.badgeColor} text-label-sm font-label-sm rounded-full font-medium`}>
                      {course.level}
                    </span>
                    <button
                      onClick={() => toggleBookmark(course.id, course.title)}
                      className="p-1 text-outline hover:text-primary transition-colors"
                      title="Bookmark course"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={bookmarked[course.id] ? { fontVariationSettings: "'FILL' 1", color: '#006c49' } : {}}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>

                  <h3 className="text-headline-md font-headline-md text-on-surface font-semibold leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-body-md font-body-md text-on-surface-variant flex-grow line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-lg text-label-md font-label-md text-on-surface-variant mt-auto pt-sm border-t border-outline-variant/30">
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-xs">
                      <span className="material-symbols-outlined text-sm">menu_book</span>
                      {course.lessons}
                    </div>
                  </div>

                  {course.progress > 0 ? (
                    <div className="mt-sm">
                      <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-container rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-sm opacity-0">
                      <div className="h-2 w-full"></div>
                    </div>
                  )}
                </div>

                <div className="p-md bg-surface-container-lowest border-t border-[#E2E8F0]">
                  <button
                    onClick={() => showToast(`Enrolling in "${course.title}"... Access granted!`)}
                    className={`w-full py-2 ${course.btnColor} rounded-lg font-label-md text-label-md hover:shadow-md transition-shadow flex justify-center items-center gap-sm font-semibold`}
                  >
                    {course.btnText}
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-lg">
          <button
            onClick={() => showToast('All current curriculum tracks are displayed!')}
            className="px-6 py-2 border border-outline text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-variant transition-colors"
          >
            Load More Courses
          </button>
        </div>
      </div>
    </main>
  );
}
