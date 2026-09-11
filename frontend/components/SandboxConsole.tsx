"use client";

import React, { useState } from "react";
import { Terminal, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

interface SandboxConsoleProps {
  pythonResult: any;
}

export default function SandboxConsole({ pythonResult }: SandboxConsoleProps) {
  const [copied, setCopied] = useState(false);

  if (!pythonResult) return null;

  const isSuccess = pythonResult.status === "success";

  const handleCopy = () => {
    const textToCopy = pythonResult.output || pythonResult.error || "";
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Terminal className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Scoped Python Execution Sandbox Output
            </h3>
            <p className="text-xs text-slate-400">Isolated Runtime Calculation & AST Verification Log</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 flex items-center gap-1 transition cursor-pointer"
            title="Copy Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="text-[10px] font-bold">{copied ? "Copied" : "Copy"}</span>
          </button>

          <span className={`text-[10px] font-black px-3 py-1 rounded-full border flex items-center gap-1.5 ${
            isSuccess ? "bg-emerald-950/90 text-emerald-400 border-emerald-500/40 glow-emerald" : "bg-red-950/90 text-red-400 border-red-500/40"
          }`}>
            {isSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <AlertCircle className="w-3.5 h-3.5 text-red-400" />}
            {isSuccess ? "EXECUTED CLEANLY (0 ERRORS)" : "EXECUTION FAILED"}
          </span>
        </div>
      </div>

      <div className="bg-slate-950/95 p-4 rounded-2xl border border-slate-800/90 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto shadow-inner relative">
        <div className="text-slate-500 mb-2 flex items-center gap-2 text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span># Isolated Python Runtime (ASME Formulas, Corrosion Rates, Pressure Drops & Financial Totals)</span>
        </div>
        <pre className="whitespace-pre-wrap text-emerald-300 font-mono text-xs">{pythonResult.output || pythonResult.error || "Execution finished."}</pre>
      </div>
    </div>
  );
}
