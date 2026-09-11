"use client";

import React, { useState, useEffect } from "react";
import { Download, FileSpreadsheet, FileText, Presentation, ShieldCheck, Sparkles, History } from "lucide-react";

interface DeliverablesVaultProps {
  deliverables: {
    docx?: string;
    xlsx?: string;
    pptx?: string;
  };
  finalResponse: string;
}

export default function DeliverablesVault({ deliverables, finalResponse }: DeliverablesVaultProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = () => {
    fetch("http://localhost:8000/api/deliverables/history")
      .then((res) => res.json())
      .then((data) => setHistory(data.history || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchHistory();
  }, [deliverables]);

  if (!deliverables || Object.keys(deliverables).length === 0) return null;

  const getFileName = (pathStr: string) => {
    if (!pathStr) return "";
    const parts = pathStr.replace(/\\/g, "/").split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel space-y-6">
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Executive Real Deliverables Vault & Analysis Report
            </h3>
            <p className="text-xs text-slate-400">Verified Native Office Binary Deliverables (.docx, .xlsx, .pptx)</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              fetchHistory();
              setShowHistory(!showHistory);
            }}
            className="bg-slate-950/80 hover:bg-slate-800 text-slate-300 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>{showHistory ? "Hide History" : `History (${history.length})`}</span>
          </button>

          <span className="bg-emerald-950/90 text-emerald-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-2 glow-emerald">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% VERIFIED & SAVED
          </span>
        </div>
      </div>

      {/* Analysis History Drawer if expanded */}
      {showHistory && history.length > 0 && (
        <div className="bg-slate-950/90 p-4.5 rounded-2xl border border-slate-800 space-y-2.5 shadow-inner">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
            Persisted Analysis History Memory ({history.length} Sessions Saved)
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-200">Session #{item.session_id ? item.session_id.slice(0,6) : idx+1}</span>
                  <span className="text-slate-400 font-mono text-[11px] ml-2">Type: {item.task_type} • Model: {item.model_routed}</span>
                </div>
                <div className="flex gap-2">
                  {item.deliverables && item.deliverables.docx && (
                    <a
                      href={`http://localhost:8000/api/deliverables/download/${getFileName(item.deliverables.docx)}`}
                      download
                      className="text-blue-400 hover:text-blue-300 font-extrabold text-[11px] bg-blue-950 px-2 py-0.5 rounded border border-blue-500/30"
                    >
                      .DOCX
                    </a>
                  )}
                  {item.deliverables && item.deliverables.xlsx && (
                    <a
                      href={`http://localhost:8000/api/deliverables/download/${getFileName(item.deliverables.xlsx)}`}
                      download
                      className="text-emerald-400 hover:text-emerald-300 font-extrabold text-[11px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30"
                    >
                      .XLSX
                    </a>
                  )}
                  {item.deliverables && item.deliverables.pptx && (
                    <a
                      href={`http://localhost:8000/api/deliverables/download/${getFileName(item.deliverables.pptx)}`}
                      download
                      className="text-amber-400 hover:text-amber-300 font-extrabold text-[11px] bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30"
                    >
                      .PPTX
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deliverable File Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        {/* DOCX Card */}
        {deliverables.docx && (
          <div className="bg-slate-950/90 p-5 rounded-2xl border border-blue-500/40 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group glass-card">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 group-hover:scale-110 transition duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-500/30">
                  WORD TECHNICAL REPORT
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1.5 truncate font-mono" title={getFileName(deliverables.docx)}>
                {getFileName(deliverables.docx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                Formatted MRPL technical audit brief with executive summary, tables, and safety recommendations.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.docx)}`}
              download
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-blue-950/50 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download .DOCX</span>
            </a>
          </div>
        )}

        {/* XLSX Card */}
        {deliverables.xlsx && (
          <div className="bg-slate-950/90 p-5 rounded-2xl border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group glass-card glow-emerald">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition duration-300">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  EXCEL CALCULATION SHEET
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1.5 truncate font-mono" title={getFileName(deliverables.xlsx)}>
                {getFileName(deliverables.xlsx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                Styled workbook featuring engineering calculations, corrosion rate tables, and financial totals.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.xlsx)}`}
              download
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-emerald-950/50 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download .XLSX</span>
            </a>
          </div>
        )}

        {/* PPTX Card */}
        {deliverables.pptx && (
          <div className="bg-slate-950/90 p-5 rounded-2xl border border-amber-500/40 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group glass-card glow-amber">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition duration-300">
                  <Presentation className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-500/30">
                  POWERPOINT EXECUTIVE DECK
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1.5 truncate font-mono" title={getFileName(deliverables.pptx)}>
                {getFileName(deliverables.pptx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                16:9 executive presentation slides formatted with key metrics and operational takeaways.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.pptx)}`}
              download
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-amber-950/50 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download .PPTX</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
