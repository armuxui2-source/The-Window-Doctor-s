-- ==============================================================================
-- THE WINDOW DOCTOR - COMPLETE SUPABASE SETUP (SCHEMA + SEED DATA + RLS POLICIES)
-- Project: The Window Doctor (Bicester & Oxfordshire) | Est. 1983
-- Run this script in the Supabase SQL Editor: https://supabase.com/dashboard/project/qamagzdnnislphuauzco/sql/new
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. SITE SETTINGS (Global Business Contact, Legal & Brand Info)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(32) PRIMARY KEY DEFAULT 'default',
    business_name VARCHAR(255) NOT NULL DEFAULT 'The Window Doctor',
    phone VARCHAR(64) NOT NULL DEFAULT '01869 572206',
    email VARCHAR(255) NOT NULL DEFAULT 'info@thewindowdoctors.co.uk',
    address VARCHAR(255) NOT NULL DEFAULT 'Home Farm, Bainton Road',
    city VARCHAR(128) NOT NULL DEFAULT 'Bucknell, Bicester',
    postcode VARCHAR(32) NOT NULL DEFAULT 'OX27 7LT',
    fensa_number VARCHAR(64) NOT NULL DEFAULT '28491',
    opening_hours VARCHAR(128) NOT NULL DEFAULT 'Mon-Sat 08:00-18:00',
    google_maps_place_id VARCHAR(128) DEFAULT 'ChIJbV02x3gSdkgREr28n_7eJQI',
    facebook_url TEXT DEFAULT 'https://facebook.com/thewindowdoctorsoxfordshire',
    instagram_url TEXT DEFAULT 'https://instagram.com/thewindowdoctors_uk',
    tagline VARCHAR(255) DEFAULT 'Oxfordshire Glazing Specialists Since 1983',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. HERO SLIDES (Hero Slider CMS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_slides (
    id VARCHAR(64) PRIMARY KEY,
    tag VARCHAR(255) NOT NULL,
    badge_text VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    highlight_text VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    primary_cta_text VARCHAR(128) NOT NULL DEFAULT 'Instant Price Calculator',
    primary_cta_link VARCHAR(255) NOT NULL DEFAULT '/quote',
    secondary_cta_text VARCHAR(128) NOT NULL DEFAULT 'Call 01869 572206',
    secondary_cta_link VARCHAR(255) NOT NULL DEFAULT 'tel:01869572206',
    image_url TEXT NOT NULL,
    stats JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. FAQS & SCHEMA (SEO Rich Snippets)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(64) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(64) DEFAULT 'general',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. COMPARISON MATRIX (Us vs National Sales Reps)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS comparison_matrix (
    id VARCHAR(64) PRIMARY KEY,
    feature VARCHAR(255) NOT NULL,
    window_doctor TEXT NOT NULL,
    national_guys TEXT NOT NULL,
    is_superior BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. PROCESS STEPS (4-Stage Precision Glazing Process)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS process_steps (
    id VARCHAR(64) PRIMARY KEY,
    num VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    timing VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. TRUST PILLARS (Authority / Value Propositions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS trust_pillars (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT NOT NULL,
    icon_name VARCHAR(64) NOT NULL DEFAULT 'ShieldCheck',
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 7. FRAME COLORS & CONFIGURATOR
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS frame_colors (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    ral_code VARCHAR(32) NOT NULL,
    hex_color VARCHAR(16) NOT NULL,
    finish VARCHAR(64) DEFAULT 'Woodgrain Foil',
    price_surcharge_percent NUMERIC(5,2) DEFAULT 0,
    is_popular BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 8. ENERGY CALCULATOR RATES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS energy_rates (
    id VARCHAR(64) PRIMARY KEY,
    key VARCHAR(64) UNIQUE NOT NULL,
    label VARCHAR(128) NOT NULL,
    rate_value NUMERIC(10,4) NOT NULL,
    unit VARCHAR(32) DEFAULT 'kWh / year',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. SERVICE CATEGORIES & SERVICES
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
-- 10. SERVICE AREAS & POSTCODES (Coverage Checker)
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
-- 11. QUOTE REQUESTS & LEADS CRM
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
-- 12. PROJECTS PORTFOLIO & CASE STUDIES
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
-- 13. CUSTOMER REVIEWS & GOOGLE REVIEWS
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
-- 14. INTEGRATION CONFIGURATIONS (Marketing, Analytics & APIs)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS integration_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider VARCHAR(64) UNIQUE NOT NULL,
    display_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) DEFAULT 'analytics',
    public_id VARCHAR(255),
    secret_value TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    last_tested_at TIMESTAMPTZ,
    test_status VARCHAR(32) DEFAULT 'untested',
    config_metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. AUDIT LOGS & SITE ANALYTICS
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
-- 16. ENABLE ROW LEVEL SECURITY (RLS) & POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE frame_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_rates ENABLE ROW LEVEL SECURITY;
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

-- Public Read Policies
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (is_active = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public read comparison_matrix" ON comparison_matrix FOR SELECT USING (true);
CREATE POLICY "Public read process_steps" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read trust_pillars" ON trust_pillars FOR SELECT USING (true);
CREATE POLICY "Public read frame_colors" ON frame_colors FOR SELECT USING (true);
CREATE POLICY "Public read energy_rates" ON energy_rates FOR SELECT USING (true);
CREATE POLICY "Public read service_categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read service_areas" ON service_areas FOR SELECT USING (true);
CREATE POLICY "Public read postcodes" ON postcodes FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read customer_reviews" ON customer_reviews FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read active integration public IDs" ON integration_configs FOR SELECT USING (is_active = true);

-- Public Create Policies
CREATE POLICY "Public create quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create leads" ON leads FOR INSERT WITH CHECK (true);

-- Service Role (Staff Admin) Full Access
CREATE POLICY "Service role full access site_settings" ON site_settings FOR ALL USING (true);
CREATE POLICY "Service role full access hero_slides" ON hero_slides FOR ALL USING (true);
CREATE POLICY "Service role full access faqs" ON faqs FOR ALL USING (true);
CREATE POLICY "Service role full access comparison_matrix" ON comparison_matrix FOR ALL USING (true);
CREATE POLICY "Service role full access process_steps" ON process_steps FOR ALL USING (true);
CREATE POLICY "Service role full access trust_pillars" ON trust_pillars FOR ALL USING (true);
CREATE POLICY "Service role full access frame_colors" ON frame_colors FOR ALL USING (true);
CREATE POLICY "Service role full access energy_rates" ON energy_rates FOR ALL USING (true);
CREATE POLICY "Service role full access quote_requests" ON quote_requests FOR ALL USING (true);
CREATE POLICY "Service role full access leads" ON leads FOR ALL USING (true);
CREATE POLICY "Service role full access integration_configs" ON integration_configs FOR ALL USING (true);
CREATE POLICY "Service role full access audit_logs" ON audit_logs FOR ALL USING (true);
CREATE POLICY "Service role full access blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Service role full access site_analytics" ON site_analytics FOR ALL USING (true);

-- ==============================================================================
-- 17. COMPLETE INITIAL SEED DATA (100% Live Website Match)
-- ==============================================================================

-- 1. Site Settings
INSERT INTO site_settings (id, business_name, phone, email, address, city, postcode, fensa_number, opening_hours, google_maps_place_id, tagline)
VALUES ('default', 'The Window Doctor', '01869 572206', 'info@thewindowdoctors.co.uk', 'Home Farm, Bainton Road', 'Bucknell, Bicester', 'OX27 7LT', '28491', 'Mon-Sat 08:00-18:00', 'ChIJbV02x3gSdkgREr28n_7eJQI', 'Oxfordshire Glazing Specialists Since 1983')
ON CONFLICT (id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  postcode = EXCLUDED.postcode,
  fensa_number = EXCLUDED.fensa_number,
  opening_hours = EXCLUDED.opening_hours;

-- 2. Hero Slides
INSERT INTO hero_slides (id, tag, badge_text, title, highlight_text, description, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, image_url, stats, sort_order)
VALUES
('hero-1', 'Est. 1983 • 40+ Years Oxfordshire Heritage', 'Save Up To 70% vs Full Window Replacement', 'Master Glazing & Window Engineering', 'Replace Glass, Not The Frame', 'Bicester and Oxfordshire’s trusted glazing specialists since 1983. We diagnose and replace failed double-glazed sealed units with Argon Low-E glass in under 45 mins.', 'Instant Price Calculator', '/quote', 'Call 01869 572206', 'tel:01869572206', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w', '[{"label": "Cost Savings", "value": "Up to 70%"}, {"label": "Install Time", "value": "< 45 Mins"}, {"label": "Guarantee", "value": "10 Years"}]'::jsonb, 1),
('hero-2', 'Architectural Precision & High Security', 'Ultion 3-Star Diamond £2,000 Security Guarantee', 'Bespoke Panoramic Entrance Systems', 'Luxury Bi-Folds & 48mm Solid Doors', 'Make a grand entrance with featherlight finger-glide aluminium bi-fold doors and impenetrable 48mm timber-core composite doors designed for the British climate.', 'Explore Door Collection', '/services/stylish-doors', 'Get Door Quote', '/quote', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf', '[{"label": "Core Thickness", "value": "48mm Solid"}, {"label": "Security Level", "value": "PAS 24"}, {"label": "Acoustic Insulation", "value": "42 dB"}]'::jsonb, 2),
('hero-3', 'All-Year Comfort & Thermal Excellence', '0.15 W/m²K Ultra-Insulated Conversion', 'Transform Freezing / Boiling Spaces', 'Warm Roof Conservatory Living', 'Convert unusable polycarbonate conservatories into comfortable, light-filled all-season living rooms with Tapco slate tiles and integrated Velux rooflights.', 'Explore Warm Roofs', '/services/warm-roof-conservatories', 'Book Home Survey', '/quote', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq', '[{"label": "Thermal U-Value", "value": "0.15 U-Val"}, {"label": "Rain Noise", "value": "Muted 95%"}, {"label": "Compliance", "value": "JHAI Certified"}]'::jsonb, 3),
('hero-4', 'Cotswold & Oxfordshire Architecture', 'A++ Energy Rating with Pilkington Low-E', 'Precision uPVC & Slimline Aluminium', 'A++ Modern Energy Windows', 'Custom flush sash and casement windows available in over 30 heritage colour finishes including Anthracite Grey, Chartwell Green, and Golden Oak.', 'Configure Window Colors', '/services/modern-windows', 'Free Measurement', '/quote', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K', '[{"label": "Energy Efficiency", "value": "A++ Class"}, {"label": "Heritage Colours", "value": "30+ Shades"}, {"label": "FENSA Certified", "value": "Reg 28491"}]'::jsonb, 4)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  highlight_text = EXCLUDED.highlight_text,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  stats = EXCLUDED.stats;

-- 3. Comparison Matrix
INSERT INTO comparison_matrix (id, feature, window_doctor, national_guys, is_superior, sort_order)
VALUES
('comp-1', 'Cost for 8 Windows', '£760 - £1,100 (Glass Unit Replacement)', '£6,500 - £9,800 (Full Tear-Out)', true, 1),
('comp-2', 'Installation Time', '2 to 3 Hours (30-45 mins per unit)', '2 to 3 Days with Heavy Disruption', true, 2),
('comp-3', 'Damage to Interior Walls & Plaster', 'Zero Damage — Existing frames stay untouched', 'High — Plastering & re-decorating required', true, 3),
('comp-4', 'Thermal Insulation (Low-E Argon)', 'A+ Rating (1.1 W/m²K Pilkington Glass)', 'Standard Double Glazing', true, 4),
('comp-5', 'Sales Approach', 'Honest Master Glazier Survey (No Pressure)', 'High-Pressure Commissioned Sales Reps', true, 5)
ON CONFLICT (id) DO NOTHING;

-- 4. Process Steps
INSERT INTO process_steps (id, num, title, timing, description, sort_order)
VALUES
('step-1', '01', 'Laser Precision Survey', 'Free • 30 Mins', 'Our master glazier visits your home with digital laser gauges to measure exact unit dimensions, glass thickness, and spacer specs.', 1),
('step-2', '02', 'Bespoke UK Glazing', '2-4 Working Days', 'Your replacement units are hermetically sealed with Swissspacer warm edge bars and 90% pure Argon thermal gas in our regional workshop.', 2),
('step-3', '03', 'Clean Master Installation', '30-45 Mins / Pane', 'Beads are carefully unclipped, the failed unit is removed, and the new crystal unit is seated with zero mess and zero plaster damage.', 3),
('step-4', '04', '10-Year Certificate', 'Instant Handover', 'We test all handles, lubricate hinges, and issue your official 10-Year Insurance-Backed Anti-Fog Guarantee and FENSA documentation.', 4)
ON CONFLICT (id) DO NOTHING;

-- 5. FAQs
INSERT INTO faqs (id, question, answer, category, sort_order)
VALUES
('faq-1', 'Do I need to replace my whole window frame if the glass is misted?', 'No! In over 95% of cases, you only need to replace the failed double-glazed sealed unit. Your existing frames remain completely intact, saving you up to 70% compared to full replacements.', 'repairs', 1),
('faq-2', 'How long does a misted glass replacement take?', 'Our master technicians typically complete each window pane replacement in under 45 minutes with zero mess and zero disturbance to your internal decor or plaster.', 'repairs', 2),
('faq-3', 'Are your window installations FENSA certified and insured?', 'Yes. We are fully FENSA registered (No. 28491). All new window and door installations include Building Regulations compliance certification and a 10-Year Insurance-Backed Guarantee.', 'certification', 3),
('faq-4', 'Can you install cat flaps into double glazed glass doors?', 'Yes. We manufacture custom toughened double glazed glass units with pre-cut factory sealed apertures designed specifically for SureFlap microchip and manual cat flaps.', 'custom', 4),
('faq-5', 'Do you charge for home surveys and quotes in Oxfordshire?', 'No. All our initial on-site inspections, measurements, and formal written quotations are 100% free with absolutely no high-pressure sales obligation.', 'quotes', 5)
ON CONFLICT (id) DO NOTHING;

-- 6. Trust Pillars
INSERT INTO trust_pillars (id, title, subtitle, description, icon_name, sort_order)
VALUES
('pillar-1', 'Est. 1983 Heritage', '40+ Years Local Experience', 'Four decades of uninterrupted service to Bicester, Oxford, and surrounding Cotswold communities.', 'Clock', 1),
('pillar-2', 'FENSA Certified', 'Reg. No. 28491', 'All replacement windows and doors comply fully with UK Building Regulations with official certification.', 'ShieldCheck', 2),
('pillar-3', '10-Year Guarantee', 'Insurance-Backed Security', 'Enjoy long-term peace of mind on all sealed double glazed units and modern frame installations.', 'Award', 3),
('pillar-4', 'No High-Pressure Sales', 'Honest Master Glazier Advice', 'Direct communication with seasoned fenestration engineers without sales intermediaries.', 'CheckCircle', 4)
ON CONFLICT (id) DO NOTHING;

-- 7. Frame Colors
INSERT INTO frame_colors (id, name, ral_code, hex_color, finish, is_popular, sort_order)
VALUES
('col-1', 'Anthracite Grey', 'RAL 7016', '#383E42', 'Textured Matt Foil', true, 1),
('col-2', 'Chartwell Green', 'BS 14 C 35', '#8BA896', 'Heritage Woodgrain', true, 2),
('col-3', 'Agate Grey', 'RAL 7038', '#B5B8B1', 'Smooth Silk', true, 3),
('col-4', 'Classic Brilliant White', 'RAL 9016', '#F4F4F4', 'High-Gloss Smooth', true, 4),
('col-5', 'Golden Oak', 'Woodgrain', '#A87139', 'Natural Timber Texture', false, 5),
('col-6', 'Rosewood', 'Woodgrain', '#522A1E', 'Deep Timber Texture', false, 6),
('col-7', 'Slate Grey', 'RAL 7015', '#4C5155', 'Matt Foil', false, 7),
('col-8', 'Black Ash', 'RAL 9005', '#1F2022', 'Architectural Grain', false, 8)
ON CONFLICT (id) DO NOTHING;

-- 8. Energy Rates
INSERT INTO energy_rates (id, key, label, rate_value, unit)
VALUES
('rate-1', 'single_to_a_plus_savings', 'Single to A++ Glazing Annual Savings', 195.00, '£ / year'),
('rate-2', 'old_double_to_argon_savings', 'Old 90s Double to Argon Low-E Savings', 145.00, '£ / year'),
('rate-3', 'co2_reduction_kg', 'Average Annual Carbon Reduction', 420.00, 'kg CO2 / year'),
('rate-4', 'u_value_improvement_percent', 'Thermal Retention Improvement', 64.00, '% retention')
ON CONFLICT (id) DO NOTHING;

-- 9. Service Categories & Services
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

-- 10. Service Areas & Postcodes
INSERT INTO service_areas (id, town_name, county, response_time_hours, emergency_available, free_survey, is_active) VALUES
('area-1', 'Bicester & Bucknell', 'Oxfordshire', 2, true, true, true),
('area-2', 'Oxford City & Suburbs', 'Oxfordshire', 4, true, true, true),
('area-3', 'Banbury & Surrounds', 'Oxfordshire', 4, true, true, true),
('area-4', 'Kidlington & Woodstock', 'Oxfordshire', 4, true, true, true),
('area-5', 'Brackley & Buckingham', 'Buckinghamshire', 6, true, true, true),
('area-6', 'Witney & Cotswolds East', 'Oxfordshire', 6, true, true, true),
('area-7', 'Thame & Aylesbury Border', 'Oxfordshire', 6, true, true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO postcodes (id, area_id, postcode_prefix, region_name) VALUES
('pc-1', 'area-1', 'OX25', 'Bicester North, Bucknell, Ambrosden, Weston-on-the-Green'),
('pc-2', 'area-1', 'OX26', 'Bicester Central, Kingsmere, Highfield, Bure Park'),
('pc-3', 'area-1', 'OX27', 'Bicester East, Fritwell, Marsh Gibbon, Stratton Audley'),
('pc-4', 'area-2', 'OX1', 'Central Oxford, Grandpont, New Hinksey'),
('pc-5', 'area-2', 'OX2', 'North Oxford, Summertown, Wolvercote, Jericho'),
('pc-6', 'area-2', 'OX3', 'Headington, Marston, Barton'),
('pc-7', 'area-2', 'OX4', 'East Oxford, Cowley, Iffley, Rose Hill'),
('pc-8', 'area-4', 'OX5', 'Kidlington, Yarnton, Begbroke, Gosford'),
('pc-9', 'area-3', 'OX15', 'Bloxham, Deddington, Hook Norton, Sibford Gower'),
('pc-10', 'area-3', 'OX16', 'Banbury Town, Neithrop, Hardwick, Grimsbury'),
('pc-11', 'area-6', 'OX28', 'Witney Central, Cogges, Ducklington'),
('pc-12', 'area-6', 'OX29', 'Eynsham, Long Hanborough, Freeland'),
('pc-13', 'area-7', 'OX9', 'Thame, Moreton, Towersey'),
('pc-14', 'area-5', 'NN13', 'Brackley, Croughton, Evenley, Turweston'),
('pc-15', 'area-5', 'MK18', 'Buckingham, Tingewick, Gawcott')
ON CONFLICT (postcode_prefix) DO NOTHING;

-- 11. Integrations (8 Providers)
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

-- 12. SEO Blog Articles
INSERT INTO blog_posts (slug, title, excerpt, content, target_keywords, seo_title, seo_description, featured_image_url) VALUES
('misted-double-glazing-repair-guide-oxfordshire', 'Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Guide', 'Discover why double glazed windows fail, why you do NOT need new frames, and how to save up to 70% in Bicester and Oxford.', 'Double glazing seal failure is one of the most common issues facing homeowners across Oxfordshire...', ARRAY['misted double glazing bicester', 'window repair oxford', 'failed glass unit replacement'], 'Misted Double Glazing Repair Guide | Save 70% in Oxfordshire', 'Learn why double glazing windows mist up and how replacing only the sealed glass unit saves thousands compared to full window replacements.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I'),
('conservatory-warm-roof-conversion-benefits', 'Transforming Unusable Conservatories with Tiled Warm Roofs in 2026', 'Is your conservatory freezing in winter and boiling in summer? Discover how insulated lightweight warm roofs add year-round living space.', 'For decades, Victorian and Edwardian style conservatories with polycarbonate or uninsulated glass roofs have plagued UK homeowners with extreme temperature swings...', ARRAY['conservatory warm roof banbury', 'tiled conservatory roof bicester', 'guardian warm roof oxford'], 'Conservatory Warm Roof Conversion Guide | The Window Doctor', 'Discover how converting your conservatory to an insulated warm tiled roof creates comfortable year-round living space and adds property value.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq')
ON CONFLICT (slug) DO NOTHING;


