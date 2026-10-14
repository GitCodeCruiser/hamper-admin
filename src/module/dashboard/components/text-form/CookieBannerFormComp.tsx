import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCmsSectionContentCreate,
  useCmsSectionContentListing,
  useCmsSectionContentUpdate,
} from '@/api/hooks/cms/sectionContent/hooks';
import { CmsSectionContentEnum } from '@/api/hooks/cms/sectionContent/key';
import {
  cmsSectionContentUpdate,
  TCmsSectionContentUpdateSchemaType,
} from '@/module/dashboard/validation/cms/sectionContent/cmsSectionContentSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import { TAllPagesPurposeValueType } from '@/types/common/common.type';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TCookieBannerFormCompProps = {
  title: string;
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: TAllPagesPurposeValueType;
  labelName?: string;
};

const CookieBannerFormComp = ({
  title,
  slug,
  pageName,
  purpose,
  labelName,
}: TCookieBannerFormCompProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TCmsSectionContentUpdateSchemaType>({
    resolver: zodResolver(cmsSectionContentUpdate()),
    defaultValues: {
      title,
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
      optionalCallback: () => {
        queryClient.invalidateQueries({
          queryKey: [CmsSectionContentEnum.SectionContentListing, slug, purpose],
        });
        router.refresh();
      },
      errorCallback: () => {},
    });

  const { mutateAsync: sectionContentUpdate, isPending: sectionContentUpdateLoading } =
    useCmsSectionContentUpdate({
      optionalCallback: () => {
        queryClient.invalidateQueries({
          queryKey: [CmsSectionContentEnum.SectionContentListing, slug, purpose],
        });
        router.refresh();
      },
      errorCallback: () => {},
    });

  const onSubmit = (data: TCmsSectionContentUpdateSchemaType) => {
    const preData = {
      pageSlug: slug,
      pageName,
      purpose: purpose as string,
      title,
      subTitle: data.subTitle ?? '',
      // ...(data.subTitle
      //   ? {
      //       subTitle: data.subTitle,
      //     }
      //   : {}),
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
        title: homePageCharterContent?.[0]?.title ?? title,
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
            }}
          >
            <GroupHeading>{labelName}</GroupHeading>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Script Content*
          </InputLabel>
          <Controller
            control={form.control}
            name="subTitle"
            render={({ field: { onChange, value } }) => (
              <TextField
                multiline
                rows={12}
                fullWidth
                placeholder='Paste your cookie banner script tag here (e.g., <script id="CookieDeclaration" ...></script>)'
                value={value ?? ''}
                onChange={onChange}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    padding: '16px',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.35)',
                      opacity: 1,
                    },
                  },
                }}
              />
            )}
          />

          {!!errors.subTitle ? (
            <Typography variant="body1" className="error_msg">
              {errors?.subTitle.message}
            </Typography>
          ) : null}
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
            Update ↑
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CookieBannerFormComp;
