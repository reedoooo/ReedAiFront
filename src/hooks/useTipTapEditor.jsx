import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import { Markdown } from 'tiptap-markdown';

const useTipTapEditor = (isFirstMessage, setUserInput) => {
  const initialContent = isFirstMessage
    ? '<p><strong>Prompt:</strong> Write the code for a dialog component using material ui </p>'
    : 'Message Reed GPT';

  const [editorContent, setEditorContent] = useState(initialContent);
  const [contentType, setContentType] = useState('markdown'); // Default content type

  const editor = useEditor({
    extensions: [StarterKit, Markdown], // Start with Markdown
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
