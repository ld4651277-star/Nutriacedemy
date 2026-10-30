import React, { useState } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export default function ToolsPage() {
  const { showToast } = useToast();

  // BMI State
  const [bmiHeight, setBmiHeight] = useState('175');
  const [bmiWeight, setBmiWeight] = useState('70');
  const [bmiResult, setBmiResult] = useState({
    bmi: 22.9,
    category: 'Normal Weight',
    minKg: 56.7,
    maxKg: 76.6,
  });
  const [bmiLoading, setBmiLoading] = useState(false);

  // BMR State
  const [bmrAge, setBmrAge] = useState('25');
  const [bmrGender, setBmrGender] = useState('Male');
  const [bmrHeight, setBmrHeight] = useState('175');
  const [bmrWeight, setBmrWeight] = useState('70');
  const [bmrResult, setBmrResult] = useState(null);
  const [bmrLoading, setBmrLoading] = useState(false);

  // TDEE State
  const [tdeeBmr, setTdeeBmr] = useState('1650');
  const [tdeeActivity, setTdeeActivity] = useState('Sedentary');
  const [tdeeResult, setTdeeResult] = useState(null);
  const [tdeeLoading, setTdeeLoading] = useState(false);

  // Macro State
  const [macroCalories, setMacroCalories] = useState('2000');
  const [macroGoal, setMacroGoal] = useState('Fat Loss (High Protein)');
  const [macroResult, setMacroResult] = useState({
    totalCalories: 2000,
    goal: 'Fat Loss (High Protein)',
    split: {
      protein: { percentage: 30, grams: 150, calories: 600 },
      fats: { percentage: 35, grams: 78, calories: 700 },
      carbs: { percentage: 35, grams: 175, calories: 700 },
    },
  });
  const [macroLoading, setMacroLoading] = useState(false);

  // Handlers
  const handleCalculateBmi = async () => {
    const h = parseFloat(bmiHeight);
    const w = parseFloat(bmiWeight);
    if (!h || !w || h <= 0 || w <= 0) {
      showToast('Please enter valid height and weight values.', 'error');
      return;
    }

    setBmiLoading(true);
    try {
      const res = await api.calculateBmi(h, w);
      if (res.success && res.data) {
        setBmiResult({
          bmi: res.data.bmi,
          category: res.data.category,
          minKg: res.data.healthyWeightRange.minKg,
          maxKg: res.data.healthyWeightRange.maxKg,
        });
        showToast(`BMI calculated: ${res.data.bmi} (${res.data.category})`);
      } else {
        calculateBmiLocally(h, w);
      }
    } catch {
      calculateBmiLocally(h, w);
    } finally {
      setBmiLoading(false);
    }
  };

  const calculateBmiLocally = (h, w) => {
    const heightInMeters = h / 100;
    const bmiVal = parseFloat((w / (heightInMeters * heightInMeters)).toFixed(1));
    let cat = 'Normal Weight';
    if (bmiVal < 18.5) cat = 'Underweight';
    else if (bmiVal >= 25 && bmiVal < 30) cat = 'Overweight';
    else if (bmiVal >= 30) cat = 'Obese';

    setBmiResult({
      bmi: bmiVal,
      category: cat,
      minKg: parseFloat((18.5 * heightInMeters * heightInMeters).toFixed(1)),
      maxKg: parseFloat((24.9 * heightInMeters * heightInMeters).toFixed(1)),
    });
    showToast(`BMI calculated: ${bmiVal} (${cat})`);
  };

  const handleCalculateBmr = async () => {
    const age = parseFloat(bmrAge) || 25;
    const h = parseFloat(bmrHeight) || 175;
    const w = parseFloat(bmrWeight) || 70;

    setBmrLoading(true);
    try {
      const res = await api.calculateBmr({ age, gender: bmrGender, height: h, weight: w });
      if (res.success && res.data) {
        setBmrResult(res.data);
        setTdeeBmr(res.data.bmr.toString());
        showToast(`BMR: ${res.data.bmr} kcal/day`);
      } else {
        calculateBmrLocally(age, bmrGender, h, w);
      }
    } catch {
      calculateBmrLocally(age, bmrGender, h, w);
    } finally {
      setBmrLoading(false);
    }
  };

  const calculateBmrLocally = (age, gender, h, w) => {
    // Mifflin-St Jeor Formula
    let bmr = 10 * w + 6.25 * h - 5 * age + (gender === 'Male' ? 5 : -161);
    bmr = Math.round(bmr);
    setBmrResult({
      bmr,
      formulaUsed: 'Mifflin-St Jeor Equation',
    });
    setTdeeBmr(bmr.toString());
    showToast(`BMR calculated: ${bmr} kcal/day`);
  };

  const handleCalculateTdee = async () => {
    const bmr = parseFloat(tdeeBmr) || 1650;
    setTdeeLoading(true);
    try {
      const res = await api.calculateTdee({ bmr, activityLevel: tdeeActivity });
      if (res.success && res.data) {
        setTdeeResult(res.data);
        setMacroCalories(res.data.tdee.toString());
        showToast(`TDEE: ${res.data.tdee} kcal/day`);
      } else {
        calculateTdeeLocally(bmr, tdeeActivity);
      }
    } catch {
      calculateTdeeLocally(bmr, tdeeActivity);
    } finally {
      setTdeeLoading(false);
    }
  };

  const calculateTdeeLocally = (bmr, act) => {
    const multipliers = {
      Sedentary: 1.2,
      'Lightly active': 1.375,
      'Moderately active': 1.55,
      'Very active': 1.725,
    };
    const factor = multipliers[act] || 1.2;
    const tdee = Math.round(bmr * factor);
    setTdeeResult({
      tdee,
      activityLevel: act,
      energyTargets: {
        moderateWeightLoss: tdee - 500,
        mildWeightLoss: tdee - 250,
        maintenance: tdee,
        muscleGain: tdee + 300,
      },
    });
    setMacroCalories(tdee.toString());
    showToast(`TDEE: ${tdee} kcal/day`);
  };

  const handleGenerateMacros = async (targetGoal = macroGoal) => {
    const cals = parseFloat(macroCalories) || 2000;
    setMacroLoading(true);
    try {
      const res = await api.calculateMacros({ targetCalories: cals, goal: targetGoal });
      if (res.success && res.data) {
        setMacroResult(res.data);
        showToast(`Macros updated for ${res.data.totalCalories} kcal`);
      } else {
        generateMacrosLocally(cals, targetGoal);
      }
    } catch {
      generateMacrosLocally(cals, targetGoal);
    } finally {
      setMacroLoading(false);
    }
  };

  const generateMacrosLocally = (cals, goal) => {
    let pPct = 30, fPct = 35, cPct = 35;
    if (goal.includes('Fat Loss')) {
      pPct = 35; fPct = 30; cPct = 35;
    } else if (goal.includes('Muscle Gain')) {
      pPct = 30; fPct = 25; cPct = 45;
    } else {
      pPct = 25; fPct = 30; cPct = 45;
    }

    const pKcal = Math.round((cals * pPct) / 100);
    const fKcal = Math.round((cals * fPct) / 100);
    const cKcal = Math.round((cals * cPct) / 100);

    setMacroResult({
      totalCalories: cals,
      goal,
      split: {
        protein: { percentage: pPct, grams: Math.round(pKcal / 4), calories: pKcal },
        fats: { percentage: fPct, grams: Math.round(fKcal / 9), calories: fKcal },
        carbs: { percentage: cPct, grams: Math.round(cKcal / 4), calories: cKcal },
      },
    });
    showToast(`Macros updated: ${cals} kcal`);
  };

  return (
    <main className="flex-grow pt-28 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <header className="mb-2xl text-center md:text-left">
        <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-on-surface mb-sm font-bold">
          Nutrition Calculators
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          A comprehensive suite of clinical & educational tools to determine energy requirements, body composition metrics, and macronutrient distributions.
        </p>
      </header>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
        {/* 1. BMI Calculator Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-2px_rgba(0,0,0,0.02)] p-lg flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <div className="flex items-start gap-md mb-md">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">accessibility_new</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-xs font-semibold">
                BMI Calculator
              </h2>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Body Mass Index estimates body fat based on height and weight.
              </p>
            </div>
          </div>

          <div className="space-y-md flex-grow">
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                Height (cm)
              </label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-on-surface"
                placeholder="e.g. 175"
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                Weight (kg)
              </label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-on-surface"
                placeholder="e.g. 70"
                type="number"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-lg">
            <button
              onClick={handleCalculateBmi}
              disabled={bmiLoading}
              className="w-full bg-surface-container-high text-on-surface text-label-md font-label-md py-3 rounded-lg hover:bg-surface-variant transition-colors flex justify-center items-center gap-xs font-bold border border-outline-variant/30"
            >
              {bmiLoading ? 'Calculating...' : 'Calculate BMI'}
            </button>

            {bmiResult && (
              <div className="mt-md bg-surface-container-low border border-primary/20 rounded-lg p-md text-center animate-in fade-in">
                <span className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">
                  Your Calculated BMI
                </span>
                <span className="text-headline-md font-headline-md text-primary font-bold">
                  {bmiResult.bmi}
                </span>
                <span className="block text-label-md font-label-md text-on-surface mt-xs font-bold">
                  {bmiResult.category}
                </span>
                {bmiResult.minKg && bmiResult.maxKg && (
                  <span className="block text-xs text-on-surface-variant mt-1">
                    Healthy Range: {bmiResult.minKg} - {bmiResult.maxKg} kg
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 2. BMR Calculator Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-2px_rgba(0,0,0,0.02)] p-lg flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
          <div className="flex items-start gap-md mb-md">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-xs font-semibold">
                BMR Calculator
              </h2>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Basal Metabolic Rate is the minimum energy expended at rest.
              </p>
            </div>
          </div>

          <div className="space-y-md flex-grow">
            <div className="flex gap-md">
              <div className="flex-1">
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Age
                </label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                  placeholder="Years"
                  type="number"
                  value={bmrAge}
                  onChange={(e) => setBmrAge(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Gender
                </label>
                <select
                  value={bmrGender}
                  onChange={(e) => setBmrGender(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex gap-md">
              <div className="flex-1">
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Height (cm)
                </label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                  placeholder="175"
                  type="number"
                  value={bmrHeight}
                  onChange={(e) => setBmrHeight(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Weight (kg)
                </label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                  placeholder="70"
                  type="number"
                  value={bmrWeight}
                  onChange={(e) => setBmrWeight(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-lg">
            <button
              onClick={handleCalculateBmr}
              disabled={bmrLoading}
              className="w-full bg-surface-container-high text-on-surface text-label-md font-label-md py-3 rounded-lg hover:bg-surface-variant transition-colors flex justify-center items-center gap-xs font-bold border border-outline-variant/30"
            >
              {bmrLoading ? 'Calculating...' : 'Calculate BMR'}
            </button>

            {bmrResult && (
              <div className="mt-md bg-surface-container-low border border-secondary/20 rounded-lg p-md text-center animate-in fade-in">
                <span className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">
                  Basal Metabolic Rate
                </span>
                <span className="text-headline-md font-headline-md text-secondary font-bold">
                  {bmrResult.bmr} kcal/day
                </span>
                <span className="block text-xs text-on-surface-variant mt-1">
                  {bmrResult.formulaUsed || 'Mifflin-St Jeor Equation'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 3. TDEE Calculator Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-2px_rgba(0,0,0,0.02)] p-lg flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-tertiary"></div>
          <div className="flex items-start gap-md mb-md">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined">directions_run</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-xs font-semibold">
                TDEE Calculator
              </h2>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Total Daily Energy Expenditure based on physical activity factors.
              </p>
            </div>
          </div>

          <div className="space-y-md flex-grow">
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                BMR (kcal)
              </label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all"
                placeholder="Enter BMR or calculate above"
                type="number"
                value={tdeeBmr}
                onChange={(e) => setTdeeBmr(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                Activity Level
              </label>
              <select
                value={tdeeActivity}
                onChange={(e) => setTdeeActivity(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-tertiary focus:border-tertiary transition-all"
              >
                <option value="Sedentary">Sedentary (Little or no exercise)</option>
                <option value="Lightly active">Lightly active (Exercise 1-3 days/wk)</option>
                <option value="Moderately active">Moderately active (Exercise 3-5 days/wk)</option>
                <option value="Very active">Very active (Hard exercise 6-7 days/wk)</option>
              </select>
            </div>
          </div>

          <div className="mt-lg">
            <button
              onClick={handleCalculateTdee}
              disabled={tdeeLoading}
              className="w-full bg-surface-container-high text-on-surface text-label-md font-label-md py-3 rounded-lg hover:bg-surface-variant transition-colors flex justify-center items-center gap-xs font-bold border border-outline-variant/30"
            >
              {tdeeLoading ? 'Calculating...' : 'Calculate TDEE'}
            </button>

            {tdeeResult && (
              <div className="mt-md bg-surface-container-low border border-tertiary/20 rounded-lg p-md text-center animate-in fade-in">
                <span className="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">
                  Daily Energy Expenditure
                </span>
                <span className="text-headline-md font-headline-md text-tertiary font-bold">
                  {tdeeResult.tdee} kcal/day
                </span>
                {tdeeResult.energyTargets && (
                  <span className="block text-xs text-on-surface-variant mt-1">
                    Weight Loss Target: {tdeeResult.energyTargets.moderateWeightLoss} kcal
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4. Macronutrient Distribution Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_6px_-2px_rgba(0,0,0,0.02)] p-lg flex flex-col relative overflow-hidden md:col-span-2 xl:col-span-3">
          <div className="absolute top-0 left-0 w-full h-1 bg-on-secondary-container"></div>
          <div className="flex items-start gap-md mb-lg">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-secondary-container shrink-0">
              <span className="material-symbols-outlined">pie_chart</span>
            </div>
            <div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-xs font-semibold">
                Macronutrient Distribution
              </h2>
              <p className="text-label-sm font-label-sm text-on-surface-variant">
                Distribute total daily calories into proteins, fats, and carbohydrates based on specific dietary goals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl items-center">
            <div className="space-y-md">
              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Target Calories (kcal)
                </label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md font-body-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                  placeholder="e.g. 2000"
                  type="number"
                  value={macroCalories}
                  onChange={(e) => setMacroCalories(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-label-md font-label-md text-on-surface mb-xs font-medium">
                  Dietary Goal
                </label>
                <div className="flex gap-xs mt-sm flex-wrap">
                  {['Maintenance', 'Fat Loss (High Protein)', 'Muscle Gain'].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => {
                        setMacroGoal(goal);
                        handleGenerateMacros(goal);
                      }}
                      className={`px-3 py-1.5 rounded-full text-label-sm font-label-sm transition-all ${
                        macroGoal === goal
                          ? 'bg-primary-container text-on-primary-container font-semibold border border-primary/20 shadow-sm'
                          : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleGenerateMacros()}
                disabled={macroLoading}
                className="w-full mt-sm bg-primary text-on-primary text-label-md font-label-md py-3 rounded-lg hover:bg-surface-tint shadow-sm transition-all flex justify-center items-center gap-xs font-bold"
              >
                {macroLoading ? 'Calculating...' : 'Generate Split'}
              </button>
            </div>

            {/* Visual Result Area */}
            <div className="md:col-span-2 bg-surface-container-low rounded-lg p-lg border border-outline-variant/30 flex flex-col justify-center">
              <div className="flex justify-between items-end mb-md">
                <span className="text-label-md font-label-md text-on-surface font-bold">
                  Suggested Split ({macroResult.goal})
                </span>
                <span className="text-body-md font-body-md text-on-surface-variant font-medium">
                  {macroResult.totalCalories} kcal total
                </span>
              </div>

              {/* Stacked Progress Bar */}
              <div className="w-full h-8 flex rounded-md overflow-hidden mb-lg shadow-inner">
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{ width: `${macroResult.split.protein.percentage}%` }}
                  title={`Protein: ${macroResult.split.protein.percentage}%`}
                ></div>
                <div
                  className="h-full bg-tertiary-container transition-all duration-500"
                  style={{ width: `${macroResult.split.fats.percentage}%` }}
                  title={`Fat: ${macroResult.split.fats.percentage}%`}
                ></div>
                <div
                  className="h-full bg-surface-dim transition-all duration-500"
                  style={{ width: `${macroResult.split.carbs.percentage}%` }}
                  title={`Carbs: ${macroResult.split.carbs.percentage}%`}
                ></div>
              </div>

              {/* Macro Cards */}
              <div className="grid grid-cols-3 gap-md text-center">
                <div className="bg-white/60 p-2 rounded-lg border border-outline-variant/30">
                  <div className="flex items-center justify-center gap-xs mb-xs">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      Protein ({macroResult.split.protein.percentage}%)
                    </span>
                  </div>
                  <span className="text-headline-md font-headline-md text-on-surface block font-bold">
                    {macroResult.split.protein.grams}g
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">
                    {macroResult.split.protein.calories} kcal
                  </span>
                </div>

                <div className="bg-white/60 p-2 rounded-lg border border-outline-variant/30">
                  <div className="flex items-center justify-center gap-xs mb-xs">
                    <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      Fats ({macroResult.split.fats.percentage}%)
                    </span>
                  </div>
                  <span className="text-headline-md font-headline-md text-on-surface block font-bold">
                    {macroResult.split.fats.grams}g
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">
                    {macroResult.split.fats.calories} kcal
                  </span>
                </div>

                <div className="bg-white/60 p-2 rounded-lg border border-outline-variant/30">
                  <div className="flex items-center justify-center gap-xs mb-xs">
                    <div className="w-3 h-3 rounded-full bg-surface-dim"></div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      Carbs ({macroResult.split.carbs.percentage}%)
                    </span>
                  </div>
                  <span className="text-headline-md font-headline-md text-on-surface block font-bold">
                    {macroResult.split.carbs.grams}g
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant">
                    {macroResult.split.carbs.calories} kcal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
