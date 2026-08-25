"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Check, Laptop, Smartphone } from "lucide-react";

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
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed PWA)
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
      setInstalledSuccess(true);
      setDeferredPrompt(null);
      setTimeout(() => {
        setIsOpen(false);
      }, 1800);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    if (forceOpen) {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [forceOpen]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setInstalledSuccess(true);
        setTimeout(() => setIsOpen(false), 1500);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback message for browsers without beforeinstallprompt trigger
      alert("To install, click the Install / Add to Home Screen button in your browser address bar.");
    }
  };

  const handleClose = (neverShowAgain = false) => {
    if (neverShowAgain) {
      localStorage.setItem("twd_admin_install_dismissed", "true");
    }
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen || isInstalled) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in font-body">
      <div className="bg-white rounded-md max-w-sm w-full p-6 sm:p-7 shadow-2xl border border-slate-200/90 text-center relative overflow-hidden space-y-5 animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-4 right-4 p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimal App Icon */}
        <div className="flex justify-center pt-2">
          <div className="relative w-20 h-20 rounded-md overflow-hidden border-2 border-slate-100 shadow-md bg-white p-1.5 flex items-center justify-center">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="The Window Doctor App Icon"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Minimal Title & Description */}
        <div className="space-y-1.5">
          <h3 className="font-headline font-bold text-lg text-slate-900">
            Install App
          </h3>
          <p className="text-xs text-slate-500 font-label leading-relaxed max-w-[280px] mx-auto">
            Install The Window Doctor Admin Suite on your device for quick access and full-screen workspace.
          </p>
        </div>

        {/* Device Badges */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-label">
          <span className="flex items-center gap-1">
            <Laptop className="w-3.5 h-3.5 text-slate-500" />
            <span>Windows & Mac</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Smartphone className="w-3.5 h-3.5 text-slate-500" />
            <span>iOS & Android</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1 font-label">
          {installedSuccess ? (
            <div className="w-full py-2.5 px-4 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Installed Successfully!</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Install App</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleClose(true)}
            className="w-full py-1.5 text-slate-400 hover:text-slate-600 text-[11px] font-medium transition-colors"
          >
            Not now
          </button>
        </div>

      </div>
    </div>
  );
}
