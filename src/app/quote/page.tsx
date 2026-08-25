import React from "react";
import QuoteWizard from "@/components/quote/QuoteWizard";
import { Calculator, ShieldCheck, Clock, CheckCircle, Phone, MapPin, Mail, Sparkles } from "lucide-react";

export const metadata = {
  title: "Get a Free Survey & Indicative Quote | The Window Doctor’s",
  description: "Request a free on-site survey or get an instant online indicative estimate for window, door, or glass repairs in Oxfordshire.",
};

export default function QuotePage() {
  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
          <Calculator className="w-3.5 h-3.5" />
          <span>No Obligation • Free Home Survey</span>
        </div>
        <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary">
          Request Your Free Quote & Survey
        </h1>
        <p className="font-body text-base sm:text-body-lg text-on-surface-variant">
          Complete our quick 60-second wizard below or call our Bicester office directly to speak with a master glazing specialist.
        </p>
      </div>

      {/* Main Form & Contact Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 4 Cols: Contact Details & Operating Hours */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="card-structural p-6 sm:p-8 space-y-6 shadow-card">
            <h3 className="font-headline font-bold text-lg text-primary border-b border-outline-variant pb-3">
              Direct Workshop & Office
            </h3>

            <div className="space-y-4 text-sm font-body">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-primary block text-xs uppercase tracking-wider font-label">Workshop Location</strong>
                  <span className="text-on-surface-variant text-xs">Home Farm, Bainton Road, Bucknell, Bicester, OX27 7LT</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-primary block text-xs uppercase tracking-wider font-label">Telephone</strong>
                  <a href="tel:01869572206" className="text-secondary hover:underline font-bold text-sm">
                    01869 572206
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-primary block text-xs uppercase tracking-wider font-label">Email Inquiry</strong>
                  <a href="mailto:info@thewindowdoctors.co.uk" className="text-on-surface-variant hover:text-secondary text-xs break-all">
                    info@thewindowdoctors.co.uk
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block font-label">
                Operating Hours
              </span>
              <div className="space-y-1.5 text-xs text-on-surface-variant font-label">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span className="text-primary font-bold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-primary font-bold">8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Sunday:</span>
                  <span className="font-bold">Emergency On-Call</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-structural p-6 border-emerald-600/30 bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-headline">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>Our Triple Guarantee</span>
            </div>
            <ul className="space-y-2 text-xs text-on-surface font-body">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>100% Free on-site survey & laser measuring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Zero sales pressure or cold calls</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>10-Year Insurance-Backed Guarantee on glass & frames</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right 8 Cols: Quote Wizard Form */}
        <div className="lg:col-span-8">
          <QuoteWizard />
        </div>

      </div>

    </div>
  );
}
