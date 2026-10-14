'use client';

import { Box, CardProps, Stack, Typography } from '@mui/material';
import React from 'react';

import { TCommonWidgetData } from '../../../json/mocks/demo.mock';

import { CommonWidgetCard } from '@/styles/StyledComponents/DashboardStyledBackup/DashboardComponentStyled/CommonWidgetStyled';
import CaretIcon from '@/ui/Icons/CaretIcon';

const CommonWidget: React.FC<TCommonWidgetData & CardProps> = ({
  dataTitle,
  value,
  change,
  hasLive,
  positive,
  rightContent,
  ...other
}) => {
  return (
    <CommonWidgetCard elevation={0} {...other}>
      <Box className="left-col">
        <Typography variant="body1">{dataTitle}</Typography>
        <Stack direction="row" alignItems="center" flexWrap="wrap" className="typo-stack">
          <Typography variant="h3">{value}</Typography>
          {change && (
            <Typography
              variant="caption"
              className={`sm-text ${positive === false ? 'is-negetive' : ''}`}
            >
              {typeof positive === 'boolean' && (
                <i className="i-span">
                  <CaretIcon IconColor="currentColor" />
                </i>
              )}{' '}
              {change}
            </Typography>
          )}
          {hasLive && <Typography variant="body2">Live</Typography>}
        </Stack>
      </Box>
      <Box className="right-col">{rightContent}</Box>
    </CommonWidgetCard>
  );
};

export default CommonWidget;
