import { uniqueId } from 'lodash';
import { defaultUserSessionData } from './defaultData';
// Utility function to process files based on file type
export const processFilesUtility = (files, fileType) => {
  if (fileType === 'png') {
    return files.filter(file => file.type === 'png');
  } else if (fileType === 'json') {
    const organizedFiles = files.map(file => ({
      id: getNewPromptId(file.name),
      title: file.name,
      content: file.content,
    }));
    if (
      organizedFiles.length > 0 &&
      organizedFiles[0].title &&
      organizedFiles[0].content
    ) {
      localStorage.setItem('customPrompts', JSON.stringify(organizedFiles));
      return organizedFiles;
    } else {
      console.error('Data structure is not as expected', organizedFiles);
      return [];
    }
  } else if (fileType === 'txt') {
    // Process text files as needed
    // Add more file types processing as needed
    return [];
  } else if (fileType === 'csv') {
    // Process CSV files as needed
    // Add more file types processing as needed
    return [];
  } else if (fileType === 'xlsx') {
    // Process Excel files as needed
    // Add more file types processing as needed
    return [];
  } else if (fileType === 'docx') {
    // Process Word files as needed
    // Add more file types processing as needed
    return [];
  } else if (fileType === 'pptx') {
    // Process PowerPoint files as needed
    // Add more file types processing as needed
    return [];
  } else if (fileType === 'pdf') {
    // Process PDF files as needed
    // Add more file types processing as needed
    return [];
  } else {
    console.error(`Unsupported file type: ${fileType}`);
    return;
  }
};
export const getNewPromptId = file => {
  const id = file.split('/').pop().split('.')[0];
  const idParts = id.split('-');
  return uniqueId(idParts[idParts.length - 1]);
};

export const getLocalUserSessionData = () => {
  const localWorkSpaceData = JSON.parse(
    localStorage.getItem('userSession') || '{}'
  );
  return { ...defaultUserSessionData(), ...localWorkSpaceData };
};

export const setLocalUserSessionData = data => {
  localStorage.setItem('userSession', JSON.stringify(data));
};
