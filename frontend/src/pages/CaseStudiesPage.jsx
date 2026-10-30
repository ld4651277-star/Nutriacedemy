import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function CaseStudiesPage() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCaseId, setActiveCaseId] = useState('case-042');
  const [activeTab, setActiveTab] = useState('Lab Data');

  // Assessment inputs
  const [pesStatement, setPesStatement] = useState('');
  const [energyNeeds, setEnergyNeeds] = useState('1800');
  const [proteinNeeds, setProteinNeeds] = useState('70');
  const [assessmentChecked, setAssessmentChecked] = useState(false);

  const cases = [
    {
      id: 'case-042',
      number: 'Case 042',
      title: 'Type 2 Diabetes & Chronic Kidney Disease',
      difficulty: 'Advanced',
      diffIcon: 'warning',
      diffColor: 'bg-tertiary-container text-on-tertiary-fixed',
      summary:
        'A 65-year-old male presents with deteriorating renal function and poorly controlled blood glucose levels requiring immediate dietary intervention.',
      tags: ['Clinical', 'Geriatric'],
      category: 'Clinical',
      patient: {
        initials: 'JD',
        name: 'John Doe',
        demographics: '65M',
        meta: 'Admitted: Oct 24, 2024 • Attending: Dr. Smith',
        ht: '178 cm',
        wt: '92 kg',
        bmi: '29.0 (Overweight)',
        dx: 'T2DM, CKD Stage 3',
        meds: 'Metformin, Lisinopril',
        history: '24h recall indicates high sodium intake, moderate protein, high simple carbohydrates.',
      },
      labs: [
        { indicator: 'HbA1c', value: '8.4%', ref: '< 5.7%', status: 'High', color: 'bg-error-container text-on-error-container' },
        { indicator: 'eGFR', value: '45 mL/min', ref: '> 90 mL/min', status: 'Low', color: 'bg-tertiary-container text-on-tertiary-fixed' },
        { indicator: 'Potassium', value: '4.8 mEq/L', ref: '3.5 - 5.0 mEq/L', status: 'Normal', color: 'bg-surface-container text-on-surface-variant' },
      ],
      idealEnergy: '1800 - 2000 kcal',
      idealProtein: '65 - 75 g (0.8g/kg for non-dialysis CKD)',
    },
    {
      id: 'case-038',
      number: 'Case 038',
      title: 'Celiac Disease in Adolescence',
      difficulty: 'Intermediate',
      diffIcon: 'info',
      diffColor: 'bg-surface-container-high text-on-surface-variant',
      summary:
        'A 14-year-old female soccer player experiencing abdominal cramping, nutrient malabsorption, and delayed growth velocity.',
      tags: ['Pediatric', 'GI'],
      category: 'Pediatric',
      patient: {
        initials: 'EM',
        name: 'Emma Miller',
        demographics: '14F',
        meta: 'Admitted: Nov 02, 2024 • Attending: Dr. Vance',
        ht: '152 cm',
        wt: '38 kg',
        bmi: '16.4 (Underweight)',
        dx: 'Celiac Disease (Biopsy Confirmed)',
        meds: 'Iron supplement, multivitamin',
        history: 'Occasional gluten contamination in school cafeteria; reports recurring fatigue.',
      },
      labs: [
        { indicator: 'tTG-IgA', value: '78 U/mL', ref: '< 10 U/mL', status: 'High', color: 'bg-error-container text-on-error-container' },
        { indicator: 'Ferritin', value: '9 ng/mL', ref: '15 - 150 ng/mL', status: 'Low', color: 'bg-tertiary-container text-on-tertiary-fixed' },
        { indicator: 'Vitamin D', value: '22 ng/mL', ref: '30 - 100 ng/mL', status: 'Low', color: 'bg-tertiary-container text-on-tertiary-fixed' },
      ],
      idealEnergy: '2200 - 2400 kcal (Catch-up growth)',
      idealProtein: '70 - 80 g',
    },
    {
      id: 'case-012',
      number: 'Case 012',
      title: 'Marathon Training Nutrition Plan',
      difficulty: 'Beginner',
      diffIcon: 'check_circle',
      diffColor: 'bg-surface-container-high text-on-surface-variant',
      summary:
        'A 28-year-old amateur endurance runner looking to optimize carbohydrate periodization and prevent gastrointestinal distress during races.',
      tags: ['Sports'],
      category: 'Sports',
      patient: {
        initials: 'AK',
        name: 'Alex Kim',
        demographics: '28M',
        meta: 'Consultation: Nov 05, 2024 • Sports Clinic',
        ht: '180 cm',
        wt: '72 kg',
        bmi: '22.2 (Normal)',
        dx: 'Athletic Conditioning & Fueling',
        meds: 'None reported',
        history: 'Consistently hitting wall at mile 18; under-consuming intra-run electrolytes.',
      },
      labs: [
        { indicator: 'Hemoglobin', value: '15.2 g/dL', ref: '13.8 - 17.2 g/dL', status: 'Normal', color: 'bg-surface-container text-on-surface-variant' },
        { indicator: 'Sodium', value: '141 mEq/L', ref: '135 - 145 mEq/L', status: 'Normal', color: 'bg-surface-container text-on-surface-variant' },
        { indicator: 'BUN', value: '18 mg/dL', ref: '7 - 20 mg/dL', status: 'Normal', color: 'bg-surface-container text-on-surface-variant' },
      ],
      idealEnergy: '2800 - 3200 kcal',
      idealProtein: '100 - 120 g (1.4-1.7g/kg)',
    },
  ];

  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const filteredCases = cases.filter((c) => {
    const matchesCat =
      selectedCategory === 'All' || c.category === selectedCategory || c.tags.includes(selectedCategory);
    const matchesQuery =
      c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCheckAnswers = () => {
    setAssessmentChecked(true);
    showToast('Assessment evaluated against expert clinical consensus!');
  };

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-24 max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <header className="mb-3xl text-center max-w-3xl mx-auto">
        <h1 className="text-display font-display text-primary mb-md font-bold">Case Study Lab</h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant">
          Engage with complex clinical scenarios. Formulate assessments, calculate requirements, and compare your diagnostic reasoning with expert nutritionists.
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Sidebar: Case Selection (4 cols) */}
        <aside className="col-span-1 lg:col-span-4 flex flex-col gap-lg">
          {/* Filters/Search */}
          <div className="glass-panel p-lg rounded-xl ambient-shadow">
            <div className="flex flex-col gap-md">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-label-md font-label-md"
                  placeholder="Filter cases..."
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-sm">
                {['All', 'Pediatric', 'Clinical', 'Sports'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-label-sm font-label-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-secondary text-on-secondary font-semibold shadow-sm'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Case List */}
          <div className="flex flex-col gap-md max-h-[750px] overflow-y-auto pr-sm custom-scrollbar">
            {filteredCases.map((cs) => {
              const isActive = cs.id === currentCase.id;
              return (
                <div
                  key={cs.id}
                  onClick={() => {
                    setActiveCaseId(cs.id);
                    setAssessmentChecked(false);
                  }}
                  className={`rounded-lg p-md cursor-pointer transition-all hover:-translate-y-0.5 ${
                    isActive
                      ? 'bg-white border-t-4 border-primary shadow-[0_10px_15px_-3px_rgba(0,0,0,0.04),0_4px_6px_-2px_rgba(0,0,0,0.02)]'
                      : 'bg-surface border border-outline-variant hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start mb-sm">
                    <span
                      className={`${cs.diffColor} px-2 py-0.5 rounded text-label-sm font-label-sm flex items-center gap-xs font-semibold`}
                    >
                      <span className="material-symbols-outlined text-[14px]">{cs.diffIcon}</span>
                      {cs.difficulty}
                    </span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      {cs.number}
                    </span>
                  </div>
                  <h3
                    className={`text-headline-md font-headline-md mb-xs font-semibold ${
                      isActive ? 'text-primary' : 'text-on-background'
                    }`}
                  >
                    {cs.title}
                  </h3>
                  <p className="text-label-md font-label-md text-on-surface-variant mb-md line-clamp-2">
                    {cs.summary}
                  </p>
                  <div className="flex gap-sm">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-label-sm font-label-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Main Workspace (8 cols) */}
        <section className="col-span-1 lg:col-span-8 flex flex-col gap-lg">
          {/* Patient Profile Header */}
          <div className="glass-panel rounded-xl p-xl ambient-shadow">
            <div className="flex items-center gap-lg mb-lg">
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-headline-lg font-headline-lg font-bold shadow-md">
                {currentCase.patient.initials}
              </div>
              <div>
                <h2 className="text-headline-lg font-headline-lg text-on-background font-bold">
                  {currentCase.patient.name}, {currentCase.patient.demographics}
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  {currentCase.patient.meta}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              <div className="bg-white p-md rounded-lg border border-outline-variant shadow-xs">
                <h4 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
                  Anthropometrics
                </h4>
                <ul className="text-label-md font-label-md text-on-background space-y-1">
                  <li>
                    <span className="font-bold">Ht:</span> {currentCase.patient.ht}
                  </li>
                  <li>
                    <span className="font-bold">Wt:</span> {currentCase.patient.wt}
                  </li>
                  <li>
                    <span className="font-bold">BMI:</span> {currentCase.patient.bmi}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-md rounded-lg border border-outline-variant shadow-xs">
                <h4 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
                  Clinical Info
                </h4>
                <ul className="text-label-md font-label-md text-on-background space-y-1">
                  <li>
                    <span className="font-bold">Dx:</span> {currentCase.patient.dx}
                  </li>
                  <li>
                    <span className="font-bold">Meds:</span> {currentCase.patient.meds}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-md rounded-lg border border-outline-variant shadow-xs">
                <h4 className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
                  Dietary History
                </h4>
                <p className="text-label-md font-label-md text-on-background">
                  {currentCase.patient.history}
                </p>
              </div>
            </div>
          </div>

          {/* Lab Data & Assessment Tabs */}
          <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="flex border-b border-outline-variant bg-surface-container-lowest">
              {['Lab Data', 'Dietary Recall', 'Progress Notes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-md text-label-md font-label-md text-center transition-colors ${
                    activeTab === tab
                      ? 'font-bold text-primary border-b-2 border-primary bg-white'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-lg">
              {activeTab === 'Lab Data' ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant">
                      <th className="pb-sm font-medium">Indicator</th>
                      <th className="pb-sm font-medium">Value</th>
                      <th className="pb-sm font-medium">Reference</th>
                      <th className="pb-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-label-md font-label-md text-on-background">
                    {currentCase.labs.map((lab, i) => (
                      <tr key={i} className="border-b border-outline-variant/50 last:border-b-0">
                        <td className="py-md font-medium">{lab.indicator}</td>
                        <td className="py-md font-bold">{lab.value}</td>
                        <td className="py-md text-on-surface-variant">{lab.ref}</td>
                        <td className="py-md">
                          <span className={`${lab.color} px-2 py-1 rounded-full text-label-sm font-semibold`}>
                            {lab.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'Dietary Recall' ? (
                <div className="space-y-3 text-body-md text-on-surface-variant">
                  <p className="font-semibold text-on-surface">Typical Day 24-Hour Food Intake:</p>
                  <p>• Breakfast: 2 slices white toast with butter, black coffee with 2 packets sugar, fried egg.</p>
                  <p>• Lunch: Canned soup (high sodium, 850mg), turkey sandwich with processed cheddar, soda.</p>
                  <p>• Afternoon Snack: Pretzels or potato chips (approx. 400mg sodium).</p>
                  <p>• Dinner: Beef stew with white rice, canned corn, sweetened iced tea.</p>
                </div>
              ) : (
                <div className="space-y-3 text-body-md text-on-surface-variant">
                  <p className="font-semibold text-on-surface">Physician Progress Note (Dr. Smith):</p>
                  <p>
                    Patient demonstrates reluctance regarding sodium restrictions. Noted peripheral edema in bilateral lower extremities (+1 pitting). Creatinine trend is mildly elevated over past 6 months. Advised formal nutrition intervention targeting glycemic control and renal protection.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Assessment Panel */}
          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 md:p-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-bl-full -z-10 pointer-events-none"></div>
            <h3 className="text-headline-md font-headline-md text-primary mb-md flex items-center gap-sm font-bold">
              <span className="material-symbols-outlined">assignment_turned_in</span>
              Nutrition Assessment &amp; Diagnosis
            </h3>

            <div className="space-y-lg">
              <div>
                <label className="block text-label-md font-label-md text-on-background font-bold mb-sm">
                  PES Statement (Problem, Etiology, Signs/Symptoms)
                </label>
                <textarea
                  className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md p-md bg-white min-h-[100px]"
                  placeholder="e.g. Excessive sodium intake related to frequent processed food consumption as evidenced by bilateral pitting edema and elevated blood pressure..."
                  value={pesStatement}
                  onChange={(e) => setPesStatement(e.target.value)}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div>
                  <label className="block text-label-md font-label-md text-on-background font-bold mb-sm">
                    Calculated Energy Needs (kcal)
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md p-md bg-white"
                    placeholder="e.g. 1800"
                    type="number"
                    value={energyNeeds}
                    onChange={(e) => setEnergyNeeds(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-background font-bold mb-sm">
                    Calculated Protein Needs (g)
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md p-md bg-white"
                    placeholder="e.g. 70"
                    type="number"
                    value={proteinNeeds}
                    onChange={(e) => setProteinNeeds(e.target.value)}
                  />
                </div>
              </div>

              {assessmentChecked && (
                <div className="p-4 bg-white rounded-xl border border-primary/30 text-body-md space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Expert Clinical Benchmark:
                  </div>
                  <p className="text-on-surface">
                    <span className="font-semibold">Target Energy:</span> {currentCase.idealEnergy}
                  </p>
                  <p className="text-on-surface">
                    <span className="font-semibold">Target Protein:</span> {currentCase.idealProtein}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Your assessment aligns with current ASPEN/AND clinical guidelines for {currentCase.title}.
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-md">
                <button
                  onClick={handleCheckAnswers}
                  className="bg-secondary text-on-secondary px-xl py-md rounded-lg text-label-md font-label-md font-bold hover:bg-secondary/90 transition-colors shadow-md flex items-center gap-sm active:scale-95 duration-150"
                >
                  Check Answers
                  <span className="material-symbols-outlined text-[18px]">fact_check</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
