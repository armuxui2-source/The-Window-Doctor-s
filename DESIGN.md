# 🎨 The Window Doctor — Official Minimal Design System (DESIGN.md)

This document establishes the official design tokens, typography, border-radii, and layout standards for **The Window Doctor** (both public web application and Enterprise Admin Suite).

---

## 1. 📐 Border Radius Scale (Subtle, Balanced, Minimal SaaS)

We follow the minimalist design system inspired by **Linear, Stripe, and Apple**:

| Token Class | Pixel Value | Intended Usage |
|---|---|---|
| `rounded-none` | `0px` | Full-width edge-to-edge banners |
| `rounded-xs` | `4px` | Tiny inline badges, micro tags, indicators |
| `rounded-sm` | `6px` | Compact table cells, sub-pills, tooltips |
| `rounded-md` (or `rounded`) | `8px` | **Primary Action Buttons, Form Inputs, Select Dropdowns, Small Cards** |
| `rounded-lg` | `12px` | **Standard Cards, CRM Rows, Testimonials, Service Catalog Cards** |
| `rounded-xl` | `14px` | **Major Dashboard Containers, Feature Sections, Drawers** |
| `rounded-2xl` | `16px` | **Modals, Dialogs, Large Hero Banners** |
| `rounded-full` | `9999px` | **Only for Circular Avatars, Indicator Dots, Close Icon Buttons** |

> ⚠️ **Design Rule**: Never use oversized rounded radii (e.g. `24px`, `32px`, `48px`) or capsule-shaped rectangular cards. All structural cards must have a clean, subtle, and balanced curve (`12px` - `14px`).

---

## 2. 🔤 Typography (Inter & Telegram Standard Stack)

- **Primary Font**: `Inter` (Google Fonts) with Latin subsets and high-legibility rendering (`-webkit-font-smoothing: antialiased`).
- **Thai & Fallback Font**: `Prompt`, followed by system UI stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
- **Monospace Font**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` (for Postcodes, Timestamps, Reference Numbers).

---

## 3. 🎨 Color Palette & Contrast Tokens

- **Navy Primary**: `#00081E` / Container `#0A1F44` (Master glazier authority and trust)
- **Gold Accent (Secondary)**: `#C5A059` / Gold Light `#FED488` / Gold Dark `#775A19` (Heritage 1983 excellence)
- **Neutral Surface**: `#F9F9FF` (Airy, clean background)
- **Borders & Dividers**: `border-slate-200/80` or `border-outline-variant` (Ultra-subtle, 1px precision)
- **Success & Verified**: Emerald `#059669` / `#10B981` (FENSA & Live Telemetry)

---

## 4. 🪟 Components & Interaction

1. **Button Heights**: Standard `h-9` (36px) or `h-10` (40px) with `rounded-md` (8px).
2. **Card Padding**: Standard `p-5` (20px) or `p-6` (24px) with subtle `shadow-2xs` or `shadow-sm`.
3. **Sidebar Rail**: 264px expanded / 72px icon rail with smooth CSS transition.
4. **Slide-over Drawer**: Right-aligned 480px panel with backdrop blur and smooth entrance.
