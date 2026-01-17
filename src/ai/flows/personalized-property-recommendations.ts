'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { properties as allProperties } from '@/lib/data';
import type { Property } from '@/lib/types';

const PropertySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  location: z.string(),
  beds: z.number(),
  baths: z.number(),
  sqft: z.number(),
  imageIds: z.array(z.string()),
  features: z.array(z.string()),
});

const RecommendationInputSchema = z.array(PropertySchema);

const RecommendationOutputSchema = z.object({
    recommendedPropertyIds: z.array(z.string()).describe("An array of property IDs that you recommend for the user, selected from the available properties. Should be between 3 and 6 properties.")
});


export async function personalizedPropertyRecommendations(
  likedProperties: Property[]
): Promise<Property[]> {
  if (!likedProperties || likedProperties.length === 0) {
    // If no liked properties, return some popular ones as a fallback
    return allProperties.slice(0, 3);
  }

  const result = await recommendPropertiesFlow({ likedProperties, allProperties });

  if (!result || !result.recommendedPropertyIds) {
    return [];
  }

  // Ensure we don't recommend something they already liked
  const likedIds = new Set(likedProperties.map(p => p.id));
  const recommendedIds = result.recommendedPropertyIds.filter(id => !likedIds.has(id));

  const recommended = allProperties.filter(p => recommendedIds.includes(p.id));
  
  // Ensure we return something, even if AI fails
  if (recommended.length === 0) {
    return allProperties.slice(0,3).filter(p => !likedIds.has(p.id));
  }
  
  return recommended;
}

const recommendationPrompt = ai.definePrompt({
    name: 'propertyRecommenderPrompt',
    input: { schema: z.object({ likedProperties: RecommendationInputSchema, allProperties: RecommendationInputSchema }) },
    output: { schema: RecommendationOutputSchema },
    prompt: `You are a world-class real estate expert for luxury properties.
A user has liked the following properties:
--- LIKED PROPERTIES ---
{{#each likedProperties}}
- {{title}} in {{location}} for $\{{price}} ({{features}})
{{/each}}
---

Based on these preferences, analyze their taste in terms of location, style, price, and features.

Here is a list of all available properties for you to choose from:
--- AVAILABLE PROPERTIES ---
{{#each allProperties}}
- ID: {{id}}, Title: {{title}}, Location: {{location}}, Price: $\{{price}}
{{/each}}
---

From the list of AVAILABLE PROPERTIES, recommend 3 to 6 properties that the user would most likely be interested in. Do not recommend properties they have already liked.
`,
});


const recommendPropertiesFlow = ai.defineFlow(
  {
    name: 'recommendPropertiesFlow',
    inputSchema: z.object({ likedProperties: RecommendationInputSchema, allProperties: RecommendationInputSchema }),
    outputSchema: RecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);
