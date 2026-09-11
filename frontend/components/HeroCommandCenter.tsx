"use client";

import React, { useState } from "react";
import { Search, Sparkles, ShieldCheck, Zap, ArrowRight, Terminal, Command, Compass } from "lucide-react";

interface HeroCommandCenterProps {
  onExecutePrompt: (prompt: string) => void;
  isLoading: boolean;
}

export default function HeroCommandCenter({ onExecutePrompt, isLoading }: HeroCommandCenterProps) {
  const [query, setQuery] = useState("");

  const suggestions = [
    { label: "Analyze inspection report", text: "Perform corrosion analysis on V-101 pressure vessel, calculate remaining safe operating life, and generate Word report, Excel calculation sheet, and PowerPoint presentation deck." },
    { label: "Find abnormal readings", text: "Search local inspection records for abnormal equipment thickness readings, high corrosion rates, and flag critical assets." },
    { label: "Audit Emergency SOP", text: "Audit Hydrocracker HCU-II Emergency Shutdown SOP (SOP-HC-2026-04), verify safe operating limits, and generate executive presentation deck." },
    { label: "Compare inspection history", text: "Compare V-101 2021 historical inspection record against 2026 UTM audit log and summarize wall thickness loss." },
    { label: "Explain P&ID drawing", text: "Explain P&ID drawing V-101, extract line numbers, design pressure limits, and instrumentation tags." },
    { label: "Evaluate procurement quotes", text: "Evaluate Godrej vs L&T heat exchanger procurement quotes against capex budget and synthesize cost impact spreadsheet." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onExecutePrompt(query);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden glass-panel">
      {/* Ambient Moving Light Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="animate-scanline pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Status Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 bg-cyan-950/70 px-3.5 py-1.5 rounded-full border border-cyan-500/30 shadow-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="tracking-wide">SOVEREIGN AI COMMAND CENTER</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="tracking-wide">100% AIR-GAPPED • ZERO LEAKAGE AUDITED</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Confidential Agentic AI Workbench</span>
            <span className="text-xs font-mono font-bold bg-slate-800/80 text-cyan-300 border border-slate-700/80 px-2.5 py-1 rounded-md">
              v2.5 ON-PREMISE
            </span>
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed font-sans">
            Ask complex engineering questions, audit confidential refinery SOPs, calculate corrosion rates, and generate verified Office deliverables instantly inside your secure perimeter.
          </p>
        </div>

        {/* AI Command / Search Bar */}
        <form onSubmit={handleSubmit} className="relative max-w-4xl">
          <div className="relative flex items-center group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
            <Terminal className="w-5 h-5 text-cyan-400 absolute left-4.5 pointer-events-none z-10" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter instruction or select prompt (e.g., Analyze V-101 inspection report, calculate corrosion rate)..."
              disabled={isLoading}
              className="w-full bg-slate-950/90 border border-slate-700/90 rounded-2xl py-4.5 pl-12 pr-40 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 shadow-2xl font-mono relative z-10"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2.5 z-20 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Execute Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Suggestions Chips */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recommended Refinery Workflows:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.text);
                  onExecutePrompt(item.text);
                }}
                disabled={isLoading}
                className="bg-slate-900/90 hover:bg-cyan-950/80 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs px-3.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 cursor-pointer hover:shadow-lg hover:shadow-cyan-950/40 transform hover:-translate-y-0.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
