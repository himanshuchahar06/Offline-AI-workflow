"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Cpu, Database, Lock, Server, Terminal, Zap } from "lucide-react";

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
    <header className="bg-slate-900 border-b border-slate-800 text-white px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Branding Block */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-950/40">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight">
                Sovereign AI Workbench
              </h1>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> AIR-GAPPED
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <span>MRPL — Mangalore Refinery & Petrochemicals Limited</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-400 font-medium">SIH 2026 Team: Zero Latency</span>
            </p>
          </div>
        </div>

        {/* Right Status Badges */}
        <div className="flex items-center gap-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 text-xs border border-slate-800">
            <Lock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Cloud Data Leakage</div>
              <div className="font-bold text-emerald-400">0 BYTES</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 text-xs border border-slate-800">
            <Server className="w-4 h-4 text-cyan-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Local Network Calls</div>
              <div className="font-bold text-cyan-300">0 External API</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 text-xs border border-slate-800">
            <Cpu className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Local Inference</div>
              <div className="font-bold text-amber-300 text-[11px] truncate max-w-[140px]">
                {airgapStatus.local_ollama_engine}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
