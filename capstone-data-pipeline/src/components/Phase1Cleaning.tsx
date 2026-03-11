import React from "react";
import { RawData } from "../data";
import { CleanedData } from "../pipeline";
import { CheckCircle2, AlertCircle, ArrowRight, Table as TableIcon } from "lucide-react";

interface Props {
  raw: RawData[];
  cleaned: CleanedData[];
  onNext: () => void;
}

export default function Phase1Cleaning({ raw, cleaned, onNext }: Props) {
  const missingBmiCount = raw.filter(d => d.bmi === "missing").length;
  const outlierCount = cleaned.length < raw.length - missingBmiCount ? (raw.length - missingBmiCount) - cleaned.length : 0;

  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-serif italic mb-6">Phase 1: Load, Explore & Clean</h2>
          <p className="text-lg text-[#1A1A1A]/70 leading-relaxed mb-8">
            The first step in any data pipeline is transforming messy, raw data into a reliable foundation. 
            We've loaded the <span className="font-semibold text-[#1A1A1A]">Medical Cost Dataset</span> and applied several cleaning steps.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Missing Value Handling</h3>
                <p className="text-sm text-[#1A1A1A]/60">Identified and removed {missingBmiCount} records with missing BMI values.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <TableIcon size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Type Conversion</h3>
                <p className="text-sm text-[#1A1A1A]/60">Converted string representations of 'age' and 'charges' to numeric formats.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#1A1A1A]/5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Outlier Detection</h3>
                <p className="text-sm text-[#1A1A1A]/60">Capped extreme insurance charges at $50,000 to prevent model skewing.</p>
              </div>
            </div>
          </div>

          <button 
            onClick={onNext}
            className="mt-10 px-8 py-4 bg-[#5A5A40] text-white rounded-2xl font-semibold flex items-center gap-2 hover:bg-[#4A4A30] transition-colors shadow-lg shadow-[#5A5A40]/20 group"
          >
            Proceed to Engineering
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-[#1A1A1A]/10 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm uppercase tracking-widest font-bold text-[#1A1A1A]/40">Data Preview (Cleaned)</h3>
            <span className="text-xs font-mono bg-[#F5F5F0] px-2 py-1 rounded text-[#1A1A1A]/60">
              {cleaned.length} Rows / 7 Columns
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A]/5">
                  <th className="pb-4 font-serif italic text-[#1A1A1A]/50">Age</th>
                  <th className="pb-4 font-serif italic text-[#1A1A1A]/50">Sex</th>
                  <th className="pb-4 font-serif italic text-[#1A1A1A]/50">BMI</th>
                  <th className="pb-4 font-serif italic text-[#1A1A1A]/50">Smoker</th>
                  <th className="pb-4 font-serif italic text-[#1A1A1A]/50">Charges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/5">
                {cleaned.slice(0, 8).map((row, i) => (
                  <tr key={i} className="group hover:bg-[#F5F5F0]/50 transition-colors">
                    <td className="py-3 font-mono">{row.age}</td>
                    <td className="py-3 capitalize">{row.sex}</td>
                    <td className="py-3 font-mono">{row.bmi.toFixed(1)}</td>
                    <td className="py-3">
                      <span className={row.smoker === 'yes' ? 'text-rose-600 font-semibold' : 'text-emerald-600'}>
                        {row.smoker}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[#5A5A40] font-semibold">
                      ${row.charges.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 pt-6 border-t border-[#1A1A1A]/5 text-center">
            <p className="text-xs text-[#1A1A1A]/30 font-medium uppercase tracking-tighter">Showing first 8 representative records</p>
          </div>
        </div>
      </section>
    </div>
  );
}
