import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { useState, useCallback } from 'react';
import { useChatStore } from 'contexts/ChatProvider'; // Import the context

export const useTipTapEditor = (initialContent = '') => {
  const [content, setContent] = useState(initialContent);
  const [contentType, setContentType] = useState('markdown');

  // Destructure the actions from the chat store
  const {
    actions: { setUserInput, setMessages },
    state: { messages },
  } = useChatStore();

  // Initialize the editor with extensions and content
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const output = editor.getText();
      setContent(output);
      setUserInput(output); // Update the user input in the chat store
    },
  });

  // Handle content type change and update the state accordingly
  const handleContentTypeChange = useCallback(
    event => {
      setContentType(event.target.value);
      if (editor) {
        const output = editor.getText();
        setContent(output);
        setUserInput(output); // Update the user input in the chat store
      }
    },
    [editor, setUserInput]
  );

  // Custom command to insert content and update messages
  const insertContentAndSync = useCallback(
    newContent => {
      if (editor) {
        editor.commands.insertContent(newContent);
        const updatedContent = editor.getText();
        setContent(updatedContent);
        setUserInput(updatedContent); // Sync with chat store
        setMessages([...messages, { role: 'user', content: updatedContent }]); // Update messages
      }
    },
    [editor, setUserInput, setMessages, messages]
  );

  return {
    editor,
    content,
    contentType,
    handleContentTypeChange,
    insertContentAndSync, // Expose the custom command
  };
};

export default useTipTapEditor;
