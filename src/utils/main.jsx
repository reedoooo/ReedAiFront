import clsx from 'clsx';

/**
 * Creates a CDN link for an image file.
 * -- Explained -- A CDN link is a URL that points to a file on a remote server. This function creates a CDN link for an image file.
 * @param {string} filename - The name of the image file.
 * @returns {string} The CDN link for the image file.
 */
export const createImageCdnLink = filename => {
  return `https://cdn.jsdelivr.net/gh/reedoooo/assets@main/${filename}`;
};

/**
 * Combines class names using clsx, tailored for Material-UI.
 * @param  {...any} inputs - The class names to combine.
 * @returns {string} The combined class names.
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Formats a date to a readable string.
 * @param {string|number|Date} input - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(input) {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Extracts the media type from a data URL.
 * @param {string} dataURL - The data URL to parse.
 * @returns {string|null} The media type, or null if not found.
 */
export function getMediaTypeFromDataURL(dataURL) {
  const matches = dataURL.match(/^data:([A-Za-z-+/]+);base64/);
  return matches ? matches[1] : null;
}

/**
 * Extracts the base64 string from a data URL.
 * @param {string} dataURL - The data URL to parse.
 * @returns {string|null} The base64 string, or null if not found.
 */
export function getBase64FromDataURL(dataURL) {
  const matches = dataURL.match(/^data:[A-Za-z-+/]+;base64,(.*)$/);
  return matches ? matches[1] : null;
}

/**
 * Converts a base64 string to a Blob.
 */
export const convertBlobToBase64 = async blob =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
