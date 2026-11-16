'use client';

import { Box, Grid, InputLabel, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

/** Form values carried by every form that uses <GenericHeroField /> */
export type TGenericHeroValues = {
  genericHeroImage?: File | string | null;
  genericHeroImageTag?: string;
};

export const genericHeroDefaultValues: Required<TGenericHeroValues> = {
  genericHeroImage: null,
  genericHeroImageTag: '',
};

export const genericHeroValuesFrom = (
  src?: { genericHeroImage?: string; genericHeroImageTag?: string } | null,
) => ({
  genericHeroImage: src?.genericHeroImage || null,
  genericHeroImageTag: src?.genericHeroImageTag ?? '',
});

/**
 * Adds the generic hero to a multipart body.
 * File → upload; string → keep the current image; nothing → remove it (only sent on edit).
 */
export const appendGenericHero = (
  formData: FormData,
  data: TGenericHeroValues,
  opts: { isEdit: boolean },
) => {
  formData.append('genericHeroImageTag', data.genericHeroImageTag ?? '');
  const img = data.genericHeroImage;
  if (img instanceof File) formData.append('genericHeroImage', img);
  else if (typeof img === 'string' && img) formData.append('genericHeroImage', img);
  else if (opts.isEdit) formData.append('genericHeroImage', '');
};

type TGenericHeroFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label?: string;
  helper?: string;
};

const labelSx = { color: '#FFFFFF' };

const GenericHeroField = ({
  form,
  label = 'Generic Hero Image',
  helper = 'A generic template image (not a specific aircraft or livery) for the heading of tail pages.',
}: TGenericHeroFieldProps) => {
  const errors = form.formState.errors;

  const image = useWatch({ control: form.control, name: 'genericHeroImage' }) as
    | File
    | string
    | null
    | undefined;

  // One stable preview URL per selected file (a new blob URL on every render breaks the preview)
  const src = useMemo(() => {
    if (!image) return '';
    return typeof image === 'string' ? mediaUrl(image) : URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (src.startsWith('blob:')) URL.revokeObjectURL(src);
    };
  }, [src]);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ ...labelSx, mb: 1 }}>{label}</InputLabel>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', mb: 1 }}>
          {helper}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {!image ? (
            <SingleImgMainComp
              dataValueGetter={(file) => {
                if (file) {
                  form.setValue('genericHeroImage', file as File, { shouldDirty: true });
                  form.clearErrors('genericHeroImage');
                }
              }}
              errorValueGetter={(message) => form.setError('genericHeroImage', { message })}
            >
              <PlusIconUpload />
            </SingleImgMainComp>
          ) : (
            <ImgPreviewMainComp
              sx={{ width: '320px !important', height: '140px !important', marginBottom: '10px' }}
              src={src}
              isPreviewOnly={false}
              onDeleteHandler={(shouldDelete) => {
                if (shouldDelete) form.setValue('genericHeroImage', null, { shouldDirty: true });
              }}
              imageSize={image instanceof File ? image.size : null}
            />
          )}
        </Box>
        {errors?.genericHeroImage ? (
          <Typography variant="body1" className="error_msg">
            {errors.genericHeroImage.message as string}
          </Typography>
        ) : null}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>{label} Alt Tag</InputLabel>
        <Controller
          control={form.control}
          name="genericHeroImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={`${label} Alt Tag`}
              placeholder="e.g. Private jet in flight"
              value={value ?? ''}
              onChange={onChange}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default GenericHeroField;
