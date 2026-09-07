"use client";

import React from "react";
import { Download, FileSpreadsheet, FileText, Presentation, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

interface DeliverablesVaultProps {
  deliverables: {
    docx?: string;
    xlsx?: string;
    pptx?: string;
  };
  finalResponse: string;
}

export default function DeliverablesVault({ deliverables, finalResponse }: DeliverablesVaultProps) {
  if (!deliverables || Object.keys(deliverables).length === 0) return null;

  const getFileName = (pathStr: string) => {
    if (!pathStr) return "";
    const parts = pathStr.replace(/\\/g, "/").split("/");
    return parts[parts.length - 1];
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-bounce" />
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Real Office Deliverables Vault</h3>
            <p className="text-xs text-slate-400">Verified Binary .DOCX, .XLSX & .PPTX File Outputs</p>
          </div>
        </div>

        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> 100% VERIFIED & SECURE
        </span>
      </div>

      {/* Deliverable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* DOCX Card */}
        {deliverables.docx && (
          <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 hover:border-blue-500/60 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  WORD TECHNICAL REPORT
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1 truncate" title={getFileName(deliverables.docx)}>
                {getFileName(deliverables.docx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Formatted MRPL technical audit brief with executive summary, tables, and safety recommendations.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.docx)}`}
              download
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .DOCX</span>
            </a>
          </div>
        )}

        {/* XLSX Card */}
        {deliverables.xlsx && (
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  EXCEL CALCULATION SHEET
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1 truncate" title={getFileName(deliverables.xlsx)}>
                {getFileName(deliverables.xlsx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Styled workbook featuring engineering calculations, corrosion rate tables, and financial totals.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.xlsx)}`}
              download
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .XLSX</span>
            </a>
          </div>
        )}

        {/* PPTX Card */}
        {deliverables.pptx && (
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 hover:border-amber-500/60 transition flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Presentation className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  POWERPOINT EXECUTIVE DECK
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-100 mb-1 truncate" title={getFileName(deliverables.pptx)}>
                {getFileName(deliverables.pptx)}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                16:9 executive presentation slides formatted with key metrics and operational takeaways.
              </p>
            </div>

            <a
              href={`http://localhost:8000/api/deliverables/download/${getFileName(deliverables.pptx)}`}
              download
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .PPTX</span>
            </a>
          </div>
        )}
      </div>

      {/* Text Output Summary */}
      {finalResponse && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto">
          {finalResponse}
        </div>
      )}
    </div>
  );
}
