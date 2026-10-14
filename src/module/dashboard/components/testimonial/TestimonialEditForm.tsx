'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Grid, InputLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  testimonialEditSchema,
  TTestimonialEditSchemaType,
} from '../../validation/testimonial/index.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { useTestimonialGet, useTestimonialUpdate } from '@/api/hooks/testimonial/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TTestimonialEditFormProps = {
  testimonialId: string;
};

const TestimonialEditForm = ({ testimonialId }: TTestimonialEditFormProps) => {
  const router = useRouter();

  const form = useForm<TTestimonialEditSchemaType>({
    resolver: zodResolver(testimonialEditSchema()),
    defaultValues: {
      title: '',
      description: '',
      company: '',
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: testimonialUpdate, isPending: testimonialUpdateLoading } =
    useTestimonialUpdate({
      optionalCallback: () => {
        // router.replace(PAGE_ROUTE.dashboard.testimonial.list);
      },
      errorCallback: () => {},
    });

  const { data: testimonialDetails, isLoading: testimonialDetailsLoading } = useTestimonialGet({
    id: testimonialId,
  });

  const onSubmit = (data: TTestimonialEditSchemaType) => {
    // console.log(data, '@TEST');

    testimonialUpdate(data);
  };

  useEffect(() => {
    if (testimonialDetails) {
      form.reset({
        id: testimonialId,
        title: testimonialDetails?.title ?? '',
        description: testimonialDetails?.description ?? '',
        company: testimonialDetails?.company ?? '',
      });
    }

    return () => {};
  }, [
    form.reset,
    testimonialId,
    testimonialDetails?.title,
    testimonialDetails?.description,
    testimonialDetails?.company,
    testimonialDetails,
    form,
  ]);

  if (testimonialDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={3}>
      {/* Comment */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Comment*</InputLabel>
        <Controller
          control={form.control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Comment"
              placeholder="Enter comment"
              value={value ?? ''}
              onChange={onChange}
              multiline
              rows={3}
              error={!!errors?.description}
              helperText={errors?.description?.message}
            />
          )}
        />
      </Grid>

      {/* Name */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Name*</InputLabel>
        <Controller
          control={form.control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputFieldCommon
              labelName="Name"
              placeholder="Enter name"
              value={value ?? ''}
              onChange={onChange}
              error={!!errors?.title}
              helperText={errors?.title?.message}
            />
          )}
        />
      </Grid>

      {/* Company */}
      <Grid size={{ xs: 12 }}>
        <InputLabel sx={{ color: '#FFFFFF' }}>Company*</InputLabel>
        <Controller
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
        />
      </Grid>

      <Grid size={{ xs: 12 }} gap={2} display="flex">
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          disableRipple
          disabled={testimonialUpdateLoading}
          startIcon={<WestIcon />}
          onClick={() => {
            router.replace(PAGE_ROUTE.dashboard.lifestyle.testimonial.list);
          }}
        >
          Back
        </CustomButtonPrimary>

        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={testimonialUpdateLoading}
          loading={testimonialUpdateLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default TestimonialEditForm;
