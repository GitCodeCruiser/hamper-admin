'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  legEnquiryReplySchema,
  TLegEnquiryReplySchemaType,
} from '../../validation/leg-enquiry/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { useLegEnquiryGet, useLegEnquirySendReply } from '@/api/hooks/leg-enquiry/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TLegEnquiryReplyFormProps = {
  legEnquiryId: string;
};

const LegEnquiryReplyForm = ({ legEnquiryId }: TLegEnquiryReplyFormProps) => {
  const router = useRouter();

  const form = useForm<TLegEnquiryReplySchemaType>({
    resolver: zodResolver(legEnquiryReplySchema()),
    defaultValues: {
      id: legEnquiryId,
      legEnquireId: legEnquiryId,
      legEnquiryId,
      contactId: legEnquiryId,
      message: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: legEnquiryReply, isPending: legEnquiryReplyLoading } =
    useLegEnquirySendReply({
      optionalCallback: () => {
        router.replace(PAGE_ROUTE.dashboard.legEnquiry.list);
      },
      errorCallback: () => {},
    });

  const { data: legDetails, isLoading: legDetailsLoading } = useLegEnquiryGet({
    id: legEnquiryId,
  });

  const onSubmit = (data: TLegEnquiryReplySchemaType) => {
    legEnquiryReply({
      id: legEnquiryId,
      legEnquireId: legEnquiryId,
      legEnquiryId,
      contactId: legEnquiryId,
      message: data.message,
    });
  };

  useEffect(() => {
    if (legDetails) {
      form.reset({
        id: legEnquiryId,
        legEnquireId: legEnquiryId,
        legEnquiryId,
        contactId: legEnquiryId,
        message: '',
      });
    }
  }, [form.reset, legEnquiryId, legDetails?.message]);

  if (legDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Sender Info */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Submitted By</InputLabel>
        <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
          {legDetails?.fullName ??
            `${legDetails?.firstName ?? ''} ${legDetails?.lastName ?? ''}`.trim()}{' '}
          ({legDetails?.email ?? '-'}){legDetails?.phone ? ` | Phone: ${legDetails?.phone}` : ''}
        </Typography>
      </Grid>

      {/* Query */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Query*</InputLabel>
        <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
          {legDetails?.message ?? '-'}
        </Typography>
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
          disabled={legEnquiryReplyLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.legEnquiry.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={legEnquiryReplyLoading}
          loading={legEnquiryReplyLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Send Reply
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default LegEnquiryReplyForm;
