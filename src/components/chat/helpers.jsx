/* eslint-disable no-constant-condition */
import mongoose from 'mongoose';

export const validateProps = (
  apiKey,
  userId,
  setRedirectToSignIn,
  sessionId,
  setSessionId,
  chatId,
  setChatId
) => {
  if (!apiKey) {
    alert('Please enter an API key');
    return false;
  }
  if (!userId) {
    alert('Please login to continue');
    setRedirectToSignIn(true);
    return false;
  }
  if (!sessionId) {
    setSessionId(new mongoose.Types.ObjectId().toString());
  }
  if (!chatId) {
    setChatId(new mongoose.Types.ObjectId().toString());
  }
  return true;
};

export const extractJSXFromMarkdown = markdown => {
  const regex = /```jsx([\s\S]*?)```/;
  const match = markdown.match(regex);

  if (!match) {
    throw new Error('No JSX code block found in the provided Markdown.');
  }

  return match[1].trim();
};
const getContentType = content => {
  if (typeof content !== 'string') return 'text';
  if (/```[\s\S]*```/.test(content)) {
    return 'markdownWithCode';
  } else if (/[*_~`]/.test(content)) {
    return 'markdown';
  } else {
    return 'text';
  }
};

export async function consumeReadableStream(stream, callback, signal) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  signal.addEventListener('abort', () => reader.cancel(), { once: true });

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        callback(decoder.decode(value, { stream: true }));
      }
    }
  } catch (error) {
    if (signal.aborted) {
      console.error('Stream reading was aborted:', error);
    } else {
      console.error('Error consuming stream:', error);
    }
  } finally {
    reader.releaseLock();
  }
}
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
export default {
  validateProps,
  extractJSXFromMarkdown,
  getContentType,
  consumeReadableStream,
  debounce,
  // extractCodeBlocks,
  // generateRandomString,
};
