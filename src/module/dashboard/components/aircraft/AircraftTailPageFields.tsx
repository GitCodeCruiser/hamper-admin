'use client';

import { Box, Grid, InputLabel, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import { useAircraftListing } from '@/api/hooks/aircraft/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { TEachAircraft } from '@/types/apps/aircraft/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

export const MAX_SIMILAR_MODELS = 4;

/** The tail page fields every aircraft form carries (kept optional so old defaults still type-check). */
export type TAircraftTailPageValues = {
  typeCertificateHolder?: string;
  minFlightCrew?: string;
  tcdsNumber?: string;
  tailPageImage?: File | string | null;
  tailPageImageTag?: string;
  similarModelIds?: string[];
};

export const tailPageDefaultValues: Required<TAircraftTailPageValues> = {
  typeCertificateHolder: '',
  minFlightCrew: '',
  tcdsNumber: '',
  tailPageImage: null,
  tailPageImageTag: '',
  similarModelIds: [],
};

/** Form values for an existing aircraft (edit form reset) */
export const tailPageValuesFromAircraft = (a?: Partial<TEachAircraft> | null) => ({
  typeCertificateHolder: a?.typeCertificateHolder ?? '',
  minFlightCrew:
    a?.minFlightCrew === null || a?.minFlightCrew === undefined ? '' : String(a.minFlightCrew),
  tcdsNumber: a?.tcdsNumber ?? '',
  tailPageImage: a?.tailPageImage || null,
  tailPageImageTag: a?.tailPageImageTag ?? '',
  similarModelIds: (a?.similarModelIds ?? []).map(String),
});

/** Adds the tail page fields to the multipart body sent on create / update. */
export const appendTailPageFields = (formData: FormData, data: TAircraftTailPageValues) => {
  formData.append('typeCertificateHolder', data.typeCertificateHolder ?? '');
  formData.append('minFlightCrew', data.minFlightCrew ?? '');
  formData.append('tcdsNumber', data.tcdsNumber ?? '');
  formData.append('tailPageImageTag', data.tailPageImageTag ?? '');
  // File → upload; string → keep the current image; empty → remove it
  if (data.tailPageImage instanceof File) formData.append('tailPageImage', data.tailPageImage);
  else formData.append('tailPageImage', typeof data.tailPageImage === 'string' ? data.tailPageImage : '');
  formData.append('similarModelIds', JSON.stringify(data.similarModelIds ?? []));
};

type TOption = { _id: string; title: string };

type TAircraftTailPageFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  /** The aircraft being edited (it cannot be its own similar model) */
  aircraftId?: string;
};

const labelSx = { color: '#FFFFFF' };

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      color: '#FFFFFF',
      fontWeight: 600,
      fontSize: '14px',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      mb: 0.5,
      mt: 1,
    }}
  >
    {children}
  </Typography>
);

const AircraftTailPageFields = ({ form, aircraftId }: TAircraftTailPageFieldsProps) => {
  const errors = form.formState.errors;
  const { data: aircraftList, isLoading } = useAircraftListing();

  const options = useMemo<TOption[]>(
    () =>
      ((aircraftList as TEachAircraft[] | undefined) ?? [])
        .filter((a) => a._id !== aircraftId)
        .map((a) => ({ _id: a._id, title: a.title }))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [aircraftList, aircraftId],
  );

  // useWatch subscribes this component itself, so the preview re-renders as soon as a file is picked
  const tailPageImage = useWatch({ control: form.control, name: 'tailPageImage' }) as
    | File
    | string
    | null
    | undefined;

  // One stable preview URL per selected file (a new blob URL on every render breaks the preview)
  const tailPageImageSrc = useMemo(() => {
    if (!tailPageImage) return '';
    return typeof tailPageImage === 'string'
      ? mediaUrl(tailPageImage)
      : URL.createObjectURL(tailPageImage);
  }, [tailPageImage]);

  useEffect(() => {
    return () => {
      if (tailPageImageSrc.startsWith('blob:')) URL.revokeObjectURL(tailPageImageSrc);
    };
  }, [tailPageImageSrc]);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <SectionHeading>Tail Page (shown on every tail number of this model)</SectionHeading>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={labelSx}>Type Certificate Holder</InputLabel>
        <Controller
          control={form.control}
          name="typeCertificateHolder"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Type Certificate Holder"
              placeholder="e.g. Bombardier Inc."
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.typeCertificateHolder}
              helperText={errors?.typeCertificateHolder?.message as string | undefined}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={labelSx}>Minimum Flight Crew</InputLabel>
        <Controller
          control={form.control}
          name="minFlightCrew"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Minimum Flight Crew"
              placeholder="e.g. 2"
              value={value ?? ''}
              inputProps={{ inputMode: 'numeric' }}
              onChange={onChange}
              error={!!errors?.minFlightCrew}
              helperText={errors?.minFlightCrew?.message as string | undefined}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={labelSx}>TCDS Number</InputLabel>
        <Controller
          control={form.control}
          name="tcdsNumber"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="TCDS Number"
              placeholder="e.g. T00005NY"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.tcdsNumber}
              helperText={errors?.tcdsNumber?.message as string | undefined}
            />
          )}
        />
      </Grid>

      {/* ---------------- Tail page image ---------------- */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ ...labelSx, mb: 1 }}>Tail Page Image</InputLabel>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', mb: 1 }}>
          Upload once (burgundy line drawing on ivory). It is shown on every tail page of this model.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {!tailPageImage ? (
            <SingleImgMainComp
              dataValueGetter={(file) => {
                if (file) {
                  form.setValue('tailPageImage', file as File, { shouldDirty: true });
                  form.clearErrors('tailPageImage');
                }
              }}
              errorValueGetter={(message) => form.setError('tailPageImage', { message })}
            >
              <PlusIconUpload />
            </SingleImgMainComp>
          ) : (
            <ImgPreviewMainComp
              sx={{ width: '320px !important', height: '140px !important', marginBottom: '10px' }}
              src={tailPageImageSrc}
              isPreviewOnly={false}
              onDeleteHandler={(shouldDelete) => {
                if (shouldDelete) form.setValue('tailPageImage', null, { shouldDirty: true });
              }}
              imageSize={tailPageImage instanceof File ? tailPageImage.size : null}
            />
          )}
        </Box>
        {errors?.tailPageImage ? (
          <Typography variant="body1" className="error_msg">
            {errors.tailPageImage.message as string}
          </Typography>
        ) : null}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Tail Page Image Alt Tag</InputLabel>
        <Controller
          control={form.control}
          name="tailPageImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Tail Page Image Alt Tag"
              placeholder="e.g. Challenger 300 line drawing"
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />
      </Grid>

      {/* ---------------- Similar models ---------------- */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Similar Models (up to {MAX_SIMILAR_MODELS})</InputLabel>
        <Controller
          control={form.control}
          name="similarModelIds"
          render={({ field: { onChange, value } }) => {
            const ids: string[] = value ?? [];
            const selected = ids
              .map((id) => options.find((o) => o._id === id))
              .filter((o): o is TOption => !!o);
            return (
              <CustomAutocomplete<TOption>
                id="tail-similar-models"
                multiple
                filterSelectedOptions
                options={options}
                loading={isLoading}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option?.title)}
                isOptionEqualToValue={(option, val) => option._id === val._id}
                labelName="Select similar models"
                noOptionsText="No aircraft found"
                value={selected}
                getOptionDisabled={() => ids.length >= MAX_SIMILAR_MODELS}
                onChange={(_e, next) =>
                  onChange(
                    (next as TOption[]).slice(0, MAX_SIMILAR_MODELS).map((o) => o._id),
                  )
                }
                error={!!errors?.similarModelIds}
                helperText={errors?.similarModelIds?.message as string | undefined}
              />
            );
          }}
        />
      </Grid>
    </>
  );
};

export default AircraftTailPageFields;
