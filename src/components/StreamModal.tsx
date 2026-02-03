import { useState, useEffect } from 'react';
import { X, Monitor, Loader2, AlertCircle, ExternalLink, Tv, Play, Maximize2, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStreams } from '@/hooks/useMatches';
import type { Match, Stream } from '@/lib/api';

interface StreamModalProps {
  match: Match | null;
  onClose: () => void;
}

export function StreamModal({ match, onClose }: StreamModalProps) {
  const [selectedSourceIndex, setSelectedSourceIndex] = useState(0);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);

  const currentSource = match?.sources[selectedSourceIndex];
  
  const { data: streams, isLoading, error } = useStreams(
    currentSource?.source || '',
    currentSource?.id || '',
    !!currentSource
  );

  // Reset selected stream when streams change
  useEffect(() => {
    if (streams && streams.length > 0) {
      setSelectedStream(streams[0]);
    } else {
      setSelectedStream(null);
    }
  }, [streams]);

  if (!match) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-card rounded-2xl border border-border overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tv className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl text-foreground">{match.title}</h2>
              <p className="text-xs text-muted-foreground capitalize">{match.category}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading streams...</p>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-sm text-muted-foreground text-center">
                Failed to load streams. Please try another source.
              </p>
            </div>
          ) : selectedStream ? (
            <iframe
              src={selectedStream.embedUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={match.title}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <Monitor className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center">
                No streams available for this match
              </p>
            </div>
          )}
        </div>

        {/* Stream Controls */}
        <div className="p-4 border-t border-border bg-secondary/20">
          {/* Source Tabs */}
          {match.sources.length > 1 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Sources</p>
              <div className="flex flex-wrap gap-2">
                {match.sources.map((source, index) => (
                  <button
                    key={`${source.source}-${source.id}`}
                    onClick={() => setSelectedSourceIndex(index)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium uppercase transition-colors",
                      selectedSourceIndex === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                    )}
                  >
                    {source.source}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stream Quality Options */}
          {streams && streams.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Stream Quality</p>
              <div className="flex flex-wrap gap-2">
                {streams.map((stream) => (
                  <button
                    key={stream.id}
                    onClick={() => setSelectedStream(stream)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                      selectedStream?.id === stream.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                    )}
                  >
                    <Play className="h-3 w-3" />
                    <span>Stream {stream.streamNo}</span>
                    {stream.hd && (
                      <span className="px-1.5 py-0.5 rounded bg-success/20 text-success text-[10px] font-bold">
                        HD
                      </span>
                    )}
                    <span className="text-muted-foreground">{stream.language}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* External link */}
          {selectedStream && (
            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
              <a
                href={selectedStream.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Open in new tab
              </a>
            </div>
          )}

          {/* GetDataGH Ad */}
          <a
            href="https://getdatagh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between gap-4 p-3 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Wifi className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Need Data to Stream?</p>
                <p className="text-xs text-muted-foreground">Get affordable data bundles at GetDataGH</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-semibold group-hover:bg-primary/90 transition-colors whitespace-nowrap">
              Buy Now
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
