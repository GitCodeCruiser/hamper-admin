'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, InputLabel, styled, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useHeroSectionDetails, useHeroSectionUpdate } from '@/api/hooks/hero-section/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DEFAULT_BANNERS, IMAGE_ASPECT_RATIO_DEFINE, VIDEO_ACCEPT } from '@/constant';
import { formatBytes } from '@/lib/functions/validation';
import {
  heroSectionUpdate,
  THeroSectionUpdateSchemaType,
} from '@/module/hero-section/validation/heroSectionUpdate.zod';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

// ─── Styled Video Upload Components ─────────────────────────────────────────
const VideoUploadBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dragOver',
})<{ dragOver?: boolean }>`
  width: 286px;
  height: 103px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.customColors.textColor};
  border: ${({ theme, dragOver }) =>
    dragOver
      ? `2px dashed ${theme.palette.customColors.lightPaperBg || theme.palette.primary.main}`
      : '1px dashed rgba(255, 255, 255, 0.2)'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
  }
`;

const VideoPreviewWrap = styled(Box)`
  width: 286px;
  height: 103px;
  background: ${({ theme }) => theme.palette.customColors.textColor};
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type THeroSectionVideoBannerCompProps = {
  slug: TSeoStaticSlug;
};

const HeroSectionVideoBannerComp = ({ slug }: THeroSectionVideoBannerCompProps) => {
  const theme = useTheme();

  // Image states
  const [uploadedImages, setUploadedImages] = useState<File | string | null>(null);
  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);

  // Video states
  const [uploadedVideo, setUploadedVideo] = useState<File | string | null>(null);
  const [bannerVideoSize, setBannerVideoSize] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const form = useForm<THeroSectionUpdateSchemaType>({
    resolver: zodResolver(heroSectionUpdate()),
    defaultValues: {
      bannerImage: '',
      bannerVideo: '',
      bannerTitle: '',
      bannerSubtitle: '',
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
    const formData = new FormData();
    formData.append('id', heroSectionDetails?._id as string);
    formData.append('title', data?.bannerTitle);
    formData.append('subtitle', data?.bannerSubtitle ?? '');

    // Background Image
    if (typeof data?.bannerImage !== 'string') {
      formData.append('backgroundMedia', data?.bannerImage);
    }

    // Banner Video
    if (data?.bannerVideo) {
      if (typeof data?.bannerVideo !== 'string') {
        formData.append('bannerVideo', data?.bannerVideo);
      }
    } else {
      formData.append('bannerVideo', '');
      formData.append('bannerVideoSize', '0');
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

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate video format
      const allowedTypes = VIDEO_ACCEPT.split(',');
      if (!allowedTypes.includes(file.type)) {
        form.setError('bannerVideo', {
          message: 'Invalid video format. Please upload a valid video.',
        });
        return;
      }

      setUploadedVideo(file);
      setBannerVideoSize(file.size);
      form.setValue('bannerVideo', file);
      form.clearErrors('bannerVideo');
    }
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      // Validate video format
      const allowedTypes = VIDEO_ACCEPT.split(',');
      if (!allowedTypes.includes(file.type)) {
        form.setError('bannerVideo', {
          message: 'Invalid video format. Please upload a valid video.',
        });
        return;
      }

      setUploadedVideo(file);
      setBannerVideoSize(file.size);
      form.setValue('bannerVideo', file);
      form.clearErrors('bannerVideo');
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
        ...(heroSectionDetails?.bannerVideo && heroSectionDetails?.bannerVideo?.length > 0
          ? { bannerVideo: heroSectionDetails?.bannerVideo ?? '' }
          : { bannerVideo: '' }),
      });
      setBannerImageSize(() => heroSectionDetails?.backgroundMediaSize ?? null);
      setBannerVideoSize(() => heroSectionDetails?.bannerVideoSize ?? null);
    }

    setUploadedImages(() =>
      heroSectionDetails?.backgroundMedia && heroSectionDetails?.backgroundMedia?.length > 0
        ? heroSectionDetails?.backgroundMedia
        : null,
    );

    setUploadedVideo(() =>
      heroSectionDetails?.bannerVideo && heroSectionDetails?.bannerVideo?.length > 0
        ? heroSectionDetails?.bannerVideo
        : null,
    );

    return () => {};
  }, [
    form.reset,
    heroSectionDetails?.title,
    heroSectionDetails?.subtitle,
    heroSectionDetails?.backgroundMedia,
    heroSectionDetails?.backgroundMediaSize,
    heroSectionDetails?.bannerVideo,
    heroSectionDetails?.bannerVideoSize,
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

      {/* Upload Video */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadVideoWrapper">
          <InputLabel sx={{ color: '#FFFFFF', marginBottom: '10px' }}>Banner Video</InputLabel>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {uploadedVideo === null ? (
              <VideoUploadBox
                dragOver={dragOver}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleVideoDrop}
              >
                <input type="file" accept={VIDEO_ACCEPT} onChange={handleVideoUpload} />
                <PlusIconUpload />
              </VideoUploadBox>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <VideoPreviewWrap
                  sx={{
                    width: '286px !important',
                    height: '103px !important',
                    marginBottom: '10px',
                  }}
                >
                  <video
                    src={
                      typeof uploadedVideo === 'string'
                        ? mediaUrl(uploadedVideo)
                        : URL.createObjectURL(uploadedVideo)
                    }
                    controls
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setUploadedVideo(() => null);
                      setBannerVideoSize(() => null);
                      form.setValue('bannerVideo', '');
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      zIndex: 20,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    <Delete color="error" />
                  </IconButton>
                </VideoPreviewWrap>
                {bannerVideoSize !== null && bannerVideoSize !== undefined && (
                  <Typography variant="body2" sx={{ color: '#CCCCCC', fontSize: '12px', mt: 0.5 }}>
                    Size: {formatBytes(bannerVideoSize)}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          {form.formState.errors?.bannerVideo ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {form.formState.errors?.bannerVideo?.message}
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

export default HeroSectionVideoBannerComp;
