---
name: supabase
description: Official Supabase database, authentication, real-time, storage, and serverless edge functions specialist for The Window Doctor project.
---

# 🚀 Supabase Specialist Skill: The Window Doctor (Bicester & Oxfordshire)

This skill equips the AI agent with deep domain-specific knowledge, architecture patterns, and operational procedures for managing Supabase in **The Window Doctor** (Est. 1983) web application.

---

## 1. ⚙️ Project Configuration & Production Credentials

| Parameter | Configuration Value |
|---|---|
| **Project Name** | `The-Window-Doctor` |
| **Project Ref** | `qamagzdnnislphuauzco` |
| **Supabase Project URL** | `https://qamagzdnnislphuauzco.supabase.co` |
| **Direct Postgres URI** | `postgresql://postgres:[YOUR-PASSWORD]@db.qamagzdnnislphuauzco.supabase.co:5432/postgres` |
| **MCP Server URL** | `https://mcp.supabase.com/mcp?project_ref=qamagzdnnislphuauzco&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching%2Cstorage` |
| **Environment File** | `.env.local` |
| **Public Anon Key Env** | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Service Role Secret Env** | `SUPABASE_SERVICE_ROLE_KEY` |

---

## 2. 🗄️ Database Architecture & Table Catalog

The project database schema is organized into 15 core tables:

### 🌐 Global Content & CMS Tables:
1. `site_settings`: Global business info, address, phone (`01869 572206`), FENSA `#28491`, opening hours, Place ID.
2. `hero_slides`: Hero carousel slider slides with title, highlight, badge, image URL, CTA buttons, and stats JSONB.
3. `faqs`: Frequently Asked Questions with questions, answers, category, and sort order.
4. `comparison_matrix`: The Window Doctor vs National Window Sales 5-row advantage comparison.
5. `process_steps`: 4-stage glazier process (Survey, Glazing, Install, Guarantee).
6. `trust_pillars`: 4 authority pillars (Est. 1983 Heritage, FENSA Reg 28491, 10-Year Guarantee, No Pressure Sales).
7. `frame_colors`: 8 window frame colors with RAL codes, swatches, and finishes.
8. `energy_rates`: Annual energy savings and CO2 reduction benchmarks.

### 💼 Business Operations & CRM Tables:
9. `service_categories`: 5 core categories (Glass Repairs, Modern Windows, Stylish Doors, Conservatories, Balustrades).
10. `services`: Detailed service catalogue with technical specifications, pricing estimates, and FENSA certification.
11. `service_areas` & `postcodes`: Oxfordshire coverage validator (OX25, OX26, OX27, OX1-OX5, OX15, OX16, OX28, OX29, OX9, NN13, MK18).
12. `quote_requests` & `leads`: Incoming customer instant quote calculations and contact form leads.
13. `projects`: Case study portfolio with before/after photography and project specs.
14. `customer_reviews`: 5-star Google and verified customer testimonials.
15. `integration_configs`: 8 marketing & analytics tags (GA4, GTM, GSC, Google Ads, Meta Pixel, Meta CAPI, LINE, Google Maps).

---

## 3. 🛠️ Supabase Client Usage Best Practices

### Client-Side (Browser / React Components)
```typescript
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qamagzdnnislphuauzco.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Server-Side (Route Handlers & Server Actions)
Always use the `SUPABASE_SERVICE_ROLE_KEY` for administrative tasks and bypassing RLS on the server:
```typescript
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

export function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qamagzdnnislphuauzco.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

---

## 4. 🔒 Row Level Security (RLS) & Security Policies

- **Public Read (SELECT)**:
  - `site_settings`, `hero_slides`, `faqs`, `comparison_matrix`, `process_steps`, `trust_pillars`, `frame_colors`, `energy_rates`, `service_categories`, `services`, `service_areas`, `postcodes`, `projects`, `customer_reviews`, `blog_posts`
- **Public Insert (INSERT)**:
  - `quote_requests` and `leads` (allows customers to submit quote requests from the Quote Wizard)
- **Service Role Only (ALL)**:
  - `integration_configs` (protects secret tokens, CAPI tokens, and API keys)
  - `audit_logs` and `site_analytics`

---

## 5. 📦 SQL DDL & Migration Scripts

The master SQL script containing all DDL, RLS policies, and 100% initial seed data is located at:
`supabase/full_schema_and_seed.sql`

To execute or re-seed:
1. Open [Supabase SQL Editor](https://supabase.com/dashboard/project/qamagzdnnislphuauzco/sql/new)
2. Paste the contents of `supabase/full_schema_and_seed.sql`
3. Click **Run**
