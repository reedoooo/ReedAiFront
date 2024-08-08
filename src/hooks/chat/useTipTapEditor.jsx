import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FileHandler } from '@tiptap-pro/extension-file-handler';
import { useEffect, useState } from 'react';
import { Markdown } from 'tiptap-markdown';
import { useChatStore } from 'contexts/ChatProvider';

export const useTipTapEditor = () => {
  const { state: chatState, actions: chatActions } = useChatStore();
  const { setFileInput, setUserInput } = chatActions;
  const initData = `<p>Insert ReedAi Prompt</p>`;
  const [content, setContent] = useState(initData);
  const [contentType, setContentType] = useState('markdown'); // Default content type
  const [isTyping, setIsTyping] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Markdown,
      FileHandler.configure({
        onDrop: (editor, files, pos) => {
          // Handle file drop
          const file = files[0];
          const reader = new FileReader();
          reader.onload = event => {
            const content = event.target.result;
            setFileInput(content);
          };
          reader.readAsText(file);
        },
        onPaste: (editor, files, htmlContent) => {
          // Handle file paste
          const file = files[0];
          const reader = new FileReader();
          reader.onload = event => {
            const content = event.target.result;
            setFileInput(content);
          };
          reader.readAsText(file);
        },
        allowedMimeTypes: [
          'text/plain',
          'application/json',
          'text/markdown',
          'application/javascript',
          'text/javascript',
        ],
      }),
    ],
    content: initData,
    onUpdate: ({ editor }) => {
      let output = '';

      switch (contentType) {
        case 'markdown':
          output = editor.getText(); // Markdown output
          break;
        case 'html':
          output = editor.getHTML(); // HTML output
          break;
        case 'text':
          output = editor.getText(); // Plain text output
          break;
        default:
          output = editor.getText();
      }

      setContent(output);
      setUserInput(output);
    },
    onTransaction: ({ transaction }) => {
      if (transaction.steps.length > 0) {
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    },
  });
  const handleContentTypeChange = event => {
    setContentType(event.target.value);
    if (editor) {
      switch (event.target.value) {
        case 'markdown':
          setUserInput(editor.getText()); // Get Markdown
          break;
        case 'html':
          setUserInput(editor.getHTML()); // Get HTML
          break;
        case 'text':
          setUserInput(editor.getText()); // Get Plain text
          break;
        default:
          setUserInput(editor.getText());
      }
    }
  };
  // useEffect(() => {
  //   if (editor) {
  //     editor.commands.setContent(content);
  //   }
  // }, [content, editor]);
  useEffect(() => {
    if (editor) {
      setUserInput(editor.getText());
    }
  }, [editor, setUserInput]);
  return {
    editor,
    content,
    setContent,
    contentType,
    handleContentTypeChange,
    isTyping,
  };
};

export default useTipTapEditor;

// StarterKit.configure({
//   // bind Tiptap to `.element`
//   element: document.querySelector('.element'),
//   // register extensions
//   extensions: [Document, Paragraph, Text],
//   // set the initial content
//   content: '<p>Example Text</p>',
//   // place the cursor in the editor after initialization
//   autofocus: true,
//   // make the text editable (but that’s the default anyway)
//   editable: true,
//   // disable the loading of the default CSS (which is not much anyway)
//   injectCSS: false,
// }),
// Autocomplete.configure({
//   suggestion: {
//     items: [
//       { label: 'JavaScript', value: 'javascript' },
//       { label: 'TypeScript', value: 'typescript' },
//       { label: 'React', value: 'react' },
//     ],
//   },
// }),
// Image.configure({
//   inline: true,
//   allowBase64: true,
// }),
// useEffect(() => {
//   if (editor) {
//     setUserInput(editor.getText());
//   }
// }, [editor, setUserInput]);

// Handle content type change
