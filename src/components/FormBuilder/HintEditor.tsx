import { Box, InputLabel, TextField, Typography } from '@mui/material';

interface HintEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HintEditor({ value, onChange }: HintEditorProps) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'rgba(255,255,255,.035)',
        border: '1px solid rgba(255,255,255,.2)',
        borderRadius: 1,
      }}
    >
      <InputLabel sx={{ color: 'common.white', fontSize: 13, fontWeight: 600, mb: 0.5 }}>
        Hint callout (optional)
      </InputLabel>
      <Typography sx={{ color: 'rgba(255,255,255,.62)', fontSize: 11, mb: 1.25 }}>
        Use the first line as the heading. Add the description on the following lines.
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={4}
        value={value}
        placeholder={'HIGH-FREQUENCY TRAVELER\nAdd the helpful description here.'}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'common.white',
            bgcolor: 'rgba(0,0,0,.08)',
            borderRadius: 1,
            fontSize: 14,
            lineHeight: 1.5,
            '& fieldset': { borderColor: 'rgba(255,255,255,.32)' },
            '&:hover fieldset': { borderColor: 'primary.main' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
          },
          '& textarea::placeholder': { color: 'rgba(255,255,255,.48)', opacity: 1 },
        }}
      />
    </Box>
  );
}
