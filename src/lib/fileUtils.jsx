// src/libs/fileUtils.js
import api from './api';
import {
  FaFile,
  FaFileAlt,
  FaFileCsv,
  FaFileWord,
  FaFilePdf,
  FaFileImage,
  FaFileCode,
  FaFileAudio,
  FaRegFile,
} from 'react-icons/fa';

/**
 * Read the contents of a file as text.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} - The file contents as text.
 */
export const readFileAsText = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

/**
 * Read the contents of a file as data URL.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} - The file contents as a data URL.
 */
export const readFileAsDataURL = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

/**
 * Read the contents of a file as ArrayBuffer.
 * @param {File} file - The file to read.
 * @returns {Promise<ArrayBuffer>} - The file contents as an ArrayBuffer.
 */
export const readFileAsArrayBuffer = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Read the contents of a file as BinaryString.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} - The file contents as a BinaryString.
 */
export const readFileAsBinaryString = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsBinaryString(file);
  });
};

/**
 * Get the current date in the format "YYYY-MM-DD".
 * @returns {string} - The current date in the format "YYYY-MM-DD".
 * */
export function genTempDownloadLink(imgUrl) {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = imgUrl;
  // generate a file name, chat-shot-2021-08-01.png
  const ts = getCurrentDate();
  tempLink.setAttribute('download', `chat-shot-${ts}.png`);
  if (typeof tempLink.download === 'undefined')
    tempLink.setAttribute('target', '_blank');
  return tempLink;
}

/**
 * Convert HTML content to a PDF.
 * @param {string} htmlContent - The HTML content to convert.
 * @param {string} [fileName] - The name to save the PDF as.
 * @returns {Promise<void>}
 */
export const downloadPDF = async (htmlContent, fileName) => {
  const container = document.createElement('div');
  container.innerHTML = htmlContent;
  document.body.appendChild(container);
  try {
    const canvas = await html2canvas(container, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
      scale: 2, // Improve resolution
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    let heightLeft = imgHeight;
    let position = 0;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      if (heightLeft > 0) {
        pdf.addPage();
      }
      heightLeft -= pageHeight;
    }
    pdf.save(fileName || 'MyCoverLetter.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    document.body.removeChild(container); // Clean up
  }
};
/**
 * Download a file from the server.
 * @param {string} url - The URL to download the file from.
 * @param {string} fileName - The name to save the file as.
 * @returns {Promise<void>}
 */
export const downloadFile = async (fileId, onDownloadProgress, reqType) => {
  try {
    const reqUrl =
      reqType === 'chat'
        ? `/chat/files/download/${fileId}`
        : `/files/download/${fileId}`;
    const data = await apiUtils.get(reqUrl, {
      responseType: 'blob',
      onDownloadProgress: event => {
        const progress = Math.round((100 * event.loaded) / event.total);
        onDownloadProgress(progress);
      },
    });

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file_name'); // Replace with the actual file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('File download error:', error);
    throw error;
  }
};

/**
 * Upload a file to the server.
 * @param {string} url - The URL to upload the file to.
 * @param {File} file - The file to upload.
 * @param {Object} [additionalData] - Additional data to send with the file.
 * @returns {Promise<Object>} - The server response.
 */
export const uploadFile = async (
  file,
  additionalData = {},
  onUploadProgress,
  reqType
) => {
  const formData = new FormData();
  formData.append('file', file);

  // Append additional data if provided
  Object.keys(additionalData).forEach(key => {
    formData.append(key, additionalData[key]);
  });
  const url = reqType === 'chat' ? '/chat/files/uploadChat' : '/files/upload';
  try {
    const data = await apiUtils.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: event => {
        const progress = Math.round((100 * event.loaded) / event.total);
        onUploadProgress(progress);
      },
    });
    return data;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};
/**
 * Structure a file for a message.
 * @param {File} file - The file to structure.
 * @returns {FormData} - The structured file for a message.
 */
export const structureFileForMessage = file => {
  console.log('Uploading file:', file);
  const { API_URL } = constants;
  const url = `${API_URL}/upload/single`;
  const additionalData = {
    filename: file.name,
    filesize: file.size,
    filetype: file.type,
  };
  const formData = new FormData();
  formData.append('file', file);

  // Append additional data if provided
  Object.keys(additionalData).forEach(key => {
    formData.append(key, additionalData[key]);
  });

  return formData;
};
/**
 * Check if the file type is allowed.
 * @param {File} file - The file to check.
 * @param {Array<string>} allowedTypes - An array of allowed MIME types.
 * @returns {boolean} - True if the file type is allowed, false otherwise.
 */
export const isFileTypeAllowed = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

/**
 * Get the file extension from the file name.
 * @param {string} fileName - The name of the file.
 * @returns {string} - The file extension.
 */
export const getFileExtension = props => {
  console.log('fileName:', fileName);
  return fileName?.split('.').pop().toLowerCase();
};

/**
 * Get the file name from a URL.
 * @param {string} url - The URL of the file.
 * @returns {string} - The file name.
 */
export const getFileNameFromUrl = url => {
  const fileName = url.split('/').pop();
  return fileName;
};

/**
 * Get the file size in bytes.
 * @param {File} file - The file to check.
 * @returns {number} - The file size in bytes.
 *
 * Note: This function uses the FileReader API to read the file's contents, which is not
 * recommended for large files. Use with caution.
 */
export const getFileSize = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.length);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Convert a base64 string to a Blob.
 * @param {string} base64Data - The base64 string to convert.
 * @param {string} fileType - The MIME type of the converted Blob.
 * @returns {Blob} - The converted Blob.
 */
export const base64ToBlob = (base64Data, fileType) => {
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    view[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: fileType });
};

/**
 * Handles the change event of a file input element.
 * @param {Event} event - The change event.
 * @returns {File} - The selected file.
 */
export const handleFileChange = event => {
  const file = event.target.files[0];
  return file;
};

/**
 * Generate a unique ID for a file.
 * @returns {string} - The unique ID.
 */
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const insertTextAtCursorPosition = (editor, text) => {
  if (editor) {
    editor.commands.insertContent(text);
  }
};

export const processFile = async file => {
  const acceptedExt = flattenArrays(data.OPENAI_ACCEPTED_FILE_EXTENSIONS);
  const acceptedType = flattenArrays(data.OPENAI_ACCEPTED_FILE_TYPES);
  try {
    if (file.type.startsWith('image/')) {
      await handleImageFile(file, fileDataRef, setFiles);
    } else if (file.type === 'application/pdf') {
      await handlePDFFile(file, editor);
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      await handleDocxFile(file, editor);
    } else {
      await handleTextFile(file, editor);
    }
  } catch (error) {
    console.error(`Error processing file ${file.name}:`, error);
  }
};

export const flattenArrays = obj => {
  const flattened = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      flattened[key] = [];
      for (const innerKey in obj[key]) {
        if (obj[key].hasOwnProperty(innerKey)) {
          flattened[key] = flattened[key].concat(obj[key][innerKey]);
        }
      }
    }
  }

  return flattened;
};

export const handleTextFile = async (file, editor) => {
  try {
    const textContent = await readFileAsText(file);
    const formattedText = `File: ${file.name}:\n${SNIPPET_MARKERS.begin}\n${textContent}\n${SNIPPET_MARKERS.end}\n`;
    insertTextAtCursorPosition(editor, formattedText);
    if (editor) {
      editor.commands.focus();
      editor.commands.setTextSelection(editor.state.doc.content.size);
    }
  } catch (error) {
    console.error('Error reading text file:', error);
  }
};

export const handleImageFile = async (file, fileDataRef, setFiles) => {
  if (fileDataRef.current.length >= 5) {
    console.warn('Maximum number of images reached');
    return;
  }

  try {
    const dataUrl = await readFileAsDataURL(file);
    const fileData = {
      data: dataUrl,
      type: file.type,
      source: 'filename',
      filename: file.name,
      path: file.path,
    };
    fileDataRef.current = [...fileDataRef.current, fileData];
    setFiles(prevFiles => [...prevFiles, fileData]);
  } catch (error) {
    console.error('Error processing image file:', error);
  }
};

export const handlePDFFile = async (file, editor) => {
  try {
    const placeholderText = `[PDF File: ${file.name}]`;
    insertTextAtCursorPosition(editor, placeholderText);
  } catch (error) {
    console.error('Error processing PDF file:', error);
  }
};

export const handleDocxFile = async (file, editor) => {
  try {
    const placeholderText = `[DOCX File: ${file.name}]`;
    insertTextAtCursorPosition(editor, placeholderText);
  } catch (error) {
    console.error('Error processing DOCX file:', error);
  }
};

export const FileIcon = ({ type, size = 32, iconColor = '#BDBDBD' }) => {
  if (type.includes('image')) {
    return <FaFileImage size={size} color={iconColor} />;
  } else if (type.includes('pdf')) {
    return <FaFilePdf size={size} color={iconColor} />;
  } else if (type.includes('csv')) {
    return <FaFileCsv size={size} color={iconColor} />;
  } else if (type.includes('docx')) {
    return <FaFileWord size={size} color={iconColor} />;
  } else if (type.includes('plain')) {
    return <FaFileAlt size={size} color={iconColor} />;
  } else if (type.includes('json')) {
    return <FaFileCode size={size} color={iconColor} />;
  } else if (type.includes('markdown')) {
    return <FaRegFile size={size} color={iconColor} />;
  } else if (type.includes('txt')) {
    return <FaRegFile size={size} color={iconColor} />;
  } else {
    return <FaFile size={size} />;
  }
};

export const convertNestedObjectToArray = nestedObj =>
  Object.keys(nestedObj).map(key => nestedObj[key]);

export const convertBytesToKB = bytes =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

export const preprocessImage = async (file, callback) => {
  if (!file) return;

  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxLongerDimension = 2000;
  const maxSmallerDimension = 768;

  const originalWidth = imageBitmap.width;
  const originalHeight = imageBitmap.height;

  // Log original size
  // console.log(`Original Image Size: ${originalWidth}x${originalHeight}`);

  // Determine the longer and smaller dimensions
  const isWidthLonger = originalWidth >= originalHeight;
  const longerDimension = isWidthLonger ? originalWidth : originalHeight;
  const smallerDimension = isWidthLonger ? originalHeight : originalWidth;

  // Calculate the scaling factor
  const longerDimensionScale =
    longerDimension > maxLongerDimension
      ? maxLongerDimension / longerDimension
      : 1;
  const smallerDimensionScale =
    smallerDimension > maxSmallerDimension
      ? maxSmallerDimension / smallerDimension
      : 1;

  // Choose the smaller scaling factor to ensure both dimensions are within limits
  const scaleFactor = Math.min(longerDimensionScale, smallerDimensionScale);

  // Calculate new dimensions and round them down to the nearest integer
  const newWidth = Math.floor(originalWidth * scaleFactor);
  const newHeight = Math.floor(originalHeight * scaleFactor);

  // Ensure canvas dimensions are set correctly for the aspect ratio
  canvas.width = newWidth;
  canvas.height = newHeight;

  // Draw the image to the canvas with new dimensions
  ctx?.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

  // Log new size
  // console.log(`Resized Image Size: ${newWidth}x${newHeight}`);

  canvas.toBlob(blob => {
    if (!blob) return;
    const reader = new FileReader();
    reader.onload = loadEvent => {
      const base64Data = loadEvent.target?.result;
      callback(base64Data, file);
    };
    reader.readAsDataURL(blob);
  }, file.type);
};
