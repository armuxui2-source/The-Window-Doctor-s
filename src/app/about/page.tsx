import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle, 
  Wrench, 
  Users, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { DEFAULT_SITE_SETTINGS } from "@/lib/supabase/mock-data";

export const metadata = {
  title: "About Us & 40+ Years Heritage (Est. 1983) | The Window Doctor",
  description: "Learn about The Window Doctor's 40-year history as a local family-owned glazing business in Bicester, Oxfordshire. FENSA Certified, master glaziers.",
};

export default function AboutPage() {
  const site = DEFAULT_SITE_SETTINGS;
  const milestones = [
    { year: "1983", title: "Founded in Bicester", desc: "Started as a dedicated local family glazing repair service in Bucknell, Bicester." },
    { year: "1995", title: "FENSA Registration", desc: "Among the earliest regional companies to secure full FENSA accreditation and British Standards compliance." },
    { year: "2008", title: "Advanced Thermal Glazing", desc: "Pioneered Argon-gas Low-E unit replacement techniques to save customers replacing entire frames." },
    { year: "2024+", title: "40+ Years of Master Glazing", desc: "Over 25,000 successful window, door, conservatory, and balustrade installations completed across Oxfordshire." },
  ];

  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <Clock className="w-3.5 h-3.5" />
          <span>Established 1983 • 40+ Years Heritage</span>
        </div>
        <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary">
          A Legacy of Honest Craftsmanship
        </h1>
        <p className="font-body text-base sm:text-body-lg text-on-surface-variant">
          {site.businessName} has been trusted by thousands of homeowners and businesses throughout Oxfordshire for over four decades.
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Local Family Values, Global Engineering Standards
          </h2>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            When we established {site.businessName} in 1983, our mission was simple: provide local homeowners with honest, top-tier fenestration solutions without the high-pressure sales tactics common in the double glazing industry.
          </p>
          <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
            Our master glaziers take genuine pride in diagnosing whether your windows truly need full replacement or if a precise glass seal repair will restore their original thermal performance at a fraction of the cost.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4.5 rounded-md bg-surface-container-low border border-outline-variant space-y-1">
              <span className="font-headline text-3xl font-extrabold text-secondary">40+</span>
              <span className="text-xs text-on-surface-variant block font-label">Years in Business</span>
            </div>
            <div className="p-4.5 rounded-md bg-surface-container-low border border-outline-variant space-y-1">
              <span className="font-headline text-3xl font-extrabold text-emerald-700">25,000+</span>
              <span className="text-xs text-on-surface-variant block font-label">Units Installed</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-lg overflow-hidden border border-outline-variant shadow-card">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I"
            alt="The Window Doctor Master Glaziers"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* 40-Year Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">Our 40-Year Journey</h2>
          <p className="font-body text-xs text-on-surface-variant font-label">Continuous innovation in glass insulation and security standards.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="card-structural p-6 space-y-3 relative overflow-hidden shadow-card"
            >
              <div className="text-2xl font-extrabold text-secondary font-headline">{m.year}</div>
              <h4 className="font-headline text-base font-bold text-primary">{m.title}</h4>
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="bg-primary text-white rounded-lg p-8 sm:p-12 text-center space-y-6 shadow-lg">
        <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">Experience 40+ Years of Glazing Mastery</h2>
        <p className="font-body text-body-md text-slate-300 max-w-xl mx-auto">
          Contact our local team in Bicester for honest advice and a no-obligation quote today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-cta text-sm py-3.5 px-8 rounded-md w-full sm:w-auto">
            <span>Request Free Quote</span>
            <ArrowRight className="w-4 h-4 ml-1.5 inline" />
          </Link>
          <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className="btn-secondary text-sm py-3.5 px-8 rounded-md w-full sm:w-auto">
            {site.phone}
          </a>
        </div>
      </div>

    </div>
  );
}
