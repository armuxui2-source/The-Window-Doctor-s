import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Star, 
  MapPin, 
  Award,
  HelpCircle,
  Clock,
  ThumbsUp,
  FileCheck2,
  TrendingDown,
  Sparkles
} from "lucide-react";
import HeroSlider from "@/components/home/HeroSlider";
import ProductShowcaseSlider from "@/components/home/ProductShowcaseSlider";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import GoogleReviewsSlider from "@/components/home/GoogleReviewsSlider";
import FrameColorConfigurator from "@/components/home/FrameColorConfigurator";
import ComparisonMatrix from "@/components/home/ComparisonMatrix";
import EnergySavingsCalculator from "@/components/home/EnergySavingsCalculator";
import ProcessJourney from "@/components/home/ProcessJourney";
import QuoteWizard from "@/components/quote/QuoteWizard";
import PostcodeChecker from "@/components/areas/PostcodeChecker";
import { MOCK_REVIEWS } from "@/lib/supabase/mock-data";

export default function HomePage() {
  // Structured JSON-LD Schema for SEO & Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://thewindowdoctors.co.uk/#business",
        "name": "The Window Doctor",
        "image": "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
        "telephone": "+441869572206",
        "email": "info@thewindowdoctors.co.uk",
        "url": "https://thewindowdoctors.co.uk",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Home Farm, Bainton Road",
          "addressLocality": "Bucknell, Bicester",
          "addressRegion": "Oxfordshire",
          "postalCode": "OX27 7LT",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.9333,
          "longitude": -1.1833
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        "priceRange": "££",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://thewindowdoctors.co.uk/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do I need to replace my whole window frame if the glass is misted?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No! In over 95% of cases, you only need to replace the failed double-glazed sealed unit. Your existing uPVC, timber, or aluminium frames remain completely intact, saving you up to 70% compared to new windows."
            }
          },
          {
            "@type": "Question",
            "name": "How long does a misted double glazing unit replacement take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our master glazier typically completes each window pane replacement in 30 to 45 minutes with zero mess and no damage to your internal plaster or wallpaper."
            }
          },
          {
            "@type": "Question",
            "name": "Are your window installations and repairs FENSA certified?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, The Window Doctor is fully FENSA certified (Registration No. 28491). All new installations come with full Building Regulations compliance certificates and a 10-Year Insurance-Backed Guarantee."
            }
          },
          {
            "@type": "Question",
            "name": "Which areas in Oxfordshire do you cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We cover Bicester, Bucknell, Oxford, Banbury, Kidlington, Brackley, Witney, Woodstock, Abingdon, and surrounding Oxfordshire villages with free survey and measurement visits."
            }
          }
        ]
      }
    ]
  };

  const faqs = [
    {
      q: "Do I need to replace my whole window frame if the glass is misted?",
      a: "No! In over 95% of cases, you only need to replace the failed double-glazed sealed unit. Your existing frames remain completely intact, saving you up to 70% compared to full replacements."
    },
    {
      q: "How long does a misted glass replacement take?",
      a: "Our master technicians typically complete each window pane replacement in under 45 minutes with zero mess and zero disturbance to your internal decor or plaster."
    },
    {
      q: "Are your window installations FENSA certified and insured?",
      a: "Yes. We are fully FENSA registered (No. 28491). All new window and door installations include Building Regulations compliance certification and a 10-Year Insurance-Backed Guarantee."
    },
    {
      q: "Can you install cat flaps into double glazed glass doors?",
      a: "Yes. We manufacture custom toughened double glazed glass units with pre-cut factory sealed apertures designed specifically for SureFlap microchip and manual cat flaps."
    },
    {
      q: "Do you charge for home surveys and quotes in Oxfordshire?",
      a: "No. All our initial on-site inspections, measurements, and formal written quotations are 100% free with absolutely no high-pressure sales obligation."
    }
  ];

  return (
    <div className="pb-24">
      
      {/* Embedded SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. DYNAMIC HERO SHOWCASE SLIDER - Seamlessly connected to header with 0px gap */}
      <HeroSlider />

      <div className="space-y-[80px] lg:space-y-[120px] pt-16 lg:pt-24">
        {/* 2. REAL OXFORDSHIRE CASE STUDIES & BEFORE/AFTER INTERACTIVE SLIDER */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsShowcase />
        </section>

      {/* 2.5 VERIFIED GOOGLE MAPS REVIEWS SLIDER */}
      <GoogleReviewsSlider />

      {/* 3. SIDE-BY-SIDE COST & DISRUPTION COMPARISON MATRIX */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ComparisonMatrix />
      </section>

      {/* 4. PRODUCT & SOLUTIONS CATALOGUE SLIDER WITH FILTER TABS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ProductShowcaseSlider />
      </section>

      {/* 5. INTERACTIVE FRAME COLOR & MATERIAL CONFIGURATOR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <FrameColorConfigurator />
      </section>

      {/* 6. INTERACTIVE ENERGY SAVINGS & HEATING CALCULATOR */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <EnergySavingsCalculator />
      </section>

      {/* 7. 4-STAGE ARCHITECTURAL GLAZING PROCESS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ProcessJourney />
      </section>

      {/* 8. INTERACTIVE INSTANT QUOTE WIZARD (High Conversion Sales Funnel) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8" id="quote-section">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Instant Online Survey & Calculation
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Calculate Indicative Price in 60 Seconds
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Select your requirements below for transparent guide pricing and book your free on-site survey slot.
          </p>
        </div>

        <QuoteWizard />
      </section>

      {/* 9. 4-PILLAR AUTHORITY & BRAND CREDIBILITY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Why Oxfordshire Chooses Us
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Built on 40+ Years of Engineering Integrity
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-structural p-6 space-y-3 shadow-card">
            <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-primary">Est. 1983 Heritage</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Family owned and operated in Bicester for four decades with over 25,000 satisfied Oxfordshire clients.
            </p>
          </div>

          <div className="card-structural p-6 space-y-3 shadow-card">
            <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-primary">FENSA Certified</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Full UK Building Regulations compliance (Reg No. 28491) with official certificates provided for all projects.
            </p>
          </div>

          <div className="card-structural p-6 space-y-3 shadow-card">
            <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-primary">10-Year Guarantee</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Insurance-Backed 10-year warranty covering glass seals, hinges, handles, and structural components.
            </p>
          </div>

          <div className="card-structural p-6 space-y-3 shadow-card">
            <div className="w-10 h-10 rounded-[12px] bg-primary text-secondary-container flex items-center justify-center">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-primary">No High-Pressure Sales</h3>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              Honest diagnostic advice by master glaziers, not commissioned salesmen. Fixed-price transparent quotes.
            </p>
          </div>
        </div>
      </section>

      {/* 10. SERVICE AREA & POSTCODE COVERAGE (Local SEO Proof) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-container rounded-[24px] p-6 sm:p-12 border border-outline-variant">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
                <MapPin className="w-4 h-4" />
                <span>Oxfordshire & Surrounding Borders</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
                Local Glaziers, Fast On-Site Response
              </h2>
              <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
                Based in Bucknell, Bicester, our fleet of mobile engineering vans cover all Oxfordshire postcodes daily for emergency repairs and free survey visits.
              </p>
              <div className="space-y-3 font-body">
                <div className="flex items-center gap-3 text-xs text-on-surface font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span><strong>Bicester & Bucknell (OX25, OX26):</strong> Primary Zone • Same Day</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span><strong>Oxford City (OX1, OX2, OX3, OX4):</strong> Daily Survey Slot</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface font-medium">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span><strong>Banbury & Brackley (OX15, OX16, NN13):</strong> Regular Route</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <PostcodeChecker />
            </div>
          </div>
        </div>
      </section>

      {/* 11. VERIFIED REVIEWS & SOCIAL PROOF */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Verified Customer Reviews
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Trusted by Homeowners Throughout Oxfordshire
          </h2>
          <div className="flex items-center justify-center gap-1 text-secondary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-secondary" />
            ))}
            <span className="text-xs font-bold text-primary ml-2 font-label">4.9 / 5.0 Rating (128+ Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="card-structural p-6 flex flex-col justify-between space-y-4 shadow-card"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-secondary">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-secondary" />
                  ))}
                </div>
                <h4 className="font-headline font-bold text-sm text-primary leading-snug">
                  "{review.review_title}"
                </h4>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                  {review.review_text}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant flex items-center justify-between text-[11px] font-label">
                <div>
                  <span className="font-bold text-primary block">{review.customer_name}</span>
                  <span className="text-on-surface-variant">{review.customer_location}</span>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-[8px] border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. FAQ ACCORDION FOR SEO SNIPPETS & HOMEOWNER CLARITY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Frequently Asked Questions
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">
            Glazing & Repair Information
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card-structural p-6 space-y-2 shadow-card">
              <h3 className="font-headline font-bold text-base text-primary flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 13. FINAL ACTION BANNER (Deep Navy Accent Container) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white rounded-[24px] p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-secondary-container uppercase tracking-wider font-label">
              Ready for Crystal Clear Views & Lower Energy Bills?
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-headline-lg text-white">
              Book Your Free On-Site Survey Today
            </h2>
            <p className="font-body text-body-md text-slate-300">
              No sales pressure, no obligation quotations, just 40+ years of honest Oxfordshire craftsmanship.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/quote"
              className="btn-cta text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto"
            >
              <span>Request Free Survey</span>
              <ArrowRight className="w-4 h-4 ml-1.5 inline" />
            </Link>
            <a
              href="tel:01869572206"
              className="btn-secondary text-sm py-3.5 px-8 rounded-[16px] w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-secondary mr-1.5 inline" />
              <span>01869 572206</span>
            </a>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}
