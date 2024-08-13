import { debounce } from 'lodash';
import { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useChatStore } from 'contexts/ChatProvider';

export const useChatScroll = () => {
  const {
    state: { isGenerating, chatMessages },
  } = useChatStore();
  const chatContainerRef = useRef(null);
  const messagesStartRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isAutoScrolling = useRef(false);

  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [userScrolled, setUserScrolled] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    setUserScrolled(false);

    if (!isGenerating && userScrolled) {
      setUserScrolled(false);
    }
  }, [isGenerating, userScrolled]);

  useEffect(() => {
    if (isGenerating && !userScrolled) {
      scrollToBottom();
    }
  }, [chatMessages, isGenerating, userScrolled]);

  const debouncedHandleScroll = useCallback(
    debounce(() => {
      if (chatContainerRef.current) {
        const target = chatContainerRef.current;
        const bottom =
          Math.round(target.scrollHeight) - Math.round(target.scrollTop) ===
          Math.round(target.clientHeight);
        setIsAtBottom(bottom);

        const top = target.scrollTop === 0;
        setIsAtTop(top);

        if (!bottom && !isAutoScrolling.current) {
          setUserScrolled(true);
        } else {
          setUserScrolled(false);
        }

        const isOverflow = target.scrollHeight > target.clientHeight;
        setIsOverflowing(isOverflow);
      }
    }, 100),
    []
  );
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        container.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [debouncedHandleScroll]);
  const scrollToTop = useCallback(() => {
    if (messagesStartRef.current) {
      messagesStartRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    isAutoScrolling.current = true;

    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
      }

      isAutoScrolling.current = false;
    }, 100);
  }, []);

  return {
    messagesStartRef,
    messagesEndRef,
    chatContainerRef,
    isAtTop,
    isAtBottom,
    userScrolled,
    isOverflowing,
    handleScroll: debouncedHandleScroll,
    scrollToTop,
    scrollToBottom,
    setIsAtBottom,
  };
};

export default useChatScroll;
