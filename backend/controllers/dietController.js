/**
 * Diet Planner Controller
 * Generates personalized nutritional care plans based on student/patient profiles
 */

const { readData, writeData } = require('../utils/db');

// Meal database templates based on preferences
const MEAL_TEMPLATES = {
  general: {
    breakfast: [
      { name: "Rolled Oats Power Bowl", items: ["1 cup rolled oats cooked in milk/soy milk", "1 scoop vanilla protein", "1 tbsp chia seeds", "1/2 cup fresh berries"], caloriesPct: 0.25 },
      { name: "Scrambled Eggs & Whole Wheat Toast", items: ["3 eggs (2 whites, 1 whole)", "2 slices 100% whole grain sourdough", "1/2 avocado sliced", "Sautéed baby spinach & cherry tomatoes"], caloriesPct: 0.25 },
      { name: "Greek Yogurt Parfait with Nuts", items: ["1.5 cups plain Greek yogurt", "Handful of crushed walnuts & almonds", "1 tbsp organic raw honey", "Fresh sliced peaches"], caloriesPct: 0.25 }
    ],
    snack1: [
      { name: "Fruit & Almond Fuel", items: ["1 crisp green apple", "12 raw California almonds"], caloriesPct: 0.10 },
      { name: "Cottage Cheese & Berries", items: ["1/2 cup low-fat paneer/cottage cheese", "Fresh strawberries"], caloriesPct: 0.10 }
    ],
    lunch: [
      { name: "Grilled Herb Protein & Quinoa Bowl", items: ["150g grilled chicken breast / marinated tofu", "1 cup steamed tricolor quinoa", "Roasted zucchini, bell peppers, and asparagus", "1 tsp extra virgin olive oil vinaigrette"], caloriesPct: 0.30 },
      { name: "Mediterranean Lentil & Brown Rice Plate", items: ["1.5 cups cooked brown lentils with cumin & turmeric", "1 cup brown basmati rice", "Cucumber-tomato-parsley salad with lemon"], caloriesPct: 0.30 },
      { name: "Seared Wild Salmon & Sweet Potato", items: ["140g baked wild salmon fillet", "1 medium baked sweet potato", "Steamed garlic broccoli florets"], caloriesPct: 0.30 }
    ],
    snack2: [
      { name: "Matcha Protein Smoothie", items: ["Unsweetened almond milk", "1 scoop plant protein", "1 tsp ceremonial matcha powder"], caloriesPct: 0.10 },
      { name: "Roasted Spiced Chickpeas", items: ["1/2 cup roasted crunchy chickpeas with smoked paprika"], caloriesPct: 0.10 }
    ],
    dinner: [
      { name: "Baked Turkey / Edamame Stir-Fry", items: ["150g lean turkey breast / edamame & mushrooms", "Sautéed bok choy, snap peas, and ginger", "1/2 cup jasmine brown rice"], caloriesPct: 0.25 },
      { name: "Comforting Vegetable & Bean Stew", items: ["Hearty cannellini bean & vegetable broth", "1 slice toasted artisanal rye bread", "Fresh parmesan or nutritional yeast sprinkle"], caloriesPct: 0.25 }
    ]
  }
};

exports.generateDietPlan = (req, res) => {
  try {
    const {
      age,
      sex,
      height,
      weight,
      activity,
      goal,
      dietaryPreference
    } = req.body;

    const a = parseFloat(age) || 25;
    const h = parseFloat(height) || 170;
    const w = parseFloat(weight) || 65;
    const gender = (sex || 'Female').toString();
    const isMale = gender.toLowerCase().startsWith('m');

    // 1. Calculate BMI
    const hMeters = h / 100;
    const bmi = parseFloat((w / (hMeters * hMeters)).toFixed(1));

    // 2. Calculate BMR (Mifflin-St Jeor)
    let bmr = (10 * w) + (6.25 * h) - (5 * a) + (isMale ? 5 : -161);
    bmr = Math.round(bmr);

    // 3. Activity multiplier
    let multiplier = 1.55; // Default moderate
    const actStr = (activity || '').toLowerCase();
    if (actStr.includes('sedentary')) multiplier = 1.2;
    else if (actStr.includes('moderate')) multiplier = 1.55;
    else if (actStr.includes('active')) multiplier = 1.725;

    const tdee = Math.round(bmr * multiplier);

    // 4. Adjust calories according to goal
    let targetCalories = tdee;
    let goalDescription = "Maintenance & Vitality";
    const gStr = (goal || '').toLowerCase();
    if (gStr.includes('loss') || gStr.includes('cut')) {
      targetCalories = tdee - 450;
      goalDescription = "Gradual Healthy Fat Loss (-450 kcal deficit)";
    } else if (gStr.includes('gain') || gStr.includes('muscle')) {
      targetCalories = tdee + 350;
      goalDescription = "Lean Hypertrophy & Muscle Gain (+350 kcal surplus)";
    }

    // 5. Macro Distribution
    // High protein for athletes / fat loss: 30% P, 35% C, 35% F
    const proteinGrams = Math.round((targetCalories * 0.30) / 4);
    const carbGrams = Math.round((targetCalories * 0.40) / 4);
    const fatGrams = Math.round((targetCalories * 0.30) / 9);

    // 6. Assemble tailored meals
    const templates = MEAL_TEMPLATES.general;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const bMeal = pick(templates.breakfast);
    const s1Meal = pick(templates.snack1);
    const lMeal = pick(templates.lunch);
    const s2Meal = pick(templates.snack2);
    const dMeal = pick(templates.dinner);

    const meals = [
      {
        slot: "Breakfast",
        time: "08:00 AM",
        name: bMeal.name,
        calories: Math.round(targetCalories * 0.25),
        items: bMeal.items,
        macros: `${Math.round(proteinGrams * 0.25)}g P / ${Math.round(carbGrams * 0.25)}g C / ${Math.round(fatGrams * 0.25)}g F`
      },
      {
        slot: "Mid-Morning Fuel",
        time: "11:00 AM",
        name: s1Meal.name,
        calories: Math.round(targetCalories * 0.10),
        items: s1Meal.items,
        macros: `${Math.round(proteinGrams * 0.10)}g P / ${Math.round(carbGrams * 0.10)}g C / ${Math.round(fatGrams * 0.10)}g F`
      },
      {
        slot: "Lunch",
        time: "01:30 PM",
        name: lMeal.name,
        calories: Math.round(targetCalories * 0.30),
        items: lMeal.items,
        macros: `${Math.round(proteinGrams * 0.30)}g P / ${Math.round(carbGrams * 0.30)}g C / ${Math.round(fatGrams * 0.30)}g F`
      },
      {
        slot: "Afternoon Snack",
        time: "05:00 PM",
        name: s2Meal.name,
        calories: Math.round(targetCalories * 0.10),
        items: s2Meal.items,
        macros: `${Math.round(proteinGrams * 0.10)}g P / ${Math.round(carbGrams * 0.10)}g C / ${Math.round(fatGrams * 0.10)}g F`
      },
      {
        slot: "Dinner",
        time: "08:00 PM",
        name: dMeal.name,
        calories: Math.round(targetCalories * 0.25),
        items: dMeal.items,
        macros: `${Math.round(proteinGrams * 0.25)}g P / ${Math.round(carbGrams * 0.25)}g C / ${Math.round(fatGrams * 0.25)}g F`
      }
    ];

    const plan = {
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      profile: {
        age: a,
        sex: gender,
        heightCm: h,
        weightKg: w,
        activityLevel: activity || 'Moderate'
      },
      metrics: {
        bmi,
        bmr,
        tdee,
        targetCalories,
        goalDescription,
        macros: {
          protein: { grams: proteinGrams, calories: proteinGrams * 4, pct: 30 },
          carbohydrates: { grams: carbGrams, calories: carbGrams * 4, pct: 40 },
          fats: { grams: fatGrams, calories: fatGrams * 9, pct: 30 }
        },
        dailyWaterLiters: parseFloat((w * 0.033 + 0.5).toFixed(1))
      },
      meals,
      clinicalGuidelines: [
        "Hydrate with minimum 500ml water upon waking.",
        "Maintain consistent carbohydrate spacing across primary meals.",
        "Incorporate a colorful variety of seasonal vegetables rich in polyphenols.",
        "Consume high-quality protein within 1-2 hours of physical resistance exercise."
      ]
    };

    return res.json({
      success: true,
      message: "Personalized nutrition plan successfully computed.",
      data: plan
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.saveDietPlan = (req, res) => {
  try {
    const plan = req.body;
    if (!plan || !plan.metrics) {
      return res.status(400).json({ success: false, error: "Invalid plan payload." });
    }

    const plans = readData('diet_plans.json') || [];
    plan.id = plan.id || `plan-${Date.now()}`;
    plan.savedAt = new Date().toISOString();
    plans.unshift(plan);

    writeData('diet_plans.json', plans);

    return res.status(201).json({
      success: true,
      message: "Diet plan saved successfully!",
      planId: plan.id
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSavedPlans = (req, res) => {
  try {
    const plans = readData('diet_plans.json') || [];
    return res.json({ success: true, count: plans.length, data: plans });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteSavedPlan = (req, res) => {
  try {
    const { id } = req.params;
    let plans = readData('diet_plans.json') || [];
    const beforeCount = plans.length;
    plans = plans.filter(p => p.id !== id);

    if (plans.length === beforeCount) {
      return res.status(404).json({ success: false, error: "Plan not found." });
    }

    writeData('diet_plans.json', plans);
    return res.json({ success: true, message: "Diet plan deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
