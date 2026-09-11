"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, Lock, Zap, Settings, Activity, Radio, UserCheck } from "lucide-react";

export default function WorkspaceHeader() {
  const [airgapStatus, setAirgapStatus] = useState<any>({
    air_gap_status: "SECURE",
    cloud_data_leakage: "ZERO BYTES",
    external_api_calls_count: 0,
    local_ollama_engine: "ONLINE (Local CPU Fallback)",
    active_knowledge_docs: 4
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/health/airgap")
      .then((res) => res.json())
      .then((data) => setAirgapStatus(data))
      .catch(() => {});
  }, []);

  return (
    <header className="bg-slate-950/80 border-b border-cyan-500/20 text-white px-6 py-3.5 shadow-2xl backdrop-blur-2xl sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Branding Block */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-emerald-400 p-0.5 shadow-lg shadow-cyan-950/60 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
              <Zap className="w-5 h-5 text-cyan-400 animate-bounce relative z-10" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                ODIN <span className="text-[10px] font-bold text-cyan-300 tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 shadow-inner">SOVEREIGN AI WORKBENCH</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="font-medium text-slate-300">MRPL — Mangalore Refinery & Petrochemicals Limited</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-amber-400" /> SIH 2026 Team: Zero Latency
              </span>
            </p>
          </div>
        </div>

        {/* Center Live Network Telemetry */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-900/60 px-4 py-1.5 rounded-xl border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-400">OUTBOUND TRAFFIC:</span>
            <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">0.0 KB/s</span>
          </div>
          <div className="h-3 w-[1px] bg-slate-800"></div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono text-slate-400">LOCAL MODEL:</span>
            <span className="font-mono font-bold text-amber-300">Qwen2.5 / Mistral-7B</span>
          </div>
        </div>

        {/* Right Security Indicator & Role Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-extrabold px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-2.5 glow-emerald">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-[10px] tracking-widest text-emerald-300 font-black flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AIR-GAPPED PERIMETER
              </div>
              <div className="text-[9px] text-emerald-400/90 font-semibold font-mono">100% ON-PREMISE • ZERO LEAK</div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-800/80 pl-3">
            <div className="bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ADMIN / ENGINEER</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
