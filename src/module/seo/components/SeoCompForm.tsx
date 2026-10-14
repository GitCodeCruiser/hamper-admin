'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { seoSchema, TSeoSchemaType } from '../validation/seo.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useSeoDetailsBySlug, useSeoDetailsUpdate } from '@/api/hooks/seo/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DEFAULT_OG_IMAGES } from '@/constant';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// Label defaults
const metaTitleLabel = 'Meta Title';
const metaTitlePlaceholder = 'Enter meta title (50-60 characters recommended)';
const metaDescriptionLabel = 'Meta Description';
const metaDescriptionPlaceholder = 'Enter meta description (150-160 characters recommended)';
const metaKeywordsLabel = 'Meta Keywords';
const metaKeywordsPlaceholder = 'Enter meta keywords';
// const slugLabel = 'Slug';
// const slugPlaceholder = 'e.g. about-us';
const canonicalUrlLabel = 'Canonical URL';
const canonicalUrlPlaceholder = 'https://example.com/page';
const ogTitleLabel = 'OG Title';
const ogTitlePlaceholder = 'Enter Open Graph title';
const ogDescriptionLabel = 'OG Description';
const ogDescriptionPlaceholder = 'Enter Open Graph description';
const ogImageLabel = 'OG Image';
const schemaLabel = 'Schema (JSON-LD)';
const schemaPlaceholder = '{"@context":"https://schema.org",...}';

type TSeoCompFormProps = {
  slug: TSeoStaticSlug;
};

// ─── Group Heading ──────────────────────────────────────────────────────────
export const GroupHeading = ({ children }: { children: React.ReactNode }) => {
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
        borderBottom: `1px solid ${theme.palette.customColors?.colorB2535F ?? '#ffffff1f'}`,
      }}
    >
      {children}
    </Typography>
  );
};

// ─── Component ──────────────────────────────────────────────────────────────
const SeoCompForm = ({ slug }: TSeoCompFormProps) => {
  const theme = useTheme();

  const [preSeoOgImage, setPreSeoOgImage] = useState<File | string | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);

  const form = useForm<TSeoSchemaType>({
    resolver: zodResolver(seoSchema()),
    defaultValues: {
      seoMetaTitle: '',
      seoMetaDescription: '',
      seoSlug: '',
      seoCanonicalUrl: '',
      seoOgTitle: '',
      seoOgDescription: '',
      seoSchema: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
    },
  });

  const errors = form.formState.errors;

  const { data: seoData, isLoading: seoDataLoading } = useSeoDetailsBySlug({
    slug,
  });

  const { mutateAsync: seoDetailsUpdate, isPending: seoDetailsUpdateLoading } = useSeoDetailsUpdate(
    {
      optionalCallback: () => {},
      errorCallback: () => {},
    },
  );

  const handleSelectDefaultOgImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'ogImage.png';
      const file = new File([blob], filename, { type: blob.type });

      setPreSeoOgImage(() => file);
      setOpenGraphImageSize(() => file.size);
      form.setValue('seoOgImage', file);
      form.clearErrors('seoOgImage');
    } catch (error) {
      console.error('Error setting default OG image:', error);
    }
  };

  const onSubmit = (data: TSeoSchemaType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('id', seoData?._id as string);
    formData.append('metaTitle', data?.seoMetaTitle);
    formData.append('metaDescription', data?.seoMetaDescription);
    formData.append('metaKeywords', data?.seoMetaKeywords);
    formData.append('canonicalTag', data?.seoCanonicalUrl);
    formData.append('openGraphTitle', data?.seoOgTitle);
    formData.append('openGraphDescription', data?.seoOgDescription);
    formData.append('structuredData', data?.seoSchema);
    formData.append('metaRobotsIndex', data?.metaRobotsIndex);
    formData.append('metaRobotsFollow', data?.metaRobotsFollow);

    if (typeof data?.seoOgImage !== 'string') {
      formData.append('openGraphImage', data?.seoOgImage);
    }

    seoDetailsUpdate(formData);
  };

  useEffect(() => {
    if (seoData) {
      form.reset({
        seoMetaTitle: seoData?.metaTitle ?? '',
        seoMetaDescription: seoData?.metaDescription ?? '',
        seoMetaKeywords: seoData?.metaKeywords ?? '',
        seoSlug: seoData?.pageSlug ?? '',
        seoCanonicalUrl: seoData?.canonicalTag ?? '',
        seoOgTitle: seoData?.openGraphTitle ?? '',
        seoOgDescription: seoData?.openGraphDescription ?? '',
        seoSchema: seoData?.structuredData ?? '',
        metaRobotsIndex: (seoData?.metaRobotsIndex ?? 'noindex') as 'noindex' | 'index',
        metaRobotsFollow: (seoData?.metaRobotsFollow ?? 'nofollow') as 'nofollow' | 'follow',

        ...(seoData?.openGraphImage && seoData?.openGraphImage?.length > 0
          ? { seoOgImage: seoData?.openGraphImage ?? '' }
          : {}),
      });
    }

    setPreSeoOgImage(() =>
      seoData?.openGraphImage && seoData?.openGraphImage?.length > 0
        ? seoData?.openGraphImage
        : null,
    );
    setOpenGraphImageSize(() =>
      seoData?.openGraphImageSize ? Number(seoData.openGraphImageSize) : null,
    );

    return () => {};
  }, [
    form.reset,
    seoData?.metaTitle,
    seoData?.metaDescription,
    seoData?.metaKeywords,
    seoData?.pageSlug,
    seoData?.canonicalTag,
    seoData?.openGraphTitle,
    seoData?.openGraphDescription,
    seoData?.structuredData,
    seoData?.openGraphImage,
    seoData?.openGraphImageSize,
    seoData,
    form,
  ]);

  if (seoDataLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

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
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Title*</InputLabel>
        <Controller
          control={form.control}
          name="seoMetaTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaTitleLabel}
              placeholder={metaTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seoMetaTitle}
              helperText={errors?.seoMetaTitle?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Description*</InputLabel>
        <Controller
          control={form.control}
          name="seoMetaDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaDescriptionLabel}
              placeholder={metaDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.seoMetaDescription}
              helperText={errors?.seoMetaDescription?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Keywords */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Keywords*</InputLabel>
        <Controller
          control={form.control}
          name="seoMetaKeywords"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaKeywordsLabel}
              placeholder={metaKeywordsPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seoMetaKeywords}
              helperText={errors?.seoMetaKeywords?.message}
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

      {/* Later enabled if required  */}
      {/* Slug */}
      {/* <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="seoSlug"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={slugLabel}
              placeholder={slugPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seoSlug}
              helperText={errors?.seoSlug?.message}
            />
          )}
        />
      </Grid> */}

      {/* Canonical URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Canonical URL*</InputLabel>
        <Controller
          control={form.control}
          name="seoCanonicalUrl"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={canonicalUrlLabel}
              placeholder={canonicalUrlPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seoCanonicalUrl}
              helperText={errors?.seoCanonicalUrl?.message}
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
        <InputLabel sx={{ color: '#FFFFFF' }}>OG Title*</InputLabel>
        <Controller
          control={form.control}
          name="seoOgTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogTitleLabel}
              placeholder={ogTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.seoOgTitle}
              helperText={errors?.seoOgTitle?.message}
            />
          )}
        />
      </Grid>

      {/* OG Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>OG Description*</InputLabel>
        <Controller
          control={form.control}
          name="seoOgDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogDescriptionLabel}
              placeholder={ogDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.seoOgDescription}
              helperText={errors?.seoOgDescription?.message}
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
          {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {preSeoOgImage !== null && (
              <FilePreviewDeleteBox
                sx={{ width: '103px !important', height: '103px !important' }}
                src={preSeoOgImage?.url}
                srcKey={preSeoOgImage?.url}
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setPreSeoOgImage(() => null);
                    form.resetField('seoOgImage');
                  }
                }}
              />
            )}
            <SingleFileUploaderBox
              dataValueGetter={(value) => {
                if (value) {
                  setPreSeoOgImage(() => value);
                  form.setValue('seoOgImage', value.path);
                  form.clearErrors('seoOgImage');
                }
              }}
              errorValueGetter={(errorMessage) => {
                form.setError('seoOgImage', { message: errorMessage });
              }}
            >
              <PlusIconUpload />
            </SingleFileUploaderBox>
          </Box> */}

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {preSeoOgImage === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setPreSeoOgImage(() => value);
                    setOpenGraphImageSize(() => value.size);

                    form.setValue('seoOgImage', value as File);
                    form.clearErrors('seoOgImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setOpenGraphImageSize(() => null);
                  form.setError('seoOgImage', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </SingleImgMainComp>
            ) : (
              <ImgPreviewMainComp
                sx={{
                  width: '103px !important',
                  height: '103px !important',
                  marginBottom: '10px',
                }}
                src={
                  typeof preSeoOgImage === 'string'
                    ? mediaUrl(preSeoOgImage)
                    : URL?.createObjectURL(preSeoOgImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setPreSeoOgImage(() => null);
                    setOpenGraphImageSize(() => null);
                    form.setValue('seoOgImage', undefined as unknown as File);
                  }
                }}
                imageSize={openGraphImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default OG images
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_OG_IMAGES?.map((og) => {
                  const isSelected =
                    preSeoOgImage instanceof File
                      ? preSeoOgImage.name === og.url.split('/').pop()
                      : typeof preSeoOgImage === 'string' &&
                        (preSeoOgImage.includes(og.url) || og.url.includes(preSeoOgImage));

                  return (
                    <Box
                      key={og.id}
                      onClick={() => handleSelectDefaultOgImage(og.url)}
                      sx={{
                        width: '100px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        position: 'relative',
                        border: isSelected
                          ? `2px solid ${theme.palette.secondary.main}`
                          : '2px solid transparent',
                        boxShadow: isSelected ? `0 0 8px ${theme.palette.secondary.main}` : 'none',
                        transition: 'all 0.25s ease',
                        '&:hover': {
                          transform: 'scale(1.04)',
                          borderColor: theme.palette.secondary.light || '#D5A85A',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={og.url}
                        alt={og.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {errors.seoOgImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.seoOgImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          ROBOTS META DIRECTIVES
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Robots Meta Directives</GroupHeading>
      </Grid>

      {/* Meta Robots Index */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Robots Index</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsIndex"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Index Directive"
              value={value ?? 'noindex'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="noindex">noindex</MenuItem>
              <MenuItem value="index">index</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {/* Meta Robots Follow */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Robots Follow</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsFollow"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Follow Directive"
              value={value ?? 'nofollow'}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="nofollow">nofollow</MenuItem>
              <MenuItem value="follow">follow</MenuItem>
            </CustomSelect>
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          STRUCTURED DATA
         ═══════════════════════════════════════════════════════════════════ */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Structured Data</GroupHeading>
      </Grid>

      {/* Schema (JSON-LD) */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Schema (JSON-LD)*</InputLabel>
        <Controller
          control={form.control}
          name="seoSchema"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={schemaLabel}
              placeholder={schemaPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={5}
              error={!!errors?.seoSchema}
              helperText={errors?.seoSchema?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={seoDetailsUpdateLoading}
          loading={seoDetailsUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default SeoCompForm;
