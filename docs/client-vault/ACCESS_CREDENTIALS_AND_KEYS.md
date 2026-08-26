# 🔐 Access Credentials, API Keys & System Vault

**Client Name:** The Window Doctor (Bicester & Oxfordshire)  
**Project ID:** `TWD-UK-2026`  
**Classification:** Confidential Developer Vault  
**Primary Architect:** ARM Product Studio  

---

## 🌐 1. Domain & Environment Endpoints

| สภาพแวดล้อม (Environment) | URL ปลายทาง | สถานะ (Status) |
|---|---|---|
| **Production Web Platform** | `https://thewindowdoctors.co.uk` (or Vercel Deploy) | 🟢 Live |
| **Local Development** | `http://localhost:3000` | 🟢 Active |
| **Staff & Admin Console** | `http://localhost:3000/admin` (or `/admin`) | 🟢 Active |
| **Developer Portfolio Showcase** | `http://localhost:3000/showcase` (Private Direct Route) | 🟢 Active (Isolated Sandbox) |

---

## 🗄️ 2. Supabase Cloud PostgreSQL Credentials

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PostgreSQL Direct Connection String (Pooler Port 6543 / Direct Port 5432)
DATABASE_URL=postgresql://postgres.your-project-ref:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

> [!NOTE]
> **ระบบ Fallback จำลอง**: หากยังไม่ได้ใส่กุญแจ Supabase ระบบจะสลับไปใช้ In-Memory Mock Data ใน `src/lib/supabase/mock-data.ts` โดยอัตโนมัติ ทำให้เว็บทำงานได้ครบทุกฟังก์ชั่นโดยไม่เกิด Error

---

## 🔌 3. No-Code Marketing & API Integrations Vault

| แพลตฟอร์ม (Platform) | รูปแบบคีย์ / Key Parameter | สถานะการเชื่อมต่อ | ตำแหน่งจัดการในระบบ |
|---|---|---|---|
| **Google Analytics 4** | `G-XXXXXXXXXX` (Measurement ID) | Ready | Admin > Marketing Hub |
| **Google Tag Manager** | `GTM-XXXXXXX` (Container ID) | Ready | Admin > Marketing Hub |
| **Google Search Console** | `google-site-verification=...` | Ready | Admin > Marketing Hub |
| **Google Ads Conversion** | `AW-XXXXXXXXX` / `Send_to_label` | Ready | Admin > Marketing Hub |
| **Meta Pixel & CAPI** | `Pixel ID` / `Meta Access Token` | Ready | Admin > Marketing Hub |
| **LINE Messaging API** | `LINE Channel Access Token` | Ready | Admin > Marketing Hub |
| **Google Maps Platform** | `AIzaSy...` (Distance Matrix Key) | Ready | Admin > Coverage Areas |

---

## 👤 4. Administrative Staff Roles & Access Levels

| บทบาท (Role) | สิทธิ์การเข้าถึง (Permissions) | เส้นทางเข้าสู่ระบบ (Path) |
|---|---|---|
| **Super Admin / Owner** | Full CRUD, CRM Leads, SEO Quests, Sync DB, System Integrations | `/admin` |
| **Operations Surveyor** | View CRM Quotes, Update Survey Status, Customer Calling | `/admin` > Leads Drawer |
| **Marketing Manager** | Content Edits, FAQs, Projects Gallery, Google Tag Updates | `/admin` > CMS Tabs |
