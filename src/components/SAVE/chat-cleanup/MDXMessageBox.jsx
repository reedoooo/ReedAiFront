/* eslint-disable no-case-declarations */
// ChatMessageBox.js
import React, { useEffect, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

export const MDXMessageBox = ({ streamedResponse }) => {
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    if (streamedResponse) {
      const content = streamedResponse.sections
        .map(section => {
          switch (section.type) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'p':
            case 'blockquote':
              return section.content;
            case 'a':
              return `[${section.content}](${section.href})`;
            case 'img':
              return `![${section.alt}](${section.src})`;
            case 'ul':
              return section.content
                .map(item => `- ${item.content}`)
                .join('\n');
            case 'ol':
              return section.content
                .map((item, index) => `${index + 1}. ${item.content}`)
                .join('\n');
            case 'pre':
              return (
                '```\n' +
                section.content.map(item => item.content).join('\n') +
                '\n```'
              );
            case 'code':
              return `\`${section.content}\``;
            case 'mermaid':
              return `<div class="mermaid">${section.content}</div>`;
            case 'table':
              const headerRow =
                section.content[0].content[0].content
                  .map(item => `| ${item.content} `)
                  .join('') + '|';
              const separatorRow =
                '| ' +
                '--- '.repeat(section.content[0].content[0].content.length) +
                '|';
              const bodyRows = section.content[1].content
                .map(
                  row =>
                    row.content.map(item => `| ${item.content} `).join('') + '|'
                )
                .join('\n');
              return `${headerRow}\n${separatorRow}\n${bodyRows}`;
            default:
              return '';
          }
        })
        .join('\n\n');

      setMessageContent(content);
    }
  }, [streamedResponse]);

  return (
    <div className="message-box">
      <MarkdownRenderer markdown={messageContent} />
    </div>
  );
};

export default MDXMessageBox;
