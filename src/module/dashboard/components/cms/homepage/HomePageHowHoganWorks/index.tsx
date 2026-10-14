import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Grid, IconButton, InputLabel, Typography, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useCmsSectionContentCreate,
  useCmsSectionContentListing,
  useCmsSectionContentUpdate,
} from '@/api/hooks/cms/sectionContent/hooks';
import FilePreviewDeleteBox from '@/components/Other/FilePreviewDeleteBox';
import SingleFileUploaderBox from '@/components/Other/SingleFileUploaderBox';
import { PageTypeValue, PurposeTypeValue } from '@/constant';
import {
  cmsSectionContentUpdate,
  TCmsSectionContentUpdateSchemaType,
} from '@/module/dashboard/validation/cms/sectionContent/cmsSectionContentSchema.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';

type THomePageHowHoganWorksProps = {
  slug: TSeoStaticSlug;
};

const HomePageHowHoganWorks = ({ slug }: THomePageHowHoganWorksProps) => {
  const theme = useTheme();

  const form = useForm<TCmsSectionContentUpdateSchemaType>({
    resolver: zodResolver(cmsSectionContentUpdate()),
    defaultValues: {
      title: '',
      subTitle: '',
      contents: [],
    },
  });

  const { data: homePageHowData, isLoading: homePageHowDataLoading } = useCmsSectionContentListing({
    pageSlug: slug,
    purpose: PurposeTypeValue.cms.homepage.homepageHowItWorks,
  });

  const errors = form.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contents',
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAddMore = () => {
    append({ title: '', description: '', imageUrl: '', imageUrlSize: 0 });
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
  };

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
      pageSlug: PageTypeValue.cms.homepage.pageSlug as any,
      pageName: PageTypeValue.cms.homepage.pageName as string,
      purpose: PurposeTypeValue.cms.homepage.homepageHowItWorks as string,
      title: data.title,
      subTitle: data.subTitle,
      ...(data.contents && data.contents.length > 0
        ? {
          contents: data.contents.map((c) => ({
            title: c.title,
            description: c.description,
            imageUrl: typeof c.imageUrl === 'string' ? c.imageUrl : '',
            imageUrlSize: c.imageUrlSize ? Number(c.imageUrlSize) : 0,
          })),
        }
        : {}),
    };
    if (homePageHowData && homePageHowData?.length > 0) {
      sectionContentUpdate({
        id: homePageHowData?.[0]?._id as string,
        ...preData,
      });
    } else {
      sectionContentSave(preData);
    }
  };

  useEffect(() => {
    if (homePageHowData) {
      form.reset({
        title: homePageHowData?.[0]?.title ?? '',
        subTitle: homePageHowData?.[0]?.subTitle ?? '',
        contents:
          homePageHowData?.[0]?.contents?.map((c) => ({
            title: c.title,
            description: c.description,
            imageUrl: c.imageUrl,
            imageUrlSize: c.imageUrlSize ?? 0,
          })) ?? [],
      });
    }

    return () => {};
  }, [
    form.reset,
    homePageHowData?.[0]?.title,
    homePageHowData?.[0]?.subTitle,
    homePageHowData?.[0]?.contents,
  ]);

  if (homePageHowDataLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={4} columnSpacing={3}>
      {/* Title */}
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

      {/* ─── Contents (dynamic sub-items) ─── */}
      <Grid size={{ xs: 12 }}>
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            pt: 3,
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <GroupHeading>Content Items</GroupHeading>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddMore}
              sx={{
                textTransform: 'none',
                borderColor: 'rgba(212, 175, 55, 0.4)',
                color: '#D4AF37',
                '&:hover': {
                  borderColor: '#D4AF37',
                  backgroundColor: theme.palette.customColors.textColor,
                  color: theme.palette.primary.main,
                },
              }}
            >
              Add More
            </CustomButtonPrimary>
          </Box>

          {fields.length === 0 && (
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed rgba(212, 175, 55, 0.2)',
                borderRadius: '12px',
              }}
            >
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.95rem' }}>
                No content items added. Click &quot;Add More&quot; to add items.
              </Typography>
            </Box>
          )}

          {fields.map((field, index) => (
            <Box
              key={field?.id}
              sx={{
                p: 3,
                mb: 3,
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                position: 'relative',
                transition: 'border-color 0.2s ease',
                '&:hover': {
                  borderColor: 'rgba(212, 175, 55, 0.25)',
                },
              }}
            >
              {/* Delete button */}
              <IconButton
                onClick={() => {
                  remove(index);
                  // setContentImages((prev) => {
                  //   const next = { ...prev };
                  //   delete next[index];
                  //   return next;
                  // });
                }}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: '#F44336',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    transform: 'scale(1.1)',
                    borderColor: '#F44336',
                  },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  color: '#D4AF37',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  mb: 2,
                  opacity: 0.7,
                  width: '50%',
                }}
              >
                Item {index + 1}
              </Typography>

              <Grid container rowSpacing={3} columnSpacing={3}>
                {/* Content Title */}
                <Grid size={{ xs: 12, md: 12 }}>
                  <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                    Title*
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name={`contents.${index}.title`}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        placeholder="Enter content title"
                        value={value ?? ''}
                        onChange={onChange}
                        error={!!errors?.contents?.[index]?.title}
                        helperText={errors?.contents?.[index]?.title?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Content Description */}
                <Grid size={{ xs: 12, md: 12 }}>
                  <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                    Description*
                  </InputLabel>
                  <Controller
                    control={form.control}
                    name={`contents.${index}.description`}
                    render={({ field: { onChange, value } }) => (
                      <InputFieldCommon
                        placeholder="Enter content description"
                        value={value ?? ''}
                        onChange={onChange}
                        multiline
                        rows={2}
                        error={!!errors?.contents?.[index]?.description}
                        helperText={errors?.contents?.[index]?.description?.message}
                      />
                    )}
                  />
                </Grid>

                {/* Content Image */}
                <Grid size={{ xs: 12 }}>
                  <InputLabel sx={{ color: '#D4AF37', fontSize: '0.9rem', fontWeight: 600, mb: 1 }}>
                    Image
                  </InputLabel>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    {!form.watch(`contents.${index}.imageUrl`) ? (
                      <SingleFileUploaderBox
                        dataValueGetter={(value) => {
                          if (value) {
                            // setContentImages((prev) => ({ ...prev, [index]: value }));
                            // form.setValue(`contents.${index}.imageUrl`, value);
                            form.setValue(`contents.${index}.imageUrl`, value?.key);
                            form.setValue(`contents.${index}.imageUrlSize`, value?.size);
                            form.clearErrors(`contents.${index}.imageUrl`);
                          }
                        }}
                        errorValueGetter={(errorMessage) => {
                          form.setValue(`contents.${index}.imageUrlSize`, 0);
                          form.setError(`contents.${index}.imageUrl`, {
                            message: errorMessage,
                          });
                        }}
                      >
                        <PlusIconUpload />
                      </SingleFileUploaderBox>
                    ) : (
                      <FilePreviewDeleteBox
                        key={`img_preview_${form.watch(`contents.${index}.imageUrl`)}`}
                        sx={{
                          width: '80px !important',
                          height: '80px !important',
                          marginBottom: '10px',
                        }}
                        src={mediaUrl(form.watch(`contents.${index}.imageUrl`) as string)}
                        srcKey={form.watch(`contents.${index}.imageUrl`) as string}
                        isPreviewOnly={false}
                        imageSize={form.watch(`contents.${index}.imageUrlSize`)}
                        onDeleteHandler={(shouldDelete) => {
                          if (shouldDelete) {
                            // setContentImages((prev) => ({ ...prev, [index]: null }));
                            form.setValue(`contents.${index}.imageUrl`, '');
                            form.setValue(`contents.${index}.imageUrlSize`, 0);
                          }
                        }}
                      />
                    )}
                  </Box>
                  {errors?.contents?.[index]?.imageUrl ? (
                    <Typography variant="body1" className="error_msg">
                      {errors?.contents?.[index]?.imageUrl?.message}
                    </Typography>
                  ) : null}
                </Grid>
              </Grid>
            </Box>
          ))}
          <div ref={bottomRef} />
        </Box>
      </Grid>

      {/* Submit */}
      <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          disableRipple
          disabled={sectionContentUpdateLoading || sectionContentSaveLoading}
          loading={sectionContentUpdateLoading || sectionContentSaveLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          Update
        </CustomButtonPrimary>
      </Grid>
    </Grid>
  );
};

export default HomePageHowHoganWorks;
