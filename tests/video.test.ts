import { describe, expect, it } from "vitest";

import { playableSource, type PosterVideo } from "@/lib/video";

const captions = { src: "/videos/about.vtt", srcLang: "en" };

describe("playableSource", () => {
  it("accepts a local file path", () => {
    const video: PosterVideo = {
      kind: "file",
      src: "/videos/about.mp4",
      captions,
    };
    expect(playableSource(video)).toBe(video);
  });

  it("accepts an https embed", () => {
    const video: PosterVideo = {
      kind: "embed",
      src: "https://player.vimeo.com/video/1",
    };
    expect(playableSource(video)).toBe(video);
  });

  it("rejects missing or blank sources", () => {
    expect(playableSource()).toBeNull();
    expect(playableSource({ kind: "embed", src: "  " })).toBeNull();
  });

  it("rejects unsafe or malformed URLs", () => {
    expect(
      playableSource({ kind: "embed", src: "javascript:alert(1)" }),
    ).toBeNull();
    expect(playableSource({ kind: "embed", src: "not a url" })).toBeNull();
  });

  it("rejects protocol-relative paths for files", () => {
    expect(
      playableSource({ kind: "file", src: "//evil.example/v.mp4", captions }),
    ).toBeNull();
  });
});
