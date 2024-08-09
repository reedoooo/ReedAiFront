import { Avatar } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ChatIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts/ChatProvider';
import { usePromptAndCommand } from 'hooks/chat';

export const AssistantPicker = () => {
  const {
    assistants,
    assistantImages,
    focusAssistant,
    atCommand,
    isAssistantPickerOpen,
    setIsAssistantPickerOpen,
  } = useChatStore();

  const { handleSelectAssistant } = usePromptAndCommand();

  const itemsRef = useRef([]);

  useEffect(() => {
    if (focusAssistant && itemsRef.current[0]) {
      itemsRef.current[0].focus();
    }
  }, [focusAssistant]);

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(atCommand.toLowerCase())
  );

  const handleOpenChange = isOpen => {
    setIsAssistantPickerOpen(isOpen);
  };

  const callSelectAssistant = assistant => {
    handleSelectAssistant(assistant);
    handleOpenChange(false);
  };

  const getKeyDownHandler = index => e => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleOpenChange(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      callSelectAssistant(filteredAssistants[index]);
    } else if (
      (e.key === 'Tab' || e.key === 'ArrowDown') &&
      !e.shiftKey &&
      index === filteredAssistants.length - 1
    ) {
      e.preventDefault();
      itemsRef.current[0]?.focus();
    } else if (e.key === 'ArrowUp' && !e.shiftKey && index === 0) {
      // go to last element if arrow up is pressed on first element
      e.preventDefault();
      itemsRef.current[itemsRef.current.length - 1]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex =
        index - 1 >= 0 ? index - 1 : itemsRef.current.length - 1;
      itemsRef.current[prevIndex]?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = index + 1 < itemsRef.current.length ? index + 1 : 0;
      itemsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      {isAssistantPickerOpen && (
        <div className="bg-background flex flex-col space-y-1 rounded-xl border-2 p-2 text-sm">
          {filteredAssistants.length === 0 ? (
            <div className="text-md flex h-14 items-center justify-center italic">
              No matching assistants.
            </div>
          ) : (
            <>
              {filteredAssistants.map((item, index) => (
                <button
                  key={item.id}
                  ref={ref => {
                    itemsRef.current[index] = ref;
                  }}
                  type="button"
                  tabIndex={0}
                  className="hover:bg-accent focus:bg-accent flex w-full items-center rounded p-2 focus:outline-none"
                  onClick={() => callSelectAssistant(item)}
                  onKeyDown={getKeyDownHandler(index)}
                >
                  {item.image_path ? (
                    <Avatar
                      src={
                        assistantImages.find(
                          image => image.path === item.image_path
                        )?.url || ''
                      }
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  ) : (
                    <ChatIcon size={32} />
                  )}

                  <div className="ml-3 flex flex-col text-left">
                    <div className="font-bold">{item.name}</div>

                    <div className="truncate text-sm opacity-80">
                      {item.description || 'No description.'}
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
