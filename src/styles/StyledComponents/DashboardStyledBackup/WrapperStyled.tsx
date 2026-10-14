'use client';

import { Stack, styled } from '@mui/material';

export const DashboardWrapStack = styled(Stack)`
  .sidebar-outer {
    width: 280px;
    position: fixed;
    left: 0;
    top: 0;
    height: 100svh;

    @media (max-width: 1199px) {
      display: none;
    }
  }

  .wrapper-right {
    /* background-color: #f9f6e3; */
    background-color: #000000;
    width: calc(100% - 280px);
    margin-left: auto;

    @media (max-width: 1199px) {
      width: 100%;
    }

    .dashboard-body {
      padding: 24px;

      @media (max-width: 599px) {
        padding: 16px;
      }
    }
  }

  .header-title {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.white};
    display: none;
    margin-bottom: 15px;

    @media (max-width: 1199px) {
      display: block;
    }

    @media (max-width: 599px) {
      font-size: 16px;
    }
  }
`;
