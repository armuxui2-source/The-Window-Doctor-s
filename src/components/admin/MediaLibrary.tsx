"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { 
  ImageIcon, 
  Upload, 
  Copy, 
  Check, 
  Trash2, 
  Search, 
  Plus, 
  Eye, 
  X,
  FileImage,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category: "hero" | "services" | "projects" | "reviews" | "icons" | "branding";
  size: string;
  dimensions: string;
  uploaded_at: string;
}

export const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: "med-1",
    title: "Misted Double Glazing Condensation Diagnosis",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4PgLGqLJswj_yOE9Fp-h7Bh-0gB3SEGKW6wM__fhYsI1vcAZwqvKhgzpVL7CPX7XDHfvLEFLucGEy4uNrBRgE-6Ygcy_HksxKYiVtZxOFrjkRG5UiALFDyTnqEFSdiMMHVQtQIoDIgwDQLyuJAjYBogUwBNPAh0jSMBy_zkHmL9gRXfOW6qtVeyd7XAcVNUXYynC-N2W5g5e1oWBK8e7f5qY9lqco1Xmr5MekrfBHfzcqTU0EIh2I",
    category: "services",
    size: "245 KB",
    dimensions: "1920 x 1080",
    uploaded_at: "2024-08-01"
  },
  {
    id: "med-2",
    title: "A++ Modern Energy Casement Windows",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Fjn6wLLJZk7YeTa18NvqtxVCAuCLsPnhE3EOon6a9RSl8DqWeJ6DGpPN3B6yXvnBbK_8OP57skrmnRE00KFwtYNY4-Po01ZpW2IZL8dhW-KTZEIwNqYHLH2ZMj0dT9_rIRZNzmVr41RmOTyB57SKAxZYM20vaj7zwWoJac6g65mlm_vIk0VGIAHhRm2i2Cl3os08pjvua_ekNlYnUBydzWripfsDHkuMnFFqvYRAnr3YkGB7oUYnD2ugQDdU-jkp1w",
    category: "hero",
    size: "312 KB",
    dimensions: "1920 x 1080",
    uploaded_at: "2024-08-05"
  },
  {
    id: "med-3",
    title: "Anthracite Grey Aluminium Bi-Fold & 48mm Solid Composite Door",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijkuiNQPNPRi1odFsC7paCR0AXJXuNyP_Cb-JqkwnbIBuxNVG_Mr4zRuk1fFgPRzkjXxUQDu1iwIRZwDTi_kG3eU_TAx1phbyAir4OMCgkYVrb2Ra6IqO5hZ4FWoxvajQ6TOXNO4G06w-YMm3WsfPJLn7rQcPSbwLR58mHGQMfgkDOb03V4gE6s7NnXR-Rvv2O19FLhqGQ2VYKhJiLmetWImwmvPyDc9o1FRF1oczJR0EkIlBkf",
    category: "hero",
    size: "288 KB",
    dimensions: "1920 x 1080",
    uploaded_at: "2024-08-10"
  },
  {
    id: "med-4",
    title: "Warm Roof Conservatory Conversion with Velux Rooflights",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdSS54BVNywAzc2drXm8lpbf3ejgZnJuorHF2zutpWgeU-WjL7BoblsJC6BrHP_MMpZyVJS8sYowpwc6vB88RJKY07OaIowHYaXRt3taDsUTBEGvNMkBh-p5iTaNGdytFUq_xQw_gC0RFrA12lNjifzHp_lniKbIf5FPS6gho2pTO30rM6Yqu69LfqFcyk1HMUNFQfPFZA3x5Lfz-cRe6t5qzqt9FayyTAV5sqGd1CDNkei9d8AfNq",
    category: "hero",
    size: "340 KB",
    dimensions: "1920 x 1080",
    uploaded_at: "2024-08-15"
  },
  {
    id: "med-5",
    title: "Cotswold Heritage Flush Sash Window in Chartwell Green",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3nTjMHpiFV7TqcvPvoGTt2_5II9pDRwW1UgRrY9F8gUs-fFY1rMQnpm6X5FLzoqVDbbSb5JhIR-l_Sskm4f-gPpuWcbAq7YVeEFLcOZJw6B1bnSjEz2qrm6c5lqS0Ww0vhNADnSlNIPpfBCRUYq7zWFKLo3Ftx1g2xKV_ZgFBrmXzNO-odjHv9IsihMCXUd9mrvxcYTcIqpJnRGRY5hzzIbgIXViaD8Pkdd-XmSeQqUWdSnksT12K",
    category: "hero",
    size: "295 KB",
    dimensions: "1920 x 1080",
    uploaded_at: "2024-08-20"
  }
];

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  isModal?: boolean;
}

export default function MediaLibrary({ onSelectImage }: MediaLibraryProps) {
  const [assets, setAssets] = useState<MediaAsset[]>(DEFAULT_MEDIA_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<MediaAsset | null>(null);
  const [newUrlInput, setNewUrlInput] = useState("");
  const [newTitleInput, setNewTitleInput] = useState("");
  const [newCatInput, setNewCatInput] = useState<MediaAsset["category"]>("services");
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setToast({ message: "Image URL copied to clipboard!", type: "success" });
    setTimeout(() => {
      setCopiedId(null);
      setToast(null);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        const newAsset: MediaAsset = {
          id: `med-${Date.now()}`,
          title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
          url: result,
          category: newCatInput,
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: "Local High-Res File",
          uploaded_at: new Date().toISOString().split("T")[0]
        };
        setAssets([newAsset, ...assets]);
        setToast({ message: `Successfully uploaded "${file.name}" from your computer!`, type: "success" });
        setTimeout(() => setToast(null), 4000);
        setShowAddForm(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlInput.trim() || !newTitleInput.trim()) return;
    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      title: newTitleInput.trim(),
      url: newUrlInput.trim(),
      category: newCatInput,
      size: "Cloud WebP",
      dimensions: "1920 x 1080",
      uploaded_at: new Date().toISOString().split("T")[0]
    };
    setAssets([newAsset, ...assets]);
    setNewUrlInput("");
    setNewTitleInput("");
    setShowAddForm(false);
    setToast({ message: "Image asset added to media library!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm("Remove this image from media library?")) {
      setAssets(assets.filter((a) => a.id !== id));
      setToast({ message: "Image removed from media library.", type: "info" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {/* Toast Alert */}
      {toast && (
        <div className="p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-label flex items-center justify-between shadow-2xs animate-fade-in">
          <div className="flex items-center gap-2 font-bold whitespace-nowrap">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toast.message}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-700 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Controls Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-headline font-extrabold text-lg text-primary flex items-center gap-2 whitespace-nowrap">
              <ImageIcon className="w-5 h-5 text-secondary shrink-0" />
              <span>Media Library & Production Image Manager</span>
            </h2>
            <p className="text-xs text-slate-500 font-label">
              Upload from computer or register cloud URLs for banners, services, and case studies.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-secondary text-primary hover:bg-secondary/90 font-bold text-xs shadow-sm transition-all font-label whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5 shrink-0" />
              <span>Upload from PC</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-primary text-secondary-container hover:bg-primary/90 font-bold text-xs shadow-sm transition-all font-label whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span>{showAddForm ? "Close Form" : "Add Image URL"}</span>
            </button>
          </div>
        </div>

        {/* Add New Image Form Panel */}
        {showAddForm && (
          <form onSubmit={handleAddAsset} className="p-5 rounded-md bg-slate-50 border border-slate-200 space-y-4 animate-fade-in">
            <h3 className="font-headline font-bold text-xs uppercase tracking-wider text-primary whitespace-nowrap">
              Register New Image Asset
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 font-label whitespace-nowrap">Image Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Anthracite Bi-Fold Doors"
                  value={newTitleInput}
                  onChange={(e) => setNewTitleInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-secondary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 font-label whitespace-nowrap">Category</label>
                <select
                  value={newCatInput}
                  onChange={(e) => setNewCatInput(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-secondary"
                >
                  <option value="hero">Hero Slider Banners</option>
                  <option value="services">Services & Pricing</option>
                  <option value="projects">Case Studies & Projects</option>
                  <option value="reviews">Customer Reviews</option>
                  <option value="branding">Branding & Badges</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1 font-label whitespace-nowrap">Image Direct URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newUrlInput}
                  onChange={(e) => setNewUrlInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-secondary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-md border border-slate-200 text-slate-600 text-xs font-bold font-label hover:bg-slate-100 whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-primary text-secondary-container font-bold text-xs font-label shadow-sm hover:bg-primary/90 whitespace-nowrap"
              >
                Save Image Asset
              </button>
            </div>
          </form>
        )}

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 font-label">
            {[
              { id: "all", label: "All Media" },
              { id: "hero", label: "Hero Banners" },
              { id: "services", label: "Services" },
              { id: "projects", label: "Case Studies" },
              { id: "reviews", label: "Reviews" },
              { id: "branding", label: "Branding" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap shrink-0",
                  selectedCategory === tab.id
                    ? "bg-primary text-secondary-container shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-md border border-slate-200 text-xs bg-white focus:outline-hidden focus:border-secondary font-label"
            />
          </div>
        </div>
      </div>

      {/* Grid of Media Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredAssets.map((asset) => {
          const isCopied = copiedId === asset.id;
          return (
            <div
              key={asset.id}
              className="bg-white rounded-md border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between group hover:border-secondary/50 transition-all"
            >
              {/* Thumbnail Container */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={asset.url}
                  alt={asset.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold font-mono uppercase whitespace-nowrap">
                  {asset.category}
                </div>

                {/* Quick Actions Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {onSelectImage ? (
                    <button
                      onClick={() => onSelectImage(asset.url)}
                      className="px-3 py-1.5 rounded-md bg-secondary text-primary font-bold text-xs shadow-md hover:scale-105 transition-transform font-label whitespace-nowrap"
                    >
                      Use This Image
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setPreviewAsset(asset)}
                        className="p-2 rounded-md bg-white/90 text-primary hover:bg-white shadow-md transition-all shrink-0"
                        title="Preview Large"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopyUrl(asset.id, asset.url)}
                        className="p-2 rounded-md bg-white/90 text-primary hover:bg-white shadow-md transition-all shrink-0"
                        title="Copy Image URL"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Card Meta Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-headline font-bold text-xs text-primary line-clamp-1" title={asset.title}>
                    {asset.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-label mt-1 whitespace-nowrap">
                    <span>{asset.dimensions}</span>
                    <span>{asset.size}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyUrl(asset.id, asset.url)}
                    className="text-[11px] font-bold text-secondary hover:text-primary flex items-center gap-1 font-label whitespace-nowrap"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="text-emerald-700 whitespace-nowrap">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 shrink-0" />
                        <span className="whitespace-nowrap">Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="text-slate-400 hover:text-red-600 p-1 transition-colors shrink-0"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Image Preview */}
      {previewAsset && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewAsset(null)}
        >
          <div
            className="bg-white rounded-md overflow-hidden max-w-3xl w-full shadow-2xl space-y-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-headline font-bold text-sm text-primary whitespace-nowrap">{previewAsset.title}</h3>
              <button onClick={() => setPreviewAsset(null)} className="text-slate-400 hover:text-slate-700 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-96 w-full rounded-md overflow-hidden bg-slate-100">
              <Image src={previewAsset.url} alt={previewAsset.title} fill className="object-contain" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-label font-mono break-all">{previewAsset.url}</span>
              <button
                onClick={() => handleCopyUrl(previewAsset.id, previewAsset.url)}
                className="px-4 py-2 rounded-md bg-primary text-secondary-container font-bold text-xs font-label shadow-sm flex items-center gap-1.5 shrink-0 ml-4 whitespace-nowrap"
              >
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
