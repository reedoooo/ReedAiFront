import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import React from 'react';

const Cards = () => {
  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {cards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card}>
            <Card>
              <CardContent>
                <Typography variant="h5">Card {card}</Typography>
                <Typography variant="body1">
                  This is some content inside a card.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
