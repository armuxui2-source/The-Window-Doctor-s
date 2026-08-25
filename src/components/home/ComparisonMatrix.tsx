import React from "react";
import { Check, X, ShieldCheck, TrendingDown, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { DEFAULT_COMPARISON_ROWS, ComparisonItem } from "@/lib/supabase/mock-data";

interface ComparisonMatrixProps {
  rows?: ComparisonItem[];
}

export default function ComparisonMatrix({ rows = DEFAULT_COMPARISON_ROWS }: ComparisonMatrixProps) {
  const comparisonData = rows;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Honest Price & Disruption Comparison</span>
        </div>
        <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
          Why Replace The Whole Window When Only The Seal Failed?
        </h3>
        <p className="font-body text-body-md text-on-surface-variant">
          See how our targeted glass replacement saves you thousands of pounds with zero disruption to your Oxfordshire home.
        </p>
      </div>

      {/* Comparison Table / Cards */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px] rounded-lg overflow-hidden border border-outline-variant shadow-card bg-surface-container-lowest">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="p-5 font-headline font-bold text-sm text-primary w-1/3">
                  Service Feature
                </th>
                <th className="p-5 bg-primary text-white font-headline font-bold text-sm w-1/3 rounded-tl-[16px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                    <span>The Window Doctor</span>
                  </div>
                  <span className="text-[11px] text-secondary-container font-label font-normal block mt-0.5">
                    (Targeted Glazing Repair)
                  </span>
                </th>
                <th className="p-5 font-headline font-bold text-sm text-on-surface-variant w-1/3 bg-surface-container-low">
                  National Window Sales
                  <span className="text-[11px] text-on-surface-variant font-label font-normal block mt-0.5">
                    (Full Frame Replacement)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body text-xs sm:text-sm">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-5 font-headline font-semibold text-primary">
                    {row.feature}
                  </td>
                  <td className="p-5 bg-secondary-container/10 font-bold text-primary border-x border-secondary-container/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{row.windowDoctor}</span>
                    </div>
                  </td>
                  <td className="p-5 text-on-surface-variant bg-surface-container-low/30">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{row.nationalGuys}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/quote"
          className="btn-cta text-sm py-3.5 px-8 rounded-md inline-flex items-center gap-2"
        >
          <span>Calculate How Much You Can Save</span>
        </Link>
      </div>
    </div>
  );
}
