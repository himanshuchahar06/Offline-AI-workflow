"use client";

import React, { useState } from "react";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import ChatInterface from "@/components/ChatInterface";
import AgentReasoningTrace from "@/components/AgentReasoningTrace";
import KnowledgeRAGManager from "@/components/KnowledgeRAGManager";
import DeliverablesVault from "@/components/DeliverablesVault";
import SandboxConsole from "@/components/SandboxConsole";
import ChunkAnalysisViewer from "@/components/ChunkAnalysisViewer";
import { ShieldCheck, Cpu, Award } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [agentData, setAgentData] = useState<any>(null);

  const handleExecutePrompt = async (prompt: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.status === "success") {
        setAgentData(data);
      }
    } catch (err) {
      console.error("Execution error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeFile = (filename: string) => {
    const customPrompt = `Perform technical analysis on uploaded file '${filename}', run calculations in sandbox, and generate Word report, Excel sheet, and PowerPoint presentation deck.`;
    handleExecutePrompt(customPrompt);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Header */}
      <WorkspaceHeader />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
                <Award className="w-3.5 h-3.5" /> SMART INDIA HACKATHON 2026 — PROBLEM SIH26117
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
                Sovereign On-Premise Agentic AI Workbench
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                “Enterprise-grade AI assistance — without enterprise data leaving the premises.” Designed for confidential refinery & PSU engineering workflows at Mangalore Refinery and Petrochemicals Limited (MRPL).
              </p>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5 shrink-0">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Air-Gapped Local Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Understand → Act → Verify → Deliver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Grid: Chat & Knowledge RAG */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface onExecutePrompt={handleExecutePrompt} isLoading={isLoading} />
          </div>
          <div>
            <KnowledgeRAGManager onAnalyzeFile={handleAnalyzeFile} />
          </div>
        </div>

        {/* Agent Reasoning Trace Graph */}
        {agentData && (
          <AgentReasoningTrace
            taskType={agentData.task_type}
            modelRouted={agentData.model_routed}
            planSteps={agentData.plan_steps}
            verificationStatus={agentData.verification_status}
          />
        )}

        {/* Dedicated Uploaded Chunk Analysis Viewer */}
        {agentData && agentData.plan_steps && (
          <ChunkAnalysisViewer chunks={agentData.rag_context || []} />
        )}

        {/* Python Sandbox Console */}
        {agentData && agentData.python_sandbox_result && (
          <SandboxConsole pythonResult={agentData.python_sandbox_result} />
        )}

        {/* Real Office Deliverables Vault */}
        {agentData && (
          <DeliverablesVault
            deliverables={agentData.deliverables}
            finalResponse={agentData.final_response}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        SIH 2026 Problem Statement SIH26117 | Team Zero Latency (934567100) | MRPL Mangalore Refinery & Petrochemicals Limited
      </footer>
    </div>
  );
}
