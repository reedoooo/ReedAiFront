import { Outlet } from 'react-router-dom';

const BlankLayout = () => (
  <>
    <Outlet />
  </>
);
export default BlankLayout;
// import { Box } from '@mui/material';
// import PageLayout from 'components/PageLayout';
// import { Outlet } from 'react-router-dom';
// import useMode from 'hooks/useMode';
// function BlankLayout() {
//   const { theme } = useMode();
//   const authBg = theme.palette.mode === 'light' ? 'white' : 'navy.900';
//   document.documentElement.dir = 'ltr';
//   return (
//     <Box>
//       <Box
//         sx={{
//           backgroundColor: authBg,
//           float: 'right',
//           minHeight: '100vh',
//           height: '100%',
//           position: 'relative',
//           width: '100%',
//           transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
//           transitionDuration: '.2s, .2s, .35s',
//           transitionProperty: 'top, bottom, width',
//           transitionTimingFunction: 'linear, linear, ease',
//         }}
//       >
//         <PageLayout>
//           <Outlet />
//         </PageLayout>
//       </Box>
//     </Box>
//   );
// }
// export default BlankLayout;
