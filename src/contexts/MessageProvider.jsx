import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';

// Create a context for managing messages
const MessageContext = createContext();

export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [streamingChunks, setStreamingChunks] = useState([]);

  const streamingMessageRef = useRef('');

  const addMessage = useCallback(message => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const updateLastMessage = useCallback(content => {
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      const lastIndex = updatedMessages.length - 1;
      if (lastIndex >= 0) {
        updatedMessages[lastIndex].content += content;
      }
      return updatedMessages;
    });
  }, []);

  const updateStreamingMessage = content => {
    streamingMessageRef.current += content;
    console.log(streamingMessageRef.current);

    setStreamingMessage(streamingMessageRef.current);
    const newStreamBlock = {
      content: streamingMessageRef.current,
      role: 'assistant',
    };
  };
  const addStreamedChunk = useCallback(chunk => {
    setStreamingChunks(prevChunks => [...prevChunks, chunk]);
  }, []);

  const clearStreamingChunks = () => {
    setStreamingChunks([]);
  };
  const clearStreamingMessage = () => {
    streamingMessageRef.current = '';
    setStreamingMessage('');
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        updateLastMessage,
        streaming,
        setStreaming,
        streamingMessage,
        updateStreamingMessage,
        clearStreamingMessage,
        setStreamingMessage,
        streamingMessageRef,
        addStreamedChunk,
        clearStreamingChunks,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
