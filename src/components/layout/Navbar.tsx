"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Grid, 
  DoorClosed, 
  Home, 
  Shield, 
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_SITE_SETTINGS } from "@/lib/supabase/mock-data";

export default function Navbar() {
  const site = DEFAULT_SITE_SETTINGS;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(true);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceLinks = [
    { title: "Misted Glass Repairs", href: "/services/misted-glass-repair", desc: "Save up to 70% replacing glass only", icon: Sparkles },
    { title: "Modern Windows", href: "/services/modern-windows", desc: "Flush sash & casement A++ rated", icon: Grid },
    { title: "Doors Collection", href: "/services/stylish-doors", desc: "Composite front & panoramic bi-folds", icon: DoorClosed },
    { title: "Warm Roof Conservatories", href: "/services/warm-roof-conservatories", desc: "All-year insulated tiled conversions", icon: Home },
    { title: "Glass Balustrades", href: "/services/glass-balustrades", desc: "Frameless structural safety glass", icon: Shield },
  ];

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 w-full bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant",
          isScrolled ? "shadow-md py-2" : "py-3"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Official Circular Badge */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none flex-shrink-0">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="The Window Doctor's Est. 1983 Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-extrabold text-base sm:text-lg tracking-tight text-primary group-hover:text-secondary transition-colors duration-200 whitespace-nowrap">
                The Window Doctor’s
              </span>
              <span className="text-[10px] sm:text-[11px] text-secondary font-bold tracking-wider uppercase -mt-0.5 font-label whitespace-nowrap">
                Est. 1983 • Bicester & Oxford
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-nowrap">
            <Link 
              href="/" 
              className={cn(
                "px-3 py-2 rounded-[14px] text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                pathname === "/" 
                  ? "text-primary bg-surface-container font-bold" 
                  : "text-on-surface hover:text-primary hover:bg-surface-container-low"
              )}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={cn(
                  "px-3 py-2 rounded-[14px] text-sm font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  pathname?.startsWith("/services") 
                    ? "text-primary bg-surface-container font-bold" 
                    : "text-on-surface hover:text-primary hover:bg-surface-container-low"
                )}
              >
                <span>Services</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200 text-on-surface-variant", servicesDropdownOpen ? "rotate-180 text-primary" : "")} />
              </button>

              {/* Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-surface-container-lowest border border-outline-variant rounded-[18px] shadow-2xl p-2.5 z-50 animate-fade-in space-y-1">
                  <div className="px-3 py-1.5 border-b border-outline-variant/60">
                    <span className="text-[11px] font-bold text-secondary uppercase font-label">Our Glazing Services</span>
                  </div>
                  {serviceLinks.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        className="flex items-start gap-3 p-2.5 rounded-[12px] hover:bg-surface-container transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 group-hover/item:bg-primary group-hover/item:text-secondary-container transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-headline font-bold text-xs text-primary group-hover/item:text-secondary transition-colors block">
                            {srv.title}
                          </span>
                          <span className="text-[11px] text-on-surface-variant line-clamp-1">
                            {srv.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link 
              href="/projects" 
              className={cn(
                "px-3 py-2 rounded-[14px] text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                pathname === "/projects" 
                  ? "text-primary bg-surface-container font-bold" 
                  : "text-on-surface hover:text-primary hover:bg-surface-container-low"
              )}
            >
              Case Studies
            </Link>

            <Link 
              href="/service-areas" 
              className={cn(
                "px-3 py-2 rounded-[14px] text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                pathname === "/service-areas" 
                  ? "text-primary bg-surface-container font-bold" 
                  : "text-on-surface hover:text-primary hover:bg-surface-container-low"
              )}
            >
              Service Areas
            </Link>

            <Link 
              href="/about" 
              className={cn(
                "px-3 py-2 rounded-[14px] text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                pathname === "/about" 
                  ? "text-primary bg-surface-container font-bold" 
                  : "text-on-surface hover:text-primary hover:bg-surface-container-low"
              )}
            >
              About Us
            </Link>
          </nav>

          {/* Right Call & Quote Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <a
              href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-[14px] text-xs font-bold text-primary bg-surface-container-low hover:bg-surface-container border border-outline-variant transition-colors whitespace-nowrap font-label"
            >
              <Phone className="w-3.5 h-3.5 text-secondary" />
              <span>{site.phone}</span>
            </a>

            <Link
              href="/quote"
              className="btn-cta text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-[14px] flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              <span>Free Survey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              id="mobile-menu-btn"
              className="lg:hidden p-2.5 rounded-[14px] bg-surface-container hover:bg-surface-container-high text-primary focus:outline-none transition-colors border border-outline-variant"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Backdrop & Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-Out Drawer Menu (Hamburger Menu) */}
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[88%] max-w-sm bg-surface-container-lowest z-[85] lg:hidden shadow-2xl border-l border-outline-variant flex flex-col justify-between transition-transform duration-300 ease-out transform",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-primary/20">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-headline font-bold text-sm text-primary block leading-tight">The Window Doctor’s</span>
              <span className="text-[10px] text-secondary font-bold font-label uppercase">Est. 1983 • Bicester</span>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-label">
          
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors",
                pathname === "/" ? "bg-primary text-secondary-container" : "text-primary hover:bg-surface-container"
              )}
            >
              <Home className="w-4 h-4" />
              <span>Home Page</span>
            </Link>

            {/* Services Accordion */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-secondary uppercase bg-surface-container-low border border-outline-variant"
              >
                <span>Glazing Services</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", mobileServicesExpanded ? "rotate-180" : "")} />
              </button>

              {mobileServicesExpanded && (
                <div className="space-y-1 pl-2 pt-1">
                  {serviceLinks.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <Link
                        key={srv.href}
                        href={srv.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-on-surface hover:text-primary hover:bg-surface-container"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-secondary" />
                          <span>{srv.title}</span>
                        </span>
                        <span className="text-secondary font-bold">›</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors",
                pathname === "/projects" ? "bg-primary text-secondary-container" : "text-primary hover:bg-surface-container"
              )}
            >
              <Grid className="w-4 h-4" />
              <span>Case Studies & Projects</span>
            </Link>

            <Link
              href="/service-areas"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors",
                pathname === "/service-areas" ? "bg-primary text-secondary-container" : "text-primary hover:bg-surface-container"
              )}
            >
              <MapPin className="w-4 h-4" />
              <span>Oxfordshire Postcodes</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors",
                pathname === "/about" ? "bg-primary text-secondary-container" : "text-primary hover:bg-surface-container"
              )}
            >
              <Clock className="w-4 h-4" />
              <span>About Us (40+ Yrs)</span>
            </Link>
          </div>

          {/* Trust Highlights Box */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>FENSA Registered No. {site.fensaNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>10-Year Insurance-Backed Guarantee</span>
            </div>
          </div>

        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low space-y-2 font-label">
          <a
            href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}
            className="w-full btn-secondary text-xs py-3 rounded-xl flex items-center justify-center gap-2 font-bold"
          >
            <Phone className="w-4 h-4 text-secondary" />
            <span>Call: {site.phone}</span>
          </a>

          <Link
            href="/quote"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn-cta text-xs py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Instant Quote & Survey</span>
          </Link>
        </div>

      </div>
    </>
  );
}
