"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ExternalLink, 
  Quote, 
  Sparkles,
  MapPin,
  ShieldCheck,
  Award
} from "lucide-react";
import { GOOGLE_REVIEWS, GoogleReviewItem } from "@/lib/supabase/mock-data";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/The+Window+Doctor/@51.93132,-1.193252,17z/data=!3m1!4b1!4m6!3m5!1s0x4876de7802f8af15:0x7b9ae6b36c259cb3!8m2!3d51.93132!4d-1.193252!16s%2Fg%2F11g889g7ww!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D";

export default function GoogleReviewsSlider() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [cardsPerPage, setCardsPerPage] = useState<number>(3);

  // Filter reviews by selected category
  const filteredReviews = GOOGLE_REVIEWS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category_key === selectedCategory;
  });

  // Responsive cards per view calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, filteredReviews.length - cardsPerPage);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleFilterChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  return (
    <section 
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* Header & Google Trust Summary */}
      <div className="bg-primary text-white rounded-[28px] p-6 sm:p-10 border border-secondary/30 shadow-2xl relative overflow-hidden space-y-6">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/10 border border-secondary-container/30 text-secondary-container text-xs font-bold uppercase font-label">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Verified Customer Feedback</span>
            </div>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-white">
              Trusted by 25,000+ Homeowners Across Oxfordshire
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-body">
              Read real verified Google reviews from clients in Bicester, Oxford, Banbury, Kidlington, and surrounding villages.
            </p>
          </div>

          {/* Google Verified Score Card */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0">
              {/* Google G Logo SVG */}
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-extrabold text-2xl text-white">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-slate-300 font-label block">Google Business Rating • Bucknell, Bicester</span>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: "all", label: "All Reviews" },
              { id: "glass", label: "Misted Glass" },
              { id: "doors", label: "Doors & Bi-Folds" },
              { id: "windows", label: "Modern Windows" },
              { id: "roofs", label: "Warm Roofs" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap font-label ${
                  selectedCategory === cat.id
                    ? "bg-secondary-container text-primary shadow-gold-glow"
                    : "bg-white/5 text-slate-200 hover:bg-white/15 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary-container hover:underline flex items-center gap-1 font-bold font-label mr-2"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Reviews Cards Carousel Slider */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerPage + 1.5)}%)`
          }}
        >
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="card-structural flex flex-col justify-between p-6 sm:p-7 shadow-card space-y-4 flex-shrink-0"
              style={{
                width: `calc(${100 / cardsPerPage}% - ${(24 * (cardsPerPage - 1)) / cardsPerPage}px)`
              }}
            >
              {/* Top Card: Reviewer Profile & Google Icon */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-outline-variant flex-shrink-0 bg-surface-container">
                    <Image
                      src={rev.avatar_url}
                      alt={rev.customer_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm text-primary leading-snug">
                      {rev.customer_name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-on-surface-variant font-label">
                      <MapPin className="w-3 h-3 text-secondary" />
                      <span>{rev.customer_location}</span>
                    </div>
                  </div>
                </div>

                {/* Google Verified Icon */}
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 border border-slate-200">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </div>
              </div>

              {/* Rating Stars & Service Badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-on-surface-variant font-mono">{rev.time_ago}</span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-[8px] bg-surface-container-low border border-outline-variant text-[11px] font-bold text-secondary font-label">
                  {rev.service_category}
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-1.5 flex-1">
                <h5 className="font-headline font-bold text-xs sm:text-sm text-primary line-clamp-1">
                  "{rev.review_title}"
                </h5>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed line-clamp-4">
                  {rev.review_text}
                </p>
              </div>

              {/* Bottom Guarantee Badge */}
              <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-[11px] text-emerald-700 font-medium font-label">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Google Review</span>
                </span>
                <span className="text-secondary font-bold">10-Yr Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {[...Array(maxIndex + 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              currentIndex === i ? "w-7 bg-primary" : "w-2 bg-outline-variant hover:bg-on-surface-variant"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
