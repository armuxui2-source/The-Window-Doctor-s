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

## 📂 2. Directory Structure & Key Files Map (แผนผังระบบ)

```
d:\โปรเจค\The Window Doctors\
├── src\
│   ├── app\                           # Next.js 15 App Router Routes
│   │   ├── page.tsx                   # Public Homepage (Hero, Services, Comparison, Reviews, FAQs)
│   │   ├── layout.tsx                 # Root Layout (Google Fonts Inter, Navbar, Footer, Scripts)
│   │   ├── globals.css                # Base Tailwind & Brand Color Tokens
│   │   ├── quote\page.tsx             # 5-Stage Interactive Instant Quote Calculator
│   │   ├── admin\page.tsx             # Enterprise Admin Suite (18 Functional Modules)
│   │   ├── services\[slug]\page.tsx   # Dynamic Detail Pages for 5 Glazing Services
│   │   ├── projects\page.tsx          # Before & After Case Studies Portfolio Gallery
│   │   ├── service-areas\page.tsx     # Oxfordshire Town Coverage & Response SLA
│   │   ├── blog\[slug]\page.tsx       # SEO Technical Glazing Guides
│   │   └── api\admin\seed\route.ts    # 1-Click Database Content Synchronization API
│   │
│   ├── components\
│   │   ├── admin\                     # Live Traffic, Integration Manager, Media Library, Install Modal
│   │   ├── home\                      # Hero, Comparison Matrix, Trust Badges, Process Steps
│   │   ├── layout\                    # Navbar, Footer, Floating CTA Mobile Bar
│   │   ├── quote\                     # Quote Wizard Form Steps & Summary
│   │   └── ui\                        # Accessible Reusable UI Elements (Modals, Drawers, Badges)
│   │
│   ├── lib\
│   │   ├── supabase\client.ts         # Supabase Client Singleton with Fallback Handling
│   │   ├── supabase\mock-data.ts      # 100% Real Production Seed Data Fallback
│   │   └── utils.ts                   # Class merging (clsx + tailwind-merge) & Formatters
│   │
│   └── types\
│       └── database.types.ts          # Strongly-typed Supabase PostgreSQL Database Schemas
│
├── supabase\                          # Database Migration SQL Scripts
├── DESIGN.md                          # UI/UX & Color System Standard
├── SYSTEM_MANUAL.md                   # Full System Specification & SOP Manual
└── AGENTS.md                          # Central AI Agent Rules & Codebase Protocols
```

---

## 🎨 3. UI/UX & Styling Invariants (กฎเหล็กการออกแบบ)

1. **Public Frontend Integrity**:
   - The Public Website (`/`, `/quote`, `/services`, `/projects`, `/service-areas`) **must remain 100% true to its original design**. Never change the layout or style of the public site unless explicitly asked.
2. **Admin Suite Design Standards (`DESIGN.md`)**:
   - Primary Brand Navy: `#00081E` / Container `#0A1F44`
   - Brand Gold Accent: `#FED488` / `#C5A059`
   - Live Emerald Status: `#10B981`
   - Background Surface: Clean White `#FFFFFF` / Slate `#F8FAFC`
   - **Border Radius Standards**:
     - Card Containers & Tables: **`12px` (`rounded-lg`)**
     - Action Buttons, Search Bars & Inputs: **`8px` (`rounded-md`)**
     - Modals & Drawers: **`16px` (`rounded-2xl`)**
     - **FORBIDDEN**: Do NOT use arbitrary oversized classes like `rounded-[24px]` or `rounded-3xl` for standard cards.
3. **Typography**:
   - Primary: Google `Inter` font stack (`var(--font-inter)`)
   - Fallback: `Prompt` (`var(--font-prompt)`)

---

## 🔗 4. Hyperlink & Navigation Rules

1. **No Fake/Placeholder Links**:
   - Every external or internal link from the Admin Console or Public Pages **must point to an existing real route**.
   - Admin links to public pages must use `target="_blank"` with `rel="noopener noreferrer"`.
2. **Standard Route Registry**:
   - Homepage: `/`
   - Quote Calculator: `/quote`
   - Services Catalog: `/services`
   - Misted Glass Service: `/services/misted-glass-repair`
   - Modern Windows Service: `/services/modern-windows`
   - Stylish Doors Service: `/services/stylish-doors`
   - Warm Roofs Service: `/services/warm-roof-conservatories`
   - Balustrades Service: `/services/glass-balustrades`
   - Projects Portfolio: `/projects`
   - Coverage Areas: `/service-areas`
   - Blog Guides: `/blog`
   - Admin Suite: `/admin`

---

## 🗄️ 5. Database & API State Management

1. **Supabase & Local Synchrony**:
   - Always ensure changes to Supabase schema are reflected in both [database.types.ts](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/src/types/database.types.ts) and [mock-data.ts](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/src/lib/supabase/mock-data.ts).
   - If Supabase Cloud is unreachable or credentials are not yet entered, the app gracefully uses local state so all 18 modules remain fully interactive.
2. **API Secret Masking**:
   - Never log or render sensitive API secrets (CAPI Tokens, Secret Keys) in plaintext on the client side.

---

## 🧹 6. Clean Code & Zero-Clutter Protocols

1. **No Dead or Orphaned Code**:
   - Delete temporary test scripts, unused components, and commented-out legacy code before committing.
2. **Type Safety**:
   - All TypeScript files must compile cleanly with zero errors (`tsc --noEmit`).
3. **Commit & Push Hygiene**:
   - Keep commits atomic and descriptive with standard semantic commit conventions (`feat:`, `fix:`, `refactor:`, `docs:`).
