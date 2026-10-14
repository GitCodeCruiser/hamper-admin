'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  hourlyBreakdownSchema,
  THourlyBreakdownSchemaType,
} from '../../validation/membership-flow/hourlyBreakdown.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useHourlyBreakdownCreate,
  useHourlyBreakdownListing,
  useHourlyBreakdownUpdate,
} from '@/api/hooks/cms/hourlyBreakdown/hooks';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import CustomSelect from '@/ui/CustomSelect/CustomSelect';

type THourlyBreakdownCompProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
};

const HourlyBreakdownComp = ({ slug, pageName, purpose }: THourlyBreakdownCompProps) => {
  const theme = useTheme();
  const router = useRouter();

  const form = useForm<THourlyBreakdownSchemaType>({
    resolver: zodResolver(hourlyBreakdownSchema()),
    defaultValues: {
      pageName,
      pageSlug: slug,
      headerTitle: '',
      title: '',
      smallDescription: '',
      hourlyRate: [
        {
          headerTitle: '',
          title: '',
          isPopular: false,
          features: [{ text: '', icon: '' }],
        },
      ],
      redirectUrl: '',
      redirectUrlText: '',
      purpose,
    },
  });

  const errors = form.formState.errors;

  const {
    fields: hourlyRateFields,
    append: appendHourlyRate,
    remove: removeHourlyRate,
  } = useFieldArray({
    control: form.control,
    name: 'hourlyRate',
  });

  const { data: hourlyBreakdownData, isLoading: hourlyBreakdownLoading } =
    useHourlyBreakdownListing({
      pageSlug: slug,
      purpose,
    });

  const { mutateAsync: hourlyBreakdownSave, isPending: hourlyBreakdownSaveLoading } =
    useHourlyBreakdownCreate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  const { mutateAsync: hourlyBreakdownUpdate, isPending: hourlyBreakdownUpdateLoading } =
    useHourlyBreakdownUpdate({
      optionalCallback: () => {},
      errorCallback: () => {},
    });

  useEffect(() => {
    if (hourlyBreakdownData && hourlyBreakdownData.length > 0) {
      const existing = hourlyBreakdownData[0];
      form.reset({
        pageName: existing.pageName ?? pageName,
        pageSlug: existing.pageSlug ?? slug,
        headerTitle: existing.headerTitle ?? '',
        title: existing.title ?? '',
        smallDescription: existing.smallDescription ?? '',
        hourlyRate: existing.hourlyRate?.length
          ? existing.hourlyRate
          : [
            {
              headerTitle: '',
              title: '',
              isPopular: false,
              features: [{ text: '', icon: '' }],
            },
          ],
        redirectUrl: existing.redirectUrl ?? '',
        redirectUrlText: existing.redirectUrlText ?? '',
        purpose: existing.purpose ?? purpose,
      });
    }
  }, [hourlyBreakdownData]);

  const onSubmit = (data: THourlyBreakdownSchemaType) => {
    const preData = {
      pageSlug: slug,
      pageName,
      purpose,
      headerTitle: data.headerTitle,
      title: data.title,
      smallDescription: data.smallDescription,
      hourlyRate: data.hourlyRate,
      redirectUrl: data.redirectUrl,
      redirectUrlText: data.redirectUrlText,
    };

    if (hourlyBreakdownData && hourlyBreakdownData.length > 0) {
      hourlyBreakdownUpdate({
        id: hourlyBreakdownData[0]._id,
        ...preData,
      });
    } else {
      hourlyBreakdownSave(preData);
    }
  };

  if (hourlyBreakdownLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        p: 4,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
      }}
    >
      <Grid container rowSpacing={4} columnSpacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ pb: 1, mb: 2 }}>
            <GroupHeading>Hourly Breakdown</GroupHeading>
          </Box>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Header Title
          </InputLabel>
          <Controller
            control={form.control}
            name="headerTitle"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter header title"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.headerTitle}
                helperText={errors?.headerTitle?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Title
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

        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Small Description
          </InputLabel>
          <Controller
            control={form.control}
            name="smallDescription"
            render={({ field: { onChange, value } }) => (
              <CKEditorRichText
                placeholder="Write a small description..."
                content={value ?? ''}
                minHeight={200}
                onChange={onChange}
              />
            )}
          />
          {!!errors.smallDescription ? (
            <Typography variant="body1" className="error_msg">
              {errors?.smallDescription.message}
            </Typography>
          ) : null}
        </Grid>

        {/* ── Redirect URL ─────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Redirect URL*
          </InputLabel>
          <Controller
            control={form.control}
            name="redirectUrl"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="https://example.com/page"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.redirectUrl}
                helperText={errors?.redirectUrl?.message}
              />
            )}
          />
        </Grid>

        {/* ── Redirect URL Text ────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Redirect URL Text*
          </InputLabel>
          <Controller
            control={form.control}
            name="redirectUrlText"
            render={({ field: { onChange, value } }) => (
              <InputFieldCommon
                placeholder="Enter redirect URL text"
                value={value ?? ''}
                onChange={onChange}
                error={!!errors?.redirectUrlText}
                helperText={errors?.redirectUrlText?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <GroupHeading>Hourly Rate Cards</GroupHeading>
            <CustomButtonPrimary
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() =>
                appendHourlyRate({
                  headerTitle: '',
                  title: '',
                  isPopular: false,
                  features: [{ text: '', icon: '' }],
                })
              }
            >
              Add Rate Card
            </CustomButtonPrimary>
          </Box>
        </Grid>

        {hourlyRateFields.map((field, rateIndex) => (
          <Grid size={{ xs: 12 }} key={field.id}>
            <Accordion
              defaultExpanded
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                borderRadius: '12px !important',
                mb: 2,
                '&::before': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.common.white }} />}
                sx={{
                  backgroundColor: 'rgba(212, 175, 55, 0.06)',
                  borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mr: 2,
                  },
                }}
              >
                <Typography sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.95rem' }}>
                  Rate Card #{rateIndex + 1}
                </Typography>
                {hourlyRateFields.length > 1 && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHourlyRate(rateIndex);
                    }}
                    sx={{
                      color: '#F44336',
                      backgroundColor: 'rgba(244, 67, 54, 0.1)',
                      border: '1px solid rgba(244, 67, 54, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(244, 67, 54, 0.2)',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Grid container rowSpacing={3} columnSpacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      Header Title
                    </InputLabel>
                    <Controller
                      control={form.control}
                      name={`hourlyRate.${rateIndex}.headerTitle`}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter header title"
                          value={value ?? ''}
                          onChange={onChange}
                          error={!!errors?.hourlyRate?.[rateIndex]?.headerTitle}
                          helperText={errors?.hourlyRate?.[rateIndex]?.headerTitle?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      Title
                    </InputLabel>
                    <Controller
                      control={form.control}
                      name={`hourlyRate.${rateIndex}.title`}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter title"
                          value={value ?? ''}
                          onChange={onChange}
                          error={!!errors?.hourlyRate?.[rateIndex]?.title}
                          helperText={errors?.hourlyRate?.[rateIndex]?.title?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Controller
                      control={form.control}
                      name={`hourlyRate.${rateIndex}.isPopular`}
                      render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value ?? false}
                              onChange={(e) => onChange(e.target.checked)}
                              sx={{
                                color: 'rgba(212, 175, 55, 0.5)',
                                '&.Mui-checked': {
                                  color: '#D4AF37',
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                color: theme.palette.common.white,
                                fontSize: '0.85rem',
                              }}
                            >
                              Is Popular
                            </Typography>
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <HourlyRateFeatures
                      control={form.control}
                      rateIndex={rateIndex}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={hourlyBreakdownUpdateLoading || hourlyBreakdownSaveLoading}
            loading={hourlyBreakdownUpdateLoading || hourlyBreakdownSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {hourlyBreakdownData && hourlyBreakdownData.length > 0
              ? 'Update Data ↑'
              : 'Save Data ↑'}
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HourlyBreakdownComp;

const HourlyRateFeatures = ({
  control,
  rateIndex,
  errors,
}: {
  control: ReturnType<typeof useForm<THourlyBreakdownSchemaType>>['control'];
  rateIndex: number;
  errors: any;
}) => {
  const theme = useTheme();

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: `hourlyRate.${rateIndex}.features`,
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography
          sx={{
            color: '#D4AF37',
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.3px',
          }}
        >
          Features
        </Typography>
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => appendFeature({ text: '', icon: '' })}
        >
          Add Feature
        </CustomButtonPrimary>
      </Box>

      {featureFields.map((featureField, featureIndex) => (
        <Box
          key={featureField.id}
          sx={{
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            p: 2.5,
            mb: 2,
            transition: 'all 0.25s ease',
            '&:hover': {
              borderColor: 'rgba(212, 175, 55, 0.25)',
              background: 'rgba(255, 255, 255, 0.03)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              Feature #{featureIndex + 1}
            </Typography>
            {featureFields.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeFeature(featureIndex)}
                sx={{
                  color: '#F44336',
                  backgroundColor: 'rgba(244, 67, 54, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.15)',
                  },
                }}
              >
                <DeleteIcon sx={{ fontSize: '18px' }} />
              </IconButton>
            )}
          </Box>

          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid size={{ xs: 12 }}>
              <InputLabel
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 500,
                  mb: 0.5,
                  fontSize: '0.8rem',
                }}
              >
                Text
              </InputLabel>
              <Controller
                control={control}
                name={`hourlyRate.${rateIndex}.features.${featureIndex}.text`}
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter feature text"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!errors?.hourlyRate?.[rateIndex]?.features?.[featureIndex]?.text}
                    helperText={
                      errors?.hourlyRate?.[rateIndex]?.features?.[featureIndex]?.text?.message
                    }
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 500,
                  mb: 0.5,
                  fontSize: '0.8rem',
                }}
              >
                Icon
              </InputLabel>
              <Controller
                control={control}
                name={`hourlyRate.${rateIndex}.features.${featureIndex}.icon`}
                render={({ field: { onChange, value } }) => (
                  <CustomSelect
                    initialValue="Select Icon"
                    value={value ?? ''}
                    textColor="#FFFFFF"
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="description">Description</MenuItem>
                    <MenuItem value="language">Language</MenuItem>
                    <MenuItem value="lock">Lock</MenuItem>
                    <MenuItem value="airline-seat">Airline Seat</MenuItem>
                    <MenuItem value="confirmation-number">Confirmation Number</MenuItem>
                    <MenuItem value="calendar-today">Calendar Today</MenuItem>
                  </CustomSelect>
                )}
              />
              {errors?.hourlyRate?.[rateIndex]?.features?.[featureIndex]?.icon ? (
                <Typography variant="body1" className="error_msg">
                  {errors?.hourlyRate?.[rateIndex]?.features?.[featureIndex]?.icon?.message}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
