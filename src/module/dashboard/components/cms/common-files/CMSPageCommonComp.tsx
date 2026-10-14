import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCmsMainContentCreate,
  useCmsMainContentListing,
  useCmsMainContentUpdate,
} from '@/api/hooks/cms/main/hooks';
import {
  cmsPageCommonCompSchema,
  TCMSPageCommonCompSchemaSchemaType,
} from '@/module/dashboard/validation/cms/main/cmsPageCommonCompSchema.zod';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import { TCMSPageCommonPurposeValueType } from '@/types/common/common.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TCMSPageCommonCompProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: TCMSPageCommonPurposeValueType;
  labelName?: string;
  isTitleEnabled?: boolean;
};

const CMSPageCommonComp = ({
  slug,
  pageName,
  purpose,
  labelName,
  isTitleEnabled,
}: TCMSPageCommonCompProps) => {
  const form = useForm<TCMSPageCommonCompSchemaSchemaType>({
    resolver: zodResolver(cmsPageCommonCompSchema()),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const errors = form.formState.errors;

  const { data: cmsMainContent, isLoading: cmsMainContentLoading } = useCmsMainContentListing({
    pageSlug: slug,
    purpose,
  });

  const { mutateAsync: mainContentSave, isPending: mainContentSaveLoading } =
    useCmsMainContentCreate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  const { mutateAsync: mainContentUpdate, isPending: mainContentUpdateLoading } =
    useCmsMainContentUpdate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  const onSubmit = (data: TCMSPageCommonCompSchemaSchemaType) => {
    // console.log(data, '@TEST');

    const preData = {
      pageSlug: slug,
      pageName,
      purpose: purpose as string,
      content: data.content,
      ...(data.title ? { title: data.title } : {}),
    };

    if (cmsMainContent && cmsMainContent?.length > 0) {
      mainContentUpdate({
        id: cmsMainContent?.[0]?._id as string,
        ...preData,
      });
    } else {
      mainContentSave(preData);
    }
  };

  useEffect(() => {
    if (cmsMainContent) {
      form.reset({
        title: cmsMainContent?.[0]?.title ?? '',
        content: cmsMainContent?.[0]?.content ?? '',
      });
    }

    return () => {};
  }, [cmsMainContent, form, form.reset]);

  if (cmsMainContentLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Box
    // sx={{
    //   background: 'rgba(255, 255, 255, 0.02)',
    //   border: '1px solid rgba(255, 255, 255, 0.05)',
    //   borderRadius: '16px',
    //   p: 4,
    //   mb: 6,
    //   backdropFilter: 'blur(10px)',
    //   boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
    // }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        {isTitleEnabled && (
          <Grid size={{ xs: 12 }}>
            <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
              Title*
            </InputLabel>
            <Controller
              control={form.control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <InputFieldCommon
                  placeholder="Enter title"
                  value={value ?? ''}
                  onChange={onChange}
                  error={!!errors?.title}
                  helperText={errors?.title?.message}
                />
              )}
            />
          </Grid>
        )}

        {/* Content */}
        <Grid size={{ xs: 12 }}>
          {/* <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Content
          </InputLabel> */}
          <Controller
            control={form.control}
            name="content"
            render={({ field: { onChange, value } }) => (
              <CKEditorRichText
                placeholder="Write your content here..."
                content={value}
                onChange={onChange}
              />
            )}
          />

          {errors.content ? (
            <Typography variant="body1" className="error_msg">
              {errors?.content.message}
            </Typography>
          ) : null}
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={mainContentUpdateLoading || mainContentSaveLoading}
            loading={mainContentUpdateLoading || mainContentSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Update Data ↑
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CMSPageCommonComp;
