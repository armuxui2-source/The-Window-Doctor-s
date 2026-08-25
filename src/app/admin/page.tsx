"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  RefreshCw,
  AlertCircle,
  Star,
  Eye,
  Settings,
  DollarSign,
  PlusCircle,
  ExternalLink,
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  BookOpen,
  ArrowUpRight,
  Zap,
  Globe,
  Sliders,
  Check,
  X
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
  notes?: string;
}

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "services" | "projects" | "reviews" | "areas" | "blog" | "integrations"
  >("overview");

  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLead, setActiveLead] = useState<QuoteLead | null>(null);

  // Leads state
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
      created_at: "10 mins ago",
      notes: "Large bay window misted in master bedroom. Requested urgent survey."
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
      created_at: "2 hours ago",
      notes: "Rear extension door opening. Structural survey scheduled for Friday."
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
      created_at: "Yesterday",
      notes: "Quote sent via PDF email. Customer considering Velux rooflight add-on."
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
      created_at: "3 days ago",
      notes: "Installation complete. FENSA certificate issued. 5-star Google review received."
    },
  ]);

  const updateLeadStatus = (id: string, newStatus: QuoteLead["status"]) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
    if (activeLead && activeLead.id === id) {
      setActiveLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = selectedFilter === "ALL" || lead.status === selectedFilter;
    const matchesSearch =
      lead.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.reference_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.postcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service_type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRevenuePipeline = leads.reduce((acc, curr) => acc + curr.estimated_cost, 0);

  return (
    <div className="bg-background min-h-screen pb-20">
      
      {/* Top Admin Navigation Bar */}
      <div className="bg-primary text-white border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-8 h-8 rounded-full overflow-hidden border border-secondary flex-shrink-0">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </Link>
            <div>
              <span className="font-headline font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>The Window Doctor Staff Admin HUD</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-container text-primary font-label">
                  PROD v2.4
                </span>
              </span>
              <span className="text-[10px] text-slate-300 font-label hidden sm:block">
                Master Glaziers Since 1983 • Bicester, Oxford & Oxfordshire
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-bold text-slate-200 hover:text-secondary-container flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Multi-Tab Navigation Bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-white/10 pt-1 pb-1">
          {[
            { id: "overview", label: "Overview & Analytics", icon: BarChart3 },
            { id: "leads", label: `Quote Pipeline (${leads.length})`, icon: FileText },
            { id: "services", label: "Services Catalog", icon: Sliders },
            { id: "projects", label: "Projects CMS", icon: Layers },
            { id: "reviews", label: "Google Reviews", icon: Star },
            { id: "areas", label: "Service Areas", icon: MapPin },
            { id: "blog", label: "SEO Blog Articles", icon: BookOpen },
            { id: "integrations", label: "⚙️ Integration Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-bold font-label flex items-center gap-1.5 transition-all whitespace-nowrap",
                  isActive
                    ? "bg-secondary-container text-primary shadow-sm"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & ANALYTICS HUD                                          */}
        {/* ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            
            {/* KPI Metric Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest shadow-sm space-y-2">
                <div className="flex items-center justify-between text-on-surface-variant text-xs font-label">
                  <span>Weekly Website Visitors</span>
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

              <div className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest shadow-sm space-y-2">
                <div className="flex items-center justify-between text-on-surface-variant text-xs font-label">
                  <span>Quotes Generated</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-headline font-extrabold text-3xl text-secondary">38</div>
                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 font-label">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>14.8% conversion rate</span>
                </div>
              </div>

              <div className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest shadow-sm space-y-2">
                <div className="flex items-center justify-between text-on-surface-variant text-xs font-label">
                  <span>Active Quote Pipeline</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="font-headline font-extrabold text-3xl text-primary">
                  {formatCurrency(totalRevenuePipeline)}
                </div>
                <div className="text-xs text-on-surface-variant font-label">
                  Avg. £3,327 per booking
                </div>
              </div>

              <div className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest shadow-sm space-y-2">
                <div className="flex items-center justify-between text-on-surface-variant text-xs font-label">
                  <span>Customer Rating</span>
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>
                <div className="font-headline font-extrabold text-3xl text-primary">4.9 / 5.0</div>
                <div className="text-xs text-slate-500 font-label">
                  Based on 128 Google reviews
                </div>
              </div>
            </div>

            {/* Visual Charts & Telemetry Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Daily Traffic Bar Chart */}
              <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-[24px] border border-outline-variant bg-surface-container-lowest space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-primary">Daily Website Traffic & Inquiries</h3>
                    <p className="text-xs text-on-surface-variant font-label">Daily pageviews across Bicester & Oxford</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    🟢 Live Telemetry
                  </span>
                </div>

                {/* 7-Day Visual Bars */}
                <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-56 pt-6 border-b border-outline-variant pb-3">
                  {[
                    { day: "Wed", views: 184, quotes: 4, height: "65%" },
                    { day: "Thu", views: 210, quotes: 5, height: "75%" },
                    { day: "Fri", views: 245, quotes: 7, height: "88%" },
                    { day: "Sat", views: 195, quotes: 4, height: "70%" },
                    { day: "Sun", views: 160, quotes: 3, height: "55%" },
                    { day: "Mon", views: 280, quotes: 9, height: "100%" },
                    { day: "Tue (Today)", views: 208, quotes: 6, height: "74%" },
                  ].map((d, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {d.views}
                      </div>
                      <div 
                        className="w-full max-w-[38px] bg-gradient-to-t from-primary to-secondary rounded-t-xl transition-all duration-500 group-hover:brightness-110 shadow-sm"
                        style={{ height: d.height }}
                      />
                      <span className="text-[11px] font-bold text-on-surface-variant font-label mt-1">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-on-surface-variant font-label pt-2">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-primary" /> Total Pageviews
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-md bg-secondary" /> Quote Starts
                    </span>
                  </div>
                  <span>Updated 2 minutes ago</span>
                </div>
              </div>

              {/* Service Interest Breakdown */}
              <div className="lg:col-span-4 glass-card p-6 sm:p-8 rounded-[24px] border border-outline-variant bg-surface-container-lowest space-y-6">
                <h3 className="font-headline font-bold text-lg text-primary">Top Requested Services</h3>
                
                <div className="space-y-4 text-xs font-label">
                  {[
                    { name: "Misted Glass Repairs", share: "46%", count: "18 quotes", color: "bg-secondary" },
                    { name: "Anthracite Bi-fold Doors", share: "28%", count: "11 quotes", color: "bg-primary" },
                    { name: "uPVC Flush Windows", share: "16%", count: "6 quotes", color: "bg-emerald-600" },
                    { name: "Warm Roof Conversions", share: "10%", count: "3 quotes", color: "bg-amber-500" },
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-on-surface font-semibold">
                        <span>{s.name}</span>
                        <span className="font-mono text-primary font-bold">{s.share}</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", s.color)} style={{ width: s.share }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Oxfordshire Postcode Activity */}
                <div className="pt-4 border-t border-outline-variant space-y-2">
                  <span className="text-xs font-bold text-primary font-headline block">Active Oxfordshire Coverage</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["OX26 Bicester", "OX2 North Oxford", "OX15 Banbury", "OX5 Kidlington", "OX28 Witney"].map((p) => (
                      <span key={p} className="px-2.5 py-1 rounded-lg bg-surface-container text-[11px] font-bold text-primary">
                        📍 {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: QUOTE LEADS PIPELINE                                              */}
        {/* ========================================================================= */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["ALL", "PENDING", "SURVEY_SCHEDULED", "QUOTED", "COMPLETED"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    className={cn(
                      "px-3.5 py-2 rounded-xl text-xs font-bold font-label transition-all whitespace-nowrap",
                      selectedFilter === f
                        ? "bg-primary text-secondary-container shadow-sm"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    )}
                  >
                    {f.replace("_", " ")}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, postcode, ref..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest text-xs font-label focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            {/* Leads Table */}
            <div className="glass-card rounded-[22px] border border-outline-variant bg-surface-container-lowest overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-label">
                  <thead className="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                    <tr>
                      <th className="py-3 px-4">Ref & Customer</th>
                      <th className="py-3 px-4">Service & Units</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Est. Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/60">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-primary font-headline text-sm">{lead.customer_name}</div>
                          <div className="text-[11px] text-on-surface-variant font-mono">{lead.reference_no} • {lead.created_at}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-on-surface">{lead.service_type}</div>
                          <div className="text-[11px] text-on-surface-variant">{lead.units} units requested</div>
                        </td>
                        <td className="py-3.5 px-4 text-on-surface font-medium">
                          {lead.postcode}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-primary font-headline text-sm">
                          {formatCurrency(lead.estimated_cost)}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteLead["status"])}
                            className={cn(
                              "px-2.5 py-1 rounded-lg text-xs font-bold border font-label focus:outline-none",
                              lead.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              lead.status === "SURVEY_SCHEDULED" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              lead.status === "QUOTED" ? "bg-purple-50 text-purple-700 border-purple-200" :
                              "bg-emerald-50 text-emerald-700 border-emerald-200"
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
                              className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-primary transition-colors"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-primary transition-colors"
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

        {/* ========================================================================= */}
        {/* TAB 3: SERVICES CATALOG CMS                                               */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-xl text-primary">Services & Pricing Manager</h2>
                <p className="text-xs text-on-surface-variant font-label">Configure fenestration services, unit estimates, and warranties</p>
              </div>
              <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_SERVICES.map((srv) => (
                <div key={srv.id} className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-primary font-bold text-[11px] font-label">
                        {srv.warranty_years}-Yr Warranty
                      </span>
                      <span className="text-emerald-600 text-xs font-bold font-label">🟢 Active</span>
                    </div>
                    <h3 className="font-headline font-bold text-base text-primary">{srv.title}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{srv.short_description}</p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-on-surface-variant font-label block">Base Estimate</span>
                      <span className="font-headline font-bold text-lg text-primary">
                        £{srv.base_price_estimate} <span className="text-xs font-normal text-on-surface-variant">/ unit</span>
                      </span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors">
                      Edit Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: PROJECTS CMS                                                      */}
        {/* ========================================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-xl text-primary">Projects & Case Studies Manager</h2>
                <p className="text-xs text-on-surface-variant font-label">Manage Before & After galleries across Oxfordshire</p>
              </div>
              <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Case Study</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_PROJECTS.map((proj) => (
                <div key={proj.id} className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-label">
                      <span className="text-secondary font-bold">📍 {proj.location_city}</span>
                      <span className="text-on-surface-variant">{proj.completion_year}</span>
                    </div>
                    <h3 className="font-headline font-bold text-base text-primary">{proj.title}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2">{proj.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/60 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-bold font-label">✓ {proj.specifications?.length || 5} Specs Listed</span>
                    <button className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors">
                      Edit Case Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: GOOGLE REVIEWS MANAGER                                            */}
        {/* ========================================================================= */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-xl text-primary">Verified Reviews & Ratings</h2>
                <p className="text-xs text-on-surface-variant font-label">Customer feedback synchronized with Google Maps</p>
              </div>
              <span className="text-xs font-bold bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-200">
                ⭐ 4.9 Average Rating (128 Reviews)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GOOGLE_REVIEWS.slice(0, 6).map((rev) => (
                <div key={rev.id} className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-label">{rev.time_ago}</span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-primary">{rev.review_title}</h4>
                  <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed">{rev.review_text}</p>
                  <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[11px] text-on-surface-variant font-label">
                    <span className="font-bold text-primary">{rev.customer_name} ({rev.customer_location})</span>
                    <span className="text-emerald-600 font-bold">✓ Google Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SERVICE AREAS & COVERAGE                                          */}
        {/* ========================================================================= */}
        {activeTab === "areas" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-xl text-primary">Oxfordshire Coverage & Response SLA</h2>
                <p className="text-xs text-on-surface-variant font-label">Postcode validation rules and guaranteed attendance times</p>
              </div>
              <button className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Postcode</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_SERVICE_AREAS.map((area) => (
                <div key={area.id} className="glass-card p-5 rounded-[20px] border border-outline-variant bg-surface-container-lowest space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-sm text-primary">📍 {area.town_name}</span>
                    <span className="text-xs font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded-md font-label">
                      &lt; {area.response_time_hours}h SLA
                    </span>
                  </div>
                  <div className="text-xs text-on-surface-variant space-y-1 font-label">
                    <div>County: <strong>{area.county}</strong></div>
                    <div>Emergency Service: <strong className="text-emerald-600">{area.emergency_available ? "Available" : "No"}</strong></div>
                    <div>Free Home Survey: <strong className="text-emerald-600">Yes (100% Free)</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: BLOG & SEO CONTENT CMS                                            */}
        {/* ========================================================================= */}
        {activeTab === "blog" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-xl text-primary">SEO Knowledge Base & Blog CMS</h2>
                <p className="text-xs text-on-surface-variant font-label">Rank for high-intent Oxfordshire glazing searches on Google</p>
              </div>
              <Link
                href="/blog"
                target="_blank"
                className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold"
              >
                <span>View Public Guides</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
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
                <div key={b.slug} className="glass-card p-6 rounded-[22px] border border-outline-variant bg-surface-container-lowest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold font-mono">
                        SEO Score: {b.seoScore}/100
                      </span>
                      <span className="text-xs text-emerald-600 font-bold font-label">🟢 Indexed by Google</span>
                    </div>
                    <h3 className="font-headline font-bold text-base text-primary">{b.title}</h3>
                    <div className="flex flex-wrap gap-1 text-[11px] text-on-surface-variant font-label">
                      {b.keywords.map((k) => (
                        <span key={k} className="bg-surface-container px-2 py-0.5 rounded">#{k}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-container hover:bg-surface-container-high text-primary transition-colors flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: INTEGRATION MANAGER (TURN-KEY SETTINGS)                           */}
        {/* ========================================================================= */}
        {activeTab === "integrations" && (
          <IntegrationManager />
        )}

      </div>
    </div>
  );
}
