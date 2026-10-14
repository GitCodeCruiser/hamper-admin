import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function CustomLoader({
  color = 'inherit', //"#FFFFFF",
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Box sx={{ display: 'flex', marginRight: '10px' }}>
      <CircularProgress sx={{ color }} size={size} />
    </Box>
  );
}
