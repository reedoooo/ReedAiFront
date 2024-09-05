import { Box, Grid } from '@mui/material';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLayout, RCBox } from 'components/index';
import { useMode } from 'hooks';

const ColumnRight = () => {
  const { theme } = useMode();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const [apiKey, setApiKey] = React.useState(
  //   sessionStorage.getItem('apiKey') || ''
  // );
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [menuVisible, setMenuVisible] = React.useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const leftRCBoxRef = useRef(null);
  // const rightRCBoxRef = useRef(null);
  // const getInfoRef = React.useRef(null);

  // const handleToggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  //   getInfoRef.current = templateData;
  //   setMenuVisible(true);
  // };
  // const menuData = templatesMenuData;
  // const menuData = Object.entries(templateData).reduce((acc, [key, value]) => {
  //   if (value.type === 'template') {
  //     acc.push(value);
  //   }
  //   return acc;
  // }, []);

  // const handleListItemClick = index => {
  //   setSelectedIndex(index);
  // };

  // useEffect(() => {
  //   if (menuVisible) {
  //     setTimeout(() => {
  //       setMenuExpanded(true);
  //     }, 500); // Delay for initial visibility animation
  //   }
  // }, [menuVisible]);

  // useEffect(() => {
  //   if (menuExpanded) {
  //     setTimeout(() => {
  //       setMenuItemsVisible(true);
  //     }, 500); // Delay for menu items animation
  //   }
  // }, [menuExpanded]);

  return (
    <PageLayout>
      <Grid
        item
        container
        xs={12}
        sx={{
          // padding: '16px',
          // borderRight: '1px solid #ddd',
          mt: '3.5rem',
          px: '0.25rem',
          overflowY: 'hidden',
        }}
      >
        <Grid
          item
          xs={12}
          // xs={isSidebarOpen ? 8.5 : 12}
          style={{
            padding: '16px',
            transition: 'all 0.3s ease',
            borderRight: '1px solid #ddd',
            height: '120vh',
            overflowY: 'hidden',
          }}
        >
          <RCBox theme={theme} variant="card" ref={leftRCBoxRef}>
            <Box
              height="100%"
              minHeight="100vh"
              maxWidth="100%"
              sx={{ overflowX: 'hidden', m: 0, p: 0 }} // Ensure no margins or paddings
            >
              <Grid
                container
                sx={{
                  minHeight: '100vh',
                  maxWidth: '100vw',
                  // maxWidth: isSidebarOpen ? '100vw' : '80vw',
                  m: 0,
                  p: 0,
                }}
              >
                <Outlet />
              </Grid>
            </Box>
          </RCBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default ColumnRight;
