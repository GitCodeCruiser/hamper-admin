'use client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

import AuthWrapper from '@/layout/AuthWrapper';
import { PAGE_ROUTE } from '@/routes/index.route';

interface IEmailProps {
  inputValue?: string;
}
const CheckEmailPage = ({ inputValue }: IEmailProps) => {
  return (
    <AuthWrapper
      description=""
      title={`We sent a password reset link to ${inputValue !== '' ? inputValue : 'example@gmail.com'}`}
    >
      <Box className="grid-wrap">
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ margin: '30px 0' }}
          LinkComponent={Link}
          href={`${PAGE_ROUTE.auth.forgotPassword}`}
        >
          Open Email App
        </Button>
        <Typography variant="body1" className="btm-text" fontSize="16px !important">
          Didn’t receive the email? &nbsp;
          <Button disableRipple sx={{ fontSize: '16px', fontWeight: 600 }}>
            Click to Resend
          </Button>
        </Typography>
      </Box>
    </AuthWrapper>
  );
};

export default CheckEmailPage;
