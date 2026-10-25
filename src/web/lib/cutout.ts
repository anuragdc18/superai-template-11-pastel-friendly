/**
 * How cut-out people are drawn.
 *
 * false = the photos have a WHITE background → it is hidden with mix-blend-mode: multiply
 *         (works on the light pastel backgrounds this template uses).
 * true  = the photos are TRANSPARENT PNGs → they get a white sticker outline + soft shadow.
 *
 * After cutting the photos out to transparent PNGs, set this to true.
 */
export const CUTOUT_TRANSPARENT = true;
