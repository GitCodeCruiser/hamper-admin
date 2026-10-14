import { Box, Typography } from '@mui/material';

export default function Offline() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant="h1" component="h1" gutterBottom>
        You're offline
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Check your internet connection
      </Typography>
      <Typography variant="body1" paragraph>
        Please check your internet connection and try again.
      </Typography>
    </Box>
  );
}
