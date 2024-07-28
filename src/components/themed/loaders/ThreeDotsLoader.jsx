import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import useMode from 'hooks/useMode';

export const ThreeDotsLoader = () => {
  const { theme } = useMode();
  const [color, setColor] = useState(theme.palette.primary.main);

  return (
    <ThreeDots
      wrapperClass="dark:opacity-60"
      width="24"
      height="24"
      color={color}
    />
  );
};

export default ThreeDotsLoader;
