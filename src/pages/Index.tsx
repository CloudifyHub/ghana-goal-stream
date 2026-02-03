import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { SportTabs } from '@/components/SportTabs';
import { MatchGrid } from '@/components/MatchGrid';
import { StreamModal } from '@/components/StreamModal';
import { Footer } from '@/components/Footer';
import type { Match } from '@/lib/api';

const Index = () => {
  const [selectedSport, setSelectedSport] = useState('football');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

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
