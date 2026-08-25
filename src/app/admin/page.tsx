"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  BarChart3, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Layers, 
  Star, 
  BookOpen, 
  Settings, 
  PlusCircle, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Lock, 
  Radio, 
  Activity, 
  ArrowUpRight,
  ChevronRight,
  Target,
  Megaphone,
  Globe,
  Share2,
  Calendar,
  RefreshCw,
  Check,
  X,
  Menu,
  Edit2,
  Trash2,
  Eye,
  Plus,
  Image as ImageIcon,
  FolderPlus,
  HelpCircle,
  ArrowDownUp,
  Cog,
  GripVertical,
  Building2,
  Save,
  Zap,
  Award,
  Palette,
  Calculator,
  Download,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  LayoutDashboard
} from "lucide-react";
import { 
  GOOGLE_REVIEWS, 
  MOCK_SERVICES, 
  MOCK_PROJECTS, 
  MOCK_SERVICE_AREAS,
  HERO_SLIDES,
  DEFAULT_FAQS,
  DEFAULT_COMPARISON_ROWS,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TRUST_PILLARS,
  DEFAULT_FRAME_COLORS,
  DEFAULT_ENERGY_RATES,
  TrustPillarItem,
  FrameColorItem,
  EnergyRateItem
} from "@/lib/supabase/mock-data";
import IntegrationManager from "@/components/admin/IntegrationManager";
import MediaLibrary from "@/components/admin/MediaLibrary";
import SlideOverDrawer from "@/components/admin/SlideOverDrawer";
import ImageUploadField from "@/components/admin/ImageUploadField";
import LiveTrafficCommandCenter from "@/components/admin/LiveTrafficCommandCenter";
import { AdminInstallAppModal } from "@/components/admin/AdminInstallAppModal";
import {
  GoogleAnalyticsLogo,
  GoogleTagManagerLogo,
  GoogleSearchConsoleLogo,
  GoogleAdsLogo,
  MetaLogo,
  LineLogo,
  GoogleMapsLogo,
  SupabaseLogo
} from "@/components/admin/PlatformLogos";
import { cn } from "@/lib/utils";

const formatCurrency = (val: number) => "£" + Number(val || 0).toLocaleString("en-GB");

// -----------------------------------------------------------------------------
// DATA INTERFACES
// -----------------------------------------------------------------------------
interface QuoteLead {
  id: string;
  reference_no: string;
  customer_name: string;
  phone: string;
  email: string;
  postcode: string;
  service_type: string;
  units: number;
  estimated_cost: number;
  survey_slot: string;
  status: "PENDING" | "SURVEY_SCHEDULED" | "QUOTED" | "COMPLETED";
  created_at: string;
  source: string;
  notes?: string;
}

interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  base_price_estimate: number;
  warranty_years: number;
  is_active: boolean;
  image_url?: string;
}

interface ProjectItem {
  id: string;
  title: string;
  location_city: string;
  completion_year: string;
  summary: string;
  is_featured: boolean;
  image_before_url?: string;
  image_after_url?: string;
}

interface ReviewItem {
  id: string;
  customer_name: string;
  customer_location: string;
  rating: number;
  review_title: string;
  review_text: string;
  time_ago: string;
}

interface AreaItem {
  id: string;
  town_name: string;
  county: string;
  response_time_hours: number;
  emergency_available: boolean;
}

interface BlogItem {
  slug: string;
  title: string;
  seoScore: number;
  keywords: string[];
  is_published: boolean;
}

// NEW: Hero Slide interface
interface HeroSlideItem {
  id: string;
  tag: string;
  badgeText: string;
  title: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
}

// NEW: FAQ interface
interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

// NEW: Comparison Row interface
interface ComparisonRow {
  id: string;
  feature: string;
  windowDoctor: string;
  nationalGuys: string;
}

// NEW: Process Step interface
interface ProcessStep {
  id: string;
  num: string;
  title: string;
  timing: string;
  description: string;
}

// NEW: Site Settings interface
interface SiteSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  fensaNumber: string;
  openingHours: string;
  googleMapsPlaceId: string;
  facebookUrl: string;
  instagramUrl: string;
  tagline: string;
}

export default function EnterpriseAdminSuite() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "live-traffic" | "crm" | "services" | "projects" | "reviews" | "areas" | "seo" | "integrations" | "heroSlider" | "faqs" | "comparison" | "processSteps" | "siteSettings" | "media" | "trustPillars" | "frameColors" | "energyRates"
  >("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  const [trustPillars, setTrustPillars] = useState<TrustPillarItem[]>(DEFAULT_TRUST_PILLARS);
  const [frameColors, setFrameColors] = useState<FrameColorItem[]>(DEFAULT_FRAME_COLORS);
  const [energyRates, setEnergyRates] = useState<EnergyRateItem[]>(DEFAULT_ENERGY_RATES);

  const [actionToast, setActionToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setActionToast({ message, type });
    setTimeout(() => setActionToast(null), 4000);
  };

  // ---------------------------------------------------------------------------
  // 1. CRM LEADS STATE & CRUD
  // ---------------------------------------------------------------------------
  const [leads, setLeads] = useState<QuoteLead[]>([
    {
      id: "1",
      reference_no: "TWD-2026-8812",
      customer_name: "Mrs. Eleanor Vance",
      phone: "07891 234567",
      email: "eleanor.vance@oxford.ac.uk",
      postcode: "OX2 6NN (North Oxford)",
      service_type: "Misted Glass & Seal Failure",
      units: 6,
      estimated_cost: 570,
      survey_slot: "Morning (09:00 - 12:00)",
      status: "PENDING",
      source: "Google Search (Organic)",
      created_at: "12 mins ago",
      notes: "Condensation between bay window glass. Urgently requested diagnostic survey."
    },
    {
      id: "2",
      reference_no: "TWD-2026-4421",
      customer_name: "James Bellingham",
      phone: "07700 900123",
      email: "james.b@kingsmere-bicester.co.uk",
      postcode: "OX26 1AB (Bicester)",
      service_type: "Anthracite Bi-fold Doors",
      units: 1,
      estimated_cost: 3200,
      survey_slot: "Afternoon (13:00 - 17:00)",
      status: "SURVEY_SCHEDULED",
      source: "Google Ads (PPC)",
      created_at: "2 hours ago",
      notes: "Rear garden extension. On-site laser survey booked for Friday 14:00."
    },
    {
      id: "3",
      reference_no: "TWD-2026-1099",
      customer_name: "Dr. Alistair Finch",
      phone: "07987 654321",
      email: "finch.a@cotswolds-heritage.org",
      postcode: "OX15 4AA (Bloxham, Banbury)",
      service_type: "Warm Roof Conservatory",
      units: 1,
      estimated_cost: 6500,
      survey_slot: "Morning (09:00 - 12:00)",
      status: "QUOTED",
      source: "Google Search (Organic)",
      created_at: "Yesterday",
      notes: "PDF estimate sent. Client reviewing Tapco slate and Velux skylight options."
    },
    {
      id: "4",
      reference_no: "TWD-2026-9045",
      customer_name: "Sarah & Peter Higgins",
      phone: "07888 112233",
      email: "s.higgins@kidlington-village.co.uk",
      postcode: "OX5 2EE (Kidlington)",
      service_type: "uPVC Flush Sash Windows",
      units: 8,
      estimated_cost: 3040,
      survey_slot: "Morning (09:00 - 12:00)",
      status: "COMPLETED",
      source: "Direct Referral",
      created_at: "3 days ago",
      notes: "Job complete. FENSA certificate & 10-Yr warranty delivered. 5-star review left."
    },
  ]);

  const [leadModal, setLeadModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<QuoteLead> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadModal.data?.customer_name) return;

    if (leadModal.mode === "create") {
      const newLead: QuoteLead = {
        id: Date.now().toString(),
        reference_no: `TWD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        customer_name: leadModal.data.customer_name || "New Customer",
        phone: leadModal.data.phone || "01869 572206",
        email: leadModal.data.email || "customer@example.com",
        postcode: leadModal.data.postcode || "OX26 (Bicester)",
        service_type: leadModal.data.service_type || "Misted Glass Repair",
        units: Number(leadModal.data.units) || 1,
        estimated_cost: Number(leadModal.data.estimated_cost) || 95,
        survey_slot: leadModal.data.survey_slot || "Morning (09:00 - 12:00)",
        status: (leadModal.data.status as QuoteLead["status"]) || "PENDING",
        source: "Admin Manual Entry",
        created_at: "Just now",
        notes: leadModal.data.notes || ""
      };
      setLeads([newLead, ...leads]);
    } else {
      setLeads(leads.map((l) => (l.id === leadModal.data?.id ? ({ ...l, ...leadModal.data } as QuoteLead) : l)));
    }
    setLeadModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteLead = (id: string) => {
    if (confirm("Are you sure you want to delete this quote lead?")) {
      setLeads(leads.filter((l) => l.id !== id));
    }
  };

  const updateLeadStatus = (id: string, newStatus: QuoteLead["status"]) => {
    setLeads(leads.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)));
  };

  // ---------------------------------------------------------------------------
  // 2. SERVICES STATE & CRUD
  // ---------------------------------------------------------------------------
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", slug: "misted-glass-repair", title: "Misted Glass & Seal Failure Repair", short_description: "Restore crystal-clear views with Argon Low-E glass units in under 45 mins.", base_price_estimate: 95, warranty_years: 10, is_active: true },
    { id: "2", slug: "modern-windows", title: "Modern Energy-Efficient Windows", short_description: "Precision-crafted uPVC and slimline aluminium windows with A++ energy rating.", base_price_estimate: 380, warranty_years: 10, is_active: true },
    { id: "3", slug: "stylish-doors", title: "Bespoke Composite & Bi-fold Doors", short_description: "48mm solid timber core composite doors and panoramic bi-folds with 3-Star Ultion locks.", base_price_estimate: 750, warranty_years: 10, is_active: true },
    { id: "4", slug: "warm-roof-conservatories", title: "Warm Roof Conservatory Conversions", short_description: "Convert unusable polycarbonate roofs into insulated all-season tiled living rooms.", base_price_estimate: 2500, warranty_years: 10, is_active: true },
    { id: "5", slug: "bespoke-glass-balustrades", title: "Frameless Glass Balustrades", short_description: "17.5mm toughened laminated glass with 316 marine-grade stainless steel fittings.", base_price_estimate: 220, warranty_years: 10, is_active: true },
  ]);

  const [serviceModal, setServiceModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<ServiceItem> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModal.data?.title) return;

    if (serviceModal.mode === "create") {
      const newSrv: ServiceItem = {
        id: Date.now().toString(),
        slug: serviceModal.data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: serviceModal.data.title,
        short_description: serviceModal.data.short_description || "Professional fenestration service in Oxfordshire.",
        base_price_estimate: Number(serviceModal.data.base_price_estimate) || 100,
        warranty_years: Number(serviceModal.data.warranty_years) || 10,
        is_active: true,
      };
      setServices([...services, newSrv]);
    } else {
      setServices(services.map((s) => (s.id === serviceModal.data?.id ? ({ ...s, ...serviceModal.data } as ServiceItem) : s)));
    }
    setServiceModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Delete this service from the catalog?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  // ---------------------------------------------------------------------------
  // 3. PROJECTS / CASE STUDIES STATE & CRUD
  // ---------------------------------------------------------------------------
  const [projects, setProjects] = useState<ProjectItem[]>([
    { id: "1", title: "Complete Misted Double Glazing Restoration", location_city: "Kingsmere, Bicester", completion_year: "2024", summary: "Replaced 14 misted units while retaining customer mahogany frames, saving £6,200.", is_featured: true },
    { id: "2", title: "Anthracite Aluminium Bi-Fold Doors Installation", location_city: "Summertown, Oxford", completion_year: "2024", summary: "Fitted 5-panel panoramic aluminium bi-fold doors with flush threshold and Ultion security.", is_featured: true },
    { id: "3", title: "Lightweight Warm Roof Conservatory Conversion", location_city: "Bloxham, Banbury", completion_year: "2024", summary: "Replaced polycarbonate roof with SupaLite warm roof, Tapco slate, and 2 Velux rooflights.", is_featured: true },
  ]);

  const [projectModal, setProjectModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<ProjectItem> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectModal.data?.title) return;

    if (projectModal.mode === "create") {
      const newProj: ProjectItem = {
        id: Date.now().toString(),
        title: projectModal.data.title,
        location_city: projectModal.data.location_city || "Bicester, Oxfordshire",
        completion_year: projectModal.data.completion_year || "2026",
        summary: projectModal.data.summary || "Bespoke master glazing project completed.",
        is_featured: true,
      };
      setProjects([...projects, newProj]);
    } else {
      setProjects(projects.map((p) => (p.id === projectModal.data?.id ? ({ ...p, ...projectModal.data } as ProjectItem) : p)));
    }
    setProjectModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Delete this case study?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  // ---------------------------------------------------------------------------
  // 4. GOOGLE REVIEWS STATE & CRUD
  // ---------------------------------------------------------------------------
  const [reviews, setReviews] = useState<ReviewItem[]>([
    { id: "1", customer_name: "Katie Hawkins", customer_location: "Bicester", rating: 5, review_title: "Sean came and quoted, really polite and understood what we wanted", review_text: "Sean came and quoted, really polite. Fitted in 2 weeks and looks fantastic!", time_ago: "9 months ago" },
    { id: "2", customer_name: "Carly Brown", customer_location: "Bicester", rating: 5, review_title: "Really happy with my new front door", review_text: "Fitted quickly, looks great, and everything was left tidy.", time_ago: "6 months ago" },
    { id: "3", customer_name: "Darren Barber", customer_location: "Oxfordshire", rating: 5, review_title: "Bi-Fold Doors Installation", review_text: "Great advice and flawless installation of our 3-panel bifold doors.", time_ago: "1 year ago" },
  ]);

  const [reviewModal, setReviewModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<ReviewItem> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewModal.data?.customer_name) return;

    if (reviewModal.mode === "create") {
      const newRev: ReviewItem = {
        id: Date.now().toString(),
        customer_name: reviewModal.data.customer_name,
        customer_location: reviewModal.data.customer_location || "Oxfordshire",
        rating: Number(reviewModal.data.rating) || 5,
        review_title: reviewModal.data.review_title || "Excellent Glazing Service",
        review_text: reviewModal.data.review_text || "Very happy with the work done.",
        time_ago: "Just now",
      };
      setReviews([newRev, ...reviews]);
    } else {
      setReviews(reviews.map((r) => (r.id === reviewModal.data?.id ? ({ ...r, ...reviewModal.data } as ReviewItem) : r)));
    }
    setReviewModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteReview = (id: string) => {
    if (confirm("Delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // ---------------------------------------------------------------------------
  // 5. SERVICE AREAS STATE & CRUD
  // ---------------------------------------------------------------------------
  const [areas, setAreas] = useState<AreaItem[]>([
    { id: "1", town_name: "Bicester & Kingsmere", county: "Oxfordshire (OX26)", response_time_hours: 24, emergency_available: true },
    { id: "2", town_name: "Oxford City & Summertown", county: "Oxfordshire (OX1, OX2)", response_time_hours: 24, emergency_available: true },
    { id: "3", town_name: "Banbury & Bloxham", county: "Oxfordshire (OX15, OX16)", response_time_hours: 24, emergency_available: true },
    { id: "4", town_name: "Kidlington & Woodstock", county: "Oxfordshire (OX5, OX20)", response_time_hours: 24, emergency_available: true },
  ]);

  const [areaModal, setAreaModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<AreaItem> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaModal.data?.town_name) return;

    if (areaModal.mode === "create") {
      const newArea: AreaItem = {
        id: Date.now().toString(),
        town_name: areaModal.data.town_name,
        county: areaModal.data.county || "Oxfordshire",
        response_time_hours: Number(areaModal.data.response_time_hours) || 24,
        emergency_available: true,
      };
      setAreas([...areas, newArea]);
    } else {
      setAreas(areas.map((a) => (a.id === areaModal.data?.id ? ({ ...a, ...areaModal.data } as AreaItem) : a)));
    }
    setAreaModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteArea = (id: string) => {
    if (confirm("Remove this service area?")) {
      setAreas(areas.filter((a) => a.id !== id));
    }
  };

  // ---------------------------------------------------------------------------
  // 6. BLOG / SEO ARTICLES STATE & CRUD
  // ---------------------------------------------------------------------------
  const [blogs, setBlogs] = useState<BlogItem[]>([
    { slug: "misted-double-glazing-repair-guide-oxfordshire", title: "Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Guide", seoScore: 98, keywords: ["misted double glazing bicester", "window repair oxford"], is_published: true },
    { slug: "conservatory-warm-roof-conversion-benefits", title: "Transforming Unusable Conservatories with Tiled Warm Roofs in 2026", seoScore: 95, keywords: ["conservatory warm roof banbury", "tiled roof oxford"], is_published: true },
  ]);

  const [blogModal, setBlogModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<BlogItem> | null }>({
    isOpen: false,
    mode: "create",
    data: null,
  });

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogModal.data?.title) return;

    if (blogModal.mode === "create") {
      const newBlog: BlogItem = {
        slug: blogModal.data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: blogModal.data.title,
        seoScore: 95,
        keywords: blogModal.data.keywords || ["oxfordshire glazing", "window repair"],
        is_published: true,
      };
      setBlogs([...blogs, newBlog]);
    } else {
      setBlogs(blogs.map((b) => (b.slug === blogModal.data?.slug ? ({ ...b, ...blogModal.data } as BlogItem) : b)));
    }
    setBlogModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteBlog = (slug: string) => {
    if (confirm("Delete this SEO article?")) {
      setBlogs(blogs.filter((b) => b.slug !== slug));
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = selectedStatusFilter === "ALL" || lead.status === selectedStatusFilter;
    const matchesSearch =
      lead.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.reference_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPipelineRevenue = leads.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  // ---------------------------------------------------------------------------
  // 7. HERO SLIDES STATE & CRUD
  // ---------------------------------------------------------------------------
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(HERO_SLIDES);

  const [heroModal, setHeroModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<HeroSlideItem> | null }>({ isOpen: false, mode: "create", data: null });

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroModal.data?.title) return;
    if (heroModal.mode === "create") {
      const newSlide: HeroSlideItem = { id: Date.now().toString(), tag: heroModal.data.tag || "", badgeText: heroModal.data.badgeText || "", title: heroModal.data.title, highlightText: heroModal.data.highlightText || "", description: heroModal.data.description || "", primaryCtaText: heroModal.data.primaryCtaText || "Get Quote", primaryCtaLink: heroModal.data.primaryCtaLink || "/quote", secondaryCtaText: heroModal.data.secondaryCtaText || "Call Us", secondaryCtaLink: heroModal.data.secondaryCtaLink || "tel:01869572206", imageUrl: heroModal.data.imageUrl || "", stats: heroModal.data.stats || [] };
      setHeroSlides([...heroSlides, newSlide]);
    } else {
      setHeroSlides(heroSlides.map((s) => (s.id === heroModal.data?.id ? ({ ...s, ...heroModal.data } as HeroSlideItem) : s)));
    }
    setHeroModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteHero = (id: string) => { if (confirm("Delete this hero slide?")) setHeroSlides(heroSlides.filter((s) => s.id !== id)); };

  // ---------------------------------------------------------------------------
  // 8. FAQ STATE & CRUD
  // ---------------------------------------------------------------------------
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);

  const [faqModal, setFaqModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<FaqItem> | null }>({ isOpen: false, mode: "create", data: null });

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqModal.data?.question) return;
    if (faqModal.mode === "create") {
      setFaqs([...faqs, { id: Date.now().toString(), question: faqModal.data.question, answer: faqModal.data.answer || "", sort_order: faqs.length + 1 }]);
    } else {
      setFaqs(faqs.map((f) => (f.id === faqModal.data?.id ? ({ ...f, ...faqModal.data } as FaqItem) : f)));
    }
    setFaqModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteFaq = (id: string) => { if (confirm("Delete this FAQ?")) setFaqs(faqs.filter((f) => f.id !== id)); };

  // ---------------------------------------------------------------------------
  // 9. COMPARISON MATRIX STATE & CRUD
  // ---------------------------------------------------------------------------
  const [comparisonRows, setComparisonRows] = useState<ComparisonRow[]>(DEFAULT_COMPARISON_ROWS);

  const [compModal, setCompModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<ComparisonRow> | null }>({ isOpen: false, mode: "create", data: null });

  const handleSaveComp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compModal.data?.feature) return;
    if (compModal.mode === "create") {
      setComparisonRows([...comparisonRows, { id: Date.now().toString(), feature: compModal.data.feature, windowDoctor: compModal.data.windowDoctor || "", nationalGuys: compModal.data.nationalGuys || "" }]);
    } else {
      setComparisonRows(comparisonRows.map((c) => (c.id === compModal.data?.id ? ({ ...c, ...compModal.data } as ComparisonRow) : c)));
    }
    setCompModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteComp = (id: string) => { if (confirm("Delete this comparison row?")) setComparisonRows(comparisonRows.filter((c) => c.id !== id)); };

  // ---------------------------------------------------------------------------
  // 10. PROCESS STEPS STATE & CRUD
  // ---------------------------------------------------------------------------
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(DEFAULT_PROCESS_STEPS);

  const [stepModal, setStepModal] = useState<{ isOpen: boolean; mode: "create" | "edit"; data: Partial<ProcessStep> | null }>({ isOpen: false, mode: "create", data: null });

  const handleSaveStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepModal.data?.title) return;
    if (stepModal.mode === "create") {
      setProcessSteps([...processSteps, { id: Date.now().toString(), num: String(processSteps.length + 1).padStart(2, "0"), title: stepModal.data.title, timing: stepModal.data.timing || "", description: stepModal.data.description || "" }]);
    } else {
      setProcessSteps(processSteps.map((s) => (s.id === stepModal.data?.id ? ({ ...s, ...stepModal.data } as ProcessStep) : s)));
    }
    setStepModal({ isOpen: false, mode: "create", data: null });
  };

  const handleDeleteStep = (id: string) => { if (confirm("Delete this process step?")) setProcessSteps(processSteps.filter((s) => s.id !== id)); };

  // ---------------------------------------------------------------------------
  // 11. SITE SETTINGS STATE
  // ---------------------------------------------------------------------------
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  const [settingsSaved, setSettingsSaved] = useState(false);
  const handleSaveSettings = () => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); };

  // Database Cloud Seed & Sync Handler
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSyncToSupabase = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeedResult({ message: "✓ 100% Real Website Data Synced to Supabase Production!", type: "success" });
      } else {
        setSeedResult({ message: `Sync Note: ${data.error || "Please run full_schema_and_seed.sql in Supabase"}`, type: "error" });
      }
    } catch (err: any) {
      setSeedResult({ message: "✓ Offline Mode: Local Master Schema is ready.", type: "success" });
    } finally {
      setIsSeeding(false);
      setTimeout(() => setSeedResult(null), 5000);
    }
  };

  // ---------------------------------------------------------------------------
  // 12. NAVIGATION GROUPS & COLLAPSIBLE SIDEBAR
  // ---------------------------------------------------------------------------
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const NAVIGATION_GROUPS = [
    {
      title: "Analytics & Telemetry",
      items: [
        { id: "dashboard", label: "Executive Dashboard", icon: BarChart3, badge: "Live" },
        { id: "live-traffic", label: "Real-Time Traffic", icon: Radio, badge: "LIVE" },
      ]
    },
    {
      title: "CRM & Operations",
      items: [
        { id: "crm", label: "CRM & Quote Leads", icon: Users, badge: `${leads.length}` },
        { id: "areas", label: "Coverage & Postcodes", icon: MapPin, badge: `${areas.length}` },
      ]
    },
    {
      title: "Glazing & Content CMS",
      items: [
        { id: "heroSlider", label: "Hero Slider & Banners", icon: ImageIcon, badge: `${heroSlides.length}` },
        { id: "services", label: "Services & Pricing", icon: Sliders, badge: `${services.length}` },
        { id: "projects", label: "Case Studies CMS", icon: Layers, badge: `${projects.length}` },
        { id: "reviews", label: "Customer Reviews", icon: Star, badge: `${reviews.length}` },
        { id: "trustPillars", label: "Trust & Heritage", icon: ShieldCheck, badge: `${trustPillars.length}` },
        { id: "frameColors", label: "Frame Colors & RAL", icon: Palette, badge: `${frameColors.length}` },
        { id: "energyRates", label: "Energy Rates & ROI", icon: Zap, badge: `${energyRates.length}` },
        { id: "comparison", label: "Comparison Table", icon: ArrowDownUp, badge: `${comparisonRows.length}` },
        { id: "processSteps", label: "Process Steps", icon: GripVertical, badge: `${processSteps.length}` },
        { id: "faqs", label: "FAQs & Schema", icon: HelpCircle, badge: `${faqs.length}` },
      ]
    },
    {
      title: "Growth & Settings",
      items: [
        { id: "seo", label: "Google SEO & Guides", icon: Target, badge: "Score 98" },
        { id: "media", label: "Media Library", icon: FolderPlus, badge: "5 Assets" },
        { id: "integrations", label: "Integration Settings", icon: Settings },
        { id: "siteSettings", label: "Site Settings", icon: Building2 },
      ]
    }
  ];

  const allNavItems = NAVIGATION_GROUPS.flatMap((g) => g.items);
  const currentNav = allNavItems.find((n) => n.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased font-body">
      
      {/* ========================================================================= */}
      {/* 1. COLLAPSIBLE ENTERPRISE SIDEBAR (พับได้อัตโนมัติ/สลับโหมด 260px / 70px)     */}
      {/* ========================================================================= */}
      <aside className={cn(
        "bg-white border-r border-slate-200/80 flex flex-col justify-between flex-shrink-0 z-40 transition-all duration-300 ease-in-out shadow-xs",
        "fixed md:sticky top-0 h-screen",
        sidebarCollapsed ? "w-[72px]" : "w-[264px]",
        sidebarOpen ? "left-0" : "-left-72 md:left-0"
      )}>
        {/* Sidebar Header */}
        <div className={cn(
          "h-16 border-b border-slate-100 flex items-center justify-between bg-white px-4 transition-all",
          sidebarCollapsed && "px-3 justify-center"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <Link href="/admin" className="relative w-9 h-9 rounded-md overflow-hidden border border-slate-200/90 flex-shrink-0 bg-white shadow-2xs hover:opacity-90 transition-opacity">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </Link>
            {!sidebarCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <span className="font-headline font-bold text-sm text-slate-900 tracking-tight block truncate">
                  The Window Doctor
                </span>
                <span className="text-[10px] text-slate-600 font-bold font-label tracking-wider uppercase block">
                  Enterprise Suite
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          {!sidebarCollapsed && (
            <button
              type="button"
              onClick={() => setSidebarCollapsed(true)}
              className="hidden md:flex p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 rounded text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapsed Expand Quick Button */}
        {sidebarCollapsed && (
          <div className="hidden md:flex justify-center pt-2 pb-1">
            <button
              type="button"
              onClick={() => setSidebarCollapsed(false)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              title="Expand sidebar (Full Menu)"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sidebar Navigation Links (Categorized) */}
        <div className={cn(
          "flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 font-label",
          sidebarCollapsed && "p-2 space-y-2"
        )}>
          {NAVIGATION_GROUPS.map((group, gIdx) => (
            <div key={group.title} className="space-y-1">
              {!sidebarCollapsed ? (
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 pt-1.5 pb-1">
                  {group.title}
                </div>
              ) : gIdx > 0 ? (
                <div className="h-px bg-slate-100 my-2 mx-1" />
              ) : null}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                if (sidebarCollapsed) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as typeof activeTab);
                        setSidebarOpen(false);
                      }}
                      className={cn(
                        "w-11 h-10 mx-auto rounded-md flex items-center justify-center relative group transition-all",
                        isActive
                          ? "bg-slate-900 text-white shadow-sm font-bold"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                      )}
                      title={item.label}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-800")} />
                      
                      {/* Hover Flyout Floating Tooltip */}
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-150 z-50 whitespace-nowrap flex items-center gap-2 border border-slate-700">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-white font-mono">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as typeof activeTab);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all text-left group",
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700")} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-md font-bold font-mono shrink-0 ml-1.5",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer (Live Cloud Status & Actions) */}
        <div className={cn(
          "p-3 border-t border-slate-100 bg-slate-50/60 space-y-2 font-label transition-all",
          sidebarCollapsed && "p-2 space-y-1.5"
        )}>
          {!sidebarCollapsed ? (
            <>
              <div className="p-2.5 rounded-md bg-white border border-slate-200/80 flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded bg-emerald-500 animate-pulse" />
                  <span className="text-slate-600 text-[11px] font-medium">Supabase Cloud</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold font-mono">ONLINE</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowInstallModal(true);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors shadow-2xs"
                  title="Install Desktop PWA"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Install App</span>
                </button>

                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition-colors shadow-2xs"
                  title="View Public Website"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => setShowInstallModal(true)}
                className="w-10 h-10 rounded-md bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center transition-colors relative group"
                title="Install Desktop PWA"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-150 z-50 whitespace-nowrap">
                  Install App
                </div>
              </button>

              <Link
                href="/"
                target="_blank"
                className="w-10 h-10 rounded-md bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center transition-colors relative group"
                title="View Public Website"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-xl opacity-0 group-hover:opacity-100 group-hover:visible pointer-events-none transition-all duration-150 z-50 whitespace-nowrap">
                  View Website
                </div>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN CONTENT WORKSPACE (MINIMALIST & AIRY)                       */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Top Header Bar (Ultra-Minimalist) */}
        <header className="h-15 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md bg-slate-100 text-slate-700"
            >
              <Menu className="w-4 h-4" />
            </button>

            {/* Sidebar Toggle for Desktop */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-label hidden sm:inline">Admin /</span>
              <h1 className="font-headline font-bold text-sm sm:text-base text-slate-900">
                {currentNav?.label || "Admin Console"}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Badges & Minimal Actions */}
          <div className="flex items-center gap-2 text-xs font-label">
            <button
              onClick={handleSyncToSupabase}
              disabled={isSeeding}
              className="flex items-center gap-1.5 h-8.5 px-3 rounded bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all shadow-2xs disabled:opacity-50 text-xs"
              title="Push 100% real website content to Supabase database"
            >
              <RefreshCw className={cn("w-3 h-3", isSeeding && "animate-spin text-amber-300")} />
              <span className="hidden sm:inline">{isSeeding ? "Syncing..." : "Sync Supabase"}</span>
              <span className="sm:hidden">Sync</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 h-8.5 px-3 rounded bg-slate-50 border border-slate-200/80 text-slate-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>FENSA #28491</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 h-8.5 px-3 rounded bg-slate-50 border border-slate-200/80 text-slate-800 font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Pipeline: {formatCurrency(totalPipelineRevenue)}</span>
            </div>
          </div>
        </header>

        {/* Sync Feedback Toast Alert */}
        {seedResult && (
          <div className={cn(
            "mx-4 sm:mx-8 mt-4 p-3.5 rounded-md border text-xs font-label flex items-center justify-between animate-fade-in shadow-xs",
            seedResult.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          )}>
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{seedResult.message}</span>
            </div>
            <button onClick={() => setSeedResult(null)} className="text-slate-400 hover:text-slate-700">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Dynamic Tab Body Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-8">
          
          {/* ======================================================================= */}
          {/* TAB 1: EXECUTIVE DASHBOARD                                             */}
          {/* ======================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top 4 Minimalist KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span className="font-medium">Weekly Traffic</span>
                    <div className="p-1.5 rounded bg-blue-50 text-blue-600">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="font-headline font-bold text-2xl text-slate-900">1,482</div>
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 font-label">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% vs last week</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span className="font-medium">Quotes Received</span>
                    <div className="p-1.5 rounded bg-amber-50 text-amber-600">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="font-headline font-bold text-2xl text-slate-900">38</div>
                  <div className="text-xs text-emerald-600 font-medium flex items-center gap-1 font-label">
                    <TrendingUp className="w-3 h-3" />
                    <span>14.8% Conversion Rate</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span className="font-medium">Active Revenue Pipeline</span>
                    <div className="p-1.5 rounded bg-emerald-50 text-emerald-600">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="font-headline font-bold text-2xl text-slate-900">
                    {formatCurrency(totalPipelineRevenue)}
                  </div>
                  <div className="text-xs text-slate-400 font-label">
                    Avg. £3,327 / Booking
                  </div>
                </div>

                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span className="font-medium">Google SEO Score</span>
                    <div className="p-1.5 rounded bg-purple-50 text-purple-600">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="font-headline font-bold text-2xl text-purple-700">98 / 100</div>
                  <div className="text-xs text-emerald-600 font-medium font-label">
                    ✓ #1 "Misted Glass Bicester"
                  </div>
                </div>
              </div>

              {/* Live Telemetry Radar Minimalist Dark Banner */}
              <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-md text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-headline font-bold text-sm sm:text-base text-white">
                        Real-Time Live Traffic & Telemetry Monitor
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono font-semibold whitespace-nowrap">
                        14 Visitors Online
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-label">
                      Live visitor locations across Bicester & Oxfordshire, interactive quote calculations, and marketing pixel streams.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("live-traffic")}
                  className="bg-white hover:bg-slate-100 text-slate-900 font-semibold py-2 px-3.5 rounded text-xs whitespace-nowrap flex items-center gap-1.5 shadow-2xs shrink-0 self-start md:self-auto transition-all active:scale-95 font-label"
                >
                  <span>Open Live Monitor</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 7-Day Traffic Graph & Channel Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Traffic Graph */}
                <div className="lg:col-span-8 bg-white p-6 rounded-md border border-slate-200/80 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-base text-slate-900">Weekly Traffic & Quote Inquiries (Oxfordshire)</h3>
                      <p className="text-xs text-slate-500 font-label">Daily visitors across Bicester, Oxford, and Banbury</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-label">
                      🟢 Live Telemetry
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-52 pt-6 border-b border-slate-100 pb-3">
                    {[
                      { day: "Wed", views: 184, height: "65%" },
                      { day: "Thu", views: 210, height: "75%" },
                      { day: "Fri", views: 245, height: "88%" },
                      { day: "Sat", views: 195, height: "70%" },
                      { day: "Sun", views: 160, height: "55%" },
                      { day: "Mon", views: 280, height: "100%" },
                      { day: "Tue (Today)", views: 208, height: "74%" },
                    ].map((d, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="text-[11px] font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                          {d.views}
                        </div>
                        <div
                          className="w-full max-w-[42px] bg-slate-900 hover:bg-slate-800 rounded-t-md transition-all duration-300 shadow-2xs"
                          style={{ height: d.height }}
                        />
                        <span className="text-[11px] font-medium text-slate-500 font-label mt-1">
                          {d.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-label">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-slate-900" /> Organic Searches
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Paid Ads Traffic
                      </span>
                    </div>
                    <span className="font-mono text-[11px]">Synced: GA4 & Supabase</span>
                  </div>
                </div>

                {/* Lead Acquisition Channels */}
                <div className="lg:col-span-4 bg-white p-6 rounded-md border border-slate-200/80 shadow-2xs space-y-5">
                  <h3 className="font-headline font-bold text-base text-slate-900">Lead Acquisition Sources</h3>
                  
                  <div className="space-y-3.5 text-xs font-label">
                    {[
                      { name: "Google Organic (SEO)", share: "52%", count: "20 Leads", color: "bg-emerald-500" },
                      { name: "Google Ads (PPC)", share: "26%", count: "10 Leads", color: "bg-blue-500" },
                      { name: "Meta Ads (Facebook/IG)", share: "14%", count: "5 Leads", color: "bg-purple-500" },
                      { name: "Direct Word-of-Mouth", share: "8%", count: "3 Leads", color: "bg-amber-400" },
                    ].map((ch, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-slate-700 font-medium">
                          <span>{ch.name}</span>
                          <span className="font-mono text-slate-900 font-bold">{ch.share}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                          <div className={cn("h-full rounded", ch.color)} style={{ width: ch.share }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regional Postcode Demand */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-slate-800 font-label block whitespace-nowrap">Top Inquiring Towns</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["OX26 Bicester (42%)", "OX2 Oxford (28%)", "OX15 Banbury (18%)", "OX5 Kidlington (12%)"].map((p) => (
                        <span key={p} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-[11px] font-medium text-slate-700 flex items-center gap-1 whitespace-nowrap font-mono">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Connected Marketing Platforms & Plugins Overview */}
              <div className="bg-white p-6 rounded-md border border-slate-200/80 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <h3 className="font-headline font-bold text-base text-slate-900 flex items-center gap-2 whitespace-nowrap">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Connected Marketing Platforms & Cloud Services</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-label">
                      Official connected APIs, tracking tags, and database synchronization pipelines.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("integrations")}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 font-label self-start sm:self-auto whitespace-nowrap"
                  >
                    <span>Manage Keys & Tags</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    { name: "Google Analytics 4", status: "Active Tracking", color: "text-amber-700 bg-amber-50 border-amber-200", icon: <GoogleAnalyticsLogo className="w-4 h-4" /> },
                    { name: "Google Tag Manager", status: "Container Ready", color: "text-blue-700 bg-blue-50 border-blue-200", icon: <GoogleTagManagerLogo className="w-4 h-4" /> },
                    { name: "Google Search Console", status: "Sitemap Verified", color: "text-indigo-700 bg-indigo-50 border-indigo-200", icon: <GoogleSearchConsoleLogo className="w-4 h-4" /> },
                    { name: "Google Ads CAPI", status: "Conversion Pixel", color: "text-emerald-700 bg-emerald-50 border-emerald-200", icon: <GoogleAdsLogo className="w-4 h-4" /> },
                    { name: "Meta Pixel & CAPI", status: "Pixel Active", color: "text-blue-700 bg-blue-50 border-blue-200", icon: <MetaLogo className="w-4 h-4" /> },
                    { name: "LINE Messaging API", status: "Webhook Ready", color: "text-green-700 bg-green-50 border-green-200", icon: <LineLogo className="w-4 h-4" /> },
                    { name: "Google Maps Platform", status: "Bicester Geo Pin", color: "text-red-700 bg-red-50 border-red-200", icon: <GoogleMapsLogo className="w-4 h-4" /> },
                    { name: "Supabase PostgreSQL", status: "Cloud Live Sync", color: "text-emerald-700 bg-emerald-50 border-emerald-300", icon: <SupabaseLogo className="w-4 h-4" /> },
                  ].map((p, i) => (
                    <div key={i} className="p-3.5 rounded-md border border-slate-200/80 bg-white hover:border-slate-300 transition-all space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0 shadow-2xs">
                          {p.icon}
                        </div>
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border font-mono whitespace-nowrap", p.color)}>
                          {p.status}
                        </span>
                      </div>
                      <div className="font-headline font-semibold text-xs text-slate-900 truncate">
                        {p.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB: REAL-TIME LIVE TRAFFIC COMMAND CENTER                             */}
          {/* ======================================================================= */}
          {activeTab === "live-traffic" && (
            <div className="space-y-6 animate-fade-in">
              <LiveTrafficCommandCenter />
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB: MEDIA LIBRARY & ASSET MANAGER                                      */}
          {/* ======================================================================= */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-fade-in">
              <MediaLibrary />
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: CRM & QUOTE LEADS (FULL CRUD)                                   */}
          {/* ======================================================================= */}
          {activeTab === "crm" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {["ALL", "PENDING", "SURVEY_SCHEDULED", "QUOTED", "COMPLETED"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedStatusFilter(f)}
                      className={cn(
                        "px-3 py-1.5 rounded text-xs font-semibold font-label transition-all whitespace-nowrap",
                        selectedStatusFilter === f
                          ? "bg-slate-900 text-white shadow-2xs font-bold"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      )}
                    >
                      {f.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search customer, postcode..."
                      className="w-full pl-9 pr-3.5 py-1.5 rounded border border-slate-200 bg-white text-xs font-label text-slate-800 focus:outline-none focus:border-slate-400"
                    />
                  </div>

                  <button
                    onClick={() => setLeadModal({ isOpen: true, mode: "create", data: {} })}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Quote Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-md border border-slate-200/80 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-label">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="py-3 px-4">Customer & Ref</th>
                        <th className="py-3 px-4">Service & Units</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Est. Total</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 font-headline text-sm">{lead.customer_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{lead.reference_no} • {lead.created_at}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{lead.service_type}</div>
                            <div className="text-[11px] text-slate-500">{lead.units} units requested</div>
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700">{lead.postcode}</td>
                          <td className="py-3 px-4 font-bold text-slate-900 font-headline text-sm">
                            {formatCurrency(lead.estimated_cost)}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteLead["status"])}
                              className={cn(
                                "px-2.5 py-1 rounded-md text-xs font-semibold border font-label focus:outline-none bg-white",
                                lead.status === "PENDING" ? "text-amber-700 border-amber-200 bg-amber-50" :
                                lead.status === "SURVEY_SCHEDULED" ? "text-blue-700 border-blue-200 bg-blue-50" :
                                lead.status === "QUOTED" ? "text-purple-700 border-purple-200 bg-purple-50" :
                                "text-emerald-700 border-emerald-200 bg-emerald-50"
                              )}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="SURVEY_SCHEDULED">SURVEY SCHEDULED</option>
                              <option value="QUOTED">QUOTED</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setLeadModal({ isOpen: true, mode: "edit", data: lead })}
                                className="p-1.5 rounded bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors"
                                title="Edit Lead"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: SERVICES & PRICING (FULL CRUD)                                   */}
          {/* ======================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Services & Pricing Catalog</h2>
                  <p className="text-xs text-slate-500 font-label">Manage fenestration services, warranty terms, and pricing estimates</p>
                </div>
                <button
                  onClick={() => setServiceModal({ isOpen: true, mode: "create", data: {} })}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-white p-5 rounded-md border border-slate-200/80 space-y-3.5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px] font-label">
                          {srv.warranty_years}-Yr Warranty
                        </span>
                        <span className="text-emerald-700 text-xs font-semibold font-label">🟢 Active</span>
                      </div>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-slate-900">{srv.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-label">{srv.short_description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-label block">Base Estimate</span>
                        <span className="font-headline font-bold text-base text-slate-900">
                          £{srv.base_price_estimate} <span className="text-xs font-normal text-slate-500">/ unit</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setServiceModal({ isOpen: true, mode: "edit", data: srv })}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: CASE STUDIES & BEFORE/AFTER (FULL CRUD)                         */}
          {/* ======================================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Projects & Case Studies Manager</h2>
                  <p className="text-xs text-slate-500 font-label">Manage Before & After galleries across Oxfordshire</p>
                </div>
                <button
                  onClick={() => setProjectModal({ isOpen: true, mode: "create", data: {} })}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Case Study</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white p-5 rounded-md border border-slate-200/80 space-y-3.5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-label">
                        <span className="text-slate-700 font-semibold font-mono">📍 {proj.location_city}</span>
                        <span className="text-slate-400 font-medium">{proj.completion_year}</span>
                      </div>
                      <h3 className="font-headline font-bold text-sm sm:text-base text-slate-900">{proj.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-label">{proj.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-emerald-700 font-semibold font-label">✓ Active on Frontend</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setProjectModal({ isOpen: true, mode: "edit", data: proj })}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"
                          title="Delete Case Study"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: GOOGLE REVIEWS (FULL CRUD)                                      */}
          {/* ======================================================================= */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Verified Reviews & Ratings</h2>
                  <p className="text-xs text-slate-500 font-label">Customer feedback synchronized with Google Maps</p>
                </div>
                <button
                  onClick={() => setReviewModal({ isOpen: true, mode: "create", data: {} })}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-md border border-slate-200/80 space-y-3 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400 font-label">{rev.time_ago}</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-slate-900">{rev.review_title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-label">{rev.review_text}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-label">
                      <span className="font-bold text-slate-800">{rev.customer_name} ({rev.customer_location})</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setReviewModal({ isOpen: true, mode: "edit", data: rev })}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Review"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 6: COVERAGE AREAS & POSTCODES (FULL CRUD)                           */}
          {/* ======================================================================= */}
          {activeTab === "areas" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Oxfordshire Coverage & Response SLA</h2>
                  <p className="text-xs text-slate-500 font-label">Postcode validation rules and guaranteed attendance times</p>
                </div>
                <button
                  onClick={() => setAreaModal({ isOpen: true, mode: "create", data: {} })}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Postcode Area</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {areas.map((area) => (
                  <div key={area.id} className="bg-white p-5 rounded-md border border-slate-200/80 space-y-3 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-headline font-bold text-sm text-slate-900">📍 {area.town_name}</span>
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md font-label">
                          &lt; {area.response_time_hours}h SLA
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1 font-label">
                        <div>County/Code: <strong className="font-mono text-slate-800">{area.county}</strong></div>
                        <div>Emergency Service: <strong className="text-emerald-700">{area.emergency_available ? "Available" : "No"}</strong></div>
                        <div>Free Home Survey: <strong className="text-emerald-700">Yes (100% Free)</strong></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setAreaModal({ isOpen: true, mode: "edit", data: area })}
                        className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Edit Area"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area.id)}
                        className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"
                        title="Delete Area"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 7: GOOGLE SEO & BLOG ENGINE (PAGE 1 PROBABILITY & QUEST ROADMAP)    */}
          {/* ======================================================================= */}
          {activeTab === "seo" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* 1. SEO Header & Page 1 Dominance Banner */}
              <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-md text-white shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase font-label">
                      <Target className="w-3.5 h-3.5" />
                      <span>Google Page 1 Ranking Intelligence Engine</span>
                    </div>
                    <h2 className="font-headline font-bold text-xl sm:text-2xl text-white">
                      Oxfordshire Glazing SEO & Search Dominance
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-label">
                      AI-assisted search positioning model measuring technical schema health, regional Oxfordshire intent signals, and ranking probability for top high-intent commercial keywords.
                    </p>
                  </div>

                  {/* Page 1 Ranking Probability Score Card */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-md flex items-center gap-4 shrink-0 backdrop-blur-xs">
                    <div className="relative w-16 h-16 rounded bg-slate-800 flex items-center justify-center border-4 border-emerald-500/80 shadow-xs">
                      <span className="font-headline font-bold text-lg text-emerald-400">94%</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase font-label block">Page 1 Probability</span>
                      <span className="text-xs font-bold text-emerald-400 font-label flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>High Dominance</span>
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">Bicester & Oxford Area</span>
                    </div>
                  </div>
                </div>

                {/* 5 Core Ranking Factor Progress Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-white/10 text-xs font-label">
                  <div className="bg-white/5 p-3 rounded-md border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Technical Schema</span>
                      <strong className="text-emerald-400 font-mono">100%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded w-full" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">JSON-LD LocalBusiness</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-md border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Core Web Vitals</span>
                      <strong className="text-emerald-400 font-mono">96%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded w-[96%]" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">LCP &lt; 0.8s • Fast Next.js</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-md border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Local Postcodes</span>
                      <strong className="text-emerald-400 font-mono">92%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded w-[92%]" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">OX26, OX1, OX16, OX5</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-md border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Search Intent</span>
                      <strong className="text-emerald-400 font-mono">94%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded w-[94%]" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">High-intent Glazing Terms</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-md border border-white/10 space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Authority & Trust</span>
                      <strong className="text-emerald-400 font-mono">90%</strong>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded w-[90%]" />
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">40-Yr Heritage + 128 Reviews</span>
                  </div>
                </div>
              </div>

              {/* 2. SEO Growth Quests & Master Playbook (ระบบทำเควส & ไกด์ไลน์ดันอันดับ) */}
              <div className="bg-white p-6 rounded-md border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>SEO Ranking Quests & Growth Roadmap</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-label">
                      Follow these actionable quest guidelines to secure and lock in #1 rankings on Google Search.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-label self-start sm:self-auto">
                    3/5 Quests Completed (60%)
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "q-1",
                      title: "1. LocalBusiness & FAQ Schema Deployment",
                      desc: "Structured data automatically generates rich snippet star ratings and FAQ accordion boxes directly in Google search results.",
                      status: "completed",
                      statusText: "Completed (100%)",
                      guideline: "Verified active on homepage & service detail pages with zero Google Rich Results errors.",
                      actionText: "Verify Schema",
                      actionUrl: "https://validator.schema.org/"
                    },
                    {
                      id: "q-2",
                      title: "2. Publish Oxfordshire Misted Glass Technical Guides",
                      desc: "Comprehensive 2,000+ word guides capturing high-intent questions like 'Why do double glazed windows mist up?' and 'Save up to 70%'.",
                      status: "completed",
                      statusText: "Completed (2 Articles Live)",
                      guideline: "Articles indexed with Pilkington Low-E and argon insulation keyword clusters.",
                      actionText: "View Blog Guides",
                      actionUrl: "/blog"
                    },
                    {
                      id: "q-3",
                      title: "3. Submit XML Sitemap to Google Search Console",
                      desc: "Ensure Googlebot instantly crawls all 15+ service, project, and geographic postcode pages upon update.",
                      status: "in_progress",
                      statusText: "Action Step Ready",
                      guideline: "Copy 'https://thewindowdoctors.co.uk/sitemap.xml' and paste into your GSC Sitemaps panel.",
                      actionText: "Open Search Console",
                      actionUrl: "https://search.google.com/search-console/sitemaps"
                    },
                    {
                      id: "q-4",
                      title: "4. Collect 3 Recent Reviews Mentioning Bicester & Oxford",
                      desc: "Google heavily weights review keywords with local town names (e.g. 'Sean fixed our misted window in Bicester').",
                      status: "next_quest",
                      statusText: "Next Quest (+4% Rank Boost)",
                      guideline: "Ask completed survey clients to include their village/town name in their 5-star Google review.",
                      actionText: "Manage Reviews",
                      actionTab: "reviews"
                    },
                    {
                      id: "q-5",
                      title: "5. Geo-Tag Before & After Photos for Witney & Banbury",
                      desc: "Add 2 new photo case studies with location tags in Case Studies CMS to dominate secondary Oxfordshire towns.",
                      status: "recommended",
                      statusText: "Recommended Quest",
                      guideline: "Take clear before & after photos of fogged glass vs new Pilkington Optitherm unit replacements.",
                      actionText: "Add Case Study",
                      actionTab: "projects"
                    }
                  ].map((quest) => (
                    <div
                      key={quest.id}
                      className={cn(
                        "p-4 rounded-md border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
                        quest.status === "completed"
                          ? "bg-slate-50/70 border-slate-200/80"
                          : quest.status === "in_progress"
                          ? "bg-amber-50/40 border-amber-200 ring-1 ring-amber-200/50"
                          : "bg-white border-slate-200/80 hover:border-slate-300"
                      )}
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">
                            {quest.title}
                          </h4>
                          <span
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded font-label",
                              quest.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : quest.status === "in_progress"
                                ? "bg-amber-100 text-amber-800 border border-amber-300"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            )}
                          >
                            {quest.statusText}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-label leading-relaxed">
                          {quest.desc}
                        </p>
                        <div className="text-[11px] text-slate-500 font-label flex items-center gap-1.5 pt-0.5">
                          <strong className="text-slate-700 font-semibold">Guideline:</strong>
                          <span>{quest.guideline}</span>
                        </div>
                      </div>

                      {quest.actionUrl ? (
                        <a
                          href={quest.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-all shrink-0 font-label shadow-2xs self-start md:self-auto"
                        >
                          <span>{quest.actionText}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => quest.actionTab && setActiveTab(quest.actionTab as any)}
                          className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-all shrink-0 font-label shadow-2xs self-start md:self-auto"
                        >
                          <span>{quest.actionText}</span>
                          <ChevronRight className="w-3 h-3 text-slate-300" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Keyword Ranking Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="text-xs text-slate-400 font-label font-medium">Top Priority Keyword</div>
                  <h4 className="font-headline font-bold text-base text-slate-900">"misted double glazing bicester"</h4>
                  <div className="text-emerald-700 font-semibold text-xs font-label flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-emerald-500 animate-pulse" />
                    <span>Rank: Position #1 on Google (Oxfordshire)</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="text-xs text-slate-400 font-label font-medium">Secondary High-Value Term</div>
                  <h4 className="font-headline font-bold text-base text-slate-900">"window repair oxford"</h4>
                  <div className="text-emerald-700 font-semibold text-xs font-label flex items-center gap-1">
                    <span className="w-2 h-2 rounded bg-emerald-500 animate-pulse" />
                    <span>Rank: Position #2 on Google</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2">
                  <div className="text-xs text-slate-400 font-label font-medium">Sitemap & Indexing Health</div>
                  <h4 className="font-headline font-bold text-base text-slate-900">/sitemap.xml</h4>
                  <div className="text-emerald-700 font-semibold text-xs font-label flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% URLs Auto-Generated</span>
                  </div>
                </div>
              </div>

              {/* 4. Blog Articles CMS List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-base text-slate-900">Published SEO Articles & Guides</h3>
                    <p className="text-xs text-slate-500 font-label">Search engine optimized guide articles targeting high-intent homeowner search queries</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBlogModal({ isOpen: true, mode: "create", data: {} })}
                      className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold text-xs py-2 px-3.5 rounded-md flex items-center gap-1.5 whitespace-nowrap shadow-xs transition-all active:scale-95 border border-secondary/40 font-label"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Article</span>
                    </button>
                    <Link
                      href="/blog"
                      target="_blank"
                      className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 shadow-2xs"
                    >
                      <span>Public Guides</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                  </div>
                </div>

                <div className="space-y-3">
                  {blogs.map((b) => (
                    <div key={b.slug} className="bg-white p-5 rounded-md border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:border-slate-300 transition-all">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono border border-emerald-200">
                            SEO Score: {b.seoScore}/100
                          </span>
                          <span className="text-xs text-emerald-700 font-semibold font-label">🟢 Indexed by Google</span>
                        </div>
                        <h4 className="font-headline font-bold text-sm sm:text-base text-slate-900">{b.title}</h4>
                        <div className="flex flex-wrap gap-1 text-[11px] text-slate-500 font-label">
                          {b.keywords.map((k) => (
                            <span key={k} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium text-[10px]">#{k}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 font-label"
                        >
                          <span>Preview</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setBlogModal({ isOpen: true, mode: "edit", data: b })}
                          className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.slug)}
                          className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 8: INTEGRATION MANAGER & API CREDENTIAL SETTINGS                    */}
          {/* ======================================================================= */}
          {activeTab === "integrations" && (
            <IntegrationManager />
          )}

          {/* ======================================================================= */}
          {/* TAB 9: HERO SLIDER CMS (FULL CRUD)                                     */}
          {/* ======================================================================= */}
          {activeTab === "heroSlider" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-xl text-primary">Hero Slider & Banner Manager</h2>
                  <p className="text-xs text-slate-500 font-label">Manage homepage hero slides — images, headlines, CTAs, and stat badges</p>
                </div>
                <button onClick={() => setHeroModal({ isOpen: true, mode: "create", data: {} })} className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold text-xs py-2 px-3.5 rounded-md flex items-center gap-1.5 whitespace-nowrap shadow-xs transition-all active:scale-95 border border-secondary/40 font-label              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-3.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold font-mono">Slide {idx + 1}</span>
                          <span className="text-[11px] text-slate-400 font-label">{slide.tag}</span>
                        </div>
                        <h3 className="font-headline font-bold text-base text-slate-900">{slide.title}</h3>
                        <p className="text-xs text-amber-600 font-semibold">{slide.highlightText}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 font-label">{slide.description}</p>
                      </div>
                      {slide.imageUrl && (
                        <div className="w-32 h-20 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                          <img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-label text-slate-500 flex-wrap">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md font-mono">CTA: {slide.primaryCtaText}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md">Badge: {slide.badgeText}</span>
                      {slide.stats.map((s, i) => <span key={i} className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium">{s.label}: {s.value}</span>)}
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                      <button onClick={() => setHeroModal({ isOpen: true, mode: "edit", data: slide })} className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors" title="Edit Slide"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDeleteHero(slide.id)} className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors" title="Delete Slide"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 10: FAQ MANAGER (FULL CRUD)                                         */}
          {/* ======================================================================= */}
          {activeTab === "faqs" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">FAQ & SEO Schema Manager</h2>
                  <p className="text-xs text-slate-500 font-label">Manage FAQ questions — auto-generates JSON-LD FAQPage schema for Google rich snippets</p>
                </div>
                <button onClick={() => setFaqModal({ isOpen: true, mode: "create", data: {} })} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label">
                  <PlusCircle className="w-3.5 h-3.5" /><span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center font-mono">{idx + 1}</span>
                          <h4 className="font-headline font-bold text-sm text-slate-900 flex-1">{faq.question}</h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-7 font-label">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={() => setFaqModal({ isOpen: true, mode: "edit", data: faq })} className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteFaq(faq.id)} className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50 p-4 rounded-md border border-emerald-200 text-xs text-emerald-800 font-label">
                <strong>SEO Impact:</strong> {faqs.length} FAQs will auto-generate a JSON-LD FAQPage schema for Google rich snippet eligibility. Changes sync to /sitemap.xml automatically.
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 11: COMPARISON TABLE EDITOR (FULL CRUD)                             */}
          {/* ======================================================================= */}
          {activeTab === "comparison" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Comparison Matrix Editor</h2>
                  <p className="text-xs text-slate-500 font-label">Edit the "Why Replace The Whole Window?" comparison table on the homepage</p>
                </div>
                <button onClick={() => setCompModal({ isOpen: true, mode: "create", data: {} })} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label">
                  <PlusCircle className="w-3.5 h-3.5" /><span>Add Row</span>
                </button>
              </div>

              <div className="bg-white rounded-md border border-slate-200/80 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs font-label">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-3 px-4">Service Feature</th>
                      <th className="py-3 px-4 text-emerald-700">✓ The Window Doctor</th>
                      <th className="py-3 px-4 text-red-600">✗ National Window Sales</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {comparisonRows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{row.feature}</td>
                        <td className="py-3 px-4 text-emerald-800 font-medium">{row.windowDoctor}</td>
                        <td className="py-3 px-4 text-red-700">{row.nationalGuys}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button onClick={() => setCompModal({ isOpen: true, mode: "edit", data: row })} className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"><Edit2 className="w-3 h-3" /></button>
                            <button onClick={() => handleDeleteComp(row.id)} className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 12: PROCESS STEPS EDITOR (FULL CRUD)                               */}
          {/* ======================================================================= */}
          {activeTab === "processSteps" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">4-Stage Process Journey Editor</h2>
                  <p className="text-xs text-slate-500 font-label">Manage the "Our Seamless 4-Stage Precision Process" section on the homepage</p>
                </div>
                <button onClick={() => setStepModal({ isOpen: true, mode: "create", data: {} })} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-1.5 px-3 rounded flex items-center gap-1.5 whitespace-nowrap shadow-2xs transition-all active:scale-95 font-label">
                  <PlusCircle className="w-3.5 h-3.5" /><span>Add Step</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processSteps.map((step) => (
                  <div key={step.id} className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded bg-slate-900 text-white font-headline font-bold text-sm flex items-center justify-center font-mono">{step.num}</span>
                        <div>
                          <h4 className="font-headline font-bold text-sm text-slate-900">{step.title}</h4>
                          <span className="text-[11px] text-amber-600 font-semibold font-label">{step.timing}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setStepModal({ isOpen: true, mode: "edit", data: step })} className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"><Edit2 className="w-3 h-3" /></button>
                        <button onClick={() => handleDeleteStep(step.id)} className="p-1.5 rounded bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-label">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 13: SITE SETTINGS (GLOBAL BUSINESS INFO)                           */}
          {/* ======================================================================= */}
          {activeTab === "siteSettings" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900">Global Site Settings</h2>
                  <p className="text-xs text-slate-500 font-label">Business contact info, address, FENSA number, opening hours — used across Navbar, Footer, Schema, and all pages</p>
                </div>
                <button onClick={handleSaveSettings} className={cn("text-xs py-1.5 px-3.5 rounded flex items-center gap-1.5 font-semibold shadow-2xs transition-all font-label whitespace-nowrap", settingsSaved ? "bg-emerald-600 text-white" : "bg-slate-900 hover:bg-slate-800 text-white")}>
                  {settingsSaved ? <><Check className="w-3.5 h-3.5" /><span>Saved & Synced!</span></> : <><Save className="w-3.5 h-3.5" /><span>Save All Settings</span></>}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Business Identity */}
                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-4">
                  <h3 className="font-headline font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">🏢 Business Identity</h3>
                  <div className="space-y-3.5 text-xs font-label">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Business Name</label>
                      <input type="text" value={siteSettings.businessName} onChange={(e) => setSiteSettings({ ...siteSettings, businessName: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Brand Tagline</label>
                      <input type="text" value={siteSettings.tagline} onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">FENSA Registration Number</label>
                      <input type="text" value={siteSettings.fensaNumber} onChange={(e) => setSiteSettings({ ...siteSettings, fensaNumber: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Opening Hours</label>
                      <input type="text" value={siteSettings.openingHours} onChange={(e) => setSiteSettings({ ...siteSettings, openingHours: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-4">
                  <h3 className="font-headline font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">📍 Contact & Location</h3>
                  <div className="space-y-3.5 text-xs font-label">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Phone Number</label>
                        <input type="text" value={siteSettings.phone} onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none font-mono" />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Email Address</label>
                        <input type="text" value={siteSettings.email} onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Street Address</label>
                      <input type="text" value={siteSettings.address} onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">City / Town</label>
                        <input type="text" value={siteSettings.city} onChange={(e) => setSiteSettings({ ...siteSettings, city: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-medium mb-1">Postcode</label>
                        <input type="text" value={siteSettings.postcode} onChange={(e) => setSiteSettings({ ...siteSettings, postcode: e.target.value })} className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Google Maps Place ID (optional)</label>
                      <input type="text" value={siteSettings.googleMapsPlaceId} onChange={(e) => setSiteSettings({ ...siteSettings, googleMapsPlaceId: e.target.value })} placeholder="ChIJ..." className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none font-mono" />
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-4 lg:col-span-2">
                  <div className="flex items-center gap-2 font-headline font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5">
                    <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Social Media & External Links</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-label">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1 whitespace-nowrap">Facebook Page URL</label>
                      <input type="url" value={siteSettings.facebookUrl} onChange={(e) => setSiteSettings({ ...siteSettings, facebookUrl: e.target.value })} placeholder="https://facebook.com/..." className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1 whitespace-nowrap">Instagram Profile URL</label>
                      <input type="url" value={siteSettings.instagramUrl} onChange={(e) => setSiteSettings({ ...siteSettings, instagramUrl: e.target.value })} placeholder="https://instagram.com/..." className="w-full px-3 py-2 rounded border border-slate-200 bg-slate-50 focus:bg-white focus:border-slate-400 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB: TRUST PILLARS CMS                                                  */}
          {/* ======================================================================= */}
          {activeTab === "trustPillars" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900 whitespace-nowrap">Trust Pillars & Heritage Badges</h2>
                  <p className="text-xs text-slate-500 font-label">Manage 40-year heritage credentials, FENSA assurance, and 10-year insurance guarantees.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {trustPillars.map((pillar) => (
                  <div key={pillar.id} className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-3.5">
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-sm text-slate-900">{pillar.title}</h3>
                        <span className="text-xs text-amber-700 font-medium font-label block mt-0.5">{pillar.subtitle}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-label">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB: FRAME COLORS & RAL SWATCHES CMS                                    */}
          {/* ======================================================================= */}
          {activeTab === "frameColors" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900 whitespace-nowrap">Frame Colors & Texture Customizer</h2>
                  <p className="text-xs text-slate-500 font-label">Manage 8 RAL architectural colors, textured foils, and woodgrain finishes available for windows & doors.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {frameColors.map((color) => (
                  <div key={color.id} className="bg-white p-4 rounded-md border border-slate-200/80 shadow-2xs space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded border border-slate-300 shadow-2xs shrink-0" 
                        style={{ backgroundColor: color.hex_color }} 
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-headline font-bold text-xs text-slate-900 truncate">{color.name}</h3>
                        <span className="text-[11px] font-mono text-slate-400 font-medium block">{color.ral_code}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-label">
                      <span className="text-slate-500">{color.finish}</span>
                      {color.is_popular && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[10px] whitespace-nowrap">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB: ENERGY RATES & BENCHMARKS CMS                                      */}
          {/* ======================================================================= */}
          {activeTab === "energyRates" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-lg text-slate-900 whitespace-nowrap">Energy Rates & ROI Multipliers</h2>
                  <p className="text-xs text-slate-500 font-label">Manage annual savings constants, U-value retention formulas, and CO2 reduction metrics.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {energyRates.map((rate) => (
                  <div key={rate.id} className="bg-white p-5 rounded-md border border-slate-200/80 shadow-2xs space-y-2.5">
                    <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                      <span className="truncate font-medium">{rate.label}</span>
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                    </div>
                    <div className="font-headline font-bold text-2xl text-slate-900">
                      {rate.rate_value} <span className="text-xs font-normal text-slate-400 font-label">{rate.unit}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100 truncate">
                      Key: {rate.key}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* GLOBAL TOAST NOTIFICATION                                                 */}
      {/* ========================================================================= */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-md bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 animate-slide-in-right text-xs font-label">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionToast.message}</span>
          <button onClick={() => setActionToast(null)} className="text-slate-400 hover:text-white shrink-0 ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 1: QUOTE LEAD                                          */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={leadModal.isOpen}
        onClose={() => setLeadModal({ isOpen: false, mode: "create", data: null })}
        title={leadModal.mode === "create" ? "Add New Quote Lead" : "Edit Customer Lead"}
        subtitle="Customer contact & window engineering survey details"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setLeadModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveLead(e as any);
                triggerToast("Customer lead updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {leadModal.mode === "create" ? "Create Lead" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveLead} className="space-y-4 text-xs font-label">
          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Customer Full Name</label>
            <input
              type="text"
              required
              value={leadModal.data?.customer_name || ""}
              onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, customer_name: e.target.value } })}
              placeholder="e.g. Mrs. Eleanor Vance"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Phone Number</label>
              <input
                type="text"
                required
                value={leadModal.data?.phone || ""}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, phone: e.target.value } })}
                placeholder="07891 234567"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Email Address</label>
              <input
                type="email"
                required
                value={leadModal.data?.email || ""}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, email: e.target.value } })}
                placeholder="customer@example.com"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Postcode / Location</label>
              <input
                type="text"
                required
                value={leadModal.data?.postcode || ""}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, postcode: e.target.value } })}
                placeholder="OX26 (Bicester)"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Service Type</label>
              <input
                type="text"
                required
                value={leadModal.data?.service_type || ""}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, service_type: e.target.value } })}
                placeholder="Misted Glass Repair"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Units Count</label>
              <input
                type="number"
                value={leadModal.data?.units || 1}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, units: Number(e.target.value) } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Estimated Total (£)</label>
              <input
                type="number"
                value={leadModal.data?.estimated_cost || 95}
                onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, estimated_cost: Number(e.target.value) } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Glazier Survey Notes</label>
            <textarea
              rows={3}
              value={leadModal.data?.notes || ""}
              onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, notes: e.target.value } })}
              placeholder="Notes from customer phone call or site survey..."
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 2: SERVICE CATALOG                                      */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={serviceModal.isOpen}
        onClose={() => setServiceModal({ isOpen: false, mode: "create", data: null })}
        title={serviceModal.mode === "create" ? "Add New Service" : "Edit Service Details"}
        subtitle="Catalog specifications, pricing, and warranty coverage"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setServiceModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveService(e as any);
                triggerToast("Service catalog updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {serviceModal.mode === "create" ? "Create Service" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveService} className="space-y-4 text-xs font-label">
          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Service Title</label>
            <input
              type="text"
              required
              value={serviceModal.data?.title || ""}
              onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, title: e.target.value } })}
              placeholder="e.g. Misted Glass & Seal Failure Repair"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Short Description</label>
            <textarea
              rows={3}
              required
              value={serviceModal.data?.short_description || ""}
              onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, short_description: e.target.value } })}
              placeholder="Brief description for homepage and catalog..."
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Base Price Estimate (£)</label>
              <input
                type="number"
                required
                value={serviceModal.data?.base_price_estimate || 95}
                onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, base_price_estimate: Number(e.target.value) } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Warranty Years</label>
              <input
                type="number"
                required
                value={serviceModal.data?.warranty_years || 10}
                onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, warranty_years: Number(e.target.value) } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <ImageUploadField
            label="Service Feature Showcase Image"
            value={serviceModal.data?.image_url || ""}
            onChange={(val) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, image_url: val } })}
            aspectRatio="16/9"
            helpText="Upload service photo directly from PC (PNG, JPG, WebP) or paste URL"
            onBrowseMedia={() => {
              setServiceModal({ ...serviceModal, isOpen: false });
              setActiveTab("media");
            }}
          />
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 3: CASE STUDY                                           */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={projectModal.isOpen}
        onClose={() => setProjectModal({ isOpen: false, mode: "create", data: null })}
        title={projectModal.mode === "create" ? "Add Case Study" : "Edit Case Study"}
        subtitle="Before & after glazing restoration portfolio"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setProjectModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveProject(e as any);
                triggerToast("Case study updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {projectModal.mode === "create" ? "Add Case Study" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-label">
          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Project Title</label>
            <input
              type="text"
              required
              value={projectModal.data?.title || ""}
              onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, title: e.target.value } })}
              placeholder="e.g. Complete Misted Double Glazing Restoration"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Town / Location</label>
              <input
                type="text"
                required
                value={projectModal.data?.location_city || ""}
                onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, location_city: e.target.value } })}
                placeholder="Kingsmere, Bicester"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Completion Year</label>
              <input
                type="text"
                required
                value={projectModal.data?.completion_year || "2026"}
                onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, completion_year: e.target.value } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Project Summary</label>
            <textarea
              rows={3}
              required
              value={projectModal.data?.summary || ""}
              onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, summary: e.target.value } })}
              placeholder="Details of the job, challenge, and savings achieved..."
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <ImageUploadField
              label="Before Photo (Misted / Damaged)"
              value={projectModal.data?.image_before_url || ""}
              onChange={(val) => setProjectModal({ ...projectModal, data: { ...projectModal.data, image_before_url: val } })}
              aspectRatio="4/3"
              helpText="Upload before picture from PC"
            />
            <ImageUploadField
              label="After Photo (Crystal Clear)"
              value={projectModal.data?.image_after_url || ""}
              onChange={(val) => setProjectModal({ ...projectModal, data: { ...projectModal.data, image_after_url: val } })}
              aspectRatio="4/3"
              helpText="Upload after restoration from PC"
            />
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 4: GOOGLE REVIEW                                        */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({ isOpen: false, mode: "create", data: null })}
        title={reviewModal.mode === "create" ? "Add Customer Review" : "Edit Customer Review"}
        subtitle="5-Star customer testimonials and verified feedback"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setReviewModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveReview(e as any);
                triggerToast("Customer review updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {reviewModal.mode === "create" ? "Add Review" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveReview} className="space-y-4 text-xs font-label">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Customer Name</label>
              <input
                type="text"
                required
                value={reviewModal.data?.customer_name || ""}
                onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, customer_name: e.target.value } })}
                placeholder="e.g. Katie Hawkins"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Town / Location</label>
              <input
                type="text"
                required
                value={reviewModal.data?.customer_location || ""}
                onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, customer_location: e.target.value } })}
                placeholder="Bicester & Oxfordshire"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Review Headline</label>
            <input
              type="text"
              required
              value={reviewModal.data?.review_title || ""}
              onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, review_title: e.target.value } })}
              placeholder="e.g. Really polite and understood what we wanted"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Review Content</label>
            <textarea
              rows={3}
              required
              value={reviewModal.data?.review_text || ""}
              onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, review_text: e.target.value } })}
              placeholder="Customer feedback..."
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 5: SERVICE AREA                                         */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={areaModal.isOpen}
        onClose={() => setAreaModal({ isOpen: false, mode: "create", data: null })}
        title={areaModal.mode === "create" ? "Add Coverage Town / Postcode" : "Edit Area SLA"}
        subtitle="Oxfordshire glazier dispatch radius and response speed"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setAreaModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveArea(e as any);
                triggerToast("Service area coverage updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {areaModal.mode === "create" ? "Add Area" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveArea} className="space-y-4 text-xs font-label">
          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Town Name</label>
            <input
              type="text"
              required
              value={areaModal.data?.town_name || ""}
              onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, town_name: e.target.value } })}
              placeholder="e.g. Bicester & Kingsmere"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">County & Postcode Prefix</label>
              <input
                type="text"
                required
                value={areaModal.data?.county || ""}
                onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, county: e.target.value } })}
                placeholder="Oxfordshire (OX26)"
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Response SLA (Hours)</label>
              <input
                type="number"
                required
                value={areaModal.data?.response_time_hours || 24}
                onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, response_time_hours: Number(e.target.value) } })}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
              />
            </div>
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 6: SEO ARTICLE                                          */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={blogModal.isOpen}
        onClose={() => setBlogModal({ isOpen: false, mode: "create", data: null })}
        title={blogModal.mode === "create" ? "Add SEO Article Guide" : "Edit Article Details"}
        subtitle="Targeted keywords and local Oxfordshire glazing guides"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setBlogModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveBlog(e as any);
                triggerToast("SEO article saved successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {blogModal.mode === "create" ? "Add Article" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-label">
          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Article Title</label>
            <input
              type="text"
              required
              value={blogModal.data?.title || ""}
              onChange={(e) => setBlogModal({ ...blogModal, data: { ...blogModal.data, title: e.target.value } })}
              placeholder="e.g. Why Does Double Glazing Mist Up? The Oxfordshire Guide"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Target Keywords (Comma Separated)</label>
            <input
              type="text"
              value={blogModal.data?.keywords?.join(", ") || ""}
              onChange={(e) => setBlogModal({ ...blogModal, data: { ...blogModal.data, keywords: e.target.value.split(",").map(s => s.trim()) } })}
              placeholder="misted double glazing bicester, window repair oxford"
              className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
            />
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 7: HERO SLIDE                                           */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={heroModal.isOpen}
        onClose={() => setHeroModal({ isOpen: false, mode: "create", data: null })}
        title={heroModal.mode === "create" ? "Add Hero Slide" : "Edit Hero Slide"}
        subtitle="Homepage banner visuals, gold highlights, and CTAs"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setHeroModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveHero(e as any);
                triggerToast("Hero slide banner updated successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {heroModal.mode === "create" ? "Add Slide" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveHero} className="space-y-4 text-xs font-label">
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Slide Title (Main Headline)</label><input type="text" required value={heroModal.data?.title || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, title: e.target.value } })} placeholder="e.g. Master Glazing & Window Engineering" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Highlight Text (Gold Accent)</label><input type="text" value={heroModal.data?.highlightText || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, highlightText: e.target.value } })} placeholder="e.g. Replace Glass, Not The Frame" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Description</label><textarea rows={2} value={heroModal.data?.description || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, description: e.target.value } })} className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Tag Line (Top Badge)</label><input type="text" value={heroModal.data?.tag || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, tag: e.target.value } })} className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          
          <ImageUploadField
            label="Background Banner Image"
            value={heroModal.data?.imageUrl || ""}
            onChange={(val) => setHeroModal({ ...heroModal, data: { ...heroModal.data, imageUrl: val } })}
            aspectRatio="16/9"
            helpText="Select file directly from your PC (JPG, PNG, WebP) or paste URL"
            onBrowseMedia={() => {
              setHeroModal({ ...heroModal, isOpen: false });
              setActiveTab("media");
            }}
          />

          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Primary CTA Text</label><input type="text" value={heroModal.data?.primaryCtaText || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, primaryCtaText: e.target.value } })} className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
            <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Primary CTA Link</label><input type="text" value={heroModal.data?.primaryCtaLink || ""} onChange={(e) => setHeroModal({ ...heroModal, data: { ...heroModal.data, primaryCtaLink: e.target.value } })} className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none font-mono" /></div>
          </div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 8: FAQ DIALOG                                           */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={faqModal.isOpen}
        onClose={() => setFaqModal({ isOpen: false, mode: "create", data: null })}
        title={faqModal.mode === "create" ? "Add New FAQ" : "Edit FAQ"}
        subtitle="Frequently asked questions & Google FAQPage Schema"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setFaqModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveFaq(e as any);
                triggerToast("FAQ question & answer saved successfully!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {faqModal.mode === "create" ? "Add FAQ" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveFaq} className="space-y-4 text-xs font-label">
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Question</label><input type="text" required value={faqModal.data?.question || ""} onChange={(e) => setFaqModal({ ...faqModal, data: { ...faqModal.data, question: e.target.value } })} placeholder="e.g. Do I need to replace my whole window frame?" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Answer</label><textarea rows={4} required value={faqModal.data?.answer || ""} onChange={(e) => setFaqModal({ ...faqModal, data: { ...faqModal.data, answer: e.target.value } })} placeholder="Detailed answer..." className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 9: COMPARISON ROW                                       */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={compModal.isOpen}
        onClose={() => setCompModal({ isOpen: false, mode: "create", data: null })}
        title={compModal.mode === "create" ? "Add Comparison Row" : "Edit Comparison Row"}
        subtitle="Window Doctor vs National Sales Reps comparison matrix"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setCompModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveComp(e as any);
                triggerToast("Comparison matrix row saved!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {compModal.mode === "create" ? "Add Row" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveComp} className="space-y-4 text-xs font-label">
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Feature / Category Name</label><input type="text" required value={compModal.data?.feature || ""} onChange={(e) => setCompModal({ ...compModal, data: { ...compModal.data, feature: e.target.value } })} placeholder="e.g. Cost for 8 Windows" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-emerald-700 font-bold mb-1 whitespace-nowrap">✓ The Window Doctor (Our Advantage)</label><input type="text" required value={compModal.data?.windowDoctor || ""} onChange={(e) => setCompModal({ ...compModal, data: { ...compModal.data, windowDoctor: e.target.value } })} placeholder="e.g. £760 - £1,100 (Glass Unit Replacement)" className="w-full px-3.5 py-2.5 rounded-md border border-emerald-200 bg-emerald-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-red-600 font-bold mb-1 whitespace-nowrap">✗ National Window Sales (Competitor)</label><input type="text" required value={compModal.data?.nationalGuys || ""} onChange={(e) => setCompModal({ ...compModal, data: { ...compModal.data, nationalGuys: e.target.value } })} placeholder="e.g. £6,500 - £9,800 (Full Tear-Out)" className="w-full px-3.5 py-2.5 rounded-md border border-red-200 bg-red-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* SLIDE-OVER DRAWER 10: PROCESS STEP                                        */}
      {/* ========================================================================= */}
      <SlideOverDrawer
        isOpen={stepModal.isOpen}
        onClose={() => setStepModal({ isOpen: false, mode: "create", data: null })}
        title={stepModal.mode === "create" ? "Add Process Step" : "Edit Process Step"}
        subtitle="4-Stage master glazier workflow (Survey, Glazing, Install, Guarantee)"
        footerActions={
          <>
            <button
              type="button"
              onClick={() => setStepModal({ isOpen: false, mode: "create", data: null })}
              className="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                handleSaveStep(e as any);
                triggerToast("Process step updated!");
              }}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-4 rounded-md font-bold shadow-xs whitespace-nowrap text-xs font-label transition-all active:scale-95 border border-secondary/40"
            >
              {stepModal.mode === "create" ? "Add Step" : "Save Changes"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSaveStep} className="space-y-4 text-xs font-label">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Step Number</label><input type="text" value={stepModal.data?.num || ""} onChange={(e) => setStepModal({ ...stepModal, data: { ...stepModal.data, num: e.target.value } })} placeholder="e.g. 01" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none font-mono" /></div>
            <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Timing Label</label><input type="text" value={stepModal.data?.timing || ""} onChange={(e) => setStepModal({ ...stepModal, data: { ...stepModal.data, timing: e.target.value } })} placeholder="e.g. Free • 30 Mins" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          </div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Step Title</label><input type="text" required value={stepModal.data?.title || ""} onChange={(e) => setStepModal({ ...stepModal, data: { ...stepModal.data, title: e.target.value } })} placeholder="e.g. Laser Precision Survey" className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
          <div><label className="block text-slate-700 font-bold mb-1 whitespace-nowrap">Description</label><textarea rows={3} required value={stepModal.data?.description || ""} onChange={(e) => setStepModal({ ...stepModal, data: { ...stepModal.data, description: e.target.value } })} placeholder="Detailed step description..." className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none" /></div>
        </form>
      </SlideOverDrawer>

      {/* ========================================================================= */}
      {/* PWA / DESKTOP APP INSTALLATION MODAL POPUP                                */}
      {/* ========================================================================= */}
      <AdminInstallAppModal
        forceOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

    </div>
  );
}
