"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Link2,
  Laptop,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  helpText?: string;
  placeholder?: string;
  onBrowseMedia?: () => void;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  aspectRatio = "16/9",
  helpText = "Upload high-resolution JPG, PNG, or WebP (Max 10MB)",
  placeholder = "https://...",
  onBrowseMedia
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState<"upload" | "url">("upload");
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WebP, SVG)");
      return;
    }

    setIsProcessing(true);
    const sizeStr = formatFileSize(file.size);
    setFileDetails({ name: file.name, size: sizeStr });

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      alert("Failed to read image file from your PC.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    setFileDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "auto": "min-h-[180px]"
  }[aspectRatio];

  return (
    <div className="space-y-2 font-label text-xs">
      {/* Field Label Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <label className="font-bold text-slate-700 whitespace-nowrap flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-1 self-start sm:self-auto">
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center">
            <button
              type="button"
              onClick={() => setActiveMode("upload")}
              className={cn(
                "px-2.5 py-1 rounded-md font-bold transition-all text-[11px] flex items-center gap-1 whitespace-nowrap",
                activeMode === "upload"
                  ? "bg-white text-primary shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Laptop className="w-3 h-3 shrink-0" />
              <span>Upload from PC</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode("url")}
              className={cn(
                "px-2.5 py-1 rounded-md font-bold transition-all text-[11px] flex items-center gap-1 whitespace-nowrap",
                activeMode === "url"
                  ? "bg-white text-primary shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <Link2 className="w-3 h-3 shrink-0" />
              <span>Web URL</span>
            </button>
          </div>

          {onBrowseMedia && (
            <button
              type="button"
              onClick={onBrowseMedia}
              className="text-[11px] text-secondary font-bold hover:underline px-1 flex items-center gap-0.5 whitespace-nowrap"
            >
              <span>Library</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* PREVIEW CONTAINER OR UPLOAD DROPZONE */}
      {value ? (
        <div className="space-y-2">
          <div className={cn(
            "relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group shadow-sm",
            aspectClass
          )}>
            <Image
              src={value}
              alt="Uploaded Preview"
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Top Details Badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-bold font-mono flex items-center gap-1.5 border border-white/10 whitespace-nowrap">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{fileDetails?.name || "Image Active"}</span>
                {fileDetails?.size && <span className="text-slate-300">({fileDetails.size})</span>}
              </span>
            </div>

            {/* Hover Action Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 shadow-md flex items-center gap-1.5 text-xs whitespace-nowrap transition-transform active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Replace from PC</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-md flex items-center gap-1.5 text-xs whitespace-nowrap transition-transform active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5 shrink-0" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-label">
            <span className="truncate">{value.startsWith("data:") ? "Local Base64 Data Stored" : value}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-600 font-bold hover:underline shrink-0 whitespace-nowrap"
            >
              Clear Image
            </button>
          </div>
        </div>
      ) : activeMode === "upload" ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2 flex flex-col items-center justify-center",
            isDragging
              ? "border-secondary bg-secondary/10 shadow-inner"
              : "border-slate-300 bg-slate-50/70 hover:bg-white hover:border-secondary hover:shadow-xs"
          )}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-secondary border border-amber-200 flex items-center justify-center shadow-xs">
            {isProcessing ? (
              <RefreshCw className="w-6 h-6 animate-spin text-secondary" />
            ) : (
              <UploadCloud className="w-6 h-6" />
            )}
          </div>
          <div className="space-y-0.5">
            <p className="font-bold text-primary text-xs whitespace-nowrap">
              {isProcessing ? "Processing File..." : "Click to Browse or Drag & Drop Image Here"}
            </p>
            <p className="text-[11px] text-slate-500">{helpText}</p>
          </div>
          <button
            type="button"
            className="mt-1 px-4 py-1.5 rounded-xl bg-primary text-secondary-container text-[11px] font-bold shadow-xs whitespace-nowrap hover:bg-primary/90 transition-colors"
          >
            Select File from PC
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-secondary focus:outline-none font-mono text-[11px]"
          />
          <p className="text-[11px] text-slate-500">{helpText}</p>
        </div>
      )}
    </div>
  );
}
