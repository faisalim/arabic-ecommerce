import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { rtl } from '@mui/material/styles';
import Header from './components/Header';
import Home from './pages/Home';
import Shop from './pages/Shop';
import { StylesProvider } from '@mui/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#ff4444',
    },
    secondary: {
      main: '#333333',
    },
  },
  typography: {
    fontFamily: 'Cairo, sans-serif',
  },
});

function App() {
  return (
    <StylesProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div dir="rtl">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
