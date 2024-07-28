import { useState, useCallback } from 'react';

/**
 * Custom hook for handling chat history in the chat component.
 * It provides functions to set the new message content to the previous or next user message in the chat history.
 *
 * @returns An object containing the following functions:
 *   - setNewMessageContentToPreviousUserMessage: Sets the new message content to the previous user message.
 *   - setNewMessageContentToNextUserMessage: Sets the new message content to the next user message in the chat history.
 */
const useChatHistoryHandler = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [newMessageContent, setNewMessageContent] = useState('');

  const setNewMessageContentToPreviousUserMessage = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex - 1;
        setNewMessageContent(chatHistory[newIndex]);
        return newIndex;
      });
    }
  }, [currentIndex, chatHistory]);

  const setNewMessageContentToNextUserMessage = useCallback(() => {
    if (currentIndex < chatHistory.length - 1) {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        setNewMessageContent(chatHistory[newIndex]);
        return newIndex;
      });
    }
  }, [currentIndex, chatHistory]);

  return {
    newMessageContent,
    setNewMessageContentToPreviousUserMessage,
    setNewMessageContentToNextUserMessage,
    setChatHistory, // Exposing this function to set chat history
  };
};

export default useChatHistoryHandler;
