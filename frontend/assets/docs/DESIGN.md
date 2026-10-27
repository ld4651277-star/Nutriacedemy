---
name: Vitality Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system facilitates a "Premium Educational-Healthcare" aesthetic, balancing the authority of an academic institution with the approachability of a modern wellness startup. It avoids clinical coldness by utilizing a **Modern Minimalist** style enriched with **Tonal Layering**.

The visual narrative is built on high-clarity layouts, generous whitespace, and a rhythmic use of soft surfaces. It targets students and professionals who require a focused, distraction-free environment that feels both high-tech and human-centric. The emotional goal is to evoke feelings of growth, precision, and encouragement.

## Colors
This design system utilizes a palette rooted in nature and clarity.

- **Primary (Emerald):** Used for main actions, active states, and branding. It signifies health and vitality.
- **Secondary (Teal):** Used for navigation elements, icons, and secondary buttons to provide a professional, grounded contrast to the emerald.
- **Tertiary (Orange):** Reserved strictly for high-priority calls to action, notifications, and progress highlights.
- **Surface Strategy:** Backgrounds utilize pure white for the base, while `#F8FAFC` is used to define "containers" and cards, creating a soft depth without relying on heavy borders.

## Typography
The system relies on **Inter** for its exceptional legibility and neutral, systematic tone. 

- **Headings:** Use bold weights with tight letter-spacing to create a sense of authority and structure.
- **Body Text:** Use regular weights with generous line heights (`1.5` to `1.6`) to ensure long-form educational content is readable and reduces cognitive load.
- **Semantic Usage:** Headlines should prioritize the Secondary Teal color for a softer look, while Primary Emerald is reserved for specific accented keywords within text.

## Layout & Spacing
This design system uses a **Fluid Grid** approach based on an 8px rhythmic scale.

- **Desktop:** 12-column grid with 24px gutters and 48px side margins. 
- **Tablet:** 8-column grid with 24px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Content should be grouped using "logical containers"—large whitespace gaps (3xl spacing) between major sections to emphasize the premium, uncluttered feel.

## Elevation & Depth
Elevation is communicated through **Ambient Shadows** and **Tonal Layers** rather than physical displacement.

- **Level 0 (Base):** Pure white `#FFFFFF` for the main background.
- **Level 1 (Surface):** Soft Gray `#F8FAFC` for card containers and dashboard widgets, using a thin 1px border (`#E2E8F0`).
- **Level 2 (Hover/Floating):** Used for active cards and dropdowns. This features a very diffused shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)`.
- **Level 3 (Modal):** High-diffusion shadow with a slight teal tint to the shadow color to maintain brand harmony.

## Shapes
The shape language is defined by friendly, **Rounded** corners.

- **Standard Elements:** Buttons, inputs, and small chips use `0.5rem` (rounded-md).
- **Featured Containers:** Interactive cards and dashboard widgets use `1.5rem` (rounded-xl) or even `2rem` (rounded-2xl) to create a distinct, modern "app-like" feel that differentiates the platform from traditional academic portals.

## Components

### Buttons & Inputs
- **Primary Button:** Emerald background, white text, 0.5rem radius. High-contrast shadow on hover.
- **CTA Button:** Vibrant Orange background. Used sparingly for "Join Course" or "Submit Exam."
- **Input Fields:** White background with a `#F1F5F9` stroke. On focus, the stroke transitions to Emerald with a soft outer glow.

### Cards & Widgets
- **Educational Cards:** White base with a 1px border. Feature a Primary Emerald top-border (4px) for categorized content.
- **Progress Bars:** Use a thick (8px) track in `#F1F5F9` with a rounded Emerald fill. For "warning" states, the fill transitions to Orange.

### Navigation & Lists
- **Filtered Lists:** Use "Pill-shaped" chips for categories. Unselected chips have a light gray background; selected chips use a Secondary Teal background with white text.
- **Search Fields:** Large, centered search bars with 1.5rem roundedness and a soft shadow to serve as the focal point of the student dashboard.

### Dashboard Specifics
- **Widgets:** Utilize the `#F8FAFC` surface color to separate distinct data points (e.g., Calorie Tracking, Course Completion) from the main white workspace.