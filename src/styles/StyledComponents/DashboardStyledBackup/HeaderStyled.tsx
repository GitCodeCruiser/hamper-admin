'use client';

import { AppBar, Drawer, styled } from '@mui/material';

export const DashboardHead = styled(AppBar)`
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: 15.5px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};
  top: 0;

  @media (max-width: 599px) {
    padding: 10px 16px;
  }

  .MuiToolbar-root {
    justify-content: space-between;
    min-height: auto;

    .logo-link {
      display: none;

      @media (max-width: 1199px) {
        display: inline-block;
      }
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      color: ${({ theme }) => theme.palette.common.white};
      margin: 0;

      @media (max-width: 1199px) {
        display: none;
      }
    }

    .mobile-menubtn {
      padding: 0;
      color: ${({ theme }) => theme.palette.common.white};
      display: none;

      @media (max-width: 1199px) {
        display: inline-flex;
      }
    }
  }

  .header-right {
    gap: 15px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;

    @media (max-width: 599px) {
      gap: 8px;
    }

    li {
      width: auto;

      &:not(:first-child) {
        padding-left: 15px;

        @media (max-width: 599px) {
          padding-left: 0;
        }

        &::after {
          width: 1px;
          height: 24px;
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background-color: ${({ theme }) => theme.palette.customColors.colorB2535F};

          @media (max-width: 599px) {
            display: none;
          }
        }
      }
    }

    .select-day {
      min-width: 170px;

      @media (max-width: 599px) {
        min-width: 130px;
      }

      .MuiSelect-select,
      .intValue {
        @media (max-width: 599px) {
          font-size: 12px;
        }
      }

      .MuiIconButton-root {
        svg {
          @media (max-width: 599px) {
            width: 16px;
            height: auto;
          }
        }
      }
    }

    .MuiAvatar-root {
      @media (max-width: 599px) {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

export const MenuDrawer = styled(Drawer)``;
