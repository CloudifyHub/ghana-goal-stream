// Streamed.pk API Integration

const API_BASE = 'https://streamed.pk/api';

export interface Team {
  name: string;
  badge: string;
}

export interface MatchSource {
  source: string;
  id: string;
}

export interface Match {
  id: string;
  title: string;
  category: string;
  date: number;
  poster?: string;
  popular: boolean;
  teams?: {
    home?: Team;
    away?: Team;
  };
  sources: MatchSource[];
}

export interface Stream {
  id: string;
  streamNo: number;
  language: string;
  hd: boolean;
  embedUrl: string;
  source: string;
}

export interface Sport {
  id: string;
  name: string;
}

// Fetch all sports categories
export async function fetchSports(): Promise<Sport[]> {
  const response = await fetch(`${API_BASE}/sports`);
  if (!response.ok) throw new Error('Failed to fetch sports');
  return response.json();
}

// Fetch matches for a specific sport
export async function fetchMatchesBySport(sport: string): Promise<Match[]> {
  const response = await fetch(`${API_BASE}/matches/${sport}`);
  if (!response.ok) throw new Error('Failed to fetch matches');
  return response.json();
}

// Fetch popular matches for a sport
export async function fetchPopularMatches(sport: string): Promise<Match[]> {
  const response = await fetch(`${API_BASE}/matches/${sport}/popular`);
  if (!response.ok) throw new Error('Failed to fetch popular matches');
  return response.json();
}

// Fetch all matches
export async function fetchAllMatches(): Promise<Match[]> {
  const response = await fetch(`${API_BASE}/matches/all`);
  if (!response.ok) throw new Error('Failed to fetch all matches');
  return response.json();
}

// Fetch streams for a match
export async function fetchStreams(source: string, id: string): Promise<Stream[]> {
  const response = await fetch(`${API_BASE}/stream/${source}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch streams');
  return response.json();
}

// Get badge image URL
export function getBadgeUrl(badge: string): string {
  if (!badge) return '';
  return `${API_BASE}/images/badge/${badge}.webp`;
}

// Get poster image URL
export function getPosterUrl(poster: string): string {
  if (!poster) return '';
  return `${API_BASE}/images/proxy/${poster}.webp`;
}

// Check if match is live (within 3 hours of start time)
export function isMatchLive(date: number): boolean {
  const now = Date.now();
  const matchTime = date;
  const threeHours = 3 * 60 * 60 * 1000;
  return now >= matchTime && now <= matchTime + threeHours;
}

// Check if match is upcoming (starts within 24 hours)
export function isMatchUpcoming(date: number): boolean {
  const now = Date.now();
  const dayFromNow = now + 24 * 60 * 60 * 1000;
  return date > now && date <= dayFromNow;
}

// Format match time
export function formatMatchTime(date: number): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Format match date
export function formatMatchDate(date: number): string {
  const matchDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (matchDate.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (matchDate.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }

  return matchDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
