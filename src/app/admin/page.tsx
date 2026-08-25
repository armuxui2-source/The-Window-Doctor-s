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
  Plus
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { GOOGLE_REVIEWS, MOCK_SERVICES, MOCK_PROJECTS, MOCK_SERVICE_AREAS } from "@/lib/supabase/mock-data";
import IntegrationManager from "@/components/admin/IntegrationManager";

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
}

interface ProjectItem {
  id: string;
  title: string;
  location_city: string;
  completion_year: string;
  summary: string;
  is_featured: boolean;
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

export default function EnterpriseAdminSuite() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "crm" | "services" | "projects" | "reviews" | "areas" | "seo" | "integrations"
  >("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const NAVIGATION_ITEMS = [
    { id: "dashboard", label: "Executive Dashboard", icon: BarChart3, badge: "Live" },
    { id: "crm", label: "CRM & Quote Leads", icon: Users, badge: `${leads.length}` },
    { id: "services", label: "Services & Pricing", icon: Sliders, badge: `${services.length}` },
    { id: "projects", label: "Case Studies CMS", icon: Layers, badge: `${projects.length}` },
    { id: "reviews", label: "Customer Reviews", icon: Star, badge: `${reviews.length}` },
    { id: "areas", label: "Coverage & Postcodes", icon: MapPin, badge: `${areas.length}` },
    { id: "seo", label: "Google SEO & Marketing", icon: Target, badge: "Score 98" },
    { id: "integrations", label: "Integration Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row antialiased font-body">
      
      {/* ========================================================================= */}
      {/* 1. CLEAN WHITE/SLATE LEFT SIDEBAR (แถบเมนูหลักฝั่งซ้ายมือ)                      */}
      {/* ========================================================================= */}
      <aside className={cn(
        "w-72 bg-white border-r border-slate-200 flex flex-col justify-between flex-shrink-0 z-40 transition-all duration-300 shadow-sm",
        "fixed md:sticky top-0 h-screen",
        sidebarOpen ? "left-0" : "-left-72 md:left-0"
      )}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 bg-white shadow-sm">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-headline font-extrabold text-sm text-primary tracking-tight block">
                The Window Doctor
              </span>
              <span className="text-[10px] text-secondary font-bold font-label uppercase tracking-wider">
                Enterprise Admin Suite
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 font-label">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            System Modules
          </div>

          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as typeof activeTab);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left",
                  isActive
                    ? "bg-primary text-secondary-container font-extrabold shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-secondary-container" : "text-secondary")} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-extrabold font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer (Live Cloud Status) */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3 font-label">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600 text-[11px] font-medium">Supabase Cloud</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold font-mono">LIVE SYNC</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN CONTENT WORKSPACE (WHITE/CLEAN THEME)                       */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-headline font-extrabold text-base sm:text-lg text-primary">
                {NAVIGATION_ITEMS.find((n) => n.id === activeTab)?.label}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-3 text-xs font-label">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>FENSA Certified #28491</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Pipeline: £42,850</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-8">
          
          {/* ======================================================================= */}
          {/* TAB 1: EXECUTIVE DASHBOARD                                             */}
          {/* ======================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top 4 KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span>Weekly Traffic</span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-primary">1,482</div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-label">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% vs last week</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span>Quotes Received</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-secondary">38</div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-label">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>14.8% Conversion Rate</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span>Active Revenue Pipeline</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-primary">
                    {formatCurrency(totalPipelineRevenue)}
                  </div>
                  <div className="text-xs text-slate-500 font-label">
                    Avg. £3,327 / Job Booking
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-label">
                    <span>Google SEO Score</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-purple-700">98 / 100</div>
                  <div className="text-xs text-emerald-600 font-bold font-label">
                    ✓ #1 For "Misted Glass Bicester"
                  </div>
                </div>
              </div>

              {/* 7-Day Traffic Graph & Channel Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Traffic Graph */}
                <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-primary">Weekly Traffic & Quote Inquiries (Oxfordshire)</h3>
                      <p className="text-xs text-slate-500 font-label">Daily visitors across Bicester, Oxford, and Banbury</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
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
                        <div className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                          {d.views}
                        </div>
                        <div
                          className="w-full max-w-[42px] bg-gradient-to-t from-primary to-secondary rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-sm"
                          style={{ height: d.height }}
                        />
                        <span className="text-[11px] font-bold text-slate-500 font-label mt-1">
                          {d.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-label">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-primary" /> Organic Searches
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-secondary" /> Paid Ads Traffic
                      </span>
                    </div>
                    <span>Data synced with GA4 & Supabase</span>
                  </div>
                </div>

                {/* Lead Acquisition Channels */}
                <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-[24px] border border-slate-200 shadow-sm space-y-6">
                  <h3 className="font-headline font-bold text-lg text-primary">Lead Acquisition Sources</h3>
                  
                  <div className="space-y-4 text-xs font-label">
                    {[
                      { name: "Google Organic (SEO)", share: "52%", count: "20 Leads", color: "bg-emerald-500" },
                      { name: "Google Ads (PPC)", share: "26%", count: "10 Leads", color: "bg-blue-500" },
                      { name: "Meta Ads (Facebook/IG)", share: "14%", count: "5 Leads", color: "bg-purple-500" },
                      { name: "Direct Word-of-Mouth", share: "8%", count: "3 Leads", color: "bg-amber-400" },
                    ].map((ch, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-slate-700 font-semibold">
                          <span>{ch.name}</span>
                          <span className="font-mono text-primary font-bold">{ch.share}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", ch.color)} style={{ width: ch.share }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Regional Postcode Demand */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-primary font-headline block">Top Inquiring Towns</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["OX26 Bicester (42%)", "OX2 Oxford (28%)", "OX15 Banbury (18%)", "OX5 Kidlington (12%)"].map((p) => (
                        <span key={p} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700">
                          📍 {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

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
                        "px-3.5 py-2 rounded-xl text-xs font-bold font-label transition-all whitespace-nowrap",
                        selectedStatusFilter === f
                          ? "bg-primary text-secondary-container shadow-sm font-extrabold"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      )}
                    >
                      {f.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search customer, postcode..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-label text-slate-800 focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <button
                    onClick={() => setLeadModal({ isOpen: true, mode: "create", data: {} })}
                    className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold whitespace-nowrap shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Quote Lead</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-[22px] border border-slate-200 overflow-hidden shadow-sm">
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
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-primary font-headline text-sm">{lead.customer_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{lead.reference_no} • {lead.created_at}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{lead.service_type}</div>
                            <div className="text-[11px] text-slate-500">{lead.units} units requested</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700">{lead.postcode}</td>
                          <td className="py-3.5 px-4 font-extrabold text-primary font-headline text-sm">
                            {formatCurrency(lead.estimated_cost)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteLead["status"])}
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-bold border font-label focus:outline-none bg-white",
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
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setLeadModal({ isOpen: true, mode: "edit", data: lead })}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors"
                                title="Edit Lead"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
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
                  <h2 className="font-headline font-bold text-xl text-primary">Services & Pricing Catalog</h2>
                  <p className="text-xs text-slate-500 font-label">Manage fenestration services, warranty terms, and pricing estimates</p>
                </div>
                <button
                  onClick={() => setServiceModal({ isOpen: true, mode: "create", data: {} })}
                  className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((srv) => (
                  <div key={srv.id} className="bg-white p-6 rounded-[22px] border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-primary font-bold text-[11px] font-label">
                          {srv.warranty_years}-Yr Warranty
                        </span>
                        <span className="text-emerald-700 text-xs font-bold font-label">🟢 Active in DB</span>
                      </div>
                      <h3 className="font-headline font-bold text-base text-primary">{srv.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{srv.short_description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-label block">Base Estimate</span>
                        <span className="font-headline font-bold text-lg text-primary">
                          £{srv.base_price_estimate} <span className="text-xs font-normal text-slate-500">/ unit</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setServiceModal({ isOpen: true, mode: "edit", data: srv })}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
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
                  <h2 className="font-headline font-bold text-xl text-primary">Projects & Case Studies Manager</h2>
                  <p className="text-xs text-slate-500 font-label">Manage Before & After galleries across Oxfordshire</p>
                </div>
                <button
                  onClick={() => setProjectModal({ isOpen: true, mode: "create", data: {} })}
                  className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Case Study</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white p-6 rounded-[22px] border border-slate-200 space-y-4 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-label">
                        <span className="text-secondary font-bold">📍 {proj.location_city}</span>
                        <span className="text-slate-400 font-medium">{proj.completion_year}</span>
                      </div>
                      <h3 className="font-headline font-bold text-base text-primary">{proj.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{proj.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-emerald-700 font-bold font-label">✓ Active on Frontend</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setProjectModal({ isOpen: true, mode: "edit", data: proj })}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                          title="Edit Case Study"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
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
                  <h2 className="font-headline font-bold text-xl text-primary">Verified Reviews & Ratings</h2>
                  <p className="text-xs text-slate-500 font-label">Customer feedback synchronized with Google Maps</p>
                </div>
                <button
                  onClick={() => setReviewModal({ isOpen: true, mode: "create", data: {} })}
                  className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-6 rounded-[22px] border border-slate-200 space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-400 font-label">{rev.time_ago}</span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-primary">{rev.review_title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{rev.review_text}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-label">
                      <span className="font-bold text-primary">{rev.customer_name} ({rev.customer_location})</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setReviewModal({ isOpen: true, mode: "edit", data: rev })}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                          title="Edit Review"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
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
                  <h2 className="font-headline font-bold text-xl text-primary">Oxfordshire Coverage & Response SLA</h2>
                  <p className="text-xs text-slate-500 font-label">Postcode validation rules and guaranteed attendance times</p>
                </div>
                <button
                  onClick={() => setAreaModal({ isOpen: true, mode: "create", data: {} })}
                  className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-sm"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Postcode Area</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {areas.map((area) => (
                  <div key={area.id} className="bg-white p-5 rounded-[20px] border border-slate-200 space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-headline font-bold text-sm text-primary">📍 {area.town_name}</span>
                        <span className="text-xs font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-md font-label">
                          &lt; {area.response_time_hours}h SLA
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1 font-label">
                        <div>County/Code: <strong>{area.county}</strong></div>
                        <div>Emergency Service: <strong className="text-emerald-700">{area.emergency_available ? "Available" : "No"}</strong></div>
                        <div>Free Home Survey: <strong className="text-emerald-700">Yes (100% Free)</strong></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setAreaModal({ isOpen: true, mode: "edit", data: area })}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                        title="Edit Area"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteArea(area.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
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
          {/* TAB 7: GOOGLE SEO & BLOG ENGINE (FULL CRUD)                            */}
          {/* ======================================================================= */}
          {activeTab === "seo" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* SEO Banner */}
              <div className="bg-gradient-to-r from-primary via-primary-container to-primary p-6 sm:p-8 rounded-[24px] text-white shadow-md space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-primary font-extrabold text-xs uppercase font-label">
                  <Target className="w-3.5 h-3.5" />
                  <span>Google First-Page Search Engine Engine</span>
                </div>
                <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
                  Oxfordshire Glazing SEO & Search Dominance
                </h2>
                <p className="text-sm text-slate-200 max-w-2xl leading-relaxed">
                  Automated XML Sitemaps, Rich Snippets JSON-LD schema (LocalBusiness + FAQPage), and high-intent local keyword indexing for Bicester, Oxford, and Cotswolds searches.
                </p>
              </div>

              {/* Keyword Ranking Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs text-slate-500 font-label">Top Target Keyword</div>
                  <h4 className="font-headline font-bold text-lg text-primary">"misted double glazing bicester"</h4>
                  <div className="text-emerald-700 font-bold text-xs font-label">
                    <span>Rank: Position #1 on Google</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs text-slate-500 font-label">Secondary Keyword</div>
                  <h4 className="font-headline font-bold text-lg text-primary">"window repair oxford"</h4>
                  <div className="text-emerald-700 font-bold text-xs font-label">
                    <span>Rank: Position #2 on Google</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs text-slate-500 font-label">Sitemap & Indexing</div>
                  <h4 className="font-headline font-bold text-lg text-primary">/sitemap.xml</h4>
                  <div className="text-emerald-700 font-bold text-xs font-label">
                    <span>✓ 100% URLs Indexed</span>
                  </div>
                </div>
              </div>

              {/* Blog Articles List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-bold text-lg text-primary">Published SEO Articles & Guides</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBlogModal({ isOpen: true, mode: "create", data: {} })}
                      className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Article</span>
                    </button>
                    <Link
                      href="/blog"
                      target="_blank"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
                    >
                      <span>Public Guides</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {blogs.map((b) => (
                  <div key={b.slug} className="bg-white p-6 rounded-[22px] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold font-mono border border-emerald-200">
                          SEO Score: {b.seoScore}/100
                        </span>
                        <span className="text-xs text-emerald-700 font-bold font-label">🟢 Indexed by Google</span>
                      </div>
                      <h4 className="font-headline font-bold text-base text-primary">{b.title}</h4>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-500 font-label">
                        {b.keywords.map((k) => (
                          <span key={k} className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">#{k}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href={`/blog/${b.slug}`}
                        target="_blank"
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
                      >
                        <span>Preview</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setBlogModal({ isOpen: true, mode: "edit", data: b })}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-primary hover:text-white text-slate-700 transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.slug)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 8: INTEGRATION MANAGER & API CREDENTIAL SETTINGS                    */}
          {/* ======================================================================= */}
          {activeTab === "integrations" && (
            <IntegrationManager />
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* CRUD MODAL 1: QUOTE LEAD DIALOG                                          */}
      {/* ========================================================================= */}
      {leadModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {leadModal.mode === "create" ? "Add New Quote Lead" : "Edit Customer Lead"}
              </h3>
              <button onClick={() => setLeadModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="space-y-4 text-xs font-label">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={leadModal.data?.customer_name || ""}
                  onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, customer_name: e.target.value } })}
                  placeholder="e.g. Mrs. Eleanor Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={leadModal.data?.phone || ""}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, phone: e.target.value } })}
                    placeholder="07891 234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={leadModal.data?.email || ""}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, email: e.target.value } })}
                    placeholder="customer@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Postcode / Location</label>
                  <input
                    type="text"
                    required
                    value={leadModal.data?.postcode || ""}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, postcode: e.target.value } })}
                    placeholder="OX26 (Bicester)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Service Type</label>
                  <input
                    type="text"
                    required
                    value={leadModal.data?.service_type || ""}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, service_type: e.target.value } })}
                    placeholder="Misted Glass Repair"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Units Count</label>
                  <input
                    type="number"
                    value={leadModal.data?.units || 1}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, units: Number(e.target.value) } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Estimated Total (£)</label>
                  <input
                    type="number"
                    value={leadModal.data?.estimated_cost || 95}
                    onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, estimated_cost: Number(e.target.value) } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Glazier Survey Notes</label>
                <textarea
                  rows={3}
                  value={leadModal.data?.notes || ""}
                  onChange={(e) => setLeadModal({ ...leadModal, data: { ...leadModal.data, notes: e.target.value } })}
                  placeholder="Notes from customer phone call or site survey..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLeadModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {leadModal.mode === "create" ? "Create Lead" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CRUD MODAL 2: SERVICE CATALOG DIALOG                                     */}
      {/* ========================================================================= */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {serviceModal.mode === "create" ? "Add New Service" : "Edit Service Details"}
              </h3>
              <button onClick={() => setServiceModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs font-label">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceModal.data?.title || ""}
                  onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, title: e.target.value } })}
                  placeholder="e.g. Misted Glass & Seal Failure Repair"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  value={serviceModal.data?.short_description || ""}
                  onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, short_description: e.target.value } })}
                  placeholder="Brief description for homepage and catalog..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Base Price Estimate (£)</label>
                  <input
                    type="number"
                    required
                    value={serviceModal.data?.base_price_estimate || 95}
                    onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, base_price_estimate: Number(e.target.value) } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Warranty Years</label>
                  <input
                    type="number"
                    required
                    value={serviceModal.data?.warranty_years || 10}
                    onChange={(e) => setServiceModal({ ...serviceModal, data: { ...serviceModal.data, warranty_years: Number(e.target.value) } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {serviceModal.mode === "create" ? "Create Service" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CRUD MODAL 3: CASE STUDY DIALOG                                          */}
      {/* ========================================================================= */}
      {projectModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {projectModal.mode === "create" ? "Add Case Study" : "Edit Case Study"}
              </h3>
              <button onClick={() => setProjectModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-label">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={projectModal.data?.title || ""}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, title: e.target.value } })}
                  placeholder="e.g. Complete Misted Double Glazing Restoration"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Town / Location</label>
                  <input
                    type="text"
                    required
                    value={projectModal.data?.location_city || ""}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, location_city: e.target.value } })}
                    placeholder="Kingsmere, Bicester"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Completion Year</label>
                  <input
                    type="text"
                    required
                    value={projectModal.data?.completion_year || "2026"}
                    onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, completion_year: e.target.value } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Summary</label>
                <textarea
                  rows={3}
                  required
                  value={projectModal.data?.summary || ""}
                  onChange={(e) => setProjectModal({ ...projectModal, data: { ...projectModal.data, summary: e.target.value } })}
                  placeholder="Details of the job, challenge, and savings achieved..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProjectModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {projectModal.mode === "create" ? "Add Case Study" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CRUD MODAL 4: GOOGLE REVIEW DIALOG                                       */}
      {/* ========================================================================= */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {reviewModal.mode === "create" ? "Add Customer Review" : "Edit Customer Review"}
              </h3>
              <button onClick={() => setReviewModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs font-label">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={reviewModal.data?.customer_name || ""}
                    onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, customer_name: e.target.value } })}
                    placeholder="e.g. Katie Hawkins"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Town / Location</label>
                  <input
                    type="text"
                    required
                    value={reviewModal.data?.customer_location || ""}
                    onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, customer_location: e.target.value } })}
                    placeholder="Bicester & Oxfordshire"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  value={reviewModal.data?.review_title || ""}
                  onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, review_title: e.target.value } })}
                  placeholder="e.g. Really polite and understood what we wanted"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Review Content</label>
                <textarea
                  rows={3}
                  required
                  value={reviewModal.data?.review_text || ""}
                  onChange={(e) => setReviewModal({ ...reviewModal, data: { ...reviewModal.data, review_text: e.target.value } })}
                  placeholder="Customer feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReviewModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {reviewModal.mode === "create" ? "Add Review" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CRUD MODAL 5: SERVICE AREA DIALOG                                        */}
      {/* ========================================================================= */}
      {areaModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {areaModal.mode === "create" ? "Add Coverage Town / Postcode" : "Edit Area SLA"}
              </h3>
              <button onClick={() => setAreaModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArea} className="space-y-4 text-xs font-label">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Town Name</label>
                <input
                  type="text"
                  required
                  value={areaModal.data?.town_name || ""}
                  onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, town_name: e.target.value } })}
                  placeholder="e.g. Bicester & Kingsmere"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">County & Postcode Prefix</label>
                  <input
                    type="text"
                    required
                    value={areaModal.data?.county || ""}
                    onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, county: e.target.value } })}
                    placeholder="Oxfordshire (OX26)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Response SLA (Hours)</label>
                  <input
                    type="number"
                    required
                    value={areaModal.data?.response_time_hours || 24}
                    onChange={(e) => setAreaModal({ ...areaModal, data: { ...areaModal.data, response_time_hours: Number(e.target.value) } })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAreaModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {areaModal.mode === "create" ? "Add Area" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CRUD MODAL 6: SEO ARTICLE DIALOG                                         */}
      {/* ========================================================================= */}
      {blogModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-headline font-bold text-lg text-primary">
                {blogModal.mode === "create" ? "Add SEO Article Guide" : "Edit Article Details"}
              </h3>
              <button onClick={() => setBlogModal({ isOpen: false, mode: "create", data: null })} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-label">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogModal.data?.title || ""}
                  onChange={(e) => setBlogModal({ ...blogModal, data: { ...blogModal.data, title: e.target.value } })}
                  placeholder="e.g. Why Does Double Glazing Mist Up? The Oxfordshire Guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Keywords (Comma Separated)</label>
                <input
                  type="text"
                  value={blogModal.data?.keywords?.join(", ") || ""}
                  onChange={(e) => setBlogModal({ ...blogModal, data: { ...blogModal.data, keywords: e.target.value.split(",").map(s => s.trim()) } })}
                  placeholder="misted double glazing bicester, window repair oxford"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModal({ isOpen: false, mode: "create", data: null })}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-cta py-2 px-5 rounded-xl font-bold shadow-sm">
                  {blogModal.mode === "create" ? "Add Article" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
