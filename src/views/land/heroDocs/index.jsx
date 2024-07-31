/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  styled,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SequentialAnimations } from 'assets/animation';
import { PageLayout } from 'components/index';
import RCTypography from 'components/themed/HumanUi/RCTypography';
import { templateData } from 'config/data';
import useMode from 'hooks/useMode';
import useRouter from 'hooks/useRouter';

const StyledMenuList = styled(props => (
  <MenuList
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 2,
    marginTop: theme.spacing(1),
    minWidth: 180,
    maxWidth: 350,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    backgroundColor: alpha('#000000', 0.8), // Very translucent black background
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& .MuiMenuItem-root': {
      fontWeight: '400', // Adjust this to match ESLint text style
      color: '#FFFFFF', // Adjust this to match ESLint text style
      lineHeight: 1.5, // Adjust this to match ESLint text style
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function Landing() {
  const { theme } = useMode();
  const { navigate } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [menuItemsVisible, setMenuItemsVisible] = useState(false);
  const getInfoRef = React.useRef(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    getInfoRef.current = templateData;
    setMenuVisible(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuVisible(false);
    setMenuExpanded(false);
    setMenuItemsVisible(false);
  };

  useEffect(() => {
    if (menuVisible) {
      setTimeout(() => {
        setMenuExpanded(true);
      }, 500); // Delay for initial visibility animation
    }
  }, [menuVisible]);

  useEffect(() => {
    if (menuExpanded) {
      setTimeout(() => {
        setMenuItemsVisible(true);
      }, 500); // Delay for menu items animation
    }
  }, [menuExpanded]);

  // Split templateDate into two columns
  const half = Math.ceil(templateData.length / 2);
  const firstColumn = templateData.slice(0, half);
  const secondColumn = templateData.slice(half);

  return (
    <Grid item xs={12}>
      <PageLayout>
        {/* ======= LEFT COLUMN: Header, Default Generator Button, Routes Menu ======= */}
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100vh',
            maxHeight: '100vh',
            width: '100%',
            padding: 4,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: '100vh',
              maxHeight: '100vh',
              // overflow: 'hidden',
            }}
          >
            {/* ======= HEADER ======= */}
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ fontSize: '2rem', fontWeight: 'bold' }}
            >
              AI Cover Letter Generator
            </Typography>
            {/* ======= DEFAULT GENERATOR BUTTON ======= */}
            <Typography
              variant="body1"
              component="p"
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              Generate a cover letter in seconds precisely tuned to the job you
              are applying for.
              <br />
              Click the Generate button to get started.
            </Typography>
            {/* ======= ROUTES MENU ======= */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2, // Space between buttons
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/auth/sign-in')}
              >
                Generate
              </Button>
              <Button
                id="open-route-list-menu"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                variant="outlined"
                onClick={handleClick}
              >
                More Info
              </Button>
            </Box>
            <Box
              component={motion.div}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: menuVisible ? 1 : 0,
                height: menuExpanded ? 'auto' : 0,
                width: menuVisible ? 'calc(50vw - 1rem)' : 0,
                x: menuVisible ? 0 : '-100%', // Adjust the x position to start off-screen
              }}
              transition={{ duration: 0.5 }}
              sx={{ overflow: 'hidden', marginTop: 2 }}
            >
              <Paper
                sx={{
                  maxWidth: 'calc(50vw - 60px)',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                }}
              >
                <StyledMenuList
                  component={motion.div}
                  initial="hidden"
                  animate={menuItemsVisible ? 'visible' : 'hidden'}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: -20,
                      transition: {
                        staggerChildren: 0.1,
                        staggerDirection: -1,
                      },
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        staggerChildren: 0.1,
                        staggerDirection: 1,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    {firstColumn.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: -10,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                        style={{
                          flex: '0 1 45%',
                          margin: '8px',
                        }} // Adjust the flex basis to ensure wrapping
                      >
                        <MenuItem component={NavLink} to={item.link}>
                          <ListItemIcon
                            sx={{
                              color:
                                theme.palette.mode === 'light'
                                  ? 'rgb(55, 65, 81)'
                                  : theme.palette.grey[300],
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <Typography>{item.title}</Typography>
                        </MenuItem>
                        <Divider />
                      </motion.div>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    {secondColumn.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: -10,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                      >
                        <MenuItem
                          component={NavLink}
                          to={item.link}
                          color={theme.palette.primary.main}
                        >
                          <ListItemIcon
                            sx={{
                              color:
                                theme.palette.mode === 'light'
                                  ? 'rgb(55, 65, 81)'
                                  : theme.palette.grey[300],
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText inset>{item.title}</ListItemText>
                        </MenuItem>
                        <Divider />
                      </motion.div>
                    ))}
                  </Box>
                </StyledMenuList>
              </Paper>
            </Box>
          </Box>
        </Grid>
        {/* ======= RIGHT COLUMN ======= */}
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          lg={4}
          sx={{
            backgroundColor: '#1F2937',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '460px',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              padding: 4,
            }}
          >
            <Box sx={{ width: '100%', marginBottom: 4 }}>
              {/* <TypingAnimation /> */}
              <SequentialAnimations />
            </Box>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: 4,
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <RCTypography variant="h6" component="h2" gutterBottom>
                About
              </RCTypography>
              <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                This is a simple cover letter generator. It is a project to help
                me learn React and Material-UI. The code is available on{' '}
                <a
                  href="https://github.com/reedooooo/cover-letter-generator"
                  style={{
                    color: '#64b5f6',
                    textDecoration: 'none',
                  }}
                >
                  GitHub
                </a>
                .
              </Typography>
            </Paper>
          </Container>
        </Grid>
      </PageLayout>
    </Grid>
  );
}
export const HeroDocs = () => {
  return <Landing />;
};

export default Landing;
