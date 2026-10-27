/**
 * NutriAcademy Frontend-to-Backend Bridge
 * Connects all frontend HTML pages to live Node.js REST APIs
 */

(function () {
  // Determine backend API base URL across various deployment setups
  const getApiBase = () => {
    if (window.NUTRI_API_BASE) return window.NUTRI_API_BASE;
    const metaApi = document.querySelector('meta[name="nutri-api-url"]');
    if (metaApi && metaApi.content) return metaApi.content;
    
    if (typeof window !== 'undefined' && window.location) {
      const origin = window.location.origin;
      const port = window.location.port;
      
      // If running on common unified backend ports (5000, 3000, 8000)
      if (port === '5000' || port === '3000' || port === '8000') {
        return origin;
      }
      // If running on separate static dev preview servers (vite, live-server, etc.)
      if (port === '5173' || port === '5500' || port === '8080' || port === '3001' || port === '4173') {
        return 'http://localhost:5000';
      }
      // If opened directly from file system (file://)
      if (window.location.protocol === 'file:') {
        return 'http://localhost:5000';
      }
      // In production (same-origin backend or reverse proxy)
      return origin;
    }
    return 'http://localhost:5000';
  };

  const API_BASE = getApiBase();

  // Helper to map route to clean path or .html based on environment
  const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const resolvePage = (path) => {
    if (!isFileProtocol) return path;
    if (path === '/') return 'index.html';
    return `${path.replace(/^\//, '')}.html`;
  };

  // --- 1. Universal Route & Navigation Fixer ---
  function fixNavigationLinks() {
    const navLinks = document.querySelectorAll('a, button');
    navLinks.forEach(el => {
      const text = (el.textContent || '').trim().toLowerCase();
      const href = el.getAttribute('href');

      if (href === '#' || !href) {
        if (text === 'home' || text.includes('nutriacademy')) {
          el.setAttribute('href', resolvePage('/'));
        } else if (text === 'learn' || text.includes('my courses') || text.includes('explore learning')) {
          el.setAttribute('href', resolvePage('/learn'));
        } else if (text === 'exams' || text.includes('mock tests')) {
          el.setAttribute('href', resolvePage('/exams'));
        } else if (text === 'library' || text.includes('saved resources') || text.includes('books & resources')) {
          el.setAttribute('href', resolvePage('/library'));
        } else if (text === 'tools' || text === 'calculators' || text.includes('calculators')) {
          el.setAttribute('href', resolvePage('/tools'));
        } else if (text.includes('diet plan') || text.includes('create your diet plan')) {
          el.setAttribute('href', resolvePage('/diet-planner'));
        } else if (text.includes('career') || text.includes('career guidance')) {
          el.setAttribute('href', resolvePage('/careers'));
        } else if (text.includes('case studies') || text.includes('case 042')) {
          el.setAttribute('href', resolvePage('/case-studies'));
        } else if (text === 'dashboard') {
          el.setAttribute('href', resolvePage('/dashboard'));
        } else if (text === 'about us' || text === 'contact' || text.includes('get in touch')) {
          el.setAttribute('href', resolvePage('/about'));
        }
      }
    });
  }

  // --- 2. Toast Notification Helper ---
  function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('nutri-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'nutri-toast-container';
      toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-primary text-on-primary' : 'bg-error text-on-error';
    toast.className = `${bgColor} px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-label-md font-label-md pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-lg">${type === 'success' ? 'check_circle' : 'error'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    }, 20);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- 3. Contact Form Handler (About & Contact Page) ---
  function initContactForm() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;

    // Verify it's on about/contact page
    const nameInput = document.getElementById('name') || contactForm.querySelector('input[type="text"]');
    const emailInput = document.getElementById('email') || contactForm.querySelector('input[type="email"]');
    const messageInput = document.getElementById('message') || contactForm.querySelector('textarea');

    if (!messageInput) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      const payload = {
        name: nameInput ? nameInput.value.trim() : 'Anonymous',
        email: emailInput ? emailInput.value.trim() : '',
        message: messageInput.value.trim()
      };

      if (!payload.email || !payload.message) {
        showToast('Please fill in both email and message.', 'error');
        return;
      }

      try {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending...';
        }

        const res = await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          showToast(data.message || 'Message received! We will reply soon.', 'success');
          contactForm.reset();
        } else {
          showToast(data.error || 'Failed to submit message.', 'error');
        }
      } catch (err) {
        showToast('Error connecting to backend: ' + err.message, 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  // --- 4. Interactive Calculators (Tools Page) ---
  function initToolsPage() {
    // 4A. BMI Calculator
    const bmiCard = document.querySelector('.group .text-headline-md');
    const bmiInputs = document.querySelectorAll('input[placeholder*="175"], input[placeholder*="70"]');
    const bmiBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Calculate BMI'));

    if (bmiBtn) {
      bmiBtn.addEventListener('click', async () => {
        const heightInput = Array.from(document.querySelectorAll('input[type="number"]')).find(i => i.placeholder.includes('175') || i.previousElementSibling?.textContent?.includes('Height'));
        const weightInput = Array.from(document.querySelectorAll('input[type="number"]')).find(i => i.placeholder.includes('70') || i.previousElementSibling?.textContent?.includes('Weight'));

        const heightVal = heightInput ? parseFloat(heightInput.value) : 175;
        const weightVal = weightInput ? parseFloat(weightInput.value) : 70;

        try {
          const res = await fetch(`${API_BASE}/api/tools/bmi`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ height: heightVal, weight: weightVal })
          });
          const result = await res.json();

          if (result.success) {
            let resBox = bmiBtn.nextElementSibling;
            if (!resBox || !resBox.classList.contains('bg-surface-container-low')) {
              resBox = document.createElement('div');
              resBox.className = 'mt-md bg-surface-container-low border border-primary/20 rounded-lg p-md text-center transition-all';
              bmiBtn.parentNode.appendChild(resBox);
            }
            resBox.innerHTML = `
              <span class="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Your Calculated BMI</span>
              <span class="text-headline-md font-headline-md text-primary font-bold">${result.data.bmi}</span>
              <span class="block text-label-md font-label-md text-on-surface mt-xs font-bold">${result.data.category}</span>
              <span class="block text-xs text-on-surface-variant mt-1">Healthy Weight Range: ${result.data.healthyWeightRange.minKg} - ${result.data.healthyWeightRange.maxKg} kg</span>
            `;
            showToast(`BMI calculated: ${result.data.bmi} (${result.data.category})`);
          }
        } catch (err) {
          showToast('BMI calculation failed: ' + err.message, 'error');
        }
      });
    }

    // 4B. BMR Calculator
    const bmrBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Calculate BMR'));
    if (bmrBtn) {
      bmrBtn.addEventListener('click', async () => {
        const ageInput = document.querySelector('input[placeholder="Years"]');
        const bmrCard = bmrBtn.closest('.bg-surface-container-lowest');
        const numInputs = bmrCard ? bmrCard.querySelectorAll('input[type="number"]') : [];
        const heightInput = numInputs[1];
        const weightInput = numInputs[2];
        const genderSelect = bmrCard ? bmrCard.querySelector('select') : null;

        const payload = {
          age: ageInput && ageInput.value ? parseFloat(ageInput.value) : 25,
          gender: genderSelect ? genderSelect.value : 'Male',
          height: heightInput && heightInput.value ? parseFloat(heightInput.value) : 175,
          weight: weightInput && weightInput.value ? parseFloat(weightInput.value) : 70
        };

        try {
          const res = await fetch(`${API_BASE}/api/tools/bmr`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (result.success) {
            let resBox = bmrBtn.nextElementSibling;
            if (!resBox || !resBox.classList.contains('bg-surface-container-low')) {
              resBox = document.createElement('div');
              resBox.className = 'mt-md bg-surface-container-low border border-secondary/20 rounded-lg p-md text-center transition-all';
              bmrBtn.parentNode.appendChild(resBox);
            }
            resBox.innerHTML = `
              <span class="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Basal Metabolic Rate</span>
              <span class="text-headline-md font-headline-md text-secondary font-bold">${result.data.bmr} kcal/day</span>
              <span class="block text-xs text-on-surface-variant mt-1">${result.data.formulaUsed}</span>
            `;
            showToast(`BMR calculated: ${result.data.bmr} kcal/day`);
          }
        } catch (err) {
          showToast('BMR calculation failed: ' + err.message, 'error');
        }
      });
    }

    // 4C. TDEE Calculator
    const tdeeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Calculate TDEE'));
    if (tdeeBtn) {
      tdeeBtn.addEventListener('click', async () => {
        const bmrInput = document.querySelector('input[placeholder*="BMR"]');
        const actSelect = tdeeBtn.closest('.bg-surface-container-lowest')?.querySelector('select');

        const payload = {
          bmr: bmrInput && bmrInput.value ? parseFloat(bmrInput.value) : 1650,
          activityLevel: actSelect ? actSelect.value : 'Sedentary'
        };

        try {
          const res = await fetch(`${API_BASE}/api/tools/tdee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (result.success) {
            let resBox = tdeeBtn.nextElementSibling;
            if (!resBox || !resBox.classList.contains('bg-surface-container-low')) {
              resBox = document.createElement('div');
              resBox.className = 'mt-md bg-surface-container-low border border-tertiary/20 rounded-lg p-md text-center transition-all';
              tdeeBtn.parentNode.appendChild(resBox);
            }
            resBox.innerHTML = `
              <span class="block text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Daily Energy Expenditure</span>
              <span class="text-headline-md font-headline-md text-tertiary font-bold">${result.data.tdee} kcal/day</span>
              <span class="block text-xs text-on-surface-variant mt-1">Weight Loss Target: ${result.data.energyTargets.moderateWeightLoss} kcal</span>
            `;
            showToast(`TDEE: ${result.data.tdee} kcal/day`);
          }
        } catch (err) {
          showToast('TDEE calculation failed: ' + err.message, 'error');
        }
      });
    }

    // 4D. Macro Split Generator
    const macroBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Generate Split'));
    if (macroBtn) {
      macroBtn.addEventListener('click', async () => {
        const calInput = document.querySelector('input[placeholder*="2000"]');
        const activeChip = document.querySelector('.bg-primary-container');
        const goalText = activeChip ? activeChip.textContent.trim() : 'Maintenance';

        const payload = {
          targetCalories: calInput && calInput.value ? parseFloat(calInput.value) : 2000,
          goal: goalText
        };

        try {
          const res = await fetch(`${API_BASE}/api/tools/macros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();

          if (result.success) {
            const split = result.data.split;
            const resVisual = document.querySelector('.md\\:col-span-2.bg-surface-container-low');
            if (resVisual) {
              resVisual.innerHTML = `
                <div class="flex justify-between items-end mb-md">
                  <span class="text-label-md font-label-md text-on-surface font-bold">Suggested Split (${result.data.goal})</span>
                  <span class="text-body-md font-body-md text-on-surface-variant">${result.data.totalCalories} kcal total</span>
                </div>
                <div class="w-full h-8 flex rounded-md overflow-hidden mb-lg shadow-inner">
                  <div class="h-full bg-secondary" style="width: ${split.protein.percentage}%;" title="Protein: ${split.protein.percentage}%"></div>
                  <div class="h-full bg-tertiary-container" style="width: ${split.fats.percentage}%;" title="Fat: ${split.fats.percentage}%"></div>
                  <div class="h-full bg-surface-dim" style="width: ${split.carbs.percentage}%;" title="Carbs: ${split.carbs.percentage}%"></div>
                </div>
                <div class="grid grid-cols-3 gap-md text-center">
                  <div>
                    <div class="flex items-center justify-center gap-xs mb-xs">
                      <div class="w-3 h-3 rounded-full bg-secondary"></div>
                      <span class="text-label-sm font-label-sm text-on-surface-variant">Protein (${split.protein.percentage}%)</span>
                    </div>
                    <span class="text-headline-md font-headline-md text-on-surface block">${split.protein.grams}g</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant">${split.protein.calories} kcal</span>
                  </div>
                  <div>
                    <div class="flex items-center justify-center gap-xs mb-xs">
                      <div class="w-3 h-3 rounded-full bg-tertiary-container"></div>
                      <span class="text-label-sm font-label-sm text-on-surface-variant">Fats (${split.fats.percentage}%)</span>
                    </div>
                    <span class="text-headline-md font-headline-md text-on-surface block">${split.fats.grams}g</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant">${split.fats.calories} kcal</span>
                  </div>
                  <div>
                    <div class="flex items-center justify-center gap-xs mb-xs">
                      <div class="w-3 h-3 rounded-full bg-surface-dim"></div>
                      <span class="text-label-sm font-label-sm text-on-surface-variant">Carbs (${split.carbs.percentage}%)</span>
                    </div>
                    <span class="text-headline-md font-headline-md text-on-surface block">${split.carbs.grams}g</span>
                    <span class="text-label-sm font-label-sm text-on-surface-variant">${split.carbs.calories} kcal</span>
                  </div>
                </div>
              `;
            }
            showToast(`Macros updated for ${result.data.totalCalories} kcal`);
          }
        } catch (err) {
          showToast('Macro calculation failed: ' + err.message, 'error');
        }
      });
    }
  }

  // --- 5. Diet Planner Form Handler ---
  function initDietPlannerPage() {
    const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Next Step'));
    if (!nextBtn) return;

    nextBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      const ageInput = document.querySelector('input[placeholder="Years"]');
      const sexSelect = document.querySelector('select');
      const heightInput = document.querySelector('input[placeholder="170"]');
      const weightInput = document.querySelector('input[placeholder="65"]');
      const activeRadio = document.querySelector('input[name="activity"]:checked');
      const actText = activeRadio ? activeRadio.parentNode.textContent.trim() : 'Moderate';

      const payload = {
        age: ageInput && ageInput.value ? ageInput.value : 25,
        sex: sexSelect ? sexSelect.value : 'Female',
        height: heightInput && heightInput.value ? heightInput.value : 170,
        weight: weightInput && weightInput.value ? weightInput.value : 65,
        activity: actText
      };

      try {
        nextBtn.innerHTML = 'Generating Custom Plan...';
        const res = await fetch(`${API_BASE}/api/diet-planner/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await res.json();

        if (result.success) {
          const plan = result.data;
          const container = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.gap-xl');

          if (container) {
            container.innerHTML = `
              <div class="col-span-1 md:col-span-2 space-y-6">
                <!-- Metrics Summary Banner -->
                <div class="bg-primary/5 border border-primary/30 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span class="text-xs uppercase font-bold text-primary tracking-wider">Your Personalized Nutrition Prescription</span>
                    <h3 class="text-2xl font-bold text-on-surface mt-1">${plan.metrics.targetCalories} kcal / day</h3>
                    <p class="text-sm text-on-surface-variant">${plan.metrics.goalDescription} • BMI: ${plan.metrics.bmi} • Hydration: ${plan.metrics.dailyWaterLiters} L/day</p>
                  </div>
                  <div class="flex gap-4">
                    <div class="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <span class="text-xs text-gray-500">Protein</span>
                      <p class="font-bold text-emerald-700">${plan.metrics.macros.protein.grams}g</p>
                    </div>
                    <div class="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <span class="text-xs text-gray-500">Fats</span>
                      <p class="font-bold text-amber-700">${plan.metrics.macros.fats.grams}g</p>
                    </div>
                    <div class="text-center bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                      <span class="text-xs text-gray-500">Carbs</span>
                      <p class="font-bold text-teal-700">${plan.metrics.macros.carbohydrates.grams}g</p>
                    </div>
                  </div>
                </div>

                <!-- Meals Schedule Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  ${plan.meals.map(m => `
                    <div class="bg-white p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
                      <div>
                        <div class="flex justify-between items-center mb-2">
                          <span class="text-xs font-bold text-primary uppercase tracking-wider">${m.slot}</span>
                          <span class="text-xs text-gray-400 font-mono">${m.time}</span>
                        </div>
                        <h4 class="font-bold text-on-surface mb-2">${m.name}</h4>
                        <ul class="text-xs text-on-surface-variant space-y-1 mb-4 list-disc pl-4">
                          ${m.items.map(it => `<li>${it}</li>`).join('')}
                        </ul>
                      </div>
                      <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span class="font-bold text-gray-700">${m.calories} kcal</span>
                        <span class="text-gray-500">${m.macros}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
            showToast('Personalized diet plan generated successfully!');
          }
        }
      } catch (err) {
        showToast('Failed to generate diet plan: ' + err.message, 'error');
      } finally {
        nextBtn.innerHTML = `Next Step <span class="material-symbols-outlined">arrow_forward</span>`;
      }
    });
  }

  // --- 6. Quick Interactive Quiz Modal (Exams Page) ---
  function initExamQuizModal() {
    const startQuizBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Start Quick Quiz') || b.textContent.includes('Quick Quiz'));
    if (!startQuizBtn) return;

    startQuizBtn.addEventListener('click', async () => {
      try {
        startQuizBtn.textContent = 'Loading Quiz...';
        const res = await fetch(`${API_BASE}/api/exams/exam-2`);
        const result = await res.json();
        startQuizBtn.textContent = 'Start Quick Quiz';

        if (!result.success || !result.data.questions) {
          showToast('Could not load quiz questions.', 'error');
          return;
        }

        const test = result.data;
        let currentQuestion = 0;
        const userAnswers = {};

        // Create clean modal overlay
        const modal = document.createElement('div');
        modal.id = 'exam-quiz-modal';
        modal.className = 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4';

        function renderQuestion() {
          const q = test.questions[currentQuestion];
          const isLast = currentQuestion === test.questions.length - 1;

          modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 animate-fade-in flex flex-col">
              <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                <div>
                  <span class="text-xs font-bold text-primary uppercase tracking-wider">${test.category} • Revision Quiz</span>
                  <h3 class="text-base font-bold text-on-surface">Question ${currentQuestion + 1} of ${test.questions.length}</h3>
                </div>
                <button id="close-modal-btn" class="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>

              <p class="text-sm font-medium text-gray-800 mb-4">${q.question}</p>

              <div class="space-y-2 mb-6">
                ${q.options.map((opt, idx) => `
                  <label class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-emerald-50/50 cursor-pointer transition-colors">
                    <input type="radio" name="quiz-opt" value="${idx}" ${userAnswers[q.id] === idx ? 'checked' : ''} class="text-primary focus:ring-primary">
                    <span class="text-xs text-gray-700 font-medium">${opt}</span>
                  </label>
                `).join('')}
              </div>

              <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                <button id="prev-q-btn" class="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 ${currentQuestion === 0 ? 'opacity-40 pointer-events-none' : ''}">
                  Previous
                </button>
                <button id="next-q-btn" class="px-5 py-2 rounded-lg text-xs font-semibold bg-primary text-white hover:bg-emerald-700 transition-colors shadow-sm">
                  ${isLast ? 'Submit Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          `;

          // Event listeners
          modal.querySelector('#close-modal-btn').onclick = () => modal.remove();
          modal.querySelectorAll('input[name="quiz-opt"]').forEach(r => {
            r.onchange = () => { userAnswers[q.id] = parseInt(r.value, 10); };
          });

          const prevBtn = modal.querySelector('#prev-q-btn');
          if (prevBtn) {
            prevBtn.onclick = () => {
              if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
              }
            };
          }

          const nextBtn = modal.querySelector('#next-q-btn');
          if (nextBtn) {
            nextBtn.onclick = async () => {
              const selected = modal.querySelector('input[name="quiz-opt"]:checked');
              if (!selected && userAnswers[q.id] === undefined) {
                showToast('Please select an answer before proceeding.', 'error');
                return;
              }
              if (selected) {
                userAnswers[q.id] = parseInt(selected.value, 10);
              }

              if (isLast) {
                // Submit to backend
                modal.innerHTML = `<div class="bg-white p-8 rounded-2xl text-center shadow-xl">Evaluating your quiz submission...</div>`;
                try {
                  const subRes = await fetch(`${API_BASE}/api/exams/${test.id}/submit`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ answers: userAnswers })
                  });
                  const evalData = await subRes.json();
                  const score = evalData.data.scorePercentage;
                  const passed = evalData.data.passed;

                  modal.innerHTML = `
                    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
                      <div class="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                        <span class="material-symbols-outlined text-3xl">${passed ? 'emoji_events' : 'psychology'}</span>
                      </div>
                      <h3 class="text-xl font-bold text-gray-900">${passed ? 'Congratulations!' : 'Good Effort!'}</h3>
                      <p class="text-sm text-gray-500 mt-1 mb-4">You scored ${score}% (${evalData.data.correctCount}/${evalData.data.totalQuestions} correct)</p>
                      <div class="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 mb-6 border border-gray-200">
                        Result status: <span class="font-bold text-primary">${evalData.data.status}</span>. Score saved to your student analytics!
                      </div>
                      <button onclick="document.getElementById('exam-quiz-modal').remove()" class="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                        Close & Review Topics
                      </button>
                    </div>
                  `;
                } catch (err) {
                  modal.innerHTML = `<div class="bg-white p-6 rounded-2xl text-center text-red-600">Error submitting quiz: ${err.message}</div>`;
                }
              } else {
                currentQuestion++;
                renderQuestion();
              }
            };
          }
        }

        renderQuestion();
        document.body.appendChild(modal);
      } catch (err) {
        showToast('Error opening quiz: ' + err.message, 'error');
        startQuizBtn.textContent = 'Start Quick Quiz';
      }
    });
  }

  // --- 7. DOM Ready Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    fixNavigationLinks();
    initContactForm();
    initToolsPage();
    initDietPlannerPage();
    initExamQuizModal();
  });
})();
