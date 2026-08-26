import type { Metadata } from "next";
import { Hanken_Grotesk, Work_Sans, Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingMobileNav from "@/components/layout/FloatingMobileNav";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const promptFont = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thewindowdoctors.co.uk"),
  title: {
    default: "The Window Doctor | Bicester & Oxfordshire Master Glaziers (Est. 1983)",
    template: "%s | The Window Doctor",
  },
  description: "Bicester & Oxfordshire's premier family glazing specialists for 40+ years. FENSA Certified misted glass repair, A++ energy windows, composite doors, and warm roofs.",
  keywords: [
    "Window repair Bicester",
    "Misted glass repair Oxfordshire",
    "Double glazing repair Bicester",
    "Composite doors Oxford",
    "Warm roof conservatory Oxfordshire",
    "FENSA certified glazier Bicester",
    "Emergency glazier Oxford",
    "Glass seal failure repair",
  ],
  authors: [{ name: "The Window Doctor Bicester" }],
  creator: "The Window Doctor",
  publisher: "The Window Doctor",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "The Window Doctor | Master Glaziers & Fenestration Since 1983",
    description: "Save up to 70% by replacing only the failed double glazed glass. FENSA Certified with 10-Year Insurance-Backed Guarantee.",
    url: "https://thewindowdoctors.co.uk",
    siteName: "The Window Doctor",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Window Doctor | Bicester Glazing Specialists",
    description: "40+ Years of master glazing, window installations, and misted seal repairs in Oxfordshire.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


import DynamicIntegrationsLoader from "@/components/providers/DynamicIntegrationsLoader";
import SiteLayoutWrapper from "@/components/layout/SiteLayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${hankenGrotesk.variable} ${workSans.variable} ${promptFont.variable} scroll-smooth`}
    >
      <head>
        <DynamicIntegrationsLoader />
      </head>
      <body className="bg-background text-on-surface font-body min-h-screen flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  );
}

