"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Cpu, ShieldCheck, AlertTriangle, FileCheck, Layers, ChevronDown, ChevronUp, ExternalLink, ShieldAlert } from "lucide-react";
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">
              Agent Execution & Reasoning Timeline (9 Stages)
            </h3>
            <p className="text-xs text-slate-400">Live Step-by-Step Task & Claim Verification Pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-amber-500/10 text-amber-300 font-bold px-2.5 py-1 rounded-md border border-amber-500/20">
            Task: {taskType.toUpperCase()}
          </span>
          <span className="bg-cyan-500/10 text-cyan-300 font-bold px-2.5 py-1 rounded-md border border-cyan-500/20 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Router: {modelRouted}
          </span>
        </div>
      </div>

      {/* 9-Stage Execution Timeline Grid */}
      <div className="space-y-2.5">
        {planSteps.map((step) => {
          const isDone = step.status === "completed" || step.status === "verified";
          const isVerified = step.status === "verified";
          const isExpanded = expandedStep === step.step_id;

          return (
            <div
              key={step.step_id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isDone
                  ? "bg-slate-950/80 border-slate-800"
                  : "bg-amber-950/10 border-amber-500/30 animate-pulse"
              }`}
            >
              <div
                onClick={() => setExpandedStep(isExpanded ? null : step.step_id)}
                className="p-3 flex items-center justify-between gap-3 text-xs cursor-pointer hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.step_id}
                  </div>

                  <div>
                    <span className="font-bold text-slate-200 mr-2">{step.action}</span>
                    <span className="text-slate-400 font-normal">{step.description}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {step.timestamp && (
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {step.timestamp}
                    </span>
                  )}
                  {isVerified ? (
                    <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ VERIFIED
                    </span>
                  ) : isDone ? (
                    <span className="bg-slate-800 text-slate-300 text-[9px] font-bold px-2 py-0.5 rounded">
                      ✓ DONE
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded animate-pulse">
                      ● IN PROGRESS
                    </span>
                  )}

                  {step.details && (
                    <button className="text-slate-400 hover:text-slate-200">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Step Detail Drawer */}
              {isExpanded && step.details && (
                <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider mb-1">
                    Stage Trace & Execution Details:
                  </div>
                  <pre className="whitespace-pre-wrap overflow-x-auto text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
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
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-slate-200">Claim-Level Verification & Citation Audit</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
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
                  className={`p-3 rounded-lg border flex flex-col justify-between space-y-2 ${
                    isVerified
                      ? "bg-emerald-950/20 border-emerald-500/30"
                      : isUnverified
                      ? "bg-red-950/20 border-red-500/40"
                      : "bg-amber-950/20 border-amber-500/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] font-bold text-slate-400">{c.claim_id}</span>
                      {isVerified ? (
                        <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> VERIFIED ({(c.confidence * 100).toFixed(0)}%)
                        </span>
                      ) : isUnverified ? (
                        <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> UNVERIFIED (FLAGGED)
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> PARTIAL
                        </span>
                      )}
                    </div>

                    <p className="font-bold text-slate-200 text-xs leading-snug mb-1">{c.claim}</p>
                    <p className="text-[11px] text-slate-400 italic leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800">
                      "{c.evidence_snippet}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-mono font-semibold truncate flex items-center gap-1" title={c.source_citation}>
                      <ExternalLink className="w-3 h-3 shrink-0" /> {c.source_citation}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
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
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-slate-200">Verification & Compliance Audit Checks</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              STATUS: {verificationStatus.status} ({verificationStatus.passed_checks_count}/{verificationStatus.total_checks_count} Passed)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {verificationStatus.checks.map((chk: any, idx: number) => (
              <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-300">{chk.name}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{chk.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

