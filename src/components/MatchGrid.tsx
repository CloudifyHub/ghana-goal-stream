import { Loader2, AlertCircle, Radio } from 'lucide-react';
import { useMatches } from '@/hooks/useMatches';
import { MatchCard } from './MatchCard';
import { isMatchLive, isMatchUpcoming, type Match } from '@/lib/api';

interface MatchGridProps {
  sport: string;
  onWatch: (match: Match) => void;
  filter?: 'all' | 'live' | 'upcoming';
}

export function MatchGrid({ sport, onWatch, filter = 'all' }: MatchGridProps) {
  const { data: matches, isLoading, error, refetch } = useMatches(sport);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="text-muted-foreground text-sm">Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertCircle className="h-10 w-10 text-destructive" />
        <p className="text-muted-foreground text-sm">Failed to load matches</p>
        <button 
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Radio className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">No matches available</p>
      </div>
    );
  }

  // Filter and sort matches
  let filteredMatches = [...matches];
  
  if (filter === 'live') {
    filteredMatches = filteredMatches.filter(m => isMatchLive(m.date));
  } else if (filter === 'upcoming') {
    filteredMatches = filteredMatches.filter(m => isMatchUpcoming(m.date));
  }

  // Sort: live first, then by date
  filteredMatches.sort((a, b) => {
    const aLive = isMatchLive(a.date);
    const bLive = isMatchLive(b.date);
    if (aLive && !bLive) return -1;
    if (!aLive && bLive) return 1;
    return a.date - b.date;
  });

  if (filteredMatches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <Radio className="h-10 w-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          {filter === 'live' ? 'No live matches right now' : 'No upcoming matches'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredMatches.map((match) => (
        <MatchCard 
          key={match.id} 
          match={match} 
          onWatch={onWatch} 
        />
      ))}
    </div>
  );
}
