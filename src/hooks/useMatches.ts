import { useQuery } from '@tanstack/react-query';
import { 
  fetchSports, 
  fetchMatchesBySport, 
  fetchPopularMatches,
  fetchStreams,
  type Sport,
  type Match,
  type Stream
} from '@/lib/api';

export function useSports() {
  return useQuery<Sport[]>({
    queryKey: ['sports'],
    queryFn: fetchSports,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMatches(sport: string) {
  return useQuery<Match[]>({
    queryKey: ['matches', sport],
    queryFn: () => fetchMatchesBySport(sport),
    staleTime: 60 * 1000, // 1 minute
    refetchInterval: 60 * 1000, // Auto-refresh every minute
  });
}

export function usePopularMatches(sport: string) {
  return useQuery<Match[]>({
    queryKey: ['matches', sport, 'popular'],
    queryFn: () => fetchPopularMatches(sport),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}

export function useStreams(source: string, id: string, enabled: boolean = true) {
  return useQuery<Stream[]>({
    queryKey: ['streams', source, id],
    queryFn: () => fetchStreams(source, id),
    enabled: enabled && !!source && !!id,
    staleTime: 30 * 1000, // 30 seconds
  });
}
