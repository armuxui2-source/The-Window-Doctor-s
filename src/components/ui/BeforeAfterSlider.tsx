"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before (Misted / Foggy)",
  afterLabel = "After (The Window Doctor)",
  title,
  subtitle,
  className,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(position);
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className={cn("space-y-3", className)}>
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          {title && <h3 className="font-bold text-lg text-white">{title}</h3>}
          {subtitle && <span className="text-xs text-brand-gold">{subtitle}</span>}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/[0.1] shadow-2xl glass-card-dark"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background / Base) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="After restoration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-brand-navy/90 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-bold flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <Image
            src={beforeImage}
            alt="Before restoration"
            fill
            className="object-cover brightness-90 contrast-95"
            priority
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-brand-navy/90 backdrop-blur-md border border-white/[0.2] text-slate-300 text-xs font-bold shadow-lg">
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Divider Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-navy border-2 border-brand-gold flex items-center justify-center text-brand-gold shadow-glow cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Drag Helper Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-brand-navy/80 backdrop-blur-md border border-white/[0.08] text-[11px] text-slate-300 pointer-events-none flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-brand-gold" />
          <span>Drag slider left/right to compare</span>
        </div>
      </div>
    </div>
  );
}
