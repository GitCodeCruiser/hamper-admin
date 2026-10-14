'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, IconButton, InputLabel, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  mattFactsSchema,
  TMattFactsSchemaType,
} from '../../../validation/cms/matt-hogan/mattFactsSchema.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useMattFactsCreate,
  useMattFactsListing,
  useMattFactsUpdate,
} from '@/api/hooks/cms/mattFacts/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TMattFactsCompProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
};

const MattFactsComp = ({ slug, pageName, purpose }: TMattFactsCompProps) => {
  const theme = useTheme();
  const router = useRouter();

  const [uploadImage, setUploadImage] = useState<File | string | null>(null);
  const [uploadImageSize, setUploadImageSize] = useState<number | null>(null);

  const form = useForm<TMattFactsSchemaType>({
    resolver: zodResolver(mattFactsSchema()),
    defaultValues: {
      pageName,
      pageSlug: slug,
      purpose,
      quoteTitle: '',
      headerTitle: '',
      title: '',
      redirectUrl: '',
      features: [{ label: '', value: '' }],
    },
  });

  const errors = form.formState.errors;

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control: form.control,
    name: 'features',
  });

  // ── Fetch existing data ────────────────────────────────────
  const {
    data: mattFactsData,
    isLoading: mattFactsLoading,
    refetch,
  } = useMattFactsListing({
    pageSlug: slug,
    purpose,
  });

  const { mutateAsync: mattFactsSave, isPending: mattFactsSaveLoading } = useMattFactsCreate({
    optionalCallback: () => {
      refetch();
      router.refresh();
    },
    errorCallback: () => {},
  });

  const { mutateAsync: mattFactsUpdate, isPending: mattFactsUpdateLoading } = useMattFactsUpdate({
    optionalCallback: () => {
      refetch();
      router.refresh();
    },
    errorCallback: () => {},
  });

  // ── Hydrate form on data load ──────────────────────────────
  useEffect(() => {
    if (mattFactsData && mattFactsData.length > 0) {
      const existing = mattFactsData[0];
      form.reset({
        pageName: existing.pageName ?? pageName,
        pageSlug: existing.pageSlug ?? slug,
        purpose: existing.purpose ?? purpose,
        quoteTitle: existing.quoteTitle ?? '',
        headerTitle: existing.headerTitle ?? '',
        title: existing.title ?? '',
        redirectUrl: existing.redirectUrl ?? '',
        features: existing.features?.length ? existing.features : [{ label: '', value: '' }],
        image: existing.image ?? '',
      });
      if (existing.image) {
        setUploadImage(existing.image);
      }
      if (existing.imageSize) {
        setUploadImageSize(existing.imageSize);
      }
    }
  }, [mattFactsData]);

  // ── Submit handler ─────────────────────────────────────────
  const onSubmit = (data: TMattFactsSchemaType) => {
    const formData = new FormData();
    formData.append('pageName', pageName);
    formData.append('pageSlug', slug);
    formData.append('purpose', purpose);
    formData.append('quoteTitle', data.quoteTitle);
    formData.append('headerTitle', data.headerTitle);
    formData.append('title', data.title);
    formData.append('redirectUrl', data.redirectUrl);
    formData.append('features', JSON.stringify(data.features));

    if (data.image instanceof File) {
      formData.append('image', data.image);
    } else if (typeof data.image === 'string') {
      formData.append('image', data.image);
    }

    if (mattFactsData && mattFactsData.length > 0) {
      formData.append('id', mattFactsData[0]._id);
      mattFactsUpdate(formData);
    } else {
      mattFactsSave(formData);
    }
  };

  if (mattFactsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        p: 4,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        {/* ── Section Heading ──────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ pb: 1, mb: 2 }}>
            <GroupHeading>Matt Hogan Facts</GroupHeading>
          </Box>
        </Grid>

        {/* ── Quote Title ──────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Quote Title*
          </InputLabel>
          <Controller
            control={form.control}
            name="quoteTitle"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter quote title"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.quoteTitle}
                helperText={errors?.quoteTitle?.message}
              />
            )}
          />
        </Grid>

        {/* ── Header Title ────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Header Title*
          </InputLabel>
          <Controller
            control={form.control}
            name="headerTitle"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter header title"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.headerTitle}
                helperText={errors?.headerTitle?.message}
              />
            )}
          />
        </Grid>

        {/* ── Title ────────────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Title*
          </InputLabel>
          <Controller
            control={form.control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter title"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.title}
                helperText={errors?.title?.message}
              />
            )}
          />
        </Grid>

        {/* ── Redirect URL ─────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Redirect URL*
          </InputLabel>
          <Controller
            control={form.control}
            name="redirectUrl"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter redirect URL"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.redirectUrl}
                helperText={errors?.redirectUrl?.message}
              />
            )}
          />
        </Grid>

        {/* ── Image Upload ─────────────────────────────────── */}
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
              Image*
            </InputLabel>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              {uploadImage === null ? (
                <SingleImgMainComp
                  needCrop
                  aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.hubPageLandscapeSize}
                  sxForBox={{ width: '103px !important', height: '103px !important' }}
                  dataValueGetter={(value) => {
                    if (value) {
                      setUploadImage(value);
                      setUploadImageSize(value.size);
                      form.setValue('image', value);
                      form.clearErrors('image');
                    }
                  }}
                  errorValueGetter={(errorMessage) => {
                    setUploadImageSize(null);
                    form.setError('image', { message: errorMessage });
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
                    typeof uploadImage === 'string'
                      ? mediaUrl(uploadImage)
                      : URL?.createObjectURL(uploadImage)
                  }
                  isPreviewOnly={false}
                  onDeleteHandler={(shouldDelete) => {
                    if (shouldDelete) {
                      setUploadImage(null);
                      setUploadImageSize(null);
                      form.setValue('image', undefined as unknown as File);
                    }
                  }}
                  imageSize={uploadImageSize}
                />
              )}
            </Box>

            {errors.image ? (
              <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
                {errors?.image.message}
              </Typography>
            ) : null}
          </Box>
        </Grid>

        {/* ── Features List ────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              sx={{
                color: '#D4AF37',
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.3px',
              }}
            >
              Features
            </Typography>
            <CustomButtonPrimary
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => appendFeature({ label: '', value: '' })}
            >
              Add Feature
            </CustomButtonPrimary>
          </Box>

          {featureFields.map((field, index) => (
            <Box
              key={field.id}
              sx={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                p: 2.5,
                mb: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'rgba(212, 175, 55, 0.25)',
                  background: 'rgba(255, 255, 255, 0.03)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                  }}
                >
                  Feature #{index + 1}
                </Typography>
                {featureFields.length > 1 && (
                  <IconButton
                    size="small"
                    onClick={() => removeFeature(index)}
                    sx={{
                      color: '#F44336',
                      backgroundColor: 'rgba(244, 67, 54, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.15)',
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: '18px' }} />
                  </IconButton>
                )}
              </Box>

              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <InputLabel
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: '0.8rem',
                    }}
                  >
                    Label*
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name={`features.${index}.label`}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        placeholder="Enter label"
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.features?.[index]?.label}
                        helperText={errors?.features?.[index]?.label?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <InputLabel
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: '0.8rem',
                    }}
                  >
                    Value*
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name={`features.${index}.value`}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        placeholder="Enter value"
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.features?.[index]?.value}
                        helperText={errors?.features?.[index]?.value?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          {errors.features?.message ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {errors.features.message}
            </Typography>
          ) : null}
        </Grid>

        {/* ── Submit ────────────────────────────────────────── */}
        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={mattFactsSaveLoading || mattFactsUpdateLoading}
            loading={mattFactsSaveLoading || mattFactsUpdateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {mattFactsData && mattFactsData.length > 0 ? 'Update Data ↑' : 'Save Data ↑'}
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MattFactsComp;
