import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Grid,
  useTheme,
  Divider,
} from '@mui/material';
import React from 'react';
import PieChart from 'components/themed/charts/PieChart';
import { pieChartData, pieChartOptions } from 'config/data-configs/charts';

export default function PieCard(props) {
  const { ...rest } = props;
  const theme = useTheme();

  return (
    <Card sx={{ width: '100%', ...rest }}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h6" component="div">
              Your Pie Chart
            </Typography>
          </Grid>
          <Grid item>
            <Select
              defaultValue="monthly"
              size="small"
              sx={{ fontWeight: 'bold' }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <PieChart
          height="100%"
          width="100%"
          chartData={pieChartData}
          chartOptions={pieChartOptions}
        />

        <Card sx={{ mt: 2, p: 2, boxShadow: theme.shadows[1] }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  Your files
                </Typography>
              </Box>
              <Typography variant="h6" component="div">
                63%
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={5}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#6AD2FF',
                    mr: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  System
                </Typography>
              </Box>
              <Typography variant="h6" component="div">
                25%
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </CardContent>
    </Card>
  );
}
