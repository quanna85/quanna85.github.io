import React from 'react';

// MUI Core
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
