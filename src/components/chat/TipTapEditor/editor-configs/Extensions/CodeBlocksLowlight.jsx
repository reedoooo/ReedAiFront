import { Node } from '@tiptap/core';
import { lowlight } from 'lowlight';

const CodeBlocksLowlight = Node.create({
  name: 'codeBlockLowlight',
  group: 'block',
  content: 'text*',
  marks: '',
  code: true,
  defining: true,
  addAttributes() {
    return {
      language: {
        default: null,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'pre[data-language]',
        getAttrs: dom => ({ language: dom.getAttribute('data-language') }),
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'pre',
      { ...HTMLAttributes, 'data-language': node.attrs.language },
      ['code', { class: `language-${node.attrs.language}` }, 0],
    ];
  },
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('pre');
      dom.dataset.language = node.attrs.language;
      const code = document.createElement('code');
      code.className = `language-${node.attrs.language}`;
      dom.appendChild(code);

      return {
        dom,
        contentDOM: code,
        update: updatedNode => {
          if (updatedNode.type !== this.type) return false;
          if (updatedNode.attrs.language !== node.attrs.language) return false;
          return true;
        },
      };
    };
  },
});

export default CodeBlocksLowlight;
