---
name: Architectural Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#d4dae8'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e7eefd'
  surface-container-high: '#e2e8f7'
  surface-container-highest: '#dce3f1'
  on-surface: '#151c26'
  on-surface-variant: '#4a4453'
  inverse-surface: '#2a313c'
  inverse-on-surface: '#ebf1ff'
  outline: '#7b7485'
  outline-variant: '#ccc3d6'
  surface-tint: '#713dcc'
  primary: '#420093'
  on-primary: '#ffffff'
  primary-container: '#5b21b6'
  on-primary-container: '#c7aaff'
  inverse-primary: '#d3bbff'
  secondary: '#0056c4'
  on-secondary: '#ffffff'
  secondary-container: '#226fea'
  on-secondary-container: '#fefcff'
  tertiary: '#6d0005'
  on-tertiary: '#ffffff'
  tertiary-container: '#8f1b18'
  on-tertiary-container: '#ff9f94'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebddff'
  primary-fixed-dim: '#d3bbff'
  on-primary-fixed: '#250059'
  on-primary-fixed-variant: '#581db3'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#afc6ff'
  on-secondary-fixed: '#001944'
  on-secondary-fixed-variant: '#004299'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#8b1816'
  background: '#f8f9ff'
  on-background: '#151c26'
  surface-variant: '#dce3f1'
  surface-muted: '#F8FAFC'
  border-subtle: '#E2E8F0'
  chart-indigo: '#6366F1'
  chart-cyan: '#06B6D4'
  chart-rose: '#F43F5E'
typography:
  headline-display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 280px
  header-height: 64px
  gutter: 24px
  container-padding: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is engineered for high-performance content orchestration. The brand personality is **authoritative, architectural, and hyper-efficient**, catering to developers and content strategists who require clarity amidst complexity. 

The visual style follows a **Corporate Modern** aesthetic with **Minimalist** leanings. It prioritizes information density without sacrificing breathing room. We employ a "content-first" hierarchy where the UI recedes to let data and media take center stage. Key characteristics include razor-sharp alignment, a restrained use of vibrant accents against a monochromatic foundation, and a structural grid that feels built rather than merely placed. The goal is to evoke a sense of "technical luxury"—a tool that feels as premium as the high-end content it manages.

## Colors

The palette is anchored by a deep **Neutral (#121923)**, providing the structural weight necessary for an enterprise dashboard. **Primary Deep Purple** and **Secondary Vibrant Blue** are reserved for high-intent actions and active states, creating a "digital ink" feel.

- **Primary & Secondary:** Used for navigational anchors, primary calls to action, and focus states.
- **Tertiary (Coral):** Used exclusively for destructive actions, critical alerts, or status indicators that require immediate cognitive load.
- **Chart Tokens:** A specialized subset of colors (Indigo, Cyan, Rose) is provided to ensure data visualization remains distinct from UI controls.
- **Surface Strategy:** We utilize a tiered grayscale (Surface Muted to White) to define nested content areas and sidebar regions, ensuring depth is communicated through value rather than heavy shadows.

## Typography

The typography system strikes a balance between **expressive headers** and **functional data**. 

- **Headlines:** `Hanken Grotesk` provides a sharp, contemporary edge for page titles and section headers. Its tight tracking at larger sizes feels modern and "engineered."
- **Body & Labels:** `IBM Plex Sans` is used for its exceptional legibility in technical contexts. Its industrial rhythm makes long-form content and nested lists easy to parse.
- **Data Mono:** `JetBrains Mono` is integrated for IDs, code snippets, and specific metric values to reinforce the developer-centric nature of the platform.
- **Scaling:** Mobile headlines scale down aggressively (e.g., `headline-display` shifts to 32px) to maintain readability on handheld devices while body sizes remain constant at 16px to ensure accessibility.

## Layout & Spacing

This design system utilizes a **fixed-fluid hybrid grid**. A permanent 280px sidebar provides global navigation, while the main content area uses a fluid 12-column grid.

- **The 8px Rule:** All spacing increments are multiples of 8px to ensure mathematical harmony across the dashboard.
- **Sidebar:** Positioned on the left with a higher contrast background (#121923) to ground the interface. It contains nested navigation with 8px vertical spacing between items.
- **Metric Cards:** Arranged in a responsive flex-wrap container, typically spanning 3 columns on desktop and 12 on mobile.
- **Breakpoints:**
  - **Desktop (1440px+):** Max-width 1600px for content.
  - **Tablet (768px - 1024px):** Sidebar collapses to icons; gutters reduce to 16px.
  - **Mobile (<768px):** Sidebar becomes a hidden drawer; vertical stacking for all cards and data tables.

## Elevation & Depth

To maintain a "sleek" and professional appearance, we avoid heavy, multi-colored shadows. Instead, we use **Tonal Layers** and **Precise Outlines**.

1.  **Level 0 (Base):** The dashboard background (Surface Muted).
2.  **Level 1 (Cards/Panels):** Pure white surfaces with a 1px solid border (#E2E8F0). This provides a crisp, "sheet" metaphor.
3.  **Level 2 (Popovers/Dropdowns):** Elevated surfaces using a soft, neutral-tinted shadow (8% opacity, 12px blur) to differentiate from the base content.
4.  **Level 3 (Modals):** High-contrast focus with a backdrop blur (8px) on the layers below, creating a "glass" focus effect that keeps the user grounded in their current context.

Depth is also communicated through **interaction states**: an element might transition from a 1px border to a 2px primary-colored border when active, rather than "lifting" off the page.

## Shapes

The shape language is **Soft (0.25rem / 4px)**. This choice reinforces the architectural, high-end feel of the design system. 

- **Standard Elements:** Buttons, input fields, and checkboxes use the base 4px radius.
- **Large Elements:** Content cards and data containers use `rounded-lg` (8px) to soften the layout slightly without appearing "bubbly."
- **Interactive States:** Focus rings follow the curvature of the element with a 2px offset to maintain clarity.
- **Chart Geometry:** Bar charts should have minimal rounding (2px) on top corners only. Pie chart segments remain sharp to ensure mathematical precision in visualization.

## Components

### Buttons & Controls
- **Primary Button:** Solid Purple (#5B21B6) with white text, 4px radius, and Hanken Grotesk Medium for the label.
- **Secondary Button:** Ghost style with 1px Neutral border.
- **Input Fields:** 1px border (#E2E8F0) that transitions to Blue (#206EE9) on focus. Labels are always `label-sm` positioned above the field.

### Sidebar Navigation
- Dark background (#121923) with "Active" indicators using a subtle left-aligned vertical bar in Primary Purple.
- Icons should be 20px, stroke-based, and monochromatic.

### Metric Cards
- Background: White.
- Top row: `label-sm` for title and an icon.
- Middle row: `headline-md` for the primary metric.
- Bottom row: A sparkline (line chart) using the `chart-indigo` or `chart-cyan` tokens to show trends.

### Chart Tokens
- **Bar Charts:** Use alternating `chart-indigo` and `chart-cyan`.
- **Line Charts:** 2px stroke width, no area fill for maximum "sleekness," or a 5% opacity gradient fill for a high-end feel.
- **Tooltips:** Dark theme (#121923) with `data-mono` text for precise value reading.

### Data Tables
- Header row: `label-sm` with a background fill of `surface-muted`.
- Row height: 56px for standard density; 48px for high-density views.
- Dividers: 1px horizontal lines only; no vertical dividers to maintain a clean, modern look.