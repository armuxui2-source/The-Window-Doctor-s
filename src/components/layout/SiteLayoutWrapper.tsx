"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingMobileNav from "@/components/layout/FloatingMobileNav";

interface SiteLayoutWrapperProps {
  children: React.ReactNode;
}

export default function SiteLayoutWrapper({ children }: SiteLayoutWrapperProps) {
  const pathname = usePathname();
  
  // Standalone routes that have their own dedicated canvases (Zero client navbar/footer clutter)
  const isStandalone = 
    pathname === "/admin" || 
    pathname?.startsWith("/admin/") ||
    pathname === "/showcase" || 
    pathname?.startsWith("/showcase/");

  if (isStandalone) {
    return (
      <div className="min-h-screen w-full bg-slate-50 antialiased font-body">
        {children}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full relative">{children}</main>
      <Footer />
      <FloatingMobileNav />
    </>
  );
}
