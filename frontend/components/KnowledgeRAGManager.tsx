"use client";

import React, { useState, useEffect } from "react";
import { Database, Upload, FileText, CheckCircle, RefreshCw, Zap, Image as ImageIcon, Sparkles, FolderCheck } from "lucide-react";

interface KnowledgeRAGManagerProps {
  onAnalyzeFile?: (filename: string, agentData?: any) => void;
}

export default function KnowledgeRAGManager({ onAnalyzeFile }: KnowledgeRAGManagerProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const fetchDocuments = () => {
    fetch("http://localhost:8000/api/rag/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data.documents || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(`Parsing & Analyzing ${file.name} locally...`);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/api/rag/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.status === "success") {
        setUploadStatus(`Analyzed ${data.chunks_indexed} chunks from ${file.name}!`);
        fetchDocuments();
        
        if (onAnalyzeFile) {
          onAnalyzeFile(file.name, data.agent_data);
        }
      } else {
        setUploadStatus("Upload failed");
      }
    } catch (err) {
      setUploadStatus("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
                On-Premise Vector RAG Store
              </h3>
              <p className="text-xs text-slate-400">Local OCR & Chunk Indexing Engine</p>
            </div>
          </div>

          <button
            onClick={fetchDocuments}
            className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-1.5 border border-slate-800 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync</span>
          </button>
        </div>

        {/* Upload Zone */}
        <div className="mb-5">
          <label className="relative border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 bg-slate-950/70 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group overflow-hidden glass-card">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-teal-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition duration-300 mb-2">
              <Upload className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition">
              Upload PDF, DOCX, CSV, or P&ID Images
            </span>
            <span className="text-[11px] text-slate-400 mt-1 font-mono">
              Auto OCR • Local Vector Index • Auto Pipeline Trigger
            </span>
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.txt,.csv,.png,.jpg,.jpeg" />
          </label>

          {isUploading && (
            <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-bold flex items-center gap-2 justify-center animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
              <span>Analyzing uploaded document locally...</span>
            </div>
          )}

          {uploadStatus && !isUploading && (
            <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2 justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{uploadStatus}</span>
            </div>
          )}
        </div>

        {/* Active Knowledge Documents List */}
        <div>
          <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <FolderCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Indexed Documents ({documents.length})</span>
          </h4>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/30 rounded-xl p-3 flex items-center justify-between text-xs gap-2 transition group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    {doc.id.endsWith(".jpg") || doc.id.endsWith(".png") ? (
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                    ) : (
                      <FileText className="w-4 h-4 text-cyan-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-200 truncate group-hover:text-cyan-300 transition">{doc.title}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      Cat: <span className="text-amber-400 font-medium">{doc.category}</span> • {doc.chunk_count} chunks
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAnalyzeFile && onAnalyzeFile(doc.id)}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1 shrink-0 transition cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Analyze</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
