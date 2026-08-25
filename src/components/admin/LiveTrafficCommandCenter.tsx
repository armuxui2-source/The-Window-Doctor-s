"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Activity,
  Radio,
  Users,
  Eye,
  Calculator,
  Compass,
  ArrowUpRight,
  RefreshCw,
  Zap,
  Globe,
  MapPin,
  Clock,
  Laptop,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Send,
  Sliders,
  Filter,
  Play,
  Pause,
  Trash2
} from "lucide-react";
import {
  GoogleAnalyticsLogo,
  GoogleTagManagerLogo,
  GoogleSearchConsoleLogo,
  GoogleAdsLogo,
  MetaLogo,
  LineLogo,
  GoogleMapsLogo,
  SupabaseLogo,
  MicrosoftLogo,
  AppleLogo,
  AndroidLogo
} from "./PlatformLogos";
import { cn } from "@/lib/utils";

interface LiveVisitor {
  id: string;
  ip: string;
  town: string;
  postcode: string;
  page: string;
  pageTitle: string;
  device: "Windows" | "macOS" | "iOS" | "Android";
  source: "Google Organic" | "Google Ads" | "Meta Campaign" | "Direct / PWA" | "LINE Official";
  timeOnSite: string;
  isActiveNow: boolean;
}

interface LiveEvent {
  id: string;
  timestamp: string;
  type: "PAGE_VIEW" | "QUOTE_STEP" | "LEAD_SUBMITTED" | "GA4_EVENT" | "META_PIXEL" | "LINE_CLICK" | "PHONE_CLICK" | "SUPABASE_SYNC";
  platform: "ga4" | "meta" | "line" | "google_ads" | "supabase" | "system" | "phone";
  title: string;
  details: string;
  location: string;
}

const INITIAL_VISITORS: LiveVisitor[] = [
  {
    id: "vis-1",
    ip: "86.142.104.xx",
    town: "Bicester",
    postcode: "OX26",
    page: "/quote",
    pageTitle: "Instant Glazing Quote Engine",
    device: "Windows",
    source: "Google Organic",
    timeOnSite: "4m 12s",
    isActiveNow: true
  },
  {
    id: "vis-2",
    ip: "82.132.221.xx",
    town: "Oxford Central",
    postcode: "OX1",
    page: "/services/misted-double-glazing",
    pageTitle: "Misted Double Glazing Repair",
    device: "iOS",
    source: "Google Ads",
    timeOnSite: "2m 45s",
    isActiveNow: true
  },
  {
    id: "vis-3",
    ip: "185.12.89.xx",
    town: "Banbury",
    postcode: "OX16",
    page: "/projects",
    pageTitle: "Before & After Glazing Portfolio",
    device: "macOS",
    source: "Meta Campaign",
    timeOnSite: "1m 30s",
    isActiveNow: true
  },
  {
    id: "vis-4",
    ip: "92.40.178.xx",
    town: "Kidlington",
    postcode: "OX5",
    page: "/",
    pageTitle: "Homepage • 40-Year Master Glaziers",
    device: "Android",
    source: "Direct / PWA",
    timeOnSite: "55s",
    isActiveNow: true
  },
  {
    id: "vis-5",
    ip: "81.155.67.xx",
    town: "Witney",
    postcode: "OX28",
    page: "/quote",
    pageTitle: "Instant Glazing Quote Engine",
    device: "Windows",
    source: "Google Organic",
    timeOnSite: "3m 10s",
    isActiveNow: true
  }
];

const INITIAL_EVENTS: LiveEvent[] = [
  {
    id: "evt-1",
    timestamp: "Just now",
    type: "QUOTE_STEP",
    platform: "ga4",
    title: "Quote Step 3: Triple Glazing A++ Selected",
    details: "6 Heritage Casement Windows • £380/yr estimated energy savings",
    location: "Bicester (OX26)"
  },
  {
    id: "evt-2",
    timestamp: "12s ago",
    type: "META_PIXEL",
    platform: "meta",
    title: "Meta Pixel Event: ViewContent (Glazing Service)",
    details: "misted-double-glazing • Category: Emergency Glass Repair",
    location: "Oxford (OX1)"
  },
  {
    id: "evt-3",
    timestamp: "35s ago",
    type: "LINE_CLICK",
    platform: "line",
    title: "LINE Official Chat Initiated",
    details: "Visitor clicked Fast WhatsApp / LINE Glazier Consultation",
    location: "Banbury (OX16)"
  },
  {
    id: "evt-4",
    timestamp: "1m ago",
    type: "LEAD_SUBMITTED",
    platform: "supabase",
    title: "New Survey Booked: 10-Yr Guarantee Inquiry",
    details: "Customer in Kingsmere, Bicester • Status: Pending Dispatch",
    location: "Bicester (OX26)"
  },
  {
    id: "evt-5",
    timestamp: "2m ago",
    type: "PHONE_CLICK",
    platform: "phone",
    title: "Direct Phone Call: 01869 246 648",
    details: "Emergency Glazing Hotline tap from Mobile Header",
    location: "Kidlington (OX5)"
  }
];

export default function LiveTrafficCommandCenter() {
  const [visitors, setVisitors] = useState<LiveVisitor[]>(INITIAL_VISITORS);
  const [events, setEvents] = useState<LiveEvent[]>(INITIAL_EVENTS);
  const [activeCount, setActiveCount] = useState(14);
  const [isSimulating, setIsSimulating] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "quote" | "marketing" | "leads">("all");
  const [pageviewsPerMin, setPageviewsPerMin] = useState(38);
  const [lastHeartbeat, setLastHeartbeat] = useState(new Date().toLocaleTimeString());

  // Heartbeat live simulation timer
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      const towns = [
        { name: "Bicester", post: "OX26" },
        { name: "Oxford Central", post: "OX1" },
        { name: "Banbury", post: "OX16" },
        { name: "Witney", post: "OX28" },
        { name: "Kidlington", post: "OX5" },
        { name: "Abingdon", post: "OX14" },
        { name: "Thame", post: "OX9" },
        { name: "Didcot", post: "OX11" }
      ];
      const randomTown = towns[Math.floor(Math.random() * towns.length)];

      const eventTemplates = [
        {
          type: "PAGE_VIEW" as const,
          platform: "ga4" as const,
          title: `Pageview: /quote (Instant Estimator)`,
          details: `Visitor landed from Google Organic Search • Clean Load 142ms`
        },
        {
          type: "QUOTE_STEP" as const,
          platform: "system" as const,
          title: `Quote Calculation: Acoustic Glass Upgrade`,
          details: `Selected 4 Windows + Noise Reduction Laminated Spec`
        },
        {
          type: "GA4_EVENT" as const,
          platform: "ga4" as const,
          title: `GA4 Custom Event: calculate_energy_roi`,
          details: `Event payload dispatched to Measurement ID G-WNDWDR83`
        },
        {
          type: "META_PIXEL" as const,
          platform: "meta" as const,
          title: `Meta CAPI Event: InitiateCheckout`,
          details: `Server-side hashed IP & UserAgent sent to Graph API v19.0`
        },
        {
          type: "LINE_CLICK" as const,
          platform: "line" as const,
          title: `LINE Official Consultation Tapped`,
          details: `Glazier photo assessment query dispatched`
        },
        {
          type: "PHONE_CLICK" as const,
          platform: "phone" as const,
          title: `Hotline Click: 01869 246 648`,
          details: `FENSA Master Glazier Consultation Clicked`
        }
      ];

      const chosen = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      const newEvent: LiveEvent = {
        id: `evt-${Date.now()}`,
        timestamp: "Just now",
        type: chosen.type,
        platform: chosen.platform,
        title: chosen.title,
        details: chosen.details,
        location: `${randomTown.name} (${randomTown.post})`
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 19)]);
      setActiveCount((prev) => Math.max(8, Math.min(26, prev + (Math.random() > 0.5 ? 1 : -1))));
      setPageviewsPerMin((prev) => Math.max(22, Math.min(54, prev + (Math.random() > 0.5 ? 2 : -2))));
      setLastHeartbeat(new Date().toLocaleTimeString());
    }, 3800);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "quote") return e.type === "QUOTE_STEP";
    if (selectedFilter === "marketing") return e.platform === "ga4" || e.platform === "meta" || e.platform === "line";
    if (selectedFilter === "leads") return e.type === "LEAD_SUBMITTED" || e.type === "PHONE_CLICK";
    return true;
  });

  const getPlatformIcon = (platform: LiveEvent["platform"]) => {
    switch (platform) {
      case "ga4":
        return <GoogleAnalyticsLogo className="w-4 h-4 shrink-0" />;
      case "meta":
        return <MetaLogo className="w-4 h-4 shrink-0" />;
      case "line":
        return <LineLogo className="w-4 h-4 shrink-0" />;
      case "google_ads":
        return <GoogleAdsLogo className="w-4 h-4 shrink-0" />;
      case "supabase":
        return <SupabaseLogo className="w-4 h-4 shrink-0" />;
      case "phone":
        return <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />;
      default:
        return <Zap className="w-4 h-4 text-amber-500 shrink-0" />;
    }
  };

  const getDeviceIcon = (device: LiveVisitor["device"]) => {
    switch (device) {
      case "Windows":
        return <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />;
      case "macOS":
      case "iOS":
        return <AppleLogo className="w-3.5 h-3.5 text-slate-800 shrink-0" />;
      case "Android":
        return <AndroidLogo className="w-3.5 h-3.5 shrink-0" />;
      default:
        return <Laptop className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6 font-body text-slate-800 animate-fade-in">
      
      {/* 1. TOP TELEMETRY CONTROL HEADER (Minimalist Dark Slate) */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-sm relative overflow-hidden border border-slate-800">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold font-mono flex items-center gap-1.5 shadow-2xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span>LIVE TELEMETRY STREAM</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-mono whitespace-nowrap">
                Heartbeat: {lastHeartbeat}
              </span>
            </div>

            <h2 className="font-headline font-bold text-xl sm:text-2xl text-white tracking-tight">
              Real-Time Traffic & Visitor Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-label max-w-2xl leading-relaxed">
              Live monitoring of active visitors across Oxfordshire, interactive quote calculations, phone conversions, and real-time marketing pixel telemetry.
            </p>
          </div>

          {/* Stream Controls */}
          <div className="flex items-center gap-2 self-start lg:self-center bg-white/5 p-1.5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setIsSimulating(!isSimulating)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold font-label flex items-center gap-1.5 transition-all whitespace-nowrap shadow-2xs",
                isSimulating
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-amber-500 text-white hover:bg-amber-400"
              )}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 shrink-0" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 shrink-0" />
                  <span>Resume Stream</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setEvents([])}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Clear Event Log"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/10">
          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 font-label uppercase tracking-wider whitespace-nowrap">
              Active Visitors Now
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-2xl text-white font-mono">
                {activeCount}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold font-mono whitespace-nowrap">
                +4 Oxfordshire
              </span>
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 font-label uppercase tracking-wider whitespace-nowrap">
              Live Pageviews
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-2xl text-amber-300 font-mono">
                {pageviewsPerMin}
              </span>
              <span className="text-[11px] text-slate-400 font-label whitespace-nowrap">
                / min
              </span>
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 font-label uppercase tracking-wider whitespace-nowrap">
              Active Quote Engine
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-2xl text-emerald-400 font-mono">
                5
              </span>
              <span className="text-[11px] text-slate-400 font-label whitespace-nowrap">
                in progress
              </span>
            </div>
          </div>

          <div className="bg-white/5 p-3.5 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 font-label uppercase tracking-wider whitespace-nowrap">
              Top Regional Hub
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-base text-white whitespace-nowrap truncate">
                Bicester
              </span>
              <span className="text-[11px] text-amber-300 font-mono whitespace-nowrap">
                44%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ======================================================================= */}
      {/* 2. MAIN 2-COLUMN COMMAND CENTER LAYOUT                                   */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LIVE EVENT STREAM & MARKETING EVENT MONITOR (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary text-secondary flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-sm sm:text-base text-primary whitespace-nowrap">
                    Live Event Stream & Marketing Triggers
                  </h3>
                  <span className="text-[11px] text-slate-500 font-label">
                    Real-time telemetry from GA4, Meta CAPI, LINE, and Quote Engine
                  </span>
                </div>
              </div>

              {/* Event Filter Pills */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedFilter("all")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap",
                    selectedFilter === "all" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  All Events
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter("quote")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap",
                    selectedFilter === "quote" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Quotes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter("marketing")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap",
                    selectedFilter === "marketing" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Pixels & APIs
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter("leads")}
                  className={cn(
                    "px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap",
                    selectedFilter === "leads" ? "bg-white text-primary shadow-xs" : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  Hotlines & Leads
                </button>
              </div>
            </div>

            {/* Event List Feed */}
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredEvents.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs font-label">
                  No events logged in this category. Waiting for incoming telemetry...
                </div>
              ) : (
                filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex items-start justify-between gap-3 font-label text-xs shadow-xs animate-slide-in"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0 mt-0.5">
                        {getPlatformIcon(evt.platform)}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 truncate">
                            {evt.title}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] font-mono whitespace-nowrap">
                            {evt.location}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 truncate">
                          {evt.details}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono shrink-0 whitespace-nowrap mt-0.5">
                      {evt.timestamp}
                    </span>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Connected Marketing Pixel Status Radar */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-sm space-y-4 font-label">
            <div className="flex items-center justify-between">
              <span className="font-headline font-bold text-sm text-secondary flex items-center gap-2 whitespace-nowrap">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Connected Marketing Pixel Health Monitor</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">100% Operational</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <GoogleAnalyticsLogo className="w-4 h-4 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="font-bold text-xs text-slate-200 whitespace-nowrap">GA4 Stream</div>
                <div className="text-[10px] text-slate-400 font-mono">G-WNDWDR83</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <MetaLogo className="w-4 h-4 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="font-bold text-xs text-slate-200 whitespace-nowrap">Meta CAPI</div>
                <div className="text-[10px] text-slate-400 font-mono">Pixel #829410</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <LineLogo className="w-4 h-4 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="font-bold text-xs text-slate-200 whitespace-nowrap">LINE Webhook</div>
                <div className="text-[10px] text-slate-400 font-mono">@windowdoc</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <SupabaseLogo className="w-4 h-4 shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <div className="font-bold text-xs text-slate-200 whitespace-nowrap">Supabase Realtime</div>
                <div className="text-[10px] text-slate-400 font-mono">Postgres 16</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: ACTIVE VISITORS & OXFORDSHIRE GEOGRAPHY (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Live Visitors Feed */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary text-secondary flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-headline font-extrabold text-sm sm:text-base text-primary whitespace-nowrap">
                    Active Online Visitors ({visitors.length})
                  </h3>
                  <span className="text-[11px] text-slate-500 font-label">
                    Live sessions active on website
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold font-mono whitespace-nowrap">
                Live Pulse
              </span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {visitors.map((vis) => (
                <div
                  key={vis.id}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all space-y-2 font-label text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="font-bold text-slate-900 flex items-center gap-1.5 whitespace-nowrap">
                        <MapPin className="w-3 h-3 text-secondary shrink-0" />
                        <span>{vis.town}</span>
                        <span className="text-slate-400 font-mono font-normal">({vis.postcode})</span>
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                      {getDeviceIcon(vis.device)}
                      <span>{vis.device}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                    <span className="font-mono text-primary font-bold truncate max-w-[180px]">
                      {vis.page}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] whitespace-nowrap font-mono">
                      {vis.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Oxfordshire Heat Distribution */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 font-label">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-headline font-bold text-sm text-primary flex items-center gap-2 whitespace-nowrap">
                <Compass className="w-4 h-4 text-secondary shrink-0" />
                <span>Regional Oxfordshire Traffic Share</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Postcodes</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-bold">
                  <span className="whitespace-nowrap">Bicester & Surrounds (OX25, OX26, OX27)</span>
                  <span className="font-mono text-primary">44%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "44%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-bold">
                  <span className="whitespace-nowrap">Oxford Central & North (OX1, OX2, OX3)</span>
                  <span className="font-mono text-primary">28%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: "28%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-bold">
                  <span className="whitespace-nowrap">Banbury & Cherwell Valley (OX15, OX16)</span>
                  <span className="font-mono text-primary">16%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "16%" }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-bold">
                  <span className="whitespace-nowrap">Witney & West Oxfordshire (OX28, OX29)</span>
                  <span className="font-mono text-primary">12%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full transition-all duration-500" style={{ width: "12%" }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
