'use server';
/**
 * @fileOverview Generates a portrait image from a text prompt using Genkit and Gemini 2.0 Flash.
 *
 * - generatePortraitFromPrompt - A function that generates a portrait image based on a text prompt.
 * - GeneratePortraitFromPromptInput - The input type for the generatePortraitFromPrompt function.
 * - GeneratePortraitFromPromptOutput - The return type for the generatePortraitFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePortraitFromPromptInputSchema = z.object({
  prompt: z.string().describe('The text prompt describing the portrait to generate.'),
});
export type GeneratePortraitFromPromptInput = z.infer<typeof GeneratePortraitFromPromptInputSchema>;

const GeneratePortraitFromPromptOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated portrait image as a data URI that includes a MIME type and uses Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type GeneratePortraitFromPromptOutput = z.infer<typeof GeneratePortraitFromPromptOutputSchema>;

export async function generatePortraitFromPrompt(
  input: GeneratePortraitFromPromptInput
): Promise<GeneratePortraitFromPromptOutput> {
  return generatePortraitFromPromptFlow(input);
}

const generatePortraitPrompt = ai.definePrompt({
  name: 'generatePortraitPrompt',
  input: {schema: GeneratePortraitFromPromptInputSchema},
  output: {schema: GeneratePortraitFromPromptOutputSchema},
  prompt: `Generate a portrait image based on the following prompt: {{{prompt}}}. The image should be a realistic portrait.`, // Corrected typo here
});

const generatePortraitFromPromptFlow = ai.defineFlow(
  {
    name: 'generatePortraitFromPromptFlow',
    inputSchema: GeneratePortraitFromPromptInputSchema,
    outputSchema: GeneratePortraitFromPromptOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {imageDataUri: media.url!};
  }
);
