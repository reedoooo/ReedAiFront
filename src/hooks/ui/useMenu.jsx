import { useCallback, useState } from 'react';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    isOpen: Boolean(anchorEl),
    handleMenuOpen: handleOpen,
    handleMenuClose: handleClose,
  };
};

export default useMenu;
