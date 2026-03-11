import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { EngineeredData } from "../pipeline";

interface Props {
  data: EngineeredData[];
}

const COLORS = ['#5A5A40', '#8E9299', '#D1D1D1', '#1A1A1A'];

export default function Phase3EDA({ data }: Props) {
  // Prepare data for charts
  const bmiCategoryData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(d => {
      counts[d.bmi_category] = (counts[d.bmi_category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [data]);

  const chargesByAgeGroup = React.useMemo(() => {
    const groups: Record<string, { total: number, count: number }> = {};
    data.forEach(d => {
      if (!groups[d.age_group]) groups[d.age_group] = { total: 0, count: 0 };
      groups[d.age_group].total += d.charges;
      groups[d.age_group].count += 1;
    });
    return Object.entries(groups).map(([name, val]) => ({
      name,
      avgCharge: Math.round(val.total / val.count)
    }));
  }, [data]);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-serif italic mb-4">Phase 3: Visual Storytelling</h2>
        <p className="text-[#1A1A1A]/60">
          Exploratory Data Analysis (EDA) allows us to see the patterns that numbers alone might hide. 
          Here we explore the relationships between lifestyle, age, and healthcare costs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: BMI Distribution */}
        <div className="bg-white p-8 rounded-[32px] border border-[#1A1A1A]/10 shadow-sm">
          <h3 className="text-lg font-serif italic mb-6">BMI Category Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bmiCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bmiCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-[#1A1A1A]/50 italic">
            Insight: The majority of the sample falls into the 'Obese' and 'Overweight' categories, reflecting common trends in modern healthcare datasets.
          </p>
        </div>

        {/* Chart 2: Average Charges by Age Group */}
        <div className="bg-white p-8 rounded-[32px] border border-[#1A1A1A]/10 shadow-sm">
          <h3 className="text-lg font-serif italic mb-6">Average Charges by Age Group</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chargesByAgeGroup}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#F5F5F0' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="avgCharge" fill="#5A5A40" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-[#1A1A1A]/50 italic">
            Insight: As expected, healthcare costs rise significantly with age, with Seniors averaging nearly double the costs of Youth.
          </p>
        </div>

        {/* Chart 3: BMI vs Charges Scatter */}
        <div className="bg-white p-8 rounded-[32px] border border-[#1A1A1A]/10 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-serif italic mb-6">BMI vs. Insurance Charges (Smoker Status)</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis type="number" dataKey="bmi" name="BMI" unit="" axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="charges" name="Charges" unit="$" axisLine={false} tickLine={false} />
                <ZAxis type="category" dataKey="smoker" name="Smoker" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Scatter name="Non-Smokers" data={data.filter(d => d.smoker === 'no')} fill="#8E9299" opacity={0.6} />
                <Scatter name="Smokers" data={data.filter(d => d.smoker === 'yes')} fill="#5A5A40" />
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-sm text-[#1A1A1A]/50 italic">
            Insight: There is a clear "dual-track" relationship. For non-smokers, BMI has a mild impact on charges. For smokers, however, high BMI leads to exponentially higher costs.
          </p>
        </div>
      </div>
    </div>
  );
}
