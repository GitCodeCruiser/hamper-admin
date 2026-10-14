import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCmsSectionContentCreate,
  useCmsSectionContentListing,
  useCmsSectionContentUpdate,
} from '@/api/hooks/cms/sectionContent/hooks';
import {
  cmsSectionContentUpdate,
  TCmsSectionContentUpdateSchemaType,
} from '@/module/dashboard/validation/cms/sectionContent/cmsSectionContentSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import { THomePagePurposeValueType } from '@/types/common/common.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type THomePageTitleAndSubtitleCompProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: THomePagePurposeValueType;
  labelName?: string;
};

const HomePageTitleAndSubtitleComp = ({
  slug,
  pageName,
  purpose,
  labelName,
}: THomePageTitleAndSubtitleCompProps) => {
  const form = useForm<TCmsSectionContentUpdateSchemaType>({
    resolver: zodResolver(cmsSectionContentUpdate()),
    defaultValues: {
      title: '',
      subTitle: '',
      contents: [],
    },
  });

  const errors = form.formState.errors;

  const { data: homePageCharterContent, isLoading: homePageCharterContentLoading } =
    useCmsSectionContentListing({
      pageSlug: slug,
      purpose,
    });

  const { mutateAsync: sectionContentSave, isPending: sectionContentSaveLoading } =
    useCmsSectionContentCreate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  const { mutateAsync: sectionContentUpdate, isPending: sectionContentUpdateLoading } =
    useCmsSectionContentUpdate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  const onSubmit = (data: TCmsSectionContentUpdateSchemaType) => {
    // console.log(data, '@TEST');

    const preData = {
      pageSlug: slug,
      pageName,
      purpose: purpose as string,
      title: data.title,
      subTitle: data.subTitle,
    };

    if (homePageCharterContent && homePageCharterContent?.length > 0) {
      sectionContentUpdate({
        id: homePageCharterContent?.[0]?._id as string,
        ...preData,
      });
    } else {
      sectionContentSave(preData);
    }
  };

  useEffect(() => {
    if (homePageCharterContent) {
      form.reset({
        title: homePageCharterContent?.[0]?.title ?? '',
        subTitle: homePageCharterContent?.[0]?.subTitle ?? '',
      });
    }

    return () => {};
  }, [form.reset, homePageCharterContent?.[0]?.title, homePageCharterContent?.[0]?.subTitle]);

  if (homePageCharterContentLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        p: 4,
        mb: 6,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              pb: 1,
              mb: 2,
            }}
          >
            <GroupHeading>{labelName ?? ''} Title & Subtitle</GroupHeading>
          </Box>
        </Grid>

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

        {/* Sub Title */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Subtitle
          </InputLabel>
          <Controller
            control={form.control}
            name="subTitle"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter subtitle"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.subTitle}
                helperText={errors?.subTitle?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={sectionContentUpdateLoading || sectionContentSaveLoading}
            loading={sectionContentUpdateLoading || sectionContentSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Update Data ↑
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePageTitleAndSubtitleComp;
