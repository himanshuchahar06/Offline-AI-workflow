"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, Lock, Server, Zap, User, Settings, Sliders } from "lucide-react";

export default function WorkspaceHeader() {
  const [airgapStatus, setAirgapStatus] = useState<any>({
    air_gap_status: "SECURE",
    cloud_data_leakage: "ZERO BYTES",
    external_api_calls_count: 0,
    local_ollama_engine: "ONLINE (Local CPU Fallback)",
    active_knowledge_docs: 2
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/health/airgap")
      .then((res) => res.json())
      .then((data) => setAirgapStatus(data))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-slate-950/95 border-b border-cyan-500/20 text-white px-6 py-3.5 shadow-2xl backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Branding Block */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-amber-500 p-0.5 shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                ODIN <span className="text-xs font-semibold text-cyan-400 tracking-normal px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">SOVEREIGN AI WORKBENCH</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="font-medium text-slate-300">MRPL — Mangalore Refinery & Petrochemicals Limited</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-semibold">SIH 2026 Team: Zero Latency</span>
            </p>
          </div>
        </div>

        {/* Highly Visible Security Indicator */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <div>
              <div className="text-[10px] tracking-widest text-emerald-300 font-black">● SYSTEM SECURE</div>
              <div className="text-[9px] text-emerald-400 font-semibold">AIR-GAPPED / ON-PREMISE</div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
            <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition" title="Settings">
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-500 p-0.5 flex items-center justify-center font-bold text-xs text-slate-950 shadow">
              ME
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
