"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Cpu, ShieldCheck, AlertTriangle, FileCheck, Layers, ChevronDown, ChevronUp, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";
import { VerificationClaim } from "../types/pipeline";

interface Step {
  step_id: number;
  action: string;
  description: string;
  status: string;
  details?: any;
  timestamp?: string;
}

interface AgentReasoningTraceProps {
  taskType: string;
  modelRouted: string;
  planSteps: Step[];
  verificationStatus: any;
}

export default function AgentReasoningTrace({
  taskType,
  modelRouted,
  planSteps,
  verificationStatus
}: AgentReasoningTraceProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  if (!planSteps || planSteps.length === 0) return null;

  const claims: VerificationClaim[] = verificationStatus?.claims || [];

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Layers className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Agent Execution & Reasoning Timeline (9 Stages)
            </h3>
            <p className="text-xs text-slate-400">Live Step-by-Step Task & Claim Verification Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-amber-950/80 text-amber-300 font-extrabold px-3 py-1 rounded-xl border border-amber-500/30 shadow-sm">
            Task: {taskType.toUpperCase()}
          </span>
          <span className="bg-cyan-950/80 text-cyan-300 font-extrabold px-3 py-1 rounded-xl border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Router: {modelRouted}
          </span>
        </div>
      </div>

      {/* 9-Stage Execution Timeline Grid */}
      <div className="space-y-3">
        {planSteps.map((step) => {
          const isDone = step.status === "completed" || step.status === "verified";
          const isVerified = step.status === "verified";
          const isExpanded = expandedStep === step.step_id;

          return (
            <div
              key={step.step_id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden glass-card ${
                isDone
                  ? "bg-slate-950/90 border-slate-800/80 hover:border-slate-700"
                  : "bg-amber-950/20 border-amber-500/40 glow-amber"
              }`}
            >
              <div
                onClick={() => setExpandedStep(isExpanded ? null : step.step_id)}
                className="p-3.5 flex items-center justify-between gap-3 text-xs cursor-pointer hover:bg-slate-800/30 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-transform duration-200 ${
                    isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-inner glow-emerald" : "bg-slate-800 text-slate-400"
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.step_id}
                  </div>

                  <div>
                    <span className="font-extrabold text-slate-100 mr-2 text-xs md:text-sm">{step.action}</span>
                    <span className="text-slate-400 font-normal text-xs">{step.description}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2.5">
                  {step.timestamp && (
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 hidden sm:flex">
                      <Clock className="w-3 h-3 text-cyan-400" /> {step.timestamp}
                    </span>
                  )}
                  {isVerified ? (
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-500/30 shadow-inner">
                      ✓ VERIFIED
                    </span>
                  ) : isDone ? (
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                      ✓ DONE
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-amber-500/30 animate-pulse">
                      ● IN PROGRESS
                    </span>
                  )}

                  {step.details && (
                    <button className="text-slate-400 hover:text-cyan-300 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Step Detail Drawer */}
              {isExpanded && step.details && (
                <div className="px-4 py-3.5 bg-slate-950/95 border-t border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-[10px] uppercase text-cyan-400 font-extrabold tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Stage Trace & Execution Output:</span>
                  </div>
                  <pre className="whitespace-pre-wrap overflow-x-auto text-[11px] text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                    {JSON.stringify(step.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Claim-Level Verification & Citation Panel */}
      {claims && claims.length > 0 && (
        <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-xs text-slate-100 uppercase tracking-wider">Claim-Level Verification & Citation Audit Matrix</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/90 px-3 py-1 rounded-xl border border-cyan-500/30">
              GATING ACTIVE: {claims.filter(c => c.status === 'verified').length}/{claims.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {claims.map((c, idx) => {
              const isVerified = c.status === "verified";
              const isUnverified = c.status === "unverified";

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                    isVerified
                      ? "bg-emerald-950/30 border-emerald-500/40 glow-emerald"
                      : isUnverified
                      ? "bg-red-950/30 border-red-500/40"
                      : "bg-amber-950/30 border-amber-500/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{c.claim_id}</span>
                      {isVerified ? (
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED ({(c.confidence * 100).toFixed(0)}%)
                        </span>
                      ) : isUnverified ? (
                        <span className="bg-red-500/10 text-red-400 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-red-500/30 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> UNVERIFIED (FLAGGED)
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-amber-500/30 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> PARTIAL
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-slate-100 text-xs leading-snug mb-1.5">{c.claim}</p>
                    <p className="text-[11px] text-slate-300 italic leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 font-sans">
                      "{c.evidence_snippet}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-mono font-semibold truncate flex items-center gap-1" title={c.source_citation}>
                      <ExternalLink className="w-3 h-3 shrink-0" /> {c.source_citation}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Gate: {c.gating_action}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verification Matrix Standard Audit Checks */}
      {verificationStatus && verificationStatus.checks && (
        <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-slate-100">Verification & Compliance Audit Matrix</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
              STATUS: {verificationStatus.status} ({verificationStatus.passed_checks_count}/{verificationStatus.total_checks_count} Passed)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {verificationStatus.checks.map((chk: any, idx: number) => (
              <div key={idx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-200">{chk.name}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">{chk.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
