import mermaid from 'mermaid';
import React, { createElement, Fragment, useEffect, useMemo } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeReact from 'rehype-react';
import rehypeSanitize from 'rehype-sanitize';
// import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import 'highlight.js/styles/base16/green-screen.css';
import CodeBlock from './CodeBlock';
import useContentTypeCheck from './useContentTypeCheck';

export const useMarkdownProcessor = content => {
  const { checkType } = useContentTypeCheck();
  // const { content } = props;
  console.log('CONTENT IS OF TYPE: ' + checkType(content));
  console.log(`useMarkdownProcessor content ${content}`, content);
  // const content = {
  //   // Markdown samples
  //   '## Mermaid Diagrams': `
  //       <div class="markers"></div>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //       <span class="marker"></span>
  //   `,
  // };
  useEffect(() => {
    try {
      mermaid.initialize({ startOnLoad: false, theme: 'forest' });
    } catch (error) {
      console.error('Error initializing Mermaid:', error);
    }
  }, []);
  return useMemo(() => {
    // Validate the input content
    if (typeof content !== 'string' || content.trim() === '') {
      console.error('Invalid content provided:', content);
      return (
        <div>
          <p>Invalid content. Please provide valid markdown content.</p>
        </div>
      );
    }

    try {
      const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHTML: true })
        .use(rehypeHighlight, { ignoreMissing: true })
        .use(rehypeSanitize)
        .use(rehypeReact, {
          createElement,
          Fragment,
          components: {
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noreferrer">
                {children}
              </a>
            ),
            h1: ({ children, id }) => <h1 id={id}>{children}</h1>,
            h2: ({ children, id }) => <h2 id={id}>{children}</h2>,
            h3: ({ children, id }) => <h3 id={id}>{children}</h3>,
            h4: ({ children, id }) => <h4 id={id}>{children}</h4>,
            h5: ({ children, id }) => <h5 id={id}>{children}</h5>,
            h6: ({ children, id }) => <h6 id={id}>{children}</h6>,
            p: ({ children }) => <p>{children}</p>,
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            code: CodeBlock,
            pre: ({ children }) => (
              <div>
                <pre>{children}</pre>
              </div>
            ),
            ul: ({ children }) => <ul>{children}</ul>,
            ol: ({ children }) => <ol>{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            table: ({ children }) => (
              <div>
                <table>{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead>{children}</thead>,
            th: ({ children }) => <th>{children}</th>,
            td: ({ children }) => <td>{children}</td>,
            blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          },
        });

      const processedContent = processor.processSync(content).result;
      return processedContent;
    } catch (error) {
      console.error('Error processing markdown content:', error);
      return (
        <div>
          <p>Error processing content. Please try again later.</p>
        </div>
      );
    }
  }, [content]);
};

export default useMarkdownProcessor;
