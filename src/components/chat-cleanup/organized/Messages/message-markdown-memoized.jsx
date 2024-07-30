import { memo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

export const MessageMarkdownMemoized = memo(
  function MessageMarkdownMemoized(props) {
    return <ReactMarkdown {...props} />;
  }
);

export default MessageMarkdownMemoized;
