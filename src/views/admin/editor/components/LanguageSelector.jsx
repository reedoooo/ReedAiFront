import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { LANGUAGE_VERSIONS } from 'config/data-configs/editor';

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = '#3182ce';

const LanguageSelector = ({ language, onSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml={2} mb={4}>
      <Typography variant="h6" mb={2}>
        Language:
      </Typography>
      <Button onClick={handleClick}>{language}</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: '#110c1b',
          },
        }}
      >
        {languages.map(([lang, version]) => (
          <MenuItem
            key={lang}
            selected={lang === language}
            onClick={() => {
              onSelect(lang);
              handleClose();
            }}
            style={{
              color: lang === language ? ACTIVE_COLOR : 'inherit',
              backgroundColor: lang === language ? '#1A202C' : 'transparent',
            }}
          >
            {lang}
            &nbsp;
            <Typography
              component="span"
              color="text.secondary"
              fontSize="small"
            >
              ({version})
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
