// useFileUpload.js
import { useRef } from 'react';
import {
  IMAGE_MIME_TYPES,
  TEXT_MIME_TYPES,
} from 'components/chat/files/constants.jsx';

export const useFileUpload = handleFiles => {
  const fileInputRef = useRef(null);

  const handleAttachment = event => {
    event.preventDefault();
    event.stopPropagation();

    const fileInput = fileInputRef.current || document.createElement('input');
    fileInputRef.current = fileInput;

    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('multiple', '');
    const acceptedMimeTypes =
      IMAGE_MIME_TYPES.concat(TEXT_MIME_TYPES).join(',');
    fileInput.setAttribute('accept', acceptedMimeTypes);
    fileInput.click();

    fileInput.onchange = e => {
      const files = Array.from(fileInput.files);
      handleFiles(files);
    };
  };

  return handleAttachment;
};

export default useFileUpload;
