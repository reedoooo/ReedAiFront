import { PencilIcon } from '@heroicons/react/24/outline';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { TextFieldSection } from 'components/themed';
import SidebarItem from '../sidebar-items/sidebar-display-item';

const PromptItem = ({ prompt }) => {
  const [name, setName] = useState(prompt.name);
  const [content, setContent] = useState(prompt.content);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <SidebarItem
      item={prompt}
      isTyping={isTyping}
      contentType="prompts"
      icon={
        <IconButton>
          <PencilIcon size={30} />
        </IconButton>
      }
      updateState={{ name, content }}
      renderInputs={() => (
        <>
          <TextFieldSection
            fullWidth
            label="Name"
            placeholder="Prompt name..."
            value={name}
            onChange={e => setName(e.target.value)}
            inputProps={{ maxLength: 100 }}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
          <TextFieldSection
            fullWidth
            multiline
            label="Prompt"
            placeholder="Prompt..."
            value={content}
            onChange={e => setContent(e.target.value)}
            minRows={6}
            maxRows={20}
            onCompositionStart={() => setIsTyping(true)}
            onCompositionEnd={() => setIsTyping(false)}
            margin="normal"
          />
        </>
      )}
    />
  );
};

export default PromptItem;
