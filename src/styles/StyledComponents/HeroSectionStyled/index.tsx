import { AccordionSummary, Box, styled } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';

export const HeroSectionSelectorWrap = styled(Box)`
  margin-bottom: 28px;

  .selector-label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.common.white};
    margin-bottom: 8px;
  }

  .MuiOutlinedInput-root {
    background-color: ${({ theme }) => theme.palette.customColors?.colorB2535F};
    border-radius: 8px;
    color: ${({ theme }) => theme.palette.common.white};

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.customColors?.colorB2535F};
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.common.white};
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.error.main};
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

export const HeroSectionAccordion = styled(MuiAccordion)`
  background: transparent !important;
  border: 1px solid
    ${({ theme }) => theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.2)'};
  border-radius: 10px !important;
  overflow: visible;
  margin-bottom: 16px;

  &::before {
    display: none;
  }

  &.Mui-expanded {
    margin-bottom: 16px;
  }

  & .MuiCollapse-root,
  & .MuiCollapse-wrapper,
  & .MuiCollapse-wrapperInner,
  & .MuiAccordionDetails-root {
    overflow: visible !important;
  }
`;

export const HeroSectionAccordionSummary = styled(AccordionSummary)`
  background-color: ${({ theme }) =>
    theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.05)'};
  padding: 0 20px;
  min-height: 52px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;

  &.Mui-expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .MuiAccordionSummary-content {
    margin: 14px 0;
  }
`;
