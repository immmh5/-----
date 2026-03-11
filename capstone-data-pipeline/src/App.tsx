import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  Wand2, 
  BarChart3, 
  Calculator, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Table as TableIcon
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { INSURANCE_DATA } from "./data";
import { cleanData, engineerFeatures, mathBasics } from "./pipeline";

// UI Components
import Phase1Cleaning from "./components/Phase1Cleaning";
import Phase2Engineering from "./components/Phase2Engineering";
import Phase3EDA from "./components/Phase3EDA";
import Phase3Math from "./components/Phase3Math";
import Report from "./components/Report";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Phase = "cleaning" | "engineering" | "eda" | "math" | "report";

export default function App() {
  const [activePhase, setActivePhase] = useState<Phase>("cleaning");

  // Data Pipeline Execution
  const rawData = INSURANCE_DATA;
  const cleanedData = useMemo(() => cleanData(rawData), [rawData]);
  const engineeredData = useMemo(() => engineerFeatures(cleanedData), [cleanedData]);

  const phases = [
    { id: "cleaning", label: "Phase 1: Cleaning", icon: Database },
    { id: "engineering", label: "Phase 2: Engineering", icon: Wand2 },
    { id: "eda", label: "Phase 3: EDA", icon: BarChart3 },
    { id: "math", label: "Math Basics", icon: Calculator },
    { id: "report", label: "Final Report", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#5A5A40] selection:text-white">
      {/* Header */}
      <header className="border-b border-[#1A1A1A]/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5A5A40]/20">
              <Database size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Capstone Data Pipeline</h1>
              <p className="text-xs text-[#1A1A1A]/50 uppercase tracking-widest font-medium">ML Foundations Bootcamp</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-[#F5F5F0] p-1 rounded-2xl border border-[#1A1A1A]/5">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id as Phase)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  activePhase === phase.id 
                    ? "bg-white text-[#5A5A40] shadow-sm" 
                    : "text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-white/50"
                )}
              >
                <phase.icon size={16} />
                {phase.label.split(":")[1] || phase.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activePhase === "cleaning" && (
              <Phase1Cleaning raw={rawData} cleaned={cleanedData} onNext={() => setActivePhase("engineering")} />
            )}
            {activePhase === "engineering" && (
              <Phase2Engineering cleaned={cleanedData} engineered={engineeredData} onNext={() => setActivePhase("eda")} />
            )}
            {activePhase === "eda" && (
              <Phase3EDA data={engineeredData} />
            )}
            {activePhase === "math" && (
              <Phase3Math data={engineeredData} />
            )}
            {activePhase === "report" && (
              <Report raw={rawData} cleaned={cleanedData} engineered={engineeredData} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/10 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[#1A1A1A]/40 italic font-serif">
            "Clean data is the foundation of every great insight."
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/30">Project Status</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-xs font-semibold">
              <CheckCircle2 size={12} />
              Pipeline Validated
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
