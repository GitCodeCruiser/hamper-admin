'use client';

import { AppBar, AppBarProps, styled } from '@mui/material';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

export const HeaderWrap = styled(AppBar)<AppBarProps>`
  background-color: ${({ theme }) => theme.palette.customColors.colorF8F4DC};
  border-bottom: ${CustomSize(1)} solid ${({ theme }) => theme.palette.customColors.colorE8DFB0};
  color: ${({ theme }) => theme.palette.text.secondary};

  .MuiToolbar-root {
    justify-content: space-between;
    padding: ${CustomSpacing(11, 15)};
    align-items: center;

    .h2 {
      letter-spacing: normal;

      @media (max-width: 1199px) {
        display: none;
      }
    }

    .logo-link {
      display: none;
      line-height: 0;

      @media (max-width: 1199px) {
        display: inline-block;
      }

      img {
        @media (max-width: 599px) {
          width: 120px;
        }
      }
    }

    .header-right {
      gap: ${CustomSize(15)};

      .notification-btn {
        width: ${CustomSize(54)};
        height: ${CustomSize(54)};
        padding: 0;
        border: ${CustomSize(1)} solid ${({ theme }) => theme.palette.customColors.colorE8DFB0};
        border-radius: 0;
        color: ${({ theme }) => theme.palette.customColors.textColor};

        @media (max-width: 899px) {
          width: 40px;
          height: 40px;
        }

        .badge {
          font-size: ${CustomSize(9)};
          color: ${({ theme }) => theme.palette.customColors.textColor};
          min-width: ${CustomSize(15)};
          height: ${CustomSize(15)};
          padding: 0;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.palette.secondary.main};
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: ${CustomSize(10)};
          right: ${CustomSize(10)};

          @media (max-width: 899px) {
            top: 2px;
            right: 2px;
          }
        }
      }

      .header-profile {
        .profile-right {
          width: calc(100% - ${CustomSize(36)});
          padding-left: ${CustomSize(11)};

          @media (max-width: 899px) {
            display: none;
          }

          span {
            font-size: ${CustomSize(12)};
            max-width: ${CustomSize(158)};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
          }
        }
      }

      .menu-btn {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
`;
