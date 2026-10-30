import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [selectedTopic, setSelectedTopic] = useState('All Topics');

  const topics = [
    'All Topics',
    'Basics of Nutrition',
    'Clinical Dietetics',
    'Sports Nutrition',
    'Pediatric Nutrition',
    'Public Health',
  ];

  const features = [
    {
      title: 'Nutrition Learning',
      desc: 'Interactive courses covering basics to advanced clinical nutrition.',
      icon: 'local_library',
      link: '/learn',
    },
    {
      title: 'Career Guidance',
      desc: 'Pathways, certification requirements, and industry insights.',
      icon: 'explore',
      link: '/careers',
    },
    {
      title: 'Exam Prep',
      desc: 'Mock tests and study guides for major dietetics board exams.',
      icon: 'fact_check',
      link: '/exams',
    },
    {
      title: 'Books & Resources',
      desc: 'A curated library of essential academic texts and journals.',
      icon: 'auto_stories',
      link: '/library',
    },
    {
      title: 'Calculators',
      desc: 'BMI, BMR, macro calculators and clinical assessment tools.',
      icon: 'calculate',
      link: '/tools',
    },
    {
      title: 'Diet Plans',
      desc: 'Create, manage, and analyze personalized dietary interventions.',
      icon: 'restaurant_menu',
      link: '/diet-planner',
    },
  ];

  return (
    <main className="w-full pt-20">
      {/* Hero Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-3xl bg-gradient-to-br from-surface-container-lowest to-surface-container-low min-h-[750px] flex items-center justify-center relative overflow-hidden">
        {/* Decorative Ambient Blobs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter max-w-7xl mx-auto relative z-10 items-center">
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-lg">
            <span className="inline-block bg-surface-variant text-primary px-4 py-1 rounded-full text-label-sm font-label-sm w-fit border border-outline-variant font-medium">
              NutriAcademy Platform
            </span>
            <h1 className="text-display font-display text-on-surface leading-tight">
              Your Complete Nutrition &amp; Dietetics{' '}
              <span className="text-primary">Learning Platform</span>
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl">
              Learn nutrition, prepare for exams, explore careers, access study resources, and create personalized diet plans — all in one place. Designed for clarity, growth, and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link
                to="/learn"
                className="bg-primary text-on-primary px-8 py-3 rounded-lg text-label-md font-label-md hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)] hover:bg-surface-tint transition-all w-full sm:w-auto text-center font-medium"
              >
                Explore Learning
              </Link>
              <Link
                to="/diet-planner"
                className="bg-surface-container-lowest text-primary border border-primary px-8 py-3 rounded-lg text-label-md font-label-md hover:bg-surface-container-low transition-colors w-full sm:w-auto text-center font-medium"
              >
                Create Your Diet Plan
              </Link>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6 relative mt-xl lg:mt-0">
            {/* Glassmorphism Bento Grid Image Arrangement */}
            <div className="grid grid-cols-2 gap-4 h-[480px]">
              <div className="col-span-2 row-span-1 bg-surface-container-lowest rounded-2xl p-2 shadow-sm border border-outline-variant overflow-hidden group">
                <img
                  alt="Fresh ingredients"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj-eU4ffO96n8rhNXHab2llcHi32zlRGsqafDisI4xMgg9L0fjM14U4v4t3CHNjhdf3N1QnWlqOp3kcDs4ucyzHnViKmc2lVU7xrCmMudtbSMO7RpLUJp_iWkobKtCnwwMsBQszKm3KXnVwIKdiy3k1zbuBero2M6NzN4CaLpZlDcdJCxRd8Pzt_Puo-eBxeM54vHP2QdqckDx5KcA_teIKQTgp9_2F6xod00WILclRVDsQ4E6fduN"
                />
              </div>
              <div className="col-span-1 row-span-1 bg-surface-container-lowest rounded-2xl p-2 shadow-sm border border-outline-variant overflow-hidden group">
                <img
                  alt="Study tools"
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoVmwuNhSgU97daCm8nMypd4147NlIVYqP8RN9ySsPrZi33TsuYiITgizGDsJscsmiNHe_UxpOXkvhhQcOmPRpmOkXZuBHjS0tgq0tWdtwW8dVRTZ2Z44Qkslgx_h_3dlMEowaxYg-7vmT_xqp895p5E07Ks7D75sbWio_PTlw89VAbjFNd5g5C4s1xqoVCwCsBDZGRRuh3VS0WD-KryBXugGnWImeq-ftxOd1Ei7qivrhFNNy7iQk"
                />
              </div>
              <div className="col-span-1 row-span-1 bg-primary-container rounded-2xl p-6 flex flex-col justify-center items-center shadow-sm border border-primary/20 text-on-primary-container text-center">
                <span className="material-symbols-outlined text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  school
                </span>
                <span className="text-headline-md font-headline-md font-bold">Join 50k+ Students</span>
                <span className="text-xs mt-1 opacity-90">Worldwide in dietetics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-3xl bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-3xl">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="text-headline-lg font-headline-lg text-on-surface">Everything you need to succeed</h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Master nutrition science with our comprehensive suite of tools and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {features.map((feat, index) => (
              <Link
                key={index}
                to={feat.link}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant border-t-4 border-t-primary p-6 shadow-sm hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined">{feat.icon}</span>
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                  {feat.desc}
                </p>
                <div className="flex items-center gap-1 text-primary text-label-sm font-semibold pt-2">
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics Section */}
      <section className="w-full px-margin-mobile md:px-margin-desktop py-3xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col gap-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Popular Topics</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-2">
                Explore specific areas of nutrition science.
              </p>
            </div>
            <Link
              to="/learn"
              className="text-primary text-label-md font-label-md hover:underline flex items-center font-medium"
            >
              View all topics{' '}
              <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-4 py-2 rounded-full text-label-sm font-label-sm border transition-all ${
                  selectedTopic === t
                    ? 'bg-secondary text-white border-secondary shadow-sm font-semibold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant border-outline-variant'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
