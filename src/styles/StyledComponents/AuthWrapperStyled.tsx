'use client';

import { Box, BoxProps, Stack, styled } from '@mui/material';

import assest from '../../../json/assest';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

export const AuthStack = styled(Stack)`
  background: url(${assest.authbg}) no-repeat top center;
  background-size: cover;
  min-height: 100vh;
  padding: ${CustomSpacing(15, 15, 15, 75)};

  @media (max-width: 1199px) {
    padding-left: 15px;
    justify-content: center;
    background-image: none;
  }

  .auth-box {
    max-width: ${CustomSize(483)};
    width: 100%;
    background-color: #6b0f1aeb;
    backdrop-filter: blur(${CustomSize(9)});
    box-shadow: ${CustomSpacing(0, 18, 55, 0)} rgba(212, 175, 55, 0.17);
    padding: ${CustomSpacing(50, 45)};

    @media (max-width: 599px) {
      padding: 30px 25px;
    }

    .top-sec {
      text-align: center;
      color: ${({ theme }) => theme.palette.common.white};
      margin-bottom: ${CustomSize(40)};

      .logo-link {
        line-height: 0;
        margin-bottom: ${CustomSize(45)};

        img {
          width: ${CustomSize(187)};
          height: ${CustomSize(30)};
        }
      }

      h1 {
        margin-bottom: ${CustomSize(8)};
      }
    }

    .remember-stack {
      .MuiFormControlLabel-root {
        margin: 0;

        .MuiCheckbox-root {
          padding: ${CustomSpacing(0, 6, 0, 0)};
        }

        .MuiTypography-body1 {
          color: ${({ theme }) => theme.palette.common.white};
        }
      }

      a {
        color: ${({ theme }) => theme.palette.common.white};
      }
    }
  }

  .backto-pagelink {
    display: inline-flex;
    align-items: center;
    gap: ${CustomSize(6)};
    color: ${({ theme }) => theme.palette.common.white};
    font-size: ${CustomSize(14)};

    span {
      line-height: 0;
    }

    &:hover {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

export const NotificationSettingStyled = styled(Box)<BoxProps>`
  h3 {
    font-size: ${CustomSize(15)};
    margin-bottom: ${CustomSize(15)};
    letter-spacing: 0;

    @media (max-width: 1199px) {
      font-size: 20px;
    }
  }
  ul {
    li {
      justify-content: space-between;
      flex-wrap: wrap;

      &:not(:last-child) {
        margin-bottom: ${CustomSize(15)};
      }

      .notifi-rowleft {
        width: calc(100% - ${CustomSize(41)});

        .MuiTypography-body1 {
          font-size: ${CustomSize(11.67)};
          font-weight: 600;

          @media (max-width: 1199px) {
            font-size: 14px;
            margin-bottom: 3px;
          }
        }

        .MuiTypography-body2 {
          font-size: ${CustomSize(11.67)};

          @media (max-width: 1199px) {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
