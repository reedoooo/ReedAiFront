import { alpha, Box, Grid, Icon, Paper, styled } from '@mui/material';

import { RichTreeView } from '@mui/x-tree-view';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { MdAddTask } from 'assets/humanIcons';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { MiniStatistics } from 'components/index';
import { careerTrackerTable } from 'config/data';
import { useMode, useRouter } from 'hooks';
import React, { useEffect, useState } from 'react';
import { MdAddChart, MdBarChart, MdFileCopy, MdMoney } from 'react-icons/md';
import { JobStatusTracker } from './components';
import DailyTraffic from './components/DailyTraffic';
import { CalendarComponent } from './components/DashboardCalendar';
import PieCard from './components/PieCard';
import { Conversion } from './components/Tasks';

// =========================================================
// [DASHBOARD] | ...
// =========================================================
const MainDashboard = () => {
  const { theme } = useMode();
  const boxRef = React.useRef(null);
  const brandColor = '#18b984';
  const boxBg = '#cdd5df';
  const [user, setUser] = useState({});
  const { navigate } = useRouter();
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('userStore'));
    setUser(sessionData?.user);
  }, []);

  const FileTreeWidget = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.grey[800],
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0.2, 0),
      [`& .${treeItemClasses.label}`]: {
        fontSize: '0.8rem',
        fontWeight: 500,
      },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      borderRadius: '50%',
      backgroundColor:
        theme.palette.mode === 'light'
          ? alpha(theme.palette.primary.main, 0.25)
          : theme.palette.primary.dark,
      color:
        theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
      padding: theme.spacing(0, 1.2),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

  const PROJECT_STRUCTURE = [
    {
      id: 'workspaces',
      label: 'src',
      children: [
        { id: 'components', label: 'components' },
        { id: 'pages', label: 'pages' },
        { id: 'utils', label: 'utils' },
      ],
    },
    {
      id: 'public',
      label: 'public',
      children: [
        { id: 'images', label: 'images' },
        { id: 'fonts', label: 'fonts' },
      ],
    },
    { id: 'package.json', label: 'package.json' },
    { id: 'README.md', label: 'README.md' },
  ];
  // const storedUserData = JSON.parse(localStorage.getItem('userStore'));
  // if (!storedUserData) {
  //   return navigate('/auth/sign-in');
  // }
  return (
    <Box paddingTop={{ xs: '130px', sm: '80px' }}>
      {/* <----- Mini Statistics Section -----> */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdBarChart}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="Tasks Completed"
            value="350"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdMoney}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="Hours Logged"
            value="642"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdMoney}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="Overdue Tasks"
            value="42"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdAddChart}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="Active Projects"
            value="10"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdAddTask}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="New Tasks"
            value="154"
          />
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <MiniStatistics
            startContent={
              <IconBox
                width={56}
                height={56}
                bgcolor={boxBg}
                icon={
                  <Icon
                    component={MdFileCopy}
                    sx={{ width: 32, height: 32, color: brandColor }}
                  />
                }
              />
            }
            name="Total Projects"
            value="2935"
          />
        </Grid>
      </Grid>
      {/* <----- Job Status Tracker Section -----> */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12}>
          <Box sx={{ height: '100%' }}>
            {/* <RCBox variant="card"> */}
            <JobStatusTracker tableData={careerTrackerTable} />
            {/* </RCBox> */}
          </Box>
        </Grid>
      </Grid>
      {/* <----- Task Tracker Section -----> */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
              <Conversion />
            </Box>
          </Box>
        </Grid>
        {/* <----- Dashboard Calendar Section -----> */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
              <CalendarComponent />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <DailyTraffic />
                </Grid>
                <Grid item xs={12}>
                  <PieCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <----- User Session Data Section -----> */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <h2>Project Structure</h2>
            <RichTreeView
              defaultExpandedItems={['src']}
              slots={{ item: FileTreeWidget }}
              items={PROJECT_STRUCTURE}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;

// const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
//   color:
//     theme.palette.mode === 'light'
//       ? theme.palette.grey[800]
//       : theme.palette.grey[200],
//   [`& .${treeItemClasses.content}`]: {
//     borderRadius: theme.spacing(0.5),
//     padding: theme.spacing(0.5, 1),
//     margin: theme.spacing(0.2, 0),
//     [`& .${treeItemClasses.label}`]: {
//       fontSize: '0.8rem',
//       fontWeight: 500,
//     },
//   },
//   [`& .${treeItemClasses.iconContainer}`]: {
//     borderRadius: '50%',
//     backgroundColor:
//       theme.palette.mode === 'light'
//         ? alpha(theme.palette.primary.main, 0.25)
//         : theme.palette.primary.dark,
//     color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
//     padding: theme.spacing(0, 1.2),
//   },
//   [`& .${treeItemClasses.groupTransition}`]: {
//     marginLeft: 15,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
//   },
// }));
// function transformDataToMUIFormat(data, parentId = '') {
//   // Helper function to generate a unique ID
//   const generateId = name => (parentId ? `${parentId}-${name}` : name);

//   // Helper function to transform an array
//   const transformArray = (array, id, label) => {
//     console.log('transformArray', array, id, label);
//     return {
//       id: generateId(id),
//       label: label,
//       children: array.map((item, index) => {
//         if (Array.isArray(item)) {
//           return transformArray(item, `${id}-${index}`, `Array item ${index}`);
//         } else if (typeof item === 'object') {
//           return {
//             id: generateId(`${id}-${index}`),
//             label: `Object item ${index}`,
//             children: transformDataToMUIFormat(
//               item,
//               generateId(`${id}-${index}`)
//             ),
//           };
//         } else {
//           return {
//             id: generateId(`${id}-${index}`),
//             label: `${item}`,
//           };
//         }
//       }),
//     };
//   };

//   // Main transformation
//   return Object.keys(data).reduce((acc, key) => {
//     if (Array.isArray(data[key])) {
//       acc.push(transformArray(data[key], key, `${key} array`));
//     } else if (typeof data[key] === 'object') {
//       acc.push({
//         id: generateId(key),
//         label: `${key} object`,
//         children: transformDataToMUIFormat(data[key], generateId(key)),
//       });
//     }
//     return acc;
//   }, []);
// }
