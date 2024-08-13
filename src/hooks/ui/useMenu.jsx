import { useCallback, useState } from 'react';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const toggle = useCallback(() => {
    setAnchorEl(anchorEl ? null : document.activeElement);
  }, [anchorEl]);

  return {
    anchorEl: anchorEl,
    isOpen: Boolean(anchorEl),
    handleMenuOpen: handleOpen,
    handleMenuClose: handleClose,
    toggle,
  };
};

export default useMenu;
