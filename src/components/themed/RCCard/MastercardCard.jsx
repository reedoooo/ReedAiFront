import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';
import { RiMastercardFill } from 'react-icons/ri';
import bgMastercard from 'assets/img/dashboards/Debit.png';

export default function MastercardCard(props) {
  const { exp, cvv, number, ...rest } = props;
  return (
    <Card
      sx={{
        backgroundImage: `url(${bgMastercard})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        alignSelf: 'center',
        width: { xs: '100%', md: '60%', xl: '99%' },
        backgroundPosition: '10%',
        marginX: 'auto',
        padding: '20px',
        color: 'white',
      }}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          direction="column"
          sx={{ height: '100%', width: '100%' }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mb={4.5}
          >
            <Typography variant="h4" fontWeight="bold">
              Glassy.
            </Typography>
            <RiMastercardFill
              style={{ width: 48, height: 'auto', color: '#fff' }}
            />
          </Grid>
          <Grid container direction="column" flexGrow={1}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {number}
              </Typography>
            </Box>
            <Grid container mt={1.75}>
              <Grid item xs={6} md={3} mr={4}>
                <Typography variant="caption">VALID THRU</Typography>
                <Typography variant="subtitle2" fontWeight="500">
                  {exp}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="caption">CVV</Typography>
                <Typography variant="subtitle2" fontWeight="500">
                  {cvv}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
