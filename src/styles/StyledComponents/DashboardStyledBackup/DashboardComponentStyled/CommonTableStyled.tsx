'use client';

import { Box, styled } from '@mui/material';

export const TableCommonBox = styled(Box)`
  .MuiTableContainer-root {
    border: 1px solid #ffffff1a;
    border-radius: 12px;

    table {
      background-color: ${({ theme }) => theme.palette.grey[50]};
      white-space: nowrap;

      thead {
        th {
          color: ${({ theme }) => theme.palette.customColors.light};
          font-weight: 400;
          font-size: 14px;
          background-color: ${({ theme }) => theme.palette.customColors.tableHeaderBg};
          border-bottom: 1px solid #ffffff1a;
          padding: 12px;
        }
      }

      tbody {
        tr {
          td {
            border-bottom: 1px solid #ffffff1a;
            color: ${({ theme }) => theme.palette.common.white};
            font-size: 14px;
            padding: 14px 12px;

            &:first-child {
              font-weight: 500;
            }
          }

          &:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
`;
