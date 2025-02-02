import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          مرحباً بك في متجرنا
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          اكتشف أحدث صيحات الموضة والأزياء
        </Typography>
        <Button
          component={Link}
          to="/shop"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4 }}
        >
          تسوق الآن
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
