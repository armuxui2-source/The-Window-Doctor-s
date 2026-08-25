import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  FileText,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10 text-slate-300 pt-16 pb-24 lg:pb-12 mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-label">FENSA Certified</span>
              <span className="text-[11px] text-slate-400">Reg. No. 28491</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-label">10-Year Guarantee</span>
              <span className="text-[11px] text-slate-400">Insurance-Backed</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-label">British Standards</span>
              <span className="text-[11px] text-slate-400">BS 6180 & PAS 24</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 border border-secondary-container/20 flex items-center justify-center text-secondary-container flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-label">40+ Years Heritage</span>
              <span className="text-[11px] text-slate-400">Est. 1983 Bicester</span>
            </div>
          </div>
        </div>

        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info & Official Logo (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-secondary-container/30 shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="The Window Doctor's Est. 1983"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-extrabold text-lg text-white">The Window Doctor’s</span>
                <span className="text-xs text-secondary-container font-semibold font-label">Oxfordshire Glazing Specialists</span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body">
              Family-owned fenestration and glazing specialists based in Bucknell, Bicester. Delivering high-precision window installations, composite doors, warm roofs, and cost-saving glass repairs across Oxfordshire since 1983.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/10 border border-secondary-container/20 text-secondary-container text-xs font-medium font-label">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Accepting Free Survey Bookings Across Oxfordshire</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core Glazing Services (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-body">
              <li>
                <Link href="/services/misted-glass-repair" className="hover:text-secondary-container transition-colors flex items-center gap-2">
                  <span className="text-secondary-container">›</span> Misted Glass & Foggy Unit Repairs
                </Link>
              </li>
              <li>
                <Link href="/services/modern-windows" className="hover:text-secondary-container transition-colors flex items-center gap-2">
                  <span className="text-secondary-container">›</span> Casement & Flush Sash Windows
                </Link>
              </li>
              <li>
                <Link href="/services/stylish-doors" className="hover:text-secondary-container transition-colors flex items-center gap-2">
                  <span className="text-secondary-container">›</span> Solid Composite & Bi-fold Doors
                </Link>
              </li>
              <li>
                <Link href="/services/warm-roof-conservatories" className="hover:text-secondary-container transition-colors flex items-center gap-2">
                  <span className="text-secondary-container">›</span> Warm Roof Conservatory Upgrades
                </Link>
              </li>
              <li>
                <Link href="/services/glass-balustrades" className="hover:text-secondary-container transition-colors flex items-center gap-2">
                  <span className="text-secondary-container">›</span> Frameless Glass Balustrades
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-secondary-container transition-colors flex items-center gap-2 text-secondary-container font-bold">
                  <span className="text-secondary-container">›</span> Free Home Survey & Online Price Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas & Regions (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Coverage Areas
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-body">
              <li className="flex items-center justify-between">
                <span>Bicester & Bucknell</span>
                <span className="text-xs text-secondary-container font-mono">OX25/26</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Oxford City</span>
                <span className="text-xs text-secondary-container font-mono">OX1-OX4</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Banbury Town</span>
                <span className="text-xs text-secondary-container font-mono">OX15/16</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Kidlington & Woodstock</span>
                <span className="text-xs text-secondary-container font-mono">OX5/OX20</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Brackley & Buckingham</span>
                <span className="text-xs text-secondary-container font-mono">NN13/MK18</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Witney & Cotswolds</span>
                <span className="text-xs text-secondary-container font-mono">OX28/29</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Workshop Details (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-headline text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Workshop & Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-body">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-container flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">Home Farm, Bainton Road, Bucknell, Bicester, OX27 7LT</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary-container flex-shrink-0" />
                <a href="tel:01869572206" className="text-white hover:text-secondary-container font-bold transition-colors">
                  01869 572206
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary-container flex-shrink-0" />
                <a href="mailto:info@thewindowdoctors.co.uk" className="text-slate-300 hover:text-secondary-container transition-colors text-xs">
                  info@thewindowdoctors.co.uk
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-slate-400 space-y-1 font-label">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-white font-medium">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-medium">8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Sunday:</span>
                <span className="text-secondary-container font-medium">Emergency Glazing On-Call</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 font-label">
          <p>© 1983 - 2026 The Window Doctor’s. All rights reserved. Bicester & Oxfordshire.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">FENSA Reg. 28491</Link>
            <Link href="/service-areas" className="hover:text-slate-300 transition-colors">Oxfordshire Coverage</Link>
            <Link href="/admin" className="hover:text-secondary-container transition-colors flex items-center gap-1">
              <FileText className="w-3 h-3" /> Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
