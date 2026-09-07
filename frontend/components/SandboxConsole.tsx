"use client";

import React from "react";
import { Terminal, CheckCircle2, AlertCircle } from "lucide-react";

interface SandboxConsoleProps {
  pythonResult: any;
}

export default function SandboxConsole({ pythonResult }: SandboxConsoleProps) {
  if (!pythonResult) return null;

  const isSuccess = pythonResult.status === "success";

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-slate-100 text-xs uppercase tracking-wider">
            Scoped Python Execution Sandbox Output
          </h3>
        </div>

        <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
          isSuccess ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
        }`}>
          {isSuccess ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
          {isSuccess ? "SUCCESS (0 ERRORS)" : "EXECUTION FAILED"}
        </span>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
        <div className="text-slate-500 mb-2"># Python 3.14 Scoped Execution Context (Math, Calculations & Data Processing)</div>
        <pre className="whitespace-pre-wrap">{pythonResult.output || pythonResult.error || "Execution finished."}</pre>
      </div>
    </div>
  );
}
