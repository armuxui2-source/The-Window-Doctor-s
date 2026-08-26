# 🤖 Central AI Agent Instructions & Workspace Guidelines (AGENTS.md)

**Project Name:** The Window Doctor (Bicester & Oxfordshire Premier Glazing Platform)  
**Established:** 1983 • FENSA Registered #28491  
**Architecture:** Next.js 15 (App Router) + React 19 + Tailwind CSS + Supabase PostgreSQL + Framer Motion  
**Central Reference Documents:** [DESIGN.md](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/DESIGN.md) • [SYSTEM_MANUAL.md](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/SYSTEM_MANUAL.md)  

---

## 🎯 1. Core Mission & Business Context (สำหรับ AI ทุกตัว)

This repository contains the complete enterprise web platform for **The Window Doctor**, Oxfordshire's leading specialist in misted double glazing replacement, A++ rated windows, composite doors, and warm roof conservatories.

All AI coding assistants (Antigravity, Cursor, Devin, GitHub Copilot, Claude) working in this repository **MUST** adhere to the guidelines below to maintain zero code clutter, flawless type safety, and seamless business execution.

---

# 🎨 DESIGN DNA — PERMANENT VISUAL STANDARD (`ARM PREMIUM PRODUCT DESIGN DNA`)

This is my permanent default visual design language for client projects.

Treat this document as a **DESIGN CONSTITUTION**, not as a suggestion.

Unless the client or I explicitly request a different visual direction,
**ALL websites, landing pages, dashboards, SaaS products, product pages,
marketing pages, and UI systems must inherit this Design DNA.**

```text
Premium Soft SaaS
×
Editorial Bento
×
Product Visualization
×
Soft Gradient
×
Minimal UI
×
Business-first UX
```

==================================================
01. CORE DESIGN IDENTITY
==================================================

Primary Design Direction:

- Premium Soft SaaS
- Modern Minimal
- Product-led
- Editorial
- Bento-inspired
- Soft UI
- Product Visualization
- Premium B2B Technology

The design must feel:
- Premium
- Modern
- Calm
- Sophisticated
- Trustworthy
- Intelligent
- Polished
- Commercially credible
- Technology-driven
- Designed by a professional product design team

It must NEVER feel:
- Generic
- Template-like
- Amateur
- Cheap
- Over-decorated
- Visually noisy
- Childish
- Random
- AI-generated
- Like a beginner frontend project
- Like a collection of unrelated UI components

==================================================
02. VISUAL DNA
==================================================

The visual language should combine:

Soft neutral surfaces
+
Large rounded containers
+
Subtle borders
+
Very soft shadows
+
Controlled gradients
+
Pastel accent colors
+
Product UI visualization
+
Layered interface elements
+
Strong typography
+
Generous whitespace
+
Precise grid alignment
+
Editorial composition
+
Asymmetric visual rhythm

Use visual depth through:
- Layering
- Soft glow
- Subtle gradients
- Floating UI
- Background blur
- Overlapping interface elements
- Light elevation

Depth must remain subtle. Do NOT use heavy shadows or exaggerated 3D effects.

==================================================
03. COLOR SYSTEM
==================================================

Default foundation:
- Off-white (`#F8F9FC` / `#FAFAFA`)
- Soft gray (`#F1F5F9`)
- Warm white (`#FFFFFF`)
- Very light neutral surfaces

Primary typography:
- Charcoal (`#0F172A`)
- Near-black (`#020617`)
- Deep slate (`#334155`)

Accent colors:
Use restrained pastel or soft iridescent gradients.

Preferred accent families:
- Soft blue
- Periwinkle
- Lavender
- Soft purple
- Mint
- Soft green
- Cyan
- Very subtle peach/yellow when appropriate

Accent colors should support information hierarchy. Never use many saturated colors simultaneously.

Avoid:
- Neon-heavy palettes
- Random rainbow colors
- Excessive gradients
- High-saturation backgrounds
- Harsh contrast unless required for accessibility

==================================================
04. LAYOUT DNA & BENTO GRID
==================================================

Prefer:
- Editorial layouts
- Bento-inspired grids
- Asymmetric compositions
- 2-column and 3-column systems
- Large feature cards dominating the hierarchy
- Unequal card sizes creating visual rhythm
- Generous spacing & controlled negative space

Do NOT make every section look identical.

Bento layout is encouraged but must be intentional:
- Large feature cards (e.g. 8-column or 7-column)
- Medium cards (e.g. 4-column or 5-column)
- Small supporting cards
- Vertical cards
- Horizontal cards
- Full-width feature sections

==================================================
05. PRODUCT VISUALIZATION
==================================================

Product UI is a primary visual storytelling mechanism.

Prefer showing:
- Dashboard previews
- Application interfaces
- Analytics & Telemetry streams
- Payment flows & Calculators
- Workflow diagrams
- Integration systems
- Notifications
- Data visualization
- User journeys & state machines
- Floating UI components & interface layers

When possible: **SHOW the product instead of describing the product.**

==================================================
06. TYPOGRAPHY & BUSINESS STORYTELLING
==================================================

Typography is a major part of the design:
- Large confident headlines
- Tight but readable heading line-height
- Clear hierarchy
- Medium/semibold emphasis
- Comfortable body text
- Short paragraphs

Headline should communicate **VALUE**, not merely describe a feature.
Example:
- BAD: "Payment Management Platform"
- BETTER: "Turn Every Payment Into Predictable Growth"

Every section must answer at least one of:
- What is this?
- Who is it for?
- What problem does it solve?
- How does it work?
- What does the product look like?
- What benefit does the customer receive?
- Why should the customer trust it?

==================================================
07. DESIGN QUALITY GATE & ANTI-GENERIC RULES
==================================================

NEVER produce a generic SaaS template.

Do not create designs that look like:
- Beginner Tailwind projects
- Generic component libraries
- Default shadcn layouts
- Random rounded cards without hierarchy
- Excessive glassmorphism
- Random rainbow gradients
- AI-generated landing page aesthetics

Before considering the design complete, evaluate:
1. Visual hierarchy
2. Typography
3. Spacing & Negative space
4. Alignment & Grid composition
5. Color consistency
6. Surface treatment & Soft shadows
7. Card hierarchy
8. Product visualization
9. Business communication
10. Responsive behavior
11. Overall premium perception

---

# 🚀 DESIGN EXECUTION PROTOCOL

Before writing UI code:
1. Analyze the product and target audience.
2. Define the page's information hierarchy.
3. Define the visual composition.
4. Decide which content deserves visual emphasis.
5. Select the appropriate layout pattern.
6. Define the relationship between text and product visualization.
7. Establish spacing, typography, color, surface, and component rules.
8. Only then implement the UI.

After implementation:
1. Run the application.
2. Inspect the actual rendered result.
3. Compare the result against the Design DNA.
4. Identify generic or weak areas.
5. Fix spacing, hierarchy, composition, typography, and visual balance.
6. Repeat until the design passes the Design Quality Gate.

---

## 📂 2. Directory Structure & Key Files Map (แผนผังระบบ)

```
d:\โปรเจค\The Window Doctors\
├── src\
│   ├── app\                           # Next.js 15 App Router Routes
│   │   ├── page.tsx                   # Public Homepage (100% Original Client Design)
│   │   ├── quote\page.tsx             # 5-Stage Interactive Instant Quote Calculator
│   │   ├── admin\page.tsx             # Enterprise Admin Suite (18 Functional Modules)
│   │   ├── showcase\page.tsx          # Developer-Only Case Study & Portfolio Showcase (ARM Design DNA)
│   │   ├── services\[slug]\page.tsx   # Dynamic Detail Pages for 5 Glazing Services
│   │   ├── projects\page.tsx          # Before & After Case Studies Portfolio Gallery
│   │   ├── service-areas\page.tsx     # Oxfordshire Town Coverage & Response SLA
│   │   └── api\admin\seed\route.ts    # 1-Click Database Content Synchronization API
│   │
│   ├── components\                    # Reusable UI & Business Components
│   ├── lib\supabase\                  # Supabase Client & Seed Data Fallbacks
│   └── types\database.types.ts        # Strongly-typed PostgreSQL Database Schemas
│
├── DESIGN.md                          # UI/UX & Color System Standard
├── SYSTEM_MANUAL.md                   # Full System Specification & SOP Manual
└── AGENTS.md                          # Central AI Agent Rules & Design Constitution
```

---

## 🛡️ 3. Client System Protection & Developer Showcase Isolation

1. **Client System Integrity**:
   - The Public Website (`/`, `/quote`, `/services`, `/projects`, `/service-areas`) and Admin Console (`/admin`) belong strictly to the client (The Window Doctor).
2. **Developer Showcase Isolation (`/showcase`)**:
   - `/showcase` is an isolated developer portfolio page with **Zero Database Write Operations**.
   - All interactive sandboxes on `/showcase` run in in-memory simulation mode so no customer data or Supabase tables are affected.
   - Do NOT place public showcase links on the customer's main navigation or footer.
