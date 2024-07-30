import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const useEditorState = initialContent => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
  });

  return editor;
};

export default useEditorState;
