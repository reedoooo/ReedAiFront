import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import React from 'react';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$20',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$30',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$40',
    imageUrl: 'https://via.placeholder.com/200',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$50',
    imageUrl: 'https://via.placeholder.com/200',
  },
];

const EcommerceProductGridLayout = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">{product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EcommerceProductGridLayout;
