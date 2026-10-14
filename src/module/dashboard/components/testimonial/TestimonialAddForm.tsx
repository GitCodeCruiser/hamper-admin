'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import WestIcon from '@mui/icons-material/West';
import { Grid, InputLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  testimonialAddSchema,
  TTestimonialAddSchemaType,
} from '../../validation/testimonial/index.zod';

import { useTestimonialCreate } from '@/api/hooks/testimonial/hooks';
import { PAGE_ROUTE } from '@/routes/index.route';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TTestimonialAddFormProps = {
  pageSlug: TSeoStaticSlug;
  pageName: string;
};

const TestimonialAddForm = ({ pageSlug, pageName }: TTestimonialAddFormProps) => {
  const router = useRouter();

  const form = useForm<TTestimonialAddSchemaType>({
    resolver: zodResolver(testimonialAddSchema()),
    defaultValues: {
      title: '',
      description: '',
      company: '',
      pageName,
      pageSlug,
    },
  });

  const errors = form.formState.errors;

  const { mutateAsync: testimonialSave, isPending: testimonialSaveLoading } = useTestimonialCreate({
    optionalCallback: () => {
      router.replace(PAGE_ROUTE.dashboard.lifestyle.testimonial.list);
    },
    errorCallback: () => {},
  });

  const onSubmit = (data: TTestimonialAddSchemaType) => {
    // console.log(data, '@TEST');

    testimonialSave(data);
  };

  useEffect(() => {
    if (pageSlug && pageName) {
      form.reset({
        pageName,
        pageSlug,
      });
    }

    return () => {};
  }, [form.reset, pageName, pageSlug]);

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
          disabled={testimonialSaveLoading}
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
          disabled={testimonialSaveLoading}
          loading={testimonialSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default TestimonialAddForm;
