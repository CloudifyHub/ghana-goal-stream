import { Tv, Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30">
                <Tv className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-2xl tracking-wider text-foreground">
                LIVESTREAM<span className="text-primary">GH</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Your ultimate destination for free live sports streaming. Watch football, basketball, 
              tennis, and more from the comfort of your home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#live" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Live Matches
                </a>
              </li>
              <li>
                <a href="#upcoming" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Upcoming
                </a>
              </li>
              <li>
                <a href="#popular" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Popular
                </a>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Top Sports</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">⚽ Football</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">🏀 Basketball</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">🎾 Tennis</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">🏏 Cricket</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LivestreamGH. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-live fill-current" /> in Ghana
          </p>
        </div>
      </div>
    </footer>
  );
}
