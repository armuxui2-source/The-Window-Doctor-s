---
name: supabase
description: Supabase database, authentication, real-time, storage, and serverless edge functions specialist for The Window Doctor project.
---

# Supabase Agent Skill: The Window Doctor

This skill equips the agent with domain-specific knowledge and best practices for integrating and maintaining Supabase in **The Window Doctor** fenestration web platform.

## 1. Project Configuration & Credentials
- **Project Name:** `The-Window-Doctor`
- **Project Ref:** `qamagzdnnislphuauzco`
- **Supabase URL:** `https://qamagzdnnislphuauzco.supabase.co`
- **Connection URI (Direct):** `postgresql://postgres:[PASSWORD]@db.qamagzdnnislphuauzco.supabase.co:5432/postgres`

## 2. Core Tables & Architecture
The project database schema comprises the following primary models:
1. `service_categories` & `services`: Service definitions, prices, warranty, and features.
2. `service_areas` & `postcodes`: OX/HP coverage validator and response time SLAs.
3. `quotes`: Instant quote calculation requests with fenestration options, glass type, frames, and estimated pricing.
4. `bookings`: Survey and repair appointment slots booked by customers.
5. `leads`: General contact inquiries and callback requests.
6. `admin_users`: Staff authentication and role-based permissions (admin, technician, staff).

## 3. Client Usage Patterns

### TypeScript Client (`src/lib/supabase/client.ts`)
```typescript
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### Server-side Actions / Route Handlers (Admin Privileges)
When performing administrative queries that bypass Row Level Security (RLS), use `SUPABASE_SERVICE_ROLE_KEY` exclusively on server side:
```typescript
import { createClient } from "@supabase/supabase-js";

export const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

## 4. SQL Migration & Schema Updates
SQL migration files are maintained in `/supabase/migrations/`:
- `01_initial_schema.sql`: Complete DDL for all tables, indexes, triggers, and RLS policies.
- `seed.sql`: Seed data for Oxfordshire postcodes (Bicester, Oxford, Banbury, Witney, etc.) and window repair service catalog.

## 5. Security & Row Level Security (RLS)
- Public tables (e.g. `service_areas`, `postcodes`, `services`) have `SELECT` open to `anon` and `authenticated`.
- `quotes` and `leads` allow `INSERT` for `anon` users with rate limiting, and `SELECT/UPDATE` only for `admin_users` or authenticated staff.
