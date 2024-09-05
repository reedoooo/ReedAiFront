import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight, all } from 'lowlight';
import babelParser from 'prettier/parser-babel';
import Prettier from 'prettier/standalone';
import React, { useState } from 'react';
import 'highlight.js/styles/github-dark.css';
import { CodeMirrorExtension } from './CodeMirrorExtension';

// import './CodeEditor.css';
const lowlight = createLowlight(all);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      CodeMirrorExtension,
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    content:
      localStorage.getItem('code-editor-content') ||
      `
        <p>
          That's a boring paragraph followed by a fenced code block:
        </p>
        <pre><code class="language-javascript">for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>
      `,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      localStorage.setItem('code-editor-content', content);
      setCode(content);
    },
    // keyboard shortcuts
    onCreate({ editor }) {
      // Adding keyboard shortcuts
      editor.view.dom.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault();
          handleFormatCode();
        }
      });
    },
  });

  if (!editor) {
    return null;
  }

  const handleToggle = () => {
    editor.chain().focus().toggleCodeBlock().run();
  };
  const handleSetCodeBlock = () => {
    editor.chain().focus().setCodeBlock({ language }).run();
  };
  const handleLanguageChange = e => {
    setLanguage(e.target.value);
    editor.chain().focus().setCodeBlock({ language: e.target.value }).run();
  };

  const handleFormatCode = () => {
    const content = editor.getHTML();
    const formatted = Prettier.format(content, {
      parser: 'babel',
      plugins: [babelParser],
    });
    editor.commands.setContent(formatted);
  };

  return (
    <div className="split-screen">
      <div className="editor-pane">
        <button onClick={handleFormatCode}>Format Code</button>
        <select onChange={handleLanguageChange} value={language}>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="typescript">TypeScript</option>
        </select>
        <EditorContent editor={editor} />
      </div>
      <div className="preview-pane">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: code }} />
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
