import React from "react";
import { Ruler, Factory, Wrench, FileCheck, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DEFAULT_PROCESS_STEPS, ProcessStepItem } from "@/lib/supabase/mock-data";

interface ProcessJourneyProps {
  steps?: ProcessStepItem[];
}

const STEP_ICONS: Record<string, React.ReactNode> = {
  "01": <Ruler className="w-5 h-5" />,
  "02": <Factory className="w-5 h-5" />,
  "03": <Wrench className="w-5 h-5" />,
  "04": <FileCheck className="w-5 h-5" />,
};

export default function ProcessJourney({ steps = DEFAULT_PROCESS_STEPS }: ProcessJourneyProps) {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
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
            key={step.id || idx}
            className="card-structural p-6 space-y-4 flex flex-col justify-between shadow-card relative group hover:border-secondary transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-md bg-primary text-secondary-container flex items-center justify-center transition-all group-hover:bg-primary-container">
                  {STEP_ICONS[step.num] || <Wrench className="w-5 h-5" />}
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
                {step.description || (step as { desc?: string }).desc}
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
