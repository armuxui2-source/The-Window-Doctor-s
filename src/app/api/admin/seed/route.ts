import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_SITE_SETTINGS,
  HERO_SLIDES,
  DEFAULT_FAQS,
  DEFAULT_COMPARISON_ROWS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_TRUST_PILLARS,
  DEFAULT_FRAME_COLORS,
  DEFAULT_ENERGY_RATES,
  MOCK_SERVICES,
  MOCK_SERVICE_AREAS,
  MOCK_PROJECTS,
  GOOGLE_REVIEWS
} from "@/lib/supabase/mock-data";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qamagzdnnislphuauzco.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST() {
  try {
    const supabase = getAdminClient();
    const results: Record<string, { count: number; status: string; error?: string }> = {};

    // 1. Site Settings
    try {
      const { error: siteErr } = await supabase
        .from("site_settings")
        .upsert({
          id: "default",
          business_name: DEFAULT_SITE_SETTINGS.businessName,
          phone: DEFAULT_SITE_SETTINGS.phone,
          email: DEFAULT_SITE_SETTINGS.email,
          address: DEFAULT_SITE_SETTINGS.address,
          city: DEFAULT_SITE_SETTINGS.city,
          postcode: DEFAULT_SITE_SETTINGS.postcode,
          fensa_number: DEFAULT_SITE_SETTINGS.fensaNumber,
          opening_hours: DEFAULT_SITE_SETTINGS.openingHours,
          google_maps_place_id: DEFAULT_SITE_SETTINGS.googleMapsPlaceId || "ChIJbV02x3gSdkgREr28n_7eJQI",
          facebook_url: DEFAULT_SITE_SETTINGS.facebookUrl,
          instagram_url: DEFAULT_SITE_SETTINGS.instagramUrl,
          tagline: DEFAULT_SITE_SETTINGS.tagline,
          updated_at: new Date().toISOString()
        }, { onConflict: "id" });
      results.site_settings = siteErr ? { count: 0, status: "error", error: siteErr.message } : { count: 1, status: "success" };
    } catch (e: any) {
      results.site_settings = { count: 0, status: "failed", error: e.message };
    }

    // 2. Hero Slides
    try {
      const heroPayload = HERO_SLIDES.map((slide, idx) => ({
        id: slide.id,
        tag: slide.tag,
        badge_text: slide.badgeText,
        title: slide.title,
        highlight_text: slide.highlightText,
        description: slide.description,
        primary_cta_text: slide.primaryCtaText,
        primary_cta_link: slide.primaryCtaLink,
        secondary_cta_text: slide.secondaryCtaText,
        secondary_cta_link: slide.secondaryCtaLink,
        image_url: slide.imageUrl,
        stats: slide.stats,
        sort_order: idx + 1,
        is_active: true,
        updated_at: new Date().toISOString()
      }));
      const { error: heroErr } = await supabase.from("hero_slides").upsert(heroPayload, { onConflict: "id" });
      results.hero_slides = heroErr ? { count: 0, status: "error", error: heroErr.message } : { count: heroPayload.length, status: "success" };
    } catch (e: any) {
      results.hero_slides = { count: 0, status: "failed", error: e.message };
    }

    // 3. FAQs
    try {
      const faqPayload = DEFAULT_FAQS.map((faq, idx) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: "general",
        sort_order: faq.sort_order || idx + 1,
        is_active: true,
        updated_at: new Date().toISOString()
      }));
      const { error: faqErr } = await supabase.from("faqs").upsert(faqPayload, { onConflict: "id" });
      results.faqs = faqErr ? { count: 0, status: "error", error: faqErr.message } : { count: faqPayload.length, status: "success" };
    } catch (e: any) {
      results.faqs = { count: 0, status: "failed", error: e.message };
    }

    // 4. Comparison Matrix
    try {
      const compPayload = DEFAULT_COMPARISON_ROWS.map((row, idx) => ({
        id: row.id,
        feature: row.feature,
        window_doctor: row.windowDoctor,
        national_guys: row.nationalGuys,
        is_superior: true,
        sort_order: idx + 1
      }));
      const { error: compErr } = await supabase.from("comparison_matrix").upsert(compPayload, { onConflict: "id" });
      results.comparison_matrix = compErr ? { count: 0, status: "error", error: compErr.message } : { count: compPayload.length, status: "success" };
    } catch (e: any) {
      results.comparison_matrix = { count: 0, status: "failed", error: e.message };
    }

    // 5. Process Steps
    try {
      const stepPayload = DEFAULT_PROCESS_STEPS.map((step, idx) => ({
        id: step.id,
        num: step.num,
        title: step.title,
        timing: step.timing,
        description: step.description,
        sort_order: idx + 1
      }));
      const { error: stepErr } = await supabase.from("process_steps").upsert(stepPayload, { onConflict: "id" });
      results.process_steps = stepErr ? { count: 0, status: "error", error: stepErr.message } : { count: stepPayload.length, status: "success" };
    } catch (e: any) {
      results.process_steps = { count: 0, status: "failed", error: e.message };
    }

    // 6. Trust Pillars
    try {
      const pillarPayload = DEFAULT_TRUST_PILLARS.map((p) => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        icon_name: p.icon_name,
        sort_order: p.sort_order
      }));
      const { error: pilErr } = await supabase.from("trust_pillars").upsert(pillarPayload, { onConflict: "id" });
      results.trust_pillars = pilErr ? { count: 0, status: "error", error: pilErr.message } : { count: pillarPayload.length, status: "success" };
    } catch (e: any) {
      results.trust_pillars = { count: 0, status: "failed", error: e.message };
    }

    // 7. Frame Colors
    try {
      const colPayload = DEFAULT_FRAME_COLORS.map((c) => ({
        id: c.id,
        name: c.name,
        ral_code: c.ral_code,
        hex_color: c.hex_color,
        finish: c.finish,
        price_surcharge_percent: c.price_surcharge_percent,
        is_popular: c.is_popular,
        sort_order: c.sort_order
      }));
      const { error: colErr } = await supabase.from("frame_colors").upsert(colPayload, { onConflict: "id" });
      results.frame_colors = colErr ? { count: 0, status: "error", error: colErr.message } : { count: colPayload.length, status: "success" };
    } catch (e: any) {
      results.frame_colors = { count: 0, status: "failed", error: e.message };
    }

    // 8. Energy Rates
    try {
      const ratePayload = DEFAULT_ENERGY_RATES.map((r) => ({
        id: r.id,
        key: r.key,
        label: r.label,
        rate_value: r.rate_value,
        unit: r.unit,
        updated_at: new Date().toISOString()
      }));
      const { error: rateErr } = await supabase.from("energy_rates").upsert(ratePayload, { onConflict: "id" });
      results.energy_rates = rateErr ? { count: 0, status: "error", error: rateErr.message } : { count: ratePayload.length, status: "success" };
    } catch (e: any) {
      results.energy_rates = { count: 0, status: "failed", error: e.message };
    }

    // 9. Services
    try {
      const servPayload = MOCK_SERVICES.map((s, idx) => ({
        id: s.id.length === 36 ? s.id : `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa${idx + 1}`,
        slug: s.slug,
        title: s.title,
        headline: s.headline,
        short_description: s.short_description,
        full_content: s.full_content,
        hero_image_url: s.hero_image_url,
        features: s.features,
        specifications: s.specifications,
        base_price_estimate: s.base_price_estimate,
        price_unit: s.price_unit,
        warranty_years: s.warranty_years,
        is_fensa_certified: s.is_fensa_certified,
        is_active: s.is_active,
        sort_order: s.sort_order,
        updated_at: new Date().toISOString()
      }));
      const { error: servErr } = await supabase.from("services").upsert(servPayload, { onConflict: "slug" });
      results.services = servErr ? { count: 0, status: "error", error: servErr.message } : { count: servPayload.length, status: "success" };
    } catch (e: any) {
      results.services = { count: 0, status: "failed", error: e.message };
    }

    // 10. Service Areas
    try {
      const areaPayload = MOCK_SERVICE_AREAS.map((a, idx) => ({
        id: `area-${idx + 1}`,
        town_name: a.town_name,
        county: a.county,
        response_time_hours: a.response_time_hours,
        emergency_available: a.emergency_available,
        free_survey: a.free_survey,
        is_active: a.is_active
      }));
      const { error: areaErr } = await supabase.from("service_areas").upsert(areaPayload, { onConflict: "id" });
      results.service_areas = areaErr ? { count: 0, status: "error", error: areaErr.message } : { count: areaPayload.length, status: "success" };
    } catch (e: any) {
      results.service_areas = { count: 0, status: "failed", error: e.message };
    }

    // 11. Projects
    try {
      const projPayload = MOCK_PROJECTS.map((p, idx) => ({
        id: `proj-${idx + 1}`,
        title: p.title,
        location_city: p.location_city,
        completion_year: p.completion_year,
        summary: p.summary,
        challenge_description: p.challenge_description,
        solution_description: p.solution_description,
        specifications: p.specifications,
        before_image_url: p.before_image_url,
        after_image_url: p.after_image_url,
        is_featured: p.is_featured,
        sort_order: p.sort_order
      }));
      const { error: projErr } = await supabase.from("projects").upsert(projPayload, { onConflict: "id" });
      results.projects = projErr ? { count: 0, status: "error", error: projErr.message } : { count: projPayload.length, status: "success" };
    } catch (e: any) {
      results.projects = { count: 0, status: "failed", error: e.message };
    }

    // 12. Customer Reviews
    try {
      const revPayload = GOOGLE_REVIEWS.map((r, idx) => ({
        id: `rev-${idx + 1}`,
        customer_name: r.customer_name,
        customer_location: r.customer_location,
        service_category: r.service_category,
        rating: r.rating,
        review_title: r.review_title,
        review_text: r.review_text,
        is_verified: r.is_google_verified,
        review_date: r.time_ago
      }));
      const { error: revErr } = await supabase.from("customer_reviews").upsert(revPayload, { onConflict: "id" });
      results.customer_reviews = revErr ? { count: 0, status: "error", error: revErr.message } : { count: revPayload.length, status: "success" };
    } catch (e: any) {
      results.customer_reviews = { count: 0, status: "failed", error: e.message };
    }

    return NextResponse.json({
      success: true,
      message: "Supabase real data synchronization completed successfully.",
      timestamp: new Date().toISOString(),
      summary: results
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
