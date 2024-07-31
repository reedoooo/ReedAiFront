/* eslint-disable no-case-declarations */

import { Typography } from '@mui/material';

/**
 * Escape HTML characters
 * @param source
 */
export function encodeHTML(source) {
  return source
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Check if the text includes code
 * @param text
 */
export function includeCode(text) {
  const regexp = /^(?:\s{4}|\t).+/m;
  return text?.includes(' = ') || regexp.test(text);
}

/**
 * Copy text to clipboard
 * @param options
 */
export function copyText(options) {
  const props = { origin: true, ...options };

  let input;

  if (props.origin) input = document.createElement('textarea');
  else input = document.createElement('input');

  input.setAttribute('readonly', 'readonly');
  input.value = props.text;
  document.body.appendChild(input);
  input.select();
  if (document.execCommand('copy')) document.execCommand('copy');
  document.body.removeChild(input);
}

export const formatCodeResponse = data =>
  `### Code\n\n\`\`\`${data.language}\n${data.content}\n\`\`\`\n\n`;

export const formatMarkdownResponse = data =>
  `### Markdown\n\n${data.content}\n\n`;

export const formatTextResponse = data => `### Text\n\n${data.content}\n\n`;

export const formatImageResponse = data =>
  `### Image\n\n![${data.title}](${data.url})\n\n`;

export const formatJSONResponse = data =>
  `### JSON\n\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\`\n\n`;

/**
 * Safely parses a JSON string into an object.
 * @param {string} jsonString - The JSON string to parse.
 * @param {any} defaultValue - The value to return if parsing fails (default is null).
 * @returns {any} - The parsed object or the default value.
 */
export const safeParse = (jsonString, defaultValue = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to parse JSON string:', error);
    return defaultValue;
  }
};

export const formatResponse = json => {
  let formatted = '';
  // const jsonObjects = inputString.match(/{[^}]*"type"[^}]*}/g);

  switch (json.type) {
    case 'code':
      formatted = formatCodeResponse(json.data);
      break;
    case 'markdown':
      formatted = formatMarkdownResponse(json.data);
      break;
    case 'text':
      formatted = formatTextResponse(json.data);
      break;
    default:
      // formatted = formatTextResponse(json.data);
      formatted = '```json\n' + JSON.stringify(json, null, 2) + '\n```\n\n';
  }

  return formatted;
};

export function extractHTMLContent(data) {
  const sections = data.sections;
  let htmlContent = '';

  for (const key in sections) {
    const content = sections[key];
    if (content.type) {
      switch (content.type) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'p':
        case 'blockquote':
          htmlContent += `<${content.type}>${content.content}</${content.type}>\n`;
          break;
        case 'a':
          htmlContent += `<a href="${content.href}">${content.content}</a>\n`;
          break;
        case 'img':
          htmlContent += `<img src="${content.src}" alt="${content.alt}" />\n`;
          break;
        case 'ul':
        case 'ol':
          const listItems = content.content
            .map(item => `<li>${item}</li>`)
            .join('\n');
          htmlContent += `<${content.type}>\n${listItems}\n</${content.type}>\n`;
          break;
        case 'pre':
          htmlContent += `<pre>${content.content}</pre>\n`;
          break;
        case 'code':
          htmlContent += `<code>${content.content}</code>\n`;
          break;
        case 'table':
          const headerRow = content.content[0]
            .map(item => `<th>${item}</th>`)
            .join('');
          const bodyRows = content.content
            .slice(1)
            .map(row => {
              return `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
            })
            .join('\n');
          htmlContent += `<table>\n<thead><tr>${headerRow}</tr></thead>\n<tbody>\n${bodyRows}\n</tbody>\n</table>\n`;
          break;
        default:
          break;
      }
    }
  }

  return htmlContent;
}

export function extractMarkdownContent(messageContent) {
  try {
    if (
      typeof messageContent === 'string' &&
      messageContent.startsWith('{') &&
      messageContent.endsWith('}')
    ) {
      const parsedContent = JSON.parse(messageContent?.data);
      if (parsedContent.pageLayout) {
        return parsedContent.pageLayout;
      }
      return JSON.stringify(parsedContent, null, 2);
    }
  } catch (error) {
    console.error('Error parsing JSON content:', error);
  }

  return messageContent;
}

export function parseJsonString(jsonString) {
  if (typeof jsonString !== 'string') {
    return null;
  }

  // First, unescape the double quotes
  const correctedString = jsonString.replace(/\\"/g, '"');
  // Remove any backslashes that are not part of the JSON structure
  const cleanedString = correctedString.replace(/\\(?!["\\/])/g, '');

  try {
    // Attempt to parse the cleaned JSON string
    return JSON.parse(cleanedString);
  } catch (error) {
    console.error('Failed to parse JSON string:', error);
    return null;
  }
}

export const organizeMessages = messages => {
  const organizedMessages = [];
  let currentRole = null;

  messages.forEach((message, index) => {
    if (message.role !== currentRole) {
      if (currentRole !== null) {
        organizedMessages.push({ type: 'end', role: currentRole });
      }
      organizedMessages.push({ type: 'start', role: message.role });
      currentRole = message.role;
    }
    organizedMessages.push(message);
    if (index === messages.length - 1) {
      organizedMessages.push({ type: 'end', role: message.role });
    }
  });

  return organizedMessages;
};

export const formatText = text => {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Code

  return <Typography dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export function removeCodeWrapping(str) {
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.slice(3, -3);
  } else {
    return str.replace('```', '');
  }
}
