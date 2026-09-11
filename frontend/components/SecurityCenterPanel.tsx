"use client";

import React from "react";
import { ShieldCheck, Server, Lock, Database, ArrowRight, ShieldAlert, WifiOff, Cpu } from "lucide-react";

export default function SecurityCenterPanel() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">
              Sovereign Air-Gap Security Center
            </h3>
            <p className="text-xs text-slate-400">Real-Time Data Boundary & Privacy Enforcement Telemetry</p>
          </div>
        </div>

        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          ● SYSTEM SECURE — AIR-GAPPED
        </span>
      </div>

      {/* Prominent 0 Bytes Leakage Display */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-xl border border-emerald-500/30 mb-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            EXTERNAL CLOUD DATA TRANSMISSION
          </div>
          <div className="text-3xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mt-0.5">
            0 BYTES
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs w-full md:w-auto">
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Data Location</div>
            <div className="font-bold text-slate-200">On-Premise</div>
          </div>
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Internet Access</div>
            <div className="font-bold text-emerald-400 flex items-center gap-1">
              <WifiOff className="w-3 h-3" /> Disabled
            </div>
          </div>
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Model Execution</div>
            <div className="font-bold text-amber-300">Local Hardware</div>
          </div>
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Storage Network</div>
            <div className="font-bold text-cyan-300">Private Net</div>
          </div>
        </div>
      </div>

      {/* Animated Network Architecture Flow */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Isolated Architecture Topology</span>
          <span className="text-[10px] text-emerald-400 font-mono">No Cloud Connection</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Node 1 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
            <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">USER</div>
              <div className="text-[10px] text-slate-500">Refinery Workstation</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden md:block" />

          {/* Node 2 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-cyan-500/30 shrink-0">
            <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">AI WORKBENCH</div>
              <div className="text-[10px] text-slate-500">ODIN Engine</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 hidden md:block" />

          {/* Node 3 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-purple-500/30 shrink-0">
            <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">LOCAL AGENTS</div>
              <div className="text-[10px] text-slate-500">Plan-Act-Verify</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden md:block" />

          {/* Node 4 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-emerald-500/30 shrink-0">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">PRIVATE KNOWLEDGE</div>
              <div className="text-[10px] text-slate-500">Local Vector Store</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
