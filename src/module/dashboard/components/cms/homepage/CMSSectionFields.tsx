'use client';

import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { Controller, FieldErrors, UseFormReturn } from 'react-hook-form';

import FilePreviewDeleteBox from '@/components/Other/FilePreviewDeleteBox';
import SingleFileUploaderBox from '@/components/Other/SingleFileUploaderBox';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// ─── Types ──────────────────────────────────────────────────────────────────
export type TCMSSectionFieldNames = {
  image: string;
  title: string;
  subtitle: string;
};

export type TCMSSectionLabels = {
  image?: string;
  title?: string;
  titlePlaceholder?: string;
  subtitle?: string;
  subtitlePlaceholder?: string;
};

type TCMSSectionFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldNames: TCMSSectionFieldNames;
  labels?: TCMSSectionLabels;
  uploadedImage: string | null;
  onImageUploaded: (url: string, path: string) => void;
  onImageDeleted: () => void;
};

// ─── Component ──────────────────────────────────────────────────────────────
const CMSSectionFields = ({
  form,
  fieldNames,
  labels,
  uploadedImage,
  onImageUploaded,
  onImageDeleted,
}: TCMSSectionFieldsProps) => {
  const theme = useTheme();
  const errors: FieldErrors = form.formState.errors;

  const imageLabel = labels?.image ?? 'Image*';
  const titleLabel = labels?.title ?? 'Title*';
  const titlePlaceholder = labels?.titlePlaceholder ?? 'Enter title';
  const subtitleLabel = labels?.subtitle ?? 'Subtitle*';
  const subtitlePlaceholder = labels?.subtitlePlaceholder ?? 'Enter subtitle';

  // Helper to safely access nested errors by string key
  const getError = (name: string) => {
    const parts = name.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = errors;
    for (const part of parts) {
      if (!current) return undefined;
      current = current[part];
    }
    return current;
  };

  return (
    <Grid container rowSpacing={3}>
      {/* Image Upload */}
      <Grid size={{ xs: 12 }}>
        <Box>
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            {imageLabel}
          </InputLabel>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {uploadedImage !== null && (
              <FilePreviewDeleteBox
                sx={{ width: '103px !important', height: '103px !important' }}
                src={uploadedImage}
                srcKey={uploadedImage}
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    onImageDeleted();
                  }
                }}
              />
            )}
            <SingleFileUploaderBox
              dataValueGetter={(value) => {
                if (value) {
                  onImageUploaded(value.url, value.path);
                  form.clearErrors(fieldNames.image);
                }
              }}
              errorValueGetter={(errorMessage) => {
                form.setError(fieldNames.image, { message: errorMessage });
              }}
            >
              <PlusIconUpload />
            </SingleFileUploaderBox>
          </Box>
          {getError(fieldNames.image) && (
            <Typography sx={{ color: theme.palette.error.main, fontSize: '12px', mt: 0.75 }}>
              {getError(fieldNames.image)?.message as string}
            </Typography>
          )}
        </Box>
      </Grid>

      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.title}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={titleLabel}
              placeholder={titlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.title)}
              helperText={getError(fieldNames.title)?.message as string}
            />
          )}
        />
      </Grid>

      {/* Subtitle */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.subtitle}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={subtitleLabel}
              placeholder={subtitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.subtitle)}
              helperText={getError(fieldNames.subtitle)?.message as string}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CMSSectionFields;
