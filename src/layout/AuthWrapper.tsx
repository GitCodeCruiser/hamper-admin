'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import assest from '../../json/assest';

import { PAGE_ROUTE } from '@/routes/index.route';
import { AuthStack } from '@/styles/StyledComponents/AuthWrapperStyled';

export type TAuthWrapperProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AuthWrapper = ({ children, title, description }: TAuthWrapperProps) => {
  return (
    <AuthStack direction="row" alignItems="center" flexWrap="wrap">
      <Box className="auth-box">
        <Box className="top-sec">
          {/* <Link href="/" className="logo-link">
            <LogoIcon />
          </Link> */}
          <Link href={`${PAGE_ROUTE.dashboard.homepage}`} className="headerLogo">
            <Image src={assest.hoganiJetslogo} width={300} height={300} alt="hogani-logo" />
          </Link>

          <Typography variant="h1">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
        {children}
      </Box>
    </AuthStack>
  );
};

export default AuthWrapper;
