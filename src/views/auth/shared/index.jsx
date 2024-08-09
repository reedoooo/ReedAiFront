import {
  Box,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  styled,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  PeopleAltRoundedIcon,
} from 'assets/humanIcons';
import { StyledIconContainer } from 'components/styled';
import { RCBox, RCButton, RCTypography } from 'components/themed';
import { authConfigs } from 'config/form-configs';
import { useAuthStore } from 'contexts/AuthProvider';
import { useFormik } from 'formik';
import useMode from 'hooks/useMode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dispatch } from 'store/index';
import { toggleDialogState } from 'store/Slices/appSlice';
import LoadingIndicator from 'utils/app/LoadingIndicator';
const StyledInfoPanel = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.borders.borderRadius.md,
  boxShadow: theme.shadows[4],
  position: 'absolute',
  right: 15, // Align to the right edge of the parent dialog
  top: 15, // Align to the top of the dialog
  width: 280,
  zIndex: 1500, // Ensure it is above the dialog
}));
const GuestInfoPanel = () => {
  const { theme } = useMode();
  return (
    <StyledInfoPanel theme={theme}>
      <Typography variant="h6" color="textPrimary" gutterBottom theme={theme}>
        First Time Here?
      </Typography>
      <Typography
        variant="body1"
        color={theme.palette.text.secondary}
        theme={theme}
      >
        Use the guest account to explore:
      </Typography>
      <Typography
        variant="body2"
        color={theme.palette.text.secondary}
        sx={{ mt: 1 }}
        theme={theme}
      >
        Username: <strong>guestUsername</strong>
      </Typography>
      <Typography
        variant="body2"
        color={theme.palette.text.secondary}
        theme={theme}
      >
        Password: <strong>password123</strong>
      </Typography>
    </StyledInfoPanel>
  );
};
export const AuthPages = () => {
  const { state, actions } = useAuthStore();
  const { handleAuthSubmit } = actions;
  const { formDisabled, isAuthenticated } = state;
  const navigate = useNavigate();
  const { theme } = useMode();
  const pageRef = React.createRef();
  const formRef = React.createRef();
  const searchParams = {};
  // const { navigate } = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      isSignup: false,
    },
    onSubmit: values => handleAuthSubmit(values),
  });

  const renderFormFields = () => {
    const formFieldsConfigs = {
      authConfigs: authConfigs,
    };
    return formFieldsConfigs['authConfigs'].map(field => {
      if (field.conditional && !formik.values[field.conditional]) {
        return null;
      }
      return (
        <TextField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          fullWidth={field.fullWidth}
          margin={field.margin}
          sx={{
            backgroundColor: formik.values[field.name]
              ? 'transparent'
              : 'inherit',
            '& .MuiInputBase-input': {
              backgroundColor: formik.values[field.name]
                ? 'transparent'
                : 'inherit',
            },
          }}
        />
      );
    });
  };

  const initDialogToggle = () =>
    dispatch(toggleDialogState('initAddContentVisible'));
  const onClose = () => {
    formDisabled
      ? alert('Please sign in or add a draft as a guest')
      : console.log('Form closed'); // Adjust this as needed
  };

  const handleContinueAsGuest = () => {
    initDialogToggle();
    onClose();
  };
  const storedUserData = JSON.parse(localStorage.getItem('userStore'));
  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/admin/dashboard');
    }
  }, [isAuthenticated]); // Add dependencies as needed

  useEffect(() => {
    if (state.status === 'pending') {
      return <LoadingIndicator />;
    }
  }, [state.status]); // Add dependencies as needed
  return (
    <div>
      <GuestInfoPanel />
      <RCBox
        theme={theme}
        ref={pageRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 3,
          mt: 5,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: '100%',
            borderRadius: 'lg',
            boxShadow: theme.shadows[3],
          }}
        >
          <RCBox
            theme={theme}
            ref={formRef}
            variant="outlined"
            bgColor="primary"
            borderRadius="lg"
            coloredShadow="primary"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderColor: theme.palette.primary.main,
              gap: 2,
              zIndex: 1900,
              position: 'relative',
              textAlign: 'center',
              p: 2,
              m: 1,
            }}
          >
            {/* <Brand /> */}
            <RCTypography variant="h2" fontWeight="medium" color="white" mt={1}>
              {formik.values.isSignup ? 'Sign Up' : 'Login'}
            </RCTypography>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ mt: 1, mb: 2 }}
            >
              <Grid item xs={2}>
                <RCTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <StyledIconContainer
                    theme={theme}
                    sx={{
                      borderRadius: `${theme.spacing(8)} !important`,
                      '&:hover': {
                        backgroundColor: theme.palette.primary?.main,
                        '& svg': {
                          color: theme.palette.info.contrastText,
                        },
                      },
                    }}
                  >
                    <FacebookIcon color="white" fontSize="inherit" />
                  </StyledIconContainer>
                </RCTypography>
              </Grid>
              <Grid item xs={2}>
                <RCTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <StyledIconContainer
                    theme={theme}
                    sx={{
                      borderRadius: `${theme.spacing(8)} !important`,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        '& svg': {
                          color: theme.palette.info.contrastText,
                        },
                      },
                    }}
                  >
                    <GitHubIcon color="white" fontSize="inherit" />
                  </StyledIconContainer>
                </RCTypography>
              </Grid>
              <Grid item xs={2}>
                <RCTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <StyledIconContainer
                    theme={theme}
                    sx={{
                      borderRadius: `${theme.spacing(8)} !important`,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        '& svg': {
                          color: theme.palette.info.contrastText,
                        },
                      },
                    }}
                  >
                    <GoogleIcon color="white" />
                  </StyledIconContainer>
                </RCTypography>
              </Grid>
            </Grid>
          </RCBox>
          <RCBox pt={4} pb={3} px={3}>
            <RCBox component="form" role="form" onSubmit={formik.handleSubmit}>
              <CardContent>
                {renderFormFields()}
                <FormControlLabel
                  control={
                    <Switch
                      name="isSignup"
                      checked={formik.values.isSignup}
                      onChange={() =>
                        formik.setFieldValue(
                          'isSignup',
                          !formik.values.isSignup
                        )
                      }
                    />
                  }
                  label={
                    formik.values.isSignup
                      ? 'Switch to Login'
                      : 'Switch to Signup'
                  }
                />
                <Box sx={{ display: 'flex', justifyContent: 'flextStart' }}>
                  <Typography variant="body2" color="text.secondary">
                    Forgot your password?
                  </Typography>
                  <MuiLink
                    component="button"
                    variant="body2"
                    // onClick={handleResetPassword}
                    sx={{ ml: 1 }}
                  >
                    Reset
                  </MuiLink>
                </Box>
              </CardContent>
              {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Forgot your password?
                </Typography>
                <MuiLink
                  component="button"
                  variant="body2"
                  // onClick={handleResetPassword}
                  sx={{ ml: 1 }}
                >
                  Reset
                </MuiLink>
              </Box> */}
              {searchParams?.message && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mt: 2, p: 1, bgcolor: 'background.paper' }}
                >
                  {searchParams.message}
                </Typography>
              )}
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <RCBox p={2}>
                  <RCButton
                    variant="contained"
                    color="secondary"
                    size="large"
                    textSizeVariant="header"
                    textWeightVariant="bold"
                    onClick={handleContinueAsGuest}
                    fullWidth
                    startIcon={
                      <StyledIconContainer
                        theme={theme}
                        sx={{
                          borderRadius: `${theme.spacing(2)} !important`,
                        }}
                      >
                        <PeopleAltRoundedIcon color="white" />
                      </StyledIconContainer>
                    }
                    sx={{ width: '100%', fontWeight: 'medium' }}
                  >
                    Continue as Guest
                  </RCButton>
                </RCBox>
                <RCBox p={2} justifyContent="space-around">
                  <RCButton
                    variant="outlined"
                    type="submit"
                    color="success"
                    sx={{ mx: theme.spacing(1), color: '#5CDB95' }}
                  >
                    {formik.values.isSignup ? 'Sign Up' : 'Login'}
                  </RCButton>
                </RCBox>
              </CardActions>
            </RCBox>
          </RCBox>
        </Card>
      </RCBox>
    </div>
  );
};

export default AuthPages;
