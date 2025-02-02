import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/FavoriteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  '&:hover .product-actions': {
    opacity: 1,
  },
});

const ProductActions = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: '10px',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 2,
});

const ActionButton = styled(IconButton)({
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#ff4444',
    color: 'white',
  },
});

const Shop = () => {
  const products = [
    {
      id: 1,
      name: 'فستان أسود قصير',
      category: 'فساتين',
      price: 299.99,
      image: 'https://via.placeholder.com/300x400',
    },
    {
      id: 2,
      name: 'بلوزة كاجوال',
      category: 'بلوزات',
      price: 149.99,
      image: 'https://via.placeholder.com/300x400',
    },
    // Add more products as needed
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="right">
        المتجر
      </Typography>
      
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
              />
              <ProductActions className="product-actions">
                <ActionButton size="small">
                  <FavoriteIcon />
                </ActionButton>
                <ActionButton size="small">
                  <VisibilityIcon />
                </ActionButton>
              </ProductActions>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.category}
                </Typography>
                <Typography variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body1" color="primary" fontWeight="bold">
                  {product.price} ر.س
                </Typography>
              </CardContent>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Shop;
