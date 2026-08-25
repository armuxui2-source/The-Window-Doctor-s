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
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className={cn(
            "w-screen bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 transition-transform duration-300 transform ease-in-out animate-slide-in-right",
            widthClass
          )}
        >
          {/* Header */}
          <div className="px-6 py-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="space-y-0.5">
              <h3 className="font-headline font-extrabold text-base text-primary whitespace-nowrap">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-500 font-label whitespace-nowrap">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0"
              title="Close panel"
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
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
              {footerActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
