import { Typography } from '@mui/material';
import React from 'react';

const formatText = text => {
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Code

  return <Typography dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export function removeCodeWrapping(str) {
  if (str.startsWith('```') && str.endsWith('```')) {
    return str.slice(3, -3);
  } else {
    return str.replace('```', '');
  }
}
