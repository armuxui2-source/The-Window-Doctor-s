"use client";

import React, { useState } from "react";
import { Search, MapPin, CheckCircle, AlertCircle, Clock, ShieldCheck } from "lucide-react";
import { MOCK_POSTCODES, MOCK_SERVICE_AREAS } from "@/lib/supabase/mock-data";
import { cn } from "@/lib/utils";

export default function PostcodeChecker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedItem, setMatchedItem] = useState<{
    prefix: string;
    region: string;
    town: string;
    responseTime: number;
  } | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const query = searchTerm.trim().toUpperCase();
    const prefix = query.split(" ")[0];

    const foundPc = MOCK_POSTCODES.find(
      (p) => p.postcode_prefix === prefix || prefix.startsWith(p.postcode_prefix) || p.region_name.toUpperCase().includes(query)
    );

    if (foundPc) {
      const area = MOCK_SERVICE_AREAS.find((a) => a.id === foundPc.area_id) || MOCK_SERVICE_AREAS[0];
      setMatchedItem({
        prefix: foundPc.postcode_prefix,
        region: foundPc.region_name,
        town: area.town_name,
        responseTime: area.response_time_hours,
      });
    } else {
      setMatchedItem(null);
    }
    setSearched(true);
  };

  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 sm:p-8 border border-outline-variant shadow-card space-y-6">
      <div className="space-y-2">
        <span className="text-xs font-bold text-secondary uppercase tracking-wider font-label">
          Instant Postcode Coverage Tool
        </span>
        <h3 className="font-headline font-bold text-xl text-primary">Check Your Area in Oxfordshire & Beyond</h3>
        <p className="font-body text-xs text-on-surface-variant">
          Enter your postcode (e.g. OX26, OX1, OX15, NN13) to check survey availability and response times.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearched(false);
            }}
            placeholder="e.g. OX26 6HT, Bicester, Oxford..."
            className="w-full px-4 py-3 pl-10 rounded-md bg-surface-container-lowest border border-outline-variant text-primary text-sm focus:outline-none focus:border-primary uppercase font-mono placeholder:normal-case placeholder:font-body placeholder:text-on-surface-variant/50"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-on-surface-variant" />
        </div>
        <button
          type="submit"
          className="btn-cta text-sm py-3 px-6 rounded-md"
        >
          Check Area
        </button>
      </form>

      {/* Result HUD */}
      {searched && (
        <div className="animate-fade-in">
          {matchedItem ? (
            <div className="p-4.5 rounded-md bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Coverage Confirmed — {matchedItem.town}</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-body">
                <strong>{matchedItem.prefix}:</strong> {matchedItem.region}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>Response: ~{matchedItem.responseTime} hours</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free On-Site Survey</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4.5 rounded-md bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                <span>Extended Area Inquiry</span>
              </div>
              <p className="text-xs text-amber-900 font-body">
                This postcode is outside our core daily zone, but we regularly take on bespoke installations throughout surrounding counties. Please call us on <strong className="text-primary">01869 572206</strong> for availability.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

