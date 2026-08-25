import React from "react";
import { Ruler, Factory, Wrench, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ProcessJourney() {
  const steps = [
    {
      num: "01",
      icon: <Ruler className="w-5 h-5" />,
      title: "Laser Precision Survey",
      timing: "Free • 30 Mins",
      desc: "Our master glazier visits your home with digital laser gauges to measure exact unit dimensions, glass thickness, and spacer specs.",
    },
    {
      num: "02",
      icon: <Factory className="w-5 h-5" />,
      title: "Bespoke UK Glazing",
      timing: "2-4 Working Days",
      desc: "Your replacement units are hermetically sealed with Swissspacer warm edge bars and 90% pure Argon thermal gas in our regional workshop.",
    },
    {
      num: "03",
      icon: <Wrench className="w-5 h-5" />,
      title: "Clean Master Installation",
      timing: "30-45 Mins / Pane",
      desc: "Beads are carefully unclipped, the failed unit is removed, and the new crystal unit is seated with zero mess and zero plaster damage.",
    },
    {
      num: "04",
      icon: <FileCheck className="w-5 h-5" />,
      title: "10-Year Certificate",
      timing: "Instant Handover",
      desc: "We test all handles, lubricate hinges, and issue your official 10-Year Insurance-Backed Anti-Fog Guarantee and FENSA documentation.",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Window Doctor Standard</span>
        </div>
        <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
          Our Seamless 4-Stage Precision Process
        </h3>
        <p className="font-body text-body-md text-on-surface-variant">
          From your initial inquiry to final handover, experience four decades of refined master craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="card-structural p-6 space-y-4 flex flex-col justify-between shadow-card relative group hover:border-secondary transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-[16px] bg-primary text-secondary-container flex items-center justify-center transition-all group-hover:bg-primary-container">
                  {step.icon}
                </div>
                <span className="font-headline font-extrabold text-2xl text-secondary/30 group-hover:text-secondary transition-colors">
                  {step.num}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="font-headline font-bold text-base text-primary">
                  {step.title}
                </h4>
                <span className="text-[11px] font-bold text-secondary font-label block">
                  {step.timing}
                </span>
              </div>

              <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                {step.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-outline-variant text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 font-label">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Full Quality Sign-off</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
