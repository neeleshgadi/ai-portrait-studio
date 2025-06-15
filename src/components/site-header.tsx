import { Brush } from 'lucide-react';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Brush className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block font-headline">AI Portrait Studio</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {/* Add nav links here if needed later */}
        </nav>
      </div>
    </header>
  );
}
