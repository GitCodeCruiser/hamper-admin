'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useInsiderGuideDownloadSettingDetails,
  useInsiderGuideDownloadSettingUpdate,
} from '@/api/hooks/guide-downloads/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DOCUMENT_ACCEPT, IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  guideDownloadSettingSchema,
  TGuideDownloadSettingType,
} from '@/module/dashboard/validation/guide-downloads/guideDownloadSettingSchema.zod';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const GuideDownloadSetting = () => {
  const [image, setImage] = useState<File | string | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [heroImage, setHeroImage] = useState<File | string | null>(null);
  const [heroImageSize, setHeroImageSize] = useState<number | null>(null);
  const [downloadFile, setDownloadFile] = useState<File | string | null>(null);
  const [docDragOver, setDocDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<TGuideDownloadSettingType>({
    resolver: zodResolver(guideDownloadSettingSchema()),
  });

  const errors = form.formState.errors;

  const { data: settingDetails, isLoading: settingDetailsLoading } =
    useInsiderGuideDownloadSettingDetails();

  const { mutateAsync: updateSetting, isPending: updateSettingLoading } =
    useInsiderGuideDownloadSettingUpdate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  useEffect(() => {
    if (settingDetails) {
      form.reset({
        ...(settingDetails?.bannerImage && settingDetails?.bannerImage?.length > 0
          ? { image: settingDetails?.bannerImage ?? '' }
          : {}),
        ...(settingDetails?.heroImage && settingDetails?.heroImage?.length > 0
          ? { heroImage: settingDetails?.heroImage ?? '' }
          : {}),
        ...(settingDetails?.downloadFile && settingDetails?.downloadFile?.length > 0
          ? { downloadFile: settingDetails?.downloadFile ?? '' }
          : {}),
        downloadButtonText: settingDetails?.downloadButtonText ?? '',
        title: settingDetails?.title ?? '',
        description: settingDetails?.description ?? '',
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
      setDownloadFile(() =>
        settingDetails?.downloadFile && settingDetails?.downloadFile?.length > 0
          ? settingDetails?.downloadFile
          : null,
      );
    }
  }, [settingDetails, form]);

  const onSubmit = (data: TGuideDownloadSettingType) => {
    const formData = new FormData();

    if (data.image instanceof File) {
      formData.append('bannerImage', data.image);
    } else if (typeof data.image === 'string' && data.image?.length > 0) {
      formData.append('bannerImage', data.image);
    }

    if (data.heroImage instanceof File) {
      formData.append('heroImage', data.heroImage);
    } else if (typeof data.heroImage === 'string' && data.heroImage?.length > 0) {
      formData.append('heroImage', data.heroImage);
    }

    if (data.downloadFile instanceof File) {
      formData.append('downloadFile', data.downloadFile);
    } else if (typeof data.downloadFile === 'string' && data.downloadFile?.length > 0) {
      formData.append('downloadFile', data.downloadFile);
    }

    formData.append('downloadButtonText', data.downloadButtonText);
    formData.append('title', data.title);
    formData.append('description', data.description);

    updateSetting(formData);
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDownloadFile(file);
      form.setValue('downloadFile', file);
      form.clearErrors('downloadFile');
    }
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
        {/* <Grid size={{ xs: 12 }}>
          <Box sx={{ pb: 1, mb: 2 }}>
            <GroupHeading>Guide Modal Settings</GroupHeading>
          </Box>
        </Grid> */}

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

        {/* Download File Upload */}
        <Grid size={{ xs: 12 }}>
          <Box>
            <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
              Download File (PDF, Word, Excel, CSV, PPT)*
            </InputLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              {downloadFile === null || downloadFile === '' ? (
                <Box
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDocDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDocDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDocDragOver(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      setDownloadFile(file);
                      form.setValue('downloadFile', file);
                      form.clearErrors('downloadFile');
                    }
                  }}
                  sx={{
                    width: '103px',
                    height: '103px',
                    borderRadius: '10px',
                    background: docDragOver
                      ? 'rgba(212, 175, 55, 0.1)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: docDragOver
                      ? '2px dashed #D4AF37'
                      : '1px dashed rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      border: '1px dashed #D4AF37',
                    },
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleDocumentUpload}
                    accept={`${DOCUMENT_ACCEPT},.pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx`}
                  />
                  <PlusIconUpload />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '103px',
                    height: '103px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <AttachFileIcon sx={{ color: '#D4AF37', fontSize: 32 }} />
                  <Typography
                    variant="caption"
                    noWrap={true}
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      mt: 1,
                      px: 1,
                      //   noWrap: true,
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '10px',
                    }}
                  >
                    {typeof downloadFile === 'string'
                      ? downloadFile.split('/').pop()
                      : (downloadFile as File).name}
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      background: 'rgba(0,0,0,0.5)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      padding: '2px',
                    }}
                    onClick={() => {
                      setDownloadFile(() => null);
                      form.setValue('downloadFile', undefined as unknown as string);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ea5455"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Box>
                </Box>
              )}
            </Box>
            {errors.downloadFile ? (
              <Typography variant="body1" className="error_msg">
                {errors.downloadFile.message}
              </Typography>
            ) : null}
          </Box>
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
                placeholder="Enter title"
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
                placeholder="Enter description"
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

        {/* Download Button Text */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
            Download Button Text*
          </InputLabel>
          <Controller
            control={form.control}
            name="downloadButtonText"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter download button text"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors.downloadButtonText}
                helperText={errors.downloadButtonText?.message}
              />
            )}
          />
        </Grid>

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

export default GuideDownloadSetting;
