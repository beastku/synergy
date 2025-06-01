// src/ai/flows/synergy-analyzer.ts
'use server';

/**
 * @fileOverview Analyzes user interests and suggests potential career paths or activities.
 *
 * - analyzeUserInterests - A function that handles the analysis of user interests.
 * - AnalyzeUserInterestsInput - The input type for the analyzeUserInterests function.
 * - AnalyzeUserInterestsOutput - The return type for the analyzeUserInterests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUserInterestsInputSchema = z.object({
  interest1: z.string().describe('The first interest.'),
  interest2: z.string().describe('The second interest.'),
  interest3: z.string().describe('The third interest.'),
  interestsData: z.string().describe('A JSON string containing all possible interests, domains and careers.'),
});
export type AnalyzeUserInterestsInput = z.infer<typeof AnalyzeUserInterestsInputSchema>;

const AnalyzeUserInterestsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of potential career paths or activities at the intersection of the three interests.'
    ),
});
export type AnalyzeUserInterestsOutput = z.infer<typeof AnalyzeUserInterestsOutputSchema>;

export async function analyzeUserInterests(
  input: AnalyzeUserInterestsInput
): Promise<AnalyzeUserInterestsOutput> {
  return analyzeUserInterestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUserInterestsPrompt',
  input: {schema: AnalyzeUserInterestsInputSchema},
  output: {schema: AnalyzeUserInterestsOutputSchema},
  prompt: `You are an expert career counselor. You are helping a user identify potential career paths or activities that lie at the intersection of their three main interests.

  The user's interests are:
  1. {{{interest1}}}
  2. {{{interest2}}}
  3. {{{interest3}}}

  Available interests, domains, and career data:
  {{{interestsData}}}

  Based on these interests, suggest potential career paths or activities that combine these interests. Prioritize career paths or activities that incorporate elements from all three interests, then those that combine two interests, and finally those that relate to only one interest. Give suggestions that are very specific and concrete. Do not suggest very generic things.

  Return a JSON array of suggestions.
`,
});

const analyzeUserInterestsFlow = ai.defineFlow(
  {
    name: 'analyzeUserInterestsFlow',
    inputSchema: AnalyzeUserInterestsInputSchema,
    outputSchema: AnalyzeUserInterestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
