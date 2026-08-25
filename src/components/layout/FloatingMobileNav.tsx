"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Wrench, 
  Layers, 
  Calculator, 
  Phone 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloatingMobileNav() {
  const pathname = usePathname();

  // Don't display in admin views if we want full screen
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav className="bg-primary/95 text-white rounded-full px-4 py-2.5 shadow-2xl border border-secondary-container/20 flex items-center justify-around gap-1 backdrop-blur-xl">
          
          {/* Home */}
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-full transition-colors",
              pathname === "/" ? "text-secondary-container font-bold" : "text-slate-400 hover:text-white"
            )}
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-label mt-0.5">Home</span>
          </Link>

          {/* Services */}
          <Link
            href="/services/misted-glass-repair"
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-full transition-colors",
              pathname?.startsWith("/services") ? "text-secondary-container font-bold" : "text-slate-400 hover:text-white"
            )}
            aria-label="Services"
          >
            <Wrench className="w-5 h-5" />
            <span className="text-[10px] font-label mt-0.5">Services</span>
          </Link>

          {/* Center Quote CTA Capsule */}
          <Link
            href="/quote"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-container text-primary font-bold text-xs shadow-sm active:scale-95 transition-transform"
            aria-label="Get a Quote"
          >
            <Calculator className="w-4 h-4" />
            <span>Quote</span>
          </Link>

          {/* Projects */}
          <Link
            href="/projects"
            className={cn(
              "flex flex-col items-center justify-center p-2 rounded-full transition-colors",
              pathname === "/projects" ? "text-secondary-container font-bold" : "text-slate-400 hover:text-white"
            )}
            aria-label="Projects"
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-label mt-0.5">Projects</span>
          </Link>

          {/* Direct Call */}
          <a
            href="tel:01869572206"
            className="flex flex-col items-center justify-center p-2 rounded-full text-slate-400 hover:text-secondary-container active:text-secondary-container transition-colors"
            aria-label="Call 01869 572206"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[10px] font-label mt-0.5">Call</span>
          </a>

        </nav>
      </div>
    </div>
  );
}

