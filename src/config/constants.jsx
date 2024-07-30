/* eslint-disable max-len */
// src/variables/constants.js
import { pdfjs } from 'react-pdf';

export const constants = {
  API_URL: import.meta.env.VITE_API_URL,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL,
  // SERVER_URL: import.meta.env.REACT_APP_SERVER_URL,
  PDF_WORKER_SRC: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`,
  DEFAULT_LINKEDIN_URL: encodeURI(
    'https://www.linkedin.com/jobs/search/?currentJobId=3917250167&geoId=103644278&keywords=developer%20tcgplayer&location=United%20States&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true'
  ),
};
export default constants;
