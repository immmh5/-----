import React from "react";
import { CleanedData, EngineeredData } from "../pipeline";
import { Wand2, ArrowRight, Zap, Layers, Scale } from "lucide-react";

interface Props {
  cleaned: CleanedData[];
  engineered: EngineeredData[];
  onNext: () => void;
}

export default function Phase2Engineering({ cleaned, engineered, onNext }: Props) {
  const sample = engineered[0];

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="order-2 lg:order-1">
          <div className="bg-[#151619] rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5A5A40]/20 blur-[100px] -mr-32 -mt-32" />
            
            <h3 className="text-sm uppercase tracking-widest font-bold text-white/40 mb-8">Feature Transformation Map</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Zap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-white/40">smoker (string)</span>
                    <ArrowRight size={12} className="text-white/20" />
                    <span className="text-xs font-mono text-indigo-400">is_smoker (int)</span>
                  </div>
                  <p className="text-sm font-medium">One-Hot Encoding</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Layers size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-white/40">bmi (float)</span>
                    <ArrowRight size={12} className="text-white/20" />
                    <span className="text-xs font-mono text-emerald-400">bmi_category (cat)</span>
                  </div>
                  <p className="text-sm font-medium">Binning & Categorization</p>
                </div>
              </div>

              <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <Scale size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-white/40">age (int)</span>
                    <ArrowRight size={12} className="text-white/20" />
                    <span className="text-xs font-mono text-amber-400">scaled_age (float)</span>
                  </div>
                  <p className="text-sm font-medium">Standard Scaling (Z-Score)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-[#5A5A40]/10 border border-[#5A5A40]/20">
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Wand2 size={16} className="text-[#5A5A40]" />
                Engineered Record Example
              </h4>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                <div className="space-y-1">
                  <p className="text-white/40 uppercase">BMI Category</p>
                  <p className="text-white text-sm">{sample.bmi_category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase">Scaled BMI</p>
                  <p className="text-white text-sm">{sample.scaled_bmi.toFixed(4)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase">Interaction</p>
                  <p className="text-white text-sm">{sample.bmi_smoker_interaction.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 uppercase">Age Group</p>
                  <p className="text-white text-sm">{sample.age_group}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <h2 className="text-4xl font-serif italic mb-6">Phase 2: Engineer & Transform</h2>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
            Raw data is rarely ready for machine learning. We create new features to capture hidden patterns 
            and normalize values to ensure fair weighting in our analysis.
          </p>
          
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-[#1A1A1A]/80">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
              Created <span className="font-bold">bmi_smoker_interaction</span> to capture the combined risk.
            </li>
            <li className="flex items-center gap-3 text-[#1A1A1A]/80">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
              Implemented <span className="font-bold">StandardScaler</span> for age and BMI.
            </li>
            <li className="flex items-center gap-3 text-[#1A1A1A]/80">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
              Binned age into <span className="font-bold">Youth, Adult, and Senior</span> groups.
            </li>
          </ul>

          <button 
            onClick={onNext}
            className="px-8 py-4 bg-[#5A5A40] text-white rounded-2xl font-semibold flex items-center gap-2 hover:bg-[#4A4A30] transition-colors shadow-lg shadow-[#5A5A40]/20 self-start group"
          >
            Explore Visual Insights
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
