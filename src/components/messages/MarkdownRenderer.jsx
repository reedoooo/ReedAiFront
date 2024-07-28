import React from 'react';
import { remark } from 'remark';
import remarkReact from 'remark-react';
import { unified } from 'unified';
import MDXComponents from './MDXComponents';

export const MarkdownRenderer = ({ markdown }) => {
  const processedContent = remark()
    .use(remarkReact, { remarkReactComponents: MDXComponents })
    .processSync(markdown).contents;

  return <div>{processedContent}</div>;
};

export default MarkdownRenderer;
