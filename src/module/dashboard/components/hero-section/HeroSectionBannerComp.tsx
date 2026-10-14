'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useHeroSectionDetails, useHeroSectionUpdate } from '@/api/hooks/hero-section/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DEFAULT_BANNERS, IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  heroSectionUpdate,
  THeroSectionUpdateSchemaType,
} from '@/module/hero-section/validation/heroSectionUpdate.zod';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type THeroSectionBannerCompProps = {
  slug: TSeoStaticSlug;
};

const HeroSectionBannerComp = ({ slug }: THeroSectionBannerCompProps) => {
  const theme = useTheme();
  const [uploadedImages, setUploadedImages] = useState<File | string | null>(null);
  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);

  const form = useForm<THeroSectionUpdateSchemaType>({
    resolver: zodResolver(heroSectionUpdate()),
    defaultValues: {
      bannerImage: '',
    },
  });

  const { data: heroSectionDetails, isLoading: heroSectionDetailsLoading } = useHeroSectionDetails({
    slug,
  });

  const { mutateAsync: homePageHeroUpdate, isPending: homePageHeroUpdateLoading } =
    useHeroSectionUpdate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  const onSubmit = (data: THeroSectionUpdateSchemaType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('id', heroSectionDetails?._id as string);
    formData.append('title', data?.bannerTitle);

    formData.append('subtitle', data?.bannerSubtitle ?? '');

    if (typeof data?.bannerImage !== 'string') {
      formData.append('backgroundMedia', data?.bannerImage);
    }

    homePageHeroUpdate(formData);
  };

  const handleSelectDefaultBanner = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'banner.png';
      const file = new File([blob], filename, { type: blob.type });

      setUploadedImages(() => file);
      setBannerImageSize(() => file.size);
      form.setValue('bannerImage', file);
      form.clearErrors('bannerImage');
    } catch (error) {
      console.error('Error setting default banner image:', error);
    }
  };

  useEffect(() => {
    if (heroSectionDetails) {
      form.reset({
        bannerTitle: heroSectionDetails?.title,
        bannerSubtitle: heroSectionDetails?.subtitle,
        ...(heroSectionDetails?.backgroundMedia && heroSectionDetails?.backgroundMedia?.length > 0
          ? { bannerImage: heroSectionDetails?.backgroundMedia ?? '' }
          : {}),
      });
      setBannerImageSize(() => heroSectionDetails?.backgroundMediaSize ?? null);
    }

    setUploadedImages(() =>
      heroSectionDetails?.backgroundMedia && heroSectionDetails?.backgroundMedia?.length > 0
        ? heroSectionDetails?.backgroundMedia
        : null,
    );

    return () => {};
  }, [
    form.reset,
    heroSectionDetails?.title,
    heroSectionDetails?.subtitle,
    heroSectionDetails?.backgroundMedia,
    heroSectionDetails?.backgroundMediaSize,
    heroSectionDetails,
    form,
  ]);

  if (heroSectionDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Upload Images */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel sx={{ color: '#FFFFFF', marginBottom: '10px' }}>Banner Image*</InputLabel>
          <Box
            className="allImgUploadWrap"
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}
          >
            {uploadedImages === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.heroImage}
                sxForBox={{ width: '286px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setUploadedImages(() => value);
                    setBannerImageSize(() => value.size);

                    form.setValue('bannerImage', value as File);
                    form.clearErrors('bannerImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setBannerImageSize(() => null);
                  form.setError('bannerImage', { message: errorMessage });
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
                  typeof uploadedImages === 'string'
                    ? mediaUrl(uploadedImages)
                    : URL?.createObjectURL(uploadedImages)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setUploadedImages(() => null);
                    setBannerImageSize(() => null);
                    form.setValue('bannerImage', undefined as unknown as File);
                  }
                }}
                imageSize={bannerImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default banners
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_BANNERS.map((banner) => {
                  const isSelected =
                    uploadedImages instanceof File
                      ? uploadedImages.name === banner.url.split('/').pop()
                      : typeof uploadedImages === 'string' &&
                        (uploadedImages.includes(banner.url) ||
                          banner.url.includes(uploadedImages));

                  return (
                    <Box
                      key={banner.id}
                      onClick={() => handleSelectDefaultBanner(banner.url)}
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
                        src={banner.url}
                        alt={banner.name}
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

          {form.formState.errors?.bannerImage ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {form.formState.errors?.bannerImage?.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Banner Title*</InputLabel>
        <Controller
          control={form.control}
          name="bannerTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              placeholder="Enter banner title"
              value={value ?? ''}
              onChange={onChange}
              error={!!form.formState.errors?.bannerTitle}
              helperText={form.formState.errors?.bannerTitle?.message}
            />
          )}
        />
      </Grid>

      {/* Subtitle */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Banner Subtitle</InputLabel>
        <Controller
          control={form.control}
          name="bannerSubtitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              placeholder="Enter banner sub title"
              value={value ?? ''}
              onChange={onChange}
              error={!!form.formState.errors?.bannerSubtitle}
              helperText={form.formState.errors?.bannerSubtitle?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          loading={homePageHeroUpdateLoading}
          disabled={homePageHeroUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default HeroSectionBannerComp;
