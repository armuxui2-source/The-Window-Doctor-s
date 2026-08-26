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
  Play,
  Share2,
  Code2,
  Boxes,
  Compass,
  Flame,
  Key,
  FolderGit2,
  Briefcase,
  Layers3,
  MousePointerClick,
  Send,
  MessageSquareQuote,
  Github,
  Mail,
  Linkedin,
  MoveUpRight,
  Workflow,
  Component,
  Maximize2,
  SlidersVertical,
  CheckCheck
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

// Bespoke High-Definition SVG Icons for Tech & Architecture
function NextJsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="90" fill="#000"/>
      <path d="M149.508 157.508L69.142 54H54V125.97H66.6136V69.3831L139.699 164.845C143.155 162.628 146.438 160.17 149.508 157.508Z" fill="url(#next_grad)"/>
      <path d="M115 54H127.5V126H115V54Z" fill="url(#next_grad2)"/>
      <defs>
        <linearGradient id="next_grad" x1="109.5" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="next_grad2" x1="121.25" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReactIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="2.05" fill="#00D8FF"/>
      <g stroke="#00D8FF" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

function TypeScriptIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="20" fill="#3178C6"/>
      <path d="M72.2 87.5C73.8 92.4 78 95.8 84.7 95.8C91.7 95.8 96.6 92.2 96.6 86.8C96.6 74.3 75.3 76.6 75.3 60.7C75.3 52.8 81.6 47 91.5 47C99.2 47 104.7 50.8 107.5 56.4L98.6 62.3C97.1 58.7 94.6 56.7 91.1 56.7C86.7 56.7 84 59.2 84 62.7C84 74.2 105.7 72 105.7 87.7C105.7 96.8 98.4 104.5 85.3 104.5C74.6 104.5 66.8 99.4 63.2 91.5L72.2 87.5ZM55.5 56.9H42.1V103.5H32.6V56.9H19.2V48.5H55.5V56.9Z" fill="white"/>
    </svg>
  );
}

function TailwindIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
    </svg>
  );
}

function VercelIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L24 22H0L12 1Z" fill="#000000"/>
    </svg>
  );
}

export default function ARMProductStudioCaseStudy() {
  // Interactive Sandbox State (100% In-Memory - Zero DB Writes)
  const [activeModule, setActiveModule] = useState<"calculator" | "radar" | "seo" | "marketing">("calculator");
  const [glassType, setGlassType] = useState<"standard" | "acoustic" | "triple">("standard");
  const [unitCount, setUnitCount] = useState<number>(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const calculateEstimate = () => {
    let base = 95;
    if (glassType === "acoustic") base = 145;
    if (glassType === "triple") base = 185;
    const total = base * unitCount;
    showToast(`Simulation Calculated: £${total} for ${unitCount} units (In-Memory Simulator)`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const projectImpacts = [
    { value: "+300%", label: "Lead Acquisition Velocity", sub: "5-Step Automated Pricing Engine vs Static Forms" },
    { value: "70%", label: "Consumer Savings Index", sub: "Replacing failed glass sealed units (£95 vs £1,200)" },
    { value: "< 15 Mins", label: "Surveyor SLA Validation", sub: "Automated Oxfordshire postcode distance routing" },
    { value: "94 / 100", label: "Google Local SEO Health", sub: "Automated JSON-LD LocalBusiness & FAQ Schema" },
  ];

  const designTokens = [
    { name: "Deep Heritage Navy", hex: "#00081E", role: "Primary Brand Canvas", fg: "text-white" },
    { name: "Container Navy", hex: "#0A1F44", role: "Elevation & Card Accent", fg: "text-white" },
    { name: "Luxury Gold", hex: "#FED488", role: "Badges & Focal Highlights", fg: "text-slate-900" },
    { name: "Deep Gold", hex: "#C5A059", role: "Secondary Accents", fg: "text-white" },
    { name: "Live Emerald", hex: "#10B981", role: "Real-Time Telemetry Status", fg: "text-white" },
    { name: "Clean Surface", hex: "#FFFFFF", role: "Minimalist Soft Cards", fg: "text-slate-900", isBorder: true },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-body selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      
      {/* Soft Iridescent Ambient Gradients (ARM Design DNA) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-indigo-100/50 via-purple-50/35 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[900px] right-0 w-[700px] h-[700px] bg-gradient-to-bl from-cyan-100/30 via-emerald-50/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[2200px] left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-100/30 via-pink-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 flex items-center gap-3 animate-fade-in text-xs font-label">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. STUDIO CAPSULE HEADER (STANDALONE)                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/75 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-headline font-bold flex items-center justify-center text-xs shadow-sm">
            ARM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-sm text-slate-900 tracking-tight">
                ARM Product Studio
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-[10px] font-mono font-semibold">
                Case Study #01
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-label block">
              The Window Doctor (Oxfordshire, UK) • Enterprise Transformation
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-label">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Demo Sandbox</span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-2xs flex items-center gap-1.5 active:scale-95"
          >
            <span>Launch Live Build</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-mono text-[11px] font-semibold text-indigo-700">ENTERPRISE CASE STUDY</span>
          <span className="text-slate-300">•</span>
          <span>Next.js 15 & Supabase Operating Platform</span>
        </div>

        {/* Confident Value Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
            Transforming A 40-Year Glazing Craft Into An{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Automated Digital Platform
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Designed and engineered by ARM. A category-defining web system for Oxfordshire's premier fenestration specialist (FENSA #28491), featuring a 5-step dynamic pricing wizard, live visitor radar telemetry, and an 18-module SaaS administration suite.
          </p>
        </div>

        {/* 4 Core Impact Numbers Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 max-w-5xl mx-auto text-left">
          {projectImpacts.map((metric, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-1 hover:border-slate-300 transition-all">
              <span className="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight block">
                {metric.value}
              </span>
              <span className="text-xs font-bold text-slate-800 font-headline block">
                {metric.label}
              </span>
              <span className="text-[11px] text-slate-500 font-label block">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. ASYMMETRIC BENTO PRODUCT TOUR (PRODUCT UI VISUALIZATION)              */}
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

        {/* Bento Row 1: 8-Column Large Calculator + 4-Column Live Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Bento Card 1: 5-Step Pricing Engine Simulator (8 Columns) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[11px] font-mono font-bold">
                  Interactive Simulator #1
                </span>
                <span className="text-xs text-slate-400 font-mono">/quote</span>
              </div>
              <h3 className="font-headline font-bold text-xl text-slate-900">
                5-Stage Instant Pricing Engine Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Homeowners can configure window units, select high-efficiency glass specifications, validate Oxfordshire postcode SLA times, and receive an instant indicative price before booking a surveyor.
              </p>
            </div>

            {/* Interactive In-Memory Controls */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-4 text-xs font-label">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "standard", label: "A++ Double Glazed", price: "£95/unit" },
                  { id: "acoustic", label: "Acoustic Noise-Reduction", price: "£145/unit" },
                  { id: "triple", label: "Triple Glazed Thermal", price: "£185/unit" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGlassType(g.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
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
                  <span className="font-mono font-bold text-slate-800">OX26 6HY (Bicester &lt;1h)</span>
                </div>
                <button
                  onClick={calculateEstimate}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>Simulate Instant Estimate</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-label">
              <span>Conversion Velocity: 3x vs Static Forms</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In-Memory Sandbox Active
              </span>
            </div>
          </div>

          {/* Bento Card 2: Real-Time Telemetry & Radar Stream (4 Columns) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between">
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

            {/* Telemetry Stream Mock Graphic with Pure Vector Icons */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 text-xs font-mono shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-[10px]">RADAR STATUS</span>
                <span className="text-emerald-400 font-bold text-[10px]">14 ACTIVE NODES</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><MapPin className="w-3 h-3 text-indigo-400 shrink-0 mr-1.5" /> Bicester (OX26)</span>
                  <span className="text-amber-300 font-medium">Quote Wizard Step 3</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><MapPin className="w-3 h-3 text-emerald-400 shrink-0 mr-1.5" /> Oxford (OX2)</span>
                  <span className="text-emerald-400 font-medium">Viewed Misted Glass</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center"><MapPin className="w-3 h-3 text-cyan-400 shrink-0 mr-1.5" /> Banbury (OX16)</span>
                  <span className="text-cyan-300 font-medium">Emergency Hotline Click</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 font-label">
              <strong>Business ROI:</strong> Instant phone follow-up when high-intent leads are configuring estimates.
            </div>
          </div>

        </div>

        {/* Bento Row 2: Full-Width 12-Column Enterprise Admin Suite */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-bold block">
                Administrative Operating System
              </span>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900">
                18-Module Enterprise Admin Suite
              </h3>
            </div>

            {/* Admin Module Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-label flex-wrap">
              {[
                { id: "crm", name: "CRM Lead Pipeline" },
                { id: "radar", name: "Live Radar Stream" },
                { id: "seo", name: "Google SEO Engine" },
                { id: "marketing", name: "Turn-Key Integrations" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(m.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeModule === m.id
                      ? "bg-white text-slate-900 font-bold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Module Visualizer */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono font-bold">
                OPERATIONAL CONTROL PLANE
              </span>
              <h4 className="font-headline font-bold text-lg text-slate-900">
                Complete Business Lifecycle Automation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Replaces messy paper ledgers and disconnected spreadsheets with a unified Next.js 15 client-side state synchronized to Supabase PostgreSQL with real-time updates.
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

            <div className="lg:col-span-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500 font-bold">Admin Console Snapshot</span>
                <span className="text-emerald-600 font-semibold">Active & Synced</span>
              </div>
              <div className="space-y-1.5 text-slate-700 text-[11px]">
                <div className="p-2.5 rounded-lg bg-slate-50 flex justify-between">
                  <span>Total Pipeline Revenue:</span>
                  <span className="font-bold text-slate-900">£18,450</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 flex justify-between">
                  <span>Database State:</span>
                  <span className="font-bold text-emerald-600">Supabase Cloud Connected</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 flex justify-between">
                  <span>Google Review Index:</span>
                  <span className="font-bold text-amber-600">5.0 ★ (48 Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Row 3: 2-Column Split (SEO Engine + Strategic Moat) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card 4: Google Page 1 SEO Architecture */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
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
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                <span className="font-bold block text-sm">100%</span>
                <span className="text-[10px] text-emerald-700">Core Web Vitals</span>
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-900 border border-indigo-200">
                <span className="font-bold block text-sm">94/100</span>
                <span className="text-[10px] text-indigo-700">Local SEO Score</span>
              </div>
            </div>
          </div>

          {/* Card 5: Strategic Business Moat */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
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
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-label text-slate-700 space-y-1.5">
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
      {/* 4. TECH STACK & BESPOKE SVG VECTOR SHOWCASE                              */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
            Enterprise Technology Architecture
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
            Engineered With Modern High-Performance Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-label font-light">
            Zero bloatware, strict type safety, sub-second edge latency, and immutable security.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Next.js 15", desc: "App Router & SSR", icon: <NextJsIcon className="w-7 h-7" /> },
            { name: "React 19", desc: "Concurrent Actions", icon: <ReactIcon className="w-7 h-7" /> },
            { name: "Supabase", desc: "PostgreSQL & RLS", icon: <SupabaseLogo className="w-7 h-7" /> },
            { name: "TypeScript", desc: "Strict Type Safety", icon: <TypeScriptIcon className="w-7 h-7" /> },
            { name: "Tailwind CSS", desc: "Bespoke Tokens", icon: <TailwindIcon className="w-7 h-7" /> },
            { name: "Vercel Edge", desc: "Global Fast CDN", icon: <VercelIcon className="w-7 h-7" /> },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-3 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div className="p-2 rounded-xl bg-slate-50 w-fit">{item.icon}</div>
              <div>
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">{item.name}</h4>
                <p className="text-[10px] text-slate-500 font-label">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. DESIGN SYSTEM TOKENS (ARM DESIGN DNA)                                  */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
                Design Standards
              </span>
              <h3 className="font-headline font-bold text-2xl text-slate-900">
                Master Brand Color Tokens & Spatial Grid
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold self-start sm:self-auto">
              ARM DESIGN DNA
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {designTokens.map((token, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div 
                  className={`h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${token.fg} ${token.isBorder ? 'border border-slate-300' : ''}`}
                  style={{ backgroundColor: token.hex }}
                >
                  {token.hex}
                </div>
                <div>
                  <span className="font-headline font-bold text-[11px] text-slate-900 block">{token.name}</span>
                  <span className="text-[10px] text-slate-500 font-label block">{token.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Spatial Grid & Typography Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-xs font-mono uppercase text-indigo-700 font-bold block">Typography Hierarchy:</span>
              <p className="text-xs text-slate-600 leading-relaxed font-label">
                Primary: <strong>Inter Font (Telegram Clean Stack)</strong> with tight headings and generous whitespace. Thai fallback: <strong>Prompt Font</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-xs font-mono uppercase text-emerald-700 font-bold block">SaaS Spatial Radii Grid:</span>
              <p className="text-xs text-slate-600 leading-relaxed font-label">
                Buttons: <strong>8px (`rounded-md`)</strong> • Data Cards: <strong>12px (`rounded-lg`)</strong> • Drawers/Bento: <strong>16-24px (`rounded-2xl/3xl`)</strong>.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. TURN-KEY MARKETING INTEGRATIONS (OFFICIAL VECTOR LOGOS)                */}
      {/* ========================================================================= */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
            Growth & Marketing Infrastructure
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
            { name: "Google Analytics 4", desc: "Quote Funnel", icon: <GoogleAnalyticsLogo className="w-6 h-6" /> },
            { name: "Google Tag Manager", desc: "No-Code Container", icon: <GoogleTagManagerLogo className="w-6 h-6" /> },
            { name: "Google Search Console", desc: "Verification & Sitemaps", icon: <GoogleSearchConsoleLogo className="w-6 h-6" /> },
            { name: "Google Ads & CAPI", desc: "Smart Retargeting", icon: <GoogleAdsLogo className="w-6 h-6" /> },
            { name: "Meta Pixel & CAPI", desc: "Local Facebook Ads", icon: <MetaLogo className="w-6 h-6" /> },
            { name: "LINE Messaging API", desc: "Instant Lead Alerts", icon: <LineLogo className="w-6 h-6" /> },
            { name: "Google Maps Platform", desc: "Distance Matrix", icon: <GoogleMapsLogo className="w-6 h-6" /> },
            { name: "Supabase PostgreSQL", desc: "Cloud Realtime DB", icon: <SupabaseLogo className="w-6 h-6" /> },
          ].map((p, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-2 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="mb-2">{p.icon}</div>
                <h4 className="font-headline font-bold text-xs sm:text-sm text-slate-900">{p.name}</h4>
                <p className="text-[11px] text-slate-500 font-label">{p.desc}</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Ready for Key
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. STUDIO SIGNATURE FOOTER (PURE STANDALONE)                             */}
      {/* ========================================================================= */}
      <footer className="py-14 border-t border-slate-200/80 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center font-headline">
            ARM
          </div>
          <span className="font-headline font-bold text-sm text-slate-900">
            Project Delivered • Production Ready
          </span>
        </div>
        <p className="text-xs text-slate-500 font-label">
          The Window Doctor Web Platform • Crafted by ARM Product Studio with Next.js 15, React 19 & Supabase
        </p>
      </footer>

    </div>
  );
}
