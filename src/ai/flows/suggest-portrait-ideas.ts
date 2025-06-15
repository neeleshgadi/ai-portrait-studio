'use server';

/**
 * @fileOverview Provides portrait ideas based on trending styles.
 *
 * - suggestPortraitIdeas - A function that suggests portrait ideas.
 * - SuggestPortraitIdeasInput - The input type for the suggestPortraitIdeas function.
 * - SuggestPortraitIdeasOutput - The return type for the suggestPortraitIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPortraitIdeasInputSchema = z.object({
  numberOfSuggestions: z
    .number()
    .default(3)
    .describe('The number of portrait ideas to generate.'),
});
export type SuggestPortraitIdeasInput = z.infer<typeof SuggestPortraitIdeasInputSchema>;

const SuggestPortraitIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('An array of portrait ideas.'),
});
export type SuggestPortraitIdeasOutput = z.infer<typeof SuggestPortraitIdeasOutputSchema>;

export async function suggestPortraitIdeas(
  input: SuggestPortraitIdeasInput
): Promise<SuggestPortraitIdeasOutput> {
  return suggestPortraitIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPortraitIdeasPrompt',
  input: {schema: SuggestPortraitIdeasInputSchema},
  output: {schema: SuggestPortraitIdeasOutputSchema},
  prompt: `You are a creative portrait idea generator. Provide {{numberOfSuggestions}} unique and interesting portrait ideas based on trending styles. Return as a JSON array of strings.

Do not number them.

Ideas:`,
});

const suggestPortraitIdeasFlow = ai.defineFlow(
  {
    name: 'suggestPortraitIdeasFlow',
    inputSchema: SuggestPortraitIdeasInputSchema,
    outputSchema: SuggestPortraitIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
