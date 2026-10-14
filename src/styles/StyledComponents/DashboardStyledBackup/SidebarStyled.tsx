'use client';

import { Box, styled } from '@mui/material';

export const SideBarBox = styled(Box)`
  background-color: ${({ theme }) => theme.palette.grey[50]};
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};

  .sidebar-logo {
    text-align: center;
    padding: 16px 16px 24px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.customColors.colorB2535F};
    min-height: 80px;

    a {
      display: inline-block;
      line-height: 0;
    }
  }

  .sidebar-menu {
    overflow: auto;
    /* height: calc(100% - 80px); */
    height: calc(100% - 200px);
    padding: 24px 0;

    li {
      &:not(:last-child) {
        margin-bottom: 12px;
      }

      .sidemenu {
        justify-content: flex-start;
        text-transform: capitalize;
        color: ${({ theme }) => theme.palette.customColors.colorB2535F};
        padding: 12px 17px;
        font-size: 16px;
        font-weight: 500;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background-color: ${({ theme }) => theme.palette.error.main};
          border-radius: 0 6px 6px 0;
          opacity: 0;
          transition: all 0.3s;
        }

        .MuiButton-startIcon {
          margin: 0 14px 0 0;
        }

        &.active-menu,
        &:hover {
          color: ${({ theme }) => theme.palette.common.white};
          background-color: transparent;

          &::before {
            opacity: 1;
          }
        }
      }
    }
  }

  /* ── Accordion list item ─────────────────────────── */
  .accordion-list-item {
    flex-direction: column;
    align-items: stretch;
  }

  .sidebar-accordion {
    width: 100%;
    background-color: transparent;
    border: none;

    /* Remove MUI's default divider lines */
    &::before {
      display: none;
    }
  }

  /* AccordionSummary re-uses the .sidemenu class; strip the extra MUI padding */
  .accordion-summary {
    min-height: unset !important;
    padding: 0;
    flex-direction: row;

    /* MUI injects its own content wrapper — reset it */
    .MuiAccordionSummary-content {
      margin: 0;
      width: 100%;
    }

    /* Icon + label row inside the summary */
    .sidemenu-inner {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      font-size: 16px;
      font-weight: 500;

      .start-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
    }

    /* Chevron */
    .accordion-chevron {
      color: ${({ theme }) => theme.palette.customColors.colorB2535F};
      transition:
        transform 0.3s ease,
        color 0.3s;
    }

    &.active-menu .accordion-chevron,
    &:hover .accordion-chevron {
      color: ${({ theme }) => theme.palette.common.white};
    }
  }

  /* ── Children list ───────────────────────────────── */
  .accordion-details {
    padding: 0;
    background-color: transparent;

    /* Subtle left-indent for children */
    .child-menu {
      padding-left: 36px;
      font-size: 14px;
    }
  }

  /* ── Logout ──────────────────────────────────────── */
  .logout-button-wrapper {
    padding-left: 10px;
    padding-right: 10px;
  }
`;
