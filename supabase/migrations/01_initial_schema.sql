-- ==============================================================================
-- THE WINDOW DOCTOR - SUPABASE DATABASE SCHEMA MIGRATION
-- Project: The Window Doctor (Bicester & Oxfordshire)
-- Est. 1983 - Master Glaziers & Fenestration Specialists
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
    postcode_prefix VARCHAR(10) NOT NULL UNIQUE, -- e.g., OX25, OX26, OX1, OX2, NN13, HP18
    region_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. QUOTE REQUESTS, ESTIMATES & ATTACHMENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_no VARCHAR(32) UNIQUE NOT NULL, -- e.g. TWD-2026-XXXX
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    postcode VARCHAR(16) NOT NULL,
    address_line TEXT,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    service_type_name VARCHAR(128),
    property_type VARCHAR(64), -- 'Detached', 'Semi-Detached', 'Terrace', 'Commercial', 'Other'
    dimensions_spec JSONB DEFAULT '{}'::jsonb, -- width, height, quantity, frame_color, glass_type
    project_details TEXT NOT NULL,
    preferred_contact_method VARCHAR(32) DEFAULT 'phone', -- 'phone', 'email', 'whatsapp'
    preferred_survey_date DATE,
    preferred_time_slot VARCHAR(32), -- 'morning', 'afternoon', 'flexible'
    estimated_price_min NUMERIC(10, 2),
    estimated_price_max NUMERIC(10, 2),
    status VARCHAR(32) DEFAULT 'PENDING', -- 'PENDING', 'REVIEWED', 'SURVEY_SCHEDULED', 'QUOTED', 'COMPLETED', 'CANCELLED'
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255),
    file_type VARCHAR(64),
    file_size_bytes INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. ON-SITE SURVEYS & BOOKINGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID REFERENCES quote_requests(id) ON DELETE CASCADE,
    survey_date DATE NOT NULL,
    time_slot VARCHAR(64) NOT NULL, -- '09:00 - 12:00', '13:00 - 17:00'
    assigned_surveyor_name VARCHAR(128) DEFAULT 'Master Glazier Specialist',
    status VARCHAR(32) DEFAULT 'CONFIRMED', -- 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'RESCHEDULED', 'CANCELLED'
    surveyor_notes TEXT,
    measurements_report JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. PROJECTS PORTFOLIO & BEFORE/AFTER GALLERY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    location_city VARCHAR(128) NOT NULL, -- 'Bicester', 'Bucknell', 'Oxford', 'Banbury'
    completion_year VARCHAR(10) DEFAULT '2024',
    summary TEXT NOT NULL,
    challenge_description TEXT,
    solution_description TEXT,
    specifications JSONB DEFAULT '[]'::jsonb,
    before_image_url TEXT,
    after_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    is_hero BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. CUSTOMER REVIEWS & TESTIMONIALS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    customer_name VARCHAR(128) NOT NULL,
    customer_location VARCHAR(128) NOT NULL,
    service_category VARCHAR(128),
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review_title VARCHAR(255),
    review_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    review_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict White-Label Policy: Public can insert quotes & read active public content.
-- ------------------------------------------------------------------------------
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE postcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read active categories" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Public read active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active service areas" ON service_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Public read postcodes" ON postcodes FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read project images" ON project_gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read verified reviews" ON customer_reviews FOR SELECT USING (is_verified = true);

-- Public Quote Insertion (Safe Insert for Customer Leads)
CREATE POLICY "Public insert quote request" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert quote attachments" ON quote_attachments FOR INSERT WITH CHECK (true);

-- Indexes for high-performance lookups
CREATE INDEX IF NOT EXISTS idx_postcodes_prefix ON postcodes(postcode_prefix);
CREATE INDEX IF NOT EXISTS idx_quote_requests_reference ON quote_requests(reference_no);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_projects_service ON projects(service_id);
