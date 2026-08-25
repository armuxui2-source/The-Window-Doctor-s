"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  TrendingDown, 
  CheckCircle, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { MOCK_PROJECTS, Project } from "@/lib/supabase/mock-data";
import { cn } from "@/lib/utils";

interface ProjectsShowcaseProps {
  projects?: Project[];
}

export default function ProjectsShowcase({ projects = MOCK_PROJECTS }: ProjectsShowcaseProps) {
  const activeList = projects && projects.length > 0 ? projects : MOCK_PROJECTS;
  const [selectedProjectId, setSelectedProjectId] = useState<string>(activeList[0]?.id || "proj-1");

  const currentProject = activeList.find((p) => p.id === selectedProjectId) || activeList[0];

  return (
    <section className="bg-surface-container-low rounded-lg p-6 sm:p-10 lg:p-12 border border-outline-variant relative overflow-hidden shadow-card">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary-container/30 border border-secondary/20 text-secondary text-xs font-bold uppercase font-label">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Real Oxfordshire Case Studies</span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
              Proof of Craftsmanship: Before & After Restorations
            </h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Drag the interactive slider to see how our master glaziers restore clarity, security, and warmth while saving homeowners thousands.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary font-label transition-colors self-start md:self-end"
          >
            <span>View Full Portfolio</span>
            <ChevronRight className="w-4 h-4 text-secondary" />
          </Link>
        </div>

        {/* Project Selector Pills / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {activeList.map((proj: Project, index: number) => {
            const isSelected = proj.id === selectedProjectId;
            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={cn(
                  "px-4 py-2.5 rounded text-xs font-bold font-label transition-all duration-200 whitespace-nowrap flex items-center gap-2 border",
                  isSelected
                    ? "bg-primary text-secondary-container border-primary shadow-md"
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant"
                )}
              >
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono font-bold">
                  0{index + 1}
                </span>
                <span>{proj.location_city.split(",")[0]}</span>
                <span className="opacity-70 font-normal hidden sm:inline">
                  — {proj.title.split(" ")[0]} {proj.title.split(" ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid: Left Info & Right Before/After Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Project Details & Value Metrics */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-label">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-lowest border border-outline-variant text-primary font-bold">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                <span>{currentProject.location_city}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-lowest border border-outline-variant text-on-surface-variant font-medium">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                <span>Completed {currentProject.completion_year}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>FENSA Certified</span>
              </div>
            </div>

            {/* Title & Summary */}
            <div className="space-y-2">
              <h3 className="font-headline font-bold text-xl sm:text-2xl text-primary leading-snug">
                {currentProject.title}
              </h3>
              <p className="font-body text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                {currentProject.summary}
              </p>
            </div>

            {/* Challenge & Solution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-md bg-surface-container-lowest border border-outline-variant space-y-1">
                <span className="text-[11px] font-bold text-error uppercase font-label block">Client Challenge</span>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {currentProject.challenge_description}
                </p>
              </div>
              <div className="p-3.5 rounded-md bg-surface-container-lowest border border-outline-variant space-y-1">
                <span className="text-[11px] font-bold text-emerald-700 uppercase font-label block">Doctor's Solution</span>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {currentProject.solution_description}
                </p>
              </div>
            </div>

            {/* Technical Specifications List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label block">
                Technical Highlights & Scope
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProject.specifications.slice(0, 4).map((spec: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-primary font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/quote"
                className="btn-cta text-xs py-3 px-6 rounded-md flex items-center gap-2 font-bold shadow-sm"
              >
                <span>Request Similar Survey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Right: Interactive Before/After Drag Slider */}
          <div className="lg:col-span-6">
            <BeforeAfterSlider
              beforeImage={currentProject.before_image_url || ""}
              afterImage={currentProject.after_image_url || ""}
              beforeLabel="Before Restoration"
              afterLabel="After (The Window Doctor)"
              title={currentProject.location_city}
              subtitle={currentProject.title}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
