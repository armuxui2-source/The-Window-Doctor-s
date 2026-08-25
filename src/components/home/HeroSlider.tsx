"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  TrendingDown,
  Shield,
  Home,
  Grid,
  DoorClosed,
  Clock,
  Zap
} from "lucide-react";
import { HERO_SLIDES, HeroSlide } from "@/lib/supabase/mock-data";
import { cn } from "@/lib/utils";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, SLIDE_DURATION);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const activeSlide: HeroSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      className="relative bg-primary text-white overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Full-bleed Background Images with Smooth Cross-fade */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            )}
            style={{ transitionProperty: "opacity, transform", transitionDuration: "1200ms" }}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              sizes="100vw"
            />
            {/* Cinematic Gradient Overlays for High-Contrast Luxury Feel */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-primary/20 to-primary/80" />
          </div>
        ))}
      </div>

      {/* 2. Slide Content Container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24 min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex flex-col justify-between">
        
        {/* Top Heritage Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md border border-secondary-container/30 text-secondary-container text-xs font-bold uppercase tracking-wider font-label animate-fade-in shadow-sm whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse flex-shrink-0" />
            <span className="whitespace-nowrap">{activeSlide.tag}</span>
          </div>

          {/* Slide Pill Value Proposition Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/80 backdrop-blur-md border border-secondary/30 text-xs font-semibold text-slate-200 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-secondary-container flex-shrink-0" />
            <span className="whitespace-nowrap">{activeSlide.badgeText}</span>
          </div>
        </div>

        {/* Main Hero Dynamic Typography & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Animated Headline */}
            <div className="space-y-3">
              <span className="text-secondary-container text-xs sm:text-sm font-bold uppercase tracking-widest font-label block whitespace-nowrap">
                {activeSlide.badgeText}
              </span>
              <h1 className="font-headline font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-[52px] text-white leading-[1.15] tracking-tight">
                {activeSlide.title} <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container via-amber-200 to-secondary-fixed">
                  {activeSlide.highlightText}
                </span>
              </h1>
            </div>

            {/* Description Text */}
            <p className="font-body text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl leading-relaxed">
              {activeSlide.description}
            </p>

            {/* Hero Dual CTA Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href={activeSlide.primaryCtaLink}
                className="btn-cta text-sm sm:text-base py-3.5 px-6 sm:px-8 rounded-[16px] shadow-gold-glow flex items-center justify-center gap-2 group transition-all duration-300 whitespace-nowrap"
              >
                <span className="whitespace-nowrap font-bold">{activeSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>

              <a
                href={activeSlide.secondaryCtaLink}
                className="btn-secondary text-sm sm:text-base py-3.5 px-6 sm:px-8 rounded-[16px] bg-white/10 text-white hover:bg-white/20 border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all duration-300 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-secondary-container flex-shrink-0" />
                <span className="whitespace-nowrap font-bold">{activeSlide.secondaryCtaText}</span>
              </a>
            </div>

            {/* Slide Specific Metrics / Key Stats */}
            <div className="pt-4 grid grid-cols-3 gap-2.5 sm:gap-6 max-w-lg">
              {activeSlide.stats.map((stat, i) => (
                <div key={i} className="glass-card-dark rounded-[14px] p-2.5 sm:p-4 text-left border border-white/10">
                  <div className="font-headline font-extrabold text-base sm:text-xl md:text-2xl text-secondary-container leading-tight whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-300 font-medium font-label mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side: Quick Diagnostic Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="glass-card-dark rounded-[20px] p-6 border border-secondary/30 shadow-2xl space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl bg-secondary-container text-primary flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm text-white">Free Survey Booking</h3>
                  <span className="text-[11px] text-slate-300">Oxfordshire Daily Route</span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200 font-body">
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>Zero Sales Pressure</strong> — Diagnostic quote</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-secondary-container flex-shrink-0" />
                  <span><strong>FENSA Certified</strong> (Reg. No. 28491)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg">
                  <Clock className="w-4 h-4 text-secondary-container flex-shrink-0" />
                  <span><strong>Fast Turnaround</strong> — In under 45 mins</span>
                </div>
              </div>

              <Link
                href="/quote"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-secondary-container to-amber-300 text-primary font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <span>Calculate My Repair / Project Price</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* 3. Slider Controls & Thumbnails Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          
          {/* Slide Indicator Dots & Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus:outline-none",
                    index === currentSlide 
                      ? "w-8 bg-secondary-container shadow-gold-glow" 
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-slate-300 ml-2">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
          </div>

          {/* Quick Slide Selector Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto max-w-xl">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold font-label transition-all duration-200 whitespace-nowrap flex items-center gap-1.5",
                  idx === currentSlide 
                    ? "bg-secondary-container text-primary font-bold shadow-sm" 
                    : "bg-white/5 text-slate-300 hover:bg-white/15 border border-white/10"
                )}
              >
                {idx === 0 && <Sparkles className="w-3 h-3" />}
                {idx === 1 && <DoorClosed className="w-3 h-3" />}
                {idx === 2 && <Home className="w-3 h-3" />}
                {idx === 3 && <Grid className="w-3 h-3" />}
                <span>
                  {idx === 0 && "Misted Glass Repair"}
                  {idx === 1 && "Doors Collection"}
                  {idx === 2 && "Warm Roofs"}
                  {idx === 3 && "Modern Windows"}
                </span>
              </button>
            ))}
          </div>

          {/* Authority Trust Strip */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-300 font-label">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-secondary-container" />
              <span className="whitespace-nowrap font-medium">FENSA 28491</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-secondary-container" />
              <span className="whitespace-nowrap font-medium">10-Yr Guarantee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
