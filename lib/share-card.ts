import { readFile } from "node:fs/promises";
import { join } from "node:path";

// SERVER ONLY: reads files for the generated share images.

type ShareFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: "normal";
};

/**
 * The image generator reads TTF or OTF only, not the site's woff2 files, so
 * these are static TTF copies of the brand fonts (Google Fonts, SIL Open Font
 * License). A missing file falls back to the generator's built-in sans.
 */
const fontFiles = [
  { name: "Newsreader", file: "newsreader.ttf", weight: 400 },
  { name: "Manrope", file: "manrope.ttf", weight: 600 },
] as const;

// The folder is written out in full so the build can tell which files this
// reads. A fully dynamic path would pull the whole project into the server.
async function readShareFont(file: string) {
  try {
    const data = await readFile(join(process.cwd(), "app/fonts/share", file));
    return data.buffer.slice(
      data.byteOffset,
      data.byteOffset + data.byteLength,
    ) as ArrayBuffer;
  } catch {
    return undefined;
  }
}

let assets: Promise<{ logo: string; fonts: ShareFont[] }> | undefined;

/** The white logo (as a data URL) and whichever brand fonts are available. */
export function loadShareCardAssets() {
  assets ??= (async () => {
    const logo = await readFile(
      join(process.cwd(), "public/brand/logo-white.png"),
    );
    const fonts: ShareFont[] = [];
    for (const font of fontFiles) {
      const data = await readShareFont(font.file);
      if (data)
        fonts.push({
          name: font.name,
          data,
          weight: font.weight,
          style: "normal",
        });
    }
    return {
      logo: `data:image/png;base64,${logo.toString("base64")}`,
      fonts,
    };
  })();
  return assets;
}
