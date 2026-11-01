# Social share images

The user approved the navy margin-column design on 31 October 2026: existing
white logo, a lighter left column with a fine cyan rule and establishment year,
the Firm headline and a supporting descriptor. On 1 November 2026 the user
approved removing the globe lines, leaving uninterrupted deep navy on the right.
There is no photograph or second crest. This approval does not change the site's
publication, client-content or indexing gates.

## Files and dimensions

- `app/opengraph-image.png`: **2400 × 1260**, a 2× export of the 1200 × 630 design.
- `app/twitter-image.png`: **2400 × 1200**, a central crop removing 30 physical
  pixels from the top and bottom of that export, without rescaling the artwork.
- Matching `.alt.txt` files describe the firm and headline.

These are static PNGs, using the same dimensions as iProduce Africa's files.
They do not rely on viewport size, CSS, JavaScript or an image generation service
when a crawler fetches them. The existing 900px-wide logo is drawn at 600 physical
pixels wide; the original vector can replace it later without changing the layout.

The logo and both headline lines fit a central 630 × 630 crop of the design.
This is a stress test, not a guarantee of a particular platform's crop behaviour.

## Editable export master

Run from the repository root:

```bash
node scripts/export-social-images.mjs
```

Open the printed local HTML path in a modern browser. It embeds the repository's
Newsreader and Manrope fonts and white logo; no remote assets are requested.
Once the page reports Ready, download both PNGs and replace the matching files
in `app/`. The generated HTML is a temporary authoring tool, not a public route.
Artwork copy and coordinates are owned by the export script; update them there
when a new design is approved. The script checks the headline's square-crop bounds.

## Metadata ownership

Next.js recognises the root file conventions and serves the images. The shared
helpers in `lib/metadata.ts` explicitly set image URLs, dimensions and alt text
on root and page metadata so replacing a page's Open Graph object cannot lose
the default image. Twitter uses `summary_large_image`, its own 2:1 image, and
the current page's title and description. A future custom page image replaces
both defaults without assuming its MIME type is PNG.

Image URLs use the existing site URL precedence: `NEXT_PUBLIC_SITE_URL`, Vercel
preview/production URLs, then `siteConfig.url`. Set the explicit override to the
origin being tested before building when needed. The configured firm domain
remains a fallback pending confirmation. No domain or deployment was changed.

## Verification and remaining platform checks

`tests/metadata.test.ts` covers default images surviving page metadata replacement,
absolute URLs, matching Twitter page copy, custom-image overrides, PNG signatures,
physical dimensions, size limits and alt text. Run the normal repository checks
and a production build after replacing an export.

On a production server, inspect the HTML with social-crawler user agents and
confirm that the document head contains one absolute `og:image` and `twitter:image`,
the expected dimensions/alt text, and `summary_large_image`. Fetch both referenced
image paths and confirm HTTP 200, `image/png` and matching PNG dimensions. Inspect
a secondary route as well as Home. This checks the application output; spoofing a
user agent locally does not prove that an external service can fetch the deployment.

The current preview intentionally returns `noindex, follow` and a robots policy
with `Disallow: /`. That policy was preserved. External share testing needs an
accessible preview URL, approved crawler access, the correct build-time origin,
and no authentication or firewall blocking the crawler. Do not enable indexing
merely to test a share card. Platform cache refresh and actual WhatsApp/X shares
or a LinkedIn Post Inspector check remain deployment-stage verification.
