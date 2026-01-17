'use server';

/**
 * @fileOverview A personalized property recommendation AI agent.
 *
 * - getPersonalizedPropertyRecommendations - A function that retrieves personalized property recommendations.
 * - PersonalizedPropertyRecommendationsInput - The input type for the getPersonalizedPropertyRecommendations function.
 * - PersonalizedPropertyRecommendationsOutput - The return type for the getPersonalizedPropertyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPropertyRecommendationsInputSchema = z.object({
  userBrowsingHistory: z
    .array(z.string())
    .describe('An array of property IDs representing the user browsing history.'),
  userSavedProperties: z
    .array(z.string())
    .describe('An array of property IDs representing the user saved properties.'),
  allPropertyFeatures: z.record(z.any()).describe('A record of all properties and their features.'),
  numberOfRecommendations: z
    .number()
    .default(5)
    .describe('The number of personalized property recommendations to return.'),
});
export type PersonalizedPropertyRecommendationsInput = z.infer<
  typeof PersonalizedPropertyRecommendationsInputSchema
>;

const PersonalizedPropertyRecommendationsOutputSchema = z.object({
  recommendedPropertyIds: z
    .array(z.string())
    .describe('An array of property IDs representing the personalized property recommendations.'),
});
export type PersonalizedPropertyRecommendationsOutput = z.infer<
  typeof PersonalizedPropertyRecommendationsOutputSchema
>;

export async function getPersonalizedPropertyRecommendations(
  input: PersonalizedPropertyRecommendationsInput
): Promise<PersonalizedPropertyRecommendationsOutput> {
  return personalizedPropertyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPropertyRecommendationsPrompt',
  input: {
    schema: PersonalizedPropertyRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedPropertyRecommendationsOutputSchema,
  },
  prompt: `You are an expert real estate recommendation agent.

  Based on the user's browsing history and saved properties, you will provide
  personalized property recommendations from the list of all properties.

  User Browsing History: {{userBrowsingHistory}}
  User Saved Properties: {{userSavedProperties}}
  All Property Features: {{allPropertyFeatures}}

  Prioritize properties that are similar to the user's browsing history and saved properties.

  Return {{numberOfRecommendations}} property IDs in the recommendedPropertyIds array.
  `,
});

const personalizedPropertyRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedPropertyRecommendationsFlow',
    inputSchema: PersonalizedPropertyRecommendationsInputSchema,
    outputSchema: PersonalizedPropertyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
