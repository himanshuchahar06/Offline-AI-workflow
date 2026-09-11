"use client";

import React from "react";
import { Bot, Cpu, CheckCircle2, Clock, FileText, Activity } from "lucide-react";

export default function AIAgentsPanel() {
  const agents = [
    {
      id: "doc_intel",
      name: "Document Intelligence",
      status: "Active",
      task: "Parsing uploaded PDF vector passages",
      doc: "vessel_101_inspection_report.txt",
      execTime: "0.24s",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    },
    {
      id: "eng_analyst",
      name: "Engineering Analyst",
      status: "Active",
      task: "Running ASME wall thickness calculation script",
      doc: "mrpl_sop_hydrocracker.txt",
      execTime: "0.18s",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
    },
    {
      id: "inspection_analyst",
      name: "Inspection Analyst",
      status: "Verified",
      task: "UTM ultrasonic NDT corrosion rate verification",
      doc: "vessel_101_inspection_report.txt",
      execTime: "0.31s",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10"
    },
    {
      id: "sop_assistant",
      name: "SOP Assistant",
      status: "Idle",
      task: "Monitoring safe operating window (SOL limits)",
      doc: "mrpl_sop_hydrocracker.txt",
      execTime: "0.09s",
      color: "text-slate-400 border-slate-700 bg-slate-900"
    },
    {
      id: "financial_analyst",
      name: "Financial Analyst",
      status: "Idle",
      task: "Procurement capex quote comparison",
      doc: "vendor_procurement_quotes.csv",
      execTime: "0.14s",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10"
    },
    {
      id: "knowledge_search",
      name: "Knowledge Search Agent",
      status: "Active",
      task: "Querying on-premise local vector store",
      doc: "Local RAG Store (2 Docs)",
      execTime: "0.05s",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10"
    },
    {
      id: "report_generator",
      name: "Report Generator",
      status: "Active",
      task: "Synthesizing Word, Excel & PowerPoint deliverables",
      doc: "MRPL_INSPECTION_AUDIT.docx",
      execTime: "0.42s",
      color: "text-teal-400 border-teal-500/30 bg-teal-500/10"
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Bot className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">
              Autonomous Local AI Agents Monitor
            </h3>
            <p className="text-xs text-slate-400">Specialized Local Multi-Agent Task Orchestration</p>
          </div>
        </div>

        <span className="text-xs text-purple-400 bg-purple-950 px-3 py-1 rounded-full border border-purple-500/30 font-semibold flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          7 Local Agents Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-200">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  <span>{agent.name}</span>
                </div>

                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${agent.color}`}>
                  ● {agent.status}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-snug mb-2">
                {agent.task}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
              <span className="truncate max-w-[140px]" title={agent.doc}>
                📁 {agent.doc}
              </span>
              <span className="font-mono text-cyan-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {agent.execTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
