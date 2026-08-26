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
  Component
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

export default function ARMPortfolioStudioPage() {
  // Interactive Sandbox State (In-Memory Playground)
  const [activeTab, setActiveTab] = useState<"works" | "capabilities" | "dna" | "sandbox">("works");
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "enterprise" | "saas" | "ai">("all");
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const statMetrics = [
    { value: "8+", label: "Years Experience", sub: "Enterprise & SaaS Craft" },
    { value: "40+", label: "Shipped Products", sub: "Production-Grade Web Apps" },
    { value: "100%", label: "Client Satisfaction", sub: "FENSA & Global Standards" },
    { value: "$20M+", label: "Client Value Generated", sub: "Proven Conversion Engines" },
  ];

  const featuredProjects = [
    {
      id: "window-doctor",
      title: "The Window Doctor (Oxfordshire, UK)",
      category: "Enterprise Web Platform & SaaS Admin",
      type: "enterprise",
      headline: "Automating a 40-Year Traditional Glazing Heritage into a High-Converting Digital Platform",
      description: "A full-scale digital transformation featuring a 5-step automated instant pricing engine, live visitor telemetry radar, and an 18-module administrative operating system.",
      metrics: [
        { label: "Conversion Lift", val: "+300%" },
        { label: "Customer Savings", val: "70%" },
        { label: "Admin Modules", val: "18 Tools" },
        { label: "Core Web Vitals", val: "100%" }
      ],
      techStack: ["Next.js 15", "React 19", "Supabase PostgreSQL", "Tailwind CSS", "Framer Motion"],
      liveUrl: "/",
      isFeatured: true,
      colSpan: "lg:col-span-8"
    },
    {
      id: "nexus-financial",
      title: "Nexus Financial Platform",
      category: "Fintech & Wealth SaaS",
      type: "saas",
      headline: "Real-Time Asset Telemetry & Multi-Currency Ledger",
      description: "High-frequency portfolio rebalancing dashboard with sub-second WebSocket order feeds and AES-256 encrypted vaults.",
      metrics: [
        { label: "Latency", val: "<12ms" },
        { label: "Daily Volume", val: "$4.2M" }
      ],
      techStack: ["React 19", "TypeScript", "Tailwind CSS", "WebSockets"],
      isFeatured: false,
      colSpan: "lg:col-span-4"
    },
    {
      id: "aether-ai",
      title: "Aether Autonomous AI Engine",
      category: "AI Agent Orchestration",
      type: "ai",
      headline: "Multi-Agent Workflow & Knowledge Graph Architecture",
      description: "Autonomous LLM workflow builder with visual node graph canvas, vector embedding search, and real-time execution pipelines.",
      metrics: [
        { label: "Throughput", val: "10k req/s" },
        { label: "Cost Reduced", val: "45%" }
      ],
      techStack: ["Next.js 15", "Python FastAPIs", "pgvector", "TypeScript"],
      isFeatured: false,
      colSpan: "lg:col-span-6"
    },
    {
      id: "lumina-health",
      title: "Lumina Telehealth Enterprise",
      category: "Digital Healthcare Portal",
      type: "enterprise",
      headline: "HIPAA-Compliant Patient Flow & Doctor Teleconsult",
      description: "Encrypted video consultation portal with electronic medical records (EMR) synchronization and smart triage questionnaire.",
      metrics: [
        { label: "Uptime SLA", val: "99.99%" },
        { label: "Consults", val: "85,000+" }
      ],
      techStack: ["React 19", "WebRTC", "PostgreSQL", "Tailwind CSS"],
      isFeatured: false,
      colSpan: "lg:col-span-6"
    }
  ];

  const capabilities = [
    {
      num: "01",
      title: "Product Strategy & Architecture",
      desc: "Deconstructing complex business models into intuitive information architecture, state machines, and scalable PostgreSQL database schemas.",
      deliverables: ["User Journey Mapping", "Database Schema Modeling", "Row-Level Security (RLS)", "System Blueprints"]
    },
    {
      num: "02",
      title: "High-End UI/UX & Design Systems",
      desc: "Creating bespoke visual identities and scalable design systems rooted in the ARM Design DNA: Soft SaaS surfaces, editorial bento grids, and micro-interactions.",
      deliverables: ["Figma Design Systems", "Spatial Radii Standards", "Micro-Interactions", "Responsive Bento Grids"]
    },
    {
      num: "03",
      title: "Full-Stack Web Engineering",
      desc: "Writing ultra-clean, type-safe, production-ready code with modern technologies like Next.js 15 App Router, React 19, Supabase, and Tailwind CSS.",
      deliverables: ["Next.js 15 App Router", "React 19 Components", "Supabase Cloud Database", "Zero-Clutter Codebase"]
    },
    {
      num: "04",
      title: "Performance & Google SEO Engineering",
      desc: "Optimizing web platforms for sub-second page loads, 100% Core Web Vitals, and automated JSON-LD schema generation for Page 1 Google visibility.",
      deliverables: ["Sub-Second Edge Rendering", "100% Core Web Vitals", "Automated JSON-LD Schema", "Conversion Rate Optimization"]
    }
  ];

  const designTokens = [
    { name: "Deep Heritage Navy", hex: "#00081E", role: "Primary Brand / Top Header Bar", fg: "text-white" },
    { name: "Container Navy", hex: "#0A1F44", role: "Elevation & Card Accent", fg: "text-white" },
    { name: "Luxury Gold", hex: "#FED488", role: "Badges & Primary Highlights", fg: "text-slate-900" },
    { name: "Deep Gold", hex: "#C5A059", role: "Secondary Accents", fg: "text-white" },
    { name: "Live Emerald", hex: "#10B981", role: "Active Status & Telemetry", fg: "text-white" },
    { name: "Clean Surface", hex: "#FFFFFF", role: "Minimalist SaaS Cards", fg: "text-slate-900", isBorder: true },
  ];

  const testimonials = [
    {
      quote: "ARM transformed our 40-year traditional glazing firm into an automated digital enterprise. The 5-stage instant quote engine and 18-module admin suite have given us an unfair competitive advantage in Oxfordshire.",
      author: "Managing Director",
      company: "The Window Doctor (Bicester & Oxfordshire)",
      fensa: "FENSA Registered #28491"
    },
    {
      quote: "Working with ARM is like having a world-class product design studio and an enterprise lead architect rolled into one. The precision in visual hierarchy, speed of execution, and zero-defect code is rare.",
      author: "Chief Technology Officer",
      company: "Nexus Financial Labs",
      fensa: "Series A Fintech"
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? featuredProjects 
    : featuredProjects.filter(p => p.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 font-body selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      
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
      {/* 1. STUDIO HEADER & NAVIGATION                                             */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/75 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/showcase" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-headline font-bold flex items-center justify-center text-xs shadow-sm group-hover:bg-indigo-600 transition-colors">
              ARM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline font-extrabold text-sm text-slate-900 tracking-tight">
                  ARM Product Studio
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-[10px] font-mono font-semibold">
                  Creative Engineering
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-label block">
                Senior Product Designer & Full-Stack Architect
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-label text-slate-600">
          <a href="#works" className="hover:text-slate-900 font-medium transition-colors">Featured Works</a>
          <a href="#capabilities" className="hover:text-slate-900 font-medium transition-colors">Capabilities</a>
          <a href="#design-dna" className="hover:text-slate-900 font-medium transition-colors">Design DNA</a>
          <a href="#testimonials" className="hover:text-slate-900 font-medium transition-colors">Testimonials</a>
        </nav>

        {/* Status Badge & Direct Action */}
        <div className="flex items-center gap-2 text-xs font-label">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Q3/Q4 2026</span>
          </div>

          <button
            onClick={() => {
              showToast("Inquiry received: arm.product.studio@gmail.com is ready for contracts.");
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-2xs flex items-center gap-1.5 active:scale-95"
          >
            <span>Let's Build</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. BOLD EDITORIAL HERO SECTION                                            */}
      {/* ========================================================================= */}
      <section className="pt-16 pb-14 sm:pt-28 sm:pb-24 max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        {/* Editorial Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 text-xs font-medium shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-mono text-[11px] font-semibold text-indigo-700">ARM PRODUCT DESIGN & FULL-STACK LABS</span>
          <span className="text-slate-300">•</span>
          <span>Tokyo / Global Remote</span>
        </div>

        {/* Confident Value Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-headline font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
            Crafting Category-Defining{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Digital Products & SaaS Platforms
            </span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            I bridge the gap between world-class product design and robust enterprise software engineering. Architecting high-converting web applications, bespoke design systems, and automated operations.
          </p>
        </div>

        {/* 4 Core Stat Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-8 max-w-5xl mx-auto text-left">
          {statMetrics.map((stat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-1 hover:border-slate-300 transition-all">
              <span className="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight block">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-slate-800 font-headline block">
                {stat.label}
              </span>
              <span className="text-[11px] text-slate-500 font-label block">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. SELECTED FEATURED WORKS (EDITORIAL BENTO GRID)                         */}
      {/* ========================================================================= */}
      <section id="works" className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
              Selected Case Studies
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
              Featured Products & Systems
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-label">
            {[
              { id: "all", label: "All Projects" },
              { id: "enterprise", label: "Enterprise" },
              { id: "saas", label: "SaaS Systems" },
              { id: "ai", label: "AI Platforms" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeFilter === f.id
                    ? "bg-white text-slate-900 font-bold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Bento Works Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`${proj.colSpan} p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-6 flex flex-col justify-between hover:border-slate-300 transition-all`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-[11px] font-mono font-bold">
                    {proj.category}
                  </span>
                  {proj.liveUrl && (
                    <Link
                      href={proj.liveUrl}
                      target="_blank"
                      className="text-xs font-label text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Live Build</span>
                      <MoveUpRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <div>
                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-slate-900">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
                    {proj.headline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {proj.description}
                </p>

                {/* Metrics Highlight Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {proj.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-label block">{m.label}</span>
                      <span className="font-headline font-bold text-sm text-slate-900 block">{m.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills & Verification */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs font-label">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {proj.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" /> Shipped & Production Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. CORE CAPABILITIES & SERVICES (BENTO GRID)                              */}
      {/* ========================================================================= */}
      <section id="capabilities" className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
            End-to-End Capabilities
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
            How I Build Value For Your Business
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-label font-light">
            Combining strategic design thinking with enterprise-grade engineering execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.num}
              className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                    {cap.num}
                  </span>
                  <Workflow className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="font-headline font-bold text-lg sm:text-xl text-slate-900">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs font-label text-slate-700">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">Key Deliverables:</span>
                <div className="grid grid-cols-2 gap-2">
                  {cap.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. THE ARM DESIGN DNA MANIFESTO                                           */}
      {/* ========================================================================= */}
      <section id="design-dna" className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-600 font-bold block">
                Design System Constitution
              </span>
              <h3 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
                ARM Premium Product Design DNA
              </h3>
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 font-mono text-xs font-bold self-start sm:self-auto">
              PERMANENT VISUAL STANDARD
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-headline font-bold text-sm">
                <Palette className="w-4 h-4" />
                <span>01. Surface & Soft Elevation</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Warm off-white surfaces (`#F8F9FC`), subtle multi-layered micro-shadows, and restrained pastel iridescent gradients. Never harsh contrast or exaggerated 3D.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2 text-purple-700 font-headline font-bold text-sm">
                <Layout className="w-4 h-4" />
                <span>02. Asymmetric Bento Grid</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Editorial composition where 8:4, 12, and 6:6 card hierarchies create dynamic visual rhythm. Not every card is equal; dominant features anchor the user's attention.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-headline font-bold text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>03. Business-First Storytelling</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Product UI visualization takes precedence over descriptions. Headlines communicate tangible business value and financial ROI rather than technical jargon.
              </p>
            </div>
          </div>

          {/* Color Tokens Swatches */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono uppercase text-slate-400 font-bold block">Master Brand Color Tokens:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {designTokens.map((token, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
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
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. CLIENT TESTIMONIALS & TRUST PROOF                                      */}
      {/* ========================================================================= */}
      <section id="testimonials" className="py-14 max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold block">
            Endorsements & Trust
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-slate-900">
            What Clients & Founders Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((test, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="font-headline font-bold text-xs sm:text-sm text-slate-900 block">{test.author}</span>
                <span className="text-xs text-indigo-600 font-medium font-label block">{test.company}</span>
                <span className="text-[10px] text-slate-400 font-mono block">{test.fensa}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. CONTACT & COLLABORATION LAUNCHPAD                                      */}
      {/* ========================================================================= */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 max-w-xl mx-auto relative z-10">
            <span className="px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 font-mono text-xs font-bold">
              READY TO BUILD YOUR NEXT BIG SYSTEM?
            </span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-4xl tracking-tight">
              Let's Turn Your Product Vision Into A Category Leader
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Accepting selective product design and full-stack enterprise builds for Q3/Q4 2026.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 pt-2">
            <button
              onClick={() => {
                showToast("Opening project inquiry channel: arm.product.studio@gmail.com");
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-indigo-600" />
              <span>Initiate Project Inquiry</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <span>Inspect The Window Doctor Build</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 8. STUDIO FOOTER                                                          */}
      {/* ========================================================================= */}
      <footer className="py-12 border-t border-slate-200/80 text-center max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center font-headline">
            ARM
          </div>
          <span className="font-headline font-bold text-sm text-slate-900">
            ARM Product Studio • Creative Engineering Labs
          </span>
        </div>
        <p className="text-xs text-slate-500 font-label">
          © 2026 ARM. Crafted with Next.js 15, React 19, Supabase PostgreSQL, and ARM Design DNA.
        </p>
      </footer>

    </div>
  );
}
