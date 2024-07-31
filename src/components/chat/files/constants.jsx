export const TEXT_MIME_TYPES = [
  'text/plain',
  'text/csv',
  'text/html',
  'text/css',
  'text/javascript',
  'text/xml',
  'application/json',
  'text/markdown',
];
export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];
export const SNIPPET_MARKERS = {
  begin: '----BEGIN-SNIPPET----',
  end: '----END-SNIPPET----',
};
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
];
export const ACCEPTED_FILE_TYPES = [
  'application/json',
  'text/plain',
  'text/javascript',
  'application/javascript',
  'text/jsx',
  'image/png',
  'image/jpeg',
  'image/gif',
  'text/csv',
  'text/markdown',
  'application/pdf',
].join(',');
export const KILO_BYTES_PER_BYTE = 1000;
export const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
