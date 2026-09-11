"use client";

import React from "react";
import { ShieldCheck, Server, Database, ArrowRight, ShieldAlert, WifiOff, Cpu, Lock, Radio } from "lucide-react";

export default function SecurityCenterPanel() {
  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel">
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Sovereign Air-Gap Security Center
            </h3>
            <p className="text-xs text-slate-400">Real-Time Data Boundary & Privacy Enforcement Telemetry</p>
          </div>
        </div>

        <span className="bg-emerald-500/10 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-2 glow-emerald">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>SYSTEM SECURE — 100% AIR-GAPPED</span>
        </span>
      </div>

      {/* Prominent 0 Bytes Leakage Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 mb-5 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-inner relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <WifiOff className="w-7 h-7 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span>EXTERNAL CLOUD DATA TRANSMISSION</span>
              <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">AUDITED</span>
            </div>
            <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent mt-0.5 font-mono">
              0 BYTES LEAKED
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs w-full lg:w-auto">
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 glass-card">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Data Location</div>
            <div className="font-bold text-slate-100 text-xs mt-0.5">On-Premise</div>
          </div>
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 glass-card">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Cloud APIs</div>
            <div className="font-bold text-emerald-400 text-xs mt-0.5 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Disabled
            </div>
          </div>
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 glass-card">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Model Engine</div>
            <div className="font-bold text-amber-300 text-xs mt-0.5">Local Hardware</div>
          </div>
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 glass-card">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Audit Ledger</div>
            <div className="font-bold text-cyan-300 text-xs mt-0.5">SHA-256 Chain</div>
          </div>
        </div>
      </div>

      {/* Animated Network Architecture Flow */}
      <div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Isolated Enterprise Architecture Topology</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/20">
            PERIMETER SECURE
          </span>
        </div>

        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Node 1 */}
          <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-slate-800/90 shrink-0 w-full md:w-auto">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">REFINERY USER</div>
              <div className="text-[10px] text-slate-500">Secure Workstation</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 hidden md:block animate-pulse" />

          {/* Node 2 */}
          <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-cyan-500/40 shrink-0 w-full md:w-auto glow-cyan">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">SOVEREIGN WORKBENCH</div>
              <div className="text-[10px] text-cyan-400 font-mono">ODIN Engine</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 hidden md:block animate-pulse" />

          {/* Node 3 */}
          <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-purple-500/40 shrink-0 w-full md:w-auto">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">LOCAL AGENTS</div>
              <div className="text-[10px] text-slate-500">Plan-Act-Verify</div>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 hidden md:block animate-pulse" />

          {/* Node 4 */}
          <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-2.5 rounded-xl border border-emerald-500/40 shrink-0 w-full md:w-auto glow-emerald">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-200">PRIVATE VECTOR RAG</div>
              <div className="text-[10px] text-emerald-400 font-mono">On-Prem Memory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
