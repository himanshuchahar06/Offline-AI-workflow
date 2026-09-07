"use client";

import React from "react";
import { Layers, FileText, Hash, Tag, Cpu, ShieldCheck } from "lucide-react";

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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Uploaded File Deep Chunk Inspector</h3>
            <p className="text-xs text-slate-400">Extracted Vector Passages & Semantic Analysis Breakdown</p>
          </div>
        </div>

        <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
          {chunks.length} Vector Chunks Evaluated
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chunks.map((item, idx) => {
          const metrics = item.extracted_metrics || { numbers: [], units: [], equipment_tags: [] };

          return (
            <div
              key={idx}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Chunk #{item.chunk_index + 1}</span>
                    <span className="text-slate-500 font-normal">({item.title})</span>
                  </div>

                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Score: {item.score}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono italic mb-3 leading-relaxed">
                  "{item.content}"
                </div>

                <div className="space-y-1.5 text-xs">
                  {metrics.numbers.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Hash className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Extracted Numbers: <strong className="text-amber-300">{metrics.numbers.join(", ")}</strong></span>
                    </div>
                  )}

                  {metrics.equipment_tags.length > 0 && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Tag className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Equipment Tags: <strong className="text-purple-300">{metrics.equipment_tags.join(", ")}</strong></span>
                    </div>
                  )}

                  <div className="flex items-start gap-2 text-slate-400 mt-2 text-[11px] bg-slate-900/50 p-2 rounded border border-slate-800">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
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
