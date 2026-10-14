import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';

import DropDownIcon from '../Icons/DropDownIcon';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

type TCustomSelectProps = SelectProps<string> & {
  initialValue?: string;
  selectIcon?: React.ReactNode;
  startAdornmentIcon?: React.ReactNode;
  textColor?: string;
};

const CustomSelectWrapper = styled(
  ({ textColor, ...props }: TCustomSelectProps) => <Select {...props} />,
  {
    shouldForwardProp: (prop) => prop !== 'textColor',
  },
)`
  &.MuiInputBase-root {
    background-color: transparent;
    border-radius: 0px;
    padding: 0px 0px ${CustomSize(16)};
    border-bottom: 1px solid
      ${({ textColor, theme }) =>
    textColor === '#FFFFFF' ? '#FFFFFF' : theme.palette.primary.main};

    .MuiInputBase-input {
      font-size: ${CustomSize(14)};
      line-height: 1.2;
      color: ${({ textColor }) => textColor || 'inherit'};
      padding: 0;
    }

    .MuiIconButton-root {
      padding: 0;
    }

    .MuiInputAdornment-positionEnd {
      margin-left: ${CustomSize(8)};
    }

    .MuiInputAdornment-positionStart {
      margin-right: ${CustomSize(8)};
    }

    .MuiSelect-select {
      font-size: ${CustomSize(14)};
      color: ${({ textColor }) => textColor || 'inherit'};
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: ${CustomSize(16)};
      line-height: 1.2;
      min-height: auto;
    }

    .MuiSelect-icon {
      padding: 0;
      top: 0px;
      right: 0px;
      pointer-events: none;
      color: ${({ textColor }) => textColor || 'inherit'};
    }
  }

  .intValue {
    font-size: ${CustomSize(14)};
    color: ${({ textColor }) => textColor || 'inherit'} !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  fieldset {
    border: none;
    display: none;
  }
`;

const CustomSelect = (props: TCustomSelectProps) => {
  const {
    initialValue,
    selectIcon,
    startAdornmentIcon,
    onChange,
    textColor,
    value,
    children,
    ...others
  } = props;

  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    if (onChange) {
      onChange(event, child);
    }
  };

  return (
    <CustomSelectWrapper
      {...others}
      value={value ?? ''}
      textColor={textColor}
      onChange={handleChange}
      IconComponent={(props: React.HTMLAttributes<HTMLDivElement>) => (
        <Box
          {...props}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {selectIcon || <DropDownIcon IconColor={textColor} />}
        </Box>
      )}
      startAdornment={
        startAdornmentIcon && (
          <Box component="i" className="start_icon">
            {startAdornmentIcon}
          </Box>
        )
      }
      displayEmpty
    >
      <MenuItem className="init_value" value="" sx={{ display: 'none ' }}>
        <Typography variant="caption" className="intValue">
          {initialValue}
        </Typography>
      </MenuItem>
      {children}
    </CustomSelectWrapper>
  );
};

export default CustomSelect;
