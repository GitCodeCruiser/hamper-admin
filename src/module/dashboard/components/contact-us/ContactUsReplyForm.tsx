'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  contactUsReplySchema,
  TContactUsReplySchemaType,
} from '../../validation/contact-us/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { useContactUsGet, useContactUsSendReply } from '@/api/hooks/contact-us/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TContactUsReplyFormProps = {
  contactUsId: string;
};

const ContactUsReplyForm = ({ contactUsId }: TContactUsReplyFormProps) => {
  const router = useRouter();

  const form = useForm<TContactUsReplySchemaType>({
    resolver: zodResolver(contactUsReplySchema()),
    defaultValues: {
      contactId: contactUsId,
      message: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: contactUsReply, isPending: contactUsReplyLoading } = useContactUsSendReply({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.contactUs.list);
    },
    errorCallback: () => {},
  });

  const { data: contactDetails, isLoading: contactDetailsLoading } = useContactUsGet({
    id: contactUsId,
  });

  const onSubmit = (data: TContactUsReplySchemaType) => {
    // console.log(data, '@TEST');

    contactUsReply(data);
  };

  useEffect(() => {
    if (contactDetails) {
      form.reset({
        contactId: contactUsId,
      });
    }

    return () => {};
  }, [form.reset, contactUsId, contactDetails?.message]);

  if (contactDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Query */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Query*</InputLabel>
        <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
          {contactDetails?.message ?? '-'}
        </Typography>
        {/* <Controller
          control={form.control}
          name="company"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Company name"
              placeholder="Enter company"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.company}
              helperText={errors?.company?.message}
            />
          )}
        /> */}
      </Grid>

      {/* Message */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Reply Message*</InputLabel>
        <Controller
          control={form.control}
          name="message"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Message"
              placeholder="Enter reply message"
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.message}
              helperText={errors?.message?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={contactUsReplyLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.contactUs.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={contactUsReplyLoading}
          loading={contactUsReplyLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Send Reply
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default ContactUsReplyForm;
