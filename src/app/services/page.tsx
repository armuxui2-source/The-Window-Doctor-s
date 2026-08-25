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
import { MOCK_SERVICES } from "@/lib/supabase/mock-data";

export const metadata = {
  title: "Glazing & Window Services Catalog | The Window Doctor Bicester",
  description: "Explore our complete range of misted glass repairs, energy-efficient uPVC & aluminium windows, composite doors, and warm roofs in Oxfordshire.",
};

export default function ServicesPage() {
  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
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
              <div className="relative h-52 w-full overflow-hidden bg-surface-container-low">
                <Image
                  src={srv.hero_image_url || ""}
                  alt={srv.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-[12px] bg-primary/90 text-secondary-container text-xs font-bold font-label backdrop-blur-md">
                  From £{srv.base_price_estimate} {srv.price_unit}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center flex-shrink-0">
                    {srv.slug === "misted-glass-repair" && <Sparkles className="w-5 h-5" />}
                    {srv.slug === "modern-windows" && <Grid className="w-5 h-5" />}
                    {srv.slug === "stylish-doors" && <DoorClosed className="w-5 h-5" />}
                    {srv.slug === "warm-roof-conservatories" && <Home className="w-5 h-5" />}
                    {srv.slug === "glass-balustrades" && <Shield className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg text-primary group-hover:text-secondary transition-colors">
                      {srv.title}
                    </h3>
                    <span className="text-xs text-secondary font-bold font-label block -mt-0.5">
                      {srv.headline}
                    </span>
                  </div>
                </div>

                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {srv.short_description}
                </p>

                <ul className="space-y-2 pt-3 border-t border-outline-variant">
                  {srv.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-on-surface font-medium">
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
                className="btn-primary w-full text-xs py-3 rounded-[16px]"
              >
                <span>View Full Specifications</span>
                <ChevronRight className="w-4 h-4 ml-1.5 inline" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-primary text-white rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-lg">
        <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">Need a Custom Glazing Solution?</h2>
        <p className="font-body text-body-md text-slate-300 max-w-xl mx-auto">
          Our surveyors can visit your property for a free, comprehensive inspection and precise measurements.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-cta text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto">
            <span>Book Free On-Site Survey</span>
            <ArrowRight className="w-4 h-4 ml-1.5 inline" />
          </Link>
          <a href="tel:01869572206" className="btn-secondary text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto">
            <Phone className="w-4 h-4 text-secondary mr-1.5 inline" />
            <span>01869 572206</span>
          </a>
        </div>
      </div>

    </div>
  );
}
