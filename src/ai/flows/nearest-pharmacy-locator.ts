'use server';
/**
 * @fileOverview A geolocation AI agent.
 *
 * - locateNearestPharmacy - A function that handles the geolocation process.
 * - LocateNearestPharmacyInput - The input type for the locateNearestPharmacy function.
 * - LocateNearestPharmacyOutput - The return type for the locateNearestPharmacy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocateNearestPharmacyInputSchema = z.object({
  latitude: z.number().describe('The latitude of the user.'),
  longitude: z.number().describe('The longitude of the user.'),
});
export type LocateNearestPharmacyInput = z.infer<typeof LocateNearestPharmacyInputSchema>;

const LocateNearestPharmacyOutputSchema = z.object({
  pharmacyName: z.string().describe('The name of the nearest pharmacy.'),
  pharmacyAddress: z.string().describe('The address of the nearest pharmacy.'),
  pharmacyPhoneNumber: z.string().describe('The phone number of the nearest pharmacy.'),
});
export type LocateNearestPharmacyOutput = z.infer<typeof LocateNearestPharmacyOutputSchema>;

export async function locateNearestPharmacy(input: LocateNearestPharmacyInput): Promise<LocateNearestPharmacyOutput> {
  return locateNearestPharmacyFlow(input);
}

const locateNearestPharmacyTool = ai.defineTool({
  name: 'getNearestPharmacy',
  description: 'Returns the nearest pharmacy to the given coordinates.',
  inputSchema: LocateNearestPharmacyInputSchema,
  outputSchema: LocateNearestPharmacyOutputSchema,
},
async (input) => {
    // TODO: Replace with actual implementation to fetch nearest pharmacy from a database or API
    // For now, return a mock pharmacy
    return {
      pharmacyName: 'E-parma Pharmacy',
      pharmacyAddress: '123 Test Street, Lagos, Nigeria',
      pharmacyPhoneNumber: '+234 800 000 0000',
    };
  }
);

const locateNearestPharmacyPrompt = ai.definePrompt({
  name: 'locateNearestPharmacyPrompt',
  tools: [locateNearestPharmacyTool],
  input: {schema: LocateNearestPharmacyInputSchema},
  output: {schema: LocateNearestPharmacyOutputSchema},
  prompt: `You are a geolocation expert specializing in finding the nearest pharmacy to a user.

  Given the user's latitude and longitude, you will use the getNearestPharmacy tool to find the nearest pharmacy.

  Latitude: {{{latitude}}}
  Longitude: {{{longitude}}}

  Output the pharmacy name, address, and phone number.
`,
});

const locateNearestPharmacyFlow = ai.defineFlow(
  {
    name: 'locateNearestPharmacyFlow',
    inputSchema: LocateNearestPharmacyInputSchema,
    outputSchema: LocateNearestPharmacyOutputSchema,
  },
  async input => {
    const {output} = await locateNearestPharmacyPrompt(input);
    return output!;
  }
);
