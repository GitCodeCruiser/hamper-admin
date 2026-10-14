'use client';

import { Box, Stack, styled } from '@mui/material';

export const PageDashboard = styled(Stack)`
  gap: 24px;

  .stat-widget-stack {
    gap: 24px;

    @media (max-width: 1199px) {
      display: none;
    }

    .stat-items {
      width: calc(33.33% - (2 * 24px / 3));

      @media (max-width: 1440px) {
        width: calc(50% - (1 * 24px / 2));
      }

      @media (max-width: 899px) {
        width: 100%;
      }
    }
  }

  .stat-splide {
    display: none;

    @media (max-width: 1199px) {
      display: block;
    }

    .splide__pagination {
      position: unset !important;
      margin-top: 10px;
    }
  }

  .home-bottom-grid {
    gap: 24px;

    .box-cmn {
      width: calc(50% - (1 * 24px / 2));

      @media (max-width: 1599px) {
        width: 100%;
      }
    }
  }
`;

export const UserGrowthTrendSection = styled(Box)`
  overflow: hidden;

  .user-growth {
    background-color: ${({ theme }) => theme.palette.common.black};
    border: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};
    padding: 30px;
    border-radius: 14px;

    @media (max-width: 599px) {
      border-radius: 8px;
      padding: 15px;
    }
  }
`;

export const ToppagesSection = styled(Box)`
  .outer-table {
    border: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};
    padding: 24px;
    border-radius: 14px;

    @media (max-width: 599px) {
      border-radius: 8px;
      padding: 15px;
    }
  }

  .top-pagetable {
    .MuiTableContainer-root {
      max-height: 300px;
    }
  }

  .chart-outer {
    border: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};
    padding: 40px;
    border-radius: 14px;

    @media (max-width: 599px) {
      border-radius: 8px;
      padding: 15px;
    }
  }
`;
