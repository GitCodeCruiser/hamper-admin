'use client';

import { Box, styled, TableBody, TableContainer, TableHead } from '@mui/material';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

export const CustomTableContainer = styled(Box)`
  .pagination-stack {
    padding-top: ${CustomSize(20)};

    @media (max-width: 599px) {
      gap: 15px;
    }

    .MuiPagination-ul {
      gap: ${CustomSize(3)};

      .MuiPaginationItem-root {
        min-width: ${CustomSize(36)};
        height: ${CustomSize(36)};
        background-color: ${({ theme }) => theme.palette.customColors.colorF8F4DC};
        font-size: ${CustomSize(12)};
        border-radius: 0;
        margin: 0;
        padding: 0;

        &.Mui-selected {
          color: ${({ theme }) => theme.palette.text.secondary};
          background-color: ${({ theme }) => theme.palette.secondary.main};
        }

        &.MuiPaginationItem-ellipsis {
          background-color: transparent;
          min-width: ${CustomSize(36)};
          height: ${CustomSize(36)};
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  border-radius: 0;
  box-shadow: none;
  background-color: transparent;

  table {
    width: 100%;
    white-space: nowrap;

    .status-chip {
      font-size: ${CustomSize(12)};
      padding: ${CustomSpacing(0, 9)};
      border-radius: ${CustomSize(30)};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: ${CustomSize(27)};
    }
  }
`;

export const StyledTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.palette.customColors.colorF8F4DC};

  & .MuiTableCell-head {
    color: ${({ theme }) => theme.palette.customColors.textColor};
    font-size: ${CustomSize(13.5)};
    border-bottom: none;
    padding: ${CustomSpacing(12, 15)};
    line-height: 1.5;
    white-space: normal;
    word-break: normal;
    overflow-wrap: break-word;
  }
`;

export const StyledTableBody = styled(TableBody)`
  & .MuiTableRow-root {
    &:last-child td,
    &:last-child th {
      border: 0;
    }
  }
  & .MuiTableCell-body {
    font-size: ${CustomSize(14)};
    padding: ${CustomSpacing(10, 15)};
    border-bottom: ${CustomSize(1)} solid ${({ theme }) => theme.palette.customColors.colorF2EDCF};
    white-space: normal;
    word-break: normal;
    overflow-wrap: break-word;

    &.wrap-text,
    .wrap-text {
      white-space: normal;
      word-break: normal;
      overflow-wrap: break-word;
    }

    &.clamp-text,
    .clamp-text {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-break: normal;
      overflow-wrap: break-word;
      line-height: 1.5;
      /* If the cell has ck-content or block elements, clamp them too */
      * {
        display: inline;
        margin: 0;
        padding: 0;
      }
    }
  }
`;
