"use client";

import React from "react";
import { FileCode, FileCheck, FileText, Calculator, PieChart, ShieldLock, Handshake, Lock } from "lucide-react";

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
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30"
    },
    {
      id: "inspection",
      title: "Inspection Reports",
      desc: "UTM & NDT Asset Integrity Audits",
      count: "28 Reports",
      classification: "CONFIDENTIAL",
      icon: FileCheck,
      color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30"
    },
    {
      id: "sop",
      title: "SOPs & SOW",
      desc: "Standard Operating Procedures",
      count: "42 Manuals",
      classification: "RESTRICTED",
      icon: FileText,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
    },
    {
      id: "calcs",
      title: "Engineering Calculations",
      desc: "ASME $t_{min}$ & Fluid Dynamics",
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
      title: "Internal Correspondence",
      desc: "PSU Technical & Safety Memos",
      count: "64 Messages",
      classification: "RESTRICTED",
      icon: ShieldLock,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30"
    },
    {
      id: "vendor",
      title: "Vendor Negotiations",
      desc: "Equipment Supplier Quotes",
      count: "22 Contracts",
      classification: "PROPRIETARY",
      icon: Handshake,
      color: "from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/30"
    },
    {
      id: "designs",
      title: "Confidential Designs",
      desc: "Proprietary Plant Blueprints",
      count: "11 Schematics",
      classification: "TOP SECRET",
      icon: Lock,
      color: "from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30"
    }
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <h3 className="font-extrabold text-slate-100 text-sm tracking-wide uppercase">
            Confidential Knowledge Asset Vault
          </h3>
          <p className="text-xs text-slate-400">Categorized On-Premise Industrial Knowledge Bases</p>
        </div>

        <span className="text-xs text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30 font-semibold">
          8 Asset Categories • Processed 100% Locally
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory && onSelectCategory(cat.title)}
              className={`p-3.5 rounded-xl text-left bg-slate-950 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 hover:scale-[1.02] group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${cat.color} border`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-extrabold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {cat.classification}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 transition">
                  {cat.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {cat.desc}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                <span>{cat.count}</span>
                <span className="text-emerald-400 font-semibold">● Local RAG</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
