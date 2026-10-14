'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  travelOfferAddSchema,
  TTravelOfferAddSchemaType,
} from '../../validation/travel-offer/index.zod';

import { useAircraftListing } from '@/api/hooks/aircraft/hooks';
import { useAirportDataListing } from '@/api/hooks/airport-data/hooks';
import { useTravelOfferCreate } from '@/api/hooks/travel-offer/hooks';
import { useDebounce } from '@/hooks/utils/useDebounce';
import { getAirportLabel } from '@/lib/functions/validation';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TEachAircraft } from '@/types/apps/aircraft/index.type';
import { TEachAirportDataListing } from '@/types/apps/airport-data/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

const TravelOfferAddForm = () => {
  const router = useRouter();

  const form = useForm<TTravelOfferAddSchemaType>({
    resolver: zodResolver(travelOfferAddSchema()),
    defaultValues: {
      sourceId: '',
      destinationId: '',
      aircraftId: '',
      price: 0,
      postedDate: dayjs().format('YYYY-MM-DD'),
      // type: 'one-way',
    },
  });

  const errors = form.formState.errors;

  const [selectedAircraftRaw, setSelectedAircraftRaw] = useState('');
  const [selectedAircrafts, setSelectedAircrafts] = useState<Record<string, TEachAircraft>>({});

  const currentAircraftId = form.watch('aircraftId');
  const selectedAircraftOption = selectedAircrafts[currentAircraftId];
  const aircraftSearchQuery =
    selectedAircraftOption && selectedAircraftRaw === selectedAircraftOption.name
      ? ''
      : selectedAircraftRaw;
  const aircraftSearch = useDebounce(aircraftSearchQuery, 500);

  const { data: aircraftListData, isLoading: aircraftsLoading } = useAircraftListing({
    search: aircraftSearch,
    isBookable: true,
  });

  const aircrafts = aircraftListData || [];

  const [selectedSourceAirportRaw, setSelectedSourceAirportRaw] = useState('');
  const sourceAirportSearch = useDebounce(selectedSourceAirportRaw, 500);

  const [selectedDestinationAirportRaw, setSelectedDestinationAirportRaw] = useState('');
  const destinationAirportSearch = useDebounce(selectedDestinationAirportRaw, 500);

  const [selectedAirports, setSelectedAirports] = useState<Record<string, TEachAirportDataListing>>(
    {},
  );

  const { data: sourceAirportListData, isLoading: sourceAirportsLoading } = useAirportDataListing({
    search: sourceAirportSearch,
  });
  const { data: destinationAirportListData, isLoading: destinationAirportsLoading } =
    useAirportDataListing({
      search: destinationAirportSearch,
    });

  const sourceAirports = sourceAirportListData || [];
  const destinationAirports = destinationAirportListData || [];

  const { mutateAsync: travelOfferSave, isPending: travelOfferSaveLoading } = useTravelOfferCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.travelOffer.list);
    },
    errorCallback: () => {},
  });

  const onSubmit: SubmitHandler<TTravelOfferAddSchemaType> = (data) => {
    travelOfferSave(data);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {/* Source */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Source*</InputLabel>
        <Controller
          control={form.control}
          name="sourceId"
          render={({ field: { onChange, value } }) => (
            <CustomAutocomplete
              id="source-airport"
              options={sourceAirports}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option ? `${option.title} (${option.iata})` : '';
              }}
              autoComplete
              labelName="Select Source Airport"
              placeholder="Select Source Airport"
              noOptionsText="No Airport Found"
              value={
                sourceAirports.find((item) => item._id === value) || selectedAirports[value] || null
              }
              onChange={(_, val) => {
                const airportVal = val as TEachAirportDataListing | null;
                if (airportVal) {
                  setSelectedAirports((prev) => ({ ...prev, [airportVal._id]: airportVal }));
                }
                onChange(airportVal ? airportVal._id : '');
              }}
              onInputChange={(_, val, reason) => {
                if (reason === 'input') {
                  setSelectedSourceAirportRaw(val);
                }
              }}
              loading={sourceAirportsLoading}
              error={!!errors?.sourceId}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box component="li" key={key || option?._id} {...optionProps}>
                    <Typography variant="body2">{getAirportLabel(option)}</Typography>
                  </Box>
                );
              }}
              filterOptions={(x) => x}
            />
          )}
        />
        {errors.sourceId ? (
          <Typography variant="body1" className="error_msg">
            {errors?.sourceId.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Destination */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Destination*</InputLabel>
        <Controller
          control={form.control}
          name="destinationId"
          render={({ field: { onChange, value } }) => (
            <CustomAutocomplete
              id="destination-airport"
              options={destinationAirports}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option ? `${option.title} (${option.iata})` : '';
              }}
              autoComplete
              labelName="Select Destination Airport"
              placeholder="Select Destination Airport"
              noOptionsText="No Airport Found"
              value={
                destinationAirports.find((item) => item._id === value) ||
                selectedAirports[value] ||
                null
              }
              onChange={(_, val) => {
                const airportVal = val as TEachAirportDataListing | null;
                if (airportVal) {
                  setSelectedAirports((prev) => ({ ...prev, [airportVal._id]: airportVal }));
                }
                onChange(airportVal ? airportVal._id : '');
              }}
              onInputChange={(_, val, reason) => {
                if (reason === 'input') {
                  setSelectedDestinationAirportRaw(val);
                }
              }}
              loading={destinationAirportsLoading}
              error={!!errors?.destinationId}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box component="li" key={key || option?._id} {...optionProps}>
                    <Typography variant="body2">{getAirportLabel(option)}</Typography>
                  </Box>
                );
              }}
              filterOptions={(x) => x}
            />
          )}
        />
        {errors.destinationId ? (
          <Typography variant="body1" className="error_msg">
            {errors?.destinationId.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Aircraft */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Aircraft*</InputLabel>
        <Controller
          control={form.control}
          name="aircraftId"
          render={({ field: { onChange, value } }) => (
            <CustomAutocomplete
              id="aircraft-autocomplete"
              options={aircrafts}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option ? option.name : '';
              }}
              autoComplete
              labelName="Select Aircraft"
              placeholder="Select Aircraft"
              noOptionsText="No Aircraft Found"
              value={
                aircrafts.find((item) => item._id === value) || selectedAircrafts[value] || null
              }
              inputValue={selectedAircraftRaw}
              onChange={(_, val) => {
                const aircraftVal = val as TEachAircraft | null;
                if (aircraftVal) {
                  setSelectedAircrafts((prev) => ({ ...prev, [aircraftVal._id]: aircraftVal }));
                  setSelectedAircraftRaw(aircraftVal.name);
                } else {
                  setSelectedAircraftRaw('');
                }
                onChange(aircraftVal ? aircraftVal._id : '');
              }}
              onInputChange={(_, val) => {
                setSelectedAircraftRaw(val);
                if (val !== (selectedAircraftOption?.name || '')) {
                  onChange('');
                }
              }}
              onFocus={(e) => {
                const input = e.target as HTMLInputElement;
                if (input && typeof input.select === 'function') {
                  input.select();
                }
              }}
              loading={aircraftsLoading}
              error={!!errors?.aircraftId}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box component="li" key={key || option?._id} {...optionProps}>
                    <Typography variant="body2">{option?.name}</Typography>
                  </Box>
                );
              }}
              filterOptions={(x) => x}
            />
          )}
        />

        {errors.aircraftId ? (
          <Typography variant="body1" className="error_msg">
            {errors?.aircraftId.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Price */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Price*</InputLabel>
        <Controller
          control={form.control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Price"
              placeholder="Enter price"
              type="number"
              value={value ?? 0}
              onChange={onChange}
              error={!!errors?.price}
              helperText={errors?.price?.message}
            />
          )}
        />
      </Grid>

      {/* Posted Date */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Posted Date</InputLabel>
        <Controller
          control={form.control}
          name="postedDate"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Posted Date"
              type="date"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.postedDate}
              helperText={errors?.postedDate?.message}
              slotProps={{
                htmlInput: {
                  min: dayjs().format('YYYY-MM-DD'),
                  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.preventDefault();
                  },
                  onClick: (e: React.MouseEvent<HTMLInputElement>) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if ('showPicker' in target && typeof target.showPicker === 'function') {
                      try {
                        target.showPicker();
                      } catch {}
                    }
                  },
                },
              }}
            />
          )}
        />
      </Grid>

      {/* Type */}
      {/* <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Type*</InputLabel>
        <Controller
          control={form.control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Type"
              value={value ?? 'one-way'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              error={!!errors?.type}
              fullWidth
            >
              <MenuItem value="one-way">One Way</MenuItem>
              <MenuItem value="two-way">Two Way</MenuItem>
              <MenuItem value="empty-leg">Empty Leg</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid> */}

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={travelOfferSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.travelOffer.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={travelOfferSaveLoading}
          loading={travelOfferSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default TravelOfferAddForm;
