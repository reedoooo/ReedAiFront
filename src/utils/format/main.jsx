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
 * Formats the given text by replacing certain patterns with HTML tags.
 *
 * @param {string} text - The text to be formatted.
 * @returns {React.ReactNode} - The formatted text wrapped in a Typography component.
 */
export const formatText = text => {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Code

  return <Typography dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

/**
 * Removes code wrapping from a string.
 *
 * @param {string} str - The string to remove code wrapping from.
 * @returns {string} - The string without code wrapping.
 */
export function removeCodeWrapping(str) {
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.slice(3, -3);
  } else {
    return str.replace('```', '');
  }
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

/**
 * Formats the response based on the type of data received.
 *
 * @param {Object} json - The JSON object containing the response data.
 * @returns {string} - The formatted response.
 */
export const formatResponse = json => {
  let formatted = '';

  switch (json.type) {
    case 'code':
      formatted = `### Code\n\n\`\`\`${json.data.language}\n${json.data.content}\n\`\`\`\n\n`;
      break;
    case 'markdown':
      formatted = `### Markdown\n\n${json.data.content}\n\n`;
      break;
    case 'text':
      formatted = `### Text\n\n${json.data.content}\n\n`;
      break;
    default:
      // formatted = formatTextResponse(json.data);
      formatted = '```json\n' + JSON.stringify(json, null, 2) + '\n```\n\n';
  }

  return formatted;
};

/**
 * Extracts code blocks from a string.
 *
 * @param {string} message - The input string containing code blocks.
 * @returns {string[]} - An array of code blocks extracted from the input string.
 */
export const extractCodeFromString = message => {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
};

/**
 * Checks if a string contains any code block indicators.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} - Returns true if the string contains any code block indicators, otherwise returns false.
 */
export const isCodeBlock = str => {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
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
