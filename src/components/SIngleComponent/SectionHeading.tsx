'use client';

import { Stack, styled, Typography } from '@mui/material';
import React from 'react';

export type TSectionHeadingProps = {
  title: string;
  children?: React.ReactNode;
};

const SectionHeading: React.FC<TSectionHeadingProps> = ({ title, children }) => {
  return (
    <HeadingStack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Typography variant="h3">{title}</Typography>
      {children}
    </HeadingStack>
  );
};

export default SectionHeading;

export const HeadingStack = styled(Stack)``;
