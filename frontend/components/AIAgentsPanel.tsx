"use client";

import React from "react";
import { Bot, Cpu, Clock, Activity, Zap, CheckCircle2 } from "lucide-react";

export default function AIAgentsPanel() {
  const agents = [
    {
      id: "doc_intel",
      name: "Document Intelligence Agent",
      status: "Active",
      task: "Parsing uploaded PDF vector passages & extracting equipment tags",
      doc: "vessel_101_inspection_report.txt",
      execTime: "0.24s",
      badgeClass: "text-emerald-400 border-emerald-500/40 bg-emerald-950/80 glow-emerald"
    },
    {
      id: "eng_analyst",
      name: "Engineering Analyst Agent",
      status: "Active",
      task: "Executing ASME wall thickness calculation in Python Sandbox",
      doc: "mrpl_sop_hydrocracker.txt",
      execTime: "0.18s",
      badgeClass: "text-cyan-400 border-cyan-500/40 bg-cyan-950/80 glow-cyan"
    },
    {
      id: "inspection_analyst",
      name: "Inspection & NDT Agent",
      status: "Verified",
      task: "UTM ultrasonic NDT corrosion rate & remaining life verification",
      doc: "vessel_101_inspection_report.txt",
      execTime: "0.31s",
      badgeClass: "text-amber-400 border-amber-500/40 bg-amber-950/80 glow-amber"
    },
    {
      id: "sop_assistant",
      name: "SOP Auditor Agent",
      status: "Idle",
      task: "Monitoring safe operating window (SOL limits) & emergency SOPs",
      doc: "mrpl_sop_hydrocracker.txt",
      execTime: "0.09s",
      badgeClass: "text-slate-400 border-slate-700 bg-slate-900"
    },
    {
      id: "financial_analyst",
      name: "Procurement Analyst Agent",
      status: "Idle",
      task: "Evaluating capex quote comparison & cost spreadsheets",
      doc: "vendor_procurement_quotes.csv",
      execTime: "0.14s",
      badgeClass: "text-purple-400 border-purple-500/40 bg-purple-950/80"
    },
    {
      id: "knowledge_search",
      name: "Knowledge RAG Search",
      status: "Active",
      task: "Querying on-premise local vector store memory",
      doc: "Local RAG Store (4 Docs)",
      execTime: "0.05s",
      badgeClass: "text-blue-400 border-blue-500/40 bg-blue-950/80"
    },
    {
      id: "report_generator",
      name: "Deliverable Generator",
      status: "Active",
      task: "Synthesizing formatted Word, Excel & PowerPoint deliverables",
      doc: "MRPL_TECHNICAL_REPORT.docx",
      execTime: "0.42s",
      badgeClass: "text-teal-400 border-teal-500/40 bg-teal-950/80"
    }
  ];

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel">
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Autonomous Local AI Agents Monitor
            </h3>
            <p className="text-xs text-slate-400">Specialized On-Premise Multi-Agent Swarm Orchestration</p>
          </div>
        </div>

        <span className="text-xs text-purple-300 bg-purple-950/90 px-3.5 py-1.5 rounded-full border border-purple-500/30 font-bold flex items-center gap-2 shadow-inner">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>7 Specialized Agents Registered</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {agents.map((agent) => {
          const isActive = agent.status === "Active";
          return (
            <div
              key={agent.id}
              className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between glass-card group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-xs text-slate-100 group-hover:text-cyan-300 transition">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span>{agent.name}</span>
                  </div>

                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${agent.badgeClass}`}>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>}
                    ● {agent.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {agent.task}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="truncate max-w-[140px] text-slate-400" title={agent.doc}>
                  📄 {agent.doc}
                </span>
                <span className="font-bold text-cyan-400 flex items-center gap-1 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                  <Clock className="w-3 h-3 text-cyan-400" /> {agent.execTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
