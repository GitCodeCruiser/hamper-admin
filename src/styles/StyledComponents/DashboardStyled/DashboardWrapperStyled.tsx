'use client';

import { Stack, styled } from '@mui/material';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';

export const Wrapper = styled(Stack)`
  .sidebar-outer {
    width: ${CustomSize(228)};
    position: fixed;
    left: 0;
    top: 0;
    height: 100svh;

    @media (max-width: 1199px) {
      display: none;
    }
  }

  .wrapper-right {
    width: calc(100% - ${CustomSize(228)});
    margin-left: auto;

    @media (max-width: 1199px) {
      width: 100%;
    }

    .page-title {
      display: none;

      @media (max-width: 1199px) {
        display: block;
        position: relative;
        z-index: 1;
        margin-bottom: 20px;
      }
    }

    .child-outer {
      padding: ${CustomSpacing(12, 15, 30)};
    }
  }
`;
