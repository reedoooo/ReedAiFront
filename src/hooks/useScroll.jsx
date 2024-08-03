import { useRef, useEffect } from 'react';

export const useScroll = () => {
  const scrollRef = useRef(null);

  const scrollToBottom = async () => {
    await new Promise(requestAnimationFrame); // Equivalent to nextTick
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const scrollToTop = async () => {
    await new Promise(requestAnimationFrame); // Equivalent to nextTick
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const scrollToBottomIfAtBottom = async () => {
    await new Promise(requestAnimationFrame); // Equivalent to nextTick
    if (scrollRef.current) {
      const threshold = 50; // Threshold indicating the distance to the bottom
      const distanceToBottom =
        scrollRef.current.scrollHeight -
        scrollRef.current.scrollTop -
        scrollRef.current.clientHeight;
      if (distanceToBottom <= threshold) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
  };

  return {
    scrollRef,
    scrollToBottom,
    scrollToTop,
    scrollToBottomIfAtBottom,
  };
};

export default useScroll;
