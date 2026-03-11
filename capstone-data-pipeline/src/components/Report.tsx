import React from "react";
import { RawData } from "../data";
import { CleanedData, EngineeredData } from "../pipeline";
import { FileText, CheckCircle2, Award, TrendingUp } from "lucide-react";

interface Props {
  raw: RawData[];
  cleaned: CleanedData[];
  engineered: EngineeredData[];
}

export default function Report({ raw, cleaned, engineered }: Props) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-12 rounded-[40px] shadow-2xl border border-[#1A1A1A]/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A5A40]/5 rounded-bl-full" />
      
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-5xl font-serif italic mb-2">Final Report</h2>
          <p className="text-[#1A1A1A]/40 uppercase tracking-[0.2em] text-[10px] font-bold">Capstone Project Submission</p>
        </div>
        <div className="w-16 h-16 bg-[#5A5A40] rounded-2xl flex items-center justify-center text-white">
          <Award size={32} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-[#F5F5F0] rounded-3xl">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/30 mb-2">Raw Records</p>
          <p className="text-3xl font-mono font-bold">{raw.length}</p>
        </div>
        <div className="text-center p-6 bg-[#F5F5F0] rounded-3xl">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/30 mb-2">Cleaned Records</p>
          <p className="text-3xl font-mono font-bold">{cleaned.length}</p>
        </div>
        <div className="text-center p-6 bg-[#F5F5F0] rounded-3xl">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/30 mb-2">New Features</p>
          <p className="text-3xl font-mono font-bold">8</p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h3 className="text-xl font-serif italic mb-4 flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={20} />
            Executive Summary
          </h3>
          <p className="text-[#1A1A1A]/70 leading-relaxed">
            This project successfully built a data analysis pipeline for the Medical Cost dataset. 
            Through systematic cleaning, we removed missing values and outliers, ensuring high data quality. 
            Our feature engineering phase introduced interaction terms and normalized scales, which revealed 
            that smoking status is the single most significant predictor of healthcare costs, especially 
            when combined with high BMI.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-serif italic mb-4 flex items-center gap-3">
            <TrendingUp className="text-blue-600" size={20} />
            Key Findings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border border-[#1A1A1A]/10 rounded-2xl">
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tighter">The Smoker Penalty</h4>
              <p className="text-sm text-[#1A1A1A]/60">Smokers pay an average of 4x more in insurance charges compared to non-smokers.</p>
            </div>
            <div className="p-5 border border-[#1A1A1A]/10 rounded-2xl">
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tighter">BMI Threshold</h4>
              <p className="text-sm text-[#1A1A1A]/60">Charges remain relatively stable until BMI exceeds 30, where costs begin to climb sharply.</p>
            </div>
            <div className="p-5 border border-[#1A1A1A]/10 rounded-2xl">
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tighter">Age Correlation</h4>
              <p className="text-sm text-[#1A1A1A]/60">Every year of age adds approximately $250 to the base insurance premium.</p>
            </div>
            <div className="p-5 border border-[#1A1A1A]/10 rounded-2xl">
              <h4 className="font-bold text-sm mb-2 uppercase tracking-tighter">Regional Variance</h4>
              <p className="text-sm text-[#1A1A1A]/60">Minimal variance was found across regions, suggesting standardized pricing models.</p>
            </div>
          </div>
        </section>

        <section className="pt-12 border-t border-[#1A1A1A]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#1A1A1A]/40">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest">Project Certified</p>
                <p className="text-[10px] text-[#1A1A1A]/40">ML Foundations Bootcamp 2026</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-serif italic text-[#1A1A1A]/40">Submitted by</p>
              <p className="font-bold text-sm uppercase tracking-widest">Capstone Student</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
