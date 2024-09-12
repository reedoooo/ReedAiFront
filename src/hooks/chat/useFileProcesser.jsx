import mammoth from 'mammoth';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import { flattenArrays } from '@/lib/fileUtils';
import constants from 'config/constants';
import { useChatStore } from 'contexts';
import { useTipTapEditor } from 'hooks';
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

export const useFileProcesser = () => {
  const {
    state: { files, chatFiles, newMessageFiles },
    actions: {
      setNewMessageImages,
      setNewMessageFiles,
      setShowFilesDisplay,
      setFiles,
      setChatFiles,
      setUseRetrieval,
    },
  } = useChatStore();
  const [filesToAccept, setFilesToAccept] = useState(ACCEPTED_FILE_TYPES);
  const fileInputRef = useRef();
  const { editor } = useTipTapEditor();
  // Memoized function to read files
  const readFile = useCallback((file, readAs, callback) => {
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
  }, []);

  // Memoized function to handle file types
  const handleFileType = useCallback(
    async (file, fileType, editor, setNewMessageImages) => {
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
              resolve(content);
            });
            break;
          case 'docx':
            readFile(file, 'ArrayBuffer', async arrayBuffer => {
              const { value: content } = await mammoth.extractRawText({
                arrayBuffer,
              });
              resolve(content);
            });
            break;
          case 'text':
            readFile(file, 'Text', text => {
              resolve(text);
            });
            break;
          default:
            reject(new Error('Unsupported file type'));
        }
      });
    },
    [readFile]
  );

  // Memoized function to handle accepted file types
  const handleAcceptedFileType = useCallback(file => {
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
  }, []);

  // Memoized function to handle file selection
  const handleSelectDeviceFile = useCallback(
    async (file, isChatMessageFile = false) => {
      setShowFilesDisplay(true);
      if (isChatMessageFile) {
        setShowFilesDisplay(true);
      } else {
        setShowFilesDisplay(false);
      }
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
            id: 'loading',
            name: fileName,
            type: fileType,
            size: fileSize,
            originalFileType: originalFileType,
            // file: file,
          };

          setNewMessageFiles([...newMessageFiles, newFile]);

          const content = await handleFileType(
            file,
            fileType,
            editor,
            setNewMessageImages
          );

          const processedFile = {
            ...newFile,
            data: content,
          };
          console.log('Processed file:', processedFile);
          // setFiles([...files, processedFile]);
          // setChatFiles([...chatFiles, processedFile]);
          if (isChatMessageFile) {
            setChatFiles([...chatFiles, processedFile]);
            setNewMessageFiles(
              newMessageFiles.map(file =>
                file.id === 'loading' ? processedFile : file
              )
            );
          } else {
            setFiles([...files, processedFile]);
          }
          // setNewMessageFiles(
          //   newMessageFiles.map(file =>
          //     file.id === 'loading' ? processedFile : file
          //   )
          // );
        } catch (error) {
          toast.error(`Failed to upload. ${error.message}`, {
            duration: 10000,
          });

          // Handle error and rollback based on isChatMessageFile
          if (isChatMessageFile) {
            setNewMessageImages(prev =>
              prev.filter(img => img.messageId !== 'temp')
            );
            setChatFiles(prev => prev.filter(file => file.id !== 'loading'));
          } else {
            setNewMessageImages(prev =>
              prev.filter(img => img.messageId !== 'temp')
            );
            setNewMessageFiles(prev =>
              prev.filter(file => file.id !== 'loading')
            );
          }
        }
      }
    },
    [
      setShowFilesDisplay,
      setUseRetrieval,
      handleAcceptedFileType,
      newMessageFiles,
      setNewMessageFiles,
      setNewMessageImages,
      files,
      setFiles,
      setChatFiles, // Add the setChatFiles function here
      chatFiles, // Add the chatFiles array here
      handleFileType,
      editor,
    ]
  );
  // Memoized function to handle file removal
  const handleRemoveFile = useCallback(
    fileId => {
      setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      setChatFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      setNewMessageFiles(prevFiles =>
        prevFiles.filter(file => file._id !== fileId)
      );
      setNewMessageImages(prevImages =>
        prevImages.filter(image => image.messageId !== fileId)
      );
    },
    [setFiles, setChatFiles, setNewMessageFiles, setNewMessageImages]
  );
  return {
    handleSelectDeviceFile,
    handleRemoveFile,
    fileInputRef,
    filesToAccept,
  };
};

export default useFileProcesser;
