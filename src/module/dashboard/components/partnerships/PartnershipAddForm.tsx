'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  partnershipAddSchema,
  TPartnershipAddSchemaType,
} from '../../validation/partnerships/index.zod';

import { mediaUrl } from '@/api/endpoints';
import { usePartnershipCreate } from '@/api/hooks/partnerships/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
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
const ogImageLabel = 'OG Image*';
const schemaLabel = 'Schema (JSON-LD)';
const schemaPlaceholder = '{"@context":"https://schema.org",...}';

type TPartnershipAddFormProps = {
  slug: TSeoStaticSlug;
};

const PartnershipAddForm = ({ slug }: TPartnershipAddFormProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [bgImage, setBgImage] = useState<File | string | null>(null);
  const [backgroundImageSize, setBackgroundImageSize] = useState<number | null>(null);
  const [logoImage, setLogoImage] = useState<File | string | null>(null);
  const [companyLogoSize, setCompanyLogoSize] = useState<number | null>(null);
  const [seoOgImage, setSeoOgImage] = useState<File | string | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);

  const form = useForm<TPartnershipAddSchemaType>({
    resolver: zodResolver(partnershipAddSchema()),
    defaultValues: {
      title: '',
      description: '',
      url: '',
      postedDate: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: partnershipSave, isPending: partnershipSaveLoading } = usePartnershipCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.lifestyle.partnerships.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TPartnershipAddSchemaType) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('metaTitle', data.metaTitle);

    if (data.description) formData.append('description', data.description);
    if (data.url) formData.append('url', data.url);
    if (data.postedDate) formData.append('postedDate', data.postedDate);

    if (data.backgroundImage) {
      formData.append('backgroundImage', data.backgroundImage);
    }
    if (data.companyLogo) {
      formData.append('companyLogo', data.companyLogo);
    }

    formData.append('metaDescription', data.metaDescription);
    formData.append('metaKeywords', data.metaKeywords);
    formData.append('canonicalTag', data.canonicalTag);
    formData.append('openGraphTitle', data.openGraphTitle);
    formData.append('openGraphDescription', data.openGraphDescription);
    formData.append('structuredData', data.structuredData);
    formData.append('metaRobotsIndex', data.metaRobotsIndex);
    formData.append('metaRobotsFollow', data.metaRobotsFollow);

    if (typeof data.openGraphImage !== 'string') {
      formData.append('openGraphImage', data.openGraphImage);
    }

    partnershipSave(formData);
  };

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

      {/* URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>URL</InputLabel>
        <Controller
          control={form.control}
          name="url"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="URL"
              placeholder="Enter URL"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.url}
              helperText={errors?.url?.message}
            />
          )}
        />
      </Grid>

      {/* Company Logo Upload */}
      <Grid size={{ xs: 6 }}>
        <Box>
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Company Logo
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {logoImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={1}
                sxForBox={{ width: '103px !important', height: '103px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setLogoImage(() => value);
                    setCompanyLogoSize(() => value.size);
                    form.setValue('companyLogo', value as File);
                    form.clearErrors('companyLogo');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setCompanyLogoSize(() => null);
                  form.setError('companyLogo', { message: errorMessage });
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
                  typeof logoImage === 'string'
                    ? mediaUrl(logoImage)
                    : URL?.createObjectURL(logoImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setLogoImage(() => null);
                    setCompanyLogoSize(() => null);
                    form.setValue('companyLogo', undefined as unknown as File);
                  }
                }}
                imageSize={companyLogoSize}
              />
            )}
          </Box>

          {errors.companyLogo ? (
            <Typography variant="body1" className="error_msg">
              {errors?.companyLogo.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Background Image Upload */}
      <Grid size={{ xs: 6 }}>
        <Box>
          <InputLabel
            sx={{
              color: theme.palette.common.white,
              fontSize: '14px',
              fontWeight: 500,
              mb: 1,
            }}
          >
            Background Image
          </InputLabel>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            {bgImage === null ? (
              <SingleImgMainComp
                needCrop
                aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.partnerShipBannerImage}
                sxForBox={{ width: '200px !important', height: '130px !important' }}
                dataValueGetter={(value) => {
                  if (value) {
                    setBgImage(() => value);
                    setBackgroundImageSize(() => value.size);
                    form.setValue('backgroundImage', value as File);
                    form.clearErrors('backgroundImage');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setBackgroundImageSize(() => null);
                  form.setError('backgroundImage', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </SingleImgMainComp>
            ) : (
              <ImgPreviewMainComp
                sx={{
                  width: '200px !important',
                  height: '130px !important',
                  marginBottom: '10px',
                }}
                src={
                  typeof bgImage === 'string' ? mediaUrl(bgImage) : URL?.createObjectURL(bgImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setBgImage(() => null);
                    setBackgroundImageSize(() => null);
                    form.setValue('backgroundImage', undefined as unknown as File);
                  }
                }}
                imageSize={backgroundImageSize}
              />
            )}
          </Box>

          {errors.backgroundImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.backgroundImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Posted Date */}
      {/* <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Posted Date</InputLabel>
        <Controller
          control={form.control}
          name="postedDate"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Posted Date"
              type="datetime-local"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.postedDate}
              helperText={errors?.postedDate?.message}
            />
          )}
        />
      </Grid> */}

      {/* Rich Text Editor for Content Description */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Description</InputLabel>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              placeholder="Write description here..."
              content={value}
              onChange={onChange}
            />
          )}
        />

        {errors.description ? (
          <Typography variant="body1" className="error_msg">
            {errors?.description.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Primary Meta Tags */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Primary Meta Tags</GroupHeading>
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

      {/* URL Management */}
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

      {/* Social Sharing (Open Graph) */}
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

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
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
          </Box>

          {errors.openGraphImage ? (
            <Typography variant="body1" className="error_msg">
              {errors?.openGraphImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Robots Meta Directives */}
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

      {/* Structured Data */}
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

      {/* Submit / Back Buttons */}
      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={partnershipSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.lifestyle.partnerships.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={partnershipSaveLoading}
          loading={partnershipSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default PartnershipAddForm;
