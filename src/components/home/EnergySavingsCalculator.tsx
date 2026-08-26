"use client";

import React, { useState } from "react";
import { Zap, TrendingDown, ShieldCheck, ArrowRight, Gauge, PoundSterling } from "lucide-react";
import Link from "next/link";

interface HouseType {
  id: string;
  name: string;
  avgWindows: number;
  annualOldBill: number;
  estAnnualSaving: number;
  co2ReductionKg: number;
}

const HOUSE_TYPES: HouseType[] = [
  {
    id: "terraced",
    name: "Terraced / Flat",
    avgWindows: 6,
    annualOldBill: 1450,
    estAnnualSaving: 280,
    co2ReductionKg: 420,
  },
  {
    id: "semi",
    name: "Semi-Detached Home",
    avgWindows: 10,
    annualOldBill: 1950,
    estAnnualSaving: 420,
    co2ReductionKg: 680,
  },
  {
    id: "detached",
    name: "Detached 4-Bed Residence",
    avgWindows: 16,
    annualOldBill: 2850,
    estAnnualSaving: 680,
    co2ReductionKg: 1150,
  },
  {
    id: "large-estate",
    name: "Large Country House / Period Property",
    avgWindows: 24,
    annualOldBill: 4200,
    estAnnualSaving: 1050,
    co2ReductionKg: 1850,
  },
];

export default function EnergySavingsCalculator() {
  const [selectedHouse, setSelectedHouse] = useState<HouseType>(HOUSE_TYPES[1]);
  const [windowCount, setWindowCount] = useState<number>(selectedHouse.avgWindows);

  const handleHouseChange = (h: HouseType) => {
    setSelectedHouse(h);
    setWindowCount(h.avgWindows);
  };

  // Dynamic calculations based on exact window count
  const calculatedSaving = Math.round((selectedHouse.estAnnualSaving / selectedHouse.avgWindows) * windowCount);
  const tenYearSaving = calculatedSaving * 10;
  const calculatedCO2 = Math.round((selectedHouse.co2ReductionKg / selectedHouse.avgWindows) * windowCount);

  return (
    <div className="bg-primary text-white rounded-[24px] p-6 sm:p-12 relative overflow-hidden shadow-2xl space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-white/10 border border-secondary-container/30 text-secondary-container text-xs font-bold uppercase font-label">
          <Zap className="w-3.5 h-3.5" />
          <span>UK Energy Rating & Cost Simulator</span>
        </div>
        <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">
          How Much Can You Save on Heating Bills?
        </h3>
        <p className="font-body text-body-md text-slate-300">
          Upgrading failed double glazing to Argon-filled Pilkington Optitherm Low-E glass stops up to 64% of internal heat loss.
        </p>
      </div>

      {/* Interactive Controls & Live Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* Left: Selectors */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-secondary-container uppercase tracking-wider font-label block">
              1. Select Your Property Type:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOUSE_TYPES.map((h) => (
                <button
                  key={h.id}
                  onClick={() => handleHouseChange(h)}
                  className={`p-3.5 rounded-[16px] text-left transition-all border ${
                    selectedHouse.id === h.id
                      ? "bg-secondary-container text-primary font-bold border-secondary-container shadow-glow"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <span className="font-headline font-bold text-sm block">
                    {h.name}
                  </span>
                  <span className={`text-xs block font-label ${selectedHouse.id === h.id ? "text-primary/80 font-medium" : "text-slate-400"}`}>
                    Typical ~{h.avgWindows} Windows
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-label">
              <span className="text-slate-300">Number of Window Panes to Upgrade:</span>
              <strong className="text-secondary-container font-bold text-sm">{windowCount} Units</strong>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={windowCount}
              onChange={(e) => setWindowCount(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-secondary-container"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Unit</span>
              <span>15 Units</span>
              <span>30 Units</span>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Calculation Result HUD */}
        <div className="lg:col-span-6">
          <div className="bg-surface-container-lowest text-primary rounded-[24px] p-6 sm:p-8 space-y-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div>
                <span className="text-[11px] font-bold text-secondary uppercase font-label block">
                  Estimated Heating Reduction
                </span>
                <h4 className="font-headline font-bold text-xl text-primary">
                  Pilkington A+ Thermal Upgrade
                </h4>
              </div>
              <span className="px-3 py-1 rounded-[12px] bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200 font-label">
                U-Value: 1.1 W/m²K
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-[16px] bg-surface-container-low border border-outline-variant space-y-1">
                <span className="text-xs text-on-surface-variant block font-label">Annual Savings:</span>
                <div className="font-headline font-extrabold text-3xl text-emerald-700">
                  £{calculatedSaving}
                  <span className="text-xs font-normal text-on-surface-variant">/year</span>
                </div>
              </div>
              <div className="p-4 rounded-[16px] bg-surface-container-low border border-outline-variant space-y-1">
                <span className="text-xs text-on-surface-variant block font-label">10-Year Total:</span>
                <div className="font-headline font-extrabold text-3xl text-secondary">
                  £{tenYearSaving.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-[12px] bg-surface-container border border-outline-variant flex items-center justify-between text-xs font-label">
              <span className="text-on-surface-variant">Carbon Footprint Reduction:</span>
              <strong className="text-primary font-bold">~{calculatedCO2} kg CO₂ / yr</strong>
            </div>

            <Link
              href="/quote"
              className="btn-primary w-full text-xs py-3.5 rounded-[16px] text-center block"
            >
              <span>Lock In Your Free Survey Slot</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
