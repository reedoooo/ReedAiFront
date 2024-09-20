import { useCallback } from 'react';
import { useChatStore } from 'contexts/ChatProvider';
import { useChatHandler } from 'hooks/chat';

export const useMessageManagement = () => {
  const {
    state: { chatMessages, userInput, isStreaming },
    actions: { setChatMessages, setUserInput, setIsStreaming },
  } = useChatStore();

  const { handleSendMessage, clearInput } = useChatHandler();

  const addMessage = useCallback(
    newMessage => {
      setChatMessages(prevMessages => [...prevMessages, newMessage]);
    },
    [setChatMessages]
  );

  const updateLastMessage = useCallback(
    updatedContent => {
      setChatMessages(prevMessages => {
        const newMessages = [...prevMessages];
        if (newMessages.length > 0) {
          newMessages[newMessages.length - 1].content = updatedContent;
        }
        return newMessages;
      });
    },
    [setChatMessages]
  );

  const clearMessages = useCallback(() => {
    setChatMessages([]);
  }, [setChatMessages]);

  const sendMessage = useCallback(async () => {
    await handleSendMessage();
    clearInput();
  }, [handleSendMessage, clearInput]);

  return {
    messages: chatMessages,
    userInput,
    isStreaming,
    addMessage,
    updateLastMessage,
    clearMessages,
    sendMessage,
    setUserInput,
    setIsStreaming,
  };
};
