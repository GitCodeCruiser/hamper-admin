'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Checkbox, FormControlLabel, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { airportEditSchema, TAirportEditSchemaType } from '../../validation/airport/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import { useAirportGet, useAirportUpdate } from '@/api/hooks/airport/hooks';
import { useAirportTypeListing } from '@/api/hooks/airport-type/hooks';
import { useLocationHierarchy } from '@/api/hooks/location/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import {
  DEFAULT_BANNERS,
  DEFAULT_OG_IMAGES,
  DEFAULT_THUMBNAILS,
  IMAGE_ASPECT_RATIO_DEFINE,
} from '@/constant';
import { handleAmountKeys } from '@/lib/functions/validation';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { PAGE_ROUTE } from '@/routes/index.route';
import {
  TEachLocationCity,
  TEachLocationCountry,
  TEachLocationState,
} from '@/types/apps/location/index.type';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
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

type TAirportEditFormProps = {
  slug: TSeoStaticSlug;
  airportId: string;
};

// ─── Component ──────────────────────────────────────────────────────────────
const AirportEditForm = ({ slug, airportId }: TAirportEditFormProps) => {
  const router = useRouter();
  const theme = useTheme();

  const [bannerImage, setBannerImage] = useState<File | string | null>(null);
  const [thumbnailImage, setThumbnailImage] = useState<File | string | null>(null);
  const [seoOgImage, setSeoOgImage] = useState<File | string | null>(null);

  const [bannerImageSize, setBannerImageSize] = useState<number | null>(null);
  const [thumbnailImageSize, setThumbnailImageSize] = useState<number | null>(null);
  const [openGraphImageSize, setOpenGraphImageSize] = useState<number | null>(null);

  const form = useForm<TAirportEditSchemaType>({
    resolver: zodResolver(airportEditSchema()),
    defaultValues: {
      title: '',
      description: '',
      country: '',
      countryId: '',
      countrySlug: '',
      state: '',
      stateId: '',
      stateSlug: '',
      city: '',
      cityId: '',
      citySlug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalTag: '',
      openGraphTitle: '',
      openGraphDescription: '',
      structuredData: '',
      latitude: '',
      longitude: '',
      bannerImageTag: '',
      thumbnailImageTag: '',
      redirectUrl: '',
      metaRobotsIndex: 'noindex' as const,
      metaRobotsFollow: 'nofollow' as const,
      isShowUpdatedAt: false,
    },
  });

  const errors = form.formState.errors;

  const { selectedCountry, selectedState, selectedCity } = {
    selectedCountry: form.watch('country'),
    selectedState: form.watch('state'),
    selectedCity: form.watch('city'),
  };

  const { mutateAsync: airportUpdate, isPending: airportUpdateLoading } = useAirportUpdate({
    optionalCallback: () => {
      // router.replace(PAGE_ROUTE.dashboard.airport.list);
    },
    errorCallback: () => {},
  });

  const { data: airportDetails, isLoading: airportDetailLoading } = useAirportGet({
    id: airportId,
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

  const onSubmit = (data: TAirportEditSchemaType) => {
    // console.log(data, '@TEST');

    const formData = new FormData();
    formData.append('id', airportId);
    formData.append('title', data?.title);
    // formData.append('description', data?.description);
    formData.append('country', data?.country);
    formData.append('state', data?.state ?? '');
    formData.append('city', data?.city ?? '');
    formData.append('countryId', data?.countryId ?? '');
    if (data?.stateId) {
      formData.append('stateId', data?.stateId);
    }
    if (data?.cityId) {
      formData.append('cityId', data?.cityId);
    }
    if (data?.countrySlug) {
      formData.append('countrySlug', data?.countrySlug);
    }
    if (data?.stateSlug) {
      formData.append('stateSlug', data?.stateSlug);
    }
    if (data?.citySlug) {
      formData.append('citySlug', data?.citySlug);
    }
    formData.append('slug', data?.slug);
    formData.append('bannerImage', data?.bannerImage);
    formData.append('thumbnailImage', data?.thumbnailImage);
    formData.append('bannerImageTag', data?.bannerImageTag ?? '');
    formData.append('thumbnailImageTag', data?.thumbnailImageTag ?? '');

    formData.append('ratio', data?.ratio);
    formData.append('airportTypeId', data?.airportTypeId);
    formData.append('iata', data?.iataCode);
    formData.append('icao', data?.icaoCode);
    formData.append('elevation', `${data?.elevation}`);
    formData.append('latitude', data?.latitude);
    formData.append('longitude', data?.longitude);

    //
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

    airportUpdate(formData);
  };

  // -------------------------------------------------------------------------->
  const {
    countryListRaw,
    countryListRawLoading,
    stateListRaw,
    stateListRawLoading,
    cityListRaw,
    cityListRawLoading,
    onCountryChange,
    onStateChange,
    onCityChange,
  } = useLocationHierarchy({
    countrySearch: selectedCountry,
    stateSearch: selectedState,
    citySearch: selectedCity,
  });
  const { data: airportTypeListRawData, isLoading: airportTypeListRawDataLoading } =
    useAirportTypeListing();
  // -------------------------------------------------------------------------->

  const { countryListData, statesListData, cityListData } = useMemo(() => {
    const countryListData = countryListRaw || [];
    const statesListData = stateListRaw || [];
    const cityListData = cityListRaw || [];
    return { countryListData, statesListData, cityListData };
  }, [countryListRaw, stateListRaw, cityListRaw]);

  const { airportTypeList } = useMemo(() => {
    const airportTypeList = airportTypeListRawData ?? [];

    return {
      airportTypeList,
    };
  }, [airportTypeListRawData]);

  useEffect(() => {
    if (airportDetails) {
      form.reset({
        title: airportDetails?.title ?? '',
        // description: airportDetails?.description ?? '',
        country:
          typeof airportDetails?.country === 'object'
            ? airportDetails?.country?.name
            : (airportDetails?.country ?? ''),
        countryId: airportDetails?.countryId ?? airportDetails?.country?._id ?? '',
        countrySlug: airportDetails?.countrySlug ?? airportDetails?.country?.slug ?? '',
        state:
          typeof airportDetails?.state === 'object'
            ? airportDetails?.state?.name
            : (airportDetails?.state ?? ''),
        stateId: airportDetails?.stateId ?? airportDetails?.state?._id ?? '',
        stateSlug: airportDetails?.stateSlug ?? airportDetails?.state?.slug ?? '',
        city:
          typeof airportDetails?.city === 'object'
            ? airportDetails?.city?.name
            : (airportDetails?.city ?? ''),
        cityId: airportDetails?.cityId ?? airportDetails?.city?._id ?? '',
        citySlug: airportDetails?.citySlug ?? airportDetails?.city?.slug ?? '',
        slug: airportDetails?.slug ?? '',
        ratio: airportDetails?.ratio ?? '',
        metaTitle: airportDetails?.metaTitle ?? '',
        metaDescription: airportDetails?.metaDescription ?? '',
        metaKeywords: airportDetails?.metaKeywords ?? '',
        canonicalTag: airportDetails?.canonicalTag ?? '',
        openGraphTitle: airportDetails?.openGraphTitle ?? '',
        openGraphDescription: airportDetails?.openGraphDescription ?? '',
        structuredData: airportDetails?.structuredData ?? '',
        bannerImageTag: airportDetails?.bannerImageTag ?? '',
        thumbnailImageTag: airportDetails?.thumbnailImageTag ?? '',
        redirectUrl: airportDetails?.redirectUrl ?? '',
        metaRobotsIndex: (airportDetails?.metaRobotsIndex ?? 'noindex') as 'noindex' | 'index',
        metaRobotsFollow: (airportDetails?.metaRobotsFollow ?? 'nofollow') as 'nofollow' | 'follow',
        isShowUpdatedAt: airportDetails?.isShowUpdatedAt ?? false,
        airportTypeId: airportDetails?.airportTypeId ?? '',
        icaoCode: airportDetails?.icao ?? '',
        iataCode: airportDetails?.iata ?? '',
        elevation: airportDetails?.elevation ?? 0,
        latitude: airportDetails?.latitude ?? '',
        longitude: airportDetails?.longitude ?? '',

        ...(airportDetails?.openGraphImage && airportDetails?.openGraphImage?.length > 0
          ? { openGraphImage: airportDetails?.openGraphImage ?? '' }
          : {}),
        ...(airportDetails?.bannerImage && airportDetails?.bannerImage?.length > 0
          ? { bannerImage: airportDetails?.bannerImage ?? '' }
          : {}),
        ...(airportDetails?.thumbnailImage && airportDetails?.thumbnailImage?.length > 0
          ? { thumbnailImage: airportDetails?.thumbnailImage ?? '' }
          : {}),
      });
    }

    setBannerImage(() =>
      airportDetails?.bannerImage && airportDetails?.bannerImage?.length > 0
        ? airportDetails?.bannerImage
        : null,
    );
    setThumbnailImage(() =>
      airportDetails?.thumbnailImage && airportDetails?.thumbnailImage?.length > 0
        ? airportDetails?.thumbnailImage
        : null,
    );
    setSeoOgImage(() =>
      airportDetails?.openGraphImage && airportDetails?.openGraphImage?.length > 0
        ? airportDetails?.openGraphImage
        : null,
    );
    setBannerImageSize(airportDetails?.bannerImageSize ?? null);
    setThumbnailImageSize(airportDetails?.thumbnailImageSize ?? null);
    setOpenGraphImageSize(() =>
      airportDetails?.openGraphImageSize ? Number(airportDetails.openGraphImageSize) : null,
    );

    return () => {};
  }, [
    form.reset,
    airportDetails?._id,
    airportDetails?.title,
    airportDetails?.slug,
    airportDetails?.country,
    airportDetails?.countryId,
    airportDetails?.countrySlug,
    airportDetails?.state,
    airportDetails?.stateId,
    airportDetails?.stateSlug,
    airportDetails?.city,
    airportDetails?.cityId,
    airportDetails?.citySlug,
    airportDetails?.ratio,
    // airportDetails?.description,
    airportDetails?.metaTitle,
    airportDetails?.metaDescription,
    airportDetails?.metaKeywords,
    airportDetails?.canonicalTag,
    airportDetails?.openGraphTitle,
    airportDetails?.openGraphDescription,
    airportDetails?.structuredData,
    airportDetails?.bannerImageTag,
    airportDetails?.thumbnailImageTag,
    airportDetails?.openGraphImage,
    airportDetails?.bannerImage,
    airportDetails?.thumbnailImage,
    airportDetails?.openGraphImage,
    airportDetails?.openGraphImageSize,
    airportDetails?.airportTypeId,
    airportDetails?.icao,
    airportDetails?.iata,
    airportDetails?.elevation,
    airportDetails?.latitude,
    airportDetails?.longitude,
    airportDetails?.redirectUrl,
    airportDetails?.metaRobotsIndex,
    airportDetails?.metaRobotsFollow,
    airportDetails?.isShowUpdatedAt,
    setBannerImage,
    setThumbnailImage,
    setSeoOgImage,
    setBannerImageSize,
    setThumbnailImageSize,
    setOpenGraphImageSize,
  ]);

  if (airportDetailLoading) {
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
              labelName="Airport title"
              placeholder="Enter airport title"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
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

      <Grid size={{ xs: 12 }} sx={{ marginTop: 5 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Airport Type*</InputLabel>
        <Controller
          control={form.control}
          name="airportTypeId"
          render={({ field: { onChange, value } }) => (
            <CustomSelect
              initialValue="Select Airport Type"
              value={value ?? ''}
              textColor="#FFFFFF"
              onChange={(e) => onChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="" disabled>
                Select Airport Type
              </MenuItem>
              {airportTypeList?.map((eachAirportType) => (
                <MenuItem value={eachAirportType?._id} key={eachAirportType?._id}>
                  {eachAirportType?.airportType}
                </MenuItem>
              ))}
            </CustomSelect>
          )}
        />

        {errors.airportTypeId ? (
          <Typography variant="body1" className="error_msg">
            {errors?.airportTypeId.message}
          </Typography>
        ) : null}
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>ICAO Code*</InputLabel>
        <Controller
          control={form.control}
          name="icaoCode"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="ICAO Code"
              placeholder="ICAO Code"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.icaoCode}
              helperText={errors?.icaoCode?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>IATA Code*</InputLabel>
        <Controller
          control={form.control}
          name="iataCode"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="IATA Code"
              placeholder="IATA Code"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.iataCode}
              helperText={errors?.iataCode?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Ratio*</InputLabel>
        <Controller
          control={form.control}
          name="ratio"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Ratio"
              placeholder="Ratio"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.ratio}
              helperText={errors?.ratio?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Elevation (ft)*</InputLabel>
        <Controller
          control={form.control}
          name="elevation"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Elevation"
              placeholder="Elevation"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.elevation}
              helperText={errors?.elevation?.message}
              onKeyDown={handleAmountKeys}
            />
          )}
        />
      </Grid>

      {/* Country Selection */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Country*</InputLabel>
        <CustomAutocomplete
          id="city-country-list"
          options={countryListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select Country"
          noOptionsText="No Country Found"
          loading={countryListRawLoading}
          loadingText="Loading Countries..."
          value={countryListData?.find((item) => item?.name === selectedCountry) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCountry).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCountry)._id;
              form.setValue('country', val);
              form.setValue('countryId', id);
              form.setValue('countrySlug', (value as TEachLocationCountry).slug);
            } else {
              form.setValue('country', '');
              form.setValue('countryId', '');
              form.setValue('countrySlug', '');
            }
            form.setValue('state', '');
            form.setValue('stateId', '');
            form.setValue('stateSlug', '');
            form.setValue('city', '');
            form.setValue('cityId', '');
            form.setValue('citySlug', '');
          }}
          renderOption={(props, option: TEachLocationCountry) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          onInputChange={(_, value) => {
            if (value !== selectedCountry) {
              form.setValue('country', value);
              form.clearErrors('country');
              onCountryChange(value);

              form.setValue('state', '');
              form.setValue('stateId', '');
              form.setValue('stateSlug', '');
              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
        />

        {errors.country ? (
          <Typography variant="body1" className="error_msg">
            {errors?.country.message}
          </Typography>
        ) : null}
      </Grid>

      {/* State Selection */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>State</InputLabel>
        <CustomAutocomplete
          id="city-state-list"
          options={statesListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select State"
          noOptionsText="No State Found"
          loading={stateListRawLoading}
          loadingText="Loading States..."
          renderOption={(props, option: TEachLocationState) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          value={statesListData?.find((item) => item?.name === selectedState) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationState).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationState)._id;
              form.setValue('state', val);
              form.setValue('stateId', id);
              form.setValue('stateSlug', (value as TEachLocationState).slug);
            } else {
              form.setValue('state', '');
              form.setValue('stateId', '');
              form.setValue('stateSlug', '');
            }
            form.setValue('city', '');
            form.setValue('cityId', '');
            form.setValue('citySlug', '');
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedState) {
              form.setValue('state', value);
              form.clearErrors('state');
              onStateChange(value);

              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
        />

        {errors.state ? (
          <Typography variant="body1" className="error_msg">
            {errors?.state.message}
          </Typography>
        ) : null}
      </Grid>

      {/* City Selection */}
      <Grid size={{ xs: 4 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>City</InputLabel>
        <CustomAutocomplete
          id="city-city-list"
          options={cityListData || []}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select City"
          noOptionsText="No City Found"
          loading={cityListRawLoading}
          loadingText="Loading Cities..."
          renderOption={(props, option: TEachLocationCity) => {
            const { key, ...optionProps } = props;
            return (
              <Box component="li" key={key} {...optionProps}>
                <Typography variant="body2">{option?.name || String(option)}</Typography>
              </Box>
            );
          }}
          value={cityListData?.find((item) => item?.name === selectedCity) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCity).name;
              const id = typeof value === 'string' ? '' : (value as TEachLocationCity)._id;
              form.setValue('city', val);
              form.setValue('cityId', id);
              form.setValue('citySlug', (value as TEachLocationCity).slug);
            } else {
              form.setValue('city', '');
              form.setValue('cityId', '');
              form.setValue('citySlug', '');
            }
          }}
          onInputChange={(_e, value) => {
            if (value !== selectedCity) {
              form.setValue('city', value);
              form.clearErrors('city');
              onCityChange(value);
            }
          }}
        />

        {errors.city ? (
          <Typography variant="body1" className="error_msg">
            {errors?.city.message}
          </Typography>
        ) : null}
      </Grid>

      {/* Latitude */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Latitude*</InputLabel>
        <Controller
          control={form.control}
          name="latitude"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Latitude"
              placeholder="Enter latitude"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.latitude}
              helperText={errors?.latitude?.message}
            />
          )}
        />
      </Grid>

      {/* Longitude */}
      <Grid size={{ xs: 6 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Longitude*</InputLabel>
        <Controller
          control={form.control}
          name="longitude"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Longitude"
              placeholder="Enter longitude"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.longitude}
              helperText={errors?.longitude?.message}
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
                        width: '80px',
                        height: '80px',
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
              placeholder="Write your airport content here..."
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
                  // console.log(value, '@TEST');

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
          disabled={airportUpdateLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.airport.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={airportUpdateLoading}
          loading={airportUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default AirportEditForm;
