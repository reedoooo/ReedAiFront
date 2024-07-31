import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FileHandler } from '@tiptap-pro/extension-file-handler';
import { useEffect, useState } from 'react';
import { Markdown } from 'tiptap-markdown';
const useTipTapEditor = (isFirstMessage, setUserInput, setFileInput) => {
  const initialContent = isFirstMessage
    ? '<p><strong>Prompt:</strong> Write the code for a dialog component using material ui </p>'
    : 'Message Reed GPT';

  const [editorContent, setEditorContent] = useState(initialContent);
  const [contentType, setContentType] = useState('markdown'); // Default content type

  const editor = useEditor({
    extensions: [
      StarterKit,
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
    ],
    content: initialContent,
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

      setEditorContent(output);
      setUserInput(output);
    },
  });

  useEffect(() => {
    if (editor) {
      setUserInput(editor.getText());
    }
  }, [editor, setUserInput]);

  // Handle content type change
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

  return { editor, editorContent, contentType, handleContentTypeChange };
};

export default useTipTapEditor;
