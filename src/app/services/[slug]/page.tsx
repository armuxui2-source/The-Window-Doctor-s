import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Wrench, 
  Sparkles, 
  ChevronRight, 
  Grid, 
  DoorClosed, 
  Home as HomeIcon, 
  Shield 
} from "lucide-react";
import { MOCK_SERVICES, MOCK_PROJECTS } from "@/lib/supabase/mock-data";
import QuoteWizard from "@/components/quote/QuoteWizard";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MOCK_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = MOCK_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related project
  const relatedProject = MOCK_PROJECTS.find((p) => p.service_id === service.id) || MOCK_PROJECTS[0];

  return (
    <div className="space-y-[80px] lg:space-y-[120px] pb-24 pt-8 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-on-surface-variant font-label">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
        <span>/</span>
        <span className="text-secondary font-bold">{service.title}</span>
      </div>

      {/* Hero Header */}
      <div className="bg-surface-container-low rounded-[24px] p-8 sm:p-12 border border-outline-variant shadow-card relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-secondary text-xs font-bold uppercase font-label">
              <Wrench className="w-3.5 h-3.5" />
              <span>FENSA Certified Service</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-headline font-bold text-3xl sm:text-headline-xl text-primary leading-tight">
                {service.title}
              </h1>
              <p className="font-body text-base text-secondary font-bold">
                {service.headline}
              </p>
            </div>

            <p className="font-body text-body-md text-on-surface-variant leading-relaxed">
              {service.full_content || service.short_description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="px-4 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-xs">
                <span className="text-on-surface-variant block text-[11px] font-label">Warranty:</span>
                <strong className="text-secondary font-bold">{service.warranty_years}-Year Guarantee</strong>
              </div>
              <div className="px-4 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-xs">
                <span className="text-on-surface-variant block text-[11px] font-label">Pricing Guide:</span>
                <strong className="text-primary font-bold">From £{service.base_price_estimate} {service.price_unit}</strong>
              </div>
              <div className="px-4 py-2.5 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-xs">
                <span className="text-on-surface-variant block text-[11px] font-label">Standards:</span>
                <strong className="text-emerald-700 font-bold">PAS 24 / BS 6180</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#quote-wizard"
                className="btn-cta text-sm py-3 px-6 rounded-[16px]"
              >
                <span>Calculate Free Estimate</span>
                <ArrowRight className="w-4 h-4 ml-1.5 inline" />
              </a>
              <a
                href="tel:01869572206"
                className="btn-secondary text-sm py-3 px-6 rounded-[16px]"
              >
                <Phone className="w-4 h-4 text-secondary mr-1.5 inline" />
                <span>01869 572206</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-[24px] overflow-hidden border border-outline-variant shadow-card">
            <Image
              src={service.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I"}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>

              {/* Specifications & Key Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Features List */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-[24px] p-8 border border-outline-variant shadow-card space-y-6">
          <h3 className="font-headline font-bold text-xl text-primary">Why Choose Our {service.title}</h3>
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="p-3.5 rounded-[16px] bg-surface-container-low border border-outline-variant flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm font-medium text-primary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs Box */}
        <div className="lg:col-span-5 bg-surface-container rounded-[24px] p-8 border border-outline-variant space-y-6">
          <h3 className="font-headline font-bold text-xl text-primary">Technical Specifications</h3>
          <div className="space-y-3 text-xs">
            {Object.entries(service.specifications).map(([key, val]) => (
              <div key={key} className="flex justify-between py-2 border-b border-outline-variant font-label">
                <span className="text-on-surface-variant font-medium">{key}:</span>
                <strong className="text-primary font-bold">{val}</strong>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-[16px] bg-surface-container-lowest border border-outline-variant text-xs text-primary font-body leading-relaxed">
            All installations are registered with FENSA and covered by an Insurance-Backed 10-Year Guarantee.
          </div>
        </div>

      </div>

      {/* Before / After Case Study (If available) */}
      {relatedProject.before_image_url && (
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
              Real Workmanship
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">Before & After Demonstration</h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage={relatedProject.before_image_url}
              afterImage={relatedProject.after_image_url || ""}
              title={relatedProject.title}
              subtitle={`${relatedProject.location_city} • Restored by Master Glaziers`}
            />
          </div>
        </div>
      )}

      {/* Embedded Quote Wizard Section */}
      <div id="quote-wizard" className="pt-8">
        <div className="text-center space-y-2 max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Free Survey Booking
          </span>
          <h3 className="font-headline font-bold text-2xl sm:text-headline-lg text-primary">Request Your {service.title} Quote</h3>
        </div>
        <QuoteWizard initialServiceSlug={service.slug} />
      </div>

    </div>
  );
}

