"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Laptop
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

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "design" | "features" | "tech">("overview");
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const keyStats = [
    { label: "Established Heritage", value: "Since 1983", sub: "40+ Years in Oxfordshire" },
    { label: "FENSA Registered", value: "#28491", sub: "UK Glazing Standard" },
    { label: "Cost Savings", value: "Up to 70%", sub: "Replace Glass, Keep Frame" },
    { label: "Lead Conversion Uplift", value: "+300%", sub: "5-Step Pricing Wizard" },
  ];

  const techStack = [
    { name: "Next.js 15", desc: "App Router & Server Actions", category: "Core Framework", icon: "⚡" },
    { name: "React 19", desc: "Modern UI Component Engine", category: "Frontend Library", icon: "⚛️" },
    { name: "Tailwind CSS 3.4", desc: "Design Tokenized Utility System", category: "Styling Engine", icon: "🎨" },
    { name: "Supabase PostgreSQL", desc: "Row-Level Security & Realtime", category: "Database & Backend", icon: "🗄️" },
    { name: "Inter Font Stack", desc: "Telegram Clean Typography Standard", category: "Typography", icon: "🔤" },
    { name: "Framer Motion", desc: "Smooth Micro-Animations & Drawers", category: "Motion", icon: "✨" },
    { name: "Lucide React", desc: "Unified Minimalist SaaS Icons", category: "Iconography", icon: "📐" },
    { name: "Vercel Edge", desc: "Sub-50ms Global CDN Latency", category: "Infrastructure", icon: "🌐" },
  ];

  const features = [
    {
      title: "5-Stage Instant Quote Calculator",
      subtitle: "Dynamic Pricing & Customer Acquisition Wizard",
      desc: "An intuitive 5-step wizard that allows homeowners to calculate glass and window replacement prices instantly, validate Oxfordshire postcodes, and submit leads directly to the CRM in real time.",
      route: "/quote",
      highlights: ["Postcode SLA Validation", "Interactive Material & Glass Selector", "Instant Automated Estimate", "Real-Time Lead Dispatch"],
      tag: "Customer Acquisition"
    },
    {
      title: "Enterprise Admin Suite (18 Modules)",
      subtitle: "Full-Stack Business Operating System",
      desc: "A comprehensive administration control center featuring 18 operational modules covering CRM leads pipeline, live traffic telemetry, full CRUD service catalog, Before/After galleries, and customer reviews.",
      route: "/admin",
      highlights: ["Collapsible Sidebar (264px / 72px)", "Live Telemetry Radar", "No-Code Marketing Integrations", "1-Click Supabase Sync"],
      tag: "Business Automation"
    },
    {
      title: "Real-Time Telemetry & Heat Map",
      subtitle: "Live Traffic & Behavioral Intelligence",
      desc: "Live stream of real-time customer actions across Oxfordshire, pinpointing hot lead activities, quote submissions, and emergency hotline clicks as they happen.",
      route: "/admin",
      highlights: ["Active Visitor Counter", "Oxfordshire Heat Map Density", "Live Event Stream (Pause/Resume)", "Audited Analytics"],
      tag: "Real-Time Intelligence"
    },
    {
      title: "Google Page 1 Local SEO Architecture",
      subtitle: "Automated JSON-LD Schema & Content Hub",
      desc: "Engineered for local dominance with automated JSON-LD LocalBusiness, FAQPage, and AggregateRating schemas, ensuring maximum rich-snippet visibility on Google search results.",
      route: "/services/misted-glass-repair",
      highlights: ["100% Core Web Vitals Pass", "Dynamic FAQPage Schema", "Automated Sitemap Generation", "Quest Roadmap for Admins"],
      tag: "Organic Growth"
    }
  ];

  const colorPalette = [
    { name: "Heritage Navy", hex: "#00081E", role: "Primary Brand / Top Header", textColor: "text-white" },
    { name: "Container Navy", hex: "#0A1F44", role: "Elevation & Card Accent", textColor: "text-white" },
    { name: "Luxury Gold", hex: "#FED488", role: "Badges & Accent Highlights", textColor: "text-slate-900" },
    { name: "Deep Gold", hex: "#C5A059", role: "Secondary Accents", textColor: "text-white" },
    { name: "Live Emerald", hex: "#10B981", role: "Active Status & Telemetry", textColor: "text-white" },
    { name: "Clean Surface", hex: "#FFFFFF", role: "Minimalist SaaS Cards", textColor: "text-slate-900", border: true },
  ];

  return (
    <div className="min-h-screen bg-[#00081E] text-slate-100 font-body selection:bg-amber-400 selection:text-slate-900">
      
      {/* ========================================================================= */}
      {/* 1. TOP SHOWCASE NAVIGATION BAR                                            */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#00081E]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-slate-900 font-bold font-headline shadow-md">
              WD
            </div>
            <div>
              <span className="font-headline font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-amber-300 transition-colors">
                The Window Doctor
              </span>
              <span className="hidden sm:inline-block text-[10px] text-amber-300/80 font-mono ml-2 border border-amber-300/30 px-1.5 py-0.2 rounded">
                Case Study & Portfolio
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-label">
          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Live Website</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/quote"
            target="_blank"
            className="px-3 py-1.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Quote</span>
          </Link>

          <Link
            href="/admin"
            target="_blank"
            className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Suite</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SHOWCASE & PROJECT BADGES                                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-800">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 text-xs font-semibold font-mono shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Production Project Showcase • Next.js 15 + Supabase</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
              The Window Doctor <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                Enterprise Glazing Platform
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Complete digital transformation for Oxfordshire’s premier double-glazing specialist. Combining a 5-step instant pricing engine with an 18-module real-time administration suite.
            </p>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              target="_blank"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95"
            >
              <span>Explore Public Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin"
              target="_blank"
              className="px-6 py-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all shadow-md"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Launch Admin Suite</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href="/quote"
              target="_blank"
              className="px-6 py-3 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700/80 flex items-center gap-2 transition-all"
            >
              <Calculator className="w-4 h-4 text-amber-300" />
              <span>Test Quote Wizard</span>
            </Link>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-10 text-left">
            {keyStats.map((stat, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-lg bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1 shadow-md">
                <span className="text-[11px] text-slate-400 font-label block">{stat.label}</span>
                <span className="font-headline font-extrabold text-xl sm:text-2xl text-white block">{stat.value}</span>
                <span className="text-[11px] text-amber-400/90 font-medium">{stat.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BUSINESS CONTEXT & VALUE PROPOSITION                                   */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase font-label">
              <Award className="w-3.5 h-3.5" />
              <span>The Strategic Business Moat</span>
            </div>

            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white tracking-tight leading-snug">
              Why Replace The Whole Window When You Only Need The Glass?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional national sales companies charge £1,200+ per window by aggressively pitching full replacement frames. **The Window Doctor** disrupts the market by replacing only the failed double-glazed unit inside the existing frame for just £95.
            </p>

            <div className="space-y-3">
              {[
                { title: "70% Direct Cost Savings", desc: "Homeowners retain their existing uPVC/Aluminium frames while restoring clarity." },
                { title: "Same-Day 1-Hour Free Survey", desc: "Postcode-driven attendance across Bicester, Oxford, Banbury, and Witney." },
                { title: "FENSA Registered #28491", desc: "40+ years continuous operation with backed insurance guarantees." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-900/50 border border-slate-800/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-headline font-bold text-sm text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Comparison Preview Card */}
          <div className="bg-slate-900 p-6 sm:p-7 rounded-xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="font-headline font-bold text-base text-white">Value Proposition Matrix</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">SAVINGS 70%</span>
            </div>

            <div className="space-y-3 text-xs font-label">
              <div className="p-3 rounded-md bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold block text-sm">✓ The Window Doctor</span>
                  <span className="text-slate-300">Replace misted glass only (10-Yr Guarantee)</span>
                </div>
                <span className="font-headline font-black text-emerald-300 text-base sm:text-lg">£95 - £220</span>
              </div>

              <div className="p-3 rounded-md bg-red-950/30 border border-red-500/20 flex items-center justify-between">
                <div>
                  <span className="text-red-400 font-bold block text-sm">✗ National Window Companies</span>
                  <span className="text-slate-400">Force full frame & sill replacement</span>
                </div>
                <span className="font-headline font-black text-red-400 text-base sm:text-lg">£850 - £1,500+</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/services/misted-glass-repair#comparison"
                target="_blank"
                className="text-xs text-amber-300 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>View Full Comparison Table on Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DESIGN SYSTEM & UI/UX TOKENS EXHIBITION                                */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 bg-[#000617]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase font-label">
              <Palette className="w-3.5 h-3.5" />
              <span>Design System Standards</span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white">
              Minimalist Precision & Brand Harmony
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-label">
              Strictly codified in <code className="text-amber-300">DESIGN.md</code> and <code className="text-amber-300">AGENTS.md</code> with zero visual clutter.
            </p>
          </div>

          {/* Color Palette Grid */}
          <div className="space-y-4">
            <h3 className="font-headline font-bold text-sm text-slate-300 uppercase tracking-wider font-mono">
              1. Brand Color Tokens
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {colorPalette.map((color, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900 p-3 space-y-2 shadow-md">
                  <div 
                    className={`h-16 rounded-md w-full flex items-center justify-center font-mono font-bold text-xs ${color.textColor} ${color.border ? 'border border-slate-300' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {color.hex}
                  </div>
                  <div>
                    <span className="font-headline font-bold text-xs text-white block">{color.name}</span>
                    <span className="text-[10px] text-slate-400 font-label">{color.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography & Proportional Radii Standards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-headline font-bold text-sm">
                <Terminal className="w-4 h-4" />
                <span>Typography Stack Standards</span>
              </div>
              <div className="space-y-3 text-xs font-label">
                <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Primary Sans: Inter (Telegram Clean Stack)</span>
                  <span className="font-sans text-sm text-white font-medium">The quick brown fox jumps over the lazy dog. 0123456789</span>
                </div>
                <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Thai Fallback: Prompt Font</span>
                  <span className="font-sans text-sm text-white font-medium">บริการเปลี่ยนกระจกฝ้า ซ่อมหน้าต่าง บานประตู โดยช่างผู้เชี่ยวชาญ</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-headline font-bold text-sm">
                <Layout className="w-4 h-4" />
                <span>SaaS Border-Radius Grid</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-xs font-label text-center">
                <div className="p-3 rounded-md bg-slate-950 border border-slate-800">
                  <span className="font-mono font-bold text-amber-300 block">8px (`rounded-md`)</span>
                  <span className="text-[10px] text-slate-400">Buttons & Inputs</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="font-mono font-bold text-emerald-400 block">12px (`rounded-lg`)</span>
                  <span className="text-[10px] text-slate-400">Data Cards & Tables</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="font-mono font-bold text-cyan-400 block">16px (`rounded-2xl`)</span>
                  <span className="text-[10px] text-slate-400">Drawers & Modals</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Strict prohibition of oversized `rounded-[24px]` or `rounded-3xl` for standard card components.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORE ENGINEERING & FEATURE WALKTHROUGH                                 */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold uppercase font-label">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Engineering Tour</span>
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white">
            Core Modules & Interactive Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-label">
            Click on any feature below to inspect its architecture, capabilities, and live route.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {features.map((feat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFeature(idx)}
              className={`p-4 rounded-lg text-left transition-all border ${
                activeFeature === idx
                  ? "bg-slate-900 border-amber-400 shadow-md text-white"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70"
              }`}
            >
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block mb-1">
                {feat.tag}
              </span>
              <h4 className="font-headline font-bold text-sm leading-snug">{feat.title}</h4>
            </button>
          ))}
        </div>

        {/* Active Feature Detail Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-mono font-bold">
              Active Module: #{activeFeature + 1}
            </div>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-white">
              {features[activeFeature].title}
            </h3>
            <p className="text-amber-400/90 font-medium text-xs font-label">
              {features[activeFeature].subtitle}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {features[activeFeature].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {features[activeFeature].highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200 font-label">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href={features[activeFeature].route}
                target="_blank"
                className="px-5 py-2.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Launch Live Interface</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-5 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 space-y-3 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-slate-500">Live Endpoint</span>
              <span className="text-emerald-400">200 OK</span>
            </div>
            <div className="text-amber-300 font-bold">
              GET {features[activeFeature].route}
            </div>
            <div className="p-3 rounded bg-slate-900 text-slate-400 text-[11px] space-y-1">
              <div>Type: Server Component + Interactive Client</div>
              <div>State Sync: Supabase PostgreSQL + Local Fallback</div>
              <div>Security: RLS & Masked Secret Credentials</div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. TURN-KEY MARKETING & PLATFORM INTEGRATIONS                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 bg-[#000617]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 text-center">
          
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase font-label">
              <Zap className="w-3.5 h-3.5" />
              <span>Turn-Key Marketing Stack</span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white">
              No-Code API & Analytics Integrations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-label">
              Configurable directly from Admin Suite with automatic client-side tag injections.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {[
              { name: "Google Analytics 4", desc: "Event & Conversion Tracking", icon: <GoogleAnalyticsLogo className="w-7 h-7" /> },
              { name: "Google Tag Manager", desc: "No-Code Container Manager", icon: <GoogleTagManagerLogo className="w-7 h-7" /> },
              { name: "Google Search Console", desc: "HTML Meta & DNS Verification", icon: <GoogleSearchConsoleLogo className="w-7 h-7" /> },
              { name: "Google Ads & CAPI", desc: "Smart Bidding & Conversion Tag", icon: <GoogleAdsLogo className="w-7 h-7" /> },
              { name: "Meta Pixel & CAPI", desc: "Retargeting & Server Events", icon: <MetaLogo className="w-7 h-7" /> },
              { name: "LINE Messaging API", desc: "Instant CRM Push Notifications", icon: <LineLogo className="w-7 h-7" /> },
              { name: "Google Maps Platform", desc: "Postcode Distance Matrix API", icon: <GoogleMapsLogo className="w-7 h-7" /> },
              { name: "Supabase Cloud DB", desc: "PostgreSQL & Realtime Sync", icon: <SupabaseLogo className="w-7 h-7" /> },
            ].map((p, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-900 border border-slate-800 shadow-md space-y-2 flex flex-col justify-between">
                <div>
                  <div className="mb-2">{p.icon}</div>
                  <h4 className="font-headline font-bold text-sm text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-400 font-label">{p.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">✓ Ready for Key</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TECHNOLOGY STACK & ARCHITECTURAL HIGHLIGHTS                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase font-label">
            <Layers className="w-3.5 h-3.5" />
            <span>Modern Web Architecture</span>
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-4xl text-white">
            Engineered for Extreme Speed & Uptime
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-label">
            100% Type-Safe TypeScript • Zero Lint Errors • Vercel Edge Global Latency
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <div key={i} className="p-5 rounded-lg bg-slate-900 border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {tech.category}
                </span>
              </div>
              <h4 className="font-headline font-bold text-base text-white">{tech.name}</h4>
              <p className="text-xs text-slate-400 font-label">{tech.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. DOCUMENTATION & REPOSITORY AUDIT PROOF                                  */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-b border-slate-800 bg-[#000617]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
                Official Engineering Documentation Suite
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-label">
                Complete specifications committed directly to the central Git repository.
              </p>
            </div>
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold self-start sm:self-auto">
              🟢 SINGLE SOURCE OF TRUTH
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-headline font-bold text-sm">
                <FileText className="w-4 h-4" />
                <span>SYSTEM_MANUAL.md</span>
              </div>
              <p className="text-xs text-slate-300 font-label leading-relaxed">
                Full system specification, 18-module breakdown, Daily Admin SOP, Database Schemas, and Business ROI Playbook.
              </p>
              <span className="text-[10px] font-mono text-slate-500 block">35KB • Exhaustive Reference</span>
            </div>

            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-headline font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>AGENTS.md</span>
              </div>
              <p className="text-xs text-slate-300 font-label leading-relaxed">
                Universal AI agent instructions for Antigravity, Cursor, Claude, Devin, ensuring zero code clutter and strict design preservation.
              </p>
              <span className="text-[10px] font-mono text-slate-500 block">Multi-Agent Protocol</span>
            </div>

            <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-300 font-headline font-bold text-sm">
                <Palette className="w-4 h-4" />
                <span>DESIGN.md</span>
              </div>
              <p className="text-xs text-slate-300 font-label leading-relaxed">
                Master color tokens, typography scales, standardized 12px/8px radii, and accessible component rules.
              </p>
              <span className="text-[10px] font-mono text-slate-500 block">Design System Master</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CALL TO ACTION & LAUNCHPAD                                             */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 text-center max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <h2 className="font-headline font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Ready to Experience The Platform?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Explore the live public website, test the 5-step quote calculator, or inspect the 18-module admin suite in action.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-xl hover:shadow-amber-400/20 transition-all active:scale-95"
          >
            Launch Public Website
          </Link>
          <Link
            href="/quote"
            className="px-8 py-3.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all shadow-md"
          >
            Open Quote Wizard
          </Link>
          <Link
            href="/admin"
            className="px-8 py-3.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-emerald-400 font-bold text-sm border border-slate-700/80 transition-all"
          >
            Open Admin Suite
          </Link>
        </div>

        <div className="pt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-label gap-2">
          <span>The Window Doctor • Bicester & Oxfordshire (FENSA #28491)</span>
          <span>Engineered with Next.js 15 & React 19</span>
        </div>
      </section>

    </div>
  );
}
