import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#1a1a1a',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const Logo = styled(Typography)({
  color: '#ff4444',
  fontWeight: 'bold',
  fontSize: '24px',
  textDecoration: 'none',
});

const NavLinks = styled('div')({
  display: 'flex',
  gap: '20px',
});

const Header = () => {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Search>
          <InputBase
            placeholder="ابحث هنا..."
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: 'white', padding: '5px 10px' }}
          />
          <SearchIcon sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} />
        </Search>

        <Logo component={Link} to="/">
          XSTORE
        </Logo>

        <NavLinks>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </NavLinks>
      </StyledToolbar>

      <Toolbar sx={{ backgroundColor: '#2a2a2a', justifyContent: 'center', gap: '20px' }}>
        <Typography component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          الرئيسية
        </Typography>
        <Typography component={Link} to="/shop" sx={{ color: 'white', textDecoration: 'none' }}>
          المتجر
        </Typography>
        <Typography component={Link} to="/blog" sx={{ color: 'white', textDecoration: 'none' }}>
          المدونة
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
