'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  TMembershipEditSchemaType,
  membershipEditSchema,
} from '../../validation/membership-flow/index.zod';
import { AircraftGroupHeading } from '../aircraft/AircraftAddForm';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useMembershipGet, useMembershipUpdate } from '@/api/hooks/membership-flow/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import {
  DEFAULT_BANNERS,
  DEFAULT_OG_IMAGES,
  DEFAULT_THUMBNAILS,
  IMAGE_ASPECT_RATIO_DEFINE,
} from '@/constant';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
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
const canonicalUrlLabel = 'Canonical URL';
const canonicalUrlPlaceholder = 'https://example.com/page';
const ogTitleLabel = 'OG Title';
const ogTitlePlaceholder = 'Enter Open Graph title';
const ogDescriptionLabel = 'OG Description';
const ogDescriptionPlaceholder = 'Enter Open Graph description';
const ogImageLabel = 'OG Image';
const schemaLabel = 'Schema (JSON-LD)';
const schemaPlaceholder = '{"@context":"https://schema.org",...}';

type TMembershipEditFormProps = {
  membershipId: string;
};

const MembershipEditForm = ({ membershipId }: TMembershipEditFormProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [bannerImage, setBannerImage] = useState<File | string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | string | null>(null);
  const [seoOgImage, setSeoOgImage] = useState<File | string | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);
  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);
  const [thumbnailImageSize, setThumbnailImageSize] = useState<number | null>(null);

  const form = useForm<TMembershipEditSchemaType>({
    resolver: zodResolver(membershipEditSchema()),
    defaultValues: {
      title: '',
      smallDescription: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      slug: '',
      bannerImageTag: '',
      thumbnailImageTag: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: membershipUpdate, isPending: membershipUpdateLoading } = useMembershipUpdate(
    {
      optionalCallback: () => {
        router.replace(PAGE_ROUTE.dashboard.membership.list);
      },
      errorCallback: () => {},
    },
  );

  const { data: membershipDetail, isLoading: membershipDetailLoading } = useMembershipGet({
    id: membershipId,
  });

  const handleSelectDefaultBanner = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'banner.png';
      const file = new File([blob], filename, { type: blob.type });

      setBannerImage(() => file);
      setBannerImageSize(() => file.size);
      form.setValue('bannerImage', file);
      form.clearErrors('bannerImage');
    } catch (error) {
      console.error('Error setting default banner image:', error);
    }
  };

  const handleSelectDefaultThumbnail = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'thumbnail.png';
      const file = new File([blob], filename, { type: blob.type });

      setThumbnailImage(() => file);
      setThumbnailImageSize(() => file.size);
      form.setValue('thumbnailImage', file);
      form.clearErrors('thumbnailImage');
    } catch (error) {
      console.error('Error setting default thumbnail image:', error);
    }
  };

  const handleSelectDefaultOgImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'ogImage.png';
      const file = new File([blob], filename, { type: blob.type });

      setSeoOgImage(() => file);
      setOpenGraphImageSize(() => file.size);
      form.setValue('openGraphImage', file);
      form.clearErrors('openGraphImage');
    } catch (error) {
      console.error('Error setting default OG image:', error);
    }
  };

  const onSubmit = (data: TMembershipEditSchemaType) => {
    const formData = new FormData();
    formData.append('id', membershipId);

    formData.append('membershipCategoryId', '');
    formData.append('title', data?.title);
    formData.append('smallDescription', data?.smallDescription);
    formData.append('slug', data?.slug);
    formData.append('bannerImage', data?.bannerImage);
    formData.append('bannerImageTag', data?.bannerImageTag ?? '');
    formData.append('thumbnailImage', data?.thumbnailImage);
    formData.append('thumbnailImageTag', data?.thumbnailImageTag ?? '');

    formData.append('metaTitle', data?.metaTitle);
    formData.append('metaDescription', data?.metaDescription);
    formData.append('metaKeywords', data?.metaKeywords);
    formData.append('canonicalTag', data?.canonicalTag);
    formData.append('openGraphTitle', data?.openGraphTitle);
    formData.append('openGraphDescription', data?.openGraphDescription);
    formData.append('structuredData', data?.structuredData);
    formData.append('metaRobotsIndex', data?.metaRobotsIndex);
    formData.append('metaRobotsFollow', data?.metaRobotsFollow);

    if (typeof data?.openGraphImage !== 'string') {
      formData.append('openGraphImage', data?.openGraphImage);
    }

    membershipUpdate(formData);
  };

  useEffect(() => {
    if (membershipDetail) {
      form.reset({
        id: membershipDetail?._id,
        membershipCategoryId: membershipDetail?.membershipCategoryId,
        title: membershipDetail?.title ?? '',
        smallDescription: membershipDetail?.smallDescription ?? '',
        slug: membershipDetail?.slug ?? '',
        bannerImageTag: membershipDetail?.bannerImageTag ?? '',
        thumbnailImageTag: membershipDetail?.thumbnailImageTag ?? '',
        metaTitle: membershipDetail?.metaTitle ?? '',
        metaDescription: membershipDetail?.metaDescription ?? '',
        metaKeywords: membershipDetail?.metaKeywords ?? '',
        canonicalTag: membershipDetail?.canonicalTag ?? '',
        openGraphTitle: membershipDetail?.openGraphTitle ?? '',
        openGraphDescription: membershipDetail?.openGraphDescription ?? '',
        structuredData: membershipDetail?.structuredData ?? '',
        metaRobotsIndex: (membershipDetail?.metaRobotsIndex ?? 'noindex') as 'noindex' | 'index',
        metaRobotsFollow: (membershipDetail?.metaRobotsFollow ?? 'nofollow') as
          'nofollow' | 'follow',

        ...(membershipDetail?.openGraphImage && membershipDetail?.openGraphImage?.length > 0
          ? { openGraphImage: membershipDetail?.openGraphImage ?? '' }
          : {}),
        ...(membershipDetail?.bannerImage && membershipDetail?.bannerImage?.length > 0
          ? { bannerImage: membershipDetail?.bannerImage ?? '' }
          : {}),
        ...(membershipDetail?.thumbnailImage && membershipDetail?.thumbnailImage?.length > 0
          ? { thumbnailImage: membershipDetail?.thumbnailImage ?? '' }
          : {}),
      });
    }

    setBannerImage(() =>
      membershipDetail?.bannerImage && membershipDetail?.bannerImage?.length > 0
        ? membershipDetail?.bannerImage
        : null,
    );
    setThumbnailImage(() =>
      membershipDetail?.thumbnailImage && membershipDetail?.thumbnailImage?.length > 0
        ? membershipDetail?.thumbnailImage
        : null,
    );
    setSeoOgImage(() =>
      membershipDetail?.openGraphImage && membershipDetail?.openGraphImage?.length > 0
        ? membershipDetail?.openGraphImage
        : null,
    );
    setOpenGraphImageSize(() =>
      membershipDetail?.openGraphImageSize ? Number(membershipDetail.openGraphImageSize) : null,
    );
    setBannerImageSize(membershipDetail?.bannerImageSize ?? null);
    setThumbnailImageSize(membershipDetail?.thumbnailImageSize ?? null);
  }, [
    membershipId,
    form.reset,
    membershipDetail?._id,
    membershipDetail?.title,
    membershipDetail?.smallDescription,
    membershipDetail?.slug,
    membershipDetail?.metaTitle,
    membershipDetail?.metaDescription,
    membershipDetail?.metaKeywords,
    membershipDetail?.canonicalTag,
    membershipDetail?.openGraphTitle,
    membershipDetail?.openGraphDescription,
    membershipDetail?.structuredData,
    membershipDetail?.metaRobotsIndex,
    membershipDetail?.metaRobotsFollow,
    membershipDetail?.bannerImage,
    membershipDetail?.bannerImageSize,
    membershipDetail?.bannerImageTag,
    membershipDetail?.thumbnailImage,
    membershipDetail?.thumbnailImageSize,
    membershipDetail?.thumbnailImageTag,
    membershipDetail?.openGraphImage,
    membershipDetail?.openGraphImageSize,
    membershipDetail?.membershipCategoryId,
    setBannerImage,
    setBannerImageSize,
    setThumbnailImage,
    setThumbnailImageSize,
    setSeoOgImage,
    form,
  ]);

  if (membershipDetailLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Title*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Title"
              placeholder="Enter title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Short Description</InputLabel>
        <Controller
          control={form.control}
          name="smallDescription"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              placeholder="Write your content here..."
              content={value ?? ''}
              minHeight={300}
              onChange={onChange}
            />
          )}
        />

        {!!errors.smallDescription ? (
          <Typography variant="body1" className="error_msg">
            {errors?.smallDescription.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Slug */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Slug*</InputLabel>
        <Controller
          control={form.control}
          name="slug"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Slug"
              placeholder="Enter slug"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.slug}
              helperText={errors?.slug?.message}
            />
          )}
        />
      </Grid>

      {/* Thumbnail Image (Poster) Upload */}
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
            Thumbnail Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {thumbnailImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.thumbnailImage}
                sxForBox={{ width: '103px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setThumbnailImage(() => value);
                    setThumbnailImageSize(() => value.size);

                    form.setValue('thumbnailImage', value as File);
                    form.clearErrors('thumbnailImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setThumbnailImageSize(() => null);
                  form.setError('thumbnailImage', { message: errorMessage });
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
                  typeof thumbnailImage === 'string'
                    ? mediaUrl(thumbnailImage)
                    : URL?.createObjectURL(thumbnailImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setThumbnailImage(() => null);
                    setThumbnailImageSize(() => null);
                    form.setValue('thumbnailImage', undefined as unknown as File);
                  }
                }}
                imageSize={thumbnailImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '13px' }}>
                Or select from default thumbnails
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_THUMBNAILS?.map((thumb) => {
                  const isSelected =
                    thumbnailImage instanceof File
                      ? thumbnailImage.name === thumb.url.split('/').pop()
                      : typeof thumbnailImage === 'string' &&
                        (thumbnailImage.includes(thumb.url) || thumb.url.includes(thumbnailImage));

                  return (
                    <Box
                      key={thumb.id}
                      onClick={() => handleSelectDefaultThumbnail(thumb.url)}
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
                        src={thumb.url}
                        alt={thumb.name}
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

          {errors.thumbnailImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.thumbnailImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Thumbnail Alt Tag</InputLabel>
        <Controller
          control={form.control}
          name="thumbnailImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Thumbnail Alt Tag"
              placeholder="Enter thumbnail alt tag"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.thumbnailImageTag}
              helperText={errors?.thumbnailImageTag?.message}
            />
          )}
        />
      </Grid>

      {/* Hero Image (Banner) Upload */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Hero Image
          </InputLabel>

          <Box
            className="allImgUploadWrap"
            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}
          >
            {bannerImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.heroImage}
                sxForBox={{ width: '286px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setBannerImage(() => value);
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
                  typeof bannerImage === 'string'
                    ? mediaUrl(bannerImage)
                    : URL?.createObjectURL(bannerImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setBannerImage(() => null);
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
                    bannerImage instanceof File
                      ? bannerImage.name === banner.url.split('/').pop()
                      : typeof bannerImage === 'string' &&
                        (bannerImage.includes(banner.url) || banner.url.includes(bannerImage));

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

          {errors.bannerImage ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {errors?.bannerImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Hero Alt Tag</InputLabel>
        <Controller
          control={form.control}
          name="bannerImageTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Hero Alt Tag"
              placeholder="Enter hero alt tag"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.bannerImageTag}
              helperText={errors?.bannerImageTag?.message}
            />
          )}
        />
      </Grid>

      {/* ═══════════════════════════════════════════════════════════════════
          SEO PRIMARY META TAGS
         ═══════════════════════════════════════════════════════════════════ */}

      <Grid size={{ xs: 12 }} sx={{ mt: 10 }}>
        <AircraftGroupHeading>Seo Details</AircraftGroupHeading>
      </Grid>

      {/* Meta Title */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Title*</InputLabel>
        <Controller
          control={form.control}
          name="metaTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaTitleLabel}
              placeholder={metaTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.metaTitle}
              helperText={errors?.metaTitle?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Description*</InputLabel>
        <Controller
          control={form.control}
          name="metaDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaDescriptionLabel}
              placeholder={metaDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.metaDescription}
              helperText={errors?.metaDescription?.message}
            />
          )}
        />
      </Grid>

      {/* Meta Keywords */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Meta Keywords*</InputLabel>
        <Controller
          control={form.control}
          name="metaKeywords"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={metaKeywordsLabel}
              placeholder={metaKeywordsPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.metaKeywords}
              helperText={errors?.metaKeywords?.message}
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

      {/* Canonical URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Canonical URL*</InputLabel>
        <Controller
          control={form.control}
          name="canonicalTag"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={canonicalUrlLabel}
              placeholder={canonicalUrlPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.canonicalTag}
              helperText={errors?.canonicalTag?.message}
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
          name="openGraphTitle"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogTitleLabel}
              placeholder={ogTitlePlaceholder}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.openGraphTitle}
              helperText={errors?.openGraphTitle?.message}
            />
          )}
        />
      </Grid>

      {/* OG Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>OG Description*</InputLabel>
        <Controller
          control={form.control}
          name="openGraphDescription"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={ogDescriptionLabel}
              placeholder={ogDescriptionPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.openGraphDescription}
              helperText={errors?.openGraphDescription?.message}
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

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {seoOgImage === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
                  if (value) {
                    setSeoOgImage(() => value);
                    setOpenGraphImageSize(() => value.size);

                    form.setValue('openGraphImage', value as File);
                    form.clearErrors('openGraphImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setOpenGraphImageSize(() => null);
                  form.setError('openGraphImage', { message: errorMessage });
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
                  typeof seoOgImage === 'string'
                    ? mediaUrl(seoOgImage)
                    : URL?.createObjectURL(seoOgImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setSeoOgImage(() => null);
                    setOpenGraphImageSize(() => null);
                    form.setValue('openGraphImage', undefined as unknown as File);
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
                    seoOgImage instanceof File
                      ? seoOgImage.name === og.url.split('/').pop()
                      : typeof seoOgImage === 'string' &&
                        (seoOgImage.includes(og.url) || og.url.includes(seoOgImage));

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

          {errors.openGraphImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.openGraphImage.message}
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
          name="structuredData"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName={schemaLabel}
              placeholder={schemaPlaceholder}
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={5}
              error={!!errors?.structuredData}
              helperText={errors?.structuredData?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={membershipDetailLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.membership.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={membershipUpdateLoading}
          loading={membershipUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default MembershipEditForm;
