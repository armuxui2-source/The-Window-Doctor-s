import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { 
  BookOpen, 
  Clock, 
  User, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Phone,
  HelpCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "Oxfordshire Glazing & Window Advice Guides | The Window Doctor",
  description: "Expert glazing insights, double glazing repair guides, and energy-saving tips for homeowners in Bicester, Oxford, Banbury, and the Cotswolds.",
  keywords: [
    "Window repair advice Bicester",
    "Misted double glazing guide",
    "Warm roof conservatory advice Oxfordshire",
    "Double glazing cost savings",
  ],
};

const BLOG_ARTICLES = [
  {
    slug: "misted-double-glazing-repair-guide-oxfordshire",
    title: "Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Complete Guide",
    excerpt: "Learn why double glazing unit seals fail over time, why you do NOT need to buy expensive new frames, and how replacing only the sealed glass unit saves up to 70%.",
    category: "Glass & Glazing Advice",
    readingTime: "5 min read",
    author: "Master Glazier Sean",
    date: "February 2026",
    tags: ["Misted Glass", "Oxfordshire", "Cost Savings", "Pilkington Low-E"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I"
  },
  {
    slug: "conservatory-warm-roof-conversion-benefits",
    title: "Transforming Unusable Conservatories with Insulated Tiled Warm Roofs in 2026",
    excerpt: "Is your conservatory freezing cold in winter and like a sauna in summer? Discover how converting to a lightweight SupaLite warm roof adds an all-season heated living room.",
    category: "Conservatory Conversions",
    readingTime: "6 min read",
    author: "Master Glazier Sean",
    date: "January 2026",
    tags: ["Warm Roofs", "Energy Efficiency", "Building Regs", "Home Value"],
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq"
  }
];

export default function BlogListingPage() {
  return (
    <div className="bg-background min-h-screen py-10 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumbs & Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-secondary font-bold">Glazing Guides & Advice</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-secondary text-xs font-bold uppercase tracking-wider font-label">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Oxfordshire Master Glazier Knowledge Base</span>
            </div>
            <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary tracking-tight">
              Glazing Guides, Case Insights & Energy Advice
            </h1>
            <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed">
              40+ years of British fenestration expertise distilled into actionable guides. Learn how to diagnose window faults, maximize heating efficiency, and save thousands on replacements.
            </p>
          </div>
        </div>

        {/* Featured Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_ARTICLES.map((article) => (
            <article 
              key={article.slug}
              className="glass-card rounded-[24px] overflow-hidden border border-outline-variant hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              {/* Image Banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-secondary-container text-xs font-bold backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant font-label">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-secondary" />
                      {article.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      {article.readingTime}
                    </span>
                  </div>

                  <h2 className="font-headline font-bold text-xl sm:text-2xl text-primary group-hover:text-secondary transition-colors line-clamp-2">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="font-body text-sm text-on-surface-variant line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags & Read Action */}
                <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {article.tags.slice(0, 2).map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-surface-container text-[11px] font-medium text-on-surface-variant">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-secondary group-hover:text-primary flex items-center gap-1 font-label transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* Free Survey CTA Card */}
        <div className="bg-primary text-white p-8 sm:p-10 rounded-[24px] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
              Have a Misted Window or Draughty Door in Oxfordshire?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Get an accurate diagnostic quote within 45 minutes with zero sales pressure from our master glaziers.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/quote"
              className="btn-cta text-xs sm:text-sm py-3 px-6 rounded-xl font-bold"
            >
              Instant Price Calculator
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
