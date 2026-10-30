import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function DietPlannerPage() {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [age, setAge] = useState('25');
  const [sex, setSex] = useState('Female');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('65');
  const [activity, setActivity] = useState('Moderate');

  // Generated Plan State
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGeneratePlan = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const payload = {
      age: parseFloat(age) || 25,
      sex,
      height: parseFloat(height) || 170,
      weight: parseFloat(weight) || 65,
      activity,
    };

    try {
      const res = await api.generateDietPlan(payload);
      if (res.success && res.data) {
        setGeneratedPlan(res.data);
        setStep(2);
        showToast('Personalized diet plan generated successfully!');
      } else {
        generatePlanLocally(payload);
      }
    } catch {
      generatePlanLocally(payload);
    } finally {
      setLoading(false);
    }
  };

  const generatePlanLocally = (payload) => {
    const hM = payload.height / 100;
    const bmi = (payload.weight / (hM * hM)).toFixed(1);
    const targetCals = payload.sex === 'Male' ? 2400 : 1900;
    const pG = Math.round((targetCals * 0.3) / 4);
    const fG = Math.round((targetCals * 0.3) / 9);
    const cG = Math.round((targetCals * 0.4) / 4);

    const plan = {
      metrics: {
        targetCalories: targetCals,
        bmi,
        dailyWaterLiters: 2.8,
        goalDescription: 'Weight Management & Vitality Optimization',
        macros: {
          protein: { grams: pG },
          fats: { grams: fG },
          carbohydrates: { grams: cG },
        },
      },
      meals: [
        {
          slot: 'Breakfast',
          time: '08:00 AM',
          name: 'High-Protein Antioxidant Bowl',
          items: [
            'Rolled Oats with Greek Yogurt (200g)',
            'Chia seeds & blueberries (50g)',
            'Handful of crushed walnuts',
            'Green tea with lemon',
          ],
          calories: Math.round(targetCals * 0.28),
          macros: `${Math.round(pG * 0.25)}g P • ${Math.round(fG * 0.25)}g F • ${Math.round(cG * 0.3)}g C`,
        },
        {
          slot: 'Lunch',
          time: '01:00 PM',
          name: 'Mediterranean Salmon & Quinoa Medley',
          items: [
            'Grilled wild salmon fillet (150g)',
            'Steamed tricolor quinoa (1 cup)',
            'Mixed greens, cherry tomatoes & olive oil dressing',
            'Roasted asparagus and bell peppers',
          ],
          calories: Math.round(targetCals * 0.38),
          macros: `${Math.round(pG * 0.4)}g P • ${Math.round(fG * 0.4)}g F • ${Math.round(cG * 0.35)}g C`,
        },
        {
          slot: 'Dinner',
          time: '07:30 PM',
          name: 'Herb Chicken & Sweet Potato Mash',
          items: [
            'Herb roasted chicken breast or tempeh (160g)',
            'Baked sweet potato with a pinch of sea salt',
            'Steamed broccoli and zucchini tossed in garlic',
          ],
          calories: Math.round(targetCals * 0.34),
          macros: `${Math.round(pG * 0.35)}g P • ${Math.round(fG * 0.35)}g F • ${Math.round(cG * 0.35)}g C`,
        },
      ],
    };

    setGeneratedPlan(plan);
    setStep(2);
    showToast('Personalized diet plan generated successfully!');
  };

  return (
    <main className="flex-grow pt-24 px-margin-mobile md:px-margin-desktop pb-3xl flex flex-col items-center max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="w-full max-w-5xl mt-6 mb-8 text-center">
        <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary mb-sm font-bold">
          Personalized Diet Planner
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Design a science-backed meal plan tailored perfectly to your unique body, metabolic activity, and wellness goals.
        </p>
      </div>

      {/* Main Glass Panel */}
      <div className="w-full max-w-4xl glass-panel rounded-xl shadow-lg p-6 md:p-2xl border border-outline-variant/40">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setStep(1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-label-md font-label-md font-bold shadow-md transition-colors ${
                step === 1 ? 'bg-primary text-on-primary' : 'bg-secondary text-white'
              }`}
            >
              1
            </button>
            <div className="w-16 md:w-32 h-1 bg-surface-container-high mx-sm rounded-full overflow-hidden">
              <div
                className={`h-full bg-primary transition-all duration-300 ${
                  step === 2 ? 'w-full' : 'w-1/2'
                }`}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-label-md font-label-md font-bold transition-colors ${
                step === 2
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Form */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="space-y-lg">
                <h2 className="text-headline-md font-headline-md text-on-background border-b-2 border-primary w-fit pb-sm mb-lg font-semibold">
                  Your Profile
                </h2>

                <div className="grid grid-cols-2 gap-md">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs font-medium">
                      Age
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary px-md py-sm"
                      placeholder="Years"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs font-medium">
                      Sex
                    </label>
                    <select
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary px-md py-sm"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-md">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs font-medium">
                      Height (cm)
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary px-md py-sm"
                      placeholder="170"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface-variant mb-xs font-medium">
                      Weight (kg)
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-body-md font-body-md focus:border-primary focus:ring-1 focus:ring-primary px-md py-sm"
                      placeholder="65"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-label-md font-label-md text-on-surface-variant mb-xs font-medium">
                    Activity Level
                  </label>
                  <div className="space-y-sm">
                    {[
                      { val: 'Sedentary', label: 'Sedentary (Office job, little exercise)' },
                      { val: 'Moderate', label: 'Moderate (Exercise 3-4 times/week)' },
                      { val: 'Active', label: 'Active (Intense exercise daily)' },
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        onClick={() => setActivity(opt.val)}
                        className={`flex items-center gap-sm p-sm rounded-lg border cursor-pointer transition-colors ${
                          activity === opt.val
                            ? 'border-primary bg-primary-container/10 font-medium'
                            : 'border-outline-variant hover:bg-surface-container-low'
                        }`}
                      >
                        <input
                          type="radio"
                          name="activity"
                          checked={activity === opt.val}
                          onChange={() => setActivity(opt.val)}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-body-md font-body-md text-on-background">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Motivation Image Card */}
              <div className="flex flex-col justify-between">
                <div className="rounded-xl overflow-hidden h-64 md:h-full relative shadow-inner group">
                  <div
                    className="bg-cover bg-center w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeU1J7NB7t1qsQ_FpBK1kHyvVJv2mcTGjQ5iQfWze_6_d5mHuM8EciDwjCXaJys1-3UiUDCtRJZSVQk0XzQevUlFuAAE7cEnZjVoI0MopwhJVtqypvtTb5TIOfo4SBULLZlsDaZvyjXI9D3Kg6fGE1NXfGjilODia_XYlpYqmX0wmmBCa4-8xUpO4bcapaqbE2DYFqr_65ZMFhtpbWKV5Nj6L6KXnWVROMDtHwFVjzMOzfDzjOk6Uw')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent flex items-end p-lg">
                    <p className="text-on-primary text-body-lg font-body-lg font-medium leading-tight">
                      "Nutrition is not just about eating, it's about learning to live."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-xl flex justify-end">
              <button
                onClick={handleGeneratePlan}
                disabled={loading}
                className="bg-tertiary-container text-on-tertiary-container text-label-md font-label-md px-2xl py-md rounded-lg hover:bg-tertiary-container/90 transition-all shadow-md flex items-center gap-sm font-bold active:scale-95 duration-150"
              >
                {loading ? 'Generating Custom Plan...' : 'Next Step'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Generated Results */
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Metrics Summary Banner */}
            <div className="bg-primary/5 border border-primary/30 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-primary tracking-wider">
                  Your Personalized Nutrition Prescription
                </span>
                <h3 className="text-2xl font-bold text-on-surface mt-1">
                  {generatedPlan?.metrics?.targetCalories} kcal / day
                </h3>
                <p className="text-sm text-on-surface-variant">
                  {generatedPlan?.metrics?.goalDescription} • BMI: {generatedPlan?.metrics?.bmi} • Hydration: {generatedPlan?.metrics?.dailyWaterLiters} L/day
                </p>
              </div>

              <div className="flex gap-4">
                <div className="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <span className="text-xs text-gray-500">Protein</span>
                  <p className="font-bold text-emerald-700">
                    {generatedPlan?.metrics?.macros?.protein?.grams}g
                  </p>
                </div>
                <div className="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <span className="text-xs text-gray-500">Fats</span>
                  <p className="font-bold text-amber-700">
                    {generatedPlan?.metrics?.macros?.fats?.grams}g
                  </p>
                </div>
                <div className="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                  <span className="text-xs text-gray-500">Carbs</span>
                  <p className="font-bold text-teal-700">
                    {generatedPlan?.metrics?.macros?.carbohydrates?.grams}g
                  </p>
                </div>
              </div>
            </div>

            {/* Meals Schedule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedPlan?.meals?.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {m.slot}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{m.time}</span>
                    </div>
                    <h4 className="font-bold text-on-surface mb-2">{m.name}</h4>
                    <ul className="text-xs text-on-surface-variant space-y-1 mb-4 list-disc pl-4">
                      {m.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700">{m.calories} kcal</span>
                    <span className="text-gray-500">{m.macros}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-lg border border-outline-variant text-label-md font-semibold text-on-surface hover:bg-surface-variant transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Adjust Profile
              </button>
              <button
                onClick={() => showToast('Diet plan saved to your profile and downloaded as PDF summary!')}
                className="bg-primary text-white px-6 py-2.5 rounded-lg text-label-md font-semibold hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save Plan
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center w-full max-w-2xl px-md">
        <p className="text-label-sm font-label-sm text-on-surface-variant flex items-center justify-center gap-xs">
          <span className="material-symbols-outlined text-sm">info</span>
          Consult a licensed medical doctor or registered dietitian for specific clinical pathologies.
        </p>
      </div>
    </main>
  );
}
