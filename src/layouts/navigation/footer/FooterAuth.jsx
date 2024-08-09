import { Box, Link, List, ListItem, Typography } from '@mui/material';
import { useMode } from 'hooks';

export const FooterAuth = props => {
  const { theme } = useMode();
  const textColor = '#fff';
  return (
    <Box
      zIndex="3"
      display="flex"
      flexDirection={{ xs: 'column', xl: 'row' }}
      alignItems={{ xs: 'center', xl: 'start' }}
      justifyContent="space-between"
      px={{ xs: '30px', md: '50px' }}
      pb="30px"
    >
      <Typography
        color={textColor}
        textAlign={{ xs: 'center', xl: 'start' }}
        mb={{ xs: '20px', xl: '0px' }}
      >
        &copy; {1900 + new Date().getYear()}
        <Typography component="span" fontWeight="500" ml="4px">
          Horizon UI. All Rights Reserved. Made with love by
          <Link
            ml="3px"
            color={textColor}
            href="https://www.simmmple.com?ref=horizon-chakra-free"
            target="_blank"
            fontWeight="700"
          >
            Simmmple!
          </Link>
        </Typography>
      </Typography>
      <List display="flex">
        <ListItem sx={{ mr: { xs: '20px', md: '44px' } }}>
          <Link fontWeight="500" href="mailto:hello@simmmple.com">
            Support
          </Link>
        </ListItem>
        <ListItem sx={{ mr: { xs: '20px', md: '44px' } }}>
          <Link
            fontWeight="500"
            href="https://www.simmmple.com/licenses?ref=horizon-chakra-free"
          >
            License
          </Link>
        </ListItem>
        <ListItem sx={{ mr: { xs: '20px', md: '44px' } }}>
          <Link
            fontWeight="500"
            href="https://simmmple.com/terms-of-service?ref=horizon-chakra-free"
          >
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link
            fontWeight="500"
            href="https://www.blog.simmmple.com/?ref=horizon-chakra-free"
          >
            Blog
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default FooterAuth;
