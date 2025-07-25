
'use server';
/**
 * @fileOverview An AI agent for checking drug interactions.
 *
 * - checkDrugInteractions - A function that handles the drug interaction checking process.
 * - DrugInteractionInput - The input type for the checkDrugInteractions function.
 * - DrugInteractionOutput - The return type for the checkDrugInteractions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DrugInteractionInputSchema = z.object({
  drugs: z.array(z.string()).describe('A list of drug names to check for interactions.'),
});
export type DrugInteractionInput = z.infer<typeof DrugInteractionInputSchema>;

const InteractionResultSchema = z.object({
    severity: z.enum(['High', 'Moderate', 'Low', 'None']).describe('The severity of the interaction.'),
    description: z.string().describe('A detailed description of the potential interaction.'),
    recommendation: z.string().describe('A recommendation for the user, e.g., "Consult your doctor."'),
});

const DrugInteractionOutputSchema = z.object({
  interactions: z.array(InteractionResultSchema).describe('A list of found interactions.'),
  summary: z.string().describe('A general summary of the findings.'),
});
export type DrugInteractionOutput = z.infer<typeof DrugInteractionOutputSchema>;


export async function checkDrugInteractions(input: DrugInteractionInput): Promise<DrugInteractionOutput> {
  return drugInteractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'drugInteractionPrompt',
  input: {schema: DrugInteractionInputSchema},
  output: {schema: DrugInteractionOutputSchema},
  prompt: `You are an expert pharmacologist AI assistant. Your role is to provide clear, accurate, and easy-to-understand information about potential drug interactions.

  You will be given a list of drugs. Analyze them for any potential interactions.

  For each pair of drugs, determine if an interaction exists. If it does, provide the following:
  1.  **Severity**: Classify the interaction as 'High', 'Moderate', 'Low', or 'None'.
  2.  **Description**: Clearly explain the nature of the interaction.
  3.  **Recommendation**: Provide a clear course of action, such as "Consult your doctor or pharmacist before taking these together" or "It is generally safe, but monitor for symptoms."

  If no significant interactions are found between any pairs, return an empty interactions array and a summary stating that no major interactions were found.

  ALWAYS include a disclaimer in your summary that this tool is for informational purposes only and does not replace professional medical advice.

  List of drugs to check:
  {{#each drugs}}
  - {{{this}}}
  {{/each}}
`,
});

const drugInteractionFlow = ai.defineFlow(
  {
    name: 'drugInteractionFlow',
    inputSchema: DrugInteractionInputSchema,
    outputSchema: DrugInteractionOutputSchema,
  },
  async input => {
    if (input.drugs.length < 2) {
        return {
            interactions: [],
            summary: "Please enter at least two drugs to check for interactions."
        }
    }
    const {output} = await prompt(input);
    return output!;
  }
);
