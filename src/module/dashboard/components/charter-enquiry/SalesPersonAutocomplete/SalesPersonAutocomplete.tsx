import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import CustomAutocomplete from '../../../../../ui/CustomAutocomplete/CustomAutocomplete';

import ProfileAvatar from '@/module/dashboard/components/common/images/ProfileAvatar';
import { TEachSalesPerson } from '@/types/apps/sales-person/index.type';

type SalesPersonAutocompleteProps = {
  value: string;
  onChange: (id: string) => void;
  salesPersonDocs: TEachSalesPerson[];
  salesPersonListLoading: boolean;
  setSalesPersonSearchRaw: (val: string) => void;
  borderBottomColor?: boolean;
};

const SalesPersonAutocomplete = ({
  value,
  onChange,
  salesPersonDocs,
  salesPersonListLoading,
  setSalesPersonSearchRaw,
  borderBottomColor = true,
}: SalesPersonAutocompleteProps) => {
  const [selectedOption, setSelectedOption] = useState<TEachSalesPerson | null>(null);

  useEffect(() => {
    if (!value || salesPersonDocs?.length === 0) {
      setSelectedOption(null);
    } else {
      const found = salesPersonDocs?.find((sp) => sp._id === value);
      if (found) {
        setSelectedOption(found);
      }
    }
  }, [value, salesPersonDocs]);

  return (
    <CustomAutocomplete
      id="assign-sales-person-autocomplete"
      options={salesPersonDocs}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (Array.isArray(option)) return '';
        return option?.fullName || '';
      }}
      loading={salesPersonListLoading}
      labelName="Select Sales Person"
      placeholder={salesPersonListLoading ? 'Loading...' : 'Select Sales Person'}
      noOptionsText="No Sales Person Found"
      value={selectedOption}
      onChange={(e, val) => {
        if (val && !Array.isArray(val) && typeof val !== 'string') {
          setSelectedOption(val);
          onChange(val._id);
        } else {
          setSelectedOption(null);
          onChange('');
        }
      }}
      onInputChange={(_, val, reason) => {
        if (reason === 'input' || reason === 'clear') {
          setSalesPersonSearchRaw(val);
          if (val === '') {
            onChange('');
          }
        }
      }}
      disableClearable={false}
      borderBottomColor={borderBottomColor}
      renderOption={(props, option: TEachSalesPerson) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            component="li"
            key={key || option._id}
            {...optionProps}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <ProfileAvatar image={option.profileImage} size={32} alt={option.fullName} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                {option.fullName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {option.email}
              </Typography>
            </Box>
          </Box>
        );
      }}
      sx={{ width: '100%', mb: 3 }}
    />
  );
};

export default SalesPersonAutocomplete;
