'use client';

import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { Controller, FieldErrors, UseFormReturn } from 'react-hook-form';

import FilePreviewDeleteBox from '@/components/Other/FilePreviewDeleteBox';
import SingleFileUploaderBox from '@/components/Other/SingleFileUploaderBox';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// ─── Types ──────────────────────────────────────────────────────────────────
export type TCMSSeoFieldNames = {
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schema: string;
};

export type TCMSSeoLabels = {
  metaTitle?: string;
  metaTitlePlaceholder?: string;
  metaDescription?: string;
  metaDescriptionPlaceholder?: string;
  slug?: string;
  slugPlaceholder?: string;
  canonicalUrl?: string;
  canonicalUrlPlaceholder?: string;
  ogTitle?: string;
  ogTitlePlaceholder?: string;
  ogDescription?: string;
  ogDescriptionPlaceholder?: string;
  ogImage?: string;
  schema?: string;
  schemaPlaceholder?: string;
};

type TCMSSeoFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldNames: TCMSSeoFieldNames;
  labels?: TCMSSeoLabels;
  uploadedOgImage: string | null;
  onOgImageUploaded: (url: string, path: string) => void;
  onOgImageDeleted: () => void;
};

// ─── Group Heading ──────────────────────────────────────────────────────────
const GroupHeading = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        mb: 0.5,
        mt: 1,
        pb: 1,
        borderBottom: `1px solid ${theme.palette.customColors?.colorB2535F ?? 'rgba(255,255,255,0.12)'}`,
      }}
    >
      {children}
    </Typography>
  );
};

// ─── Component ──────────────────────────────────────────────────────────────
const CMSSeoFields = ({
  form,
  fieldNames,
  labels,
  uploadedOgImage,
  onOgImageUploaded,
  onOgImageDeleted,
}: TCMSSeoFieldsProps) => {
  const theme = useTheme();
  const errors: FieldErrors = form.formState.errors;

  // Label defaults
  const metaTitleLabel = labels?.metaTitle ?? 'Meta Title';
  const metaTitlePlaceholder =
    labels?.metaTitlePlaceholder ?? 'Enter meta title (50-60 characters recommended)';
  const metaDescriptionLabel = labels?.metaDescription ?? 'Meta Description';
  const metaDescriptionPlaceholder =
    labels?.metaDescriptionPlaceholder ?? 'Enter meta description (150-160 characters recommended)';
  const slugLabel = labels?.slug ?? 'Slug';
  const slugPlaceholder = labels?.slugPlaceholder ?? 'e.g. about-us';
  const canonicalUrlLabel = labels?.canonicalUrl ?? 'Canonical URL';
  const canonicalUrlPlaceholder = labels?.canonicalUrlPlaceholder ?? 'https://example.com/page';
  const ogTitleLabel = labels?.ogTitle ?? 'OG Title';
  const ogTitlePlaceholder = labels?.ogTitlePlaceholder ?? 'Enter Open Graph title';
  const ogDescriptionLabel = labels?.ogDescription ?? 'OG Description';
  const ogDescriptionPlaceholder =
    labels?.ogDescriptionPlaceholder ?? 'Enter Open Graph description';
  const ogImageLabel = labels?.ogImage ?? 'OG Image';
  const schemaLabel = labels?.schema ?? 'Schema (JSON-LD)';
  const schemaPlaceholder = labels?.schemaPlaceholder ?? '{"@context":"https://schema.org",...}';

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
      {/* ═══════════════════════════════════════════════════════════════════
          PRIMARY META TAGS
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Primary Meta Tags</GroupHeading>
      </Grid>

      {/* Meta Title */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.metaTitle}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaTitleLabel}
              placeholder={metaTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.metaTitle)}
              helperText={getError(fieldNames.metaTitle)?.message as string}
            />
          )}
        />
      </Grid>

      {/* Meta Description */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.metaDescription}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaDescriptionLabel}
              placeholder={metaDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!getError(fieldNames.metaDescription)}
              helperText={getError(fieldNames.metaDescription)?.message as string}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          URL MANAGEMENT
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>URL Management</GroupHeading>
      </Grid>

      {/* Slug */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name={fieldNames.slug}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={slugLabel}
              placeholder={slugPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.slug)}
              helperText={getError(fieldNames.slug)?.message as string}
            />
          )}
        />
      </Grid>

      {/* Canonical URL */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name={fieldNames.canonicalUrl}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={canonicalUrlLabel}
              placeholder={canonicalUrlPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.canonicalUrl)}
              helperText={getError(fieldNames.canonicalUrl)?.message as string}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL SHARING (OPEN GRAPH)
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Social Sharing (Open Graph)</GroupHeading>
      </Grid>

      {/* OG Title */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.ogTitle}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogTitleLabel}
              placeholder={ogTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!getError(fieldNames.ogTitle)}
              helperText={getError(fieldNames.ogTitle)?.message as string}
            />
          )}
        />
      </Grid>

      {/* OG Description */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.ogDescription}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogDescriptionLabel}
              placeholder={ogDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!getError(fieldNames.ogDescription)}
              helperText={getError(fieldNames.ogDescription)?.message as string}
            />
          )}
        />
      </Grid>

      {/* OG Image Upload */}
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
            {ogImageLabel}
          </InputLabel>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {uploadedOgImage !== null && (
              <FilePreviewDeleteBox
                sx={{ width: '103px !important', height: '103px !important' }}
                src={uploadedOgImage}
                srcKey={uploadedOgImage}
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    onOgImageDeleted();
                  }
                }}
              />
            )}
            <SingleFileUploaderBox
              dataValueGetter={(value) => {
                if (value) {
                  onOgImageUploaded(value.url, value.path);
                  form.clearErrors(fieldNames.ogImage);
                }
              }}
              errorValueGetter={(errorMessage) => {
                form.setError(fieldNames.ogImage, { message: errorMessage });
              }}
            >
              <PlusIconUpload />
            </SingleFileUploaderBox>
          </Box>
          {getError(fieldNames.ogImage) && (
            <Typography sx={{ color: theme.palette.error.main, fontSize: '12px', mt: 0.75 }}>
              {getError(fieldNames.ogImage)?.message as string}
            </Typography>
          )}
        </Box>
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          STRUCTURED DATA
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Structured Data</GroupHeading>
      </Grid>

      {/* Schema (JSON-LD) */}
      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name={fieldNames.schema}
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={schemaLabel}
              placeholder={schemaPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={5}
              error={!!getError(fieldNames.schema)}
              helperText={getError(fieldNames.schema)?.message as string}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default CMSSeoFields;
