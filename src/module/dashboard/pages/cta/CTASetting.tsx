'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useCTASettingDetails, useCTASettingUpdate } from '@/api/hooks/cta/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  ctaSettingSchema,
  TCTASettingType,
} from '@/module/dashboard/validation/cta/ctaSettingSchema.zod';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const CTASetting = () => {
  const [image, setImage] = useState<File | string | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [heroImage, setHeroImage] = useState<File | string | null>(null);
  const [heroImageSize, setHeroImageSize] = useState<number | null>(null);

  const form = useForm<TCTASettingType>({
    resolver: zodResolver(ctaSettingSchema()),
    defaultValues: {
      title: '',
      description: '',
      buttonText: '',
      buttonUrl: '',
      bannerImageTag: '',
      heroImageTag: '',
    },
  });

  const errors = form.formState.errors;

  const { data: settingDetails, isLoading: settingDetailsLoading } = useCTASettingDetails();

  const { mutateAsync: updateSetting, isPending: updateSettingLoading } = useCTASettingUpdate({
    optionalCallback: () => {},
    errorCallback: () => {},
  });

  useEffect(() => {
    if (settingDetails) {
      form.reset({
        ...(settingDetails?.bannerImage && settingDetails?.bannerImage?.length > 0
          ? { image: settingDetails?.bannerImage ?? '' }
          : {}),
        bannerImageTag: settingDetails?.bannerImageTag ?? '',
        ...(settingDetails?.heroImage && settingDetails?.heroImage?.length > 0
          ? { heroImage: settingDetails?.heroImage ?? '' }
          : {}),
        heroImageTag: settingDetails?.heroImageTag ?? '',
        title: settingDetails?.title ?? '',
        description: settingDetails?.description ?? '',
        buttonText: settingDetails?.buttonText ?? '',
        buttonUrl: settingDetails?.buttonUrl ?? '',
      });
      setImage(() =>
        settingDetails?.bannerImage && settingDetails?.bannerImage?.length > 0
          ? settingDetails?.bannerImage
          : null,
      );
      setImageSize(() => settingDetails?.bannerImageSize ?? null);
      setHeroImage(() =>
        settingDetails?.heroImage && settingDetails?.heroImage?.length > 0
          ? settingDetails?.heroImage
          : null,
      );
      setHeroImageSize(() => settingDetails?.heroImageSize ?? null);
    }
  }, [settingDetails, form]);

  const onSubmit = (data: TCTASettingType) => {
    const formData = new FormData();

    if (data.image instanceof File) {
      formData.append('bannerImage', data.image);
    } else if (typeof data.image === 'string' && data.image?.length > 0) {
      formData.append('bannerImage', data.image);
    }
    formData.append('bannerImageTag', data.bannerImageTag ?? '');

    if (data.heroImage instanceof File) {
      formData.append('heroImage', data.heroImage);
    } else if (typeof data.heroImage === 'string' && data.heroImage?.length > 0) {
      formData.append('heroImage', data.heroImage);
    }
    formData.append('heroImageTag', data.heroImageTag ?? '');

    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('buttonText', data.buttonText);
    formData.append('buttonUrl', data.buttonUrl);

    updateSetting(formData);
  };

  if (settingDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  const containerSx = {
    position: 'relative' as const,
    borderRadius: '16px',
    p: 4,
    mb: 6,
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <Box sx={containerSx}>
      <Grid container rowSpacing={4} columnSpacing={3}>
        {/* Thumbnail Image Upload */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
              Thumbnail Image*
            </InputLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {image === null || image === '' ? (
                <SingleImgMainComp
                  needCrop
                  aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.insiderGuideBannerImage}
                  sxForBox={{ width: '103px !important', height: '103px !important' }}
                  dataValueGetter={(value) => {
                    if (value) {
                      setImage(() => value);
                      setImageSize(() => value.size);
                      form.setValue('image', value as File);
                      form.clearErrors('image');
                    }
                  }}
                  errorValueGetter={(errorMessage) => {
                    setImageSize(() => null);
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
                  src={typeof image === 'string' ? mediaUrl(image) : URL.createObjectURL(image)}
                  isPreviewOnly={false}
                  onDeleteHandler={(shouldDelete) => {
                    if (shouldDelete) {
                      setImage(() => null);
                      setImageSize(() => null);
                      form.setValue('image', undefined as unknown as string);
                    }
                  }}
                  imageSize={imageSize}
                />
              )}
            </Box>
            {errors.image ? (
              <Typography variant="body1" className="error_msg">
                {errors.image.message}
              </Typography>
            ) : null}
          </Box>
        </Grid>

        {/* Hero Image Upload */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
              Hero Image*
            </InputLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {heroImage === null || heroImage === '' ? (
                <SingleImgMainComp
                  needCrop
                  aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.insiderGuideHeroImage}
                  sxForBox={{ width: '286px !important', height: '103px !important' }}
                  dataValueGetter={(value) => {
                    if (value) {
                      setHeroImage(() => value);
                      setHeroImageSize(() => value.size);
                      form.setValue('heroImage', value as File);
                      form.clearErrors('heroImage');
                    }
                  }}
                  errorValueGetter={(errorMessage) => {
                    setHeroImageSize(() => null);
                    form.setError('heroImage', { message: errorMessage });
                  }}
                >
                  <PlusIconUpload />
                </SingleImgMainComp>
              ) : (
                <ImgPreviewMainComp
                  sx={{
                    width: '286px !important',
                    height: '103px !important',
                    marginBottom: '10px',
                  }}
                  src={
                    typeof heroImage === 'string'
                      ? mediaUrl(heroImage)
                      : URL.createObjectURL(heroImage)
                  }
                  isPreviewOnly={false}
                  onDeleteHandler={(shouldDelete) => {
                    if (shouldDelete) {
                      setHeroImage(() => null);
                      setHeroImageSize(() => null);
                      form.setValue('heroImage', undefined as unknown as string);
                    }
                  }}
                  imageSize={heroImageSize}
                />
              )}
            </Box>
            {errors.heroImage ? (
              <Typography variant="body1" className="error_msg">
                {errors.heroImage.message}
              </Typography>
            ) : null}
          </Box>
        </Grid>

        {/* Thumbnail Alt Tag */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Thumbnail Alt Tag
          </InputLabel>
          <Controller
            control={form.control}
            name="bannerImageTag"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                labelName="Thumbnail Alt Tag"
                placeholder="Enter thumbnail alt tag"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.bannerImageTag}
                helperText={errors.bannerImageTag?.message}
              />
            )}
          />
        </Grid>

        {/* Hero Alt Tag */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Hero Alt Tag
          </InputLabel>
          <Controller
            control={form.control}
            name="heroImageTag"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                labelName="Hero Alt Tag"
                placeholder="Enter hero alt tag"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.heroImageTag}
                helperText={errors.heroImageTag?.message}
              />
            )}
          />
        </Grid>

        {/* Title */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Title*
          </InputLabel>
          <Controller
            control={form.control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter CTA title"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>

        {/* Description */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Description*
          </InputLabel>
          <Controller
            control={form.control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter CTA description"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.description}
                helperText={errors.description?.message}
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        {/* Button Text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Button Text*
          </InputLabel>
          <Controller
            control={form.control}
            name="buttonText"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter button text"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.buttonText}
                helperText={errors.buttonText?.message}
              />
            )}
          />
        </Grid>

        {/* Button URL */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Button URL*
          </InputLabel>
          <Controller
            control={form.control}
            name="buttonUrl"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter button URL (e.g. /contact-us or https://...)"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.buttonUrl}
                helperText={errors.buttonUrl?.message}
              />
            )}
          />
        </Grid>

        {/* Action Button */}
        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={updateSettingLoading}
            loading={updateSettingLoading}
            onClick={form.handleSubmit(onSubmit)}
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 14px 0 rgba(212, 175, 55, 0.39)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.23)',
              },
            }}
          >
            Update Settings
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CTASetting;
