"use client";

import React from "react";
import { Layers, FileText, Hash, Tag, Cpu } from "lucide-react";

interface ChunkItem {
  doc_id: string;
  title: string;
  chunk_index: number;
  content: string;
  score: number;
  extracted_metrics?: {
    numbers: string[];
    units: string[];
    equipment_tags: string[];
  };
  analysis_summary?: string;
}

interface ChunkAnalysisViewerProps {
  chunks: ChunkItem[];
}

export default function ChunkAnalysisViewer({ chunks }: ChunkAnalysisViewerProps) {
  if (!chunks || chunks.length === 0) return null;

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">Uploaded Document Deep Chunk Inspector</h3>
            <p className="text-xs text-slate-400">Extracted Vector Passages & Semantic Analysis Breakdown</p>
          </div>
        </div>

        <span className="bg-cyan-950/80 text-cyan-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-cyan-500/30">
          {chunks.length} Vector Passages Evaluated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chunks.map((item, idx) => {
          const metrics = item.extracted_metrics || { numbers: [], units: [], equipment_tags: [] };

          return (
            <div
              key={idx}
              className="bg-slate-950/90 p-4.5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between glass-card"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-100">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Passage #{item.chunk_index + 1}</span>
                    <span className="text-slate-400 font-mono text-[11px]">({item.title})</span>
                  </div>

                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-500/30 glow-emerald">
                    Relevance: {item.score}
                  </span>
                </div>

                <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono italic mb-3.5 leading-relaxed shadow-inner">
                  "{item.content}"
                </div>

                <div className="space-y-2 text-xs">
                  {metrics.numbers.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Hash className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Numbers: <strong className="text-amber-300 font-mono">{metrics.numbers.join(", ")}</strong></span>
                    </div>
                  )}

                  {metrics.equipment_tags.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Tag className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Equipment Tags: <strong className="text-purple-300 font-mono">{metrics.equipment_tags.join(", ")}</strong></span>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-slate-300 mt-2 text-[11px] bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 font-sans">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item.analysis_summary || "Parsed and validated locally."}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
