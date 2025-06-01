// src/app/actions.ts
"use server"; // Marking this entire file for server actions

import type { SynergyFormValues } from '@/components/SynergyForm';
import { analyzeUserInterests as callAnalyzeUserInterests } from '@/ai/flows/synergy-analyzer';
import { interestsData } from '@/data/interests';

export async function analyzeInterestsAction(
  formData: SynergyFormValues
): Promise<{ suggestions: string[] | null; error: string | null }> {
  try {
    const result = await callAnalyzeUserInterests({
      interest1: formData.interest1,
      interest2: formData.interest2,
      interest3: formData.interest3,
      interestsData: JSON.stringify(interestsData),
    });
    if (result && result.suggestions) {
      return { suggestions: result.suggestions, error: null };
    }
    return { suggestions: null, error: "Received unexpected data from AI." };
  } catch (error) {
    console.error("Error analyzing interests:", error);
    let errorMessage = "Failed to analyze interests due to an unexpected error.";
    if (error instanceof Error) {
      errorMessage = `Failed to analyze interests: ${error.message}. Please check server logs.`;
    }
    return { suggestions: null, error: errorMessage };
  }
}
