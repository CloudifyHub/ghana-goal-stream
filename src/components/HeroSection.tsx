import { Tv, Play, Zap, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Sports Streaming</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-4 animate-fade-in">
            WATCH <span className="text-gradient">FOOTBALL</span>
            <br />
            LIVE & FREE
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in">
            Stream all major football leagues, tournaments, and matches in HD quality. 
            No registration required.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <a
              href="#matches"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 glow-primary"
            >
              <Play className="h-5 w-5 fill-current" />
              Watch Now
            </a>
            <a
              href="#popular"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-foreground rounded-xl font-semibold border border-border hover:bg-secondary/80 transition-colors"
            >
              <Globe className="h-5 w-5" />
              Browse All Sports
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 animate-fade-in">
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl text-primary mb-1">100+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Daily Matches</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl text-primary mb-1">15+</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Sports</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl md:text-4xl text-primary mb-1">HD</p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
