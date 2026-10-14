'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  airportDataAddSchema,
  TAirportDataAddSchemaType,
} from '../../validation/airport-data/index.zod';

import { useAirportDataCreate } from '@/api/hooks/airport-data/hooks';
import { useLocationHierarchy } from '@/api/hooks/location/hooks';
import { handleAmountKeys } from '@/lib/functions/validation';
import { PAGE_ROUTE } from '@/routes/index.route';
import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '@/types/apps/location/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

// ─── Component ──────────────────────────────────────────────────────────────
const AirportDataAddForm = () => {
  const router = useRouter();

  const form = useForm<TAirportDataAddSchemaType>({
    resolver: zodResolver(airportDataAddSchema()),
    defaultValues: {
      icao: '',
      iata: '',
      title: '',
      country: '',
      countryId: '',
      countrySlug: '',
      state: '',
      stateId: '',
      stateSlug: '',
      city: '',
      cityId: '',
      citySlug: '',
      latitude: '',
      longitude: '',
      elevation: 0,
      timezone: '',
    },
  });

  const errors = form.formState.errors;

  const { selectedCountry, selectedState, selectedCity } = {
    selectedCountry: form.watch('country'),
    selectedState: form.watch('state'),
    selectedCity: form.watch('city'),
  };

  // -------------------------------------------------------------------------->
  const {
    countryListRaw,
    countryListRawLoading,
    stateListRaw,
    stateListRawLoading,
    cityListRaw,
    cityListRawLoading,
    onCountryChange,
    onStateChange,
    onCityChange,
  } = useLocationHierarchy({
    countrySearch: selectedCountry,
    stateSearch: selectedState,
    citySearch: selectedCity,
  });
  // -------------------------------------------------------------------------->

  const { countryListData, statesListData, cityListData } = useMemo(() => {
    const countryListData = countryListRaw || [];
    const statesListData = stateListRaw || [];
    const cityListData = cityListRaw || [];
    return { countryListData, statesListData, cityListData };
  }, [countryListRaw, stateListRaw, cityListRaw]);

  const { mutateAsync: airportDataSave, isPending: airportDataSaveLoading } = useAirportDataCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.airportData.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TAirportDataAddSchemaType) => {
    const body: Record<string, any> = {
      icao: data.icao,
      iata: data.iata,
      title: data.title,
      countryId: data.countryId ?? '',
      latitude: data.latitude,
      longitude: data.longitude,
      elevation: data.elevation,
      timezone: data.timezone,
    };

    if (data.stateId) {
      body.stateId = data.stateId;
    }
    if (data.cityId) {
      body.cityId = data.cityId;
    }

    airportDataSave(body);
  };

  return (
    <Grid container rowSpacing={3}>
      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Title*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Airport data title"
              placeholder="Enter airport data title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* ICAO & IATA */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>ICAO Code*</InputLabel>
        <Controller
          control={form.control}
          name="icao"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="ICAO Code"
              placeholder="Enter ICAO code"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.icao}
              helperText={errors?.icao?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>IATA Code*</InputLabel>
        <Controller
          control={form.control}
          name="iata"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="IATA Code"
              placeholder="Enter IATA code"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.iata}
              helperText={errors?.iata?.message}
            />
          )}
        />
      </Grid>

      {/* Country Selection */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Country*</InputLabel>
        <CustomAutocomplete
          id="airport-data-country-list"
          options={countryListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select Country"
          noOptionsText="No Country Found"
          loading={countryListRawLoading}
          loadingText="Loading Countries..."
          value={countryListData?.find((item) => item?.name === selectedCountry) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCountry).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCountry)._id;
              form.setValue('country', val);
              form.setValue('countryId', id);
              form.setValue('countrySlug', (value as TEachLocationCountry).slug);
            } else {
              form.setValue('country', '');
              form.setValue('countryId', '');
              form.setValue('countrySlug', '');
            }
            form.setValue('state', '');
            form.setValue('stateId', '');
            form.setValue('stateSlug', '');
            form.setValue('city', '');
            form.setValue('cityId', '');
            form.setValue('citySlug', '');
          }}
          renderOption={(props, option: TEachLocationCountry) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          onInputChange={(_, value) => {
            if (value !== selectedCountry) {
              form.setValue('country', value);
              form.clearErrors('country');
              onCountryChange(value);

              form.setValue('state', '');
              form.setValue('stateId', '');
              form.setValue('stateSlug', '');
              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
        />

        {errors.country ? (
          <Typography variant="body1" className="error_msg">
            {errors?.country.message}
          </Typography>
        ) : null}
      </Grid>

      {/* State Selection (Optional) */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>State</InputLabel>
        <CustomAutocomplete
          id="airport-data-state-list"
          options={statesListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select State"
          noOptionsText="No State Found"
          loading={stateListRawLoading}
          loadingText="Loading States..."
          renderOption={(props, option: TEachLocationState) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          value={statesListData?.find((item) => item?.name === selectedState) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationState).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationState)._id;
              form.setValue('state', val);
              form.setValue('stateId', id);
              form.setValue('stateSlug', (value as TEachLocationState).slug);
            } else {
              form.setValue('state', '');
              form.setValue('stateId', '');
              form.setValue('stateSlug', '');
            }
            form.setValue('city', '');
            form.setValue('cityId', '');
            form.setValue('citySlug', '');
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedState) {
              form.setValue('state', value);
              form.clearErrors('state');
              onStateChange(value);

              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
        />

        {errors.state ? (
          <Typography variant="body1" className="error_msg">
            {errors?.state.message}
          </Typography>
        ) : null}
      </Grid>

      {/* City Selection (Optional) */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>City</InputLabel>
        <CustomAutocomplete
          id="airport-data-city-list"
          options={cityListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select City"
          noOptionsText="No City Found"
          loading={cityListRawLoading}
          loadingText="Loading Cities..."
          renderOption={(props, option: TEachLocationCity) => {
            const { key, ...optionProps } = props;
            return (
              <Box component="li" key={key} {...optionProps}>
                <Typography variant="body2">{option?.name || String(option)}</Typography>
              </Box>
            );
          }}
          value={cityListData?.find((item) => item?.name === selectedCity) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCity).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCity)._id;
              form.setValue('city', val);
              form.setValue('cityId', id);
              form.setValue('citySlug', (value as TEachLocationCity).slug);
            } else {
              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedCity) {
              form.setValue('city', value);
              form.clearErrors('city');
              onCityChange(value);
            }
          }}
        />

        {errors.city ? (
          <Typography variant="body1" className="error_msg">
            {errors?.city.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Latitude */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Latitude*</InputLabel>
        <Controller
          control={form.control}
          name="latitude"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Latitude"
              placeholder="Enter latitude"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.latitude}
              helperText={errors?.latitude?.message}
            />
          )}
        />
      </Grid>

      {/* Longitude */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Longitude*</InputLabel>
        <Controller
          control={form.control}
          name="longitude"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Longitude"
              placeholder="Enter longitude"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.longitude}
              helperText={errors?.longitude?.message}
            />
          )}
        />
      </Grid>

      {/* Elevation */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Elevation (ft)*</InputLabel>
        <Controller
          control={form.control}
          name="elevation"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Elevation"
              placeholder="Enter elevation"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.elevation}
              helperText={errors?.elevation?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* Timezone */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Timezone*</InputLabel>
        <Controller
          control={form.control}
          name="timezone"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Timezone"
              placeholder="e.g. America/New_York"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.timezone}
              helperText={errors?.timezone?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={airportDataSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.airportData.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={airportDataSaveLoading}
          loading={airportDataSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default AirportDataAddForm;
