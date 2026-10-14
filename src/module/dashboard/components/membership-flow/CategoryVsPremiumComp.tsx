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
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import {
  categoryVsPremiumSchema,
  TCategoryVsPremiumSchemaType,
} from '../../validation/membership-flow/categoryVsPremium.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import {
  useCategoryVsPremiumCreate,
  useCategoryVsPremiumListing,
  useCategoryVsPremiumUpdate,
} from '@/api/hooks/cms/categoryVsPremium/hooks';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import CKEditorRichText from '@/ui/CkEditor/Ckeditorrichtext';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

type TCategoryVsPremiumCompProps = {
  slug: TSeoStaticSlug;
  pageName: string;
  purpose: string;
};

const CategoryVsPremiumComp = ({ slug, pageName, purpose }: TCategoryVsPremiumCompProps) => {
  const theme = useTheme();
  const router = useRouter();

  const form = useForm<TCategoryVsPremiumSchemaType>({
    resolver: zodResolver(categoryVsPremiumSchema()),
    defaultValues: {
      pageName,
      pageSlug: slug,
      headerTitle: '',
      title: '',
      smallDescription: '',
      cardType: [
        {
          headerTitle: '',
          title: '',
          isPopular: false,
          cardFeatures: [{ title: '', smallDescription: '' }],
        },
      ],
      redirectUrl: '',
      redirectUrlText: '',
      purpose,
    },
  });

  const errors = form.formState.errors;

  const {
    fields: cardTypeFields,
    append: appendCardType,
    remove: removeCardType,
  } = useFieldArray({
    control: form.control,
    name: 'cardType',
  });

  // ── Fetch existing data ────────────────────────────────────
  const { data: categoryVsPremiumData, isLoading: categoryVsPremiumLoading } =
    useCategoryVsPremiumListing({
      pageSlug: slug,
      purpose,
    });

  const { mutateAsync: categoryVsPremiumSave, isPending: categoryVsPremiumSaveLoading } =
    useCategoryVsPremiumCreate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  const { mutateAsync: categoryVsPremiumUpdate, isPending: categoryVsPremiumUpdateLoading } =
    useCategoryVsPremiumUpdate({
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    });

  // ── Hydrate form on data load ──────────────────────────────
  useEffect(() => {
    if (categoryVsPremiumData && categoryVsPremiumData.length > 0) {
      const existing = categoryVsPremiumData[0];
      form.reset({
        pageName: existing.pageName ?? pageName,
        pageSlug: existing.pageSlug ?? slug,
        headerTitle: existing.headerTitle ?? '',
        title: existing.title ?? '',
        smallDescription: existing.smallDescription ?? '',
        cardType: existing.cardType?.length
          ? existing.cardType
          : [
            {
              headerTitle: '',
              title: '',
              isPopular: false,
              cardFeatures: [{ title: '', smallDescription: '' }],
            },
          ],
        redirectUrl: existing.redirectUrl ?? '',
        redirectUrlText: existing.redirectUrlText ?? '',
        purpose: existing.purpose ?? purpose,
      });
    }
  }, [categoryVsPremiumData]);

  // ── Submit handler ─────────────────────────────────────────
  const onSubmit = (data: TCategoryVsPremiumSchemaType) => {
    const preData = {
      pageSlug: slug,
      pageName,
      purpose,
      headerTitle: data.headerTitle,
      title: data.title,
      smallDescription: data.smallDescription,
      cardType: data.cardType,
      redirectUrl: data.redirectUrl,
      redirectUrlText: data.redirectUrlText,
    };

    if (categoryVsPremiumData && categoryVsPremiumData.length > 0) {
      categoryVsPremiumUpdate({
        id: categoryVsPremiumData[0]._id,
        ...preData,
      });
    } else {
      categoryVsPremiumSave(preData);
    }
  };

  if (categoryVsPremiumLoading) {
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
        {/* ── Section Heading ──────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ pb: 1, mb: 2 }}>
            <GroupHeading>Category Vs Premium</GroupHeading>
          </Box>
        </Grid>

        {/* ── Header Title ────────────────────────────────── */}
        <Grid size={{ xs: 12 }}>
          <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
            Header Title*
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

        {/* ── Title ────────────────────────────────────────── */}
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

        {/* ── Small Description ────────────────────────────── */}
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

        {/* ═══════════════════════════════════════════════════
            CARD TYPE ITEMS
           ═══════════════════════════════════════════════════ */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <GroupHeading>Card Types</GroupHeading>
            <CustomButtonPrimary
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() =>
                appendCardType({
                  headerTitle: '',
                  title: '',
                  isPopular: false,
                  cardFeatures: [{ title: '', smallDescription: '' }],
                })
              }
            >
              Add Card Type
            </CustomButtonPrimary>
          </Box>
        </Grid>

        {cardTypeFields.map((field, cardTypeIndex) => (
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
                  Card Type #{cardTypeIndex + 1}
                </Typography>
                {cardTypeFields.length > 1 && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCardType(cardTypeIndex);
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
                  {/* Card Type Header Title */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      Header Title*
                    </InputLabel>
                    <Controller
                      control={form.control}
                      name={`cardType.${cardTypeIndex}.headerTitle`}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter header title"
                          value={value ?? ''}
                          onChange={onChange}
                          error={!!errors?.cardType?.[cardTypeIndex]?.headerTitle}
                          helperText={errors?.cardType?.[cardTypeIndex]?.headerTitle?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Card Type Title */}
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InputLabel
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 500,
                        mb: 1,
                        fontSize: '0.85rem',
                      }}
                    >
                      Title*
                    </InputLabel>
                    <Controller
                      control={form.control}
                      name={`cardType.${cardTypeIndex}.title`}
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter title"
                          value={value ?? ''}
                          onChange={onChange}
                          error={!!errors?.cardType?.[cardTypeIndex]?.title}
                          helperText={errors?.cardType?.[cardTypeIndex]?.title?.message}
                        />
                      )}
                    />
                  </Grid>

                  {/* Is Popular */}
                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Controller
                      control={form.control}
                      name={`cardType.${cardTypeIndex}.isPopular`}
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

                  {/* ── Features Section ──────────────────── */}
                  <Grid size={{ xs: 12 }}>
                    <CardTypeFeatures
                      control={form.control}
                      cardTypeIndex={cardTypeIndex}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}

        {/* ── Submit ────────────────────────────────────────── */}
        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            disabled={categoryVsPremiumUpdateLoading || categoryVsPremiumSaveLoading}
            loading={categoryVsPremiumUpdateLoading || categoryVsPremiumSaveLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {categoryVsPremiumData && categoryVsPremiumData.length > 0
              ? 'Update Data ↑'
              : 'Save Data ↑'}
          </CustomButtonPrimary>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoryVsPremiumComp;

// ─── Nested Features Sub-Component ──────────────────────────────────────────
const CardTypeFeatures = ({
  control,
  cardTypeIndex,
  errors,
}: {
  control: ReturnType<typeof useForm<TCategoryVsPremiumSchemaType>>['control'];
  cardTypeIndex: number;
  errors: any;
}) => {
  const theme = useTheme();

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: `cardType.${cardTypeIndex}.cardFeatures`,
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
          Card Features
        </Typography>
        <CustomButtonPrimary
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => appendFeature({ title: '', smallDescription: '' })}
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
            transition: 'all 0.2s ease',
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
            {/* Feature Title */}
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 500,
                  mb: 0.5,
                  fontSize: '0.8rem',
                }}
              >
                Title*
              </InputLabel>
              <Controller
                control={control}
                name={`cardType.${cardTypeIndex}.cardFeatures.${featureIndex}.title`}
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter feature title"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!errors?.cardType?.[cardTypeIndex]?.cardFeatures?.[featureIndex]?.title}
                    helperText={
                      errors?.cardType?.[cardTypeIndex]?.cardFeatures?.[featureIndex]?.title
                        ?.message
                    }
                  />
                )}
              />
            </Grid>

            {/* Feature Small Description */}
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 500,
                  mb: 0.5,
                  fontSize: '0.8rem',
                }}
              >
                Small Description*
              </InputLabel>
              <Controller
                control={control}
                name={`cardType.${cardTypeIndex}.cardFeatures.${featureIndex}.smallDescription`}
                render={({ field: { onChange, value } }) => (
                  <InputFieldCommon
                    placeholder="Enter feature small description"
                    value={value ?? ''}
                    onChange={onChange}
                    error={
                      !!errors?.cardType?.[cardTypeIndex]?.cardFeatures?.[featureIndex]
                        ?.smallDescription
                    }
                    helperText={
                      errors?.cardType?.[cardTypeIndex]?.cardFeatures?.[featureIndex]
                        ?.smallDescription?.message
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};
