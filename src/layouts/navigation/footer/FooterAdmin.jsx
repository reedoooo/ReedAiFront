import { Box, Link, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { useMode } from 'hooks';

export const FooterAdmin = props => {
  const { theme } = useMode();
  const textColor = '#1a223f';
  return (
    <Box
      zIndex="3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={{ xs: '20px', md: '30px' }}
      py="15px"
      sx={{
        height: 'auto',
        textAlign: 'center',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography color={textColor} mb="10px">
        &copy; {1900 + new Date().getYear()}
        <Typography component="span" fontWeight="500" ml="4px">
          ReedThaHuman LLC. All Rights Reserved. My
          <Link
            ml="3px"
            color={textColor}
            href="https://www.github.com/reedoooo"
            target="_blank"
            fontWeight="700"
          >
            GitHub
          </Link>
        </Typography>
      </Typography>
      <List sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
        <ListItem sx={{ mx: { xs: '10px', md: '22px' }, padding: 0 }}>
          <Link fontWeight="500" href="mailto:hello@readvogt@gmail.com">
            Support
          </Link>
        </ListItem>
        <ListItem sx={{ mx: { xs: '10px', md: '22px' }, padding: 0 }}>
          <Link fontWeight="500" href="https://www.github.com/reedoooo/license">
            License
          </Link>
        </ListItem>
        <ListItem sx={{ mx: { xs: '10px', md: '22px' }, padding: 0 }}>
          <Link fontWeight="500" href="https://www.github.com/reedoooo/terms">
            Terms of Use
          </Link>
        </ListItem>
        <ListItem sx={{ mx: { xs: '10px', md: '22px' }, padding: 0 }}>
          <Link fontWeight="500" href="https://www.github.com/reedoooo/blog">
            Blog
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default FooterAdmin;
