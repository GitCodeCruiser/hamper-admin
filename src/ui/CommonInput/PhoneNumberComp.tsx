import { Box, InputLabel, styled } from '@mui/material';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';

import { CustomSize, CustomSpacing } from '@/components/SIngleComponent/CustomViewSize';
import 'react-international-phone/style.css';

interface IPhoneNumberCompProps {
  labelName?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disableFormatting?: boolean;
  defaultPhoneNumber?: string;
  phoneNumberValueGetter?: (countryCode: string, inputValue: string, value: string) => void;
}

export const InputPhoneWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'borderBottomColor',
})<{ borderBottomColor?: boolean }>`
  .react-international-phone-input-container {
    background-color: transparent;
    border-bottom: ${CustomSize(1)} solid
      ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white};
    border-radius: 0;
    min-height: ${CustomSize(19.375)};
    padding: 0;
    /* padding-bottom: ${CustomSize(13)};
    @media (max-width: 599px) {
      padding-bottom: 16px;
    } */
    .react-international-phone-input {
      border: 0 !important;
      padding: 0 !important;
      height: initial !important;
      flex: 1;
      background: transparent !important;
      padding-bottom: ${CustomSize(14)} !important;
      font-weight: 400 !important;
      font-size: ${CustomSize(14)} !important;
      line-height: 1.2 !important;
      color: ${({ theme }) => theme.palette.common.white} !important;
      font-family: 'Google Sans', sans-serif !important;
      @media (max-width: 1199px) {
        font-size: 16px !important;
        padding-bottom: 12px !important;
      }

      @media (max-width: 599px) {
        padding-bottom: 16px !important;
        font-size: 14px !important;
      }
      &::placeholder {
        color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
        opacity: 1;
        -webkit-text-fill-color: ${({ theme, borderBottomColor }) =>
    borderBottomColor ? theme.palette.text.secondary : theme.palette.common.white} !important;
      }
    }
    .react-international-phone-country-selector {
      padding-bottom: ${CustomSize(14)} !important;
      @media (max-width: 1199px) {
        padding-bottom: 12px !important;
      }
      .react-international-phone-flag-emoji {
        width: ${CustomSize(15)} !important;
        height: ${CustomSize(15)} !important;
        margin: 0 !important;
        margin-right: ${CustomSize(2)} !important;
        @media (max-width: 1199px) {
          width: 24px !important;
          height: 24px !important;
          margin-right: 5px !important;
        }
      }
      .react-international-phone-country-selector-button__dropdown-arrow {
        border-right-width: ${CustomSize(2.5)} !important;
        border-top-width: ${CustomSize(2.5)} !important;
        border-left-width: ${CustomSize(2.5)} !important;
        @media (max-width: 1199px) {
          border-right-width: 4px !important;
          border-top-width: 4px !important;
          border-left-width: 4px !important;
        }
      }
      @media (max-width: 599px) {
        padding-bottom: 16px !important;
      }
      .react-international-phone-country-selector-button {
        background: transparent !important;
        padding: 0 !important;
        border: 0 !important;
        margin: 0 !important;
        height: inherit !important;
      }
    }
    .react-international-phone-country-selector-dropdown {
      width: ${CustomSize(150)} !important;
      max-height: ${CustomSize(150)} !important;
      padding: ${CustomSpacing(2, 0)} !important;
      @media (max-width: 1199px) {
        width: 250px !important;
        max-height: 250px !important;
        padding: 4px 0 !important;
      }
      .react-international-phone-country-selector-dropdown__list-item {
        min-height: ${CustomSize(20)} !important;
        padding: ${CustomSpacing(1, 5)} !important;
      }
      .react-international-phone-country-selector-dropdown__list-item-country-name,
      .react-international-phone-country-selector-dropdown__list-item-dial-code {
        font-size: ${CustomSize(14)} !important;
        @media (max-width: 1199px) {
          font-size: ${CustomSize(14)} !important;
        }
      }
    }
    .react-international-phone-country-selector-dropdown__list-item-country-name {
    }
  }
`;

const PhoneNumberComp: React.FC<IPhoneNumberCompProps> = ({
  labelName,
  placeholder,
  onBlur,
  error,
  helperText,
  phoneNumberValueGetter,
  disableFormatting = true,
  defaultPhoneNumber = '',
}) => {
  const [phone, setPhone] = useState(() => defaultPhoneNumber);

  return (
    <InputPhoneWrap>
      {labelName && <InputLabel>{labelName}</InputLabel>}
      <PhoneInput
        defaultCountry="us"
        value={phone}
        disableFormatting={disableFormatting}
        onChange={(phoneNumber, meta) => {
          setPhone(phoneNumber);

          //--- Below is the hook function to get the value
          if (phoneNumberValueGetter) {
            phoneNumberValueGetter(meta?.country?.dialCode, meta?.inputValue, phoneNumber);
          }
        }}
        onBlur={onBlur}
        inputProps={{ placeholder }}
      />
      {error && (
        <Box component="p" sx={{ color: '#DC2B31', mt: 1, ml: 2, fontSize: 12 }}>
          {helperText}
        </Box>
      )}
    </InputPhoneWrap>
  );
};

export default PhoneNumberComp;
