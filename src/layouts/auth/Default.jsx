import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ChevronLeft } from 'assets/humanIcons';
import useMode from 'hooks/useMode';
import FooterAdmin from 'layouts/navigation/footer/FooterAdmin';

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;
  // Material UI theme
  const { theme } = useMode();
  const textColorSecondary = theme.palette.text.secondary;

  return (
    <Grid container sx={{ position: 'relative', height: 'max-content' }}>
      <Grid
        item
        sx={{
          height: {
            sm: 'initial',
            md: 'unset',
            lg: '100vh',
            xl: '97vh',
          },
          width: '100%',
          maxWidth: { md: '66%', lg: '1313px' },
          marginX: 'auto',
          paddingTop: { sm: '50px', md: '0px' },
          paddingX: { lg: '30px', xl: '0px' },
          paddingLeft: { xl: '70px' },
          justifyContent: 'start',
          flexDirection: 'column',
        }}
      >
        <NavLink
          to="/admin"
          style={{
            width: 'fit-content',
            marginTop: '40px',
          }}
        >
          <Grid
            container
            alignItems="center"
            paddingLeft={{ base: '25px', lg: '0px' }}
            paddingTop={{ lg: '0px', xl: '0px' }}
            width="fit-content"
          >
            <ChevronLeft
              sx={{
                marginRight: '12px',
                height: '13px',
                width: '8px',
                color: textColorSecondary,
              }}
            />
            <Typography
              sx={{
                marginLeft: '0px',
                fontSize: 'sm',
              }}
            >
              Back to Simmmple
            </Typography>
          </Grid>
        </NavLink>
        {children}
      </Grid>
      <Box
        display={{ base: 'none', md: 'block' }}
        height="100%"
        minHeight="100vh"
        width={{ lg: '50vw', '2xl': '44vw' }}
        position="absolute"
        right="0px"
        sx={{
          backgroundImage: `url(${illustrationBackground})`,
          justifyContent: 'center',
          alignItems: 'end',
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          borderBottomLeftRadius: { lg: '120px', xl: '200px' },
        }}
      />
      <FooterAdmin />
      {/* <FixedPlugin /> */}
    </Grid>
  );
}

AuthIllustration.propTypes = {
  children: PropTypes.node,
  illustrationBackground: PropTypes.string.isRequired,
};

export default AuthIllustration;
