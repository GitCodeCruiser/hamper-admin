'use client';

import { Box, styled } from '@mui/material';

import assest from '../../../../json/assest';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

export const Sidebar = styled(Box)`
  background: url(${assest.sidenavbg}) no-repeat bottom left;
  background-size: cover;
  height: 100%;

  .logo-box {
    text-align: center;
    line-height: 0;
    padding: ${CustomSpacing(20, 15)};
    border-bottom: ${CustomSize(1)} solid rgba(232, 223, 176, 0.4);

    a {
      line-height: 0;
      display: inline-block;
      width: 100%;

      img {
        width: 100%;
        max-width: 100%;
        height: auto;
        object-fit: contain;
      }
    }
  }

  .scroll-box {
    height: calc(100% - ${CustomSize(79)});
    overflow-y: auto;
    padding: ${CustomSpacing(13, 15, 30, 15)};

    .MuiList-root {
      .MuiListItem-root {
        display: block;

        &:not(:last-child) {
          margin-bottom: ${CustomSize(3)};
        }

        a,
        .MuiAccordionSummary-root {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: ${CustomSize(8)};
          color: ${({ theme }) => theme.palette.common.white};
          padding: ${CustomSpacing(14, 12)};
          min-height: auto;
          text-decoration: none;
          white-space: nowrap;
          min-width: 0;

          p,
          .MuiTypography-root {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &.MuiAccordionSummary-root {
            margin: 0;
            padding: ${CustomSpacing(14, 12)};
          }

          .MuiAccordionSummary-content {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: ${CustomSize(8)};
            min-width: 0;
            flex-grow: 1;

            p,
            .MuiTypography-root {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            &.Mui-expanded {
              margin: 0;
            }
          }

          .MuiAccordionSummary-expandIconWrapper {
            flex-shrink: 0;
          }

          .i-span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: ${CustomSize(18)};
            height: ${CustomSize(18)};
            flex-shrink: 0;

            svg {
              width: 100%;
              height: 100%;
            }
          }

          &:hover,
          &.active {
            background-color: ${({ theme }) => theme.palette.secondary.main};
            color: ${({ theme }) => theme.palette.customColors.textColor};

            .MuiSvgIcon-root {
              color: ${({ theme }) => theme.palette.customColors.textColor};
            }
          }
        }

        .MuiAccordion-root {
          background: transparent;
          box-shadow: none;
          color: ${({ theme }) => theme.palette.common.white};
          margin: 0 !important;
          &:before {
            display: none;
          }

          .MuiAccordionDetails-root {
            padding: ${CustomSpacing(5, 0)};

            .MuiListItem-root {
              margin-bottom: ${CustomSize(5)};
              a {
                padding-left: ${CustomSize(30)};
              }
            }
          }
        }
      }
    }

    .logout-btn {
      justify-content: flex-start;
      color: ${({ theme }) => theme.palette.common.white};
      padding: ${CustomSpacing(16, 18)};
      text-transform: inherit;

      &:hover {
        background-color: ${({ theme }) => theme.palette.secondary.main};
        color: ${({ theme }) => theme.palette.customColors.textColor};
      }
    }
  }
`;
