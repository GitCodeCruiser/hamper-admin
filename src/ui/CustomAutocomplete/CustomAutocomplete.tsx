import { Autocomplete, AutocompleteProps, Box, styled } from '@mui/material';
import React from 'react';

import InputFieldCommon from '../CommonInput/CommonInput';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

const AutocompleteWrap = styled(Box)`
  width: 100%;

  .MuiAutocomplete-root {
    .MuiInputBase-root {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
      /* Style handled by InputFieldCommon */

      .MuiAutocomplete-input {
        padding: 0;
      }
    }

    .MuiAutocomplete-endAdornment {
      top: 0 !important;
      right: 0 !important;
    }
  }
`;

type TCustomAutocompleteProps<T> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean>,
  'renderInput'
> & {
  isFreeSolo?: boolean;
  labelName?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  borderBottomColor?: boolean;
};

const CustomAutocomplete = <T,>(props: TCustomAutocompleteProps<T>) => {
  const {
    labelName,
    placeholder,
    error,
    helperText,
    borderBottomColor,
    options,
    value,
    onChange,
    getOptionLabel,
    id,
    ...others
  } = props;

  return (
    <AutocompleteWrap>
      <Autocomplete
        id={id}
        disableClearable
        options={options}
        value={value}
        onChange={onChange}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => {
          const { InputProps, ...inputParams } = params;
          return (
            <InputFieldCommon
              {...inputParams}
              slotProps={{
                input: {
                  ...InputProps,
                },
              }}
              placeholder={placeholder || labelName}
              error={error}
              helperText={helperText}
              borderBottomColor={borderBottomColor}
            />
          );
        }}
        slotProps={{
          popper: {
            sx: {
              '& .MuiAutocomplete-paper': {
                backgroundColor: '#1E1E1E',
                color: '#FFFFFF',
                borderRadius: CustomSize(4),
                marginTop: CustomSize(4),
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              '& .MuiAutocomplete-noOptions': {
                color: '#FFFFFF',
                backgroundColor: '#1E1E1E',
                padding: CustomSize(16),
                fontSize: CustomSize(14),
              },
              '& .MuiAutocomplete-loading': {
                color: '#FFFFFF',
                backgroundColor: '#1E1E1E',
                padding: CustomSize(16),
                fontSize: CustomSize(14),
              },
              '& .MuiAutocomplete-listbox': {
                padding: CustomSize(8),
                '& .MuiAutocomplete-option': {
                  padding: `${CustomSize(8)} ${CustomSize(12)}`,
                  borderRadius: CustomSize(4),
                  '&[aria-selected="true"]': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              },
            },
          },
        }}
        {...others}
      />
    </AutocompleteWrap>
  );
};

export default CustomAutocomplete;
