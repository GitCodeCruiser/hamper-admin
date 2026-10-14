import { Box, InputLabel } from '@mui/material';
import { ComponentProps } from 'react';

import InputFieldCommon from '@/ui/CommonInput/CommonInput';

type BuilderInputProps = ComponentProps<typeof InputFieldCommon>;

export default function BuilderInput({ label, required, sx, ...props }: BuilderInputProps) {
  return (
    <Box sx={{ width: props.fullWidth ? '100%' : 'auto', minWidth: 0, ...sx }}>
      {label && (
        <InputLabel
          required={required}
          sx={{
            color: 'common.white',
            fontSize: 13,
            lineHeight: 1.2,
            mb: 1.25,
            position: 'static',
            transform: 'none',
          }}
        >
          {label}
        </InputLabel>
      )}
      <InputFieldCommon {...props} required={required} />
    </Box>
  );
}
