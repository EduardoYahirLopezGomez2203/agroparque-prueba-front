import React from 'react';
import NotFound from '../modules/layer1/notfound/NotFound';
import { Box } from '@mui/material';

const NotAuthorizedPage = () => {
  return (
        <Box 
        sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
        }}
        >
            <Box 
                sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center', 
                p: 2,
                width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
                mx: 'auto',
                }}
            >
                <NotFound />
            </Box>
        </Box>
  );
};

export default NotAuthorizedPage;
