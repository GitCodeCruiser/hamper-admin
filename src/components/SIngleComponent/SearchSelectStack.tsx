'use client';

import { Box, BoxProps, Grid, MenuItem, Stack, styled } from '@mui/material';

import { CustomSize } from './CustomViewSize';

import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import SearchIcon from '@/ui/Icons/SearchIcon';

const SearchSelectStack = ({ ...props }: BoxProps) => {
  return (
    <SearchSelectStackWrapper {...props}>
      <Grid container spacing={`${CustomSize(16)}`}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box className="left-col">
            <InputFieldCommon
              placeholder="Search from inquiry"
              startAdornment={<SearchIcon />}
              borderBottomColor={true}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={`${CustomSize(16)}`}
            justifyContent={{ md: 'flex-end', xs: 'flex-start' }}
            className="right-col"
          >
            <CustomSelect initialValue="Filter by" className="rgt-select">
              <MenuItem value="1">Filter by</MenuItem>
              <MenuItem value="2">Filter by</MenuItem>
              <MenuItem value="3">Filter by</MenuItem>
            </CustomSelect>
            <CustomSelect initialValue="Status" className="rgt-select">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="send">Send</MenuItem>
            </CustomSelect>
          </Stack>
        </Grid>
      </Grid>
    </SearchSelectStackWrapper>
  );
};

export default SearchSelectStack;

export const SearchSelectStackWrapper = styled(Box)`
  .left-col {
    max-width: ${CustomSize(303)};

    @media (max-width: 899px) {
      max-width: 100%;
    }
  }

  .rgt-select {
    min-width: ${CustomSize(162)};

    @media (max-width: 899px) {
      min-width: auto;
      width: calc(50% - ${CustomSize(8)});
    }
  }
`;
