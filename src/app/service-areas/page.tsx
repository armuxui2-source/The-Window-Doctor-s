import React from "react";
import Link from "next/link";
import PostcodeChecker from "@/components/areas/PostcodeChecker";
import { MOCK_SERVICE_AREAS, MOCK_POSTCODES, DEFAULT_SITE_SETTINGS } from "@/lib/supabase/mock-data";
import { MapPin, Clock, CheckCircle2, Phone, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Service Areas & Postcode Coverage | The Window Doctor",
  description: "Check our glazing service coverage across Bicester, Oxford, Banbury, Kidlington, Brackley, Witney, and Oxfordshire.",
};

export default function ServiceAreasPage() {
  const site = DEFAULT_SITE_SETTINGS;
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
          Our headquarters is based in {site.city}. Our fully equipped mobile engineering vans operate throughout Oxfordshire and neighboring borders.
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
                  <div className="space-y-1">
                    <h3 className="font-headline font-bold text-lg text-primary">{area.town_name}</h3>
                    <span className="text-xs text-secondary font-bold font-label flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{area.response_time_hours}-Hour Max Response</span>
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-label">
                    {area.county}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-outline-variant">
                  <span className="text-[11px] font-bold uppercase text-on-surface-variant block font-label">
                    Postcodes Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {areaPostcodes.map((pc) => (
                      <span
                        key={pc.id}
                        className="px-2 py-0.5 rounded-[8px] bg-surface-container-low text-primary text-xs font-mono font-bold border border-outline-variant"
                        title={pc.region_name}
                      >
                        {pc.postcode_prefix}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-label">
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Home Surveys</span>
                  </span>
                  <Link
                    href={`/quote?area=${encodeURIComponent(area.town_name)}`}
                    className="text-secondary hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>Book Survey</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
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
          href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
          className="btn-cta text-sm py-3 px-6 rounded-[16px] whitespace-nowrap"
        >
          <Phone className="w-4 h-4 mr-1.5 inline" />
          <span>{site.phone}</span>
        </a>
      </div>

    </div>
  );
}

