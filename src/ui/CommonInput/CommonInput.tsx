'use client';
import { styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import React, { forwardRef, useCallback, useState } from 'react';

import PasswordNonVisibilityIcon from '../Icons/PasswordNonVisibilityIcon';
import PasswordVisibilityIcon from '../Icons/PasswordVisibilityIcon';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

export const InputWrap = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'borderBottomColor',
})<{ borderBottomColor?: boolean }>`
  .MuiInputBase-root {
    background-color: transparent;
    border-bottom: ${CustomSize(1)} solid
      ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white};
    border-radius: 0;
    padding: 0;
    padding-bottom: ${CustomSize(16)};

    .MuiInputBase-input {
      font-weight: 400;
      font-size: ${CustomSize(14)};
      line-height: 1.2;
      color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white};
      font-family: 'Google Sans', sans-serif;
      padding: 0;

      &::placeholder {
        color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
        opacity: 1;
        -webkit-text-fill-color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
      }

      &::-ms-input-placeholder {
        color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
        opacity: 1;
        -webkit-text-fill-color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
      }
    }

    &.MuiInputBase-multiline {
      padding-bottom: ${CustomSize(8)};
    }

    textarea.MuiInputBase-input {
      resize: vertical !important;
      min-height: ${CustomSize(60)};
      line-height: 1.5;
      overflow: auto;

      &::-webkit-scrollbar {
        width: ${CustomSize(6)};
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
        border-radius: ${CustomSize(3)};
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
    }

    .MuiIconButton-root {
      color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white};
      padding: 0;
    }

    .MuiInputAdornment-positionEnd {
      margin-left: ${CustomSize(8)};
    }

    .MuiInputAdornment-positionStart {
      margin-right: ${CustomSize(8)};
    }
  }

  fieldset {
    display: none;
  }
`;

type TInputFieldCommonProps = StandardTextFieldProps & {
  isPassword?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  labelName?: string;
  borderBottomColor?: boolean;
  maxLength?: number;
  readOnly?: boolean;
};

const InputFieldCommon = forwardRef<HTMLInputElement, TInputFieldCommonProps>(
  (
    {
      isPassword = false,
      startAdornment,
      endAdornment,
      labelName,
      borderBottomColor,
      maxLength,
      readOnly,
      slotProps: externalSlotProps,
      InputProps: externalInputProps,
      inputProps: externalHtmlInputProps,
      ...others
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    const handleMouseDownPassword = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    }, []);

    return (
      <InputWrap
        fullWidth
        autoComplete="new-password"
        variant={others.variant ?? 'outlined'}
        type={isPassword ? (showPassword ? 'text' : 'password') : others?.type}
        slotProps={{
          ...externalSlotProps,
          input: {
            ...(ref ? { inputRef: ref } : {}),
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            endAdornment: isPassword ? (
              <InputAdornment position="end" className="password-icon">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  disableRipple
                >
                  {showPassword ? (
                    <PasswordVisibilityIcon IconColor="currentColor" />
                  ) : (
                    <PasswordNonVisibilityIcon IconColor="currentColor" />
                  )}
                </IconButton>
              </InputAdornment>
            ) : (
              endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
            readOnly,
            ...externalInputProps,
            ...(externalSlotProps?.input ?? {}),
          },
          htmlInput: {
            ...externalHtmlInputProps,
            ...(maxLength ? { maxLength } : {}),
            autoComplete: 'new-password',
            ...(externalSlotProps?.htmlInput ?? {}),
          },
        }}
        borderBottomColor={borderBottomColor}
        {...others}
      />
    );
  },
);

export default InputFieldCommon;
