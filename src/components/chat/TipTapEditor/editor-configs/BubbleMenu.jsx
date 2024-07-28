// BubbleMenu.js

import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import StrikeIcon from '@mui/icons-material/FormatStrikethrough';
import UnderlineIcon from '@mui/icons-material/FormatUnderlined';
import LinkIcon from '@mui/icons-material/Link';
import { BubbleMenu as BubbleMenuReact } from '@tiptap/react';
import React, { useState, useEffect, useRef } from 'react';

const SelectionMenu = ({ editor, selectionType, setSelectionType }) => {
  switch (selectionType) {
    case null:
      return (
        <>
          <button
            type="button"
            data-test-id="mark-bold"
            className={editor.isActive('bold') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon />
          </button>
          <button
            type="button"
            data-test-id="mark-italic"
            className={editor.isActive('italic') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon />
          </button>
          <button
            type="button"
            data-test-id="mark-underline"
            className={editor.isActive('underline') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon />
          </button>
          <button
            type="button"
            data-test-id="mark-strike"
            className={editor.isActive('strike') ? 'active' : ''}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <StrikeIcon />
          </button>
          <button
            type="button"
            data-test-id="mark-link"
            className={editor.isActive('link') ? 'active' : ''}
            onClick={() => setSelectionType('link')}
          >
            <LinkIcon />
          </button>
        </>
      );
    case 'link':
      return (
        <div className="insert-link-box">
          <input
            data-test-id="insert-link-value"
            // autoFocus
            type="text"
            placeholder="Insert link address"
            onKeyDown={event => {
              if (event.key === 'Enter') {
                editor
                  .chain()
                  .focus()
                  .setLink({
                    href: event.target.value,
                    target: '_blank',
                  })
                  .run();
                setSelectionType(null);
              }
            }}
          />
        </div>
      );
    default:
      return null;
  }
};

const BubbleMenu = ({ editor, containerRef }) => {
  const [selectionType, setSelectionType] = useState(null);
  useEffect(() => {
    if (selectionType !== 'link') setSelectionType(null);
  }, [selectionType]);

  if (!editor || !containerRef.current) return null;

  return (
    <BubbleMenuReact
      pluginKey="bubbleMenu"
      editor={editor}
      className="bubble-menu"
      tippyOptions={{ appendTo: containerRef.current }}
    >
      <SelectionMenu
        editor={editor}
        selectionType={selectionType}
        setSelectionType={setSelectionType}
      />
    </BubbleMenuReact>
  );
};

export default BubbleMenu;
