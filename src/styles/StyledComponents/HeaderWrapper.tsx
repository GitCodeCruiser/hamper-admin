'use client';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';

export const HeaderWrap = styled(Box)`
  .MuiToolbar-root {
    min-height: auto;
    padding: 0;
    justify-content: space-between;
  }

  .headerLogo {
    width: 20%;
    line-height: 0;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 30px;
    width: 55%;

    a {
      font-weight: 500;
      font-size: 15px;
      color: ${({ theme }) => theme.palette.customColors?.dark};
      position: relative;

      &:hover {
        color: ${({ theme }) => theme.palette.primary.main};
      }

      .cus-badge {
        background-color: ${({ theme }) => theme.palette.secondary.main};
        font-size: 13px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 8px;
        margin-left: 12px;
      }
    }
  }

  .hdr_rgt {
    width: 25%;
    justify-content: flex-end;

    .header-srch {
      width: 100%;
      max-width: 120px;

      .MuiInputBase-root {
        padding: 0;
        border-radius: 0;
        min-height: auto;
        background-color: transparent;

        input {
          &::placeholder {
            color: ${({ theme }) => theme.palette.customColors?.light} !important;
            opacity: 1;
            -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors?.light} !important;
            font-size: 12px;
          }

          &::-ms-input-placeholder {
            color: ${({ theme }) => theme.palette.customColors?.light} !important;
            opacity: 1;
            -webkit-text-fill-color: ${({ theme }) => theme.palette.customColors?.light} !important;
            font-size: 12px;
          }
        }
      }
    }

    button {
      margin-left: 30px;
      padding: 12px;
      min-width: 87px;
      min-height: 45px;
    }
  }

  .headerContainer {
    background-color: transparent !important;
    padding: 20px 0;
    transition: all 0.4s;
  }
`;
