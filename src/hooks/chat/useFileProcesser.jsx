import { uniqueId } from 'lodash';
import mammoth from 'mammoth';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { flattenArrays } from '@/lib/fileUtils';
import constants from 'config/constants';
import { useChatStore } from 'contexts/ChatProvider';
import { useCreateFileHandler } from './useCreateFileHandler';
import useTipTapEditor from './useTipTapEditor';
export const ACCEPTED_FILE_TYPES = [
  'text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/json',
  'text/markdown',
  'application/pdf',
  'text/plain',
].join(',');

const { OPENAI_ACCEPTED_FILE_TYPES, OPENAI_ACCEPTED_FILE_EXTENSIONS } =
  constants;
const readFile = (file, readAs, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = () => callback(fileReader.result);
  fileReader.onerror = error =>
    console.error(`Error reading file ${file.name}:`, error);

  switch (readAs) {
    case 'ArrayBuffer':
      fileReader.readAsArrayBuffer(file);
      break;
    case 'DataURL':
      fileReader.readAsDataURL(file);
      break;
    case 'Text':
      fileReader.readAsText(file);
      break;
    default:
      throw new Error(`Unsupported read type: ${readAs}`);
  }
};

const handleFileType = async (file, fileType, editor, setNewMessageImages) => {
  return new Promise((resolve, reject) => {
    switch (fileType) {
      case 'image':
        readFile(file, 'DataURL', dataUrl => {
          setNewMessageImages(prev => [
            ...prev,
            { name: file.name, url: dataUrl },
          ]);
          resolve(dataUrl);
        });
        break;
      case 'pdf':
        readFile(file, 'ArrayBuffer', arrayBuffer => {
          const content = `PDF file content of ${file.name}`;
          // editor.insertText(content);
          resolve(content);
        });
        break;
      case 'docx':
        readFile(file, 'ArrayBuffer', async arrayBuffer => {
          const { value: content } = await mammoth.extractRawText({
            arrayBuffer,
          });
          // editor.insertText(content);
          resolve(content);
        });
        break;
      case 'text':
        readFile(file, 'Text', text => {
          console.log('TEXT: ', text);
          // editor.insertText(text);
          resolve(text);
        });
        break;
      default:
        reject(new Error('Unsupported file type'));
    }
  });
};

const handleAcceptedFileType = file => {
  const fileExtension = `.${file.name.split('.').pop()}`;
  const acceptedExtensions = flattenArrays(OPENAI_ACCEPTED_FILE_EXTENSIONS);
  const acceptedTypes = flattenArrays(OPENAI_ACCEPTED_FILE_TYPES);

  for (const key in acceptedExtensions) {
    if (
      acceptedExtensions[key].includes(fileExtension) ||
      acceptedTypes[key].includes(file.type)
    ) {
      return key;
    }
  }
  return null;
};

export const useFileProcesser = () => {
  const {
    state: {
      selectedWorkspace,
      profile,
      chatSettings,
      selectedFile,
      files,
      newMessageFiles,
    },
    actions: {
      setNewMessageImages,
      setNewMessageFiles,
      setShowFilesDisplay,
      setFiles,
      setUseRetrieval,
    },
  } = useChatStore();
  //   const { createFile, createDocXFile } = useCreateFileHandler();
  const fileInputRef = useRef();
  const { editor } = useTipTapEditor();

  const handleSelectDeviceFile = async file => {
    // if (!profile || !selectedWorkspace || !chatSettings) return;
    console.log('FILE CHANGED: ', file);

    setShowFilesDisplay(true);
    setUseRetrieval(true);

    if (file) {
      try {
        const fileType = handleAcceptedFileType(file);
        const originalFileType = file.type;
        const fileName = file.name;
        const fileSize = `${(file.size / 1024).toFixed(1)} KB`;
        if (!fileType) {
          console.error(`Unsupported file type ${file.type}`);
          return;
        }
        const newFile = {
          // id: `${fileType}` + uniqueId(file),
          id: 'loading',
          name: fileName,
          type: fileType,
          size: fileSize,
          originalFileType: originalFileType,
          // originalFile: file,
        };
        setNewMessageFiles([...newMessageFiles, newFile]);

        const content = await handleFileType(
          file,
          fileType,
          editor,
          setNewMessageImages
        );

        setFiles([
          ...files,
          {
            ...newFile,
            data: content,
          },
        ]);

        setNewMessageFiles(
          files.map(ile =>
            file.id === 'loading'
              ? {
                  ...newFile,
                  data: content,
                }
              : file
          )
        );
      } catch (error) {
        toast.error(`Failed to upload. ${error.message}`, {
          duration: 10000,
        });
        setNewMessageImages(prev =>
          prev.filter(img => img.messageId !== 'temp')
        );
        setNewMessageFiles(prev => prev.filter(file => file.id !== 'loading'));
      }
    }
  };
  const handleRemoveFile = fileId => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    setNewMessageFiles(prevFiles =>
      prevFiles.filter(file => file.id !== fileId)
    );
    setNewMessageImages(prevImages =>
      prevImages.filter(image => image.messageId !== fileId)
    );
  };
  return {
    handleSelectDeviceFile,
    handleRemoveFile,
    fileInputRef,
  };
};

export default useFileProcesser;
