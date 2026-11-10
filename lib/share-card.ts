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
  { name: "Newsreader", file: "app/fonts/share/newsreader.ttf", weight: 400 },
  { name: "Manrope", file: "app/fonts/share/manrope.ttf", weight: 600 },
] as const;

async function readOptional(file: string) {
  try {
    const data = await readFile(join(process.cwd(), file));
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
      const data = await readOptional(font.file);
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
