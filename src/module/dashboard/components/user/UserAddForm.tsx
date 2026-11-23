'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  userAddSchema,
  TUserAddSchemaType,
} from '../../validation/user/index.zod';

import { mediaUrl } from '@/api/endpoints';
import { useUsersCreate } from '@/api/hooks/user/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { handlePhoneNumberKeys } from '@/lib/functions/validation';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import InputMailIcon from '@/ui/Icons/InputMailIcon';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const UserAddForm = () => {
  const router = useRouter();

  const form = useForm<TUserAddSchemaType>({
    resolver: zodResolver(userAddSchema()),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      imageFile: null,
    },
  });

  const errors = form.formState.errors;
  const [uploadedImages, setUploadedImages] = useState<File | string | null>(null);

  const { mutateAsync: userSave, isPending: userSaveLoading } = useUsersCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.users.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TUserAddSchemaType) => {
    const formData = new FormData();
    formData.append('fullName', data?.fullName);
    formData.append('email', data?.email);
    if (data?.phone) {
      formData.append('phone', data.phone);
    }
    if (data?.password) {
      formData.append('password', data.password);
    }

    if (data?.imageFile && typeof data?.imageFile !== 'string') {
      formData.append('profileImage', data.imageFile);
    }
    userSave(formData);
  };

  return (
    <Grid container rowSpacing={3}>
      {/* Full Name */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Full Name*</InputLabel>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Full Name"
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
              labelName="Email"
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

      {/* Phone */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Phone Number (Optional)</InputLabel>
        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Phone"
              placeholder="Enter phone number"
              value={value ?? ''}
              onChange={onChange}
              onKeyDown={handlePhoneNumberKeys}
              error={!!errors?.phone}
              helperText={errors?.phone?.message}
            />
          )}
        />
      </Grid>

      {/* Password */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Password (Optional)</InputLabel>
        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Password"
              type="password"
              placeholder="Leave blank to auto-generate & email credentials"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
          )}
        />
      </Grid>

      {/* Profile Image */}
      <Grid size={{ xs: 12 }}>
        <Box className="uploadImgWrapper">
          <InputLabel sx={{ color: '#FFFFFF' }}>Profile Image (Optional)</InputLabel>
          <Box className="allImgUploadWrap">
            {uploadedImages === null ? (
              <SingleImgMainComp
                dataValueGetter={(value) => {
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
          {errors?.imageFile ? (
            <Typography variant="body1" className="error_msg">
              {errors?.imageFile?.message}
            </Typography>
          ) : null}
        </Box>
      </Grid>

      {/* Action Buttons */}
      <Grid size={{ xs: 12 }}>
        <Box display="flex" gap={2} mt={2}>
          <CustomButtonPrimary
            variant="contained"
            color="secondary"
            loading={userSaveLoading}
            disabled={userSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save User
          </CustomButtonPrimary>
          <CustomButtonPrimary
            variant="outlined"
            color="primary"
            startIcon={<WestIcon />}
            onClick={() => router.push(PAGE_ROUTE.dashboard.users.list)}
          >
            Back
          </CustomButtonPrimary>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserAddForm;
