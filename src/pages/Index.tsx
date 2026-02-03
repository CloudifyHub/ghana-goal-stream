import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SportTabs } from '@/components/SportTabs';
import { MatchGrid } from '@/components/MatchGrid';
import { StreamModal } from '@/components/StreamModal';
import { Footer } from '@/components/Footer';
import { AdBanner } from '@/components/AdBanner';
import type { Match } from '@/lib/api';

const Index = () => {
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleWatch = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleCloseModal = () => {
    setSelectedMatch(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* Ad Banner */}
        <AdBanner />

        {/* Main Content */}
        <section id="matches" className="py-12">
          <div className="container">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                  LIVE & UPCOMING MATCHES
                </h2>
                <p className="text-muted-foreground">
                  Select a sport to view available streams
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search teams or matches..."
                  className="w-full pl-12 pr-10 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sport Tabs */}
            <div className="mb-8">
              <SportTabs 
                selectedSport={selectedSport}
                onSelectSport={setSelectedSport}
              />
            </div>

            {/* Match Grid */}
            <MatchGrid 
              sport={selectedSport}
              onWatch={handleWatch}
              searchQuery={searchQuery}
            />
          </div>
        </section>
      </main>

      <Footer />

      {/* Stream Modal */}
      <StreamModal 
        match={selectedMatch}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
