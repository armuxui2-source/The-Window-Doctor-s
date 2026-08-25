"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, CheckCircle, Sparkles, X } from "lucide-react";
import { MOCK_PROJECTS, MOCK_CATEGORIES } from "@/lib/supabase/mock-data";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import { cn } from "@/lib/utils";

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProjectForModal, setActiveProjectForModal] = useState<typeof MOCK_PROJECTS[0] | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter((p) => {
        if (selectedCategory === "glass-repairs") return p.service_id === "srv-1";
        if (selectedCategory === "doors") return p.service_id === "srv-3";
        if (selectedCategory === "conservatories") return p.service_id === "srv-4";
        return true;
      });

  return (
    <div className="space-y-10">
      
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "px-4 py-2 rounded-md text-xs font-bold transition-all font-label",
            selectedCategory === "all"
              ? "bg-primary text-secondary-container shadow-sm"
              : "bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low"
          )}
        >
          All Projects
        </button>
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={cn(
              "px-4 py-2 rounded-md text-xs font-bold transition-all font-label",
              selectedCategory === cat.slug
                ? "bg-primary text-secondary-container shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low"
            )}
          >
            {cat.name_en}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card-structural overflow-hidden flex flex-col justify-between group shadow-card"
          >
            <div className="relative h-60 w-full overflow-hidden bg-surface-container-low">
              <Image
                src={project.after_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-primary/90 text-secondary-container text-[11px] font-bold flex items-center gap-1 font-label backdrop-blur-sm">
                <MapPin className="w-3 h-3" />
                <span>{project.location_city}</span>
              </div>

              {project.before_image_url && (
                <button
                  onClick={() => setActiveProjectForModal(project)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-primary/90 text-white hover:text-secondary-container text-xs font-bold flex items-center gap-1.5 transition-all shadow-md backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-secondary-container" />
                  <span>View Before & After</span>
                </button>
              )}
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-headline font-bold text-lg text-primary group-hover:text-secondary transition-colors">
                  {project.title}
                </h4>
                <p className="font-body text-xs text-on-surface-variant line-clamp-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant space-y-2">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider block font-label">
                  Project Highlights:
                </span>
                <div className="space-y-1">
                  {project.specifications.slice(0, 2).map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-primary font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Before/After Slider */}
      {activeProjectForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-md animate-fade-in">
          <div className="bg-surface-container-lowest rounded-lg p-6 sm:p-8 max-w-4xl w-full border border-outline-variant shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
                  Case Study & Interactive Comparison
                </span>
                <h3 className="font-headline font-bold text-xl text-primary mt-1">
                  {activeProjectForModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProjectForModal(null)}
                className="p-2 rounded-md bg-surface-container-low hover:bg-surface-container text-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <BeforeAfterSlider
              beforeImage={activeProjectForModal.before_image_url || ""}
              afterImage={activeProjectForModal.after_image_url || ""}
              title={activeProjectForModal.title}
              subtitle={`${activeProjectForModal.location_city} • Completed ${activeProjectForModal.completion_year}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
              <div className="p-4 rounded-md bg-surface-container-low border border-outline-variant space-y-1">
                <strong className="text-secondary font-bold font-label block">The Challenge:</strong>
                <p className="text-on-surface-variant leading-relaxed">{activeProjectForModal.challenge_description}</p>
              </div>
              <div className="p-4 rounded-md bg-surface-container-low border border-outline-variant space-y-1">
                <strong className="text-emerald-700 font-bold font-label block">The Window Doctor Solution:</strong>
                <p className="text-on-surface-variant leading-relaxed">{activeProjectForModal.solution_description}</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setActiveProjectForModal(null)}
                className="btn-secondary text-xs py-2 px-6 rounded-md"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
