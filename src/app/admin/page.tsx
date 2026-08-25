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
  EyeOff,
  Settings,
  DollarSign,
  PlusCircle,
  ExternalLink
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { GOOGLE_REVIEWS, GoogleReviewItem } from "@/lib/supabase/mock-data";

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
}

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "reviews" | "services">("leads");
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
    },
    {
      id: "4",
      reference_no: "TWD-2026-9045",
      customer_name: "Claire & Robert Scott",
      phone: "07812 345678",
      email: "scott.family@kidlington.com",
      postcode: "OX5 2BY (Kidlington)",
      service_type: "Casement Windows (A++ Rated)",
      units: 8,
      estimated_cost: 3040,
      survey_slot: "Flexible",
      status: "COMPLETED",
      created_at: "3 days ago",
    },
  ]);

  // Google Reviews management state
  const [reviewsList, setReviewsList] = useState<GoogleReviewItem[]>(GOOGLE_REVIEWS);
  const [reviewFilter, setReviewFilter] = useState<string>("all");

  const updateLeadStatus = (id: string, newStatus: QuoteLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (activeLead && activeLead.id === id) {
      setActiveLead({ ...activeLead, status: newStatus });
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesFilter = selectedFilter === "ALL" || l.status === selectedFilter;
    const matchesSearch =
      l.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.reference_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.postcode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-20 pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Staff HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary text-white rounded-3xl p-6 border border-secondary/30 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-secondary-container uppercase tracking-wider font-label">
              Staff Glazing Operations & CMS Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline text-white mt-1">
            The Window Doctor’s Workshop HUD
          </h1>
          <p className="text-xs text-slate-300 font-body mt-0.5">
            Home Farm, Bainton Road, Bucknell, Bicester OX27 7LT • Direct: 01869 572206
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-label border border-white/15 transition-colors"
          >
            ← View Public Site
          </Link>
          <div className="px-3.5 py-2 rounded-xl bg-secondary-container/20 border border-secondary-container/40 text-secondary-container text-xs font-bold font-label">
            FENSA 28491 Live
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant pb-2">
        <button
          onClick={() => setActiveTab("leads")}
          className={cn(
            "px-5 py-2.5 rounded-2xl text-xs font-bold font-label flex items-center gap-2 transition-all",
            activeTab === "leads"
              ? "bg-primary text-secondary-container shadow-md"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          )}
        >
          <FileText className="w-4 h-4" />
          <span>Customer Leads & Surveys ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "px-5 py-2.5 rounded-2xl text-xs font-bold font-label flex items-center gap-2 transition-all",
            activeTab === "reviews"
              ? "bg-primary text-secondary-container shadow-md"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          )}
        >
          <Star className="w-4 h-4 text-amber-400" />
          <span>Google Reviews Manager ({reviewsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={cn(
            "px-5 py-2.5 rounded-2xl text-xs font-bold font-label flex items-center gap-2 transition-all",
            activeTab === "services"
              ? "bg-primary text-secondary-container shadow-md"
              : "bg-surface-container-low text-on-surface hover:bg-surface-container"
          )}
        >
          <Settings className="w-4 h-4" />
          <span>Pricing & Services Editor</span>
        </button>
      </div>

      {/* TAB 1: LEADS QUEUE */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card-structural p-5 rounded-2xl space-y-1">
              <span className="text-xs font-label text-on-surface-variant font-medium">Active Enquiries</span>
              <div className="text-2xl font-bold font-headline text-primary">{leads.length}</div>
              <span className="text-[11px] text-emerald-700 font-label font-bold">100% Oxfordshire Area</span>
            </div>
            <div className="card-structural p-5 rounded-2xl space-y-1">
              <span className="text-xs font-label text-on-surface-variant font-medium">Pending Response</span>
              <div className="text-2xl font-bold font-headline text-amber-600">
                {leads.filter(l => l.status === "PENDING").length}
              </div>
              <span className="text-[11px] text-amber-700 font-label font-bold">&lt; 2h target turnaround</span>
            </div>
            <div className="card-structural p-5 rounded-2xl space-y-1">
              <span className="text-xs font-label text-on-surface-variant font-medium">Survey Scheduled</span>
              <div className="text-2xl font-bold font-headline text-blue-600">
                {leads.filter(l => l.status === "SURVEY_SCHEDULED").length}
              </div>
              <span className="text-[11px] text-blue-700 font-label font-bold">Van route assigned</span>
            </div>
            <div className="card-structural p-5 rounded-2xl space-y-1">
              <span className="text-xs font-label text-on-surface-variant font-medium">Total Pipeline Value</span>
              <div className="text-2xl font-bold font-headline text-secondary">
                £{leads.reduce((sum, l) => sum + l.estimated_cost, 0).toLocaleString()}
              </div>
              <span className="text-[11px] text-secondary font-label font-bold">Indicative calculations</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card-structural p-4 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search by name, ref no, or postcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-surface-container-low border border-outline-variant focus:outline-none focus:border-primary text-primary"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto font-label">
              {["ALL", "PENDING", "SURVEY_SCHEDULED", "QUOTED", "COMPLETED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap",
                    selectedFilter === status
                      ? "bg-primary text-secondary-container"
                      : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                  )}
                >
                  {status.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          <div className="card-structural rounded-2xl overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface-container border-b border-outline-variant text-on-surface-variant font-label uppercase text-[11px]">
                    <th className="py-3.5 px-4 font-bold">Ref No.</th>
                    <th className="py-3.5 px-4 font-bold">Customer</th>
                    <th className="py-3.5 px-4 font-bold">Location</th>
                    <th className="py-3.5 px-4 font-bold">Service Required</th>
                    <th className="py-3.5 px-4 font-bold">Estimate</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant font-body">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary">{lead.reference_no}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-primary">{lead.customer_name}</div>
                        <div className="text-[11px] text-on-surface-variant">{lead.phone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                          <MapPin className="w-3 h-3 text-secondary" />
                          {lead.postcode}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {lead.service_type} ({lead.units} units)
                      </td>
                      <td className="py-3.5 px-4 font-bold text-primary">
                        £{lead.estimated_cost.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold font-label uppercase",
                          lead.status === "PENDING" && "bg-amber-100 text-amber-800 border border-amber-300",
                          lead.status === "SURVEY_SCHEDULED" && "bg-blue-100 text-blue-800 border border-blue-300",
                          lead.status === "QUOTED" && "bg-purple-100 text-purple-800 border border-purple-300",
                          lead.status === "COMPLETED" && "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        )}>
                          {lead.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteLead["status"])}
                          className="px-2 py-1 rounded-lg text-xs bg-surface-container border border-outline-variant font-label font-bold text-primary focus:outline-none"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SURVEY_SCHEDULED">Schedule Survey</option>
                          <option value="QUOTED">Mark Quoted</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOOGLE REVIEWS MANAGER */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="card-structural p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant pb-4">
              <div>
                <h3 className="font-headline font-bold text-lg text-primary">Google Maps Business Reviews Feed</h3>
                <p className="text-xs text-on-surface-variant font-body">
                  Manage all 33 live reviews scraped from The Window Doctor Google Maps profile.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/place/The+Window+Doctor/@51.93132,-1.193252,17z/data=!3m1!4b1!4m6!3m5!1s0x4876de7802f8af15:0x7b9ae6b36c259cb3!8m2!3d51.93132!4d-1.193252!16s%2Fg%2F11g889g7ww!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-label"
              >
                <span>Open Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
                        <Image src={rev.avatar_url} alt={rev.customer_name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xs text-primary">{rev.customer_name}</h4>
                        <span className="text-[11px] text-on-surface-variant block">{rev.customer_location}</span>
                      </div>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-body line-clamp-3">"{rev.review_text}"</p>

                  <div className="flex items-center justify-between pt-2 border-t border-outline-variant text-[11px] font-label">
                    <span className="text-secondary font-bold">{rev.service_category}</span>
                    <span className="text-emerald-700 font-medium">✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRICING & SERVICES EDITOR */}
      {activeTab === "services" && (
        <div className="card-structural p-6 rounded-2xl space-y-6">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary">Indicative Pricing & Service Estimates</h3>
            <p className="text-xs text-on-surface-variant font-body">
              Update guide pricing used by the Instant Quote Wizard and public catalogues.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
              <span className="text-xs font-bold text-secondary uppercase font-label">Misted Glass Repair</span>
              <div className="text-xl font-extrabold text-primary">£95.00 <span className="text-xs text-slate-500 font-normal">/ unit</span></div>
              <p className="text-[11px] text-on-surface-variant">Includes Pilkington Optitherm Low-E + Argon fill + 10-Yr Guarantee</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
              <span className="text-xs font-bold text-secondary uppercase font-label">Modern Casement Windows</span>
              <div className="text-xl font-extrabold text-primary">£380.00 <span className="text-xs text-slate-500 font-normal">/ frame</span></div>
              <p className="text-[11px] text-on-surface-variant">A++ Energy Rated, multi-point Yale security locks, bespoke colours</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
              <span className="text-xs font-bold text-secondary uppercase font-label">Entrance & Bi-Fold Doors</span>
              <div className="text-xl font-extrabold text-primary">£750.00 <span className="text-xs text-slate-500 font-normal">/ door</span></div>
              <p className="text-[11px] text-on-surface-variant">48mm solid composite core or slimline thermal aluminium</p>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
              <span className="text-xs font-bold text-secondary uppercase font-label">Warm Roof Conservatory</span>
              <div className="text-xl font-extrabold text-primary">£3,500.00 <span className="text-xs text-slate-500 font-normal">/ roof</span></div>
              <p className="text-[11px] text-on-surface-variant">0.15 U-Value lightweight Tapco tiled conversion</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
