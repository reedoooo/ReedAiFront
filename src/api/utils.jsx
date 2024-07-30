// import request from '@/utils/request/axios';

/**
 * Fetches a file from the server and returns a blob URL.
 *
 * @param {string} filePath - The path to the file on the server.
 * @returns {Promise<string>} - A promise that resolves to the blob URL of the file.
 */
const fetchFile = async filePath => {
  try {
    const response = await fetch(filePath, {
      responseType: 'blob',
    });
    const fileBlobUrl = URL.createObjectURL(response.data);
    return fileBlobUrl;
  } catch (error) {
    throw new Error('Failed to fetch file');
  }
};

export default fetchFile;
