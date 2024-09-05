const { useTheme, useMediaQuery } = import('@mui/material');

export const useBreakPoint = () => {
  const theme = useTheme(); // Use MUI theme
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Correct usage
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const sm = useMediaQuery(theme.breakpoints.only('sm'));
  const md = useMediaQuery(theme.breakpoints.only('md'));
  const lg = useMediaQuery(theme.breakpoints.only('lg'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));
  const xx = useMediaQuery(theme.breakpoints.only('xxl')); // Ensure this exists in your theme
  const breakPointState = {
    isMobile,
    xs,
    sm,
    md,
    lg,
    xl,
    xx,
  };

  return breakPointState;
};

export default useBreakPoint;
