import { Tv, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
            <Tv className="h-5 w-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-live rounded-full animate-pulse-live" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display text-2xl tracking-wider text-foreground">
              LIVESTREAM<span className="text-primary">GH</span>
            </h1>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest -mt-1">
              Ghana's #1 Sports Hub
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#live" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Live Now
          </a>
          <a href="#upcoming" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Upcoming
          </a>
          <a href="#popular" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
            Popular
          </a>
        </nav>

        <button 
          className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden glass border-t border-border/50 animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <a 
              href="#live" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Now
            </a>
            <a 
              href="#upcoming" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Upcoming
            </a>
            <a 
              href="#popular" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Popular
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
