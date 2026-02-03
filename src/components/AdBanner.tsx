import { Wifi, ExternalLink, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AdBanner() {
  return (
    <section className="py-6">
      <div className="container">
        <a 
          href="https://getdatagh.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card to-primary/10 p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(153_100%_50%/0.2)]">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
              {/* Left content */}
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 border border-primary/40 group-hover:scale-110 transition-transform duration-300">
                  <Wifi className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </div>
                
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                      SPONSORED
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide">
                    Need <span className="text-primary">Affordable Data?</span>
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mt-1">
                    Get the best data bundles at unbeatable prices on GetDataGH
                  </p>
                </div>
              </div>

              {/* Right content - CTA */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-warning" />
                  <span>Instant delivery</span>
                </div>
                
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 gap-2 group-hover:gap-3 transition-all duration-300"
                  size="lg"
                >
                  Visit GetDataGH
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
