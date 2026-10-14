import { Box, styled } from '@mui/material';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';
import { cormorant } from '@/mui-theme/_muiTheme';

export const CityPageDetailsStyled = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    line-height: 1.2;
    font-family: ${cormorant?.style?.fontFamily};
    letter-spacing: ${CustomSize(-1.25)};
    margin: 0;
    margin-bottom: ${CustomSize(15)};
    &:last-child {
      margin-bottom: 0;
    }
  }
  p {
    font-size: ${CustomSize(11.25)};
    line-height: 1.5em;
    font-weight: 400;
    margin: 0;
    :not(:last-child) {
      margin-bottom: ${CustomSize(15)};
    }

    @media (max-width: 1199px) {
      font-size: 16px;
    }

    @media (max-width: 599px) {
      font-size: 14px;
    }
  }

  h1 {
    font-size: ${CustomSize(63.75)};

    @media (max-width: 1199px) {
      font-size: 60px;
    }

    @media (max-width: 899px) {
      font-size: 50px;
    }

    @media (max-width: 599px) {
      font-size: 42px;
    }
  }

  h2 {
    font-size: ${CustomSize(47.5)};

    @media (max-width: 1199px) {
      font-size: 45px;
    }

    @media (max-width: 899px) {
      font-size: 40px;
    }

    @media (max-width: 599px) {
      font-size: 32px;
    }
  }

  h3 {
    font-size: ${CustomSize(47.5)};

    @media (max-width: 899px) {
      font-size: 40px;
    }
    @media (max-width: 599px) {
      font-size: 30px;
    }
  }

  h4 {
    font-size: ${CustomSize(26.25)};

    @media (max-width: 1199px) {
      font-size: 30px;
    }

    @media (max-width: 899px) {
      font-size: 28px;
    }

    @media (max-width: 599px) {
      font-size: 25px;
    }
  }

  h5 {
    font-size: ${CustomSize(22.5)};
    margin-bottom: ${CustomSize(10)};
    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 899px) {
      font-size: 25px;
    }

    @media (max-width: 599px) {
      font-size: 21px;
    }
  }

  h6 {
    font-size: ${CustomSize(15)};
    margin-bottom: ${CustomSize(10)};
    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 1199px) {
      font-size: 22px;
    }

    @media (max-width: 899px) {
      font-size: 18px;
    }

    @media (max-width: 599px) {
      font-size: 16px;
    }
  }
  ul {
    padding: 0;
    margin: 0;
    margin-top: ${CustomSize(15)};
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      align-items: center;
      gap: ${CustomSize(8.75)};
      font-size: ${CustomSize(11.25)};
      line-height: 1.5em;
      font-weight: 400;
      margin: 0;
      :not(:last-child) {
        margin-bottom: ${CustomSize(15)};
      }

      @media (max-width: 1199px) {
        font-size: 16px;
        padding: 12px 0;
        gap: 13px;
      }

      @media (max-width: 599px) {
        font-size: 14px;
      }
    }
  }
  figure {
    &.table {
      margin: 0;
      background: #fffdf1;
      width: 100%;
      overflow-x: auto;
      border: 1px solid #f0eac5;
      backdrop-filter: blur(24px);
    }
  }

  table {
    border-spacing: 0;
    width: 100%;
    thead {
      tr {
        th {
          white-space: nowrap;
          /* background: ${({ theme }) => theme.palette.customColors.colorF3EDCD}; */
          background: ${({ theme }) => theme.palette.primary.main};
          color: ${({ theme }) => theme.palette.secondary.main};

          /* background: ${({ theme }) => theme.palette.secondary.main};
          color: ${({ theme }) => theme.palette.primary.main}; */

          padding: ${CustomSpacing(14.75, 17.5)};
          font-weight: 500;
          font-size: ${CustomSize(11.25)};
          text-align: left;
          @media (max-width: 1199px) {
            font-size: 16px;
          }
          @media (max-width: 599px) {
            font-size: 14px;
          }
        }
      }
    }
    tbody {
      tr {
        td {
          white-space: nowrap;
          padding: ${CustomSpacing(12, 17.5)};
          font-size: ${CustomSize(11.25)};
          border-bottom: 1px solid rgba(226, 228, 229, 1);
          font-family: 'Google Sans', sans-serif;
          color: #10212b;
          text-align: left;
          @media (max-width: 1199px) {
            font-size: 16px;
          }
          @media (max-width: 599px) {
            font-size: 14px;
          }
        }

        &:last-child {
          td {
            border-bottom: 0;
          }
        }

        &:nth-child(even) {
          background-color: #6b071c17;
        }
      }
    }
  }
`;
