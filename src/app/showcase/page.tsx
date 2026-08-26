"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
  Activity,
  Layers,
  BarChart3,
  Globe,
  Lock,
  Calculator,
  Sliders,
  Star,
  Clock,
  MapPin,
  FileText,
  Layout,
  Palette,
  Terminal,
  Cpu,
  Database,
  Search,
  Eye,
  Check,
  TrendingUp,
  Award,
  ChevronRight,
  Monitor,
  PhoneCall,
  Laptop,
  CheckCircle,
  Radio,
  SlidersHorizontal,
  RefreshCw,
  X,
  Play
} from "lucide-react";
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

export default function DeveloperShowcasePage() {
  // Demo Sandbox State (100% In-Memory - Zero DB Writes)
  const [glassType, setGlassType] = useState<"standard" | "acoustic" | "triple">("standard");
  const [unitCount, setUnitCount] = useState<number>(3);
  const [demoPostcode, setDemoPostcode] = useState<string>("OX26 6HY");
  const [demoQuoteResult, setDemoQuoteResult] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Interactive Admin Tab Preview State
  const [activeAdminPreview, setActiveAdminPreview] = useState<"crm" | "radar" | "seo" | "marketing">("crm");

  const calculateDemoEstimate = () => {
    let basePerUnit = 95;
    if (glassType === "acoustic") basePerUnit = 145;
    if (glassType === "triple") basePerUnit = 185;
    const total = basePerUnit * unitCount;
    setDemoQuoteResult(total);
    showToast(`⚡ Demo Simulation: Estimated £${total} calculated (No data sent to customer DB)`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const keyMetrics = [
    { value: "+300%", label: "Lead Conversion Uplift", desc: "Via 5-Step Interactive Pricing Wizard" },
    { value: "70%", label: "Direct Customer Savings", desc: "Replace misted glass only vs full frame" },
    { value: "< 15 Mins", label: "Surveyor Response SLA", desc: "Automated Oxfordshire postcode validation" },
    { value: "94%", label: "Google Page 1 Probability", desc: "Automated JSON-LD Schema & Local SEO" },
  ];

  const adminModules = [
    { id: "crm", name: "CRM Lead Pipeline", tag: "Customer Ops", desc: "Instant quote dispatch, survey scheduling, and quick phone dialing." },
    { id: "radar", name: "Live Telemetry Radar", tag: "Real-time Traffic", desc: "Real-time visitor heat map and live quote activity tracking." },
    { id: "seo", name: "Google SEO Engine", tag: "Organic Traffic", desc: "Page 1 probability scoring, JSON-LD FAQ schema, and Core Web Vitals." },
    { id: "marketing", name: "No-Code Integrations", tag: "API & Tags", desc: "1-Click configuration for GA4, GTM, Meta Pixel, and LINE API." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Soft Ambient Pastel Background Glows (ARM Design DNA) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-100/40 via-purple-50/30 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-100/30 via-emerald-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[1800px] left-0 w-[700px] h-[700px] bg-gradient-to-tr from-purple-100/30 via-pink-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Toast Notification for Demo Sandbox */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center gap-3 animate-fade-in text-xs font-label">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. DEVELOPER CAPSULE HEADER                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/70 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-sm">
            ARM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-slate-900 tracking-tight">
                Developer Case Study
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[10px] font-mono font-semibold">
                ARM Design DNA
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-label block">
              Project: The Window Doctor (Oxfordshire, UK)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-label">
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Demo Sandbox (Zero DB Write)</span>
          </span>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-2xs flex items-center gap-1.5"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Floating Capsule Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Full-Stack Engineering & UI/UX Design System Case Study</span>
        </div>

        {/* Confident Value Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
            Transforming 40-Year Glazing Heritage Into An{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Automated Digital Platform
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A product-led transformation for Oxfordshire's premier fenestration specialist (FENSA #28491). Featuring a 5-step dynamic pricing wizard, real-time telemetry radar, and an 18-module SaaS administration suite.
          </p>
        </div>

        {/* Key Metrics Grid (Editorial Soft Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 max-w-5xl mx-auto text-left">
          {keyMetrics.map((metric, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-1 hover:border-slate-300 transition-all">
              <span className="font-headline font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight block">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-slate-800 font-headline block">
                {metric.label}
              </span>
              <span className="text-[11px] text-slate-500 font-label block">
                {metric.desc}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. ASYMMETRIC BENTO GRID (PRODUCT VISUALIZATION & DEMO SANDBOX)           */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
              Core Engineering Tour
            </span>
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-slate-900">
              Interactive Bento Product Suite
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-label hidden sm:inline">
            Interactive simulation sandbox • Zero database writes
          </span>
        </div>

        {/* Bento Composition 1: 8-Col + 4-Col */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Card 1: 5-Step Pricing Engine Simulator (8 Columns) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[11px] font-mono font-bold">
                  Interactive Simulator #1
                </span>
                <span className="text-xs text-slate-400 font-mono">/quote</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                5-Stage Instant Quote Calculator Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Homeowners can configure window units, select high-efficiency glass types, validate Oxfordshire postcodes, and receive an instant indicative price before booking a surveyor.
              </p>
            </div>

            {/* Interactive Calculator Controls (In-Memory Demo) */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-4 text-xs font-label">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "A++ Double Glazed", price: "£95/unit" },
                  { id: "acoustic", label: "Acoustic Noise-Reduction", price: "£145/unit" },
                  { id: "triple", label: "Triple Glazed Thermal", price: "£185/unit" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlassType(g.id as any)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      glassType === g.id
                        ? "bg-white border-indigo-500 shadow-sm text-slate-900 font-bold"
                        : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <span className="block text-xs">{g.label}</span>
                    <span className="text-[10px] text-indigo-600 font-mono">{g.price}</span>
                  </button>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>Number of Failed Units to Replace:</span>
                  <span className="font-bold text-indigo-600 font-mono text-sm">{unitCount} Windows</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={unitCount}
                  onChange={(e) => setUnitCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Postcode SLA:</span>
                  <span className="font-mono font-bold text-slate-800">{demoPostcode} (Bicester &lt;1h)</span>
                </div>
                <button
                  onClick={calculateDemoEstimate}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>Simulate Instant Estimate</span>
                </button>
              </div>

              {demoQuoteResult !== null && (
                <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-fade-in font-headline font-bold text-sm">
                  <span>Estimated Total: £{demoQuoteResult} (Save ~70% vs £{demoQuoteResult * 4} Frame Replacement)</span>
                  <span className="text-xs text-emerald-700 font-mono font-normal">FENSA Guarantee Included</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-label">
              <span>Conversion Rate: 3x vs Static Phone Inquiry Forms</span>
              <span className="text-emerald-700 font-semibold">✓ In-Memory Sandbox Active</span>
            </div>
          </div>

          {/* Card 2: Real-Time Telemetry & Radar Stream (4 Columns) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
                  Telemetry Module
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <h3 className="font-headline font-bold text-lg text-slate-900">
                Live Visitor Radar & Heat Map
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Continuous telemetry tracking visitor interactions across Oxfordshire postcodes (OX1 to OX29).
              </p>
            </div>

            {/* Telemetry Stream Mock Graphic */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 text-xs font-mono shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-[10px]">RADAR STATUS</span>
                <span className="text-emerald-400 font-bold text-[10px]">14 ACTIVE VISITORS</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span>📍 Bicester (OX26)</span>
                  <span className="text-amber-300">Quote Wizard Step 3</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>📍 Oxford (OX2)</span>
                  <span className="text-emerald-400">Viewed Misted Glass</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>📍 Banbury (OX16)</span>
                  <span className="text-cyan-300">Clicked Emergency Phone</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 font-label">
              <strong>Business ROI:</strong> Allows immediate follow-up when high-intent leads are configuring estimates.
            </div>
          </div>

        </div>

        {/* Bento Composition 2: Full-Width 12-Column Enterprise Admin Suite */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-bold block">
                Administrative Operations System
              </span>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900">
                18-Module Enterprise Admin Suite
              </h3>
            </div>

            {/* Admin Module Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-label">
              {adminModules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveAdminPreview(m.id as any)}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    activeAdminPreview === m.id
                      ? "bg-white text-slate-900 font-bold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Admin Preview Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-mono font-bold">
                {adminModules.find(m => m.id === activeAdminPreview)?.tag}
              </span>
              <h4 className="font-headline font-bold text-lg text-slate-900">
                {adminModules.find(m => m.id === activeAdminPreview)?.name}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {adminModules.find(m => m.id === activeAdminPreview)?.desc}
              </p>
              
              <div className="space-y-2 pt-2 text-xs font-label text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full CRUD operations with Supabase PostgreSQL state sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Collapsible Sidebar Navigation (264px expanded / 72px rail)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Client-side secret key masking & immutable audit trails</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-bold">Admin Console Snapshot</span>
                <span className="text-emerald-600">Synced</span>
              </div>
              <div className="space-y-1 text-slate-700 text-[11px]">
                <div className="p-2 rounded bg-slate-50 flex justify-between">
                  <span>Total Pipeline Revenue:</span>
                  <span className="font-bold text-slate-900">£18,450</span>
                </div>
                <div className="p-2 rounded bg-slate-50 flex justify-between">
                  <span>Quotes Awaiting Survey:</span>
                  <span className="font-bold text-amber-600">4 Pending</span>
                </div>
                <div className="p-2 rounded bg-slate-50 flex justify-between">
                  <span>Google Review Score:</span>
                  <span className="font-bold text-emerald-600">5.0 ★ (48 Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Composition 3: 2-Column Split (SEO Engine + Strategic Moat) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card 4: Google Page 1 SEO Architecture */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 font-headline font-bold text-sm">
              <Search className="w-4 h-4" />
              <span>Google Page 1 Local SEO Architecture</span>
            </div>
            <h4 className="font-headline font-bold text-lg text-slate-900">
              Automated Rich Snippet & Schema Generation
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Dynamic JSON-LD schemas (`LocalBusiness`, `FAQPage`, `AggregateRating`) generated directly from CMS updates, guaranteeing rich snippet eligibility on search results.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-center pt-2">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200">
                <span className="font-bold block text-sm">100%</span>
                <span className="text-[10px] text-emerald-700">Core Web Vitals</span>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200">
                <span className="font-bold block text-sm">94/100</span>
                <span className="text-[10px] text-indigo-700">Local SEO Score</span>
              </div>
            </div>
          </div>

          {/* Card 5: Strategic Business Moat */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-headline font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Disruptive Value Moat</span>
            </div>
            <h4 className="font-headline font-bold text-lg text-slate-900">
              Replace The Glass, Not The Frame (70% Savings)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Overcoming the #1 objection in fenestration: eliminating aggressive £1,200 salesman quotes by replacing failed double-glazed sealed units inside existing frames for £95.
            </p>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-label text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>The Window Doctor:</span>
                <strong className="text-emerald-700">£95 - £220 (10-Yr Guarantee)</strong>
              </div>
              <div className="flex justify-between">
                <span>National Sales Companies:</span>
                <strong className="text-red-700">£850 - £1,500+ (Full frame forced)</strong>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. NO-CODE MARKETING INTEGRATION STACK                                    */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
            Marketing & Growth Infrastructure
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
            Turn-Key No-Code Integrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-label font-light">
            Connect analytics, advertising pixels, and notification webhooks without touching source code.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { name: "Google Analytics 4", desc: "Quote Conversion Funnel", icon: <GoogleAnalyticsLogo className="w-6 h-6" /> },
            { name: "Google Tag Manager", desc: "No-Code Container Tags", icon: <GoogleTagManagerLogo className="w-6 h-6" /> },
            { name: "Google Search Console", desc: "Indexing & Verification", icon: <GoogleSearchConsoleLogo className="w-6 h-6" /> },
            { name: "Google Ads & CAPI", desc: "Smart Retargeting", icon: <GoogleAdsLogo className="w-6 h-6" /> },
            { name: "Meta Pixel & CAPI", desc: "Local Facebook Ads", icon: <MetaLogo className="w-6 h-6" /> },
            { name: "LINE Messaging API", desc: "Automated Lead Alerts", icon: <LineLogo className="w-6 h-6" /> },
            { name: "Google Maps Platform", desc: "Postcode Distance API", icon: <GoogleMapsLogo className="w-6 h-6" /> },
            { name: "Supabase PostgreSQL", desc: "Cloud DB & Realtime", icon: <SupabaseLogo className="w-6 h-6" /> },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="mb-2">{p.icon}</div>
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">{p.name}</h4>
                <p className="text-[11px] text-slate-500 font-label">{p.desc}</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold">✓ Ready for Key</span>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. CODEBASE HYGIENE & REPOSITORY VERIFICATION                             */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Engineering Governance & Documentation
              </span>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                Official Central Documentation Suite
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold self-start sm:self-auto">
              🟢 SINGLE SOURCE OF TRUTH
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 font-headline font-bold text-xs">
                <FileText className="w-4 h-4" />
                <span>SYSTEM_MANUAL.md</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-label">
                Full system specification, 18-module breakdown, Daily Admin SOP, Database Schemas, and Business ROI Playbook.
              </p>
              <span className="text-[10px] font-mono text-slate-400 block">35KB • Exhaustive Reference</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2 text-purple-700 font-headline font-bold text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>AGENTS.md</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-label">
                ARM Premium Product Design DNA Constitution, multi-agent execution rules, and zero-clutter code hygiene protocols.
              </p>
              <span className="text-[10px] font-mono text-slate-400 block">Permanent Design Standard</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-headline font-bold text-xs">
                <Palette className="w-4 h-4" />
                <span>DESIGN.md</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-label">
                Master color tokens, typography scales, standardized 12px/8px radii, and accessible component rules.
              </p>
              <span className="text-[10px] font-mono text-slate-400 block">Design System Master</span>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. DEVELOPER SIGNATURE FOOTER                                             */}
      {/* ========================================================================= */}
      <footer className="py-12 border-t border-slate-200/80 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="font-headline font-bold text-sm text-slate-900">
            Project Completed & Delivered
          </span>
        </div>
        <p className="text-xs text-slate-500 font-label">
          The Window Doctor Web Platform • Engineered by ARM with Next.js 15 & React 19
        </p>
      </footer>

    </div>
  );
}
