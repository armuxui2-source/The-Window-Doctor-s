"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Grid, 
  DoorClosed, 
  Home, 
  Shield, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  AlertCircle,
  FileCheck
} from "lucide-react";
import { cn, formatCurrency, generateReferenceCode } from "@/lib/utils";
import { MOCK_SERVICES, MOCK_POSTCODES } from "@/lib/supabase/mock-data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

interface QuoteWizardProps {
  initialServiceSlug?: string;
  onSuccess?: (refCode: string) => void;
}

export default function QuoteWizard({ initialServiceSlug, onSuccess }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [selectedService, setSelectedService] = useState<string>(initialServiceSlug || "misted-glass-repair");
  const [itemCount, setItemCount] = useState<number>(2);
  const [frameType, setFrameType] = useState<string>("uPVC White");
  const [glassType, setGlassType] = useState<string>("Argon Low-E Double");
  const [propertyType, setPropertyType] = useState<string>("Detached Home");
  const [projectNotes, setProjectNotes] = useState<string>("");

  // Contact & Location
  const [postcode, setPostcode] = useState<string>("");
  const [postcodeStatus, setPostcodeStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [matchedRegion, setMatchedRegion] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [preferredSlot, setPreferredSlot] = useState<string>("morning");
  const [preferredDate, setPreferredDate] = useState<string>("");

  // Calculate dynamic estimate
  const currentServiceObj = MOCK_SERVICES.find((s) => s.slug === selectedService) || MOCK_SERVICES[0];
  const basePrice = currentServiceObj.base_price_estimate || 95;
  const estimatedMin = basePrice * itemCount;
  const estimatedMax = Math.round(estimatedMin * 1.35);

  // Handle Postcode validation
  const checkPostcode = (inputCode: string) => {
    const cleaned = inputCode.trim().toUpperCase();
    setPostcode(cleaned);
    if (!cleaned) {
      setPostcodeStatus("idle");
      return;
    }
    const prefix = cleaned.split(" ")[0];
    const match = MOCK_POSTCODES.find((p) => prefix.startsWith(p.postcode_prefix) || p.postcode_prefix.startsWith(prefix));
    if (match) {
      setPostcodeStatus("valid");
      setMatchedRegion(match.region_name);
    } else {
      setPostcodeStatus("invalid");
      setMatchedRegion("");
    }
  };

  // Handle Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refCode = generateReferenceCode();

    const payload = {
      reference_no: refCode,
      first_name: firstName || "Customer",
      last_name: lastName || "Lead",
      email: email || "inquiry@client.com",
      phone: phone || "01869572206",
      postcode: postcode || "OX26",
      service_id: currentServiceObj.id,
      service_type_name: currentServiceObj.title,
      property_type: propertyType,
      dimensions_spec: {
        item_count: itemCount,
        frame_type: frameType,
        glass_type: glassType,
      },
      estimated_min: estimatedMin,
      estimated_max: estimatedMax,
      notes: projectNotes,
      preferred_survey_slot: `${preferredDate || "Earliest available"} (${preferredSlot})`,
      status: "new" as const,
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from("quotes").insert(payload as any);
      } catch (err) {
        console.warn("Supabase quote insert fallback:", err);
      }
    }


    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRef(refCode);
      if (onSuccess) onSuccess(refCode);
    }, 600);
  };

  // Success State View
  if (submittedRef) {
    return (
      <div className="bg-surface-container-lowest rounded-lg p-8 sm:p-12 text-center border border-outline-variant shadow-card space-y-6 animate-fade-in max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-md bg-primary text-secondary-container flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary font-label">Quote Request Confirmed</span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary">Thank You, {firstName || "Valued Customer"}!</h2>
          <p className="font-body text-sm text-on-surface-variant max-w-md mx-auto">
            Your quotation request has been received by our Bicester engineering team. We will call you to confirm your survey slot.
          </p>
        </div>

        <div className="p-4 rounded-md bg-surface-container-low border border-outline-variant inline-flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-secondary" />
          <div className="text-left">
            <span className="text-[11px] text-on-surface-variant block font-medium">Your Reference Number:</span>
            <span className="text-base font-mono font-bold text-primary">{submittedRef}</span>
          </div>
        </div>

        <div className="p-4 rounded-md bg-surface-container border border-outline-variant text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-medium">Service:</span>
            <span className="text-primary font-bold">{currentServiceObj.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-medium">Estimated Guide Price:</span>
            <span className="text-primary font-bold">{formatCurrency(estimatedMin)} - {formatCurrency(estimatedMax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-on-surface-variant font-medium">FENSA / 10-Yr Guarantee:</span>
            <span className="text-emerald-700 font-bold">Included</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmittedRef(null);
            setCurrentStep(1);
          }}
          className="btn-secondary text-sm py-2.5 px-6 rounded-md"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 sm:p-10 border border-outline-variant shadow-card max-w-3xl mx-auto">
      
      {/* Progress Header */}
      <div className="flex items-center justify-between border-b border-outline-variant pb-6 mb-8">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
            Step {currentStep} of 4
          </span>
          <h2 className="font-headline font-bold text-xl sm:text-2xl text-primary mt-1">
            {currentStep === 1 && "Select Required Glazing Service"}
            {currentStep === 2 && "Project Scope & Specifications"}
            {currentStep === 3 && "Service Area & Location"}
            {currentStep === 4 && "Contact Details & Survey Booking"}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={cn(
                "w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all",
                currentStep === step
                  ? "bg-primary text-secondary-container shadow-sm scale-105"
                  : currentStep > step
                  ? "bg-surface-container text-primary border border-outline-variant"
                  : "bg-surface-container-low text-on-surface-variant/50"
              )}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: SERVICE SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <p className="font-body text-sm text-on-surface-variant">
              What type of glazing or fenestration work do you require for your property?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {MOCK_SERVICES.map((srv) => {
                const isSelected = selectedService === srv.slug;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv.slug)}
                    className={cn(
                      "p-4 rounded-md border cursor-pointer transition-all duration-200 flex flex-col justify-between",
                      isSelected
                        ? "bg-surface-container border-2 border-primary shadow-sm"
                        : "bg-surface-container-lowest border-outline-variant hover:bg-surface-container-low"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className={cn("font-headline font-bold text-sm", isSelected ? "text-primary" : "text-on-surface")}>
                        {srv.title}
                      </h4>
                      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", isSelected ? "border-primary bg-primary" : "border-outline")}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-secondary-container" />}
                      </div>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                      {srv.short_description}
                    </p>
                    <span className="text-[11px] text-secondary font-bold mt-3 font-label">
                      From £{srv.base_price_estimate} {srv.price_unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SPECIFICATIONS */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                Number of Units / Windows / Doors
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 4, 6, 8, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setItemCount(num)}
                    className={cn(
                      "flex-1 py-2.5 rounded-md text-sm font-bold border transition-all",
                      itemCount === num
                        ? "bg-primary text-secondary-container border-primary"
                        : "bg-surface-container-lowest border-outline-variant text-on-surface hover:bg-surface-container-low"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Frame Material
                </label>
                <select
                  value={frameType}
                  onChange={(e) => setFrameType(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="uPVC White">uPVC White</option>
                  <option value="uPVC Anthracite / Heritage">uPVC Anthracite / Heritage</option>
                  <option value="Slim Aluminium">Slim Aluminium</option>
                  <option value="Timber / Wood">Timber / Mahogany Frame</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="Detached Home">Detached Home</option>
                  <option value="Semi-Detached / Townhouse">Semi-Detached / Townhouse</option>
                  <option value="Bungalow">Bungalow</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Commercial / Office">Commercial / Office</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                Additional Notes / Specific Requirements
              </label>
              <textarea
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="e.g. 2 misted units in back conservatory, 1 ground floor window lock loose..."
                rows={3}
                className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary placeholder-on-surface-variant/50 text-sm focus:outline-none focus:border-primary font-body"
              />
            </div>
          </div>
        )}

        {/* STEP 3: POSTCODE & LOCATION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <p className="font-body text-sm text-on-surface-variant">
              Enter your postcode to check engineer availability and response time in your area.
            </p>

            <div className="space-y-2">
              <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                Your Postcode (e.g. OX26, OX2, OX15)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => checkPostcode(e.target.value)}
                  placeholder="e.g. OX26 6HN"
                  className="w-full px-4 py-3.5 pl-11 rounded-md bg-surface-container-lowest border border-outline-variant text-primary font-mono text-base focus:outline-none focus:border-primary"
                />
                <MapPin className="w-5 h-5 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {postcodeStatus === "valid" && (
              <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Glazing Van Serving This Area Daily!</span>
                  <span>{matchedRegion} • Free on-site survey available</span>
                </div>
              </div>
            )}

            {postcodeStatus === "invalid" && (
              <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                <div>
                  <span className="font-bold block">Custom Coverage Notice</span>
                  <span>We serve all Oxfordshire & surrounding borders. We will confirm your postcode manually upon review.</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: CONTACT & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01869 572206"
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.smith@gmail.com"
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Preferred Survey Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label font-bold text-xs text-primary uppercase tracking-wider block">
                  Preferred Time Slot
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary font-medium"
                >
                  <option value="morning">Morning (08:30 - 12:00)</option>
                  <option value="afternoon">Afternoon (12:30 - 17:00)</option>
                  <option value="flexible">Flexible / Any time</option>
                </select>
              </div>
            </div>

            {/* Price Preview Card */}
            <div className="p-4 rounded-md bg-surface-container-low border border-outline-variant flex items-center justify-between">
              <div>
                <span className="text-xs text-on-surface-variant font-medium block">Indicative Guide Pricing:</span>
                <span className="font-headline font-bold text-lg text-primary">{formatCurrency(estimatedMin)} - {formatCurrency(estimatedMax)}</span>
              </div>
              <span className="text-[11px] text-secondary font-bold font-label">No Obligation</span>
            </div>
          </div>
        )}

        {/* Wizard Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-outline-variant">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="btn-secondary text-xs py-2.5 px-5 rounded-md"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5 inline" />
              <span>Back</span>
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="btn-primary text-xs py-2.5 px-6 rounded-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 ml-1.5 inline" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-cta text-xs py-2.5 px-7 rounded-md"
            >
              {isSubmitting ? "Processing..." : "Confirm & Submit Free Quote"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

