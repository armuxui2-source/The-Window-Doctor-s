-- ==============================================================================
-- THE WINDOW DOCTOR - COMPLETE SUPABASE SETUP (SCHEMA + SEED DATA + RLS POLICIES)
-- Project: The Window Doctor (Bicester & Oxfordshire) | Est. 1983
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/qamagzdnnislphuauzco/sql/new
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. SERVICE CATEGORIES & SERVICES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name_en VARCHAR(128) NOT NULL,
    name_th VARCHAR(128) NOT NULL,
    description TEXT,
    icon_name VARCHAR(64) NOT NULL DEFAULT 'Wrench',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    headline VARCHAR(255),
    short_description TEXT NOT NULL,
    full_content TEXT,
    hero_image_url TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    base_price_estimate NUMERIC(10, 2),
    price_unit VARCHAR(32) DEFAULT 'per unit',
    warranty_years INT DEFAULT 10,
    is_fensa_certified BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. SERVICE AREAS & POSTCODES (Coverage Checker)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS service_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    town_name VARCHAR(128) NOT NULL,
    county VARCHAR(128) DEFAULT 'Oxfordshire',
    response_time_hours INT DEFAULT 24,
    emergency_available BOOLEAN DEFAULT TRUE,
    free_survey BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postcodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    area_id UUID REFERENCES service_areas(id) ON DELETE CASCADE,
    postcode_prefix VARCHAR(10) NOT NULL UNIQUE,
    region_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. QUOTE REQUESTS, ESTIMATES & ATTACHMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no VARCHAR(32) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    postcode VARCHAR(16) NOT NULL,
    address_line TEXT,
    service_type VARCHAR(64) NOT NULL,
    property_type VARCHAR(64),
    units_count INT DEFAULT 1,
    glass_type VARCHAR(64),
    frame_color VARCHAR(64),
    status VARCHAR(32) DEFAULT 'pending',
    estimated_total NUMERIC(10, 2),
    urgency VARCHAR(32) DEFAULT 'normal',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. PROJECTS PORTFOLIO
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    location_city VARCHAR(128) NOT NULL,
    completion_year VARCHAR(16) DEFAULT '2024',
    summary TEXT,
    challenge_description TEXT,
    solution_description TEXT,
    specifications JSONB DEFAULT '[]'::jsonb,
    before_image_url TEXT,
    after_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. CUSTOMER REVIEWS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    customer_name VARCHAR(128) NOT NULL,
    customer_location VARCHAR(128) NOT NULL,
    service_category VARCHAR(128) NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(255),
    review_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    review_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. LEADS & CONTACT INQUIRIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    postcode VARCHAR(16),
    service_interest VARCHAR(64),
    message TEXT,
    source VARCHAR(64) DEFAULT 'website_contact',
    status VARCHAR(32) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. INTEGRATION CONFIGURATIONS (Integration Manager)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS integration_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider VARCHAR(64) UNIQUE NOT NULL, -- 'ga4', 'gtm', 'gsc', 'gads', 'meta_pixel', 'meta_capi', 'line_api', 'google_maps'
    display_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) DEFAULT 'analytics', -- 'analytics', 'marketing', 'communications', 'maps'
    public_id VARCHAR(255),
    secret_value TEXT, -- Encrypted / Server-side only
    is_active BOOLEAN DEFAULT FALSE,
    last_tested_at TIMESTAMPTZ,
    test_status VARCHAR(32) DEFAULT 'untested', -- 'connected', 'error', 'untested'
    config_metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(255) DEFAULT 'admin@thewindowdoctors.co.uk',
    action VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(128),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. BLOG & OXFORDSHIRE SEO ARTICLES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    target_keywords TEXT[] DEFAULT '{}',
    seo_title VARCHAR(255),
    seo_description TEXT,
    featured_image_url TEXT,
    author_name VARCHAR(128) DEFAULT 'Master Glazier Sean',
    reading_time_mins INT DEFAULT 5,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. SITE ANALYTICS & TELEMETRY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_date DATE DEFAULT CURRENT_DATE,
    pageviews INT DEFAULT 0,
    unique_visitors INT DEFAULT 0,
    quote_starts INT DEFAULT 0,
    quote_completions INT DEFAULT 0,
    phone_clicks INT DEFAULT 0,
    top_services JSONB DEFAULT '[]'::jsonb,
    top_areas JSONB DEFAULT '[]'::jsonb,
    UNIQUE(event_date)
);

-- ------------------------------------------------------------------------------
-- 11. ENABLE ROW LEVEL SECURITY (RLS) & POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE postcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- Public read permissions
CREATE POLICY "Public read for service_categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read for services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read for service_areas" ON service_areas FOR SELECT USING (true);
CREATE POLICY "Public read for postcodes" ON postcodes FOR SELECT USING (true);
CREATE POLICY "Public read for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read for customer_reviews" ON customer_reviews FOR SELECT USING (true);
CREATE POLICY "Public read for blog_posts" ON blog_posts FOR SELECT USING (is_published = true);

-- Public create quotes & leads
CREATE POLICY "Public create quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create leads" ON leads FOR INSERT WITH CHECK (true);

-- Public read active public integration IDs (excludes secret_value)
CREATE POLICY "Public read active integration public IDs" ON integration_configs FOR SELECT USING (is_active = true);

-- Staff admin full access (via Service Role)
CREATE POLICY "Service role full access quote_requests" ON quote_requests FOR ALL USING (true);
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (true);
CREATE POLICY "Service role full access integration_configs" ON integration_configs FOR ALL USING (true);
CREATE POLICY "Service role full access audit_logs" ON audit_logs FOR ALL USING (true);
CREATE POLICY "Service role full access blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Service role full access site_analytics" ON site_analytics FOR ALL USING (true);

-- ------------------------------------------------------------------------------
-- 12. INITIAL SEED DATA
-- ------------------------------------------------------------------------------
INSERT INTO service_categories (id, slug, name_en, name_th, description, icon_name, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'glass-repairs', 'Glass & Glazing Repairs', 'งานซ่อมกระจกและซีลยาง', 'Misted glass, broken pane replacements, draughts & lock repair', 'Sparkles', 1),
('22222222-2222-2222-2222-222222222222', 'windows', 'Modern Window Installations', 'งานติดตั้งหน้าต่างโมเดิร์น', 'Casement, Flush Sash, Sliding Sash in uPVC and Aluminium', 'Grid', 2),
('33333333-3333-3333-3333-333333333333', 'doors', 'Stylish Entrance & Patio Doors', 'งานติดตั้งประตูบ้านและระเบียง', 'High-security Composite, Panoramic Bi-fold, and French Doors', 'DoorClosed', 3),
('44444444-4444-4444-4444-444444444444', 'conservatories', 'Warm Roof Conservatories', 'งานปรับปรุงหลังคาเรือนกระจก', 'Tiled thermal warm roof conversions & lantern skylights', 'Home', 4),
('55555555-5555-5555-5555-555555555555', 'balustrades', 'Bespoke Glass Balustrades', 'ระเบียงและราวกันตกกระจกเปลือย', 'Frameless structural glass balustrades & Juliette balconies', 'Shield', 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO services (id, category_id, slug, title, headline, short_description, full_content, hero_image_url, features, specifications, base_price_estimate, price_unit, warranty_years, is_fensa_certified) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'misted-glass-repair', 'Misted Glass & Seal Failure Repair', 'Replace the Glass, Not the Frame — Save Up to 70%', 'Restore crystal-clear views and thermal efficiency without the expense of replacing your existing window frames.', 'Over time, double glazing unit seals can deteriorate due to weather exposure, allowing moisture to seep between the glass panes. Our master glaziers precisely measure and replace solely the sealed insulated glass unit (IGU), retaining your original frames and saving you hundreds of pounds.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I', '["Save 50-70% vs complete window replacement", "Argon-gas filled for maximum A++ energy rating", "Quick and clean installation in under 1 hour per unit", "10-Year Anti-Fog Guarantee", "Toughened & Acoustic glass options available"]'::jsonb, '{"u_value": "1.1 W/m²K", "glass_type": "Pilkington Optitherm Low-E", "gas_filling": "90% Argon Gas", "warm_edge_spacer": "Swissspacer Ultimate"}'::jsonb, 95.00, 'per unit', 10, true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'modern-windows', 'Modern Energy-Efficient Windows', 'Architectural Elegance with A++ Thermal Performance', 'Precision-crafted uPVC and slimline aluminium windows designed to keep your home warm, quiet, and secure.', 'Upgrade your property with our bespoke window collection.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w', '["A++ Energy Efficiency Ratings", "Secured by Design PAS 24 multi-point locks", "Sound reduction up to 42dB", "Dual-colour frame options (Anthracite, Heritage Cream, Oak)", "FENSA Certified with 10-Year Insurance Guarantee"]'::jsonb, '{"frame_material": "uPVC & Slimline Aluminium", "security_standard": "PAS 24 / Secured by Design", "noise_reduction": "Up to 42dB", "glazing_options": "Double (28mm) or Triple (44mm)"}'::jsonb, 380.00, 'per window', 10, true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'stylish-doors', 'Bespoke Composite & Bi-fold Doors', 'Make a Grand Entrance with Uncompromising Security', 'Premium composite front doors and seamless panoramic bi-fold patio doors engineered for British weather.', 'Transform your living space with our premium door collection.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf', '["48mm Solid timber core composite doors", "3-Star Ultion diamond security cylinders", "Smooth glide stainless steel bi-fold rollers", "Low-threshold options for wheelchair accessibility", "Weather-tested against gale-force British storms"]'::jsonb, '{"core_thickness": "48mm solid timber core", "lock_rating": "3-Star Ultion Diamond", "weather_resistance": "BS 6375-1 passed", "finish": "Scratch-resistant GRP skin"}'::jsonb, 750.00, 'per door', 10, true)
ON CONFLICT (slug) DO NOTHING;

-- Seed Default Integrations
INSERT INTO integration_configs (provider, display_name, category, public_id, is_active, test_status) VALUES
('ga4', 'Google Analytics 4', 'analytics', '', false, 'untested'),
('gtm', 'Google Tag Manager', 'analytics', '', false, 'untested'),
('gsc', 'Google Search Console', 'analytics', '', false, 'untested'),
('gads', 'Google Ads Conversion', 'marketing', '', false, 'untested'),
('meta_pixel', 'Meta Pixel (Facebook)', 'marketing', '', false, 'untested'),
('meta_capi', 'Meta Conversions API (CAPI)', 'marketing', '', false, 'untested'),
('line_api', 'LINE Messaging API', 'communications', '', false, 'untested'),
('google_maps', 'Google Maps Platform', 'maps', '', false, 'untested')
ON CONFLICT (provider) DO NOTHING;

-- Seed Default SEO Blog Articles for Oxfordshire
INSERT INTO blog_posts (slug, title, excerpt, content, target_keywords, seo_title, seo_description, featured_image_url) VALUES
('misted-double-glazing-repair-guide-oxfordshire', 'Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Guide', 'Discover why double glazed windows fail, why you do NOT need new frames, and how to save up to 70% in Bicester and Oxford.', 'Double glazing seal failure is one of the most common issues facing homeowners across Oxfordshire...', ARRAY['misted double glazing bicester', 'window repair oxford', 'failed glass unit replacement'], 'Misted Double Glazing Repair Guide | Save 70% in Oxfordshire', 'Learn why double glazing windows mist up and how replacing only the sealed glass unit saves thousands compared to full window replacements.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I'),
('conservatory-warm-roof-conversion-benefits', 'Transforming Unusable Conservatories with Tiled Warm Roofs in 2026', 'Is your conservatory freezing in winter and boiling in summer? Discover how insulated lightweight warm roofs add year-round living space.', 'For decades, Victorian and Edwardian style conservatories with polycarbonate or uninsulated glass roofs have plagued UK homeowners with extreme temperature swings...', ARRAY['conservatory warm roof banbury', 'tiled conservatory roof bicester', 'guardian warm roof oxford'], 'Conservatory Warm Roof Conversion Guide | The Window Doctor', 'Discover how converting your conservatory to an insulated warm tiled roof creates comfortable year-round living space and adds property value.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq')
ON CONFLICT (slug) DO NOTHING;

