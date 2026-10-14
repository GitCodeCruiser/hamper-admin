'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Grid, InputLabel, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  salesSupportReplySchema,
  TSalesSupportReplySchemaType,
} from '../../validation/sales-support/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { useSalesSupportGet, useSalesSupportSendReply } from '@/api/hooks/sales-support/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TSalesSupportReplyFormProps = {
  salesSupportId: string;
};

const SalesSupportReplyForm = ({ salesSupportId }: TSalesSupportReplyFormProps) => {
  const router = useRouter();

  const form = useForm<TSalesSupportReplySchemaType>({
    resolver: zodResolver(salesSupportReplySchema()),
    defaultValues: {
      id: salesSupportId,
      message: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: salesSupportReply, isPending: salesSupportReplyLoading } =
    useSalesSupportSendReply({
      optionalCallback: () => {
        router.replace(PAGE_ROUTE.dashboard.salesSupport.list);
      },
      errorCallback: () => {},
    });

  const { data: supportDetails, isLoading: supportDetailsLoading } = useSalesSupportGet({
    id: salesSupportId,
  });

  const onSubmit = (data: TSalesSupportReplySchemaType) => {
    salesSupportReply(data);
  };

  useEffect(() => {
    if (supportDetails) {
      form.reset({
        id: salesSupportId,
      });
    }

    return () => {};
  }, [form.reset, salesSupportId, supportDetails?.message]);

  if (supportDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Query */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Query*</InputLabel>
        <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
          {supportDetails?.message ?? '-'}
        </Typography>
      </Grid>

      {/* Reply Message */}
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
          disabled={salesSupportReplyLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.salesSupport.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={salesSupportReplyLoading}
          loading={salesSupportReplyLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Send Reply
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default SalesSupportReplyForm;
