'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useCountryListGetAll } from '@/api/hooks/master/country-list/hooks';
import {
  useRegionListCreate,
  useRegionListGet,
  useRegionListUpdate,
} from '@/api/hooks/master/region-list/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DEFAULT_BANNERS, IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  regionListSchema,
  TRegionListSchemaType,
} from '@/module/dashboard/validation/master/region-list/index.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TEachCountryList } from '@/types/apps/master/country-list/index.type';
import { TRegionListCountryOption } from '@/types/apps/master/region-list/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type TRegionListFormProps = {
  /** Present when editing, absent when adding */
  regionListId?: string;
};

const toSlug = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const labelSx = { color: '#FFFFFF' };

const RegionListForm = ({ regionListId }: TRegionListFormProps) => {
  const router = useRouter();
  const theme = useTheme();
  const isEdit = !!regionListId;

  const [bannerImage, setBannerImage] = useState<File | string | null>(null);
  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);
  const [thumbImage, setThumbImage] = useState<File | string | null>(null);
  const [thumbImageSize, setThumbImageSize] = useState<number | null>(null);

  const form = useForm<TRegionListSchemaType>({
    resolver: zodResolver(regionListSchema()),
    defaultValues: {
      name: '',
      slug: '',
      pageHeading: '',
      description: '',
      bannerImage: null,
      bannerImageTag: '',
      image: null,
      imageTag: '',
      countries: [],
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      metaRobotsIndex: 'index',
      metaRobotsFollow: 'follow',
      isShowUpdatedAt: false,
    },
  });
  const errors = form.formState.errors;

  const { data: regionDetails, isLoading: regionDetailsLoading } = useRegionListGet({
    id: regionListId ?? '',
  });

  // All active countries for the multi-select
  const { data: countryListData, isLoading: countryListLoading } = useCountryListGetAll({
    page: 1,
    perPage: 1000,
    search: '',
    status: 'Active',
    sortField: 'name',
    sortOrder: 'asc',
  });

  const backToList = () => router.replace(PAGE_ROUTE.dashboard.master.regionList.list);

  const { mutateAsync: createRegion, isPending: createLoading } = useRegionListCreate({
    optionalCallback: backToList,
    errorCallback: () => {},
  });
  const { mutateAsync: updateRegion, isPending: updateLoading } = useRegionListUpdate({
    optionalCallback: backToList,
    errorCallback: () => {},
  });
  const isSaving = createLoading || updateLoading;

  // Options = active countries + whatever this region already has (e.g. a now-inactive country)
  const countryOptions = useMemo<TRegionListCountryOption[]>(() => {
    const map = new Map<string, TRegionListCountryOption>();
    ((countryListData?.docs as TEachCountryList[] | undefined) ?? []).forEach((c) =>
      map.set(c._id, { _id: c._id, name: c.name, slug: c.slug }),
    );
    (regionDetails?.countries ?? []).forEach((c) => {
      if (!map.has(c._id)) map.set(c._id, c);
    });
    return Array.from(map.values());
  }, [countryListData, regionDetails]);

  useEffect(() => {
    if (regionDetails) {
      form.reset({
        name: regionDetails.name ?? '',
        slug: regionDetails.slug ?? '',
        pageHeading: regionDetails.pageHeading ?? '',
        description: regionDetails.description ?? '',
        bannerImage: regionDetails.bannerImage || null,
        bannerImageTag: regionDetails.bannerImageTag ?? '',
        image: regionDetails.image || null,
        imageTag: regionDetails.imageTag ?? '',
        countries: (regionDetails.countries ?? []).map((c) => c._id),
        metaTitle: regionDetails.metaTitle ?? '',
        metaDescription: regionDetails.metaDescription ?? '',
        metaKeywords: regionDetails.metaKeywords ?? '',
        canonicalTag: regionDetails.canonicalTag ?? '',
        openGraphTitle: regionDetails.openGraphTitle ?? '',
        openGraphDescription: regionDetails.openGraphDescription ?? '',
        structuredData: regionDetails.structuredData ?? '',
        metaRobotsIndex: (regionDetails.metaRobotsIndex ?? 'index') as 'index' | 'noindex',
        metaRobotsFollow: (regionDetails.metaRobotsFollow ?? 'follow') as 'follow' | 'nofollow',
        isShowUpdatedAt: regionDetails.isShowUpdatedAt ?? false,
      });
      setBannerImage(regionDetails.bannerImage || null);
      setBannerImageSize(regionDetails.bannerImageSize ?? null);
      setThumbImage(regionDetails.image || null);
      setThumbImageSize(regionDetails.imageSize ?? null);
    }
  }, [form, regionDetails]);

  const setBannerFile = (file: File) => {
    setBannerImage(file);
    setBannerImageSize(file.size);
    form.setValue('bannerImage', file);
    form.clearErrors('bannerImage');
  };

  const handleSelectDefaultBanner = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'banner.png';
      setBannerFile(new File([blob], filename, { type: blob.type }));
    } catch (error) {
      console.error('Error setting default banner image:', error);
    }
  };

  const onSubmit = (data: TRegionListSchemaType) => {
    const { bannerImage: banner, image: thumb, countries, ...rest } = data;
    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, String(value));
    });
    formData.append('countries', JSON.stringify(countries ?? []));

    // File → upload; string → keep current; empty → remove
    if (banner instanceof File) {
      formData.append('bannerImage', banner);
    } else {
      formData.append('bannerImage', typeof banner === 'string' ? banner : '');
    }

    if (thumb instanceof File) {
      formData.append('image', thumb);
    } else {
      formData.append('image', typeof thumb === 'string' ? thumb : '');
    }

    if (regionListId) {
      formData.append('id', regionListId);
      updateRegion(formData);
    } else {
      createRegion(formData);
    }
  };

  if (isEdit && regionDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  const textField = (
    name: keyof TRegionListSchemaType,
    label: string,
    placeholder: string,
    opts?: { multiline?: boolean; rows?: number; onChangeExtra?: (value: string) => void },
  ) => (
    <Controller
      control={form.control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <InputFieldCommon
          labelName={label}
          placeholder={placeholder}
          value={(value as string) ?? ''}
          onChange={(e) => {
            onChange(e);
            opts?.onChangeExtra?.(e.target.value);
          }}
          multiline={opts?.multiline}
          rows={opts?.rows}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string | undefined}
        />
      )}
    />
  );

  return (
    <Grid container rowSpacing={3}>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Region Name*</InputLabel>
        {textField('name', 'Region Name', 'e.g. Western Europe', {
          // Auto-fill the slug while adding; the admin can still change it
          onChangeExtra: (value) => {
            if (!isEdit) form.setValue('slug', toSlug(value), { shouldValidate: false });
          },
        })}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>
          Slug* (page URL: /private-jet-charter/{form.watch('slug') || 'slug'}/)
        </InputLabel>
        {textField('slug', 'Slug', 'e.g. western-europe')}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Page Heading (banner title)</InputLabel>
        {textField('pageHeading', 'Page Heading', 'e.g. Western Europe Private Jet Charter')}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Description</InputLabel>
        {textField('description', 'Description', 'Short description of this region', {
          multiline: true,
          rows: 3,
        })}
      </Grid>

      {/* Hero Image (Banner) — optional, page falls back to the default city banner */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel sx={{ ...labelSx, fontSize: '14px', fontWeight: 500, mb: 1 }}>
            Hero Image (header banner)
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
                  if (value) setBannerFile(value as File);
                }}
                errorValueGetter={(errorMessage) => {
                  setBannerImageSize(null);
                  form.setError('bannerImage', { message: errorMessage });
                }}
              >
                <PlusIconUpload />
              </SingleImgMainComp>
            ) : (
              <ImgPreviewMainComp
                sx={{ width: '286px !important', height: '103px !important', marginBottom: '10px' }}
                src={
                  typeof bannerImage === 'string'
                    ? mediaUrl(bannerImage)
                    : URL?.createObjectURL(bannerImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setBannerImage(null);
                    setBannerImageSize(null);
                    form.setValue('bannerImage', null);
                  }
                }}
                imageSize={bannerImageSize}
              />
            )}

            <Box sx={{ flexGrow: 1, minWidth: '280px' }}>
              <InputLabel sx={{ ...labelSx, mb: 1, fontSize: '13px' }}>
                Or select from default banners
              </InputLabel>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {DEFAULT_BANNERS?.map((banner) => {
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
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {errors.bannerImage ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {errors.bannerImage.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Hero Alt Tag</InputLabel>
        {textField('bannerImageTag', 'Hero Alt Tag', 'Enter hero alt tag')}
      </Grid>

      {/* Thumbnail Image — card on the /private-jet-charter/ listing; falls back to the hero image */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel sx={{ ...labelSx, fontSize: '14px', fontWeight: 500, mb: 1 }}>
            Thumbnail Image (listing card)
          </InputLabel>

          {thumbImage === null ? (
            <SingleImgMainComp
              needCrop
              aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.thumbnailImage}
              sxForBox={{ width: '103px !important', height: '103px !important' }}
              dataValueGetter={(value) => {
                if (value) {
                  setThumbImage(value as File);
                  setThumbImageSize((value as File).size);
                  form.setValue('image', value as File);
                  form.clearErrors('image');
                }
              }}
              errorValueGetter={(errorMessage) => {
                setThumbImageSize(null);
                form.setError('image', { message: errorMessage });
              }}
            >
              <PlusIconUpload />
            </SingleImgMainComp>
          ) : (
            <ImgPreviewMainComp
              sx={{ width: '103px !important', height: '103px !important', marginBottom: '10px' }}
              src={
                typeof thumbImage === 'string'
                  ? mediaUrl(thumbImage)
                  : URL?.createObjectURL(thumbImage)
              }
              isPreviewOnly={false}
              onDeleteHandler={(shouldDelete) => {
                if (shouldDelete) {
                  setThumbImage(null);
                  setThumbImageSize(null);
                  form.setValue('image', null);
                }
              }}
              imageSize={thumbImageSize}
            />
          )}

          {errors.image ? (
            <Typography variant="body1" className="error_msg" sx={{ mt: 1 }}>
              {errors.image.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Thumbnail Alt Tag</InputLabel>
        {textField('imageTag', 'Thumbnail Alt Tag', 'Enter thumbnail alt tag')}
      </Grid>

      {/* Countries multi-select (selection order = display order on the page) */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Countries (shown in the selected order)</InputLabel>
        <Controller
          control={form.control}
          name="countries"
          render={({ field: { onChange, value } }) => (
            <CustomAutocomplete<TRegionListCountryOption>
              id="region-countries"
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              options={countryOptions}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
              isOptionEqualToValue={(option, val) => option._id === val._id}
              labelName="Select Countries"
              noOptionsText="No Country Found"
              loading={countryListLoading}
              loadingText="Loading Countries..."
              value={(value ?? [])
                .map((id) => countryOptions.find((c) => c._id === id))
                .filter(Boolean) as TRegionListCountryOption[]}
              onChange={(_e, selected) =>
                onChange((selected as TRegionListCountryOption[]).map((c) => c._id))
              }
            />
          )}
        />
      </Grid>

      {/* SEO */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Primary Meta Tags</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Meta Title</InputLabel>
        {textField('metaTitle', 'Meta Title', 'Enter meta title (50-60 characters recommended)')}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Meta Description</InputLabel>
        {textField(
          'metaDescription',
          'Meta Description',
          'Enter meta description (150-160 characters recommended)',
          { multiline: true, rows: 3 },
        )}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Meta Keywords</InputLabel>
        {textField('metaKeywords', 'Meta Keywords', 'Enter meta keywords')}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <GroupHeading>URL Management</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Canonical URL (Leave blank to use this page&apos;s own address)</InputLabel>
        {textField('canonicalTag', 'Canonical URL', 'https://example.com/page')}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Social Sharing (Open Graph)</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>OG Title</InputLabel>
        {textField('openGraphTitle', 'OG Title', 'Enter Open Graph title')}
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>OG Description</InputLabel>
        {textField('openGraphDescription', 'OG Description', 'Enter Open Graph description', {
          multiline: true,
          rows: 3,
        })}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Robots Meta Directives</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Meta Robots Index</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsIndex"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Index Directive"
              value={value ?? 'index'}
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
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={labelSx}>Meta Robots Follow</InputLabel>
        <Controller
          control={form.control}
          name="metaRobotsFollow"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Follow Directive"
              value={value ?? 'follow'}
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

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Structured Data</GroupHeading>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={labelSx}>Schema (JSON-LD)</InputLabel>
        {textField('structuredData', 'Schema (JSON-LD)', '{"@context":"https://schema.org",...}', {
          multiline: true,
          rows: 5,
        })}
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          control={form.control}
          name="isShowUpdatedAt"
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value}
                  onChange={(e) => onChange(e.target.checked)}
                  sx={{ color: '#FFFFFF', '&.Mui-checked': { color: '#FFFFFF' } }}
                />
              }
              label="Show Last Updated Date"
              sx={{ color: '#FFFFFF' }}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={isSaving}
          startIcon={<WestIcon />}
          onClick={backToList}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={isSaving}
          loading={isSaving}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isEdit ? 'Update' : 'Add'}
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default RegionListForm;
