"use client";

import { Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { EditorialCover } from "@/components/shared/editorial-cover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { playableSource, type PosterVideo } from "@/lib/video";

// A facade: the player (and its network requests) exists only after activation.
export function VideoPoster({
  poster,
  video,
  title,
  className,
  sizes = "100vw",
}: {
  poster: { src: string | null; alt: string };
  video?: PosterVideo;
  title: string;
  className?: string;
  sizes?: string;
}) {
  const source = playableSource(video);
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const file = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (playing) (frame.current ?? file.current)?.focus();
  }, [playing]);
  return (
    <div
      data-video-poster
      className={cn(
        "bg-secondary relative isolate overflow-hidden rounded-xl",
        className,
      )}
    >
      {playing && source ? (
        <>
          {source.kind === "embed" ? (
            <iframe
              ref={frame}
              src={source.src}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <video
              ref={file}
              src={source.src}
              aria-label={title}
              tabIndex={0}
              controls
              autoPlay
              preload="none"
              className="absolute inset-0 size-full bg-black object-contain"
            >
              <track
                kind="captions"
                src={source.captions.src}
                srcLang={source.captions.srcLang}
                label="Captions"
                default
              />
            </video>
          )}
          <Button
            variant="inverse"
            size="icon"
            aria-label="Close video"
            className="absolute top-3 right-3"
            onClick={() => {
              setPlaying(false);
              requestAnimationFrame(() => trigger.current?.focus());
            }}
          >
            <X aria-hidden="true" />
          </Button>
        </>
      ) : (
        <>
          <ImageWithFallback
            src={poster.src}
            alt={poster.alt}
            fill
            sizes={sizes}
            className="object-cover"
            fallback={<EditorialCover />}
          />
          {source && (
            <Button
              ref={trigger}
              data-video-play
              variant="glass"
              size="icon"
              aria-label={`Play ${title}`}
              onClick={() => setPlaying(true)}
              className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
            >
              <Play aria-hidden="true" className="size-5" />
            </Button>
          )}
        </>
      )}
      <noscript>
        <style>{`[data-video-play] { display: none; }`}</style>
      </noscript>
    </div>
  );
}
