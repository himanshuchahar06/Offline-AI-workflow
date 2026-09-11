"use client";

import React, { useState } from "react";
import { Send, Sparkles, FileText, Calculator, ShieldAlert, DollarSign, Bot, Cpu, Layers } from "lucide-react";

interface ChatInterfaceProps {
  onExecutePrompt: (prompt: string, selectedModel?: string) => void;
  isLoading: boolean;
}

export default function ChatInterface({ onExecutePrompt, isLoading }: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("Qwen2.5-Coder:7b (Local)");

  const models = [
    { id: "qwen_coder", name: "Qwen2.5-Coder:7b (Local Code & Math)" },
    { id: "mistral_7b", name: "Mistral-7B-Instruct (SOP & Rules)" },
    { id: "llama_vlm", name: "Qwen2.5-VL (Multimodal OCR & Diagrams)" },
    { id: "llama3_8b", name: "Llama-3.2-8B (Financial & Synthesis)" }
  ];

  const templates = [
    {
      id: "vessel_corrosion",
      icon: ShieldAlert,
      color: "from-amber-500/20 to-red-500/20 text-amber-400 border-amber-500/30",
      title: "V-101 Pressure Vessel Corrosion Audit",
      desc: "Analyze V-101 pressure vessel corrosion, calculate remaining safe life, and export Word, Excel, and PowerPoint files.",
      promptText: "Perform corrosion analysis on V-101 pressure vessel, calculate remaining safe operating life, and generate a Word report, Excel calculation sheet, and PowerPoint deck."
    },
    {
      id: "hydrocracker_sop",
      icon: FileText,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
      title: "Hydrocracker HCU-II Emergency SOP Audit",
      desc: "Audit HCU-II emergency shutdown procedure, verify peak temperature limits, and emit executive presentation.",
      promptText: "Audit Hydrocracker HCU-II Emergency Shutdown SOP (SOP-HC-2026-04), verify safe operating limits, and generate executive PPTX presentation deck."
    },
    {
      id: "piping_pressure_drop",
      icon: Calculator,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
      title: "10-Inch Diesel Piping Pressure Calculation",
      desc: "Run Darcy-Weisbach pressure drop calculation for 10-inch diesel line over 320m and build engineering Excel workbook.",
      promptText: "Calculate Darcy-Weisbach pressure drop for 10-inch diesel line over 320m and generate styled Excel calculation sheet."
    },
    {
      id: "vendor_negotiation",
      icon: DollarSign,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
      title: "Vendor Negotiation & Procurement Synthesis",
      desc: "Synthesize Godrej vs L&T heat exchanger procurement quotes and generate cost savings brief.",
      promptText: "Evaluate Godrej vs L&T heat exchanger quotes against capex budget and synthesize cost impact spreadsheet."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onExecutePrompt(prompt, selectedModel);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-cyan-400" />
          <h2 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider">ODIN Agent Execution Panel</h2>
        </div>

        {/* Model Selection Dropdown */}
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isLoading}
            className="bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-semibold px-3 py-1.5 rounded-lg focus:outline-none focus:border-cyan-500"
          >
            {models.map((m) => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
          </select>
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
                onExecutePrompt(tpl.promptText, selectedModel);
              }}
              disabled={isLoading}
              className={`p-3.5 rounded-xl text-left bg-gradient-to-r ${tpl.color} border transition-all duration-200 hover:scale-[1.01] hover:brightness-110 disabled:opacity-50`}
            >
              <div className="flex items-center gap-2 font-bold text-xs mb-1">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tpl.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">{tpl.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Prompt Form Input */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter confidential engineering query or instruction for ODIN AI Agent..."
          rows={3}
          disabled={isLoading}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-4 pr-36 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none font-mono"
        />

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute right-3 bottom-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow-lg shadow-cyan-950/50 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Running ODIN...</span>
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
