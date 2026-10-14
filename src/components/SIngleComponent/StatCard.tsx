'use client';

import { Box, Paper, styled, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { CustomSize } from './CustomViewSize';

export type TStatCardData = {
  title: string;
  count: string;
  icon: string;
};

const StatCard: React.FC<TStatCardData> = ({ count, icon, title }) => {
  return (
    <StatsPaper elevation={0}>
      <Box className="left-col">
        <Typography variant="body1">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
      </Box>
      <Box className="right-col">
        <Image src={icon} alt="stats-leads" width={44} height={44} />
      </Box>
    </StatsPaper>
  );
};

export default StatCard;

export const StatsPaper = styled(Paper)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${CustomSize(4)};
  border-radius: 0;
  background-color: ${({ theme }) => theme.palette.customColors.colorFFFDEF};
  padding: ${CustomSize(25)};

  .left-col {
    width: calc(100% - ${CustomSize(44)} - ${CustomSize(4)});
  }

  .right-col {
    width: ${CustomSize(44)};
    height: ${CustomSize(44)};

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
