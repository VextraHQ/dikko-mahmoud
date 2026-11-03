# Insights stock-photo references

Planning shortlist · 3 November 2026. These are source references, not downloaded
runtime assets or claims about the firm. The user requested stock imagery for the
Insights layout preview. Photo pages were checked; crop previews are still to be
reviewed in the implementation batch. No WebP export has been performed.

## Initial shortlist

- **Business preparation / agreements:** [Scott Graham, working over papers](https://unsplash.com/photos/person-holding-pencil-near-laptop-computer-5fNmWej4tAA).
  Neutral document/work detail; a useful first cover for commercial content.
  Source: Grenoble, France; never describe it as the firm's office or Nigerian clients.
- **Nigerian commercial context:** [Nupo Deyon Daniel, Civic Towers, Lekki, Lagos](https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-9ySEZ-ugtJA).
  A genuinely Lagos-labelled source, rather than labelling an unrelated city Lagos.
  Check the tower remains legible at card and split-hero crops before selecting.
- **Research / legal reading:** [Courtney Baucom, library shelves](https://unsplash.com/photos/brown-wooden-book-shelves-inside-library-7CRHpP9j53U).
  Source: Charlotte, US; use as an abstract research image, not the firm's library.

All three photo pages identify their images as free under the
[Unsplash licence](https://unsplash.com/license). Keep the photographer/photo URL
with the chosen source. The initial technology search also surfaced premium or
inaccessible results; no specific technology image is selected yet. Select a free,
verifiable technology/energy image during implementation instead of borrowing an
unverified image from a search thumbnail.

## Selection and crop review

Use the presets in [the route contract](routes/insights.md#media-and-cropping-contract):
16:10 cards, 4:3 feature/detail and 1.91:1 social. Assess subject retention and
negative space at mobile and desktop widths. Record per-use focal points and use
a separate hero source when one original cannot serve every crop. Avoid artificial
overlays baked into the asset; presentation colours belong in the component.

For each chosen runtime asset, record original URL, photographer, licence, local
original/derivative paths, dimensions, alt, credit, focal point and contexts used.
Keep originals. Choose/replace temporary sources **before** bulk WebP conversion;
see [the media gate](media-review.md). Future Sanity uploads retain the original
and its crop/hotspot metadata rather than flattening to a guessed centre crop.

## Runtime set · 3 November 2026 (demo layout only)

Eighteen free [Unsplash](https://unsplash.com/license) photographs, 1800px-wide
JPG (about 4.6 MB for the new fifteen), so archive pages never repeat an image.
Credits, source URLs, dimensions, alt text and focal points live once in
`insightImages` (`content/insight-articles.ts`); cards show the credit. None
depicts the firm, its people, clients or offices. Replace with approved imagery
before launch; WebP conversion is still pending.

| File                   | Photographer                      | Photo       |
| ---------------------- | --------------------------------- | ----------- |
| working-papers.jpg     | Scott Graham                      | 5fNmWej4tAA |
| lagos.jpg              | Nupo Deyon Daniel                 | 9ySEZ-ugtJA |
| research-library.jpg   | Courtney Baucom                   | 7CRHpP9j53U |
| signing-document.jpg   | Jakub Żerdzicki                   | QI6NLgN5XnM |
| document-review.jpg    | Olena Kholina                     | MhqUBTxQ3Hw |
| handshake.jpg          | Sebastian Herrmann                | NbtIDoFKGO8 |
| lekki-aerial.jpg       | Nupo Deyon Daniel                 | 67ruAEYmp4c |
| lekki-ikoyi-bridge.jpg | Tunde Buremo                      | kF0-RhpHhRA |
| victoria-island.jpg    | Malik Buraimoh                    | EMjpo0YjHPw |
| pump-jack.jpg          | Zbynek Burival                    | GrmwVnVSSdU |
| refinery.jpg           | Red Shuheart                      | Wb4vcBqyGT8 |
| boardroom.jpg          | Benjamin Child                    | GWe0dlVD9e0 |
| meeting-room.jpg       | Aakriti Raina                     | HRsi-QzS3zw |
| solar-field.jpg        | American Public Power Association | 513dBrMJ_5w |
| gavel.jpg              | Wesley Tingey                     | TdNLjGXVH3s |
| property-keys.jpg      | Jakub Żerdzicki                   | t0CRdNl_mTg |
| server-rack.jpg        | Kevin Ache                        | 2JJ3wBHu4_0 |
| cranes.jpg             | EJ Yao                            | D46mXLsQRJw |
