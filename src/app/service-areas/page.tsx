import React from "react";
import Link from "next/link";
import PostcodeChecker from "@/components/areas/PostcodeChecker";
import { MOCK_SERVICE_AREAS, MOCK_POSTCODES } from "@/lib/supabase/mock-data";
import { MapPin, Clock, CheckCircle2, Phone, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Service Areas & Postcode Coverage | The Window Doctor",
  description: "Check our glazing service coverage across Bicester, Oxford, Banbury, Kidlington, Brackley, Witney, and Oxfordshire.",
};

export default function ServiceAreasPage() {
  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <MapPin className="w-3.5 h-3.5" />
          <span>Local Rapid Response Coverage</span>
        </div>
        <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary">
          Where We Provide Our Glazing Services
        </h1>
        <p className="font-body text-base sm:text-body-lg text-on-surface-variant">
          Our headquarters is based in Bucknell, Bicester. Our fully equipped mobile engineering vans operate throughout Oxfordshire and neighboring borders.
        </p>
      </div>

      {/* Postcode Checker Tool */}
      <div className="max-w-2xl mx-auto">
        <PostcodeChecker />
      </div>

      {/* Towns Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">Primary Towns & District Coverage</h2>
          <p className="font-body text-xs text-on-surface-variant font-label">All locations below receive free on-site survey and measurement visits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICE_AREAS.map((area) => {
            const areaPostcodes = MOCK_POSTCODES.filter((p) => p.area_id === area.id);
            return (
              <div
                key={area.id}
                className="card-structural p-6 space-y-4 shadow-card hover:border-secondary transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-headline font-bold text-lg text-primary">{area.town_name}</h3>
                    <span className="text-xs text-secondary font-bold font-label">{area.county}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-[12px] bg-surface-container-low border border-outline-variant text-[11px] text-on-surface-variant flex items-center gap-1 font-label">
                    <Clock className="w-3 h-3 text-secondary" />
                    <span>~{area.response_time_hours}h</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-outline-variant">
                  <span className="text-[11px] font-bold text-on-surface-variant block uppercase tracking-wider font-label">
                    Postcodes Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {areaPostcodes.map((pc) => (
                      <span
                        key={pc.id}
                        className="px-2 py-0.5 rounded-[8px] bg-surface-container-low border border-outline-variant text-xs font-mono text-primary font-bold"
                      >
                        {pc.postcode_prefix}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Free Survey & Measurement</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency On-Call Strip */}
      <div className="bg-primary text-white rounded-[24px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-headline font-bold text-lg sm:text-xl text-white">Need Urgent Glazing or Boarding in Oxfordshire?</h3>
          <p className="font-body text-xs text-slate-300">Our emergency glazing line is available for immediate assistance.</p>
        </div>
        <a
          href="tel:01869572206"
          className="btn-cta text-sm py-3 px-6 rounded-[16px] whitespace-nowrap"
        >
          <Phone className="w-4 h-4 mr-1.5 inline" />
          <span>01869 572206</span>
        </a>
      </div>

    </div>
  );
}

