"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Grid, 
  DoorClosed, 
  Home, 
  Shield, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";
import { MOCK_SERVICES, Service } from "@/lib/supabase/mock-data";
import { cn } from "@/lib/utils";

interface ProductShowcaseSliderProps {
  services?: Service[];
}

export default function ProductShowcaseSlider({ services = MOCK_SERVICES }: ProductShowcaseSliderProps) {
  const activeServices = services && services.length > 0 ? services : MOCK_SERVICES;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", name: "All Solutions", icon: Zap },
    { id: "misted-glass-repair", name: "Misted Glass Repair", icon: Sparkles },
    { id: "modern-windows", name: "Modern Windows", icon: Grid },
    { id: "stylish-doors", name: "Composite & Bi-Folds", icon: DoorClosed },
    { id: "warm-roof-conservatories", name: "Warm Roof Conversions", icon: Home },
    { id: "glass-balustrades", name: "Glass Balustrades", icon: Shield },
  ];

  const filteredServices = activeCategory === "all"
    ? activeServices
    : activeServices.filter((s) => s.slug === activeCategory);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[16px] bg-secondary-container/30 border border-secondary/20 text-secondary text-xs font-bold uppercase font-label">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered Products & Glazing Catalogue</span>
          </div>
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Precision Products Built for the British Climate
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            From single misted sealed unit replacements to architectural bi-folds and lightweight tiled conservatory roofs.
          </p>
        </div>

        {/* Carousel Prev/Next Controls */}
        <div className="flex items-center gap-2 self-start md:self-end">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous Products"
            className="w-10 h-10 rounded-full border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-primary flex items-center justify-center transition-colors shadow-sm focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next Products"
            className="w-10 h-10 rounded-full border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-primary flex items-center justify-center transition-colors shadow-sm focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2.5 rounded-full text-xs font-bold font-label transition-all duration-200 whitespace-nowrap flex items-center gap-2 border",
                isActive
                  ? "bg-primary text-secondary-container border-primary shadow-md scale-105"
                  : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Slider / Grid Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
      >
        {filteredServices.map((service: Service) => (
          <div
            key={service.id}
            className="min-w-[320px] sm:min-w-[380px] lg:min-w-[400px] max-w-[420px] bg-surface-container-lowest border border-outline-variant rounded-[20px] overflow-hidden flex flex-col justify-between group hover:border-primary transition-all duration-300 hover:shadow-xl snap-start"
          >
            {/* Image Header with Badge Overlay */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <Image
                src={service.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w"}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              
              {/* Category Icon Badge */}
              <div className="absolute top-4 left-4 w-10 h-10 rounded-[12px] bg-primary/90 backdrop-blur-md text-secondary-container flex items-center justify-center border border-secondary/30 shadow-md">
                {service.slug === "misted-glass-repair" && <Sparkles className="w-5 h-5" />}
                {service.slug === "modern-windows" && <Grid className="w-5 h-5" />}
                {service.slug === "stylish-doors" && <DoorClosed className="w-5 h-5" />}
                {service.slug === "warm-roof-conservatories" && <Home className="w-5 h-5" />}
                {service.slug === "glass-balustrades" && <Shield className="w-5 h-5" />}
              </div>

              {/* Warranty / Guarantee Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold font-label flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary-container" />
                <span>{service.warranty_years}-Year Guarantee</span>
              </div>

              {/* Bottom Image Title */}
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-secondary-container text-xs font-bold uppercase tracking-wider font-label block">
                  {service.headline}
                </span>
                <h3 className="font-headline font-bold text-lg text-white truncate">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                {service.short_description}
              </p>

              {/* Key Features List */}
              <div className="space-y-2 pt-2 border-t border-outline-variant">
                {(Array.isArray(service.features) ? (service.features as string[]) : []).slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-on-surface font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Specs Pills */}
              {service.specifications && (
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-outline-variant text-[11px] font-label">
                  {Object.entries(service.specifications).slice(0, 2).map(([key, val], i) => (
                    <div key={i} className="p-2 rounded-lg bg-surface-container-low border border-outline-variant/60">
                      <span className="text-on-surface-variant block font-medium">{key}</span>
                      <strong className="text-primary font-bold truncate block">{String(val)}</strong>
                    </div>
                  ))}
                </div>
              )}

              {/* Price & Action Button */}
              <div className="pt-4 mt-2 border-t border-outline-variant flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-on-surface-variant block font-medium">Guide Price</span>
                  <span className="font-headline font-extrabold text-base text-primary">
                    From £{service.base_price_estimate}{" "}
                    <span className="text-xs font-normal text-on-surface-variant">{service.price_unit}</span>
                  </span>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="btn-primary text-xs py-2.5 px-4 rounded-[12px] group-hover:bg-secondary group-hover:text-primary transition-colors flex items-center gap-1 font-bold"
                >
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
