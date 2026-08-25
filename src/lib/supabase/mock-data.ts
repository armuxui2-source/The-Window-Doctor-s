import { Database } from "@/types/database.types";

export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceCategory = Database["public"]["Tables"]["service_categories"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Review = Database["public"]["Tables"]["customer_reviews"]["Row"];
export type ServiceArea = Database["public"]["Tables"]["service_areas"]["Row"];
export type Postcode = Database["public"]["Tables"]["postcodes"]["Row"];

export const MOCK_CATEGORIES: ServiceCategory[] = [
  {
    id: "cat-1",
    slug: "glass-repairs",
    name_en: "Glass & Glazing Repairs",
    name_th: "งานซ่อมกระจกและซีลยาง",
    description: "Misted glass, seal failures, shattered units & lock mechanisms",
    icon_name: "Sparkles",
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-2",
    slug: "windows",
    name_en: "Modern Window Installations",
    name_th: "งานติดตั้งหน้าต่างโมเดิร์น",
    description: "Casement, Flush Sash, Tilt & Turn in uPVC and Slim Aluminium",
    icon_name: "Grid",
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-3",
    slug: "doors",
    name_en: "Stylish Entrance & Patio Doors",
    name_th: "งานติดตั้งประตูบ้านและระเบียง",
    description: "High-security Composite doors, Bi-fold systems & French doors",
    icon_name: "DoorClosed",
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-4",
    slug: "conservatories",
    name_en: "Warm Roof Conservatories",
    name_th: "งานปรับปรุงหลังคาเรือนกระจก",
    description: "Lightweight tiled warm roof conversions and roof lanterns",
    icon_name: "Home",
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cat-5",
    slug: "balustrades",
    name_en: "Bespoke Glass Balustrades",
    name_th: "ระเบียงและราวกันตกกระจกเปลือย",
    description: "Frameless toughened glass for stairs, balconies & decking",
    icon_name: "Shield",
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: "srv-1",
    category_id: "cat-1",
    slug: "misted-glass-repair",
    title: "Misted Glass & Seal Failure Repairs",
    headline: "Replace the Glass, Not the Frame — Save Up to 70%",
    short_description: "Restore crystal-clear outdoor views and thermal efficiency by replacing only the failed double-glazed unit, keeping your existing frames intact.",
    full_content: "Condensation or fogging between double glazed panes indicates a broken perimeter seal. Instead of paying thousands for whole new window replacements, our master technicians measure and manufacture exact-fit Argon-filled replacement units on-site in Bicester and throughout Oxfordshire.",
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    features: [
      "Save 50% to 70% compared to new window frames",
      "Argon gas-filled Pilkington Low-E thermal glass",
      "Fast, mess-free installation in under 45 mins per window",
      "10-Year Insurance-Backed Anti-Fog Guarantee",
      "Cat flap installation in glass doors available",
    ],
    specifications: {
      "U-Value": "1.1 W/m²K (A+ Energy Rating)",
      "Glass Type": "Pilkington Optitherm Low-E",
      "Spacer Bar": "Swissspacer Ultimate Warm Edge",
      "Gas Fill": "90% Argon Gas",
    },
    base_price_estimate: 95.0,
    price_unit: "per unit",
    warranty_years: 10,
    is_fensa_certified: true,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-2",
    category_id: "cat-2",
    slug: "modern-windows",
    title: "Modern Energy-Efficient Windows",
    headline: "Architectural Elegance with A++ Thermal Performance",
    short_description: "Precision-engineered uPVC and slim aluminium windows with PAS 24 multi-point locking and up to 42dB acoustic insulation.",
    full_content: "Upgrade your Oxfordshire home with custom-tailored casement, flush sash, or sliding sash windows. Available in Anthracite Grey, Heritage Agate Green, English Oak, and Classic White.",
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K",
    features: [
      "A++ Energy Efficiency Ratings with double or triple glazing",
      "Secured by Design PAS 24 multi-point shootbolts",
      "Acoustic noise reduction up to 42dB",
      "Over 30 heritage colour finishes and woodgrains",
      "10-Year Insurance-Backed Guarantee & FENSA Certificate",
    ],
    specifications: {
      "Frame Material": "High-Impact uPVC & Slimline Aluminium",
      "Acoustic Rating": "Up to 42dB Sound Reduction",
      "Security Standard": "PAS 24 / Secured by Design",
      "Glazing Thickness": "28mm Double / 44mm Triple",
    },
    base_price_estimate: 380.0,
    price_unit: "per window",
    warranty_years: 10,
    is_fensa_certified: true,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-3",
    category_id: "cat-3",
    slug: "stylish-doors",
    title: "Bespoke Composite & Bi-fold Doors",
    headline: "Make a Grand Entrance with Uncompromising Security",
    short_description: "Solid 48mm timber-core composite front doors and ultra-smooth aluminium panoramic bi-folding patio doors.",
    full_content: "Designed to make a lasting impression while securing your family. Every composite door is fitted with the Ultion 3-Star Diamond cylinder lock with a £2,000 security guarantee.",
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC5TlH41tDAjTCl3MrbBJRzyCP5z3ZHMEMk9NkYIvxkJMMcVXNeWXNj6_S1GRW5Hu-xCKHR1n66yFkPGgXv5S_NGMExRgGMBd2IAVfi1p7jZlOCB-zaY6przm9m-lcVs4sZLF7emRqNRkD6kC_vgksdjjXXtZ1m1UtEW6_jh20SBrhrLKGcGNMAtasHIML0MA2rMb9QtKzQ7NhdbGZ7JpHFnhdot6j6RXoI6i2CnVmcEppLk5C2BN5",
    features: [
      "48mm Solid timber core — 10% thicker than standard GRP",
      "3-Star Ultion Diamond anti-snap locking system",
      "Featherlight finger-push bi-fold sliding motion",
      "Low-threshold wheelchair compliant options",
      "Resistant to extreme British weather and draughts",
    ],
    specifications: {
      "Core Thickness": "48mm Solid Timber Core",
      "Locking Standard": "3-Star Ultion Diamond Anti-Snap",
      "Bi-fold Panels": "2 to 8 Panels up to 6.5m width",
      "Weather Rating": "BS 6375-1 Severe Exposure",
    },
    base_price_estimate: 750.0,
    price_unit: "per door",
    warranty_years: 10,
    is_fensa_certified: true,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-4",
    category_id: "cat-4",
    slug: "warm-roof-conservatories",
    title: "Warm Roof Conservatory Conversions",
    headline: "Transform Your Conservatory into an All-Year Living Room",
    short_description: "Replace freezing winter/boiling summer roofs with a lightweight, highly insulated tiled warm roof system.",
    full_content: "Our SupaLite and Guardian warm roof conversions eliminate glare, stop rain noise, and reduce heating bills. Fully compliant with Building Regulations with complete JHAI certification.",
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
    features: [
      "Incredible U-Value of 0.15 W/m²K (Warm in winter, cool in summer)",
      "Tapco synthetic slate & lightweight stone-coated tiles",
      "Velux roof windows and contemporary roof lanterns",
      "Vaulted internal plaster ceiling with integrated LED spots",
      "Building Control Certification included",
    ],
    specifications: {
      "Thermal U-Value": "0.15 W/m²K",
      "Framework": "Lightweight Structural Aluminium Box Beam",
      "Roofing Finish": "Tapco Slate / Metrotile Shingle",
      "Building Regs": "Fully JHAI / Building Control Certified",
    },
    base_price_estimate: 3500.0,
    price_unit: "per conversion",
    warranty_years: 10,
    is_fensa_certified: true,
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "srv-5",
    category_id: "cat-5",
    slug: "glass-balustrades",
    title: "Bespoke Frameless Glass Balustrades",
    headline: "Unobstructed Panoramic Views & Modern Luxury",
    short_description: "Toughened laminated structural glass railings for balconies, staircases, decking, and Juliette windows.",
    full_content: "Engineered from 17.5mm or 21.5mm toughened laminated glass with 316 marine-grade stainless steel fixtures, meeting all UK Building Regulations BS 6180:2011 for domestic and commercial safety.",
    hero_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsgves1M7x4qVdOsftHvJBVmU-7XTOTNqzDYSAVdNXGZXMu2RazwGdkT6Kloa2M88bIInlU-HVyg3ZdTxo_nJ8JP7JN9IG4i9BYiG_nDab6d17Mqv0aM3CUXi817p9BeIhMq-fQXJUL8wHuZHFiVSyoNOtteJhaHUF86d2-Mw7u_9GKvIcbjLuXhcWy7_79ooGISghQnRZ-0pGwDqTWEfPhmNTbVv-PoxLsdoNcVusUcVURcEjg5QJ",
    features: [
      "17.5mm - 21.5mm Toughened Laminated Safety Glass",
      "Duplex 2205 & 316 Marine-grade stainless steel fittings",
      "Full BS 6180:2011 structural compliance certificate",
      "Easy-clean hydrophobic nano-glass coating",
      "Internal staircase & external garden balcony systems",
    ],
    specifications: {
      "Glass Type": "17.5mm / 21.5mm Toughened Laminated",
      "Hardware Finish": "Brushed Marine Stainless 316 / Matte Black",
      "Load Capacity": "0.74kN / 1.5kN Line Load Compliance",
      "Compliance": "BS 6180:2011 Certified",
    },
    base_price_estimate: 220.0,
    price_unit: "per linear metre",
    warranty_years: 10,
    is_fensa_certified: true,
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];


export interface HeroSlide {
  id: string;
  tag: string;
  badgeText: string;
  title: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    tag: "Est. 1983 • 40+ Years Oxfordshire Heritage",
    badgeText: "Save Up To 70% vs Full Window Replacement",
    title: "Master Glazing & Window Engineering",
    highlightText: "Replace Glass, Not The Frame",
    description: "Bicester and Oxfordshire’s trusted glazing specialists since 1983. We diagnose and replace failed double-glazed sealed units with Argon Low-E glass in under 45 mins.",
    primaryCtaText: "Instant Price Calculator",
    primaryCtaLink: "/quote",
    secondaryCtaText: "Call 01869 572206",
    secondaryCtaLink: "tel:01869572206",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w",
    stats: [
      { label: "Cost Savings", value: "Up to 70%" },
      { label: "Install Time", value: "< 45 Mins" },
      { label: "Guarantee", value: "10 Years" },
    ],
  },
  {
    id: "hero-2",
    tag: "Architectural Precision & High Security",
    badgeText: "Ultion 3-Star Diamond £2,000 Security Guarantee",
    title: "Bespoke Panoramic Entrance Systems",
    highlightText: "Luxury Bi-Folds & 48mm Solid Doors",
    description: "Make a grand entrance with featherlight finger-glide aluminium bi-fold doors and impenetrable 48mm timber-core composite doors designed for the British climate.",
    primaryCtaText: "Explore Door Collection",
    primaryCtaLink: "/services/stylish-doors",
    secondaryCtaText: "Get Door Quote",
    secondaryCtaLink: "/quote",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf",
    stats: [
      { label: "Core Thickness", value: "48mm Solid" },
      { label: "Security Level", value: "PAS 24" },
      { label: "Acoustic Insulation", value: "42 dB" },
    ],
  },
  {
    id: "hero-3",
    tag: "All-Year Comfort & Thermal Excellence",
    badgeText: "0.15 W/m²K Ultra-Insulated Conversion",
    title: "Transform Freezing / Boiling Spaces",
    highlightText: "Warm Roof Conservatory Living",
    description: "Convert unusable polycarbonate conservatories into comfortable, light-filled all-season living rooms with Tapco slate tiles and integrated Velux rooflights.",
    primaryCtaText: "Explore Warm Roofs",
    primaryCtaLink: "/services/warm-roof-conservatories",
    secondaryCtaText: "Book Home Survey",
    secondaryCtaLink: "/quote",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
    stats: [
      { label: "Thermal U-Value", value: "0.15 U-Val" },
      { label: "Rain Noise", value: "Muted 95%" },
      { label: "Compliance", value: "JHAI Certified" },
    ],
  },
  {
    id: "hero-4",
    tag: "Cotswold & Oxfordshire Architecture",
    badgeText: "A++ Energy Rating with Pilkington Low-E",
    title: "Precision uPVC & Slimline Aluminium",
    highlightText: "A++ Modern Energy Windows",
    description: "Custom flush sash and casement windows available in over 30 heritage colour finishes including Anthracite Grey, Chartwell Green, and Golden Oak.",
    primaryCtaText: "Configure Window Colors",
    primaryCtaLink: "/services/modern-windows",
    secondaryCtaText: "Free Measurement",
    secondaryCtaLink: "/quote",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K",
    stats: [
      { label: "Energy Efficiency", value: "A++ Class" },
      { label: "Heritage Colours", value: "30+ Shades" },
      { label: "FENSA Certified", value: "Reg 28491" },
    ],
  },
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-1",
    service_id: "srv-1",
    title: "Complete Misted Double Glazing Restoration",
    location_city: "Kingsmere, Bicester",
    completion_year: "2024",
    summary: "Replaced 14 condensation-clouded double glazing units in a detached family home while preserving the client's pristine mahogany frames, saving over £6,200.",
    challenge_description: "The homeowner was told by national window companies that their mahogany timber frames were obsolete and demanded a complete tear-out costing over £9,000.",
    solution_description: "The Window Doctor measured all 14 units to millimetre precision and manufactured Argon-filled Low-E sealed units, installing them in 6 hours with zero paintwork damage.",
    specifications: [
      "14 High-performance Argon sealed units",
      "Pilkington Optitherm Low-E Coating",
      "Swissspacer warm edge thermal spacers",
      "Total cost saving: 68% vs new frames",
      "Zero disruption to interior decoration",
    ],
    before_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    after_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w",
    is_featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-2",
    service_id: "srv-3",
    title: "Anthracite Aluminium Bi-Fold Doors Installation",
    location_city: "Summertown, Oxford",
    completion_year: "2024",
    summary: "Fitted 5-panel panoramic aluminium bi-fold doors with flush threshold and Ultion 3-star high security lock in a modern extension.",
    challenge_description: "Draughty old French doors failed to provide thermal insulation and blocked daylight from the garden terrace.",
    solution_description: "Installed a bespoke 4.8m Anthracite Grey (RAL 7016) thermally-broken bi-fold system with solar-control glass and easy finger-slide rollers.",
    specifications: [
      "5-Panel Schuco aluminium profile system",
      "Low-emissivity solar control double glazing",
      "Flush weathered rebated threshold",
      "3-Star Ultion high security locks",
      "Full FENSA registration & certificate",
    ],
    before_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    after_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf",
    is_featured: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-3",
    service_id: "srv-4",
    title: "Lightweight Warm Roof Conservatory Conversion",
    location_city: "Bloxham, Banbury",
    completion_year: "2024",
    summary: "Replaced an unusable, leaking polycarbonate roof with a Guardian Warm Roof, adding an all-season open-plan living space.",
    challenge_description: "The room was freezing in winter and like a sauna in summer with deafening rain noise.",
    solution_description: "Removed polycarbonate and fitted a lightweight aluminium roof frame with Tapco slate tiles, 2 Velux roof windows, and vaulted LED downlights.",
    specifications: [
      "U-Value reduced from 3.2 to 0.15 W/m²K",
      "Tapco Slate tiles matched to existing house",
      "2x Velux solar-powered roof windows",
      "Fully certified by Building Control",
      "Added estimated £18,000 to property value",
    ],
    before_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    after_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
    is_featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-4",
    service_id: "srv-2",
    title: "Heritage Agate Green Flush Sash Window Replacement",
    location_city: "Woodstock, Oxfordshire",
    completion_year: "2024",
    summary: "Fitted 8 A++ energy rated heritage flush sash windows in Agate Green on a stone Cotswold property with PAS 24 multi-point security.",
    challenge_description: "Original draughty wooden sash frames had rotted sills and excessive street noise entering the bedroom.",
    solution_description: "Engineered bespoke flush sash uPVC frames matching the historical conservation aesthetics with 38dB acoustic laminate glazing.",
    specifications: [
      "8x Agate Green flush sash frames",
      "38dB Acoustic noise reduction glass",
      "Traditional dummy peg stays and monkey tail handles",
      "A++ Energy Rating / 1.0 U-Value",
      "10-Year Insurance-Backed Guarantee",
    ],
    before_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    after_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K",
    is_featured: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-5",
    service_id: "srv-5",
    title: "Frameless Toughened Glass Balustrade on Garden Terrace",
    location_city: "Kidlington, Oxfordshire",
    completion_year: "2024",
    summary: "Installed 12 metres of 21.5mm structural laminated frameless glass balustrade with 316 marine-grade base channel overlooking landscaped grounds.",
    challenge_description: "Old wooden terrace rails obstructed panoramic garden views and required continuous painting and staining.",
    solution_description: "Precision recessed aluminium base shoe with ultra-clear toughened laminated safety glass and hydrophobic nano-coating.",
    specifications: [
      "12m 21.5mm Toughened Laminated Glass",
      "BS 6180:2011 1.5kN line load certification",
      "Self-cleaning nano hydrophobic coating",
      "Slimline stainless steel top cap",
      "Completed in 2 working days",
    ],
    before_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    after_image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsgves1M7x4qVdOsftHvJBVmU-7XTOTNqzDYSAVdNXGZXMu2RazwGdkT6Kloa2M88bIInlU-HVyg3ZdTxo_nJ8JP7JN9IG4i9BYiG_nDab6d17Mqv0aM3CUXi817p9BeIhMq-fQXJUL8wHuZHFiVSyoNOtteJhaHUF86d2-Mw7u_9GKvIcbjLuXhcWy7_79ooGISghQnRZ-0pGwDqTWEfPhmNTbVv-PoxLsdoNcVusUcVURcEjg5QJ",
    is_featured: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export interface GoogleReviewItem {
  id: string;
  customer_name: string;
  customer_location: string;
  avatar_url: string;
  rating: number;
  service_category: string;
  category_key: "glass" | "doors" | "windows" | "roofs";
  review_title: string;
  review_text: string;
  time_ago: string;
  is_google_verified: boolean;
  owner_response?: {
    text: string;
    date: string;
  } | null;
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "g-rev-1",
    customer_name: "Katie Hawkins",
    customer_location: "Bicester & Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Windows & Glazing",
    category_key: "windows",
    review_title: "Sean came and quoted, really polite and understood what we wanted",
    review_text: "Sean came and quoted, really polite and understood what we wanted. - within 2 weeks fitted. And looks absolutely fantastic, really pleased. Before and after photos look brilliant, really modernised our property. Thank you.",
    time_ago: "9 months ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-2",
    customer_name: "Carly Brown",
    customer_location: "Bicester & Surrounds",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Composite Front Door",
    category_key: "doors",
    review_title: "Really happy with my new front door",
    review_text: "Really happy with my new front door. Fitted quickly, looks great, and everything was left clean and tidy. The guys were friendly, easy to deal with, and very professional. Would definitely recommend.",
    time_ago: "6 months ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-3",
    customer_name: "Darren Barber",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Bi-Fold Doors Installation",
    category_key: "doors",
    review_title: "Second time of using these guys, 10/10 love my bifold doors",
    review_text: "Second time of using these guys, extremely professional service and perfect job done each time. 10/10, love my bifold doors. Would definitely recommend.",
    time_ago: "Recently",
    is_google_verified: true,
  },
  {
    id: "g-rev-4",
    customer_name: "Chotirot Sungthong",
    customer_location: "Bicester Area",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "General Door & Window Installation",
    category_key: "windows",
    review_title: "Great service, Professional, reliable and fairly priced",
    review_text: "Great service, Professional, reliable and fairly priced. Highly recommend The Window Doctor’s! Quality workmanship on doors and glass installation.",
    time_ago: "Recently",
    is_google_verified: true,
  },
  {
    id: "g-rev-5",
    customer_name: "Kate Colville",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Misted Window Pane Replacement",
    category_key: "glass",
    review_title: "Excellent polite and helpful staff, great communication",
    review_text: "Excellent polite and helpful staff. Great communication about pricing and fitting. Reasonable price and great new window pane. Would recommend.",
    time_ago: "Recently",
    is_google_verified: true,
  },
  {
    id: "g-rev-6",
    customer_name: "David Myers",
    customer_location: "Bicester & Bucknell",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Window Replacement & Bathroom Glass Panel",
    category_key: "windows",
    review_title: "Impressed by the workmanship to replace two windows",
    review_text: "Great service and quality windows at a very competitive price. My wife and I were impressed by the workmanship to replace two windows and a faulty glass panel in our bathroom.",
    time_ago: "2 weeks ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-7",
    customer_name: "Jade Anderson",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Family Home Window Fitting",
    category_key: "windows",
    review_title: "Amazing service, very professional and helpful! 10 out of 10",
    review_text: "Amazing service, very professional and helpful in helping us choose the right fit for us as a family! We would highly recommend Sean and the team. 10 out of 10 !!!",
    time_ago: "6 months ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-8",
    customer_name: "Msleep",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "3-Panel Bi-Fold Doors Adjustment",
    category_key: "doors",
    review_title: "Sean provided a quote there and then, overall very good experience",
    review_text: "I had an issue with my 3 panel bifold doors so I rang up the team to explain the problem. They sent Sean round to provide a quote and he talked me through what needed to be done. Team came round to adjust the doors and was happy to explain what they were doing and why it happened. Overall very good experience and would recommend.",
    time_ago: "a year ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-9",
    customer_name: "Tonia Sciavilla",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Replacement Doors & Window Repairs",
    category_key: "doors",
    review_title: "100% recommend them and would definitely use them again",
    review_text: "We have had various jobs done over the years by The Window Doctors, when we had replacement front and back doors and various window repairs. The team are very professional, very fast and very nice and friendly. They also clean up after themselves so never leave any mess. I would 100% recommend them.",
    time_ago: "3 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-10",
    customer_name: "Stevie Strutton",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Window Installation",
    category_key: "windows",
    review_title: "Highly recommend! Could not be happier with results",
    review_text: "Highly recommend!! Very professional, attentive and done an excellent job with my window installation. Could not be happier with the results and for a great price too!",
    time_ago: "3 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-11",
    customer_name: "Siana and Danny",
    customer_location: "Bicester",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Glazing & Window Installation",
    category_key: "windows",
    review_title: "Great quality, good value and very professional",
    review_text: "Definitely recommend this company. Great quality, good value and very professional. The job was done as promised and on time to a great quality! We are very happy! Thank you The Window Doctor.",
    time_ago: "3 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-12",
    customer_name: "Jodi Richards",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Glass & Glazing Transformation",
    category_key: "glass",
    review_title: "You have transformed our house. One of the best in the business!",
    review_text: "Thank you window doctor! You have transformed our house. Could not recommend enough. One of the best tradesmen in the business! Thank you again!",
    time_ago: "3 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-13",
    customer_name: "ann gardner",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Conservatory Window Repairs",
    category_key: "roofs",
    review_title: "Excellent speedy service for our conservatory windows",
    review_text: "Sean gave us excellent speedy service when we had problems with our conservatory windows. Highly recommend.",
    time_ago: "6 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-14",
    customer_name: "Kevin Barker",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "4x Windows Replacement",
    category_key: "windows",
    review_title: "4 windows replaced in a very short time, very professional",
    review_text: "Excellent service, 4 windows replaced in a very short time, very professional.",
    time_ago: "2 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-15",
    customer_name: "David Booth",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Bi-Folding Doors Installation",
    category_key: "doors",
    review_title: "Fantastic work putting in bi-folding doors",
    review_text: "Fantastic work putting in bi-folding doors. Really quick and knew his product.",
    time_ago: "3 years ago",
    is_google_verified: true,
  },
  {
    id: "g-rev-16",
    customer_name: "Eve Fear",
    customer_location: "Oxfordshire",
    avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    rating: 5,
    service_category: "Patio Doors Adjustment",
    category_key: "doors",
    review_title: "Whole job done in a very short time. Very pleased",
    review_text: "Needed an adjustment on my patio doors. They arrived on time, were polite and pleasant. Adjusted the doors and explained what they had done. Whole job done in a very short time. Very pleased, I now have working patio doors.",
    time_ago: "2 years ago",
    is_google_verified: true,
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    project_id: "proj-1",
    customer_name: "David & Sarah Henderson",
    customer_location: "Kingsmere, Bicester",
    service_category: "Misted Glass Repair",
    rating: 5,
    review_title: "Saved us thousands on our windows!",
    review_text: "Other national companies insisted we had to replace all 14 frames at huge expense. The Window Doctor came out the next morning, measured the seals, and replaced only the misted glass. Fast, spotless cleanup, and our home is warm again!",
    is_verified: true,
    review_date: "2024-10-15",
    created_at: new Date().toISOString(),
  },
  {
    id: "rev-2",
    project_id: "proj-2",
    customer_name: "Dr. Edward Thorne",
    customer_location: "Summertown, Oxford",
    service_category: "Bi-Fold Doors Installation",
    rating: 5,
    review_title: "Exceptional craftsmanship and precision",
    review_text: "From the initial survey to the final fitment, the team demonstrated master-level skill. The bi-folds glide with one finger and transformed our rear extension. Highly recommended.",
    is_verified: true,
    review_date: "2024-11-02",
    created_at: new Date().toISOString(),
  },
  {
    id: "rev-3",
    project_id: "proj-3",
    customer_name: "Mrs. Gillian Wright",
    customer_location: "Bloxham, Banbury",
    service_category: "Warm Roof Conversion",
    rating: 5,
    review_title: "We finally have our living space back",
    review_text: "We can now sit in our conservatory even in sub-zero January weather. The sound of rain is completely muted, and the lighting looks stunning. 40 years of experience truly shows.",
    is_verified: true,
    review_date: "2024-11-20",
    created_at: new Date().toISOString(),
  },
  {
    id: "rev-4",
    project_id: null,
    customer_name: "Mark & Claire Davies",
    customer_location: "Kidlington, Oxfordshire",
    service_category: "Composite Door & Windows",
    rating: 5,
    review_title: "Prompt, polite and outstanding quality",
    review_text: "Replaced our dated front door with a solid core composite and fitted new triple glazed casement windows. Great communication from the office and clean, tidy installers.",
    is_verified: true,
    review_date: "2024-12-05",
    created_at: new Date().toISOString(),
  },
];

export const MOCK_SERVICE_AREAS: ServiceArea[] = [
  {
    id: "area-1",
    town_name: "Bicester & Bucknell",
    county: "Oxfordshire",
    response_time_hours: 2,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-2",
    town_name: "Oxford City & Suburbs",
    county: "Oxfordshire",
    response_time_hours: 4,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-3",
    town_name: "Banbury & Surrounds",
    county: "Oxfordshire",
    response_time_hours: 4,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-4",
    town_name: "Kidlington & Woodstock",
    county: "Oxfordshire",
    response_time_hours: 4,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-5",
    town_name: "Brackley & Buckingham",
    county: "Buckinghamshire",
    response_time_hours: 6,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-6",
    town_name: "Witney & Cotswolds East",
    county: "Oxfordshire",
    response_time_hours: 6,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "area-7",
    town_name: "Thame & Aylesbury Border",
    county: "Oxfordshire",
    response_time_hours: 6,
    emergency_available: true,
    free_survey: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

export const MOCK_POSTCODES: Postcode[] = [
  { id: "pc-1", area_id: "area-1", postcode_prefix: "OX25", region_name: "Bicester North, Bucknell, Ambrosden, Weston-on-the-Green", created_at: new Date().toISOString() },
  { id: "pc-2", area_id: "area-1", postcode_prefix: "OX26", region_name: "Bicester Central, Kingsmere, Highfield, Bure Park", created_at: new Date().toISOString() },
  { id: "pc-3", area_id: "area-1", postcode_prefix: "OX27", region_name: "Bicester East, Fritwell, Marsh Gibbon, Stratton Audley", created_at: new Date().toISOString() },
  { id: "pc-4", area_id: "area-2", postcode_prefix: "OX1", region_name: "Central Oxford, Grandpont, New Hinksey", created_at: new Date().toISOString() },
  { id: "pc-5", area_id: "area-2", postcode_prefix: "OX2", region_name: "North Oxford, Summertown, Wolvercote, Jericho", created_at: new Date().toISOString() },
  { id: "pc-6", area_id: "area-2", postcode_prefix: "OX3", region_name: "Headington, Marston, Barton", created_at: new Date().toISOString() },
  { id: "pc-7", area_id: "area-2", postcode_prefix: "OX4", region_name: "East Oxford, Cowley, Iffley, Rose Hill", created_at: new Date().toISOString() },
  { id: "pc-8", area_id: "area-4", postcode_prefix: "OX5", region_name: "Kidlington, Yarnton, Begbroke, Gosford", created_at: new Date().toISOString() },
  { id: "pc-9", area_id: "area-3", postcode_prefix: "OX15", region_name: "Bloxham, Deddington, Hook Norton, Sibford Gower", created_at: new Date().toISOString() },
  { id: "pc-10", area_id: "area-3", postcode_prefix: "OX16", region_name: "Banbury Town, Neithrop, Hardwick, Grimsbury", created_at: new Date().toISOString() },
  { id: "pc-11", area_id: "area-6", postcode_prefix: "OX28", region_name: "Witney Central, Cogges, Ducklington", created_at: new Date().toISOString() },
  { id: "pc-12", area_id: "area-6", postcode_prefix: "OX29", region_name: "Eynsham, Long Hanborough, Freeland", created_at: new Date().toISOString() },
  { id: "pc-13", area_id: "area-7", postcode_prefix: "OX9", region_name: "Thame, Moreton, Towersey", created_at: new Date().toISOString() },
  { id: "pc-14", area_id: "area-5", postcode_prefix: "NN13", region_name: "Brackley, Croughton, Evenley, Turweston", created_at: new Date().toISOString() },
  { id: "pc-15", area_id: "area-5", postcode_prefix: "MK18", region_name: "Buckingham, Tingewick, Gawcott", created_at: new Date().toISOString() },
];

export interface SiteSettingsData {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  fensaNumber: string;
  openingHours: string;
  googleMapsPlaceId: string;
  facebookUrl: string;
  instagramUrl: string;
  tagline: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  businessName: "The Window Doctor",
  phone: "01869 572206",
  email: "info@thewindowdoctors.co.uk",
  address: "Home Farm, Bainton Road",
  city: "Bucknell, Bicester",
  postcode: "OX27 7LT",
  fensaNumber: "28491",
  openingHours: "Mon-Sat 08:00-18:00",
  googleMapsPlaceId: "ChIJbV02x3gSdkgREr28n_7eJQI",
  facebookUrl: "https://facebook.com/thewindowdoctorsoxfordshire",
  instagramUrl: "https://instagram.com/thewindowdoctors_uk",
  tagline: "Oxfordshire Glazing Specialists Since 1983",
};

export interface ComparisonItem {
  id: string;
  feature: string;
  windowDoctor: string;
  nationalGuys: string;
  isSuperior?: boolean;
}

export const DEFAULT_COMPARISON_ROWS: ComparisonItem[] = [
  {
    id: "comp-1",
    feature: "Cost for 8 Windows",
    windowDoctor: "£760 - £1,100 (Glass Unit Replacement)",
    nationalGuys: "£6,500 - £9,800 (Full Tear-Out)",
    isSuperior: true,
  },
  {
    id: "comp-2",
    feature: "Installation Time",
    windowDoctor: "2 to 3 Hours (30-45 mins per unit)",
    nationalGuys: "2 to 3 Days with Heavy Disruption",
    isSuperior: true,
  },
  {
    id: "comp-3",
    feature: "Damage to Interior Walls & Plaster",
    windowDoctor: "Zero Damage — Existing frames stay untouched",
    nationalGuys: "High — Plastering & re-decorating required",
    isSuperior: true,
  },
  {
    id: "comp-4",
    feature: "Thermal Insulation (Low-E Argon)",
    windowDoctor: "A+ Rating (1.1 W/m²K Pilkington Glass)",
    nationalGuys: "Standard Double Glazing",
    isSuperior: true,
  },
  {
    id: "comp-5",
    feature: "Sales Approach",
    windowDoctor: "Honest Master Glazier Survey (No Pressure)",
    nationalGuys: "High-Pressure Commissioned Sales Reps",
    isSuperior: true,
  },
];

export interface ProcessStepItem {
  id: string;
  num: string;
  title: string;
  timing: string;
  description: string;
}

export const DEFAULT_PROCESS_STEPS: ProcessStepItem[] = [
  {
    id: "step-1",
    num: "01",
    title: "Laser Precision Survey",
    timing: "Free • 30 Mins",
    description: "Our master glazier visits your home with digital laser gauges to measure exact unit dimensions, glass thickness, and spacer specs.",
  },
  {
    id: "step-2",
    num: "02",
    title: "Bespoke UK Glazing",
    timing: "2-4 Working Days",
    description: "Your replacement units are hermetically sealed with Swissspacer warm edge bars and 90% pure Argon thermal gas in our regional workshop.",
  },
  {
    id: "step-3",
    num: "03",
    title: "Clean Master Installation",
    timing: "30-45 Mins / Pane",
    description: "Beads are carefully unclipped, the failed unit is removed, and the new crystal unit is seated with zero mess and zero plaster damage.",
  },
  {
    id: "step-4",
    num: "04",
    title: "10-Year Certificate",
    timing: "Instant Handover",
    description: "We test all handles, lubricate hinges, and issue your official 10-Year Insurance-Backed Anti-Fog Guarantee and FENSA documentation.",
  },
];

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export const DEFAULT_FAQS: FAQItemData[] = [
  {
    id: "faq-1",
    question: "Do I need to replace my whole window frame if the glass is misted?",
    answer: "No! In over 95% of cases, you only need to replace the failed double-glazed sealed unit. Your existing frames remain completely intact, saving you up to 70% compared to full replacements.",
    sort_order: 1,
  },
  {
    id: "faq-2",
    question: "How long does a misted glass replacement take?",
    answer: "Our master technicians typically complete each window pane replacement in under 45 minutes with zero mess and zero disturbance to your internal decor or plaster.",
    sort_order: 2,
  },
  {
    id: "faq-3",
    question: "Are your window installations FENSA certified and insured?",
    answer: "Yes. We are fully FENSA registered (No. 28491). All new window and door installations include Building Regulations compliance certification and a 10-Year Insurance-Backed Guarantee.",
    sort_order: 3,
  },
  {
    id: "faq-4",
    question: "Can you install cat flaps into double glazed glass doors?",
    answer: "Yes. We manufacture custom toughened double glazed glass units with pre-cut factory sealed apertures designed specifically for SureFlap microchip and manual cat flaps.",
    sort_order: 4,
  },
  {
    id: "faq-5",
    question: "Do you charge for home surveys and quotes in Oxfordshire?",
    answer: "No. All our initial on-site inspections, measurements, and formal written quotations are 100% free with absolutely no high-pressure sales obligation.",
    sort_order: 5,
  },
];

export interface TrustPillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_name: string;
  sort_order: number;
}

export const DEFAULT_TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: "pillar-1",
    title: "Est. 1983 Heritage",
    subtitle: "40+ Years Local Experience",
    description: "Four decades of uninterrupted service to Bicester, Oxford, and surrounding Cotswold communities.",
    icon_name: "Clock",
    sort_order: 1,
  },
  {
    id: "pillar-2",
    title: "FENSA Certified",
    subtitle: "Reg. No. 28491",
    description: "All replacement windows and doors comply fully with UK Building Regulations with official certification.",
    icon_name: "ShieldCheck",
    sort_order: 2,
  },
  {
    id: "pillar-3",
    title: "10-Year Guarantee",
    subtitle: "Insurance-Backed Security",
    description: "Enjoy long-term peace of mind on all sealed double glazed units and modern frame installations.",
    icon_name: "Award",
    sort_order: 3,
  },
  {
    id: "pillar-4",
    title: "No High-Pressure Sales",
    subtitle: "Honest Master Glazier Advice",
    description: "Direct communication with seasoned fenestration engineers without sales intermediaries.",
    icon_name: "CheckCircle",
    sort_order: 4,
  },
];

export interface FrameColorItem {
  id: string;
  name: string;
  ral_code: string;
  hex_color: string;
  finish: string;
  price_surcharge_percent: number;
  is_popular: boolean;
  sort_order: number;
}

export const DEFAULT_FRAME_COLORS: FrameColorItem[] = [
  { id: "col-1", name: "Anthracite Grey", ral_code: "RAL 7016", hex_color: "#383E42", finish: "Textured Matt Foil", price_surcharge_percent: 0, is_popular: true, sort_order: 1 },
  { id: "col-2", name: "Chartwell Green", ral_code: "BS 14 C 35", hex_color: "#8BA896", finish: "Heritage Woodgrain", price_surcharge_percent: 0, is_popular: true, sort_order: 2 },
  { id: "col-3", name: "Agate Grey", ral_code: "RAL 7038", hex_color: "#B5B8B1", finish: "Smooth Silk", price_surcharge_percent: 0, is_popular: true, sort_order: 3 },
  { id: "col-4", name: "Classic Brilliant White", ral_code: "RAL 9016", hex_color: "#F4F4F4", finish: "High-Gloss Smooth", price_surcharge_percent: 0, is_popular: true, sort_order: 4 },
  { id: "col-5", name: "Golden Oak", ral_code: "Woodgrain", hex_color: "#A87139", finish: "Natural Timber Texture", price_surcharge_percent: 5, is_popular: false, sort_order: 5 },
  { id: "col-6", name: "Rosewood", ral_code: "Woodgrain", hex_color: "#522A1E", finish: "Deep Timber Texture", price_surcharge_percent: 5, is_popular: false, sort_order: 6 },
  { id: "col-7", name: "Slate Grey", ral_code: "RAL 7015", hex_color: "#4C5155", finish: "Matt Foil", price_surcharge_percent: 0, is_popular: false, sort_order: 7 },
  { id: "col-8", name: "Black Ash", ral_code: "RAL 9005", hex_color: "#1F2022", finish: "Architectural Grain", price_surcharge_percent: 0, is_popular: false, sort_order: 8 },
];

export interface EnergyRateItem {
  id: string;
  key: string;
  label: string;
  rate_value: number;
  unit: string;
}

export const DEFAULT_ENERGY_RATES: EnergyRateItem[] = [
  { id: "rate-1", key: "single_to_a_plus_savings", label: "Single to A++ Glazing Annual Savings", rate_value: 195.0, unit: "£ / year" },
  { id: "rate-2", key: "old_double_to_argon_savings", label: "Old 90s Double to Argon Low-E Savings", rate_value: 145.0, unit: "£ / year" },
  { id: "rate-3", key: "co2_reduction_kg", label: "Average Annual Carbon Reduction", rate_value: 420.0, unit: "kg CO2 / year" },
  { id: "rate-4", key: "u_value_improvement_percent", label: "Thermal Retention Improvement", rate_value: 64.0, unit: "% retention" },
];

