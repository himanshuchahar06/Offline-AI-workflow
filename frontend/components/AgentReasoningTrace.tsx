"use client";

import React from "react";
import { CheckCircle2, Clock, Cpu, ShieldCheck, AlertTriangle, FileCheck, Layers, Terminal } from "lucide-react";

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
  if (!planSteps || planSteps.length === 0) return null;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">
              Agent Execution & Reasoning Timeline
            </h3>
            <p className="text-xs text-slate-400">Live Step-by-Step Task & Verification Pipeline</p>
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

      {/* Execution Timeline Grid */}
      <div className="space-y-2.5 mb-6">
        {planSteps.map((step) => {
          const isDone = step.status === "completed" || step.status === "verified";
          const isVerified = step.status === "verified";

          return (
            <div
              key={step.step_id}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                isDone
                  ? "bg-slate-950/80 border-slate-800"
                  : "bg-amber-950/10 border-amber-500/30 animate-pulse"
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : "●"}
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verification Summary Card */}
      {verificationStatus && verificationStatus.checks && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs text-slate-200">Verification & Compliance Audit Matrix</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
              STATUS: {verificationStatus.status} ({verificationStatus.passed_checks_count}/{verificationStatus.total_checks_count} Checks Passed)
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
