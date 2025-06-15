"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generatePortraitFromPrompt, GeneratePortraitFromPromptOutput } from "@/ai/flows/generate-portrait-from-prompt";
import { Loader2, Palette, Wand2, Hash, Image as ImageIcon, AlertTriangle } from "lucide-react";

const formSchema = z.object({
  prompt: z.string().min(5, {
    message: "Prompt must be at least 5 characters.",
  }).max(200, {
    message: "Prompt must be at most 200 characters.",
  }),
  style: z.string({
    required_error: "Please select a style.",
  }),
  seed: z.coerce.number().int().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const availableStyles = [
  { value: "photorealistic", label: "Photorealistic" },
  { value: "impressionistic", label: "Impressionistic" },
  { value: "surreal", label: "Surreal" },
  { value: "anime", label: "Anime" },
  { value: "pixel_art", label: "Pixel Art" },
  { value: "fantasy", label: "Fantasy Art" },
  { value: "sci-fi", label: "Sci-Fi Art" },
  { value: "watercolor", label: "Watercolor" },
  { value: "sketch", label: "Sketch" },
  { value: "van_gogh", label: "Van Gogh" },
];

export function PortraitGenerator() {
  const [isPending, startTransition] = useTransition();
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "",
      seed: Math.floor(Math.random() * 100000), // Default random seed
    },
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    setGeneratedImage(null);

    startTransition(async () => {
      try {
        const fullPrompt = `A portrait in the style of ${values.style}: ${values.prompt}. Seed: ${values.seed || 'random'}.`;
        
        const result : GeneratePortraitFromPromptOutput = await generatePortraitFromPrompt({ prompt: fullPrompt });

        if (result.imageDataUri) {
          setGeneratedImage(result.imageDataUri);
          toast({
            title: "Portrait Generated!",
            description: "Your unique AI portrait is ready.",
          });
        } else {
          throw new Error("AI did not return an image.");
        }
      } catch (e: any) {
        console.error("Error generating portrait:", e);
        const errorMessage = e.message || "Failed to generate portrait. Please try again.";
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: errorMessage,
        });
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Create Your AI Portrait</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-lg"><Wand2 className="h-5 w-5 text-primary" />Describe Your Vision</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., A futuristic cyborg with glowing eyes" {...field} className="text-base" />
                    </FormControl>
                    <FormDescription>
                      Enter a detailed text prompt for your portrait.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg"><Palette className="h-5 w-5 text-primary" />Choose a Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Select an artistic style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableStyles.map((style) => (
                            <SelectItem key={style.value} value={style.value} className="text-base">
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the LoRA/style for the image.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-lg"><Hash className="h-5 w-5 text-primary" />Seed (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter a number for reproducible results" {...field} className="text-base" />
                      </FormControl>
                      <FormDescription>
                        A specific seed ensures consistent image generation. Leave blank or use 0 for random.
                        (Note: Current AI flow may not fully utilize this.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full text-lg py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Portrait"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isPending || generatedImage || error) && (
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Generated Portrait</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[500px] p-4">
            {isPending && (
              <div className="flex flex-col items-center text-muted-foreground">
                <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
                <p className="text-xl">Generating your masterpiece...</p>
                <p>This might take a moment.</p>
              </div>
            )}
            {error && !isPending && (
              <div className="flex flex-col items-center text-destructive p-4 border border-destructive rounded-md bg-destructive/10">
                <AlertTriangle className="h-12 w-12 mb-3" />
                <p className="text-xl font-semibold">Oops! Something went wrong.</p>
                <p className="text-center">{error}</p>
              </div>
            )}
            {generatedImage && !isPending && !error && (
              <div className="w-full max-w-lg aspect-square relative rounded-lg overflow-hidden border-2 border-primary shadow-2xl">
                <Image
                  src={generatedImage}
                  alt="Generated AI Portrait"
                  layout="fill"
                  objectFit="contain"
                  data-ai-hint="portrait painting"
                />
              </div>
            )}
            {!generatedImage && !isPending && !error && (
               <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="h-24 w-24 text-border mb-4" />
                <p className="text-xl">Your generated portrait will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
