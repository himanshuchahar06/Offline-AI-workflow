"use client";

import React, { useState, useEffect } from "react";
import { Database, Upload, FileText, CheckCircle, RefreshCw, Zap, Image as ImageIcon, Sparkles } from "lucide-react";

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
        
        // Pass complete agent_data to parent page so UI updates instantly!
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
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Database className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Confidential On-Premise Vector RAG</h3>
            <p className="text-xs text-slate-400">Zero Cloud Knowledge Base & Scanned Document Store</p>
          </div>
        </div>

        <button
          onClick={fetchDocuments}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Upload Zone */}
      <div className="mb-5">
        <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 bg-slate-950/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition text-center group">
          <Upload className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 mb-2 transition" />
          <span className="text-xs font-semibold text-slate-200">
            Click to upload Confidential PDF, DOCX, CSV, or P&ID Images
          </span>
          <span className="text-[11px] text-slate-500 mt-1">
            Files are parsed 100% locally with OCR & Vector Indexed on-premise
          </span>
          <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.docx,.txt,.csv,.png,.jpg,.jpeg" />
        </label>

        {isUploading && (
          <div className="mt-2 text-xs text-amber-400 font-bold flex items-center gap-1.5 justify-center animate-pulse">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Parsing & Executing AI Analysis on Uploaded File...</span>
          </div>
        )}

        {uploadStatus && !isUploading && (
          <div className="mt-2 text-xs text-cyan-400 font-bold flex items-center gap-1.5 justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            {uploadStatus}
          </div>
        )}
      </div>

      {/* Active Knowledge Documents List */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Indexed Confidential Documents ({documents.length})
        </h4>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                  {doc.id.endsWith(".jpg") || doc.id.endsWith(".png") ? (
                    <ImageIcon className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-200 truncate">{doc.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Category: <span className="text-amber-400 font-medium">{doc.category}</span> • Chunks: {doc.chunk_count}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onAnalyzeFile && onAnalyzeFile(doc.id)}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2.5 py-1.5 rounded border border-emerald-500/30 flex items-center gap-1 shrink-0 transition"
              >
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Analyze File</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
