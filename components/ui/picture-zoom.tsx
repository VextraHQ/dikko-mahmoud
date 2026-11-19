/**
 * The one picture hover on the site: the picture zooms 3% over 500ms on the
 * editorial curve, inside a frame that clips it (`overflow-hidden`).
 *
 * Put `group/picture` on whatever should trigger it: the whole card link, or
 * just the picture frame when only the picture should respond. Then put this
 * class on the image, or on a wrapper around it. Keyboard focus on the card
 * zooms it too. Reduced motion keeps the picture still.
 *
 * Lives in a plain (server-safe) file so server and client components can
 * both import the string.
 */
export const pictureZoomClass =
  "motion-safe:ease-editorial motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/picture:scale-[1.03] motion-safe:group-focus-visible/picture:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]";
