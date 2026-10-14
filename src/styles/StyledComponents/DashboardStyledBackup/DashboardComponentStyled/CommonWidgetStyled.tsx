'use client';

import { Card, styled } from '@mui/material';

export const CommonWidgetCard = styled(Card)`
  box-shadow: none;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  border-radius: 14px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;

  @media (max-width: 1899px) {
    padding: 16px;
  }

  @media (max-width: 599px) {
    border-radius: 8px;
  }

  .left-col {
    .MuiTypography-body1 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 16px;

      @media (max-width: 1899px) {
        font-size: 16px;
      }
    }

    .typo-stack {
      gap: 12px;

      h3 {
        font-weight: 700;
        font-size: 30px;
        color: ${({ theme }) => theme.palette.common.white};

        @media (max-width: 1899px) {
          font-size: 22px;
        }

        @media (max-width: 599px) {
          font-size: 20px;
        }
      }

      .MuiTypography-caption {
        line-height: 1;
        display: flex;
        align-items: center;
        gap: 4px;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.customColors.colorB2535F};

        &.is-negetive {
          color: ${({ theme }) => theme.palette.error.main};

          .i-span {
            transform: rotate(180deg);
          }
        }

        .i-span {
          display: inline-block;
          line-height: 0;
          transition: all 0.3s;

          svg {
            display: block;
          }
        }
      }

      .MuiTypography-body2 {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.common.white};
        position: relative;
        padding-left: 16px;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background-color: ${({ theme }) => theme.palette.error.main};
          border-radius: 50%;
        }
      }
    }
  }

  .right-col {
    /* @media (max-width: 1299px) {
      width: 100%;
    } */

    .res-width {
      @media (max-width: 1899px) {
        width: 150px !important;
      }

      @media (max-width: 599px) {
        width: 100px !important;
      }
    }
  }
`;
