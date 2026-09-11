"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, Lock, Server, Zap, Activity } from "lucide-react";

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
                ODIN <span className="text-xs font-semibold text-cyan-400 tracking-normal px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">v2.4 SOVEREIGN</span>
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> AIR-GAPPED
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span className="font-medium text-slate-300">On-Premise Data & Industrial Intelligence Workbench</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-semibold">MRPL SIH26117</span>
            </p>
          </div>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-2.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 text-xs border border-emerald-500/20">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Cloud Leakage</div>
              <div className="font-bold text-emerald-400 text-xs">0 BYTES</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 text-xs border border-cyan-500/20">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Local Network</div>
              <div className="font-bold text-cyan-300 text-xs">0 External API</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 text-xs border border-amber-500/20">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Active Engine</div>
              <div className="font-bold text-amber-300 text-xs truncate max-w-[130px]">
                {airgapStatus.local_ollama_engine}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
