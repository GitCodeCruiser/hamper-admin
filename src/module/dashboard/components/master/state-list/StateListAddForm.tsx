'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { mediaUrl } from '@/api/endpoints';
import { useLocationHierarchy } from '@/api/hooks/location/hooks';
import { useStateListCreate } from '@/api/hooks/master/state-list/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { DEFAULT_THUMBNAILS, IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  stateListAddSchema,
  TStateListAddSchemaType,
} from '@/module/dashboard/validation/master/state-list/index.zod';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TEachLocationCountry } from '@/types/apps/location/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const StateListAddForm = () => {
  const router = useRouter();
  const theme = useTheme();

  const [thumbnailImage, setThumbnailImage] = useState<File | string | null>(null);
  const [thumbnailImageSize, setThumbnailImageSize] = useState<number | null>(null);

  const handleSelectDefaultThumbnail = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.split('/').pop() || 'thumbnail.png';
      const file = new File([blob], filename, { type: blob.type });

      setThumbnailImage(() => file);
      setThumbnailImageSize(() => file.size);
      form.setValue('image', file);
      form.clearErrors('image');
    } catch (error) {
      console.error('Error setting default thumbnail image:', error);
    }
  };

  const form = useForm<TStateListAddSchemaType>({
    resolver: zodResolver(stateListAddSchema()),
    defaultValues: {
      name: '',
      countryId: '',
      country: '',
    },
  });

  const errors = form.formState.errors;
  const selectedCountry = form.watch('country');

  const { countryListRaw, onCountryChange } = useLocationHierarchy({
    countrySearch: selectedCountry,
    stateSearch: '',
    citySearch: '',
  });

  const countryListData = useMemo(() => countryListRaw || [], [countryListRaw]);

  const { mutateAsync: stateSave, isPending: stateSaveLoading } = useStateListCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.master.stateList.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TStateListAddSchemaType) => {
    // console.log(data, '@TESt');
    const formData = new FormData();
    formData.append('name', data?.name ?? '');
    formData.append('countryId', data?.countryId ?? '');
    // formData.append('country', data?.country ?? '');
    if (data?.image) {
      formData.append('image', data?.image);
    }
    stateSave(formData);
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={2}>
      {/* State Name */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>State Name*</InputLabel>
        <Controller
          control={form.control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="State Name"
              placeholder="Enter state name"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          )}
        />
      </Grid>

      {/* Country Selection */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Country*</InputLabel>
        <CustomAutocomplete
          id="state-country-list"
          options={countryListData}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option?.name)}
          autoComplete
          labelName="Select Country"
          noOptionsText="No Country Found"
          value={countryListData?.find((item) => item?.name === selectedCountry) || null}
          onChange={(e, value) => {
            if (value !== null) {
              const val = typeof value === 'string' ? value : (value as TEachLocationCountry).name;
              form.setValue('country', val);
              form.setValue('countryId', (value as TEachLocationCountry)._id);
            } else {
              form.setValue('country', '');
              form.setValue('countryId', '');
            }
          }}
          renderOption={(props, option: TEachLocationCountry) => (
            <Box component="li" {...props} key={option?.name}>
              <Typography variant="body2">{option?.name || String(option)}</Typography>
            </Box>
          )}
          onInputChange={(_, value) => {
            if (value !== selectedCountry) {
              form.setValue('country', value);
              // form.setValue('countryId', value);
              form.clearErrors('country');
              onCountryChange(value);
            }
          }}
        />

        {errors.country ? (
          <Typography variant="body1" className="error_msg">
            {errors?.country?.message}
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

                    form.setValue('image', value as File);
                    form.clearErrors('image');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  setThumbnailImageSize(() => null);
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
                  typeof thumbnailImage === 'string'
                    ? mediaUrl(thumbnailImage)
                    : URL?.createObjectURL(thumbnailImage)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setThumbnailImage(() => null);
                    setThumbnailImageSize(() => null);
                    form.setValue('image', undefined as unknown as File);
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

          {errors.image ? (
            <Typography variant="body1" className="error_msg">
              {errors?.image.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Action Buttons */}
      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={stateSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.master.stateList.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={stateSaveLoading}
          loading={stateSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default StateListAddForm;
