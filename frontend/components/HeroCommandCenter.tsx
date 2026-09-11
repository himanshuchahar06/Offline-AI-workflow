"use client";

import React, { useState } from "react";
import { Search, Sparkles, ShieldCheck, Zap, Bot, ArrowRight, FileCheck, FileCode, Calculator } from "lucide-react";

interface HeroCommandCenterProps {
  onExecutePrompt: (prompt: string) => void;
  isLoading: boolean;
}

export default function HeroCommandCenter({ onExecutePrompt, isLoading }: HeroCommandCenterProps) {
  const [query, setQuery] = useState("");

  const suggestions = [
    { label: "Analyze this inspection report", text: "Perform corrosion analysis on V-101 pressure vessel, calculate remaining safe operating life, and generate Word report, Excel calculation sheet, and PowerPoint presentation deck." },
    { label: "Find abnormal equipment readings", text: "Search local inspection records for abnormal equipment thickness readings, high corrosion rates, and flag critical assets." },
    { label: "Summarize this SOP", text: "Audit Hydrocracker HCU-II Emergency Shutdown SOP (SOP-HC-2026-04), verify safe operating limits, and generate executive presentation deck." },
    { label: "Compare two engineering documents", text: "Compare V-101 2021 historical inspection record against 2026 UTM audit log and summarize wall thickness loss." },
    { label: "Explain this P&ID", text: "Explain P&ID drawing V-101, extract line numbers, design pressure limits, and instrumentation tags." },
    { label: "Search vendor negotiations", text: "Evaluate Godrej vs L&T heat exchanger procurement quotes against capex budget and synthesize cost impact spreadsheet." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onExecutePrompt(query);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Top Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3.5 py-1 rounded-full border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SOVEREIGN ENTERPRISE COMMAND CENTER</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>AIR-GAPPED • ZERO DATA LEAKAGE</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            Your Confidential AI Workbench
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Powerful AI assistance for sensitive industrial knowledge — without sending your data outside the organization.
          </p>
        </div>

        {/* AI Command / Search Bar */}
        <form onSubmit={handleSubmit} className="relative max-w-4xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your organization's knowledge (e.g. Analyze inspection report, verify SOP)..."
              disabled={isLoading}
              className="w-full bg-slate-950 border border-slate-700/90 rounded-xl py-4 pl-12 pr-36 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-2xl font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Run Query</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Suggestions Chips */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Suggested Command Prompts:
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
                className="bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>💡 {item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
