import { pxToRem, rgba } from 'assets/themes/functions';

/**
 * Generates a CSS box shadow value based on the provided parameters.
 *
 * @param {number[]} offset - The offset of the shadow in pixels. Defaults to an empty array.
 * @param {number[]} radius - The radius of the shadow in pixels. Defaults to an empty array.
 * @param {string} color - The color of the shadow.
 * @param {number} opacity - The opacity of the shadow.
 * @param {string} [inset=''] - Whether the shadow should be inset. Defaults to an empty string.
 * @returns {string} The generated CSS box shadow value.
 */
function boxShadow(offset = [], radius = [], color, opacity, inset = '') {
  const [x, y] = offset;
  const [blur, spread] = radius;

  return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
    color,
    opacity
  )}`;
}

export default boxShadow;
