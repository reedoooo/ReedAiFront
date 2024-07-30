const mode = (lightModeValue, darkModeValue) => props => {
  return props.theme.palette.mode === 'dark' ? darkModeValue : lightModeValue;
};

export default mode;
