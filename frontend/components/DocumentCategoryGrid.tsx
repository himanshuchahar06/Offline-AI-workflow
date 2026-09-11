"use client";

import React from "react";
import { FileCode, FileCheck, FileText, Calculator, PieChart, ShieldLock, Handshake, Lock, Layers } from "lucide-react";

interface DocumentCategoryGridProps {
  onSelectCategory?: (category: string) => void;
}

export default function DocumentCategoryGrid({ onSelectCategory }: DocumentCategoryGridProps) {
  const categories = [
    {
      id: "pid",
      title: "P&IDs",
      desc: "Piping & Instrumentation Diagrams",
      count: "14 Diagrams",
      classification: "RESTRICTED",
      icon: FileCode,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30 glow-amber"
    },
    {
      id: "inspection",
      title: "Inspection Reports",
      desc: "UTM & NDT Asset Integrity Audits",
      count: "28 Reports",
      classification: "CONFIDENTIAL",
      icon: FileCheck,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30 glow-cyan"
    },
    {
      id: "sop",
      title: "SOPs & SOW",
      desc: "Standard Operating Procedures",
      count: "42 Manuals",
      classification: "RESTRICTED",
      icon: FileText,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30 glow-emerald"
    },
    {
      id: "calcs",
      title: "Engineering Calculations",
      desc: "ASME wall thickness & Fluid Dynamics",
      count: "19 Workbooks",
      classification: "INTERNAL ONLY",
      icon: Calculator,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30"
    },
    {
      id: "financials",
      title: "Financial Documents",
      desc: "Capex & Procurement Models",
      count: "15 Sheets",
      classification: "CONFIDENTIAL",
      icon: PieChart,
      color: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/30"
    },
    {
      id: "correspondence",
      title: "Internal Memos",
      desc: "PSU Technical & Safety Memos",
      count: "64 Messages",
      classification: "RESTRICTED",
      icon: ShieldLock,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30"
    },
    {
      id: "vendor",
      title: "Vendor Quotes",
      desc: "Equipment Supplier Contracts",
      count: "22 Contracts",
      classification: "PROPRIETARY",
      icon: Handshake,
      color: "from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30"
    },
    {
      id: "designs",
      title: "Confidential Blueprints",
      desc: "Proprietary Plant Designs",
      count: "11 Schematics",
      classification: "TOP SECRET",
      icon: Lock,
      color: "from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30"
    }
  ];

  return (
    <div className="relative bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl glass-panel">
      <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
              Confidential Knowledge Asset Vault
            </h3>
            <p className="text-xs text-slate-400">Categorized On-Premise Industrial Knowledge Repositories</p>
          </div>
        </div>

        <span className="text-xs text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/30 font-bold">
          8 Categories • Processed 100% On-Premise
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.title)}
              className="p-4 rounded-2xl text-left bg-slate-950/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 group flex flex-col justify-between cursor-pointer glass-card"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${cat.color} border shadow-md group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                    {cat.classification}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-100 group-hover:text-cyan-300 transition duration-200">
                  {cat.title}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {cat.desc}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-900/90 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="text-slate-400">{cat.count}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Index Ready
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
