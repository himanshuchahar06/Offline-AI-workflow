"use client";

import React, { useState } from "react";
import { Send, Sparkles, FileText, Calculator, ShieldAlert, DollarSign, Bot, CheckCircle } from "lucide-react";

interface ChatInterfaceProps {
  onExecutePrompt: (prompt: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ onExecutePrompt, isLoading }: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState("");

  const templates = [
    {
      id: "vessel_corrosion",
      icon: ShieldAlert,
      color: "from-amber-500/20 to-red-500/20 text-amber-400 border-amber-500/30",
      title: "V-101 Pressure Vessel Corrosion Audit",
      desc: "Perform corrosion analysis on V-101 pressure vessel, calculate remaining safe operating life, and generate Word report & Excel calculation sheet.",
      promptText: "Perform corrosion analysis on V-101 pressure vessel, calculate remaining safe operating life, and generate a Word report, Excel calculation sheet, and PowerPoint deck."
    },
    {
      id: "hydrocracker_sop",
      icon: FileText,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      title: "Hydrocracker HCU-II Emergency SOP Check",
      desc: "Audit Hydrocracker Emergency Shutdown SOP, verify temperature limits, and synthesize an executive presentation.",
      promptText: "Audit Hydrocracker HCU-II Emergency Shutdown SOP (SOP-HC-2026-04), verify safe operating limits, and generate executive PPTX presentation deck."
    },
    {
      id: "piping_pressure_drop",
      icon: Calculator,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      title: "10-Inch Diesel Piping Pressure Calculation",
      desc: "Run Darcy-Weisbach friction calculation for 10-inch diesel line and build engineering Excel workbook.",
      promptText: "Calculate Darcy-Weisbach pressure drop for 10-inch diesel line over 320m and generate styled Excel calculation sheet."
    },
    {
      id: "vendor_negotiation",
      icon: DollarSign,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
      title: "Vendor Negotiation & Heat Exchanger Quotes",
      desc: "Synthesize Godrej vs L&T heat exchanger procurement quotes and generate cost savings brief.",
      promptText: "Evaluate Godrej vs L&T heat exchanger quotes against capex budget and synthesize cost impact spreadsheet."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onExecutePrompt(prompt);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-slate-100">Industrial Agent Workspace</h2>
        </div>
        <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          Plan-Act-Observe-Verify Engine Ready
        </div>
      </div>

      {/* Preset Industrial Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
        {templates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <button
              key={tpl.id}
              onClick={() => {
                setPrompt(tpl.promptText);
                onExecutePrompt(tpl.promptText);
              }}
              disabled={isLoading}
              className={`p-3.5 rounded-xl text-left bg-gradient-to-r ${tpl.color} border transition-all duration-200 hover:scale-[1.01] hover:brightness-110 disabled:opacity-50`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tpl.title}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{tpl.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Prompt Form Input */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI about confidential inspection reports, SOPs, engineering calculations, or P&ID drawings..."
          rows={3}
          disabled={isLoading}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-4 pr-32 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
        />

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute right-3 bottom-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Orchestrating Agent...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Execute Task</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
