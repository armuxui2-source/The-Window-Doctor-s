"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Laptop,
  Smartphone,
  CheckCircle2,
  Sparkles,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
  Globe,
  Monitor,
  Star,
  Layers,
  ChevronRight,
  Lock,
  Share2,
  Check
} from "lucide-react";
import { SupabaseLogo, AppleLogo, MicrosoftLogo, AndroidLogo } from "./PlatformLogos";
import { cn } from "@/lib/utils";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface AdminInstallAppModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export function AdminInstallAppModal({ forceOpen = false, onClose }: AdminInstallAppModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeInstructionTab, setActiveInstructionTab] = useState<"pc" | "mobile">("pc");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsOpen(false);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // Auto show modal on load unless previously dismissed
    const hasDismissed = localStorage.getItem("twd_admin_install_dismissed");
    if (!hasDismissed || forceOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [forceOpen]);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setActiveInstructionTab("pc");
    }
  };

  const handleClose = (neverShowAgain = false) => {
    if (neverShowAgain) {
      localStorage.setItem("twd_admin_install_dismissed", "true");
    }
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in font-body">
      <div className="bg-white rounded-[32px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* App Store Top Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors shrink-0 z-10"
          title="Close store listing"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ======================================================================= */}
        {/* 1. APP STORE HEADER LISTING                                             */}
        {/* ======================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-b border-slate-100 pb-6 pr-8">
          <div className="flex items-center gap-4">
            {/* Squircle App Store Icon */}
            <div className="w-20 h-20 rounded-[22px] bg-gradient-to-br from-primary via-primary-light to-primary text-white flex items-center justify-center shadow-lg border-2 border-slate-100 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent opacity-60" />
              <div className="flex flex-col items-center justify-center relative z-10">
                <ShieldCheck className="w-8 h-8 text-secondary" />
                <span className="text-[9px] font-extrabold font-headline tracking-tighter text-white mt-0.5">
                  THE WINDOW DOCTOR
                </span>
              </div>
            </div>

            {/* Title & Developer Meta */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-headline font-extrabold text-xl sm:text-2xl text-primary tracking-tight whitespace-nowrap">
                  The Window Doctor
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold font-mono whitespace-nowrap flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Verified Suite</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 font-label">
                Enterprise Glazier Operations & Admin Suite
              </p>
              <div className="text-[11px] font-bold text-secondary font-headline flex items-center gap-1.5 whitespace-nowrap">
                <span>The Window Doctor Ltd</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal">Bicester & Oxfordshire (Est. 1983)</span>
              </div>
            </div>
          </div>

          {/* App Store "GET" Button */}
          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-secondary-container font-headline font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>INSTALL APP</span>
            </button>
            <span className="text-[10px] text-slate-400 font-label text-center sm:text-right whitespace-nowrap">
              In-App Purchase: Free • 100% Secure
            </span>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. STORE METRICS & RATINGS BAR (APP STORE STYLE)                       */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-4 divide-x divide-slate-100 bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-center">
          <div className="px-2 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 font-label whitespace-nowrap">128 RATINGS</div>
            <div className="font-headline font-extrabold text-sm text-primary flex items-center justify-center gap-1 whitespace-nowrap">
              <span>4.9</span>
              <div className="flex text-amber-500">
                <Star className="w-3 h-3 fill-amber-500" />
              </div>
            </div>
            <div className="text-[9px] text-slate-400 font-label whitespace-nowrap">Top Rated Glaziers</div>
          </div>

          <div className="px-2 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 font-label whitespace-nowrap">FENSA ASSURED</div>
            <div className="font-headline font-extrabold text-sm text-primary whitespace-nowrap">#28491</div>
            <div className="text-[9px] text-slate-400 font-label whitespace-nowrap">Certified Standard</div>
          </div>

          <div className="px-2 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 font-label whitespace-nowrap">VERSION</div>
            <div className="font-headline font-extrabold text-sm text-primary whitespace-nowrap font-mono">v2.4.0</div>
            <div className="text-[9px] text-slate-400 font-label whitespace-nowrap">Enterprise 2026</div>
          </div>

          <div className="px-2 space-y-0.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 font-label whitespace-nowrap">ENGINE</div>
            <div className="font-headline font-extrabold text-sm text-emerald-700 flex items-center justify-center gap-1 whitespace-nowrap font-mono">
              <SupabaseLogo className="w-3.5 h-3.5 shrink-0" />
              <span>Cloud Live</span>
            </div>
            <div className="text-[9px] text-slate-400 font-label whitespace-nowrap">Instant PWA</div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. APP PREVIEW CAROUSEL CARDS                                           */}
        {/* ======================================================================= */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-primary font-headline block whitespace-nowrap">
            Executive Capabilities & Feature Previews
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-7 h-7 rounded-xl bg-primary text-secondary flex items-center justify-center">
                <Monitor className="w-3.5 h-3.5" />
              </div>
              <div className="font-headline font-bold text-xs text-primary whitespace-nowrap">
                Executive KPI Dashboard
              </div>
              <p className="text-[11px] text-slate-500 font-label leading-relaxed">
                Live inquiry pipeline, revenue trends, and Oxfordshire regional postcode heatmaps.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-7 h-7 rounded-xl bg-primary text-secondary flex items-center justify-center">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="font-headline font-bold text-xs text-primary whitespace-nowrap">
                Master Glazier CMS
              </div>
              <p className="text-[11px] text-slate-500 font-label leading-relaxed">
                Slide-Over drawers with local PC drag-and-drop before & after photos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-xs space-y-2">
              <div className="w-7 h-7 rounded-xl bg-primary text-secondary flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="font-headline font-bold text-xs text-primary whitespace-nowrap">
                Supabase Cloud Sync
              </div>
              <p className="text-[11px] text-slate-500 font-label leading-relaxed">
                20 normalized PostgreSQL tables with automated 1-click cloud sync.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. WHAT'S NEW IN VERSION 2.4.0                                          */}
        {/* ======================================================================= */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-headline font-bold text-primary whitespace-nowrap">
              What's New in Version 2.4.0
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Current Release</span>
          </div>
          <ul className="text-xs text-slate-600 font-label space-y-1.5 list-disc list-inside">
            <li><strong className="text-slate-800">Local PC Image Upload:</strong> Direct file drag & drop from computer with instant aspect-ratio preview.</li>
            <li><strong className="text-slate-800">Authentic Brand SVGs:</strong> 100% official vector platform logos for GA4, GTM, GSC, Meta, and LINE.</li>
            <li><strong className="text-slate-800">Slide-Over Drawers:</strong> Right-hand side sliding panels for high-speed admin management.</li>
          </ul>
        </div>

        {/* ======================================================================= */}
        {/* 5. DEVICE INSTALLATION GUIDES                                           */}
        {/* ======================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-label">
            <span className="font-bold text-primary whitespace-nowrap">Official Store Platforms:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setActiveInstructionTab("pc")}
                className={cn(
                  "px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-xs",
                  activeInstructionTab === "pc"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <div className="flex items-center gap-1">
                  <MicrosoftLogo className="w-3 h-3 shrink-0" />
                  <AppleLogo className="w-3 h-3 text-slate-800 shrink-0" />
                </div>
                <span>Windows & Mac</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveInstructionTab("mobile")}
                className={cn(
                  "px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-xs",
                  activeInstructionTab === "mobile"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                <div className="flex items-center gap-1">
                  <AppleLogo className="w-3 h-3 text-slate-800 shrink-0" />
                  <AndroidLogo className="w-3.5 h-2.5 shrink-0" />
                </div>
                <span>iOS & Android</span>
              </button>
            </div>
          </div>

          {activeInstructionTab === "pc" && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2.5 text-xs font-label">
              <div className="flex items-center justify-between">
                <span className="font-bold text-secondary font-headline flex items-center gap-2 whitespace-nowrap">
                  <MicrosoftLogo className="w-3.5 h-3.5 shrink-0" />
                  <AppleLogo className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Google Chrome & Microsoft Edge (PC / Mac)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Direct Desktop App</span>
              </div>
              <ol className="space-y-1.5 text-slate-300 list-decimal list-inside text-xs leading-relaxed">
                <li>Click the gold <strong className="text-secondary">"Install App to PC"</strong> button below.</li>
                <li>Or click the <strong className="text-white">Install Icon ⤓</strong> located in your browser URL bar.</li>
                <li>Select <strong className="text-white">"Install"</strong> to place a shortcut on your Desktop & Taskbar.</li>
              </ol>
            </div>
          )}

          {activeInstructionTab === "mobile" && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2.5 text-xs font-label">
              <div className="flex items-center justify-between">
                <span className="font-bold text-secondary font-headline flex items-center gap-2 whitespace-nowrap">
                  <AppleLogo className="w-3.5 h-3.5 text-white shrink-0" />
                  <AndroidLogo className="w-4 h-3 shrink-0" />
                  <span>iOS Safari & Android Chrome</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Home Screen Launcher</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>iPhone (Safari):</strong> Tap <strong>Share Button ⎙</strong> at bottom → tap <strong>"Add to Home Screen"</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Android (Chrome):</strong> Tap <strong>3 Dots ⋮</strong> menu at top right → tap <strong>"Install App"</strong>.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Copy Direct URL Shortcut */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-label">
          <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto">
            <Globe className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-mono text-slate-600 truncate text-[11px]">
              {typeof window !== "undefined" ? window.location.href : "https://thewindowdoctor.vercel.app/admin"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1.5 shrink-0 whitespace-nowrap text-xs transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-emerald-600">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Copy Admin Link</span>
              </>
            )}
          </button>
        </div>

        {/* ======================================================================= */}
        {/* 6. STORE FOOTER ACTIONS                                                */}
        {/* ======================================================================= */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleClose(true)}
            className="text-xs text-slate-400 hover:text-slate-600 font-label underline underline-offset-4 whitespace-nowrap order-2 sm:order-1"
          >
            Don't show again on this PC
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
            <button
              type="button"
              onClick={() => handleClose(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold whitespace-nowrap text-xs font-label transition-colors"
            >
              Remind Me Later
            </button>
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-secondary hover:bg-secondary/90 text-primary font-extrabold py-2 px-5 rounded-xl font-bold shadow-xs whitespace-nowrap text-xs font-label flex items-center gap-1.5 transition-all active:scale-95 border border-secondary/40"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Install App to PC</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
