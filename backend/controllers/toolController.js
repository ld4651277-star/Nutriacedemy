/**
 * Tool & Calculator Controller
 * Provides scientific formulas for nutrition and clinical assessments
 */

// BMI Calculator
exports.calculateBMI = (req, res) => {
  try {
    const { height, weight } = req.body;

    if (!height || !weight || height <= 0 || weight <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide valid positive numbers for height (cm) and weight (kg).'
      });
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = parseFloat((weightInKg / (heightInMeters * heightInMeters)).toFixed(1));

    let category = 'Normal Weight';
    let risk = 'Low risk of cardiovascular / metabolic comorbidities';
    let color = 'primary';

    if (bmi < 18.5) {
      category = 'Underweight';
      risk = 'Risk of nutritional deficiency, osteopenia, and impaired immunity';
      color = 'error';
    } else if (bmi >= 18.5 && bmi < 25.0) {
      category = 'Normal Weight';
      risk = 'Optimal healthy weight range';
      color = 'primary';
    } else if (bmi >= 25.0 && bmi < 30.0) {
      category = 'Overweight';
      risk = 'Increased risk of insulin resistance, hypertension, and dyslipidemia';
      color = 'tertiary';
    } else if (bmi >= 30.0 && bmi < 35.0) {
      category = 'Obesity Class I';
      risk = 'High risk of Type 2 diabetes and metabolic syndrome';
      color = 'error';
    } else if (bmi >= 35.0 && bmi < 40.0) {
      category = 'Obesity Class II';
      risk = 'Very high risk of chronic disease and cardiovascular events';
      color = 'error';
    } else {
      category = 'Obesity Class III (Severe)';
      risk = 'Extremely high risk; clinical bariatric assessment recommended';
      color = 'error';
    }

    const minHealthyWeight = parseFloat((18.5 * heightInMeters * heightInMeters).toFixed(1));
    const maxHealthyWeight = parseFloat((24.9 * heightInMeters * heightInMeters).toFixed(1));
    const primeIndex = parseFloat((bmi / 25).toFixed(2));

    return res.json({
      success: true,
      data: {
        bmi,
        category,
        color,
        healthRisk: risk,
        primeIndex,
        healthyWeightRange: {
          minKg: minHealthyWeight,
          maxKg: maxHealthyWeight
        },
        input: {
          heightCm: height,
          weightKg: weight
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// BMR Calculator (Mifflin-St Jeor & Harris-Benedict)
exports.calculateBMR = (req, res) => {
  try {
    const { age, gender, height, weight, formula } = req.body;

    if (!age || !gender || !height || !weight) {
      return res.status(400).json({
        success: false,
        error: 'Please provide age, gender (Male/Female), height (cm), and weight (kg).'
      });
    }

    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const isMale = gender.toString().toLowerCase().startsWith('m');

    // Mifflin-St Jeor Formula
    let bmrMifflin = (10 * w) + (6.25 * h) - (5 * a);
    bmrMifflin += isMale ? 5 : -161;

    // Revised Harris-Benedict Formula
    let bmrHarris = isMale
      ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a)
      : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);

    const bmrResult = formula === 'harris' ? Math.round(bmrHarris) : Math.round(bmrMifflin);

    return res.json({
      success: true,
      data: {
        bmr: bmrResult,
        unit: 'kcal/day',
        formulaUsed: formula === 'harris' ? 'Revised Harris-Benedict' : 'Mifflin-St Jeor (Clinical Standard)',
        mifflinKcal: Math.round(bmrMifflin),
        harrisKcal: Math.round(bmrHarris),
        summary: `Your resting metabolic rate is approx ${bmrResult} kcal/day. This represents the baseline calories needed to maintain vital body functions at complete rest.`
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// TDEE Calculator
exports.calculateTDEE = (req, res) => {
  try {
    let { bmr, age, gender, height, weight, activityLevel } = req.body;

    let baselineBmr = parseFloat(bmr);

    // If BMR not directly supplied, calculate using Mifflin-St Jeor
    if (!baselineBmr && age && gender && height && weight) {
      const a = parseFloat(age);
      const h = parseFloat(height);
      const w = parseFloat(weight);
      const isMale = gender.toString().toLowerCase().startsWith('m');
      baselineBmr = (10 * w) + (6.25 * h) - (5 * a) + (isMale ? 5 : -161);
    }

    if (!baselineBmr || baselineBmr <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Please supply a valid BMR or provide age, gender, height, and weight.'
      });
    }

    let multiplier = 1.2;
    let activityDesc = 'Sedentary (Little or no exercise, desk job)';

    const actStr = (activityLevel || '').toLowerCase();
    if (actStr.includes('light') || actStr.includes('1-3')) {
      multiplier = 1.375;
      activityDesc = 'Lightly Active (Exercise 1-3 days/week)';
    } else if (actStr.includes('mod') || actStr.includes('3-5')) {
      multiplier = 1.55;
      activityDesc = 'Moderately Active (Exercise 3-5 days/week)';
    } else if (actStr.includes('very') || actStr.includes('6-7')) {
      multiplier = 1.725;
      activityDesc = 'Very Active (Hard exercise 6-7 days/week)';
    } else if (actStr.includes('extra') || actStr.includes('extreme')) {
      multiplier = 1.9;
      activityDesc = 'Extremely Active (Athletic training or physical labor)';
    }

    const tdee = Math.round(baselineBmr * multiplier);

    return res.json({
      success: true,
      data: {
        tdee,
        bmr: Math.round(baselineBmr),
        activityMultiplier: multiplier,
        activityDescription: activityDesc,
        energyTargets: {
          maintenance: tdee,
          mildWeightLoss: tdee - 250,
          moderateWeightLoss: tdee - 500,
          muscleGain: tdee + 300
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Macronutrient Split Calculator
exports.calculateMacros = (req, res) => {
  try {
    const { targetCalories, goal } = req.body;
    const calories = parseFloat(targetCalories) || 2000;

    let pRatio = 0.30;
    let fRatio = 0.35;
    let cRatio = 0.35;
    let goalName = 'Maintenance (Balanced)';

    const gStr = (goal || '').toLowerCase();
    if (gStr.includes('fat') || gStr.includes('loss') || gStr.includes('high protein')) {
      pRatio = 0.35;
      fRatio = 0.30;
      cRatio = 0.35;
      goalName = 'Fat Loss (High Protein)';
    } else if (gStr.includes('muscle') || gStr.includes('gain') || gStr.includes('bulk')) {
      pRatio = 0.30;
      fRatio = 0.25;
      cRatio = 0.45;
      goalName = 'Muscle Gain (Hypertrophy)';
    } else if (gStr.includes('keto') || gStr.includes('ketogenic')) {
      pRatio = 0.20;
      fRatio = 0.75;
      cRatio = 0.05;
      goalName = 'Ketogenic (Very Low Carb)';
    } else if (gStr.includes('low carb')) {
      pRatio = 0.35;
      fRatio = 0.45;
      cRatio = 0.20;
      goalName = 'Low Carbohydrate';
    }

    const proteinCalories = calories * pRatio;
    const fatCalories = calories * fRatio;
    const carbCalories = calories * cRatio;

    // Protein: 4 kcal/g, Fat: 9 kcal/g, Carbs: 4 kcal/g
    const proteinGrams = Math.round(proteinCalories / 4);
    const fatGrams = Math.round(fatCalories / 9);
    const carbGrams = Math.round(carbCalories / 4);

    return res.json({
      success: true,
      data: {
        totalCalories: calories,
        goal: goalName,
        split: {
          protein: {
            percentage: Math.round(pRatio * 100),
            grams: proteinGrams,
            calories: Math.round(proteinCalories)
          },
          fats: {
            percentage: Math.round(fRatio * 100),
            grams: fatGrams,
            calories: Math.round(fatCalories)
          },
          carbs: {
            percentage: Math.round(cRatio * 100),
            grams: carbGrams,
            calories: Math.round(carbCalories)
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Daily Water Intake Calculator
exports.calculateWater = (req, res) => {
  try {
    const { weightKg, activityMinutes } = req.body;
    const w = parseFloat(weightKg) || 70;
    const actMin = parseFloat(activityMinutes) || 30;

    // Baseline: ~33 ml per kg + 350 ml per 30 minutes of exercise
    const baselineLiters = w * 0.033;
    const exerciseBonusLiters = (actMin / 30) * 0.35;
    const totalLiters = parseFloat((baselineLiters + exerciseBonusLiters).toFixed(2));
    const glasses = Math.round(totalLiters / 0.25); // 250ml glass

    return res.json({
      success: true,
      data: {
        weightKg: w,
        activityMinutes: actMin,
        dailyTargetLiters: totalLiters,
        approxGlasses: glasses,
        summary: `Recommended daily hydration is ${totalLiters} liters (~${glasses} standard 250ml glasses).`
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
