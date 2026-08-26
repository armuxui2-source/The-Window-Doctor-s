"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Sparkles, Layers, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ColorOption {
  id: string;
  name: string;
  ralCode: string;
  hex: string;
  description: string;
  popularFor: string;
  imageUrl: string;
}

const COLOR_OPTIONS: ColorOption[] = [
  {
    id: "anthracite",
    name: "Anthracite Grey",
    ralCode: "RAL 7016",
    hex: "#383E42",
    description: "Modern architectural finish with subtle matte texture, popular for contemporary extensions and brick homes.",
    popularFor: "Modern Renovations & Bi-Folds",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K",
  },
  {
    id: "chartwell",
    name: "Chartwell Green",
    ralCode: "BS 14C35",
    hex: "#8FA382",
    description: "Timeless Cotswold heritage green that harmonizes naturally with Oxfordshire limestone and rural cottages.",
    popularFor: "Cotswold Cottages & Country Homes",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC5TlH41tDAjTCl3MrbBJRzyCP5z3ZHMEMk9NkYIvxkJMMcVXNeWXNj6_S1GRW5Hu-xCKHR1n66yFkPGgXv5S_NGMExRgGMBd2IAVfi1p7jZlOCB-zaY6przm9m-lcVs4sZLF7emRqNRkD6kC_vgksdjjXXtZ1m1UtEW6_jh20SBrhrLKGcGNMAtasHIML0MA2rMb9QtKzQ7NhdbGZ7JpHFnhdot6j6RXoI6i2CnVmcEppLk5C2BN5",
  },
  {
    id: "golden-oak",
    name: "Golden Oak Woodgrain",
    ralCode: "Heritage Grain",
    hex: "#8B5A2B",
    description: "Rich natural timber-grain tactile texture with zero maintenance and maximum UV weatherproofing.",
    popularFor: "Traditional & Period Properties",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
  },
  {
    id: "agate-green",
    name: "Agate Green",
    ralCode: "RAL 7038",
    hex: "#B0B5A6",
    description: "Subtle muted sage pastel, adding an understated bespoke luxury look to front entrances and windows.",
    popularFor: "Victorian & Georgian Restorations",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsgves1M7x4qVdOsftHvJBVmU-7XTOTNqzDYSAVdNXGZXMu2RazwGdkT6Kloa2M88bIInlU-HVyg3ZdTxo_nJ8JP7JN9IG4i9BYiG_nDab6d17Mqv0aM3CUXi817p9BeIhMq-fQXJUL8wHuZHFiVSyoNOtteJhaHUF86d2-Mw7u_9GKvIcbjLuXhcWy7_79ooGISghQnRZ-0pGwDqTWEfPhmNTbVv-PoxLsdoNcVusUcVURcEjg5QJ",
  },
  {
    id: "pure-white",
    name: "Classic Smooth White",
    ralCode: "RAL 9016",
    hex: "#F5F6F8",
    description: "Crisp high-gloss or smooth satin white engineered with anti-yellowing UV stabilizers for enduring brightness.",
    popularFor: "Classic British Architecture",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
  },
];

export default function FrameColorConfigurator() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);

  return (
    <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-10 border border-outline-variant shadow-card space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Material Visualiser</span>
          </div>
          <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Custom Frame Finishes & Architectural Colours
          </h3>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl">
            Choose from over 30 bespoke RAL shades and authentic timber foils manufactured with 10-year UV fade resistance.
          </p>
        </div>

        <div className="text-left md:text-right font-label">
          <span className="text-xs text-on-surface-variant block">Selected Palette:</span>
          <span className="font-headline font-bold text-base text-primary">{selectedColor.name}</span>
          <span className="text-xs font-mono text-secondary font-bold block">{selectedColor.ralCode}</span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Swatches Selector & Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label block">
              1. Select Frame Colour Swatch:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COLOR_OPTIONS.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`p-3 rounded-[16px] border text-left transition-all flex items-center gap-3 ${
                      isSelected
                        ? "bg-surface-container-lowest border-primary ring-2 ring-primary shadow-sm"
                        : "bg-surface-container-lowest/60 border-outline-variant hover:bg-surface-container-lowest"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-black/10 flex-shrink-0 flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    >
                      {isSelected && (
                        <Check className={`w-4 h-4 ${c.id === "pure-white" ? "text-primary" : "text-white"}`} />
                      )}
                    </span>
                    <div className="truncate">
                      <span className="font-headline font-bold text-xs text-primary block truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono block truncate">
                        {c.ralCode}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Details Box */}
          <div className="p-5 rounded-[16px] bg-surface-container-lowest border border-outline-variant space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-secondary font-label">Architectural Profile:</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-[8px] border border-emerald-200">
                {selectedColor.popularFor}
              </span>
            </div>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              {selectedColor.description}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-outline-variant text-[11px] font-label">
              <div>
                <span className="text-on-surface-variant block">UV Resistance:</span>
                <strong className="text-primary font-bold">Class 1 Severe Weather</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Warranty:</span>
                <strong className="text-secondary font-bold">10-Year Colour Fastness</strong>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/quote"
              className="btn-cta text-xs py-3 px-6 rounded-[16px] inline-flex items-center gap-2"
            >
              <span>Request Free Swatch Sample Pack</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right: Live Preview Image */}
        <div className="lg:col-span-6">
          <div className="relative h-72 sm:h-96 w-full rounded-[24px] overflow-hidden border border-outline-variant shadow-card group">
            <Image
              src={selectedColor.imageUrl}
              alt={`${selectedColor.name} Window & Door Installation`}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-[16px] bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[11px] text-secondary font-bold font-label block uppercase">
                  Live Visual Sample
                </span>
                <h4 className="font-headline font-bold text-sm text-primary">
                  {selectedColor.name} ({selectedColor.ralCode})
                </h4>
              </div>
              <span className="text-xs font-bold text-primary px-3 py-1.5 rounded-[12px] bg-surface-container-low border border-outline-variant font-label">
                FENSA Approved
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
