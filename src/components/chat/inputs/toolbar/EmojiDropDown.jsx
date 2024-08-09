import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useMode } from 'hooks';

export const EmojiDropDown = ({ editor }) => {
  const { theme } = useMode();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <>
      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <EmojiEmotionsIcon
          style={{ color: theme.palette.primary.main, fontSize: 20 }}
        />
      </IconButton>
      {showEmojiPicker && (
        <Picker
          data={data}
          onEmojiSelect={emoji => {
            editor.commands.insertContent(emoji.native);
            setShowEmojiPicker(false);
          }}
          theme="dark"
          style={{ position: 'absolute', bottom: '60px', left: '20px' }}
        />
      )}
    </>
  );
};

export default EmojiDropDown;
