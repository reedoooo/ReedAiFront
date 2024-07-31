import { Repeat } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, EditIcon, FileCopyIcon } from 'assets/humanIcons';
import { useChatStore } from 'contexts/ChatProvider';
import { WithTooltip } from '../../../../themed/TooltipComponent';

export const MESSAGE_ICON_SIZE = 18;

const MessageActions = ({
  isAssistant,
  isLast,
  isEditing,
  isHovering,
  onCopy,
  onEdit,
  onRegenerate,
}) => {
  const { isGenerating } = useChatStore();

  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCopy = () => {
    onCopy();
    setShowCheckmark(true);
  };

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCheckmark]);

  return (isLast && isGenerating) || isEditing ? null : (
    <div className="text-muted-foreground flex items-center space-x-2">
      {!isAssistant && isHovering && (
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Edit</div>}
          trigger={
            <EditIcon
              className="cursor-pointer hover:opacity-50"
              size={MESSAGE_ICON_SIZE}
              onClick={onEdit}
            />
          }
        />
      )}
      {(isHovering || isLast) && (
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Copy</div>}
          trigger={
            showCheckmark ? (
              <CheckCircleIcon size={MESSAGE_ICON_SIZE} />
            ) : (
              <FileCopyIcon
                className="cursor-pointer hover:opacity-50"
                size={MESSAGE_ICON_SIZE}
                onClick={handleCopy}
              />
            )
          }
        />
      )}
      {isLast && (
        <WithTooltip
          delayDuration={1000}
          side="bottom"
          display={<div>Regenerate</div>}
          trigger={
            <Repeat
              className="cursor-pointer hover:opacity-50"
              size={MESSAGE_ICON_SIZE}
              onClick={onRegenerate}
            />
          }
        />
      )}
    </div>
  );
};

export default MessageActions;
