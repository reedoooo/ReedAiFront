import axios from 'axios';
import { LANGUAGE_VERSIONS } from 'config/data-configs/editor';

const PISTON_API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

export const executeCode = async (language, sourceCode) => {
  const response = await PISTON_API.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};

export default PISTON_API;
