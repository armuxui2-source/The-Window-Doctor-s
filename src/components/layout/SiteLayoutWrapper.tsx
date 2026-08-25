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
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdmin) {
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
