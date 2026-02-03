import { useSports } from '@/hooks/useMatches';
import { cn } from '@/lib/utils';
import { 
  Dumbbell, 
  Trophy,
  Circle,
  Loader2 
} from 'lucide-react';

const sportIcons: Record<string, React.ReactNode> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  cricket: '🏏',
  hockey: '🏒',
  rugby: '🏉',
  baseball: '⚾',
  golf: '⛳',
  boxing: '🥊',
  mma: '🥋',
  motorsport: '🏎️',
  afl: '🏈',
  darts: '🎯',
};

interface SportTabsProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
}

export function SportTabs({ selectedSport, onSelectSport }: SportTabsProps) {
  const { data: sports, isLoading, error } = useSports();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !sports) {
    return (
      <div className="flex items-center justify-center py-4 text-muted-foreground text-sm">
        Failed to load sports
      </div>
    );
  }

  // Put football first as it's the main sport
  const sortedSports = [...sports].sort((a, b) => {
    if (a.id === 'football') return -1;
    if (b.id === 'football') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2">
      <div className="flex gap-2 min-w-max px-1">
        {sortedSports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => onSelectSport(sport.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "border whitespace-nowrap",
              selectedSport === sport.id
                ? "bg-primary text-primary-foreground border-primary shadow-lg glow-primary"
                : "bg-secondary/50 text-foreground/80 border-border hover:bg-secondary hover:border-primary/50"
            )}
          >
            <span className="text-base">
              {sportIcons[sport.id] || <Circle className="h-4 w-4" />}
            </span>
            <span className="capitalize">{sport.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
