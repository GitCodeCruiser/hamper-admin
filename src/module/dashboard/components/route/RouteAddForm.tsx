'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { routeAddSchema, TRouteAddSchemaType } from '../../validation/route/index.zod';

import { mediaUrl } from '@/api/endpoints';
import { useLocationHierarchy } from '@/api/hooks/location/hooks';
import { useRouteCreate } from '@/api/hooks/route/hooks';
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
import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '@/types/apps/location/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
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

const RouteAddForm = () => {
  const router = useRouter();
  const theme = useTheme();

  const [bannerImage, setBannerImage] = useState<File | string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | string | null>(null);
  const [seoOgImage, setSeoOgImage] = useState<File | string | null>(null);

  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);
  const [thumbnailImageSize, setThumbnailImageSize] = useState<number | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);

  const form = useForm<TRouteAddSchemaType>({
    resolver: zodResolver(routeAddSchema()),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      departureCountry: '',
      departureCountryId: '',
      departureCountrySlug: '',
      departureState: '',
      departureStateId: '',
      departureStateSlug: '',
      departureCity: '',
      departureCityId: '',
      departureCitySlug: '',
      arrivalCountry: '',
      arrivalCountryId: '',
      arrivalCountrySlug: '',
      arrivalState: '',
      arrivalStateId: '',
      arrivalStateSlug: '',
      arrivalCity: '',
      arrivalCityId: '',
      arrivalCitySlug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      bannerImageTag: '',
      thumbnailImageTag: '',
      redirectUrl: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
      isShowUpdatedAt: false,
    },
  });

  const errors = form.formState.errors;

  const {
    selectedDepartureCountry,
    selectedDepartureState,
    selectedDepartureCity,
    selectedArrivalCountry,
    selectedArrivalState,
    selectedArrivalCity,
  } = {
    selectedDepartureCountry: form.watch('departureCountry'),
    selectedDepartureState: form.watch('departureState'),
    selectedDepartureCity: form.watch('departureCity'),
    selectedArrivalCountry: form.watch('arrivalCountry'),
    selectedArrivalState: form.watch('arrivalState'),
    selectedArrivalCity: form.watch('arrivalCity'),
  };

  // Departure Location Hooks
  const {
    countryListRaw: departureCountryListRaw,
    countryListRawLoading: departureCountryListRawLoading,
    stateListRaw: departureStateListRaw,
    stateListRawLoading: departureStateListRawLoading,
    cityListRaw: departureCityListRaw,
    cityListRawLoading: departureCityListRawLoading,
    onCountryChange: departureOnCountryChange,
    onStateChange: departureOnStateChange,
    onCityChange: departureOnCityChange,
  } = useLocationHierarchy({
    countrySearch: selectedDepartureCountry,
    stateSearch: selectedDepartureState,
    citySearch: selectedDepartureCity,
  });

  // Arrival Location Hooks
  const {
    countryListRaw: arrivalCountryListRaw,
    countryListRawLoading: arrivalCountryListRawLoading,
    stateListRaw: arrivalStateListRaw,
    stateListRawLoading: arrivalStateListRawLoading,
    cityListRaw: arrivalCityListRaw,
    cityListRawLoading: arrivalCityListRawLoading,
    onCountryChange: arrivalOnCountryChange,
    onStateChange: arrivalOnStateChange,
    onCityChange: arrivalOnCityChange,
  } = useLocationHierarchy({
    countrySearch: selectedArrivalCountry,
    stateSearch: selectedArrivalState,
    citySearch: selectedArrivalCity,
  });

  const { departureCountryListData, departureStatesListData, departureCityListData } =
    useMemo(() => {
      const departureCountryListData = departureCountryListRaw || [];
      const departureStatesListData = departureStateListRaw || [];
      const departureCityListData = departureCityListRaw || [];
      return { departureCountryListData, departureStatesListData, departureCityListData };
    }, [departureCountryListRaw, departureStateListRaw, departureCityListRaw]);

  const { arrivalCountryListData, arrivalStatesListData, arrivalCityListData } = useMemo(() => {
    const arrivalCountryListData = arrivalCountryListRaw || [];
    const arrivalStatesListData = arrivalStateListRaw || [];
    const arrivalCityListData = arrivalCityListRaw || [];
    return { arrivalCountryListData, arrivalStatesListData, arrivalCityListData };
  }, [arrivalCountryListRaw, arrivalStateListRaw, arrivalCityListRaw]);

  const { mutateAsync: routeSave, isPending: routeSaveLoading } = useRouteCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.route.list);
    },
    errorCallback: () => {},
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

  const onSubmit = (data: TRouteAddSchemaType) => {
    const formData = new FormData();
    formData.append('title', data?.title);
    formData.append('slug', data?.slug);
    formData.append('description', data?.description ?? '');

    formData.append('departureCountry', data?.departureCountry);
    formData.append('departureCountrySlug', data?.departureCountrySlug ?? '');

    if (data?.departureState) {
      formData.append('departureState', data?.departureState);
    }
    if (data?.departureStateSlug) {
      formData.append('departureStateSlug', data?.departureStateSlug);
    }
    if (data?.departureCity) {
      formData.append('departureCity', data?.departureCity);
    }
    if (data?.departureCitySlug) {
      formData.append('departureCitySlug', data?.departureCitySlug);
    }

    formData.append('arrivalCountry', data?.arrivalCountry);
    formData.append('arrivalCountrySlug', data?.arrivalCountrySlug ?? '');

    if (data?.arrivalState) {
      formData.append('arrivalState', data?.arrivalState);
    }
    if (data?.arrivalStateSlug) {
      formData.append('arrivalStateSlug', data?.arrivalStateSlug);
    }
    if (data?.arrivalCity) {
      formData.append('arrivalCity', data?.arrivalCity);
    }
    if (data?.arrivalCitySlug) {
      formData.append('arrivalCitySlug', data?.arrivalCitySlug);
    }

    formData.append(
      'source',
      JSON.stringify({
        countryId: data?.departureCountryId ?? '',
        stateId: data?.departureStateId ?? '',
        cityId: data?.departureCityId ?? '',
      }),
    );

    formData.append(
      'destination',
      JSON.stringify({
        countryId: data?.arrivalCountryId ?? '',
        stateId: data?.arrivalStateId ?? '',
        cityId: data?.arrivalCityId ?? '',
      }),
    );

    formData.append('bannerImage', data?.bannerImage);
    formData.append('thumbnailImage', data?.thumbnailImage);
    formData.append('bannerImageTag', data?.bannerImageTag ?? '');
    formData.append('thumbnailImageTag', data?.thumbnailImageTag ?? '');

    formData.append('metaTitle', data?.metaTitle);
    formData.append('metaDescription', data?.metaDescription);
    formData.append('metaKeywords', data?.metaKeywords);
    formData.append('canonicalTag', data?.canonicalTag);
    formData.append('openGraphTitle', data?.openGraphTitle);
    formData.append('openGraphDescription', data?.openGraphDescription);
    formData.append('structuredData', data?.structuredData);
    formData.append('redirectUrl', data?.redirectUrl ?? '');
    formData.append('metaRobotsIndex', data?.metaRobotsIndex);
    formData.append('metaRobotsFollow', data?.metaRobotsFollow);
    formData.append('isShowUpdatedAt', String(data?.isShowUpdatedAt ?? false));

    if (typeof data?.openGraphImage !== 'string') {
      formData.append('openGraphImage', data?.openGraphImage);
    }

    routeSave(formData);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={3}>
      {/* Title */}
      <Grid size={{ xs: 12, md: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Title*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Route title"
              placeholder="Enter route title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* Slug */}
      <Grid size={{ xs: 12, md: 6 }}>
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

      {/* ── Departure Location ─────────────────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Departure Location</GroupHeading>
      </Grid>

      {/* Departure Country Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Country*</InputLabel>
        <CustomAutocomplete
          id="departure-country-list"
          options={departureCountryListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select Country"
          noOptionsText="No Country Found"
          loading={departureCountryListRawLoading}
          loadingText="Loading Countries..."
          value={
            departureCountryListData?.find((item) => item?.name === selectedDepartureCountry) ||
            null
          }
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCountry).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCountry)._id;
              form.setValue('departureCountry', val);
              form.setValue('departureCountryId', id);
              form.setValue('departureCountrySlug', (value as TEachLocationCountry).slug);
            } else {
              form.setValue('departureCountry', '');
              form.setValue('departureCountryId', '');
              form.setValue('departureCountrySlug', '');
            }
            form.setValue('departureState', '');
            form.setValue('departureStateId', '');
            form.setValue('departureStateSlug', '');
            form.setValue('departureCity', '');
            form.setValue('departureCityId', '');
            form.setValue('departureCitySlug', '');
          }}
          renderOption={(props, option: TEachLocationCountry) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          onInputChange={(_, value) => {
            if (value !== selectedDepartureCountry) {
              form.setValue('departureCountry', value);
              form.clearErrors('departureCountry');
              departureOnCountryChange(value);

              form.setValue('departureState', '');
              form.setValue('departureStateId', '');
              form.setValue('departureStateSlug', '');
              form.setValue('departureCity', '');
              form.setValue('departureCityId', '');
              form.setValue('departureCitySlug', '');
            }
          }}
        />

        {errors.departureCountry ? (
          <Typography variant="body1" className="error_msg">
            {errors?.departureCountry.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Departure State Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>State</InputLabel>
        <CustomAutocomplete
          id="departure-state-list"
          options={departureStatesListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select State"
          noOptionsText="No State Found"
          loading={departureStateListRawLoading}
          loadingText="Loading States..."
          renderOption={(props, option: TEachLocationState) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          value={
            departureStatesListData?.find((item) => item?.name === selectedDepartureState) || null
          }
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationState).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationState)._id;
              form.setValue('departureState', val);
              form.setValue('departureStateId', id);
              form.setValue('departureStateSlug', (value as TEachLocationState).slug);
            } else {
              form.setValue('departureState', '');
              form.setValue('departureStateId', '');
              form.setValue('departureStateSlug', '');
            }
            form.setValue('departureCity', '');
            form.setValue('departureCityId', '');
            form.setValue('departureCitySlug', '');
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedDepartureState) {
              form.setValue('departureState', value);
              form.clearErrors('departureState');
              departureOnStateChange(value);

              form.setValue('departureCity', '');
              form.setValue('departureCityId', '');
              form.setValue('departureCitySlug', '');
            }
          }}
        />

        {errors.departureState ? (
          <Typography variant="body1" className="error_msg">
            {errors?.departureState.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Departure City Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>City</InputLabel>
        <CustomAutocomplete
          id="departure-city-list"
          options={departureCityListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select City"
          noOptionsText="No City Found"
          loading={departureCityListRawLoading}
          loadingText="Loading Cities..."
          renderOption={(props, option: TEachLocationCity) => {
            const { key, ...optionProps } = props;
            return (
              <Box component="li" key={key} {...optionProps}>
                <Typography variant="body2">{option?.name || String(option)}</Typography>
              </Box>
            );
          }}
          value={
            departureCityListData?.find((item) => item?.name === selectedDepartureCity) || null
          }
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCity).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCity)._id;
              form.setValue('departureCity', val);
              form.setValue('departureCityId', id);
              form.setValue('departureCitySlug', (value as TEachLocationCity).slug);
            } else {
              form.setValue('departureCity', '');
              form.setValue('departureCityId', '');
              form.setValue('departureCitySlug', '');
            }
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedDepartureCity) {
              form.setValue('departureCity', value);
              form.clearErrors('departureCity');
              departureOnCityChange(value);
            }
          }}
        />

        {errors.departureCity ? (
          <Typography variant="body1" className="error_msg">
            {errors?.departureCity.message}
          </Typography>
        ) : null}
      </Grid>

      {/* ── Arrival Location ───────────────────────────────────────── */}
      <Grid size={{ xs: 12 }}>
        <GroupHeading>Arrival Location</GroupHeading>
      </Grid>

      {/* Arrival Country Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Country*</InputLabel>
        <CustomAutocomplete
          id="arrival-country-list"
          options={arrivalCountryListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select Country"
          noOptionsText="No Country Found"
          loading={arrivalCountryListRawLoading}
          loadingText="Loading Countries..."
          value={
            arrivalCountryListData?.find((item) => item?.name === selectedArrivalCountry) || null
          }
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCountry).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCountry)._id;
              form.setValue('arrivalCountry', val);
              form.setValue('arrivalCountryId', id);
              form.setValue('arrivalCountrySlug', (value as TEachLocationCountry).slug);
            } else {
              form.setValue('arrivalCountry', '');
              form.setValue('arrivalCountryId', '');
              form.setValue('arrivalCountrySlug', '');
            }
            form.setValue('arrivalState', '');
            form.setValue('arrivalStateId', '');
            form.setValue('arrivalStateSlug', '');
            form.setValue('arrivalCity', '');
            form.setValue('arrivalCityId', '');
            form.setValue('arrivalCitySlug', '');
          }}
          renderOption={(props, option: TEachLocationCountry) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          onInputChange={(_, value) => {
            if (value !== selectedArrivalCountry) {
              form.setValue('arrivalCountry', value);
              form.clearErrors('arrivalCountry');
              arrivalOnCountryChange(value);

              form.setValue('arrivalState', '');
              form.setValue('arrivalStateId', '');
              form.setValue('arrivalStateSlug', '');
              form.setValue('arrivalCity', '');
              form.setValue('arrivalCityId', '');
              form.setValue('arrivalCitySlug', '');
            }
          }}
        />

        {errors.arrivalCountry ? (
          <Typography variant="body1" className="error_msg">
            {errors?.arrivalCountry.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Arrival State Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>State</InputLabel>
        <CustomAutocomplete
          id="arrival-state-list"
          options={arrivalStatesListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select State"
          noOptionsText="No State Found"
          loading={arrivalStateListRawLoading}
          loadingText="Loading States..."
          renderOption={(props, option: TEachLocationState) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          value={arrivalStatesListData?.find((item) => item?.name === selectedArrivalState) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationState).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationState)._id;
              form.setValue('arrivalState', val);
              form.setValue('arrivalStateId', id);
              form.setValue('arrivalStateSlug', (value as TEachLocationState).slug);
            } else {
              form.setValue('arrivalState', '');
              form.setValue('arrivalStateId', '');
              form.setValue('arrivalStateSlug', '');
            }
            form.setValue('arrivalCity', '');
            form.setValue('arrivalCityId', '');
            form.setValue('arrivalCitySlug', '');
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedArrivalState) {
              form.setValue('arrivalState', value);
              form.clearErrors('arrivalState');
              arrivalOnStateChange(value);

              form.setValue('arrivalCity', '');
              form.setValue('arrivalCityId', '');
              form.setValue('arrivalCitySlug', '');
            }
          }}
        />

        {errors.arrivalState ? (
          <Typography variant="body1" className="error_msg">
            {errors?.arrivalState.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Arrival City Selection */}
      <Grid size={{ xs: 12, md: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>City</InputLabel>
        <CustomAutocomplete
          id="arrival-city-list"
          options={arrivalCityListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select City"
          noOptionsText="No City Found"
          loading={arrivalCityListRawLoading}
          loadingText="Loading Cities..."
          renderOption={(props, option: TEachLocationCity) => {
            const { key, ...optionProps } = props;
            return (
              <Box component="li" key={key} {...optionProps}>
                <Typography variant="body2">{option?.name || String(option)}</Typography>
              </Box>
            );
          }}
          value={arrivalCityListData?.find((item) => item?.name === selectedArrivalCity) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCity).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCity)._id;
              form.setValue('arrivalCity', val);
              form.setValue('arrivalCityId', id);
              form.setValue('arrivalCitySlug', (value as TEachLocationCity).slug);
            } else {
              form.setValue('arrivalCity', '');
              form.setValue('arrivalCityId', '');
              form.setValue('arrivalCitySlug', '');
            }
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedArrivalCity) {
              form.setValue('arrivalCity', value);
              form.clearErrors('arrivalCity');
              arrivalOnCityChange(value);
            }
          }}
        />

        {errors.arrivalCity ? (
          <Typography variant="body1" className="error_msg">
            {errors?.arrivalCity.message}
          </Typography>
        ) : null}
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
        <InputLabel sx={{ color: '#FFFFFF' }}>Thumbnail Alt Tag*</InputLabel>
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
        <InputLabel sx={{ color: '#FFFFFF' }}>Hero Alt Tag*</InputLabel>
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

      {/* Description */}
      {/* <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Description*</InputLabel>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <CKEditorRichText
              placeholder="Write your route description here..."
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
      </Grid> */}

      {/* Redirect URL */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Redirect URL</InputLabel>
        <Controller
          control={form.control}
          name="redirectUrl"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Redirect URL"
              placeholder="e.g. https://example.com/new-location"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.redirectUrl}
              helperText={errors?.redirectUrl?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Primary Meta Tags</GroupHeading>
      </Grid>

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

      <Grid size={{ xs: 12 }}>
        <GroupHeading>URL Management</GroupHeading>
      </Grid>

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

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Social Sharing (Open Graph)</GroupHeading>
      </Grid>

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

      <Grid size={{ xs: 12 }}>
        <GroupHeading>Structured Data</GroupHeading>
      </Grid>

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

      {/* Show Last Updated Date Checkbox */}
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
                  sx={{
                    color: '#FFFFFF',
                    '&.Mui-checked': {
                      color: '#FFFFFF',
                    },
                  }}
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
          disabled={routeSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.route.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={routeSaveLoading}
          loading={routeSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default RouteAddForm;
