'use client';

import { Stack, styled } from '@mui/material';

export const PageUserSegment = styled(Stack)`
  .device-traffic-grid {
    gap: 24px;

    .box-cmn {
      width: calc(50% - (1 * 24px / 2));

      @media (max-width: 1599px) {
        width: 100%;
      }

      .traffic-sourcesbox {
        .chart-outer {
          border: none;
          background-color: ${({ theme }) => theme.palette.grey[50]};
        }
      }
    }
  }
`;
