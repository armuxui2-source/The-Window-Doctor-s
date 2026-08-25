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
  TrendingDown,
  Target,
  Megaphone,
  Globe,
  Share2,
  Calendar,
  RefreshCw,
  Check,
  X,
  Menu,
  ChevronDown
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { GOOGLE_REVIEWS, MOCK_SERVICES, MOCK_PROJECTS, MOCK_SERVICE_AREAS } from "@/lib/supabase/mock-data";
import IntegrationManager from "@/components/admin/IntegrationManager";

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
  source: "Google Search (Organic)" | "Google Ads (PPC)" | "Meta Ads" | "Direct Referral";
  notes?: string;
}

export default function EnterpriseAdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "crm" | "services" | "projects" | "reviews" | "areas" | "seo" | "integrations"
  >("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // CRM Leads Pipeline State
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
      notes: "Condensation between bay window glass. Urgently requested diagnostic quote."
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

  const updateLeadStatus = (id: string, newStatus: QuoteLead["status"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

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
    { id: "services", label: "Services & Pricing", icon: Sliders },
    { id: "projects", label: "Case Studies CMS", icon: Layers },
    { id: "reviews", label: "Customer Reviews", icon: Star, badge: "4.9 ★" },
    { id: "areas", label: "Coverage & Postcodes", icon: MapPin },
    { id: "seo", label: "Google SEO & Marketing", icon: Target, badge: "Score 98" },
    { id: "integrations", label: "Integration Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased font-body">
      
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR NAVIGATION MENU (แถบเมนูหลักฝั่งซ้ายมือ)                      */}
      {/* ========================================================================= */}
      <aside className={cn(
        "w-72 bg-slate-950 border-r border-white/10 flex flex-col justify-between flex-shrink-0 z-40 transition-all duration-300",
        "fixed md:sticky top-0 h-screen",
        sidebarOpen ? "left-0" : "-left-72 md:left-0"
      )}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-secondary flex-shrink-0 bg-white">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="font-headline font-extrabold text-sm text-white tracking-tight block">
                The Window Doctor
              </span>
              <span className="text-[10px] text-secondary font-bold font-label uppercase tracking-wider">
                Admin Command Center
              </span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 font-label">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-2">
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
                    ? "bg-secondary text-primary font-extrabold shadow-lg shadow-secondary/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-secondary")} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-extrabold font-mono",
                    isActive ? "bg-primary text-secondary" : "bg-white/10 text-slate-300"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer (Live Status & Quick Action) */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 space-y-3 font-label">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 text-[11px] font-medium">Supabase Cloud</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold font-mono">CONNECTED</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Backdrop for Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN CONTENT WORKSPACE (พื้นที่ทำงานและแดชบอร์ดหลัก)                   */}
      {/* ========================================================================= */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-white/10 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-headline font-extrabold text-base sm:text-lg text-white">
                {NAVIGATION_ITEMS.find((n) => n.id === activeTab)?.label}
              </h1>
            </div>
          </div>

          {/* Quick Metrics & Notification */}
          <div className="flex items-center gap-3 text-xs font-label">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>FENSA Registered #28491</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-950/60 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pipeline: £42,850</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Body Content */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto max-w-[1400px] w-full mx-auto space-y-8">
          
          {/* ======================================================================= */}
          {/* TAB 1: EXECUTIVE DASHBOARD & CRM / SEO / ADS OVERVIEW                  */}
          {/* ======================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top 4 KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-label">
                    <span>Weekly Traffic</span>
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-white">1,482</div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-label">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% vs last week</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-label">
                    <span>Quotes Received</span>
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-secondary">38</div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-label">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>14.8% Conversion Rate</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-label">
                    <span>Active Revenue Pipeline</span>
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-white">
                    {formatCurrency(totalPipelineRevenue)}
                  </div>
                  <div className="text-xs text-slate-400 font-label">
                    Avg. £3,327 / Job Booking
                  </div>
                </div>

                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-label">
                    <span>Google SEO Score</span>
                    <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="font-headline font-extrabold text-3xl text-purple-300">98 / 100</div>
                  <div className="text-xs text-emerald-400 font-bold font-label">
                    ✓ #1 For "Misted Glass Bicester"
                  </div>
                </div>
              </div>

              {/* 7-Day Traffic Graph & Channel Performance Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Traffic Graph */}
                <div className="lg:col-span-8 bg-slate-950/70 p-6 sm:p-8 rounded-[24px] border border-white/10 shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline font-bold text-lg text-white">Weekly Traffic & Quote Leads (Oxfordshire)</h3>
                      <p className="text-xs text-slate-400 font-label">Daily pageviews across Bicester, Oxford, and Banbury</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                      🟢 Live Telemetry
                    </span>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-52 pt-6 border-b border-white/10 pb-3">
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
                        <div className="text-[11px] font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                          {d.views}
                        </div>
                        <div
                          className="w-full max-w-[42px] bg-gradient-to-t from-primary via-secondary to-amber-300 rounded-t-xl transition-all duration-500 group-hover:brightness-125 shadow-lg"
                          style={{ height: d.height }}
                        />
                        <span className="text-[11px] font-bold text-slate-400 font-label mt-1">
                          {d.day}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-label">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-secondary" /> Organic Searches
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-md bg-primary border border-white/20" /> Paid Ads Traffic
                      </span>
                    </div>
                    <span>Data synced with GA4 & Supabase</span>
                  </div>
                </div>

                {/* Acquisition Channel Breakdown */}
                <div className="lg:col-span-4 bg-slate-950/70 p-6 sm:p-8 rounded-[24px] border border-white/10 shadow-xl space-y-6">
                  <h3 className="font-headline font-bold text-lg text-white">Lead Acquisition Sources</h3>
                  
                  <div className="space-y-4 text-xs font-label">
                    {[
                      { name: "Google Organic (SEO)", share: "52%", count: "20 Leads", color: "bg-emerald-500" },
                      { name: "Google Ads (PPC)", share: "26%", count: "10 Leads", color: "bg-blue-500" },
                      { name: "Meta Ads (Facebook/IG)", share: "14%", count: "5 Leads", color: "bg-purple-500" },
                      { name: "Direct Word-of-Mouth", share: "8%", count: "3 Leads", color: "bg-amber-400" },
                    ].map((ch, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-slate-200 font-semibold">
                          <span>{ch.name}</span>
                          <span className="font-mono text-secondary font-bold">{ch.share}</span>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", ch.color)} style={{ width: ch.share }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Oxfordshire Regional Demand */}
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <span className="text-xs font-bold text-slate-200 font-headline block">Top Inquiring Towns</span>
                    <div className="flex flex-wrap gap-1.5">
                      {["OX26 Bicester (42%)", "OX2 Oxford (28%)", "OX15 Banbury (18%)", "OX5 Kidlington (12%)"].map((p) => (
                        <span key={p} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300">
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
          {/* TAB 2: CRM & QUOTE LEADS PIPELINE                                      */}
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
                          ? "bg-secondary text-primary font-extrabold shadow-sm"
                          : "bg-slate-950 hover:bg-white/5 text-slate-300 border border-white/10"
                      )}
                    >
                      {f.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search customer, postcode, ref..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-white/10 bg-slate-950 text-xs font-label text-white focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-slate-950/70 rounded-[22px] border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-label">
                    <thead className="bg-slate-950 border-b border-white/10 text-slate-400">
                      <tr>
                        <th className="py-3 px-4">Customer & Reference</th>
                        <th className="py-3 px-4">Service & Units</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Source</th>
                        <th className="py-3 px-4">Est. Total</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white font-headline text-sm">{lead.customer_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{lead.reference_no} • {lead.created_at}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-100">{lead.service_type}</div>
                            <div className="text-[11px] text-slate-400">{lead.units} units requested</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium">{lead.postcode}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-slate-300 font-mono">
                              {lead.source}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-extrabold text-secondary font-headline text-sm">
                            {formatCurrency(lead.estimated_cost)}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteLead["status"])}
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-bold border font-label focus:outline-none bg-slate-900",
                                lead.status === "PENDING" ? "text-amber-400 border-amber-500/40" :
                                lead.status === "SURVEY_SCHEDULED" ? "text-blue-400 border-blue-500/40" :
                                lead.status === "QUOTED" ? "text-purple-400 border-purple-500/40" :
                                "text-emerald-400 border-emerald-500/40"
                              )}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="SURVEY_SCHEDULED">SURVEY SCHEDULED</option>
                              <option value="QUOTED">QUOTED</option>
                              <option value="COMPLETED">COMPLETED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`tel:${lead.phone}`}
                                className="p-2 rounded-lg bg-white/10 hover:bg-secondary hover:text-primary text-white transition-colors"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`mailto:${lead.email}`}
                                className="p-2 rounded-lg bg-white/10 hover:bg-secondary hover:text-primary text-white transition-colors"
                                title="Email Customer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
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
          {/* TAB 3: SERVICES & PRICING CATALOG                                      */}
          {/* ======================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-xl text-white">Services & Pricing Manager</h2>
                  <p className="text-xs text-slate-400 font-label">Configure fenestration services, unit estimates, and warranties</p>
                </div>
                <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_SERVICES.map((srv) => (
                  <div key={srv.id} className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-md bg-secondary text-primary font-extrabold text-[11px] font-label">
                          {srv.warranty_years}-Yr Warranty
                        </span>
                        <span className="text-emerald-400 text-xs font-bold font-label">🟢 Active in DB</span>
                      </div>
                      <h3 className="font-headline font-bold text-base text-white">{srv.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{srv.short_description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-label block">Base Estimate</span>
                        <span className="font-headline font-bold text-lg text-secondary">
                          £{srv.base_price_estimate} <span className="text-xs font-normal text-slate-400">/ unit</span>
                        </span>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                        Edit Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: CASE STUDIES & BEFORE/AFTER GALLERY                             */}
          {/* ======================================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-xl text-white">Projects & Case Studies Manager</h2>
                  <p className="text-xs text-slate-400 font-label">Manage Before & After galleries across Oxfordshire</p>
                </div>
                <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>New Case Study</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_PROJECTS.map((proj) => (
                  <div key={proj.id} className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-label">
                        <span className="text-secondary font-bold">📍 {proj.location_city}</span>
                        <span className="text-slate-400">{proj.completion_year}</span>
                      </div>
                      <h3 className="font-headline font-bold text-base text-white">{proj.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{proj.summary}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-emerald-400 font-bold font-label">✓ {proj.specifications?.length || 5} Specs Listed</span>
                      <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                        Edit Case Study
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: GOOGLE REVIEWS & RATINGS                                        */}
          {/* ======================================================================= */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-xl text-white">Verified Reviews & Ratings</h2>
                  <p className="text-xs text-slate-400 font-label">Customer feedback synchronized with Google Maps</p>
                </div>
                <span className="text-xs font-bold bg-amber-950/60 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/30">
                  ⭐ 4.9 Average Rating (128 Reviews)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOOGLE_REVIEWS.slice(0, 6).map((rev) => (
                  <div key={rev.id} className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-label">{rev.time_ago}</span>
                    </div>
                    <h4 className="font-headline font-bold text-sm text-white">{rev.review_title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{rev.review_text}</p>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-label">
                      <span className="font-bold text-secondary">{rev.customer_name} ({rev.customer_location})</span>
                      <span className="text-emerald-400 font-bold">✓ Google Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 6: SERVICE AREAS & COVERAGE                                        */}
          {/* ======================================================================= */}
          {activeTab === "areas" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-xl text-white">Oxfordshire Coverage & Response SLA</h2>
                  <p className="text-xs text-slate-400 font-label">Postcode validation rules and guaranteed attendance times</p>
                </div>
                <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Add Postcode</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOCK_SERVICE_AREAS.map((area) => (
                  <div key={area.id} className="bg-slate-950/70 p-5 rounded-[20px] border border-white/10 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-headline font-bold text-sm text-white">📍 {area.town_name}</span>
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-md font-label border border-secondary/30">
                        &lt; {area.response_time_hours}h SLA
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1 font-label">
                      <div>County: <strong>{area.county}</strong></div>
                      <div>Emergency Service: <strong className="text-emerald-400">{area.emergency_available ? "Available" : "No"}</strong></div>
                      <div>Free Home Survey: <strong className="text-emerald-400">Yes (100% Free)</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 7: GOOGLE SEO & MARKETING OPTIMIZATION                             */}
          {/* ======================================================================= */}
          {activeTab === "seo" && (
            <div className="space-y-8 animate-fade-in">
              
              {/* SEO Score Banner */}
              <div className="bg-gradient-to-r from-slate-950 via-primary to-slate-950 p-6 sm:p-8 rounded-[24px] border border-secondary/30 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-primary font-extrabold text-xs uppercase font-label">
                  <Target className="w-3.5 h-3.5" />
                  <span>Google First-Page Search Engine Engine</span>
                </div>
                <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
                  Oxfordshire Glazing SEO & Search Dominance
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Automated XML Sitemaps, Rich Snippets JSON-LD schema (LocalBusiness + FAQPage), and high-intent local keyword indexing for Bicester, Oxford, and Cotswolds searches.
                </p>
              </div>

              {/* Keyword Ranking Radar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-3">
                  <div className="text-xs text-slate-400 font-label">Top Target Keyword</div>
                  <h4 className="font-headline font-bold text-lg text-white">"misted double glazing bicester"</h4>
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 font-label">
                    <span>Rank: Position #1 on Google</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-3">
                  <div className="text-xs text-slate-400 font-label">Secondary Keyword</div>
                  <h4 className="font-headline font-bold text-lg text-white">"window repair oxford"</h4>
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 font-label">
                    <span>Rank: Position #2 on Google</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 space-y-3">
                  <div className="text-xs text-slate-400 font-label">Sitemap & Indexing</div>
                  <h4 className="font-headline font-bold text-lg text-white">/sitemap.xml</h4>
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1 font-label">
                    <span>✓ 100% URLs Indexed</span>
                  </div>
                </div>
              </div>

              {/* Blog / Articles CMS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-bold text-lg text-white">Published SEO Articles & Guides</h3>
                  <Link
                    href="/blog"
                    target="_blank"
                    className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold"
                  >
                    <span>View Public Guides</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {[
                  {
                    slug: "misted-double-glazing-repair-guide-oxfordshire",
                    title: "Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Guide",
                    seoScore: 98,
                    keywords: ["misted double glazing bicester", "window repair oxford"],
                    indexed: true
                  },
                  {
                    slug: "conservatory-warm-roof-conversion-benefits",
                    title: "Transforming Unusable Conservatories with Tiled Warm Roofs in 2026",
                    seoScore: 95,
                    keywords: ["conservatory warm roof banbury", "tiled roof oxford"],
                    indexed: true
                  }
                ].map((b) => (
                  <div key={b.slug} className="bg-slate-950/70 p-6 rounded-[22px] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono border border-emerald-500/30">
                          SEO Score: {b.seoScore}/100
                        </span>
                        <span className="text-xs text-emerald-400 font-bold font-label">🟢 Indexed by Google</span>
                      </div>
                      <h4 className="font-headline font-bold text-base text-white">{b.title}</h4>
                      <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 font-label">
                        {b.keywords.map((k) => (
                          <span key={k} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">#{k}</span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
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

    </div>
  );
}
