'use client';

import { Box, Stack, StackProps, styled, Typography } from '@mui/material';
import React from 'react';

const SectionHeading: React.FC<any & StackProps> = ({ heading, children, ...props }) => {
  return (
    <HeadingWrap
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Typography variant="h2">{heading}</Typography>
      {children && <Box className="right-sec">{children}</Box>}
    </HeadingWrap>
  );
};

export default SectionHeading;

export const HeadingWrap = styled(Stack)`
  gap: 15px;

  h2 {
    color: ${({ theme }) => theme.palette.common.white};
    font-weight: 600;
    font-size: 24px;

    @media (max-width: 1199px) {
      font-size: 20px;
    }

    @media (max-width: 599px) {
      width: 100%;
      font-size: 14px;
    }
  }

  .select-day {
    min-width: 170px;
  }
`;
