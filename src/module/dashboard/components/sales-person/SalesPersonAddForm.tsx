'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  salesPersonAddSchema,
  TSalesPersonAddSchemaType,
} from '../../validation/sales-person/index.zod';

import { mediaUrl } from '@/api/endpoints';
import { useSalesPersonCreate } from '@/api/hooks/sales-person/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { handlePhoneNumberKeys } from '@/lib/functions/validation';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import InputMailIcon from '@/ui/Icons/InputMailIcon';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const SalesPersonAddForm = () => {
  const router = useRouter();

  const form = useForm<TSalesPersonAddSchemaType>({
    resolver: zodResolver(salesPersonAddSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      imageFile: '',
    },
  });

  const errors = form.formState.errors;
  const [uploadedImages, setUploadedImages] = useState<File | string | null>(null);

  const { mutateAsync: salesPersonSave, isPending: salesPersonSaveLoading } = useSalesPersonCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.salesPerson.list);
    },
    errorCallback: () => {},
  });

  console.info('errors', { errors });

  const onSubmit = (data: TSalesPersonAddSchemaType) => {
    // console.log(data, '@TEST');
    const formData = new FormData();
    formData.append('fullName', data?.fullName);
    formData.append('email', data?.email);
    formData.append('phone', data?.phone);

    if (typeof data?.imageFile !== 'string') {
      formData.append('profileImage', data?.imageFile);
    }
    salesPersonSave(formData);
  };

  return (
    <Grid container rowSpacing={3}>
      {/* Name */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Full Name*</InputLabel>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Name"
              placeholder="Enter full name"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.fullName}
              helperText={errors?.fullName?.message}
            />
          )}
        />
      </Grid>

      {/* Email */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Email*</InputLabel>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Name"
              placeholder="Enter email"
              startAdornment={<InputMailIcon />}
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Phone*</InputLabel>
        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              placeholder="Enter your phone"
              value={value}
              onChange={onChange}
              error={!!form.formState.errors?.phone}
              helperText={form.formState.errors?.phone?.message}
              slotProps={{
                htmlInput: {
                  onKeyDown: handlePhoneNumberKeys,
                },
              }}
            />
          )}
        />
      </Grid>
      {/* Upload Images */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel sx={{ color: '#FFFFFF' }}>Profile Image*</InputLabel>
          <Box className="allImgUploadWrap">
            {uploadedImages === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
                  // console.log(value, '@TEST');

                  if (value) {
                    setUploadedImages(() => value);

                    form.setValue('imageFile', value as File);
                    form.clearErrors('imageFile');
                  }
                }}
                errorValueGetter={(errorMessage) => {
                  form.setError('imageFile', { message: errorMessage });
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
                  typeof uploadedImages === 'string'
                    ? mediaUrl(uploadedImages)
                    : URL?.createObjectURL(uploadedImages)
                }
                isPreviewOnly={false}
                onDeleteHandler={(shouldDelete) => {
                  if (shouldDelete) {
                    setUploadedImages(() => null);
                    form.setValue('imageFile', undefined as unknown as File);
                  }
                }}
              />
            )}
          </Box>

          {form.formState.errors?.imageFile ? (
            <Typography variant="body1" className="error_msg">
              {form.formState.errors?.imageFile?.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={salesPersonSaveLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.salesPerson.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={salesPersonSaveLoading}
          loading={salesPersonSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default SalesPersonAddForm;
