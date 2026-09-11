"use client";

import React, { useState } from "react";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import HeroCommandCenter from "@/components/HeroCommandCenter";
import DocumentCategoryGrid from "@/components/DocumentCategoryGrid";
import AIAgentsPanel from "@/components/AIAgentsPanel";
import SecurityCenterPanel from "@/components/SecurityCenterPanel";
import KnowledgeRAGManager from "@/components/KnowledgeRAGManager";
import ChatInterface from "@/components/ChatInterface";
import AgentReasoningTrace from "@/components/AgentReasoningTrace";
import ChunkAnalysisViewer from "@/components/ChunkAnalysisViewer";
import SandboxConsole from "@/components/SandboxConsole";
import DeliverablesVault from "@/components/DeliverablesVault";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [agentData, setAgentData] = useState<any>(null);

  const handleExecutePrompt = async (prompt: string, selectedModel?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: selectedModel })
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
      {/* 1. Top Header & Security Status */}
      <WorkspaceHeader />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* 2. Hero / Command Center */}
        <HeroCommandCenter onExecutePrompt={handleExecutePrompt} isLoading={isLoading} />

        {/* 3. Security Center Panel */}
        <SecurityCenterPanel />

        {/* 4. Document Knowledge Category Grid (8 Asset Cards) */}
        <DocumentCategoryGrid onSelectCategory={(cat) => handleExecutePrompt(`Analyze confidential assets in ${cat}`)} />

        {/* 5. Autonomous Local AI Agents Panel */}
        <AIAgentsPanel />

        {/* 6. Execution Panel & RAG Manager */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface onExecutePrompt={handleExecutePrompt} isLoading={isLoading} />
          </div>
          <div>
            <KnowledgeRAGManager onAnalyzeFile={handleAnalyzeFile} />
          </div>
        </div>

        {/* 7. Live Agent Reasoning Timeline & Verification */}
        {agentData && (
          <AgentReasoningTrace
            taskType={agentData.task_type}
            modelRouted={agentData.model_routed}
            planSteps={agentData.plan_steps}
            verificationStatus={agentData.verification_status}
          />
        )}

        {/* 8. Deep Uploaded Chunk Inspector */}
        {agentData && agentData.plan_steps && (
          <ChunkAnalysisViewer chunks={agentData.rag_context || []} />
        )}

        {/* 9. Python Sandbox Execution Console */}
        {agentData && agentData.python_sandbox_result && (
          <SandboxConsole pythonResult={agentData.python_sandbox_result} />
        )}

        {/* 10. Real Office Deliverables Vault (.docx, .xlsx, .pptx) */}
        {agentData && (
          <DeliverablesVault
            deliverables={agentData.deliverables}
            finalResponse={agentData.final_response}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          ODIN Sovereign On-Premise Agentic AI Workbench | SIH 2026 Problem SIH26117
        </div>
        <div className="text-amber-400 font-semibold">
          MRPL Mangalore Refinery & Petrochemicals Limited | Team Zero Latency (934567100)
        </div>
      </footer>
    </div>
  );
}
