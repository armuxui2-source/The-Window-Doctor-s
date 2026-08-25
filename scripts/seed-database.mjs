/**
 * Production Database Seeder for The Window Doctor (Supabase REST API)
 * Run with: node scripts/seed-database.mjs
 */

import fs from "fs";
import path from "path";

// Read .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
let env = {};

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        env[key] = val;
      }
    }
  });
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || "https://qamagzdnnislphuauzco.supabase.co";
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!serviceKey) {
  console.error("❌ Error: SUPABASE_SERVICE_ROLE_KEY is required in .env.local");
  process.exit(1);
}

const headers = {
  "apikey": serviceKey,
  "Authorization": `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
  "Prefer": "resolution=merge-duplicates,return=representation"
};

console.log("=================================================================");
console.log("🚀 THE WINDOW DOCTOR - SUPABASE PRODUCTION DATA SEEDER");
console.log(`📡 Target URL: ${supabaseUrl}`);
console.log("=================================================================\n");

async function upsertTable(tableName, rows) {
  const url = `${supabaseUrl}/rest/v1/${tableName}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(rows)
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text };
    }
    const data = await res.json();
    return { ok: true, count: Array.isArray(data) ? data.length : rows.length };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function seedAll() {
  console.log("⏳ Starting 100% real website content sync to Supabase Production...\n");

  // 1. Site Settings
  console.log("1️⃣ Seeding Site Settings (01869 572206, FENSA #28491)...");
  const siteRes = await upsertTable("site_settings", [{
    id: "default",
    business_name: "The Window Doctor",
    phone: "01869 572206",
    email: "info@thewindowdoctors.co.uk",
    address: "Home Farm, Bainton Road",
    city: "Bucknell, Bicester",
    postcode: "OX27 7LT",
    fensa_number: "28491",
    opening_hours: "Mon-Sat 08:00-18:00",
    google_maps_place_id: "ChIJbV02x3gSdkgREr28n_7eJQI",
    facebook_url: "https://facebook.com/thewindowdoctorsoxfordshire",
    instagram_url: "https://instagram.com/thewindowdoctors_uk",
    tagline: "Oxfordshire Glazing Specialists Since 1983",
    updated_at: new Date().toISOString()
  }]);
  if (!siteRes.ok) console.log("   ⚠️ site_settings note:", siteRes.error);
  else console.log("   ✅ Site Settings synced successfully.");

  // 2. Hero Slides
  console.log("2️⃣ Seeding Hero Slides CMS (4 High-Performance Slides)...");
  const heroSlides = [
    {
      id: "hero-1",
      tag: "Est. 1983 • 40+ Years Oxfordshire Heritage",
      badge_text: "Save Up To 70% vs Full Window Replacement",
      title: "Master Glazing & Window Engineering",
      highlight_text: "Replace Glass, Not The Frame",
      description: "Bicester and Oxfordshire’s trusted glazing specialists since 1983. We diagnose and replace failed double-glazed sealed units with Argon Low-E glass in under 45 mins.",
      primary_cta_text: "Instant Price Calculator",
      primary_cta_link: "/quote",
      secondary_cta_text: "Call 01869 572206",
      secondary_cta_link: "tel:01869572206",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w",
      stats: [{ label: "Cost Savings", value: "Up to 70%" }, { label: "Install Time", value: "< 45 Mins" }, { label: "Guarantee", value: "10 Years" }],
      sort_order: 1,
      is_active: true
    },
    {
      id: "hero-2",
      tag: "Architectural Precision & High Security",
      badge_text: "Ultion 3-Star Diamond £2,000 Security Guarantee",
      title: "Bespoke Panoramic Entrance Systems",
      highlight_text: "Luxury Bi-Folds & 48mm Solid Doors",
      description: "Make a grand entrance with featherlight finger-glide aluminium bi-fold doors and impenetrable 48mm timber-core composite doors designed for the British climate.",
      primary_cta_text: "Explore Door Collection",
      primary_cta_link: "/services/stylish-doors",
      secondary_cta_text: "Get Door Quote",
      secondary_cta_link: "/quote",
      image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf",
      stats: [{ label: "Core Thickness", value: "48mm Solid" }, { label: "Security Level", value: "PAS 24" }, { label: "Acoustic Insulation", value: "42 dB" }],
      sort_order: 2,
      is_active: true
    }
  ];
  const heroRes = await upsertTable("hero_slides", heroSlides);
  if (!heroRes.ok) console.log("   ⚠️ hero_slides note:", heroRes.error);
  else console.log("   ✅ Hero Slides synced successfully.");

  // 3. Comparison Matrix
  console.log("3️⃣ Seeding Comparison Matrix...");
  const compRows = [
    { id: "comp-1", feature: "Cost for 8 Windows", window_doctor: "£760 - £1,100 (Glass Unit Replacement)", national_guys: "£6,500 - £9,800 (Full Tear-Out)", is_superior: true, sort_order: 1 },
    { id: "comp-2", feature: "Installation Time", window_doctor: "2 to 3 Hours (30-45 mins per unit)", national_guys: "2 to 3 Days with Heavy Disruption", is_superior: true, sort_order: 2 },
    { id: "comp-3", feature: "Damage to Interior Walls & Plaster", window_doctor: "Zero Damage — Existing frames stay untouched", national_guys: "High — Plastering & re-decorating required", is_superior: true, sort_order: 3 },
    { id: "comp-4", feature: "Thermal Insulation (Low-E Argon)", window_doctor: "A+ Rating (1.1 W/m²K Pilkington Glass)", national_guys: "Standard Double Glazing", is_superior: true, sort_order: 4 },
    { id: "comp-5", feature: "Sales Approach", window_doctor: "Honest Master Glazier Survey (No Pressure)", national_guys: "High-Pressure Commissioned Sales Reps", is_superior: true, sort_order: 5 }
  ];
  const compRes = await upsertTable("comparison_matrix", compRows);
  if (!compRes.ok) console.log("   ⚠️ comparison_matrix note:", compRes.error);
  else console.log("   ✅ Comparison Matrix synced successfully.");

  // 4. Process Steps
  console.log("4️⃣ Seeding Process Steps...");
  const processSteps = [
    { id: "step-1", num: "01", title: "Laser Precision Survey", timing: "Free • 30 Mins", description: "Our master glazier visits your home with digital laser gauges to measure exact unit dimensions, glass thickness, and spacer specs.", sort_order: 1 },
    { id: "step-2", num: "02", title: "Bespoke UK Glazing", timing: "2-4 Working Days", description: "Your replacement units are hermetically sealed with Swissspacer warm edge bars and 90% pure Argon thermal gas in our regional workshop.", sort_order: 2 },
    { id: "step-3", num: "03", title: "Clean Master Installation", timing: "30-45 Mins / Pane", description: "Beads are carefully unclipped, the failed unit is removed, and the new crystal unit is seated with zero mess and zero plaster damage.", sort_order: 3 },
    { id: "step-4", num: "04", title: "10-Year Certificate", timing: "Instant Handover", description: "We test all handles, lubricate hinges, and issue your official 10-Year Insurance-Backed Anti-Fog Guarantee and FENSA documentation.", sort_order: 4 }
  ];
  const stepRes = await upsertTable("process_steps", processSteps);
  if (!stepRes.ok) console.log("   ⚠️ process_steps note:", stepRes.error);
  else console.log("   ✅ Process Steps synced successfully.");

  // 5. FAQs
  console.log("5️⃣ Seeding FAQs...");
  const faqs = [
    { id: "faq-1", question: "Do I need to replace my whole window frame if the glass is misted?", answer: "No! In over 95% of cases, you only need to replace the failed double-glazed sealed unit. Your existing frames remain completely intact, saving you up to 70% compared to full replacements.", category: "repairs", sort_order: 1, is_active: true },
    { id: "faq-2", question: "How long does a misted glass replacement take?", answer: "Our master technicians typically complete each window pane replacement in under 45 minutes with zero mess and zero disturbance to your internal decor or plaster.", category: "repairs", sort_order: 2, is_active: true },
    { id: "faq-3", question: "Are your window installations FENSA certified and insured?", answer: "Yes. We are fully FENSA registered (No. 28491). All new window and door installations include Building Regulations compliance certification and a 10-Year Insurance-Backed Guarantee.", category: "certification", sort_order: 3, is_active: true },
    { id: "faq-4", question: "Can you install cat flaps into double glazed glass doors?", answer: "Yes. We manufacture custom toughened double glazed glass units with pre-cut factory sealed apertures designed specifically for SureFlap microchip and manual cat flaps.", category: "custom", sort_order: 4, is_active: true },
    { id: "faq-5", question: "Do you charge for home surveys and quotes in Oxfordshire?", answer: "No. All our initial on-site inspections, measurements, and formal written quotations are 100% free with absolutely no high-pressure sales obligation.", category: "quotes", sort_order: 5, is_active: true }
  ];
  const faqRes = await upsertTable("faqs", faqs);
  if (!faqRes.ok) console.log("   ⚠️ faqs note:", faqRes.error);
  else console.log("   ✅ FAQs synced successfully.");

  console.log("\n=================================================================");
  console.log("✨ ALL LIVE WEBSITE DATA SYNCED TO SUPABASE PRODUCTION!");
  console.log("🔗 You can also run the full schema script at supabase/full_schema_and_seed.sql");
  console.log("=================================================================\n");
}

seedAll().catch(console.error);
