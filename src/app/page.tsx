import { PortraitGenerator } from "@/components/portrait-generator";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center font-headline tracking-tight">
        Welcome to the <span className="text-primary">AI Portrait Studio</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl">
        Unleash your creativity! Describe your vision, choose a style, and let our AI craft a unique portrait for you.
      </p>
      <PortraitGenerator />
    </div>
  );
}
