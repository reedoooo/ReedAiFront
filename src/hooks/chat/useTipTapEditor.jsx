import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { debounce } from 'lodash';
import { useState, useCallback, useEffect } from 'react';
import { useChatStore } from 'contexts/ChatProvider'; // Import the context
import './Tppy.css';

export const useTipTapEditor = (initialContent = '') => {
  const [content, setContent] = useState(initialContent);
  const [contentType, setContentType] = useState('markdown');
  const [isInitialMessageAdded, setIsInitialMessageAdded] = useState(false);

  const {
    actions: { setUserInput, setChatMessages },
    state: { chatMessages },
  } = useChatStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetUserInput = useCallback(
    debounce(input => {
      setUserInput(input);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const output = editor.getText();
      if (output !== content) {
        setContent(output);
        debouncedSetUserInput(output);
      }
    },
    editorProps: {
      attributes: {
        class: 'custom-editor', // Add a custom class name here
      },
    },
  });

  const handleContentTypeChange = useCallback(
    event => {
      setContentType(event.target.value);
      if (editor) {
        const output = editor.getText();
        setContent(output);
        // setUserInput(output); // Update the user input in the chat store
      }
    },
    [editor]
  );

  const insertForm = (editor, form) => {
    const formElements = {
      'Text input': '<input type="text" placeholder="Enter text here"/>',
      Checkbox: '<input type="checkbox"/> Checkbox',
      'Radio button': '<input type="radio"/> Radio button',
      'File input': '<input type="file"/>',
    };
    editor.commands.insertContent(formElements[form] || '');
  };

  const insertCodeBlock = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run(); // Use toggleCodeBlock to insert a code block
      const updatedContent = editor.getText();
      setContent(updatedContent);
      debouncedSetUserInput(updatedContent);
      setChatMessages([
        ...chatMessages,
        { role: 'user', content: updatedContent },
      ]);
    }
  }, [editor, debouncedSetUserInput, setChatMessages, chatMessages]);

  const insertContentAndSync = useCallback(
    newContent => {
      if (editor) {
        editor.commands.insertContent(newContent);
        const updatedContent = editor.getText();
        setContent(updatedContent);
        debouncedSetUserInput(updatedContent); // Sync with chat store
        // setChatMessages([
        //   ...chatMessages,
        //   { role: 'user', content: updatedContent },
        // ]); // Update messages
      }
    },
    [editor, debouncedSetUserInput]
  );

  const clearInput = useCallback(() => setUserInput(''), [setUserInput]);

  useEffect(() => {
    if (!isInitialMessageAdded && chatMessages.length === 0) {
      // const savedMessages =
      //   JSON.parse(localStorage.getItem('chatMessages')) || [];
      if (chatMessages?.length === 0) {
        setChatMessages([
          {
            role: 'system',
            content:
              'Generate a data table component for organizing a list of data, UI library documents, which have been upserted into a vector database',
          },
        ]);
        setIsInitialMessageAdded(true);
      }
    }
  }, [isInitialMessageAdded, chatMessages, setChatMessages]);

  return {
    editor,
    content,
    contentType,
    handleContentTypeChange,
    insertContentAndSync, // Expose the custom command
    insertCodeBlock, // Expose the custom command
    insertForm, // Expose the custom command
    clearInput,
  };
};

export default useTipTapEditor;
