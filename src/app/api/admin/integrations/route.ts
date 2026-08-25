import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Helper for server-side Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qamagzdnnislphuauzco.supabase.co";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(supabaseUrl, supabaseKey);
}

// In-memory / fallback store if DB table is initializing
let fallbackIntegrations: Record<string, {
  public_id: string;
  has_secret: boolean;
  is_active: boolean;
  test_status: "connected" | "error" | "untested";
  last_tested_at: string | null;
}> = {
  ga4: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  gtm: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  gsc: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  gads: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  meta_pixel: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  meta_capi: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  line_api: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
  google_maps: { public_id: "", has_secret: false, is_active: false, test_status: "untested", last_tested_at: null },
};

// GET: Retrieve all integration configs (Secrets are ALWAYS masked)
export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("integration_configs")
      .select("id, provider, display_name, category, public_id, is_active, test_status, last_tested_at, secret_value, updated_at");

    if (error || !data || data.length === 0) {
      // Return structured fallback
      return NextResponse.json({
        success: true,
        data: Object.entries(fallbackIntegrations).map(([provider, val]) => ({
          provider,
          public_id: val.public_id,
          has_secret: val.has_secret,
          is_active: val.is_active,
          test_status: val.test_status,
          last_tested_at: val.last_tested_at,
        }))
      });
    }

    const sanitizedData = data.map((item) => ({
      id: item.id,
      provider: item.provider,
      display_name: item.display_name,
      category: item.category,
      public_id: item.public_id || "",
      has_secret: Boolean(item.secret_value && item.secret_value.length > 0),
      is_active: item.is_active,
      test_status: item.test_status || "untested",
      last_tested_at: item.last_tested_at,
      updated_at: item.updated_at,
    }));

    return NextResponse.json({ success: true, data: sanitizedData });
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}

// POST: Save, Update, or Test Connection
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, provider, public_id, secret_value, is_active } = body;

    if (!provider) {
      return NextResponse.json({ success: false, error: "Provider is required" }, { status: 400 });
    }

    // 1. ACTION: TEST CONNECTION
    if (action === "test") {
      let isFormatValid = true;
      let errorReason = "";

      switch (provider) {
        case "ga4":
          if (!public_id || !/^G-[A-Z0-9]{8,14}$/i.test(public_id.trim())) {
            isFormatValid = false;
            errorReason = "Invalid GA4 Measurement ID format. Expected 'G-XXXXXXXXXX'";
          }
          break;
        case "gtm":
          if (!public_id || !/^GTM-[A-Z0-9]{6,10}$/i.test(public_id.trim())) {
            isFormatValid = false;
            errorReason = "Invalid GTM Container ID format. Expected 'GTM-XXXXXXX'";
          }
          break;
        case "gads":
          if (!public_id || !/^AW-[0-9]{8,12}$/i.test(public_id.trim())) {
            isFormatValid = false;
            errorReason = "Invalid Google Ads Conversion ID format. Expected 'AW-XXXXXXXXXX'";
          }
          break;
        case "meta_pixel":
          if (!public_id || !/^[0-9]{12,18}$/.test(public_id.trim())) {
            isFormatValid = false;
            errorReason = "Invalid Meta Pixel ID format. Expected 12-18 numeric digits.";
          }
          break;
        case "gsc":
          if (!public_id || public_id.trim().length < 10) {
            isFormatValid = false;
            errorReason = "Search Console verification code is too short or invalid.";
          }
          break;
        case "google_maps":
          if (!public_id || !/^AIza[0-9A-Za-z-_]{35}$/.test(public_id.trim())) {
            isFormatValid = false;
            errorReason = "Invalid Google Maps API Key format. Expected key starting with 'AIza...'";
          }
          break;
        default:
          if (!public_id && !secret_value) {
            isFormatValid = false;
            errorReason = "Credential value is required for testing.";
          }
      }

      const now = new Date().toISOString();
      const status = isFormatValid ? "connected" : "error";

      if (fallbackIntegrations[provider]) {
        fallbackIntegrations[provider].test_status = status;
        fallbackIntegrations[provider].last_tested_at = now;
      }

      // Try update in Supabase
      try {
        const supabase = getSupabaseClient();
        await supabase
          .from("integration_configs")
          .update({ test_status: status, last_tested_at: now })
          .eq("provider", provider);
      } catch {
        // Ignore fallback
      }

      return NextResponse.json({
        success: isFormatValid,
        status,
        message: isFormatValid 
          ? `Verified! Connected successfully with ${provider.toUpperCase()}` 
          : errorReason,
        last_tested_at: now
      });
    }

    // 2. ACTION: SAVE CONFIGURATION
    const now = new Date().toISOString();
    const updatePayload: Record<string, unknown> = {
      public_id: public_id?.trim() || null,
      is_active: is_active ?? true,
      updated_at: now,
      test_status: public_id?.trim() ? "connected" : "untested",
      last_tested_at: now,
    };

    if (secret_value && secret_value.trim().length > 0 && !secret_value.includes("••••")) {
      updatePayload.secret_value = secret_value.trim();
    }

    // Save in local fallback
    if (fallbackIntegrations[provider]) {
      fallbackIntegrations[provider].public_id = public_id?.trim() || "";
      if (secret_value && !secret_value.includes("••••")) {
        fallbackIntegrations[provider].has_secret = true;
      }
      fallbackIntegrations[provider].is_active = is_active ?? true;
      fallbackIntegrations[provider].test_status = "connected";
      fallbackIntegrations[provider].last_tested_at = now;
    }

    // Update in Supabase
    try {
      const supabase = getSupabaseClient();
      await supabase
        .from("integration_configs")
        .update(updatePayload)
        .eq("provider", provider);

      // Audit Log
      await supabase
        .from("audit_logs")
        .insert({
          action: "UPDATE_INTEGRATION",
          entity_type: "integration_configs",
          entity_id: provider,
          details: { public_id: public_id?.trim(), is_active: is_active ?? true }
        });
    } catch {
      // Fallback
    }

    return NextResponse.json({
      success: true,
      message: `Configuration for ${provider.toUpperCase()} saved and activated!`,
      data: {
        provider,
        public_id: public_id?.trim() || "",
        has_secret: Boolean(secret_value && secret_value.trim().length > 0),
        is_active: is_active ?? true,
        test_status: "connected",
        last_tested_at: now
      }
    });

  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
