'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import {
  redirectionAddSchema,
  TRedirectionAddSchemaType,
} from '../../validation/redirection/index.zod';

import { useRedirectionCreate } from '@/api/hooks/redirection/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';

const HTTP_STATUS_OPTIONS = [
  { value: 301, label: '301 - Moved Permanently' },
  { value: 302, label: '302 - Found (Temporary Redirect)' },
  { value: 307, label: '307 - Temporary Redirect' },
  { value: 308, label: '308 - Permanent Redirect' },
];

const RedirectionAddForm = () => {
  const router = useRouter();

  const form = useForm<TRedirectionAddSchemaType>({
    resolver: zodResolver(redirectionAddSchema()),
    defaultValues: {
      source: '',
      destination: '',
      statusCode: 301,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: redirectionSave, isPending: redirectionSaveLoading } = useRedirectionCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.redirection.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TRedirectionAddSchemaType) => {
    redirectionSave(data);
  };

  return (
    <Grid container rowSpacing={3}>
      {/* Source URL / Path */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Source URL / Path*</InputLabel>
        <Controller
          control={form.control}
          name="source"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Source"
              placeholder="e.g. /old-page or https://example.com/old-page"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.source}
              helperText={errors?.source?.message}
            />
          )}
        />
      </Grid>

      {/* Destination URL / Path */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Destination URL / Path*</InputLabel>
        <Controller
          control={form.control}
          name="destination"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Destination"
              placeholder="e.g. /new-page or https://example.com/new-page"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.destination}
              helperText={errors?.destination?.message}
            />
          )}
        />
      </Grid>

      {/* HTTP Status Code */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF', mb: 1 }}>HTTP Status Code*</InputLabel>
        <Controller
          control={form.control}
          name="statusCode"
          render={({ field: { onChange, value } }) => (
            <Box sx={{ width: '100%' }}>
              <CustomSelect
                initialValue="Select Status Code"
                textColor="#FFFFFF"
                fullWidth
                value={value !== undefined ? String(value) : '301'}
                onChange={(e) => {
                  onChange(Number(e.target.value));
                }}
              >
                {HTTP_STATUS_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              {errors?.statusCode && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors?.statusCode?.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Grid>

      {/* Buttons */}
      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={redirectionSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.redirection.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={redirectionSaveLoading}
          loading={redirectionSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default RedirectionAddForm;
