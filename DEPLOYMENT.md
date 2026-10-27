# Complete Deployment Guide: Frontend on Vercel & Backend on Render

This guide provides step-by-step instructions for deploying the **NutriAcademy Digital Education Platform** to production with:
- **Frontend:** Hosted on [Vercel](https://vercel.com) (Global Edge CDN, SSL, instantaneous static delivery)
- **Backend:** Hosted on [Render](https://render.com) (Node.js Express REST API, persistent memory, automated health monitoring)

---

## 🏗️ Architecture Overview

```
   ┌────────────────────────────────────────────────────────┐
   │                    User Browser                        │
   └───────────────┬────────────────────────┬───────────────┘
                   │ (HTML/CSS/JS)          │ (REST API Fetch)
                   ▼                        ▼
        ┌─────────────────────┐  CORS/   ┌─────────────────────┐
        │   Vercel Edge CDN   │  Proxy   │   Render Web Svc    │
        │   (Frontend App)    ├─────────►│    (Node/Express)   │
        │  /tools, /learn ... │          │  /api/tools/bmi ... │
        └─────────────────────┘          └─────────────────────┘
```

---

## 📋 Prerequisites Checklist
Before starting, ensure you have:
1. A [GitHub](https://github.com) account with your repository pushed: `https://github.com/ld4651277-star/Nutriacedemy.git`
2. A free [Render](https://render.com) account (can sign in with GitHub)
3. A free [Vercel](https://vercel.com) account (can sign in with GitHub)

---

## 🚀 Part 1: Deploy Backend on Render (Do This First)

> [!TIP]
> Deploy the backend first so you obtain your live public Render URL (e.g. `https://nutriacademy-backend.onrender.com`), which will then be connected to the frontend.

### Method A: Manual Dashboard Setup (Recommended)

1. **Log in to Render:** Go to [dashboard.render.com](https://dashboard.render.com).
2. **Create New Web Service:**
   - Click the **"New +"** button in the top navigation bar.
   - Select **"Web Service"**.
3. **Connect Your GitHub Repository:**
   - Under *Connect a repository*, find and select `Nutriacedemy` (or paste the repository URL `https://github.com/ld4651277-star/Nutriacedemy.git`).
   - Click **"Connect"**.
4. **Configure Service Settings:**
   Fill in the fields exactly as follows:
   - **Name:** `nutriacademy-backend` *(or any unique name of your choice)*
   - **Region:** Choose the region closest to you or your target users (e.g., *Frankfurt*, *Oregon*, *Singapore*).
   - **Branch:** `main`
   - **Root Directory:** `backend` *(CRITICAL: Type `backend` so Render focuses on the Node API)*
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Select **Free**
5. **Configure Environment Variables:**
   Scroll down to the **Environment Variables** section and click **"Add Environment Variable"**:
   | Key | Value | Description |
   |---|---|---|
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `CORS_ORIGIN` | `*` | Allows your Vercel frontend to make API requests |

   *(Note: Render automatically sets the `PORT` variable. Our `server.js` listens on `process.env.PORT || 5000` automatically.)*
6. **Deploy the Service:**
   - Click the green **"Deploy Web Service"** button at the bottom of the page.
   - Render will now clone the repository, run `npm install`, and start `node server.js`.
7. **Verify Your Backend Deployment:**
   - Once the status changes to **"Live"**, copy the URL provided at the top left under the service title (e.g., `https://nutriacademy-backend.onrender.com`).
   - Open a new browser tab and visit:
     - `https://your-service-name.onrender.com/health` → Should return `{"status":"healthy", ...}`
     - `https://your-service-name.onrender.com/api` → Should return the full JSON directory of API endpoints.

---

### Method B: Deploy via Render Blueprint (Infrastructure as Code)
The repository includes a pre-configured [render.yaml](file:///render.yaml). If you prefer Blueprint:
1. Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints).
2. Click **"New Blueprint Instance"**.
3. Select your repository `Nutriacedemy`.
4. Render will read `render.yaml` automatically and configure the build command `cd backend && npm install` and start command `node backend/server.js`.
5. Click **"Apply"**.

---

## 🔗 Part 2: Connect Frontend to Render Backend

Now that your backend has a live URL (let's say `https://nutriacademy-backend.onrender.com`), configure the frontend to communicate with it using either of the two methods below:

### Method 1: Using `frontend/assets/js/config.js` (Easiest)
1. Open [frontend/assets/js/config.js](file:///frontend/assets/js/config.js).
2. Set your Render URL:
   ```javascript
   window.NUTRI_API_BASE = 'https://nutriacademy-backend.onrender.com';
   ```
3. Commit and push:
   ```bash
   git add frontend/assets/js/config.js
   git commit -m "chore: point frontend API base to Render backend"
   git push origin main
   ```

### Method 2: Using Vercel Rewrites Proxy (Zero CORS / Clean URLs)
Alternatively, Vercel can seamlessly proxy all `/api/*` calls directly to Render without requiring cross-origin requests.
In [frontend/vercel.json](file:///frontend/vercel.json), add the proxy rule at the top of `rewrites`:
```json
{
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "https://nutriacademy-backend.onrender.com/api/$1" },
    { "source": "/assets/(.*)", "destination": "/assets/$1" },
    { "source": "/(learn|exams|library|tools|diet-planner|case-studies|careers|dashboard|about)", "destination": "/$1.html" },
    { "source": "/", "destination": "/index.html" }
  ]
}
```

---

## ⚡ Part 3: Deploy Frontend on Vercel

1. **Log in to Vercel:** Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Add New Project:**
   - From the Vercel dashboard, click **"Add New..."** in the top right.
   - Select **"Project"**.
3. **Import GitHub Repository:**
   - Find `Nutriacedemy` in the list of repositories and click **"Import"**.
4. **Configure Project Settings (VERY IMPORTANT):**
   - **Project Name:** `nutriacademy` *(or any preferred name)*
   - **Framework Preset:** Select **"Other"** *(since this is vanilla HTML5/JS/Tailwind)*
   - **Root Directory:**
     - Click **"Edit"** next to *Root Directory*.
     - Select the `frontend` folder.
     - Click **"Continue"**.
     *(⚠️ CRITICAL: If you do not select `frontend` as Root Directory, Vercel will look at the workspace root instead of your website pages).*
   - **Build and Output Settings:**
     - Build Command: Leave OFF / empty
     - Output Directory: Leave OFF / empty
     - Install Command: Leave OFF / empty
5. **Deploy:**
   - Click the blue **"Deploy"** button.
   - Vercel will upload and deploy the static frontend to its global CDN in under 30 seconds.
6. **View Live Website:**
   - You will see a "Congratulations!" screen with a preview screenshot and your live production domain (e.g. `https://nutriacademy.vercel.app`).
   - Click the domain link to visit your live site!

---

## 🧪 Part 4: Testing & Verification Checklist

Once both services are deployed, test the complete platform end-to-end:

- [ ] **Homepage & Clean URLs:**
  - Visit `https://your-app.vercel.app/`
  - Navigate to `/learn`, `/exams`, `/library`, `/tools`, `/careers`, `/dashboard`, `/about`.
  - Verify all pages load cleanly without `.html` in the browser address bar.
- [ ] **Clinical Calculators (Live Backend Interaction):**
  - Go to `https://your-app.vercel.app/tools`
  - In the **BMI Calculator**, enter `Height: 180` and `Weight: 75`.
  - Click **"Calculate BMI"**.
  - Verify that the card displays `BMI: 23.1`, `Normal Weight`, and that a green toast notification pops up.
  - Test the **BMR**, **TDEE**, and **Macro Split** calculators as well.
- [ ] **Diet Planner:**
  - Go to `https://your-app.vercel.app/diet-planner`
  - Fill out your metrics and click **"Next Step"**.
  - Verify that the tailored nutrition prescription and 5-meal schedule cards generate dynamically.
- [ ] **Quiz / Mock Exam:**
  - Go to `https://your-app.vercel.app/exams`
  - Click **"Start Quick Quiz"**.
  - Answer the questions and click **"Submit Quiz"** to verify real-time scoring and analytics.
- [ ] **Contact Form:**
  - Go to `https://your-app.vercel.app/about`
  - Submit the contact inquiry form.
  - Verify the success confirmation toast appears.
- [ ] **API Documentation Console:**
  - Visit `https://your-backend.onrender.com/api-docs` directly to inspect the interactive Swagger-style REST dashboard.

---

## 💡 Troubleshooting & Common Issues

### 1. Render Free Tier "Cold Start" (Spin Down)
- **Symptom:** The first calculator calculation or API request takes 30-50 seconds to respond.
- **Cause:** On Render's Free Plan, web services automatically sleep after 15 minutes of inactivity to conserve resources. When a new request arrives, Render boots the container up.
- **Solution:**
  - This is normal on the free tier. Once awake, all subsequent requests respond in under 50ms.
  - For continuous 24/7 instant wakefulness without sleep, upgrade to Render Starter ($7/mo) or use a free uptime monitor (like [UptimeRobot](https://uptimerobot.com)) to ping `https://your-backend.onrender.com/health` every 10 minutes.

### 2. CORS Errors in Browser Console
- **Symptom:** `Access to fetch at ... from origin ... has been blocked by CORS policy`.
- **Solution:**
  - In your Render service settings, ensure `CORS_ORIGIN` environment variable is set to `*` or your exact Vercel URL (e.g. `https://nutriacademy.vercel.app`).
  - Alternatively, use the Vercel Rewrites Proxy (Method 2 in Part 2) so requests are same-origin.

### 3. Mixed Content Warning (HTTPS vs HTTP)
- **Symptom:** Browser blocks requests with `The page at ... was loaded over HTTPS, but requested an insecure resource ...`.
- **Solution:** Always ensure your Render backend URL begins with `https://`, NOT `http://`.

### 4. Continuous Deployment on Future Updates
- Whenever you make changes and push to GitHub:
  ```bash
  git add .
  git commit -m "Update platform features"
  git push origin main
  ```
- **Vercel** and **Render** will automatically detect the push, rebuild, and redeploy both your frontend and backend with zero manual intervention!
