import React from "react";
import Link from "next/link";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import { Layers, ArrowRight, Phone } from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/supabase/mock-data";

export const metadata = {
  title: "Recent Projects & Case Studies | The Window Doctor",
  description: "Explore our portfolio of misted glass repairs, composite door installations, aluminium bi-folds, and warm roof conservatories across Oxfordshire.",
};

export default function ProjectsPage() {
  const site = DEFAULT_SITE_SETTINGS;
  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <Layers className="w-3.5 h-3.5" />
          <span>Real Projects Across Oxfordshire</span>
        </div>
        <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary">
          Our Portfolio of Precision Craftsmanship
        </h1>
        <p className="font-body text-base sm:text-body-lg text-on-surface-variant">
          Browse real before-and-after case studies from homes and commercial properties in Bicester, Oxford, Banbury, and surrounding villages.
        </p>
      </div>

      {/* Gallery Component */}
      <ProjectGallery />

      {/* Bottom CTA */}
      <div className="bg-primary text-white rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-lg">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">
            Have a Similar Project in Mind?
          </h2>
          <p className="font-body text-body-md text-slate-300">
            Let our master surveyors assess your requirements and provide a transparent, fixed-price quotation.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quote"
            className="btn-cta text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto"
          >
            <span>Book Your Free Survey</span>
            <ArrowRight className="w-4 h-4 ml-1.5 inline" />
          </Link>
          <a
            href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
            className="btn-secondary text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto"
          >
            <Phone className="w-4 h-4 text-secondary mr-1.5 inline" />
            <span>{site.phone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}

