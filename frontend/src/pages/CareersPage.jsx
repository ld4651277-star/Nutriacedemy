import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function CareersPage() {
  const { showToast } = useToast();
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const pathways = [
    {
      id: 'clinical',
      title: 'Clinical Dietitian',
      icon: 'local_hospital',
      borderColor: 'border-t-primary',
      iconBg: 'bg-primary-container text-on-primary-container',
      description:
        'Work in acute and outpatient healthcare settings providing medical nutrition therapy, assessing patient needs, and developing targeted meal plans for acute and chronic disease management.',
      roadmap: [
        'Complete ACEND-accredited Bachelor’s or Master’s in Dietetics',
        'Fulfill 1,000+ hours of supervised clinical internship',
        'Pass the Commission on Dietetic Registration (CDR) board exam',
        'Obtain state licensure and optional board specialty (e.g., Renal or Oncology)',
      ],
    },
    {
      id: 'sports',
      title: 'Sports Nutrition',
      icon: 'fitness_center',
      borderColor: 'border-t-tertiary-container',
      iconBg: 'bg-surface-variant text-on-surface-variant',
      description:
        'Optimize athletic performance through tailored nutritional strategies. Advise collegiate, Olympic, and professional athletes on hydration, fueling, and recovery protocols.',
      roadmap: [
        'Foundational degree in Exercise Science or Nutritional Physiology',
        'Complete Dietetic Registration (RDN) credential',
        'Accumulate 2,000 hours of sports nutrition practice with athletes',
        'Earn the prestigious CSSD (Certified Specialist in Sports Dietetics)',
      ],
    },
    {
      id: 'public-health',
      title: 'Public Health',
      icon: 'public',
      borderColor: 'border-t-secondary',
      iconBg: 'bg-secondary-container text-on-secondary-container',
      description:
        'Focus on community well-being. Develop and implement public food programs (WIC, SNAP-Ed), influence legislation, and conduct epidemiological dietary surveys to improve population health metrics.',
      roadmap: [
        'Bachelor’s in Community Nutrition, Dietetics, or Public Health',
        'MPH (Master of Public Health) with nutrition concentration',
        'Lead community outreach initiatives and food policy advocacy coalitions',
        'Collaborate with WHO, UNICEF, or national health ministries',
      ],
    },
    {
      id: 'food-industry',
      title: 'Food Industry',
      icon: 'factory',
      borderColor: 'border-t-primary',
      iconBg: 'bg-surface-container-highest text-on-surface',
      description:
        'Consult on product development, ensure FDA/EFSA regulatory compliance, formulation optimization, and guide evidence-based marketing communications for food and beverage corporations.',
      roadmap: [
        'Degree in Food Science, Nutrition, or Culinary Arts',
        'Internship in food quality assurance and sensory evaluation labs',
        'Master nutrition label regulation (FDA nutrition facts labeling)',
        'Senior Food Scientist or Director of Corporate Regulatory Affairs',
      ],
    },
    {
      id: 'research',
      title: 'Research & Academia',
      icon: 'science',
      borderColor: 'border-t-secondary',
      iconBg: 'bg-primary-container text-on-primary-container',
      description:
        'Advance the nutritional sciences through rigorous clinical trials, biochemical research, peer-reviewed publications, and educating the next generation of dietetics professionals.',
      roadmap: [
        'Undergraduate degree with laboratory research experience',
        'Ph.D. in Nutritional Biochemistry, Molecular Nutrition, or Metabolism',
        'Postdoctoral fellowship conducting NIH or clinical trials',
        'Tenured university professorship & lead principal investigator (PI)',
      ],
    },
  ];

  const handleOpenRoadmap = (pathway) => {
    setSelectedRoadmap(pathway);
    showToast(`Loaded career milestones for ${pathway.title}`);
  };

  return (
    <main className="flex-grow pt-24 px-margin-mobile md:px-margin-desktop py-3xl flex flex-col gap-3xl max-w-7xl mx-auto w-full">
      {/* Hero Section */}
      <header className="text-center max-w-3xl mx-auto flex flex-col gap-md items-center mt-6">
        <div className="inline-flex items-center gap-xs bg-surface-container-high text-on-surface-variant px-md py-xs rounded-full text-label-sm font-label-sm mb-sm border border-outline-variant/30 font-medium">
          <span className="material-symbols-outlined text-[16px]">explore</span>
          Discover Your Path
        </div>
        <h1 className="text-display font-display text-on-background font-bold leading-tight">
          Build Your Nutrition Career
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Explore specialized pathways in the nutrition field. Understand the requirements, map out your journey, and find the resources you need to succeed as a licensed professional.
        </p>
      </header>

      {/* Interactive Pathways Grid (Bento Style) */}
      <section className="w-full">
        <h2 className="text-headline-md font-headline-md text-on-background mb-lg font-semibold">
          Career Pathways
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {pathways.map((item) => (
            <div
              key={item.id}
              className={`bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-md border-t-4 ${item.borderColor} hover:shadow-ambient hover:-translate-y-1 transition-all group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-md opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span className="material-symbols-outlined text-[80px]">{item.icon}</span>
              </div>
              <div
                className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center mb-sm shadow-sm`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
              </div>
              <h3 className="text-headline-md font-headline-md text-on-background font-bold">
                {item.title}
              </h3>
              <p className="text-body-md font-body-md text-on-surface-variant flex-grow">
                {item.description}
              </p>
              <button
                onClick={() => handleOpenRoadmap(item)}
                className="inline-flex items-center gap-xs text-primary text-label-md font-label-md group-hover:text-secondary transition-colors mt-auto pt-md border-t border-outline-variant/30 font-semibold text-left"
              >
                View Roadmap
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Detail Modal / Banner if selected */}
      {selectedRoadmap && (
        <section className="bg-white border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">alt_route</span>
              <div>
                <h3 className="text-xl font-bold text-on-background">
                  {selectedRoadmap.title} Career Roadmap
                </h3>
                <p className="text-sm text-on-surface-variant">Step-by-step professional qualification path</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRoadmap(null)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4">
            {selectedRoadmap.roadmap.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-on-surface">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Requirements & Certifications Section */}
      <section className="bg-surface-container-low rounded-xl p-6 md:p-xl border border-outline-variant/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
          {/* Qualifications */}
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-sm border-b border-outline-variant pb-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">school</span>
              <h2 className="text-headline-md font-headline-md text-on-background font-bold">
                Required Qualifications
              </h2>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Core educational milestones generally expected across clinical and specialized paths.
            </p>
            <ul className="flex flex-col gap-md">
              <li className="flex items-start gap-sm">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Bachelor's Degree
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                    In Nutrition, Dietetics, or a related science field from an accredited institution.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-sm">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Supervised Practice Program
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                    Completion of an ACEND-accredited dietetic internship or coordinated clinical program.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-sm">
                <span
                  className="material-symbols-outlined text-primary text-[20px] mt-xs"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Master's Degree (CDR Requirement)
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant mt-xs">
                    Required for CDR registration eligibility in clinical dietetics.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-lg">
            <div className="flex items-center gap-sm border-b border-outline-variant pb-sm">
              <span className="material-symbols-outlined text-tertiary-container text-[28px]">
                verified
              </span>
              <h2 className="text-headline-md font-headline-md text-on-background font-bold">
                Key Certifications
              </h2>
            </div>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Professional credentials that establish authority and specific scopes of legal practice.
            </p>
            <ul className="flex flex-col gap-md">
              <li className="flex items-start gap-sm bg-surface p-md rounded-lg border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Registered Dietitian (RD / RDN)
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant text-sm mt-xs">
                    The foundational credential for clinical practice awarded by the CDR.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-sm bg-surface p-md rounded-lg border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Certified Nutrition Specialist (CNS)
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant text-sm mt-xs">
                    Advanced certification for personalized functional nutrition professionals.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-sm bg-surface p-md rounded-lg border border-outline-variant/30">
                <span
                  className="material-symbols-outlined text-tertiary-container text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <div>
                  <h4 className="text-label-md font-label-md text-on-background font-bold">
                    Board Certified Specialist (CSSD, CSG, CSP)
                  </h4>
                  <p className="text-body-md font-body-md text-on-surface-variant text-sm mt-xs">
                    Specialized board credentials in sports, gerontology, pediatrics, or oncology.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
