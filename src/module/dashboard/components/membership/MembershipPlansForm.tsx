import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  InputLabel,
  Typography,
  useTheme,
} from '@mui/material';
import { RefObject, useEffect, useRef, useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFieldArrayRemove,
  useForm,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';

import PageLoader from '@/@core/components/others/PageLoader';
import { mediaUrl } from '@/api/endpoints';
import {
  useSubscriptionPlanListing,
  useSubscriptionPlanReorder,
  useSubscriptionPlanSave,
  useSubscriptionPlanUpdate,
} from '@/api/hooks/membership/hooks';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import SingleImgMainComp from '@/components/Other/ImgMainComp/SingleImgMainComp';
import { IMAGE_ASPECT_RATIO_DEFINE } from '@/constant';
import {
  cmsMembershipUpdateSchema,
  TCmsMembershipUpdateSchemaType,
} from '@/module/dashboard/validation/cms/membership/membership.zod';
import { GroupHeading } from '@/module/seo/components/SeoCompForm';
import { TSeoStaticSlug } from '@/types/apps/seo/index.type';
import { ISubscriptionPlan } from '@/types/interface/membership/index.interface';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';
import PlusIconUpload from '@/ui/Icons/PlusIconUpload';
import SortableListWrapper from '@/ui/Sortable/SortableListWrapper';

//=============================================================>
// TYPES
//=============================================================>
type TMembershipPlansFormProps = {
  slug: TSeoStaticSlug;
};

const MembershipPlansForm = ({ slug }: TMembershipPlansFormProps) => {
  const theme = useTheme();

  //=============================================================>
  // FORM SETUP
  //=============================================================>
  const form = useForm<TCmsMembershipUpdateSchemaType>({
    resolver: zodResolver(cmsMembershipUpdateSchema()),
    defaultValues: {
      title: '',
      subTitle: '',
      plans: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'plans',
  });

  const errors = form.formState.errors;

  //=============================================================>
  // API HOOKS
  //=============================================================>
  const { data: membershipData, isLoading: membershipDataLoading } = useSubscriptionPlanListing();
  const { mutateAsync: planSave, isPending: planSaveLoading } = useSubscriptionPlanSave();
  const { mutateAsync: planUpdate, isPending: planUpdateLoading } = useSubscriptionPlanUpdate();
  const { mutateAsync: planReorder } = useSubscriptionPlanReorder();

  //=============================================================>
  // LOGIC / HANDLERS
  //=============================================================>
  const handleSavePlan = async (index: number) => {
    const p = form.getValues(`plans.${index}`);
    if (!p) return;

    // Validate only this plan's fields
    const fieldsToValidate = [
      `plans.${index}.title` as const,
      `plans.${index}.subTitle` as const,
      `plans.${index}.redirectUrl` as const,
      `plans.${index}.price` as const,
      `plans.${index}.imageUrl` as const,
      `plans.${index}.features` as const,
      ...(p.features ?? []).map((_, fIdx) => `plans.${index}.features.${fIdx}.title` as const),
    ];
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    const formData = new FormData();
    formData.append('title', p.title);
    formData.append('subTitle', p.subTitle);
    formData.append('redirectUrl', p.redirectUrl);
    formData.append('price', String(p.price));
    formData.append('billingCycle', 'month'); // Now for static client do not wanted the Billing Cycle
    // formData.append('billingCycle', p.billingCycle);

    // Features
    p.features.forEach((f, idx) => {
      if (f.title.trim() !== '') {
        formData.append(`features[${idx}]`, f.title);
      }
    });

    // Image
    if (p.imageUrl instanceof File) {
      formData.append('image', p.imageUrl);
    } else if (typeof p.imageUrl === 'string') {
      formData.append('image', p.imageUrl);
    }

    if (p._id) {
      formData.append('id', p._id);
      await planUpdate(formData);
    } else {
      await planSave(formData);
    }
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleAddPlan = () => {
    append({
      title: '',
      subTitle: '',
      redirectUrl: '',
      price: 0,
      // billingCycle: '',
      features: [{ title: '' }],
      imageUrl: '',
    });
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
  };

  //=============================================================>
  // SIDE EFFECTS
  //=============================================================>
  useEffect(() => {
    if (membershipData?.data && Array.isArray(membershipData.data)) {
      form.reset({
        title: '',
        subTitle: '',
        plans:
          membershipData.data.map((c: ISubscriptionPlan) => ({
            _id: c._id,
            title: c.title ?? '',
            subTitle: c.subTitle ?? '',
            redirectUrl: c.redirectUrl ?? '',
            price: c.price ?? 0,
            // billingCycle: c.billingCycle ?? '',
            imageUrl: c.image ?? '',
            imageSize: c.imageSize ?? null,
            features: Array.isArray(c.features)
              ? c.features.map((f) => ({ title: typeof f === 'string' ? f : (f?.title ?? '') }))
              : [],
          })) ?? [],
      });
    }
  }, [form.reset, membershipData]);

  //=============================================================>
  // RENDER
  //=============================================================>
  if (membershipDataLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <Grid container rowSpacing={4} columnSpacing={3}>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', pt: 3, mt: 1 }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <GroupHeading>Membership Plans</GroupHeading>
            <CustomButtonPrimary
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddPlan}
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
              Add Plan
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
                No membership plans added. Click &quot;Add Plan&quot; to add.
              </Typography>
            </Box>
          )}

          {fields.length > 0 && (
            <SortableListWrapper
              items={fields}
              idAccessor={(item: any) => item.id}
              onReorder={(newFields, oldIndex, newIndex) => {
                if (oldIndex !== undefined && newIndex !== undefined) {
                  move(oldIndex, newIndex);

                  const newIds = newFields.map((f: any) => f._id).filter(Boolean) as string[];
                  if (newIds.length > 0) {
                    planReorder({ ids: newIds });
                  }
                }
              }}
            >
              <Box>
                {fields.map((field, index) => (
                  <PlanItem
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={form.control}
                    errors={errors}
                    remove={remove}
                    setValue={form.setValue}
                    setError={form.setError}
                    clearErrors={form.clearErrors}
                    onSave={handleSavePlan}
                    isSaving={planUpdateLoading || planSaveLoading}
                    bottomRef={bottomRef}
                  />
                ))}
              </Box>
            </SortableListWrapper>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

//=============================================================>
// SUB-COMPONENT: PLAN ITEM TYPES
//=============================================================>
type TPlanItemProps = {
  id: string;
  index: number;
  control: Control<TCmsMembershipUpdateSchemaType>;
  errors: FieldErrors<TCmsMembershipUpdateSchemaType>;
  remove: UseFieldArrayRemove;
  setValue: UseFormSetValue<TCmsMembershipUpdateSchemaType>;
  setError: UseFormSetError<TCmsMembershipUpdateSchemaType>;
  clearErrors: UseFormClearErrors<TCmsMembershipUpdateSchemaType>;
  onSave: (index: number) => Promise<void>;
  isSaving: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
};

//=============================================================>
// SUB-COMPONENT: PLAN ITEM
//=============================================================>
const PlanItem = ({
  id,
  index,
  control,
  errors,
  remove,
  setValue,
  setError,
  clearErrors,
  onSave,
  isSaving,
  bottomRef,
}: TPlanItemProps) => {
  const theme = useTheme();

  //=============================================================>
  // COMPONENT STATE & HOOKS
  //=============================================================>
  const [preImage, setPreImage] = useState<File | string | null>(null);

  const [preImageSize, setPreImageSize] = useState<number | null>(null);

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: `plans.${index}.features`,
  });

  const imageUrl = useWatch({
    control,
    name: `plans.${index}.imageUrl`,
  });

  const imageSize = useWatch({
    control,
    name: `plans.${index}.imageSize`,
  });

  const planId = useWatch({
    control,
    name: `plans.${index}._id`,
  });

  const planTitle = useWatch({
    control,
    name: `plans.${index}.title`,
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  //=============================================================>
  // SIDE EFFECTS
  //=============================================================>
  useEffect(() => {
    if (imageUrl) {
      setPreImage(imageUrl);
      if (imageUrl instanceof File) {
        setPreImageSize(imageUrl.size);
      } else if (imageSize) {
        setPreImageSize(Number(imageSize));
      } else {
        setPreImageSize(null);
      }
    } else {
      setPreImage(null);
      setPreImageSize(null);
    }
  }, [imageUrl, imageSize]);

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', gap: 1 }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          p: 1.5,
          mt: 0.5,
          cursor: isDragging ? 'grabbing' : 'grab',
          color: 'rgba(255, 255, 255, 0.3)',
          '&:hover': { color: '#D4AF37', background: 'rgba(212, 175, 55, 0.05)' },
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DragIndicatorIcon />
      </Box>
      <Accordion
        defaultExpanded={false}
        sx={{
          flexGrow: 1,
          background: isDragging ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          border: isDragging
            ? '1px solid rgba(212, 175, 55, 0.6)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px !important',
          backdropFilter: 'blur(10px)',
          boxShadow: isDragging ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : 'none',
          '&:before': { display: 'none' },
          '&:hover': { borderColor: 'rgba(212, 175, 55, 0.25)' },
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#D4AF37' }} />}>
          <Typography
            sx={{
              color: '#D4AF37',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Plan {index + 1} {planTitle ? `- ${planTitle}` : ''}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 3, pt: 0 }}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {/* Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                Plan Name*
              </InputLabel>
              <Controller
                control={control}
                name={`plans.${index}.title`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputFieldCommon
                    placeholder="Enter plan name"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Price */}
            <Grid size={{ xs: 12, md: 6 }}>
              <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                Plan Price*
              </InputLabel>
              <Controller
                control={control}
                name={`plans.${index}.price`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputFieldCommon
                    type="number"
                    placeholder="Enter price (e.g. 0)"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Subtitle */}
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                Plan Subtitle*
              </InputLabel>
              <Controller
                control={control}
                name={`plans.${index}.subTitle`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputFieldCommon
                    placeholder="Enter plan subtitle"
                    value={value ?? ''}
                    onChange={onChange}
                    multiline
                    rows={2}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Redirect URL */}
            <Grid size={{ xs: 12 }}>
              <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, mb: 1, fontSize: '0.9rem' }}>
                Redirect URL*
              </InputLabel>
              <Controller
                control={control}
                name={`plans.${index}.redirectUrl`}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputFieldCommon
                    placeholder="Enter redirect URL"
                    value={value ?? ''}
                    onChange={onChange}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Grid>

            {/* Features */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <InputLabel sx={{ color: '#D4AF37', fontWeight: 600, fontSize: '0.9rem' }}>
                  Plan Features*
                </InputLabel>
                <CustomButtonPrimary
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => appendFeature({ title: '' })}
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
                  Add Feature
                </CustomButtonPrimary>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {featureFields.map((featureField, featureIndex) => (
                  <Box
                    key={featureField.id}
                    sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Controller
                        control={control}
                        name={`plans.${index}.features.${featureIndex}.title`}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <InputFieldCommon
                            placeholder="Enter feature"
                            value={value ?? ''}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                          />
                        )}
                      />
                    </Box>
                    <IconButton
                      onClick={() => removeFeature(featureIndex)}
                      size="small"
                      disabled={featureFields.length === 1}
                      sx={{
                        mt: 0.5,
                        color: '#F44336',
                        opacity: featureFields.length === 1 ? 0.3 : 1,
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.2)' },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Image Upload */}
            <Grid size={{ xs: 12 }}>
              <Box>
                <InputLabel
                  sx={{
                    color: theme.palette.common.white,
                    fontSize: '14px',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Membership Image*
                </InputLabel>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  {!preImage ? (
                    <SingleImgMainComp
                      needCrop={true}
                      aspectRatio={IMAGE_ASPECT_RATIO_DEFINE.homeMembershipImage}
                      dataValueGetter={(value) => {
                        if (value) {
                          setPreImage(value);
                          setPreImageSize(value.size);
                          setValue(`plans.${index}.imageUrl`, value as File);
                          setValue(`plans.${index}.imageSize`, value.size);
                          clearErrors(`plans.${index}.imageUrl`);
                        }
                      }}
                      errorValueGetter={(errorMessage) => {
                        setPreImageSize(null);
                        setValue(`plans.${index}.imageSize`, null);
                        setError(`plans.${index}.imageUrl`, { message: errorMessage });
                      }}
                    >
                      <PlusIconUpload />
                    </SingleImgMainComp>
                  ) : (
                    <ImgPreviewMainComp
                      sx={{
                        width: '103px !important',
                        height: '103px !important',
                        marginBottom: '10px',
                      }}
                      src={
                        typeof preImage === 'string'
                          ? mediaUrl(preImage)
                          : URL?.createObjectURL(preImage)
                      }
                      isPreviewOnly={false}
                      onDeleteHandler={(shouldDelete) => {
                        if (shouldDelete) {
                          setPreImage(null);
                          setPreImageSize(null);
                          setValue(`plans.${index}.imageUrl`, undefined as unknown as File);
                          setValue(`plans.${index}.imageSize`, null);
                        }
                      }}
                      imageSize={preImageSize}
                    />
                  )}
                </Box>
              </Box>
              {errors?.plans?.[index]?.imageUrl && (
                <Typography variant="body1" className="error_msg">
                  {errors?.plans?.[index]?.imageUrl?.message}
                </Typography>
              )}
            </Grid>

            {/* Action Button */}
            <Grid size={{ xs: 12 }} sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                size="small"
                disabled={isSaving}
                loading={isSaving}
                onClick={() => onSave(index)}
                sx={{ px: 4 }}
              >
                {planId ? 'Update Plan' : 'Save Plan'}
              </CustomButtonPrimary>
            </Grid>

            <div ref={bottomRef} />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MembershipPlansForm;
