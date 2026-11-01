import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Editable master for the approved 1200 × 630 composition. The browser draws
// at 2× resolution, then crops 30 physical pixels from the top and bottom for X.
// No image service, font download or application runtime dependency is needed.
const root = fileURLToPath(new URL("../", import.meta.url));
const output = resolve(process.argv[2] ?? `${tmpdir()}/dm-social-export.html`);
const asset = async (path, mime) =>
  `data:${mime};base64,${await readFile(resolve(root, path), "base64")}`;
const [newsreader, manrope, logo] = await Promise.all([
  asset("app/fonts/newsreader-latin.woff2", "font/woff2"),
  asset("app/fonts/manrope-latin.woff2", "font/woff2"),
  asset("public/brand/logo-white.png", "image/png"),
]);

await writeFile(
  output,
  `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<title>Dikko &amp; Mahmoud social image export</title>
<style>
  body { margin: 24px; background: #f1f5f9; color: #061a2e; font: 16px/1.5 Arial, sans-serif; }
  canvas { display: block; width: min(100%, 1200px); height: auto; margin: 16px 0; }
  button { padding: 10px 16px; font: inherit; }
</style>
<h1>Dikko &amp; Mahmoud social image export</h1>
<p id="status" role="status">Loading local fonts and logo…</p>
<button id="og-download" disabled>Download Open Graph PNG</button>
<button id="twitter-download" disabled>Download Twitter PNG</button>
<canvas id="og" width="2400" height="1260" aria-label="Open Graph image, 2400 by 1260 pixels"></canvas>
<canvas id="twitter" width="2400" height="1200" aria-label="Twitter image, 2400 by 1200 pixels"></canvas>
<script>
  (async () => {
    const newsreader = new FontFace('Social Newsreader', 'url(${newsreader})', { weight: '400 700' });
    const manrope = new FontFace('Social Manrope', 'url(${manrope})', { weight: '400 700' });
    const logo = new Image();
    logo.src = '${logo}';
    await Promise.all([newsreader.load(), manrope.load(), logo.decode()]);
    document.fonts.add(newsreader);
    document.fonts.add(manrope);
    await document.fonts.ready;

    const og = document.getElementById('og');
    const ctx = og.getContext('2d');
    ctx.scale(2, 2);
    ctx.fillStyle = '#061a2e';
    ctx.fillRect(0, 0, 1200, 630);
    ctx.fillStyle = '#0c2946';
    ctx.fillRect(0, 0, 250, 630);
    ctx.strokeStyle = '#527c96';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(249.5, 0);
    ctx.lineTo(249.5, 630);
    ctx.stroke();

    function text(value, x, top, size, family, weight, color, lineHeight, spacing = 0) {
      ctx.font = weight + ' ' + size + 'px "' + family + '"';
      ctx.letterSpacing = spacing + 'px';
      ctx.fillStyle = color;
      ctx.textBaseline = 'alphabetic';
      const metrics = ctx.measureText(value);
      const ascent = metrics.fontBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent;
      const baseline = top + (lineHeight - ascent - descent) / 2 + ascent;
      ctx.fillText(value, x, baseline);
      return x + metrics.width;
    }

    ctx.drawImage(logo, 320, 92, 300, 101);
    const firstRight = text('Built on experience.', 320, 261.6, 62, 'Social Newsreader', 600, '#ffffff', 69.44, -1.02);
    const secondRight = text('Guided by principles.', 320, 331.04, 62, 'Social Newsreader', 600, '#b2e6fa', 69.44, -1.02);
    ctx.fillStyle = '#39bfef';
    ctx.fillRect(320, 442, 72, 2);
    text('Solicitors and Advocates', 320, 474, 22.2, 'Social Manrope', 500, '#d8f3fd', 33.3);
    text('EST.', 72, 469.2, 21.6, 'Social Manrope', 500, '#b2e6fa', 25.92, 1.92);
    text('1993', 72, 495.12, 62.4, 'Social Newsreader', 400, '#b2e6fa', 66.768, -.96);

    if (Math.max(firstRight, secondRight) > 915) {
      throw new Error('Headline exceeds the centre-square crop boundary.');
    }
    const twitter = document.getElementById('twitter');
    twitter.getContext('2d').drawImage(og, 0, 30, 2400, 1200, 0, 0, 2400, 1200);

    function download(canvas, name) {
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = name;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 'image/png');
    }
    document.getElementById('og-download').onclick = () => download(og, 'opengraph-image.png');
    document.getElementById('twitter-download').onclick = () => download(twitter, 'twitter-image.png');
    document.querySelectorAll('button').forEach(button => { button.disabled = false; });
    document.getElementById('status').textContent = 'Ready: PNG exports at 2400 × 1260 and 2400 × 1200. Headline fits the central 630 px square.';
  })().catch(error => { document.getElementById('status').textContent = error.message; });
</script>
</html>`,
);

console.log(`Open ${output} in a browser, then download both PNGs into app/.`);
