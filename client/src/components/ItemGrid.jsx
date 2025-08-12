import React from 'react';
import { Box } from '@mui/material';

const ItemGrid = ({ children }) => (
  <Box
    sx={{
      display: 'grid',
      gap: 2,
      gridTemplateColumns: { xs: 'repeat(auto-fill, minmax(140px,1fr))', sm: 'repeat(auto-fill, minmax(180px,1fr))' },
      alignItems: 'flex-start',
      mt: 2,
    }}
  >
    {children}
  </Box>
);

export default ItemGrid;
