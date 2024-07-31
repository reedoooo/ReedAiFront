import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, CardContent, Typography } from '@mui/material';
import IconBox from 'assets/humanIcons/utils/IconBox';
import { Card, MiniCalendar, PaperCard } from 'components';
import useMode from 'hooks/useMode';
import React from 'react';
import 'react-calendar/dist/Calendar.css';
// import 'react-quill/dist/quill.snow.css';
import 'styles/MiniCalendar.css';

// ==============================|| DASHBOARD CALENDAR ||============================== //

export const CalendarComponent = props => {
  const { theme } = useMode();
  return (
    <Card
      height="100%"
      mode="dark"
      sx={{
        p: '20px',
        align: 'center',
        direction: 'column',
        width: '100%',
      }}
      {...props}
    >
      <PaperCard theme={theme}>
        {/* <Typography variant="h4" sx={{ color: 'white' }}>
          Calendar
        </Typography> */}
        <Box display="flex" alignItems="center">
          <IconBox
            bg="#F4F7FE"
            icon={
              <CalendarMonthIcon
                sx={{
                  width: 24,
                  height: 24,
                  color: '#18b984',
                }}
              />
            }
            sx={{ mr: '12px', width: '38px', height: '38px' }}
          />
          <Typography variant="h6" fontWeight="bold" color="#1B2559">
            Calendar
          </Typography>
        </Box>
      </PaperCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb="30px">
          <MiniCalendar height="100%" minWidth="100%" selectRange={false} />
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardCalendar = () => {
  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
      <CalendarComponent />
    </Box>
  );
};

export default DashboardCalendar;
