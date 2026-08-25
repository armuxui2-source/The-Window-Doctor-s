import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Grid, 
  DoorClosed, 
  Home, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Phone,
  Wrench,
  Award
} from "lucide-react";
import { MOCK_SERVICES, DEFAULT_SITE_SETTINGS } from "@/lib/supabase/mock-data";

export const metadata = {
  title: "Glazing & Window Services Catalog | The Window Doctor Bicester",
  description: "Explore our complete range of misted glass repairs, energy-efficient uPVC & aluminium windows, composite doors, and warm roofs in Oxfordshire.",
};

export default function ServicesPage() {
  const site = DEFAULT_SITE_SETTINGS;
  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <Wrench className="w-3.5 h-3.5" />
          <span>Bicester & Oxfordshire Glazing Catalog</span>
        </div>
        <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary">
          Master Glazing & Fenestration Services
        </h1>
        <p className="font-body text-base sm:text-body-lg text-on-surface-variant">
          Engineered for British weather, security, and maximum energy savings. 40+ years of local craftsmanship backed by 10-year insurance guarantees.
        </p>
      </div>

      {/* Services Grid with 16px Structural Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="card-structural flex flex-col justify-between overflow-hidden shadow-card group"
          >
            <div>
              {/* Image Container (16:9 Aspect Ratio) */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={srv.hero_image_url || "/window-hero.jpg"}
                  alt={srv.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-primary/80 backdrop-blur-md text-white text-[11px] font-bold font-label">
                  From £{srv.base_price_estimate} {srv.price_unit}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-secondary font-bold font-label">
                    10-Year Insurance Guarantee
                  </span>
                  <h3 className="font-headline font-bold text-xl text-primary">
                    {srv.title}
                  </h3>
                </div>

                <p className="font-body text-body-sm text-on-surface-variant line-clamp-3">
                  {srv.short_description}
                </p>

                {/* Key Features List */}
                <ul className="space-y-2 pt-2 border-t border-outline-variant text-xs text-on-surface-variant font-label">
                  {srv.features?.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-6 pt-0">
              <Link
                href={`/services/${srv.slug}`}
                className="btn-primary w-full text-xs py-3 rounded-md"
              >
                <span>View Full Specifications</span>
                <ChevronRight className="w-4 h-4 ml-1.5 inline" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-primary text-white rounded-lg p-8 sm:p-12 text-center space-y-6 shadow-lg">
        <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">Need a Custom Glazing Solution?</h2>
        <p className="font-body text-body-md text-slate-300 max-w-xl mx-auto">
          Our surveyors can visit your property for a free, comprehensive inspection and precise measurements.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-cta text-sm py-3.5 px-8 rounded-md w-full sm:w-auto">
            <span>Book Free On-Site Survey</span>
            <ArrowRight className="w-4 h-4 ml-1.5 inline" />
          </Link>
          <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className="btn-secondary text-sm py-3.5 px-8 rounded-md w-full sm:w-auto">
            <Phone className="w-4 h-4 text-secondary mr-1.5 inline" />
            <span>{site.phone}</span>
          </a>
        </div>
      </div>

    </div>
  );
}
