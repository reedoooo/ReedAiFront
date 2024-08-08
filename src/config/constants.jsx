/* eslint-disable max-len */
// src/variables/constants.js
import { pdfjs } from 'react-pdf';
export const constants = {
  // APP CONFIG
  API_URL: 'http://localhost:3001/api',
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  PDF_WORKER_SRC: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`,
  DEFAULT_LINKEDIN_URL: encodeURI(
    'https://www.linkedin.com/jobs/search/?currentJobId=3917250167&geoId=103644278&keywords=developer%20tcgplayer&location=United%20States&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true'
  ),
  OPENAI_ACCEPTED_FILE_EXTENSIONS: {
    text: [
      '.txt', // Plain text files
      '.csv', // Comma-separated values
      '.json', // JavaScript Object Notation
      '.md', // Markdown files
    ],
    image: [
      '.jpg', // JPEG image files
      '.jpeg', // JPEG image files
      '.png', // Portable Network Graphics
      '.bmp', // Bitmap image files
      '.gif', // Graphics Interchange Format
      '.tiff', // Tagged Image File Format
    ],
    audio: [
      '.wav', // Waveform Audio File Format
      '.mp3', // MPEG-1 Audio Layer III
      '.flac', // Free Lossless Audio Codec
      '.ogg', // Ogg Vorbis audio file
      '.m4a', // MPEG-4 Audio
    ],
    video: [
      '.mp4', // MPEG-4 video files
      '.avi', // Audio Video Interleave
      '.mov', // QuickTime File Format
      '.mkv', // Matroska Video
    ],
  },
  OPENAI_ACCEPTED_FILE_TYPES: {
    text: ['text/plain', 'text/csv', 'application/json', 'text/markdown'],
    image: [
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/bmp',
      'image/gif',
      'image/tiff',
    ],
    audio: ['audio/wav', 'audio/mp3', 'audio/flac', 'audio/ogg', 'audio/m4a'],
    video: ['video/mp4', 'video/avi', 'video/mov', 'video/x-matroska'],
  },
};
export default constants;
