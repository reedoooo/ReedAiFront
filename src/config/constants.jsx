/* eslint-disable max-len */
// src/variables/constants.js
import { pdfjs } from 'react-pdf';
export const constants = {
  // APP CONFIG
  API_URL: 'http://localhost:3001/api',
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_PROJECT_KEY,
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
  ACCEPTED_FILE_TYPES: [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/json',
    'text/markdown',
    'application/pdf',
    'text/plain',
  ].join(','),
  FILE_DESCRIPTION_MAX: 100,
  FILE_NAME_MAX: 25,
  PROMPT_NAME_MAX: 100,
  PROMPT_CONTENT_MAX: 100000,
  // Assistant
  ASSISTANT_NAME_MAX: 100,
  ASSISTANT_DESCRIPTION_MAX: 500,
  ASSISTANT_PROMPT_MAX: 100000,

  // Tools
  TOOL_NAME_MAX: 100,
  TOOL_DESCRIPTION_MAX: 500,
  LOCAL_STORAGE_KEYS: {
    USER_SESSION: 'userSession',
    CUSTOMS_PROMPTS: 'customPrompts',
  },
  LOCAL_STORAGE_CHAT_KEYS: {
    WORKSPACES_SLICE: 'workspaceStore',
    CHAT_SESSIONS_SLICE: 'chatSessionStore',
    ASSISTANTS_SLICE: 'assistantStore',
    PROMPTS_SLICE: 'promptStore',
    MODELS_SLICE: 'modelStore',
    TOOLS_SLICE: 'toolStore',
    FOLDERS_SLICE: 'folderStore',
    PRESETS_SLICE: 'presetStore',
    FILES_SLICE: 'fileStore',
  },
  ERROR_TYPES: {
    ACTION_UNAUTHORIZED: 'The user is unauthorized',
    ACTION_NOT_FOUND: 'Resource Not Found',
    ACTION_INTERNAL_SERVER: 'Internal Server Error',
    ACTION_BAD_GATEWAY: 'Bad Gateway',
    ACTION_SERVICE_UNAVAILABLE: 'The service is unavailable',
    ACTION_REQUEST_TIMED_OUT: 'Request Timed Out',
    ACTION_TOO_MANY: 'Too Many Requests',
    ACTION_INSUFFICIENT_STORAGE: 'Insuffucient Storage',
    ACTION_INVALID_INPUT: 'Invalid Input',
    ACTION_INVALID_CREDENTIALS: 'Invalid Credentials',
    ACTION_INVALID_TOKEN: 'Invalid Token',
    ACTION_INVALID_REFRESH_TOKEN: 'Invalid Refresh Token',
    ACTION_INVALID_URL: 'Invalid URL',
  },
};
export default constants;
