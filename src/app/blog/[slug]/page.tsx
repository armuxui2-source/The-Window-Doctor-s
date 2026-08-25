import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  Clock, 
  User, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  Sparkles,
  TrendingDown,
  Share2,
  Award
} from "lucide-react";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  author: string;
  date: string;
  publishedDateISO: string;
  imageUrl: string;
  targetKeywords: string[];
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string[];
      keyTakeaway?: string;
    }[];
    faqs: { q: string; a: string }[];
  };
}

const ARTICLES_DATABASE: Record<string, BlogPostData> = {
  "misted-double-glazing-repair-guide-oxfordshire": {
    slug: "misted-double-glazing-repair-guide-oxfordshire",
    title: "Why Does Double Glazing Mist Up? The Oxfordshire Homeowner’s Complete Guide",
    excerpt: "Learn why double glazing unit seals fail, why you do NOT need to buy expensive new frames, and how replacing only the sealed glass unit saves up to 70%.",
    category: "Glass & Glazing Advice",
    readingTime: "5 min read",
    author: "Master Glazier Sean",
    date: "25 February 2026",
    publishedDateISO: "2026-02-25T08:00:00Z",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    targetKeywords: ["misted double glazing bicester", "failed window seal repair oxford", "replace double glazing glass only", "argon low e replacement oxfordshire"],
    content: {
      intro: "If you have noticed a foggy, cloudy haze or water droplets trapped between your double glazed window panes, you are not alone. Double glazing seal failure is one of the most common issues reported by homeowners across Bicester, Oxford, Banbury, and the wider Oxfordshire county.",
      sections: [
        {
          heading: "1. The Anatomy of Seal Failure: Why Do Windows Mist Up?",
          body: [
            "A modern double-glazed unit (technically known as an Insulated Glass Unit or IGU) consists of two panes of glass separated by a spacer bar filled with desiccant drying crystals, surrounded by an airtight butyl and polysulphide perimeter seal.",
            "Over 10 to 20 years of British weather—ranging from freezing winter frost to intense summer heat—the window frame expands and contracts daily (a phenomenon known as solar pumping). Eventually, small micro-cracks form in the perimeter seal, drawing moisture-laden air inside.",
            "Once moisture enters the sealed cavity, the desiccant crystals become saturated, resulting in visible condensation, fogging, and chalky mineral deposits between the glass that cannot be wiped clean from either side."
          ],
          keyTakeaway: "Condensation on the inside of the room is normal humidity; condensation trapped between the glass panes is permanent seal failure."
        },
        {
          heading: "2. The Golden Rule: Replace the Glass, NOT the Frame",
          body: [
            "The biggest misconception pushed by nationwide replacement window salespeople is that you must rip out the entire uPVC or aluminium window frame when glass mists up.",
            "In over 95% of cases, the window frame, sills, and locking mechanisms remain in excellent condition. By replacing only the failed double glazed unit (the sealed glass pane), The Window Doctor restores crystal clarity and full thermal performance for less than one-third of the cost of a new window.",
            "A glass-only replacement takes just 30 to 45 minutes per window, produces zero rubble or plaster dust, and preserves your internal wallpaper, tiles, and interior window cills completely intact."
          ],
          keyTakeaway: "Glass-only replacement saves 50% to 70% compared to complete window frame replacements."
        },
        {
          heading: "3. Upgrading to Modern Pilkington Low-E & Argon Gas",
          body: [
            "When replacing your misted units, you don't just restore clarity—you upgrade your home's thermal efficiency. Older double glazing from the 1990s and 2000s often utilized basic air-filled cavities with poor insulation.",
            "At The Window Doctor, all our replacement sealed units are manufactured with Pilkington Optitherm Low-E coated glass, 90% Argon gas filling, and Swissspacer warm-edge spacer bars, achieving a market-leading U-value of 1.1 W/m²K (A+ Energy Rating)."
          ]
        }
      ],
      faqs: [
        {
          q: "How much does it cost to replace a misted double glazed unit in Oxfordshire?",
          a: "Standard misted window glass replacements typically range from £95 to £185 per unit depending on size, safety glass requirements, and Georgian bar configurations."
        },
        {
          q: "How long does a replacement double glazed unit last?",
          a: "All our custom-manufactured insulated glass units come backed by our comprehensive 10-Year Insurance-Backed Anti-Fog Guarantee."
        }
      ]
    }
  },
  "conservatory-warm-roof-conversion-benefits": {
    slug: "conservatory-warm-roof-conversion-benefits",
    title: "Transforming Unusable Conservatories with Insulated Tiled Warm Roofs in 2026",
    excerpt: "Is your conservatory freezing in winter and like a sauna in summer? Discover how lightweight warm roofs add an all-season heated living room.",
    category: "Conservatory Conversions",
    readingTime: "6 min read",
    author: "Master Glazier Sean",
    date: "18 January 2026",
    publishedDateISO: "2026-01-18T08:00:00Z",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
    targetKeywords: ["conservatory warm roof conversion banbury", "tiled conservatory roof oxford", "supalite warm roof bicester"],
    content: {
      intro: "For decades, Victorian and Edwardian style conservatories with polycarbonate or uninsulated glass roofs have presented UK homeowners with a frustrating paradox: too cold to sit in for 6 months of winter, and uncomfortably hot like a greenhouse in summer.",
      sections: [
        {
          heading: "1. What is a Tiled Warm Roof Conservatory Conversion?",
          body: [
            "A warm roof conversion replaces your outdated, noisy polycarbonate or glazed roof with an engineered lightweight structural aluminium framework, multi-layer thermal insulation, and external synthetic slate or tile finishes that seamlessly match your home's existing roofline.",
            "Internally, the roof is finished with an insulated plastered vaulted ceiling complete with recessed LED downlights and optional Velux rooflights for natural daylight."
          ],
          keyTakeaway: "Delivers an ultra-low U-Value of 0.15 W/m²K, making the conservatory feel like a natural extension of your home."
        },
        {
          heading: "2. Key Benefits of Converting Your Roof",
          body: [
            "1. All-Year Usability: Sit comfortably even in sub-zero January weather without running expensive space heaters.",
            "2. Dramatic Noise Reduction: Mutes the deafening sound of torrential British rain by over 90%.",
            "3. Full Building Regulations Compliance: Fully certified by JHAI / Building Control, adding an estimated £15,000–£25,000 to your Oxfordshire property value."
          ]
        }
      ],
      faqs: [
        {
          q: "Do I need planning permission for a warm roof conservatory conversion?",
          a: "In most cases, no. Warm roof conversions fall under Permitted Development rights as long as Building Regulations approval is obtained, which The Window Doctor handles on your behalf."
        }
      ]
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATABASE[slug];

  if (!article) {
    return { title: "Article Not Found | The Window Doctor" };
  }

  return {
    title: `${article.title} | The Window Doctor`,
    description: article.excerpt,
    keywords: article.targetKeywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedDateISO,
      authors: [article.author],
      images: [{ url: article.imageUrl, width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES_DATABASE[slug];

  if (!article) {
    notFound();
  }

  // Structured JSON-LD Article Schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.imageUrl,
    "datePublished": article.publishedDateISO,
    "dateModified": article.publishedDateISO,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Window Doctor",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thewindowdoctor.vercel.app/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thewindowdoctor.vercel.app/blog/${article.slug}`
    }
  };

  return (
    <article className="bg-background min-h-screen py-10 sm:py-16">
      
      {/* Embedded Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-label text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Guides</Link>
          <span>/</span>
          <span className="text-secondary font-bold truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
        </nav>

        {/* Header Typography */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-surface-container text-secondary text-xs font-bold font-label">
              {article.category}
            </span>
            <span className="text-xs text-on-surface-variant font-label">
              Published {article.date}
            </span>
          </div>

          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-y border-outline-variant py-3 text-xs text-on-surface-variant font-label">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                <User className="w-4 h-4 text-secondary" />
                {article.author}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-secondary" />
                {article.readingTime}
              </span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">FENSA Certified Advice</span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="relative h-[340px] sm:h-[460px] w-full rounded-lg overflow-hidden shadow-xl border border-outline-variant">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Main Article Content */}
        <div className="space-y-8 text-on-surface font-body leading-relaxed text-base sm:text-lg">
          
          <p className="font-headline font-semibold text-xl text-primary leading-relaxed bg-surface-container-low p-6 rounded-md border-l-4 border-secondary">
            {article.content.intro}
          </p>

          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-headline font-bold text-2xl sm:text-3xl text-primary tracking-tight">
                {sec.heading}
              </h2>
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} className="text-on-surface-variant leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.keyTakeaway && (
                <div className="p-4 rounded-md bg-secondary-container/15 border border-secondary/30 text-primary text-sm font-semibold flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span><strong>Key Takeaway:</strong> {sec.keyTakeaway}</span>
                </div>
              )}
            </section>
          ))}

          {/* FAQs Section */}
          {article.content.faqs && article.content.faqs.length > 0 && (
            <div className="pt-8 space-y-4 border-t border-outline-variant">
              <h3 className="font-headline font-bold text-2xl text-primary">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {article.content.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-5 rounded-md bg-surface-container border border-outline-variant space-y-2">
                    <h4 className="font-headline font-bold text-base text-primary">
                      {faq.q}
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Instant Quote Callout Card */}
        <div className="glass-card p-8 sm:p-10 rounded-lg border-2 border-secondary/30 bg-gradient-to-br from-primary to-primary-container text-white space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-secondary-container font-bold text-xs uppercase font-label">
              Free On-Site Diagnostic Survey
            </span>
            <h3 className="font-headline font-bold text-2xl sm:text-3xl text-white">
              Get an Instant Written Quote for Your Oxfordshire Home
            </h3>
            <p className="text-sm sm:text-base text-slate-200">
              Save up to 70% with our master glazier repairs. 10-Year Insurance Guarantee included.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/quote"
              className="btn-cta py-3.5 px-8 rounded-md text-sm font-bold w-full sm:w-auto text-center"
            >
              Instant Price Calculator
            </Link>
            <a
              href="tel:01869572206"
              className="btn-secondary py-3.5 px-8 rounded-md text-sm font-bold w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <Phone className="w-4 h-4 inline mr-2 text-secondary-container" />
              Call 01869 572206
            </a>
          </div>
        </div>

      </div>
    </article>
  );
}
