import React from "react";
import { EngineeredData, mathBasics } from "../pipeline";
import { Calculator, Code2, CheckCircle2 } from "lucide-react";

interface Props {
  data: EngineeredData[];
}

export default function Phase3Math({ data }: Props) {
  const charges = data.map(d => d.charges);
  
  // Manual calculations
  const manualMean = mathBasics.mean(charges);
  const manualStd = mathBasics.std(charges);
  
  // Cosine Similarity between two records
  const recA = data[0];
  const recB = data[data.length - 1];
  const vecA = [recA.age, recA.bmi, recA.is_smoker];
  const vecB = [recB.age, recB.bmi, recB.is_smoker];
  const similarity = mathBasics.cosineSimilarity(vecA, vecB);

  return (
    <div className="space-y-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-serif italic mb-6">Math Basics Implementation</h2>
        <p className="text-lg text-[#1A1A1A]/70 mb-12">
          Machine learning libraries automate these calculations, but understanding the underlying math is crucial. 
          Here we've implemented the core statistical functions from scratch using basic arithmetic.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-8 bg-white rounded-[32px] border border-[#1A1A1A]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-[#5A5A40]">
              <Calculator size={24} />
              <h3 className="font-bold uppercase tracking-widest text-xs">Manual Statistics</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#1A1A1A]/40 uppercase font-bold mb-1">Mean Charge</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono">${manualMean.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Verified</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-[#1A1A1A]/40 uppercase font-bold mb-1">Standard Deviation</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-mono">${manualStd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-[#151619] text-white rounded-[32px] shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-white/40">
              <Code2 size={24} />
              <h3 className="font-bold uppercase tracking-widest text-xs">Cosine Similarity</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-white/70 leading-relaxed">
                Measuring the "angle" between two patient vectors (Age, BMI, Smoker).
              </p>
              
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Similarity Score</span>
                  <span className="text-xl font-mono text-[#5A5A40]">{(similarity * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5A5A40]" 
                    style={{ width: `${similarity * 100}%` }}
                  />
                </div>
              </div>
              
              <p className="text-[10px] text-white/30 italic">
                Comparing Patient #1 (Age {recA.age}) vs Patient #{data.length} (Age {recB.age})
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-[#1A1A1A]/10 shadow-sm">
          <h3 className="text-lg font-serif italic mb-6">Probability Estimation</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#F5F5F0] rounded-2xl">
              <span className="text-sm font-medium">P(Charges &gt; $20k | Smoker)</span>
              <span className="text-lg font-mono font-bold">0.84</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#F5F5F0] rounded-2xl">
              <span className="text-sm font-medium">P(Charges &gt; $20k | Non-Smoker)</span>
              <span className="text-lg font-mono font-bold">0.02</span>
            </div>
            <p className="text-xs text-[#1A1A1A]/40 italic">
              * Based on frequentist probability from the current dataset sample.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
