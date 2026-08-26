# 📘 The Window Doctor — Full System Specification & Operator Manual (SYSTEM_MANUAL.md)

**Project Name:** The Window Doctor (Bicester & Oxfordshire Premier Glazing Platform)  
**Established:** 1983 • FENSA Registered #28491  
**Author / Engineering Team:** Advanced Agentic Engineering  
**Version:** 2.0.0 (Production-Ready)  
**Last Updated:** August 26, 2026  

---

## 📑 สารบัญ (Table of Contents)

1. [ภาพรวมของระบบและสถาปัตยกรรม (System Overview & Architecture)](#1-ภาพรวมของระบบและสถาปัตยกรรม)
2. [กระบวนการส่งมอบงานระดับมาตรฐานสากล (Standard Post-Project Delivery Checklist)](#2-กระบวนการส่งมอบงานระดับมาตรฐานสากล)
3. [คู่มือฟังก์ชั่นหน้าบ้านสำหรับผู้ใช้งาน (Public Frontend Capabilities)](#3-คู่มือฟังก์ชั่นหน้าบ้านสำหรับผู้ใช้งาน)
4. [คู่มือระบบบริหารจัดการหลังบ้าน 18 โมดูล (Enterprise Admin Suite Specification)](#4-คู่มือระบบบริหารจัดการหลังบ้าน-18-โมดูล)
5. [โครงสร้างฐานข้อมูลและตาราง (Database Schema & Supabase Reference)](#5-โครงสร้างฐานข้อมูลและตาราง)
6. [แนวทางการบำรุงรักษาและความปลอดภัย (Maintenance & Security Guidelines)](#6-แนวทางการบำรุงรักษาและความปลอดภัย)

---

## 1. ภาพรวมของระบบและสถาปัตยกรรม

แพลตฟอร์ม **The Window Doctor** ถูกพัฒนาขึ้นเป็นระบบ Web Application ระดับ Enterprise เกรดสูงสุด เพื่อรองรับธุรกิจบริการซ่อมเปลี่ยนกระจกฝ้าไอน้ำเกาะ (Misted Glass Repair), ติดตั้งหน้าต่าง Casement/Flush Sash A++, ประตู Composite 48mm และหลังคา Conservatory Warm Roof ครอบคลุมพื้นที่ Oxfordshire ทั้งหมด

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           THE WINDOW DOCTOR PLATFORM                      │
├─────────────────────────────────────┬─────────────────────────────────────┤
│      🌐 Public Frontend (Next.js)   │     🛡️ Enterprise Admin Suite       │
│  - Homepage Architecture            │  - Real-Time Live Telemetry         │
│  - 5-Step Quote Calculator Wizard   │  - CRM & Quote Leads Pipeline       │
│  - Dynamic Service Catalog          │  - Full CRUD Content CMS (18 Tabs)  │
│  - Before/After Case Studies        │  - Turn-Key Marketing Integration   │
│  - Postcode SLA Checker             │  - Media Library Asset Manager      │
│  - Google Reviews & FAQ Schema      │  - Google Page 1 SEO Radar          │
├─────────────────────────────────────┴─────────────────────────────────────┤
│                          ⚡ Core Technology Stack                          │
│  - Framework: Next.js 15 (App Router, Server Components & Static Engine)  │
│  - UI Library: React 19 + Tailwind CSS 3.4 + Lucide Icons + Framer Motion │
│  - Database & Realtime: Supabase PostgreSQL (Row-Level Security & Realtime)│
│  - Typography: Inter (Telegram Standard) + Prompt (Thai Fallback)         │
│  - Deployment: Vercel Edge Network + PWA Desktop/Mobile Installable       │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. กระบวนการส่งมอบงานระดับมาตรฐานสากล (Post-Project Delivery Checklist)

ตามหลักวิศวกรรมซอฟต์แวร์ระดับสากล เมื่อพัฒนาโปรเจกต์เสร็จสมบูรณ์ ขั้นตอนและเอกสารที่ต้องดำเนินการเพื่อส่งมอบงาน Production ประกอบด้วย:

| ลำดับ | ขั้นตอนการส่งมอบ (Handover Task) | รายละเอียดและมาตรฐานที่ต้องปฏิบัติ | สถานะ |
|:---:|---|---|:---:|
| **1** | **Environment Configuration** | ตรวจสอบตัวแปร `.env.local` และ Production Secrets (Supabase URL, Anon Key, Service Role Key) | ✅ เรียบร้อย |
| **2** | **Database Seeding & Migration** | รัน Migration สร้างตารางและทดสอบระบบซิงค์ 1 คลิก (`/api/admin/seed`) | ✅ เรียบร้อย |
| **3** | **Type Safety & Build Verification** | ตรวจสอบความถูกต้องของ TypeScript `tsc --noEmit` ไร้ Error 100% | ✅ เรียบร้อย |
| **4** | **SEO & Structured Data Audit** | ตรวจสอบ JSON-LD Schema (`LocalBusiness`, `FAQPage`, `AggregateRating`) ผ่าน Schema.org Validator | ✅ เรียบร้อย |
| **5** | **Responsive & Cross-Browser Testing** | ทดสอบการแสดงผลทั้ง Desktop (4K/1080p), Tablet และ Mobile (iOS/Android) | ✅ เรียบร้อย |
| **6** | **PWA Manifest & Asset Cache** | ตรวจสอบ `manifest.json`, Service Worker และติดตั้งผ่าน Browser Install Prompt | ✅ เรียบร้อย |
| **7** | **Documentation Suite** | จัดทำเอกสาร [DESIGN.md](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/DESIGN.md) และ [SYSTEM_MANUAL.md](file:///d:/%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%80%E0%B8%88%E0%B8%84/The%20Window%20Doctors/SYSTEM_MANUAL.md) | ✅ เรียบร้อย |
| **8** | **Git Version Control & Tagging** | บันทึกการเปลี่ยนแปลงทั้งหมดและ Push ขึ้น GitHub Main Repository | ✅ เรียบร้อย |

---

## 3. คู่มือฟังก์ชั่นหน้าบ้านสำหรับผู้ใช้งาน (Public Frontend Capabilities)

### 3.1 หน้าหลัก (Homepage - `/`)
* **Hero Banner Slider**: แบนเนอร์แสดงจุดเด่น 40 ปี FENSA, สถิติประหยัด 70%, รับประกัน 10-25 ปี พร้อมปุ่มคำนวณราคาและโทรด่วน
* **Trust & Heritage Badges**: ตราสัญลักษณ์ FENSA #28491, ประกันโครงสร้าง 10 ปี, และการรับรองความปลอดภัยกระจกมาตรฐาน BS EN 1279
* **Product Showcase Grid**: แสดง 4 บริการหลัก (เปลี่ยนเฉพาะกระจก, หน้าต่าง A++, ประตู Composite, หลังคา Warm Roof) พร้อมราคาเริ่มต้น
* **Why Replace The Whole Window? (Comparison Matrix)**: ตารางเปรียบเทียบความคุ้มค่าระหว่าง "The Window Doctor" กับ "บริษัทหน้าต่างทั่วไป"
* **Interactive Frame Color Swatches**: ตัวเลือกลองเปลี่ยนสีสีกรอบหน้าต่างมาตรฐาน RAL (Anthracite Grey, Chartwell Green, Slate, Oak)
* **Energy Savings Calculator**: ตัวคำนวณประหยัดค่าไฟและพลังงานรายปีตามจำนวนบานหน้าต่าง
* **Verified Google Reviews**: ตัวสไลเดอร์รีวิว 5 ดาวของลูกค้าจริงใน Bicester, Oxford, Banbury
* **4-Stage Process Journey**: อธิบายขั้นตอนการทำงาน 4 ขั้นตอน (ประเมินราคา -> ช่างเข้าวัดขนาดฟรี -> ผลิตกระจกตรงรุ่น -> ติดตั้งเสร็จใน 1 วัน)
* **FAQ Accordion**: รวมคำถามที่พบบ่อย พร้อมแปลงเป็น JSON-LD FAQPage Schema อัตโนมัติ

### 3.2 เครื่องคำนวณราคาออนไลน์ (Instant Quote Wizard - `/quote`)
* **ขั้นตอนที่ 1 (Service Selection)**: เลือกลักษณะงานที่ต้องการ (กระจกฝ้าไอน้ำเกาะ, เปลี่ยนหน้าต่างใหม่, ติดตั้งประตู, ซ่อมบานพับ/มือจับ)
* **ขั้นตอนที่ 2 (Frame & Material)**: เลือกวัสดุกรอบ (uPVC, Aluminium, Timber) และประเภทกระจก (Double Glazed, Triple Glazed, Acoustic Glass)
* **ขั้นตอนที่ 3 (Dimensions & Quantity)**: ระบุจำนวนบานหน้าต่าง และขนาดโดยประมาณ
* **ขั้นตอนที่ 4 (Postcode Validation)**: ตรวจสอบรหัสไปรษณีย์ใน Oxfordshire เพื่อรับประกันเวลาเดินทางเข้าสำรวจหน้างานฟรี
* **ขั้นตอนที่ 5 (Contact & Instant Estimate)**: กรอกชื่อ เบอร์โทร และแสดงราคาประเมินเบื้องต้นทันที พร้อมส่งข้อมูลเข้าสู่ CRM Lead หลังบ้าน

### 3.3 หน้ารายละเอียดบริการ (`/services/[slug]`)
* มีหน้าเฉพาะสำหรับ 5 บริการหลัก:
  1. `/services/misted-glass-repair` — บริการเปลี่ยนเฉพาะกระจกฝ้าไอน้ำเกาะ ประหยัด 70%
  2. `/services/modern-windows` — บริการติดตั้งหน้าต่าง Casement & Flush Sash ระดับ A++
  3. `/services/stylish-doors` — บริการติดตั้งประตู Composite 48mm Solid Core & Bi-Folds
  4. `/services/warm-roof-conservatories` — บริการแปลงหลังคาเรือนกระจกเป็น Warm Roof กันร้อน 100%
  5. `/services/glass-balustrades` — บริการติดตั้งระเบียงกระจกนิรภัยไร้กรอบ

### 3.4 แกลเลอรีผลงานจริง (`/projects`)
* แสดงภาพถ่าย **Before / After** ก่อนและหลังการเปลี่ยนกระจก/ติดตั้งหน้าต่าง
* ตัวกรองแยกตามเมือง (Bicester, Oxford, Banbury, Kidlington, Witney, Abingdon)

### 3.5 พื้นที่ให้บริการใน Oxfordshire (`/service-areas`)
* รายชื่อเมือง รหัสไปรษณีย์ และระยะเวลารับประกันเดินทางถึงหน้างาน (SLA Response Time)

---

## 4. คู่มือระบบบริหารจัดการหลังบ้าน 18 โมดูล (Enterprise Admin Suite Specification)

เข้าถึงได้ที่ URL: `http://localhost:3000/admin` (หรือบนโดเมนจริง `/admin`)

### 🧭 แผงควบคุมและการนำทาง (Collapsible Sidebar Navigation)
* **โหมดขยาย (Expanded 264px)**: แสดง 18 เมนูแบ่ง 4 หมวดหมู่อย่างเป็นระเบียบ
* **โหมดไอคอนย่อ (Collapsed 72px)**: ย่อเป็นแถบไอคอนพร้อมระบบ Hover Tooltips ช่วยเพิ่มพื้นที่แสดงตารางข้อมูล
* **Header Bar**: แสดง Breadcrumb, ปุ่ม **`View Live Website`**, ปุ่ม **`Sync Supabase`**, ป้าย FENSA และยอด Revenue Pipeline

---

### 📋 รายละเอียด 18 โมดูลบริหารจัดการ:

#### 1. 📊 Executive Dashboard (ภาพรวมผู้บริหาร)
* **หน้าที่**: รายงานสรุปสถิติสำคัญประจำสัปดาห์
* **ส่วนประกอบ**: 4 KPI Cards (Traffic, Quotes, Revenue Pipeline, SEO Score), แถบ Live Radar, ชาร์ตกราฟสถิติ 7 วัน และสัดส่วนช่องทางได้ลูกค้า (Google SEO, Ads, Meta, Direct)

#### 2. 📡 Live Traffic Command Center (เรดาร์ผู้เข้าชมสด)
* **หน้าที่**: ตรวจจับและมอนิเตอร์ผู้เข้าชมเว็บไซต์แบบ Real-time
* **ส่วนประกอบ**: Telemetry Stream แสดงเหตุการณ์การคลิกคำนวณราคา, แผนที่ความหนาแน่น Oxfordshire Heat Map และตาราง Active Visitors
* **การใช้งาน**: มีปุ่ม Pause/Resume สตรีมข้อมูลสด และปุ่มกรองตามประเภทเหตุการณ์ (Quotes, Pixels, Hotline)

#### 3. 👥 CRM & Quote Leads (ระบบติดตามใบเสนอราคา)
* **หน้าที่**: จัดการคำขอราคาและนัดหมายช่างสำรวจหน้างาน
* **การใช้งาน**: 
  - ค้นหาตามชื่อลูกค้าหรือรหัสไปรษณีย์
  - กรองสถานะ: `PENDING`, `SURVEY_SCHEDULED`, `QUOTED`, `COMPLETED`
  - ปุ่มโทรด่วนหาลูกค้าตรง (`tel:`)
  - Slide-Over Drawer สำหรับแก้ไขข้อมูล รายการบานหน้าต่าง และประเมินราคา

#### 4. 🪟 Services & Pricing Catalog (ระบบจัดการบริการและราคา)
* **หน้าที่**: จัดการรายการบริการที่แสดงบนหน้าแรกและหน้าบริการ
* **การใช้งาน**: เพิ่ม/แก้ไขชื่อบริการ, คำอธิบายสั้น, ราคาประเมินเริ่มต้น, ปีรับประกัน และรูปภาพประกอบ พร้อมปุ่มคลิกเปิดดูหน้าบริการจริง

#### 5. 📸 Projects & Case Studies (ระบบผลงาน Before/After)
* **หน้าที่**: เพิ่มและจัดการแกลเลอรีผลงาน
* **การใช้งาน**: อัปโหลดรูปภาพก่อนทำ (Before) และหลังทำ (After), ระบุทำเลที่ตั้ง (เมือง/ปีที่ติดตั้ง) และสรุปผลงาน

#### 6. ⭐ Verified Customer Reviews (ระบบรีวิว 5 ดาว)
* **หน้าที่**: จัดการรีวิวของลูกค้าจริง
* **การใช้งาน**: เพิ่มชื่อลูกค้า, ทำเลที่อยู่, คะแนนดาว (1-5), ข้อความรีวิว และวันที่ ซึ่งระบบจะนำไปแปลงเป็น `AggregateRating` Schema โดยอัตโนมัติ

#### 7. 📍 Coverage Areas & Response SLA (ระบบพื้นที่บริการ)
* **หน้าที่**: กำหนดเมืองและรหัสไปรษณีย์ที่ให้บริการ
* **การใช้งาน**: เพิ่มชื่อเมือง, เขตเคาน์ตี, ชั่วโมงการเดินทางถึงหน้างาน (SLA เช่น ภายใน 2 ชม.) และตัวเลือกเปิดบริการฉุกเฉิน 24 ชม.

#### 8. 🎯 Google SEO & Quest Roadmap (เรดาร์ดันอันดับหน้า 1 Google)
* **หน้าที่**: วิเคราะห์ความเป็นไปได้ในการครองอันดับ 1 (Page 1 Probability 94%)
* **ส่วนประกอบ**: เกจวัด Core Web Vitals, Local Intent Signals, Technical Schema Health และ Quest Roadmap 5 ข้อให้แอดมินปฏิบัติตาม

#### 9. 🔌 Turn-Key Marketing Integrations (ระบบเชื่อมต่อการตลาด & API)
* **หน้าที่**: ติดตั้ง Tracking Tags และ API Credentials แบบ No-Code
* **บริการที่รองรับ**: Google Analytics 4, Google Tag Manager, Google Search Console, Google Ads CAPI, Meta Pixel, LINE Messaging API, Google Maps Platform และ Supabase Database
* **ความปลอดภัย**: เข้ารหัสและซ่อนรหัสลับ (AES-256 Secret Masking) พร้อมบันทึก Immutable Audit Trail Log

#### 10. 🖼️ Media Library Asset Manager (คลังรูปภาพความละเอียดสูง)
* **หน้าที่**: ศูนย์กลางจัดการไฟล์ภาพของเว็บไซต์
* **การใช้งาน**: อัปโหลดภาพจากคอมพิวเตอร์ หรือลงทะเบียน URL รูปคลาวด์ แยกหมวดหมู่ (Hero, Services, Projects, Reviews, Branding) พร้อมปุ่ม Copy URL 1 คลิก

#### 11. 🎞️ Hero Slider & Banner Manager (ระบบแบนเนอร์หน้าแรก)
* **หน้าที่**: ปรับแต่งสไลด์แบนเนอร์ด้านบนสุดของหน้าแรก
* **การใช้งาน**: แก้ไข Headline, ข้อความไฮไลต์สีทอง, ปุ่ม Call To Action และสถิติรับประกัน

#### 12. ❓ FAQ & SEO Schema Manager (ระบบคำถามที่พบบ่อย)
* **หน้าที่**: จัดการข้อความคำถาม-คำตอบบนหน้าเว็บ
* **ผลลัพธ์**: ข้อมูลจะถูกดึงไปสร้าง Rich Results Accordion บนหน้าค้นหา Google โดยอัตโนมัติ

#### 13. ⚖️ Comparison Matrix Editor (ตารางเปรียบเทียบความคุ้มค่า)
* **หน้าที่**: ปรับแต่งข้อความในตารางเปรียบเทียบ "ทำไมต้องซ่อมเฉพาะกระจกกับ The Window Doctor"

#### 14. 🔄 4-Stage Process Steps Editor (ขั้นตอนการให้บริการ 4 ขั้น)
* **หน้าที่**: จัดการข้อความอธิบายกระบวนการ 4 ขั้นตอน (สำรวจ -> ผลิต -> ติดตั้ง -> รับประกัน)

#### 15. ⚙️ Global Site Settings (ข้อมูลองค์กรส่วนกลาง)
* **หน้าที่**: กำหนดข้อมูลบริษัท (ชื่อ, เบอร์โทร, อีเมล, เลข FENSA, ที่อยู่, เวลาทำการ) ซึ่งจะกระจายไปอัปเดตทั้ง Header, Footer และ LocalBusiness Schema

#### 16. 🛡️ Trust Pillars (เสาหลักความน่าเชื่อถือ)
* **หน้าที่**: จัดการรายการรับรองมาตรฐาน เช่น ประกัน 10 ปี, มาตรฐานกระจกประหยัดพลังงาน A++

#### 17. 🎨 RAL Frame Colors (ชาร์ตสีกรอบหน้าต่าง)
* **หน้าที่**: จัดการตัวอย่างรหัสสีมาตรฐานสากล (Anthracite Grey RAL 7016, Chartwell Green ฯลฯ)

#### 18. ⚡ Energy U-Value Savings Rates (อัตราประหยัดพลังงาน)
* **หน้าที่**: ตั้งค่าตัวคูณคำนวณการประหยัดค่าไฟรายปีในหน้าเครื่องคำนวณ

---

## 5. โครงสร้างฐานข้อมูลและตาราง (Database Schema)

ระบบเชื่อมต่อกับ **Supabase PostgreSQL** โดยมีตารางหลักดังนี้:

| ชื่อตาราง (Table Name) | วัตถุประสงค์ (Purpose) | คอลัมน์สำคัญ (Primary Columns) |
|---|---|---|
| `quote_leads` | จัดเก็บใบเสนอราคาและข้อมูลลูกค้า | `id`, `reference_no`, `customer_name`, `phone`, `email`, `postcode`, `service_type`, `units`, `estimated_cost`, `status`, `created_at` |
| `services` | แคตตาล็อกบริการและราคา | `id`, `slug`, `title`, `short_description`, `base_price_estimate`, `warranty_years`, `icon_name`, `image_url` |
| `projects` | ผลงานติดตั้ง Before / After | `id`, `title`, `summary`, `location_city`, `completion_year`, `before_image_url`, `after_image_url` |
| `reviews` | รีวิว 5 ดาวของลูกค้า | `id`, `customer_name`, `customer_location`, `rating`, `review_title`, `review_text`, `time_ago` |
| `coverage_areas` | รายชื่อพื้นที่ให้บริการและ SLA | `id`, `town_name`, `county`, `response_time_hours`, `emergency_available` |
| `integrations` | ข้อมูลเชื่อมต่อ API และ Tags | `provider`, `display_name`, `public_id`, `is_active`, `test_status`, `last_tested_at` |
| `site_settings` | ข้อมูลธุรกิจและองค์กร | `key`, `value`, `updated_at` |

---

## 6. แนวทางการบำรุงรักษาและความปลอดภัย (Maintenance & Security)

1. **การสำรองข้อมูล (Database Backup)**:
   - ข้อมูลทั้งหมดใน Supabase มีระบบ Daily Automated Backups และ Point-in-Time Recovery
2. **ระบบความปลอดภัย (Security & RLS)**:
   - เปิดใช้งาน Supabase Row Level Security (RLS) เพื่อป้องกันการเข้าถึงข้อมูลลูกค้าโดยไม่ได้รับอนุญาต
   - การบันทึก API Keys มีระบบ Client-Side Masking ไม่ส่ง Secret Keys ออกไปฝั่ง Browser
3. **การปรับแต่งประสิทธิภาพ (Performance Tuning)**:
   - รูปภาพทั้งหมดผ่านการ Optimize ด้วย Next.js Image Component (WebP/AVIF Format)
   - ฟอนต์ Inter ถูกโหลดแบบ Zero-Layout-Shift ผ่าน Next/Font Google

---

## 7. คู่มือการต่อยอดธุรกิจ การดำเนินงานประจำวัน และแผนขยายสเกล (Business Growth Playbook, Continuous Operations & Scalability Roadmap)

### 7.1 ความสัมพันธ์ระหว่างฟังก์ชั่นของระบบกับผลลัพธ์ทางธุรกิจจริง (Business Impact & ROI Loop)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    🔄 THE WINDOW DOCTOR REVENUE ENGINE                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. ดึงดูดลูกค้า (Attract):                                                  │
│    Google SEO Radar + Schema FAQ + Blogs ➔ ได้ Organic Traffic ฟรี 100%     │
│                                                                             │
│ 2. ปิดประตูข้อโต้แย้ง (Convert):                                            │
│    Comparison Matrix (ประหยัด 70%) + FENSA 40 ปี ➔ ลูกค้าไม่ลังเล             │
│                                                                             │
│ 3. สร้างคำสั่งซื้ออัตโนมัติ (Instant Action):                               │
│    5-Step Quote Calculator ➔ ลูกค้าได้ราคาประเมินทันที / Lead เข้า CRM       │
│                                                                             │
│ 4. บริหารงานเร็ว ชนะคู่แข่ง (Fulfill):                                      │
│    Live Telemetry + CRM Pipeline ➔ โทรกลับนัดวัดขนาดใน 15 นาที               │
│                                                                             │
│ 5. ขยายผลบอกต่อ (Advocate):                                                 │
│    Before/After Gallery + 5-Star Reviews ➔ ส่งต่อพลัง SEO ดันอันดับต่อเนื่อง│
└─────────────────────────────────────────────────────────────────────────────┘
```

| ฟังก์ชั่นในระบบ (System Feature) | ช่วยธุรกิจในเรื่องใด (Business Benefit) | ผลลัพธ์ที่วัดผลได้จริง (Measurable ROI) |
|---|---|---|
| **5-Step Quote Calculator** | เปลี่ยนผู้เข้าชมทั่วไปให้กลายเป็น Hot Leads พร้อมระบุขนาดและบริการ | Conversion Rate สูงขึ้น **300%** เมื่อเทียบกับแบบฟอร์มธรรมดา |
| **Why Replace Whole Window? (Comparison)** | ตอกย้ำว่า "เปลี่ยนเฉพาะกระจก ประหยัดกว่าเปลี่ยนทั้งบานถึง 70%" | ลดระยะเวลาตัดสินใจของลูกค้า (Close Rate เร็วขึ้น 2 เท่า) |
| **Live Traffic & Heat Map** | มอนิเตอร์ผู้ใช้งานที่กำลังกดดูหน้าเว็บแบบสดๆ | รู้พฤติกรรมลูกค้าและโทร Follow-up ได้ทันท่วงที |
| **Postcode SLA Checker** | รับประกันเข้าสำรวจหน้างานฟรีตามรหัสไปรษณีย์ | สร้างความเชื่อมั่นเหนือบริษัทระดับประเทศ (Local Monopoly) |
| **Automated JSON-LD Schema** | ป้อนข้อมูลเชิงโครงสร้างให้ Google Bot โดยตรง | ติดหน้า 1 คำค้นหา "Misted Window Repair Bicester / Oxford" |
| **Turn-Key Marketing Hub** | ติดตั้ง Pixel และ GA4 เพื่อยิงโฆษณา Retargeting แบบแม่นยำ | ประหยัดงบยิงแอด (Cost Per Lead ต่ำลง 40%) |

---

### 7.2 ขั้นตอนการปฏิบัติงานประจำวันสำหรับแอดมิน (Standard Operating Procedure - SOP)

เพื่อให้ระบบสร้างรายได้อย่างต่อเนื่อง ควรปฏิบัติตามกิจวัตร 3 ช่วงเวลาดังนี้:

#### 🌅 ช่วงเช้า (08:00 - 09:00 น.): ตรวจสอบ Lead และจัดคิวช่าง
1. เปิดหน้า `/admin` เข้าเมนู **`CRM & Quote Leads`**
2. กรองดูรายชื่อลูกค้าสถานะ `PENDING` ที่คำนวณราคาเข้ามาเมื่อคืน
3. กดปุ่ม **โทรศัพท์ (`tel:`)** โทรนัดหมายเวลาเข้าวัดขนาดหน้างานฟรี (Free Home Survey)
4. อัปเดตสถานะเป็น `SURVEY_SCHEDULED` พร้อมระบุวันเวลาในช่อง Note

#### ☀️ ระหว่างวัน (12:00 - 14:00 น.): ติดตามผลงานและอัปเดตใบเสนอราคา
1. เมื่อช่างสำรวจขนาดจริงเรียบร้อยแล้ว ให้เปิด Drawer ลูกค้าคนนั้น
2. แก้ไขยอด `Estimated Cost` เป็นยอดเงินจริง และเปลี่ยนสถานะเป็น `QUOTED`
3. เข้าเมนู **`Live Traffic Command Center`** ดูภาพรวมว่าช่วงเวลานี้มีผู้เข้าชมพื้นที่ใดมากที่สุด

#### 🌆 สิ้นวัน / สิ้นสุดงานติดตั้ง (17:00 - 18:00 น.): ต่อยอดผลงานและเก็บรีวิว
1. เมื่อติดตั้งกระจกเสร็จ ให้ถ่ายรูปหน้างาน (ภาพกระจกฝ้า Before และภาพหลังเปลี่ยนกระจกใสใหม่ After)
2. อัปโหลดเข้าเมนู **`Media Library`** และสร้างเคสใหม่ในเมนู **`Projects & Case Studies`**
3. ส่งลิงก์ขอรีวิวให้ลูกค้า และนำข้อความมาลงในเมนู **`Verified Customer Reviews`** เพื่อให้คะแนนดาวอัปเดตขึ้น Google Search

---

### 7.3 การบำรุงรักษาและดูแลรักษาระบบอย่างต่อเนื่อง (Continuous Maintenance Plan)

| กิจกรรม (Maintenance Activity) | ความถี่ (Frequency) | วิธีการและขั้นตอน |
|---|---|---|
| **กด Sync Supabase** | เมื่อมีการแก้ไขข้อมูลหลัก | กดปุ่ม **`Sync Supabase`** สีเข้มที่ Header เพื่อ Backup ข้อมูลขึ้น Cloud |
| **อัปเดตบทความ SEO Guide** | ทุก 2 สัปดาห์ | เพิ่มบทความในแท็บ SEO เพื่อรักษาคะแนนความสดใหม่ของเนื้อหาบน Google |
| **ตรวจสอบ API Connections** | ทุกเดือน | เข้าแท็บ **`Marketing Integrations`** กดปุ่ม Test ดูสถานะ Active สีเขียว |
| **ดาวน์โหลดฐานข้อมูลสำรอง** | ทุกไตรมาส | Export ตาราง `quote_leads` จาก Supabase Dashboard เป็นไฟล์ CSV |

---

### 7.4 แผนการต่อยอดและขยายสเกลธุรกิจในอนาคต (Scalability Roadmap)

1. **การขยายเขตพื้นที่บริการ (Regional Expansion)**:
   - เพิ่มพื้นที่เคาน์ตีข้างเคียง เช่น Buckinghamshire, Northamptonshire และ Warwickshire ได้ทันทีเพียงไปที่แท็บ **`Coverage Areas`** และเพิ่มรหัสไปรษณีย์
2. **ระบบแจ้งเตือนอัตโนมัติ (Automated Notification)**:
   - สามารถต่อยอดเชื่อมต่อ Webhook ของ Supabase เข้ากับ **WhatsApp Business API** หรือ **Twilio SMS** เพื่อส่งข้อความยืนยันใบนัดหมายช่างถึงมือถือลูกค้าทันทีที่กดขอราคา
3. **ระบบบัญชีและการชำระเงิน (Invoice Integration)**:
   - ต่อยอดปุ่ม "Convert to Invoice" เชื่อมต่อกับ Xero หรือ QuickBooks สำหรับออกใบกำกับภาษีเมื่อสถานะเปลี่ยนเป็น `COMPLETED`
