// Custom Hook
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useState, useCallback } from 'react';
// import { FileHandler } from '@tiptap-pro/extension-file-handler';
// import { Markdown } from 'tiptap-markdown';
// import { useChatStore } from 'contexts/ChatProvider';

export const useTipTapEditor = (initialContent = '') => {
  const [content, setContent] = useState(initialContent);
  const [contentType, setContentType] = useState('markdown');
  // const initData = initialContent || `<p>Insert ReedAi Prompt</p>`;
  // const [isTyping, setIsTyping] = useState(false);
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      let output = editor.getText();
      setContent(output);
    },
  });

  const handleContentTypeChange = useCallback(
    event => {
      setContentType(event.target.value);
      if (editor) {
        const output = editor.getText();
        setContent(output);
      }
    },
    [editor]
  );

  return {
    editor,
    content,
    contentType,
    handleContentTypeChange,
  };
};

export default useTipTapEditor;

// const editor = useEditor({
//   extensions: [
//     StarterKit,
//     Markdown,
//     FileHandler.configure({
//       onDrop: (editor, files) => {
//         if (files.length > 0) {
//           const file = files[0];
//           const reader = new FileReader();
//           reader.onload = event => {
//             const content = event.target.result;
//             setFileInput(content);
//           };
//           reader.onerror = () => {
//             console.error('Error reading file');
//           };
//           reader.readAsText(file);
//         }
//       },
//       onPaste: (editor, files) => {
//         if (files.length > 0) {
//           const file = files[0];
//           const reader = new FileReader();
//           reader.onload = event => {
//             const content = event.target.result;
//             setFileInput(content);
//           };
//           reader.onerror = () => {
//             console.error('Error reading file');
//           };
//           reader.readAsText(file);
//         }
//       },
//       allowedMimeTypes: [
//         'text/plain',
//         'application/json',
//         'text/markdown',
//         'application/javascript',
//         'text/javascript',
//       ],
//     }),
//   ],
//   content: initData,
//   onUpdate: ({ editor }) => {
//     let output = '';

//     switch (contentType) {
//       case 'markdown':
//         output = editor.getText();
//         break;
//       case 'html':
//         output = editor.getHTML();
//         break;
//       case 'text':
//         output = editor.getText();
//         break;
//       default:
//         output = editor.getText();
//     }

//     setContent(output);
//     setUserInput(output);
//   },
//   onTransaction: ({ transaction }) => {
//     setIsTyping(transaction.steps.length > 0);
//   },
//   editorProps: {
//     attributes: {
//       class: 'custom-editor',
//     },
//   },
// });

// const handleContentTypeChange = useCallback(
//   event => {
//     const newContentType = event.target.value;
//     setContentType(newContentType);
//     if (editor) {
//       switch (newContentType) {
//         case 'markdown':
//           setUserInput(editor.getText());
//           break;
//         case 'html':
//           setUserInput(editor.getHTML());
//           break;
//         case 'text':
//           setUserInput(editor.getText());
//           break;
//         default:
//           setUserInput(editor.getText());
//       }
//     }
//   },
//   [editor, setUserInput]
// );

//   return {
//     editor,
//     content,
//     contentType,
//     isTyping,
//     setContent,
//     handleContentTypeChange,
//   };
// };

// export default useTipTapEditor;
