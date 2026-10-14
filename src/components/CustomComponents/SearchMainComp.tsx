'use client';

import { Box, BoxProps, Grid, MenuItem, Stack, styled } from '@mui/material';
import React, { useState } from 'react';

import { CustomSize } from '../SIngleComponent/CustomViewSize';

import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import SearchIcon from '@/ui/Icons/SearchIcon';

type TSearchMainCompProps = {
  isStatusShow?: boolean;
  isSearchShow?: boolean;
  isFilterShow?: boolean;
  searchPlaceHolder?: string;
  statusValueGetter?: (value: string) => void;
  searchValueGetter?: (value: string) => void;
  renderOtherSelectableComponent?: () => React.ReactNode;
};

const SearchMainComp = ({
  isFilterShow,
  isSearchShow,
  isStatusShow = false,
  searchPlaceHolder,
  statusValueGetter,
  searchValueGetter,
  renderOtherSelectableComponent,
  ...props
}: BoxProps & TSearchMainCompProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  // const [selectedFilter, setSelectedFilter] = useState('');

  return (
    <SearchMainCompWrapper {...props}>
      <Grid container spacing={`${CustomSize(16)}`}>
        <Grid size={{ xs: 12, md: 6 }}>
          {isSearchShow && (
            <Box className="left-col">
              <InputFieldCommon
                placeholder={searchPlaceHolder ?? 'Search'}
                startAdornment={<SearchIcon />}
                borderBottomColor={true}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(() => e.target.value);
                  if (searchValueGetter) {
                    searchValueGetter(e.target.value);
                  }
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={`${CustomSize(16)}`}
            justifyContent={{ md: 'flex-end', xs: 'flex-start' }}
            className="right-col"
          >
            {/* Later enabled if required */}
            {/* <CustomSelect initialValue="Filter by" className="rgt-select">
              <MenuItem value="1">Filter by</MenuItem>
              <MenuItem value="2">Filter by</MenuItem>
              <MenuItem value="3">Filter by</MenuItem>
            </CustomSelect> */}

            {/* Status Selector */}
            {isStatusShow && (
              <CustomSelect
                initialValue="Status"
                className="rgt-select"
                value={selectedStatus}
                onChange={(e) => {
                  // console.log(e.target.value, '@TEST');
                  setSelectedStatus(() => e.target.value);
                  if (statusValueGetter) {
                    statusValueGetter(e.target.value);
                  }
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </CustomSelect>
            )}
            {renderOtherSelectableComponent && renderOtherSelectableComponent()}
          </Stack>
        </Grid>
      </Grid>
    </SearchMainCompWrapper>
  );
};

export default SearchMainComp;

export const SearchMainCompWrapper = styled(Box)`
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
