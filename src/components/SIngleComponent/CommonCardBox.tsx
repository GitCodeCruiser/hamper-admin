'use client';

import { Paper, PaperProps, styled } from '@mui/material';

import { CustomSize } from './CustomViewSize';

const CommonCardBox = ({ children, ...rest }: PaperProps) => {
  return (
    <CommonCardBoxWrapper elevation={0} {...rest}>
      {children}
    </CommonCardBoxWrapper>
  );
};

export default CommonCardBox;

export const CommonCardBoxWrapper = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.customColors.colorFFFDEF};
  border-radius: 0;
  padding: ${CustomSize(20)};
`;
