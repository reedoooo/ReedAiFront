// import BubbleMenu from '@tiptap/extension-bubble-menu';
import Color from '@tiptap/extension-color';
import Placeholder from '@tiptap/extension-placeholder';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef } from 'react';
import BubbleMenu from './BubbleMenu';
import ChangeMenuPlugin from './ChangeMenuPlugin';
import CommandsPlugin from './CommandsPlugin';
import 'styles/EditorStyles.css';

const EditorComponent = ({ viewType = 'default', onChange }) => {
  const containerRef = useRef(document.createElement('div')); // Create a ref for the element

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      // BubbleMenu,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      CommandsPlugin(viewType),
      ChangeMenuPlugin({
        pluginKey: 'changeMenu',
        element: containerRef.current,
        tippyOptions: {}, // Add your tippy options if needed
        shouldShow: true, // Temporarily always show
      }),
    ],
    content: '<p>Input Prompt Here</p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    // Ensure the container element is mounted in the DOM
    const container = containerRef.current;
    if (container && !container.parentNode) {
      document.body.appendChild(container);
    }
    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  return (
    <div className="editor-container">
      <EditorContent editor={editor} />
      {editor && <BubbleMenu editor={editor} containerRef={containerRef} />}
    </div>
  );
};

export default EditorComponent;

// import BubbleMenu from '@tiptap/extension-bubble-menu';
// import Color from '@tiptap/extension-color';
// import Heading from '@tiptap/extension-heading';
// import ListItem from '@tiptap/extension-list-item';
// import Placeholder from '@tiptap/extension-placeholder';
// import TextStyle from '@tiptap/extension-text-style';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import React, { useRef } from 'react';
// import ChangeMenu from './ChangeMenu';
// import CommandsPlugin from './CommandsPlugin';

// // const MenuBar = ({ editor }) => {
// //   if (!editor) {
// //     return null;
// //   }

// //   return (
// //     <>
// //       <button
// //         onClick={() => editor.chain().focus().toggleBold().run()}
// //         disabled={!editor.can().chain().focus().toggleBold().run()}
// //         className={editor.isActive('bold') ? 'is-active' : ''}
// //       >
// //         bold
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleItalic().run()}
// //         disabled={!editor.can().chain().focus().toggleItalic().run()}
// //         className={editor.isActive('italic') ? 'is-active' : ''}
// //       >
// //         italic
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleStrike().run()}
// //         disabled={!editor.can().chain().focus().toggleStrike().run()}
// //         className={editor.isActive('strike') ? 'is-active' : ''}
// //       >
// //         strike
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleCode().run()}
// //         disabled={!editor.can().chain().focus().toggleCode().run()}
// //         className={editor.isActive('code') ? 'is-active' : ''}
// //       >
// //         code
// //       </button>
// //       <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
// //         clear marks
// //       </button>
// //       <button onClick={() => editor.chain().focus().clearNodes().run()}>
// //         clear nodes
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().setParagraph().run()}
// //         className={editor.isActive('paragraph') ? 'is-active' : ''}
// //       >
// //         paragraph
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
// //         className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
// //       >
// //         h1
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
// //         className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
// //       >
// //         h2
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
// //         className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
// //       >
// //         h3
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
// //         className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
// //       >
// //         h4
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
// //         className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
// //       >
// //         h5
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
// //         className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
// //       >
// //         h6
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleBulletList().run()}
// //         className={editor.isActive('bulletList') ? 'is-active' : ''}
// //       >
// //         bullet list
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleOrderedList().run()}
// //         className={editor.isActive('orderedList') ? 'is-active' : ''}
// //       >
// //         ordered list
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleCodeBlock().run()}
// //         className={editor.isActive('codeBlock') ? 'is-active' : ''}
// //       >
// //         code block
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().toggleBlockquote().run()}
// //         className={editor.isActive('blockquote') ? 'is-active' : ''}
// //       >
// //         blockquote
// //       </button>
// //       <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
// //         horizontal rule
// //       </button>
// //       <button onClick={() => editor.chain().focus().setHardBreak().run()}>
// //         hard break
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().undo().run()}
// //         disabled={!editor.can().chain().focus().undo().run()}
// //       >
// //         undo
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().redo().run()}
// //         disabled={!editor.can().chain().focus().redo().run()}
// //       >
// //         redo
// //       </button>
// //       <button
// //         onClick={() => editor.chain().focus().setColor('#958DF1').run()}
// //         className={
// //           editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''
// //         }
// //       >
// //         purple
// //       </button>
// //     </>
// //   );
// // };

// export const EditorComponent = ({ viewType = 'default' }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TextStyle,
//       Color,
//       BubbleMenu,
//       Placeholder.configure({
//         placeholder: 'Write something …',
//       }),
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       CommandsPlugin(viewType),
//     ],
//     content: `
//       <h2>
//         Hi there,
//       </h2>
//       <p>
//         this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
//       </p>
//       <ul>
//         <li>
//           That’s a bullet list with one …
//         </li>
//         <li>
//           … or two list items.
//         </li>
//       </ul>
//       <p>
//         Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
//       </p>
//       <pre><code class="language-css">body {
// display: none;
// }</code></pre>
//       <p>
//         I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
//       </p>
//       <blockquote>
//         Wow, that’s amazing. Good work, boy! 👏
//         <br />
//         — Mom
//       </blockquote>
//     `,
//   });

//   const containerRef = useRef();

//   return (
//     <div>
//       {/* <MenuBar editor={editor} /> */}
//       {editor && (
//         <ChangeMenu
//           editor={editor}
//           containerRef={containerRef}
//           className="change-menu"
//           viewType={viewType} // Pass viewType prop to ChangeMenu
//         />
//       )}
//       <EditorContent editor={editor} />
//     </div>
//   );
// };

// export default EditorComponent;
