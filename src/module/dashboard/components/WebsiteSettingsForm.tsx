'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormHelperText, Grid, InputLabel, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { removeDialCode } from 'react-international-phone';

import { settingsSchema, TSettingsSchemaType } from '../validation/settings.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useAuthAdminSettingsDetails,
  useAuthAdminSettingsUpdate,
} from '@/api/hooks/auth/admin/hooks';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import PhoneNumberComp from '@/ui/CommonInput/PhoneNumberComp';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

export const WebsiteSettingsFormHeading = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        color: theme.palette.common.white,
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
        mb: 0.5,
        mt: 4,
        pb: 1,
        borderBottom: `1px dashed ${theme.palette.customColors?.colorB2535F ?? '#ffffff1f'}`,
      }}
    >
      {children}
    </Typography>
  );
};

const WebsiteSettingsForm = () => {
  const router = useRouter();

  const { data: adminSettingsDetails, isLoading: adminSettingsDetailsLoading } =
    useAuthAdminSettingsDetails();

  const { mutateAsync: adminSettingsUpdate, isPending: adminSettingsUpdateLoading } =
    useAuthAdminSettingsUpdate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  const form = useForm<TSettingsSchemaType>({
    resolver: zodResolver(settingsSchema()),
  });

  const onSubmit = (data: TSettingsSchemaType) => {
    adminSettingsUpdate({
      email: data.email,
      phone: data.phone,
      countryCode: data.countryCode,
      brokerDisclaimer: data.brokerDisclaimer,
      socialLinks: {
        youtube: data.youtube ?? '',
        facebook: data.facebook ?? '',
        instagram: data.instagram ?? '',
        linkedin: data.linkedin ?? '',
        twitter: data.twitter ?? '',
        tiktok: data.tiktok ?? '',
        airCharterAssociation: data.airCharterAssociation ?? '',
        betterBusinessBureau: data.betterBusinessBureau ?? '',
        nbaa: data.nbaa ?? '',
        argus: data.argus ?? '',
        wyvern: data.wyvern ?? '',
      },
      address: data.address,
      contactUs: {
        email: data.contactUsEmail,
        phone: data.contactUsPhone,
        countryCode: data.contactUsCountryCode,
      },
      aboutUs: {
        title: data.aboutUsTitle,
        description: data.aboutUsDescription,
        url: data.aboutUsUrl,
      },
      compareAircraft: {
        title: data.compareAircraftTitle,
        description: data.compareAircraftDescription,
        url: data.compareAircraftUrl,
      },
    });
  };

  useEffect(() => {
    form.reset({
      email: adminSettingsDetails?.email ?? '',
      phone: adminSettingsDetails?.phone ?? '',
      countryCode: adminSettingsDetails?.countryCode ?? '',
      address: adminSettingsDetails?.address ?? '',
      brokerDisclaimer: adminSettingsDetails?.brokerDisclaimer ?? '',
      contactUsEmail: adminSettingsDetails?.contactUs?.email ?? '',
      contactUsPhone: adminSettingsDetails?.contactUs?.phone ?? '',
      contactUsCountryCode: adminSettingsDetails?.contactUs?.countryCode ?? '',
      youtube: adminSettingsDetails?.socialLinks?.youtube ?? '',
      facebook: adminSettingsDetails?.socialLinks?.facebook ?? '',
      instagram: adminSettingsDetails?.socialLinks?.instagram ?? '',
      linkedin: adminSettingsDetails?.socialLinks?.linkedin ?? '',
      twitter: adminSettingsDetails?.socialLinks?.twitter ?? '',
      tiktok: adminSettingsDetails?.socialLinks?.tiktok ?? '',
      airCharterAssociation: adminSettingsDetails?.socialLinks?.airCharterAssociation ?? '',
      betterBusinessBureau: adminSettingsDetails?.socialLinks?.betterBusinessBureau ?? '',
      nbaa: adminSettingsDetails?.socialLinks?.nbaa ?? '',
      argus: adminSettingsDetails?.socialLinks?.argus ?? '',
      wyvern: adminSettingsDetails?.socialLinks?.wyvern ?? '',
      aboutUsTitle: adminSettingsDetails?.aboutUs?.title ?? '',
      aboutUsDescription: adminSettingsDetails?.aboutUs?.description ?? '',
      aboutUsUrl: adminSettingsDetails?.aboutUs?.url ?? '',
      compareAircraftTitle: adminSettingsDetails?.compareAircraft?.title ?? '',
      compareAircraftDescription: adminSettingsDetails?.compareAircraft?.description ?? '',
      compareAircraftUrl: adminSettingsDetails?.compareAircraft?.url ?? '',
    });

    return () => {};
  }, [
    adminSettingsDetails?.email,
    adminSettingsDetails?.phone,
    adminSettingsDetails?.countryCode,
    adminSettingsDetails?.address,
    adminSettingsDetails?.brokerDisclaimer,
    adminSettingsDetails?.contactUs?.email,
    adminSettingsDetails?.contactUs?.phone,
    adminSettingsDetails?.contactUs?.countryCode,
    adminSettingsDetails?.socialLinks?.youtube,
    adminSettingsDetails?.socialLinks?.facebook,
    adminSettingsDetails?.socialLinks?.instagram,
    adminSettingsDetails?.socialLinks?.linkedin,
    adminSettingsDetails?.socialLinks?.tiktok,
    adminSettingsDetails?.socialLinks?.twitter,
    adminSettingsDetails?.socialLinks?.airCharterAssociation,
    adminSettingsDetails?.socialLinks?.betterBusinessBureau,
    adminSettingsDetails?.socialLinks?.nbaa,
    adminSettingsDetails?.socialLinks?.argus,
    adminSettingsDetails?.socialLinks?.wyvern,
    adminSettingsDetails?.aboutUs?.title,
    adminSettingsDetails?.aboutUs?.description,
    adminSettingsDetails?.aboutUs?.url,
    adminSettingsDetails?.compareAircraft?.title,
    adminSettingsDetails?.compareAircraft?.description,
    adminSettingsDetails?.compareAircraft?.url,
    form,
  ]);

  if (adminSettingsDetailsLoading) {
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
              <InputLabel sx={{ color: '#FFFFFF' }}>Address*</InputLabel>
              <Controller
                control={form.control}
                name="address"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your address"
                    multiline
                    minRows={4}
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.address}
                    helperText={form.formState.errors?.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Email*</InputLabel>
              <Controller
                control={form.control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your email"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.email}
                    helperText={form.formState.errors?.email?.message}
                  />
                )}
              />
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

            <Grid size={{ xs: 12 }}>
              <PhoneNumberComp
                key={adminSettingsDetails?.phone || 'empty'}
                // labelName='Phone number*'
                placeholder="Enter your phone number"
                defaultPhoneNumber={
                  adminSettingsDetails?.phone && adminSettingsDetails?.countryCode
                    ? `${adminSettingsDetails.countryCode.startsWith('+') ? adminSettingsDetails.countryCode : `+${adminSettingsDetails.countryCode}`}${adminSettingsDetails.phone}`
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

            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Broker Disclaimer (Footer)*</InputLabel>
              <Controller
                control={form.control}
                name="brokerDisclaimer"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your broker disclaimer"
                    multiline
                    minRows={4}
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.brokerDisclaimer}
                    helperText={form.formState.errors?.brokerDisclaimer?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <WebsiteSettingsFormHeading>Contact Us Information</WebsiteSettingsFormHeading>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Contact Us Email*</InputLabel>
              <Controller
                control={form.control}
                name="contactUsEmail"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter contact us email"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.contactUsEmail}
                    helperText={form.formState.errors?.contactUsEmail?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Contact Us Phone*</InputLabel>
              <PhoneNumberComp
                key={adminSettingsDetails?.contactUs?.phone || 'empty'}
                placeholder="Enter contact us phone number"
                defaultPhoneNumber={
                  adminSettingsDetails?.contactUs?.phone &&
                  adminSettingsDetails?.contactUs?.countryCode
                    ? `${adminSettingsDetails.contactUs.countryCode.startsWith('+') ? adminSettingsDetails.contactUs.countryCode : `+${adminSettingsDetails.contactUs.countryCode}`}${adminSettingsDetails.contactUs.phone}`
                    : ''
                }
                disableFormatting={false}
                phoneNumberValueGetter={(countryCode, inputValue, value) => {
                  const x = removeDialCode({
                    phone: value,
                    dialCode: countryCode,
                  }).replace(/^\+/, '');

                  if (x?.length > 5) {
                    form.setValue('contactUsPhone', value);
                    form.setValue('contactUsPhone', x);
                    form.setValue('contactUsCountryCode', countryCode);
                    form.clearErrors(['contactUsPhone', 'contactUsCountryCode']);
                  } else {
                    form.setValue('contactUsPhone', x);
                    form.setValue('contactUsPhone', '');
                    form.setValue('contactUsCountryCode', '');
                  }
                }}
              />
              {(form.formState.errors.contactUsPhone ||
                form.formState.errors.contactUsCountryCode) && (
                <FormHelperText error>
                  {form.formState.errors.contactUsPhone?.message ||
                    form.formState.errors.contactUsCountryCode?.message}
                </FormHelperText>
              )}
            </Grid>

            <Grid size={{ xs: 12 }}>
              <WebsiteSettingsFormHeading>Social URLs</WebsiteSettingsFormHeading>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Youtube URL</InputLabel>
              <Controller
                control={form.control}
                name="youtube"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your Youtube URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.youtube}
                    helperText={form.formState.errors?.youtube?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Facebook URL</InputLabel>
              <Controller
                control={form.control}
                name="facebook"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your Facebook URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.facebook}
                    helperText={form.formState.errors?.facebook?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Instagram URL</InputLabel>
              <Controller
                control={form.control}
                name="instagram"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your Instagram URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.instagram}
                    helperText={form.formState.errors?.instagram?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>LinkedIn URL</InputLabel>
              <Controller
                control={form.control}
                name="linkedin"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your LinkedIn URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.linkedin}
                    helperText={form.formState.errors?.linkedin?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Twitter URL</InputLabel>
              <Controller
                control={form.control}
                name="twitter"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your Twitter URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.twitter}
                    helperText={form.formState.errors?.twitter?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>TikTok URL</InputLabel>
              <Controller
                control={form.control}
                name="tiktok"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter your TikTok URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.tiktok}
                    helperText={form.formState.errors?.tiktok?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <WebsiteSettingsFormHeading>Logo Redirect URLs</WebsiteSettingsFormHeading>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Air Charter Association URL</InputLabel>
              <Controller
                control={form.control}
                name="airCharterAssociation"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Air Charter Association URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.airCharterAssociation}
                    helperText={form.formState.errors?.airCharterAssociation?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Better Business Bureau URL</InputLabel>
              <Controller
                control={form.control}
                name="betterBusinessBureau"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Better Business Bureau URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.betterBusinessBureau}
                    helperText={form.formState.errors?.betterBusinessBureau?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>NBAA URL</InputLabel>
              <Controller
                control={form.control}
                name="nbaa"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter NBAA URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.nbaa}
                    helperText={form.formState.errors?.nbaa?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>ARGUS URL</InputLabel>
              <Controller
                control={form.control}
                name="argus"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter ARGUS URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.argus}
                    helperText={form.formState.errors?.argus?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Wyvern URL</InputLabel>
              <Controller
                control={form.control}
                name="wyvern"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Wyvern URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.wyvern}
                    helperText={form.formState.errors?.wyvern?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <WebsiteSettingsFormHeading>Common About Us</WebsiteSettingsFormHeading>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>About Us Title*</InputLabel>
              <Controller
                control={form.control}
                name="aboutUsTitle"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter About Us title"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.aboutUsTitle}
                    helperText={form.formState.errors?.aboutUsTitle?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>About Us Description*</InputLabel>
              <Controller
                control={form.control}
                name="aboutUsDescription"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter About Us description"
                    multiline
                    minRows={4}
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.aboutUsDescription}
                    helperText={form.formState.errors?.aboutUsDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>About Us URL*</InputLabel>
              <Controller
                control={form.control}
                name="aboutUsUrl"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter About Us URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.aboutUsUrl}
                    helperText={form.formState.errors?.aboutUsUrl?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <WebsiteSettingsFormHeading>Compare Aircraft Settings</WebsiteSettingsFormHeading>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Compare Aircraft Title*</InputLabel>
              <Controller
                control={form.control}
                name="compareAircraftTitle"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Compare Aircraft title"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.compareAircraftTitle}
                    helperText={form.formState.errors?.compareAircraftTitle?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Compare Aircraft Description*</InputLabel>
              <Controller
                control={form.control}
                name="compareAircraftDescription"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Compare Aircraft description"
                    multiline
                    minRows={4}
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.compareAircraftDescription}
                    helperText={form.formState.errors?.compareAircraftDescription?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#FFFFFF' }}>Compare Aircraft URL*</InputLabel>
              <Controller
                control={form.control}
                name="compareAircraftUrl"
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter Compare Aircraft URL"
                    value={value}
                    onChange={onChange}
                    error={!!form.formState.errors?.compareAircraftUrl}
                    helperText={form.formState.errors?.compareAircraftUrl?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            loading={adminSettingsUpdateLoading}
            disabled={adminSettingsUpdateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Update
          </CustomButtonPrimary>
        </Box>
      </Box>
    </CommonCardBox>
  );
};

export default WebsiteSettingsForm;
