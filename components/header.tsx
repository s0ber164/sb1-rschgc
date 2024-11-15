import { Camera } from 'lucide-react';
import { ModeToggle } from './mode-toggle';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-8 w-8" />
            <h1 className="text-2xl font-bold">PropSource</h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">Products</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Categories</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </nav>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}