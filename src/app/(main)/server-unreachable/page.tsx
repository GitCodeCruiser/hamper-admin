'use client';

import { Box, Button, Typography } from '@mui/material';

import { PAGE_ROUTE } from '@/routes/index.route';
import { authZustand } from '@/zustand/auth.zustand';

export default function ServerUnreachable() {
  const handleClearSession = () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'forceLogout=true; path=/; max-age=60';
    }
    authZustand.set('isLoggedIn', false);
    authZustand.set('userData', null);
    window.location.href = PAGE_ROUTE.auth.login;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h1" component="h1" gutterBottom color="error">
        503
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Server Unreachable
      </Typography>
      <Typography variant="body1" paragraph>
        The server is currently unresponsive or unreachable. Please try again later.
      </Typography>

      <Box mt={3} display="flex" gap={2} justifyContent="center" flexWrap="wrap">
        <Button
          variant="contained"
          color="primary"
          // onClick={() => window.location.reload()}
          onClick={() => {
            window.location.href = PAGE_ROUTE.auth.login;
          }}
        >
          Retry
        </Button>
        <Button variant="outlined" color="error" onClick={handleClearSession}>
          Clear Session & Return to Login
        </Button>
      </Box>
    </Box>
  );
}
