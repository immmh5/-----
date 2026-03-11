import { RawData } from "./data";

export interface CleanedData {
  age: number;
  sex: string;
  bmi: number;
  children: number;
  smoker: string;
  region: string;
  charges: number;
}

export interface EngineeredData extends CleanedData {
  is_smoker: number;
  is_female: number;
  bmi_category: string; // Underweight, Normal, Overweight, Obese
  age_group: string; // Youth, Adult, Senior
  charges_per_age: number;
  bmi_smoker_interaction: number;
  scaled_bmi: number;
  scaled_age: number;
}

/**
 * PHASE 1: Data Cleaning
 */
export function cleanData(raw: RawData[]): CleanedData[] {
  return raw
    .filter((d) => d.bmi !== "missing" && d.bmi !== null) // Handle missing values
    .map((d) => ({
      age: Number(d.age),
      sex: String(d.sex),
      bmi: Number(d.bmi),
      children: Number(d.children),
      smoker: String(d.smoker),
      region: String(d.region),
      charges: Number(d.charges),
    }))
    .filter((d) => d.charges < 50000); // Simple outlier removal for demo
}

/**
 * PHASE 2: Feature Engineering
 */
export function engineerFeatures(cleaned: CleanedData[]): EngineeredData[] {
  // Calculate stats for scaling
  const bmis = cleaned.map((d) => d.bmi);
  const ages = cleaned.map((d) => d.age);
  const meanBmi = bmis.reduce((a, b) => a + b, 0) / bmis.length;
  const stdBmi = Math.sqrt(bmis.map(x => Math.pow(x - meanBmi, 2)).reduce((a, b) => a + b, 0) / bmis.length);
  const meanAge = ages.reduce((a, b) => a + b, 0) / ages.length;
  const stdAge = Math.sqrt(ages.map(x => Math.pow(x - meanAge, 2)).reduce((a, b) => a + b, 0) / ages.length);

  return cleaned.map((d) => {
    const is_smoker = d.smoker === "yes" ? 1 : 0;
    
    // BMI Category Binning
    let bmi_category = "Normal";
    if (d.bmi < 18.5) bmi_category = "Underweight";
    else if (d.bmi < 25) bmi_category = "Normal";
    else if (d.bmi < 30) bmi_category = "Overweight";
    else bmi_category = "Obese";

    // Age Group Binning
    let age_group = "Adult";
    if (d.age < 25) age_group = "Youth";
    else if (d.age > 55) age_group = "Senior";

    return {
      ...d,
      is_smoker,
      is_female: d.sex === "female" ? 1 : 0,
      bmi_category,
      age_group,
      charges_per_age: d.charges / (d.age || 1), // Domain feature
      bmi_smoker_interaction: d.bmi * is_smoker, // Interaction feature
      scaled_bmi: (d.bmi - meanBmi) / (stdBmi || 1), // Scaling
      scaled_age: (d.age - meanAge) / (stdAge || 1), // Scaling
    };
  });
}

/**
 * PHASE 3: Math Basics (Manual implementations)
 */
export const mathBasics = {
  mean: (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length,
  std: (arr: number[]) => {
    const m = arr.reduce((a, b) => a + b, 0) / arr.length;
    return Math.sqrt(arr.map(x => Math.pow(x - m, 2)).reduce((a, b) => a + b, 0) / arr.length);
  },
  cosineSimilarity: (vecA: number[], vecB: number[]) => {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }
};
