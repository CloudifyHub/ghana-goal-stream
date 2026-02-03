import { Play, Clock, Star, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  type Match, 
  getBadgeUrl, 
  isMatchLive, 
  formatMatchTime, 
  formatMatchDate 
} from '@/lib/api';

interface MatchCardProps {
  match: Match;
  onWatch: (match: Match) => void;
}

export function MatchCard({ match, onWatch }: MatchCardProps) {
  const live = isMatchLive(match.date);
  const homeTeam = match.teams?.home;
  const awayTeam = match.teams?.away;

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300",
        "bg-gradient-to-br from-card to-card/80 border border-border/50",
        "hover:border-primary/50 hover:shadow-lg hover:-translate-y-1",
        live && "border-live/50 animate-glow-pulse"
      )}
    >
      {/* Live badge */}
      {live && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-live text-white text-xs font-semibold">
          <Wifi className="h-3 w-3 animate-pulse-live" />
          LIVE
        </div>
      )}

      {/* Popular badge */}
      {match.popular && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium">
          <Star className="h-3 w-3 fill-current" />
          HOT
        </div>
      )}

      <div className="p-5">
        {/* Match info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatMatchDate(match.date)}</span>
          <span className="text-primary">•</span>
          <span className={cn(live && "text-live font-medium")}>
            {live ? "Live Now" : formatMatchTime(match.date)}
          </span>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-4 mb-5">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center text-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-secondary/50 p-2 flex items-center justify-center overflow-hidden">
              {homeTeam?.badge ? (
                <img 
                  src={getBadgeUrl(homeTeam.badge)} 
                  alt={homeTeam.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                  {homeTeam?.name?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground line-clamp-2">
              {homeTeam?.name || 'TBD'}
            </span>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-2xl text-muted-foreground">VS</span>
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center text-center gap-2">
            <div className="w-16 h-16 rounded-xl bg-secondary/50 p-2 flex items-center justify-center overflow-hidden">
              {awayTeam?.badge ? (
                <img 
                  src={getBadgeUrl(awayTeam.badge)} 
                  alt={awayTeam.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                  {awayTeam?.name?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-foreground line-clamp-2">
              {awayTeam?.name || 'TBD'}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="text-xs text-muted-foreground capitalize mb-4 text-center">
          {match.category}
        </div>

        {/* Watch button */}
        <button
          onClick={() => onWatch(match)}
          disabled={match.sources.length === 0}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg",
            "font-semibold text-sm transition-all duration-200",
            live
              ? "bg-live hover:bg-live/90 text-white"
              : "bg-primary hover:bg-primary/90 text-primary-foreground",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Play className="h-4 w-4 fill-current" />
          {live ? "Watch Live" : "Watch"}
        </button>
      </div>
    </div>
  );
}
