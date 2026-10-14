'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormHelperText, Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { removeDialCode } from 'react-international-phone';

import { profileDetailsSchema, TProfileDetailsSchemaType } from '../validation/profileDetails.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useAuthAdminProfileDetails,
  useAuthAdminProfileUpdate,
} from '@/api/hooks/auth/admin/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import PhoneNumberComp from '@/ui/CommonInput/PhoneNumberComp';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import InputMailIcon from '@/ui/Icons/InputMailIcon';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

const ProfileDetailsForm = () => {
  const router = useRouter();

  const [uploadedImages, setUploadedImages] = useState<File | string | null>(null);

  const { data: adminProfileDetails, isLoading: adminProfileDetailsLoading } =
    useAuthAdminProfileDetails();

  const { mutateAsync: adminProfileUpdate, isPending: adminProfileUpdateLoading } =
    useAuthAdminProfileUpdate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  const form = useForm<TProfileDetailsSchemaType>({
    resolver: zodResolver(profileDetailsSchema()),
  });

  const onSubmit = (data: TProfileDetailsSchemaType) => {
    const formData = new FormData();
    formData.append('firstName', data?.firstName);
    formData.append('lastName', data?.lastName);
    formData.append('phone', data?.phone);
    formData.append('countryCode', data?.countryCode);
    formData.append('email', data?.email);

    if (typeof data?.imageFile !== 'string') {
      formData.append('profileImage', data?.imageFile);
    }

    adminProfileUpdate(formData);
  };

  useEffect(() => {
    form.reset({
      firstName: adminProfileDetails?.firstName ?? '',
      lastName: adminProfileDetails?.lastName ?? '',
      email: adminProfileDetails?.email ?? '',
      phone: adminProfileDetails?.phone ?? '',
      countryCode: adminProfileDetails?.countryCode ?? '',
      ...(adminProfileDetails?.profileImage
        ? {
          imageFile: adminProfileDetails?.profileImage ?? '',
        }
        : {}),
    });

    setUploadedImages(() => adminProfileDetails?.profileImage ?? '');
    return () => {};
  }, [
    form,
    form.reset,
    adminProfileDetails?.firstName,
    adminProfileDetails?.lastName,
    adminProfileDetails?.email,
    adminProfileDetails?.phone,
    adminProfileDetails?.countryCode,
    adminProfileDetails?.profileImage,
  ]);

  if (adminProfileDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <CommonCardBox
      sx={{
        backgroundColor: '#6b0f1aeb',
      }}
    >
      <Box className="mainContainer">
        <Box className="grid-wrap">
          <Grid container rowSpacing={3} sx={{ marginBottom: '10px' }}>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Email (Can't Edit)</InputLabel>
              <InputFieldCommon
                placeholder="Enter your email"
                startAdornment={<InputMailIcon />}
                value={adminProfileDetails?.email ?? '-'}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>First Name*</InputLabel>
              <Controller
                control={form.control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your first name"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.firstName}
                    helperText={form.formState.errors?.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Last Name*</InputLabel>
              <Controller
                control={form.control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your last name"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.lastName}
                    helperText={form.formState.errors?.lastName?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <PhoneNumberComp
                key={adminProfileDetails?.phone || 'empty'}
                // labelName='Phone number*'
                placeholder="Enter your phone number"
                defaultPhoneNumber={
                  adminProfileDetails?.phone && adminProfileDetails?.countryCode
                    ? `${adminProfileDetails.countryCode.startsWith('+') ? adminProfileDetails.countryCode : `+${adminProfileDetails.countryCode}`}${adminProfileDetails.phone}`
                    : ''
                }
                disableFormatting={false}
                phoneNumberValueGetter={(countryCode, inputValue, value) => {
                  // console.log(countryCode, inputValue, value, "@TEST");

                  const x = removeDialCode({
                    phone: value,
                    dialCode: countryCode,
                  }).replace(/^\+/, '');

                  // console.log(
                  //   x?.length,
                  //   x,
                  //   inputValue,
                  //   value,
                  //   "@TEST1111111111111111"
                  // );

                  if (x?.length > 5) {
                    form.setValue('phone', value);
                    form.setValue('phone', x);
                    form.setValue('countryCode', countryCode);
                    form.clearErrors(['phone', 'countryCode']);
                  } else {
                    form.setValue('phone', x);
                    form.setValue('phone', '');
                    form.setValue('countryCode', '');
                  }
                }}
              />
              {form.formState.errors.phone && (
                <FormHelperText error>{form.formState.errors.phone?.message}</FormHelperText>
              )}
            </Grid>

            {/* <Grid size={{ xs: 12 }}>
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
                    onKeyDown={handlePhoneNumberKeys}
                  />
                )}
              />
            </Grid> */}

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
          </Grid>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            loading={adminProfileUpdateLoading}
            disabled={adminProfileUpdateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Submit
          </CustomButtonPrimary>
        </Box>
      </Box>
    </CommonCardBox>
  );
};

export default ProfileDetailsForm;
