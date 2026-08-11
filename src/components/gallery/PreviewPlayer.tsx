"use client";
import { useRef, useState } from "react";
import { Play, Pause, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PreviewPlayer({
  videoSrc,
  posterSrc,
  autoPlay = true,
}: {
  videoSrc?: string;
  posterSrc?: string;
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(autoPlay);

  if (!videoSrc) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
        No preview available
      </div>
    );
  }

  return (
    <div className="group relative aspect-video overflow-hidden rounded-lg bg-black">
      <video
        ref={ref}
        src={videoSrc}
        poster={posterSrc}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 h-full w-full object-contain object-center"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        aria-label={playing ? "Pause preview" : "Play preview"}
        onClick={() => {
          if (!ref.current) return;
          if (playing) ref.current.pause();
          else ref.current.play();
        }}
        className="absolute bottom-3 left-3 rounded-full bg-black/60 p-2 text-white backdrop-blur transition-opacity hover:bg-black/80"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="default"
      onClick={async () => {
        await navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
      {copied ? "Copied!" : "Copy Prompt"}
    </Button>
  );
}
