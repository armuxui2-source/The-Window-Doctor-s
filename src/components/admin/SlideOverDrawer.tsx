"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideOverDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  widthClass?: string;
}

export default function SlideOverDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footerActions,
  widthClass = "max-w-xl"
}: SlideOverDrawerProps) {
  // Prevent body scroll and handle ESC key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div 
          className={cn(
            "w-screen bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200/80 transition-transform duration-300 transform ease-in-out animate-slide-in-right",
            widthClass
          )}
        >
          {/* Header */}
          <div className="px-6 py-5 bg-slate-50/90 border-b border-slate-200/80 flex items-center justify-between shrink-0">
            <div className="space-y-1 min-w-0 pr-4">
              <h3 id="drawer-title" className="font-headline font-extrabold text-base sm:text-lg text-primary truncate">
                {title}
              </h3>
              {subtitle && (
                <p id="drawer-subtitle" className="text-xs text-slate-500 font-label line-clamp-1">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-secondary/40"
              title="Close panel (Esc)"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            {children}
          </div>

          {/* Sticky Action Footer */}
          {footerActions && (
            <div className="px-6 py-4 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-end gap-3 shrink-0">
              {footerActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
