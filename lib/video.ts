// Self-hosted files must ship a WebVTT captions file; embeds (YouTube, Vimeo)
// provide captions through their own player.
export type PosterVideo =
  | { kind: "file"; src: string; captions: { src: string; srcLang: string } }
  | { kind: "embed"; src: string };

/** Returns the video only if its URL is safe to load: a local path or http(s). */
export function playableSource(video?: PosterVideo) {
  if (!video?.src.trim()) return null;
  if (video.kind === "file" && /^\/(?!\/)/.test(video.src)) return video;
  try {
    const url = new URL(video.src);
    return url.protocol === "https:" || url.protocol === "http:" ? video : null;
  } catch {
    return null;
  }
}
