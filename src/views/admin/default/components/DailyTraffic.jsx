import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import BarChart from 'components/themed/charts/BarChart';
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from 'config/data-configs/charts';
export default function DailyTraffic(props) {
  const { ...rest } = props;
  const theme = useTheme();

  return (
    <Card sx={{ width: '100%', ...rest }}>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="flex-start">
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Daily Traffic
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h4" component="div">
                2.579
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Visitors
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowUpwardIcon color="success" fontSize="small" />
              <Typography
                variant="body2"
                color="success.main"
                fontWeight="bold"
              >
                +2.45%
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ height: 240, mt: 'auto' }}>
          <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={barChartOptionsDailyTraffic}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
