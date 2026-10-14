'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import { menuFooterSchema, TMenuFooterSchemaType } from '../validation/menu-footer.zod';

import PageLoader from '@/@core/components/others/PageLoader';
import { mainWebsiteUrl } from '@/api/endpoints';
import { useMenuFooterDetails, useMenuFooterUpdate } from '@/api/hooks/menu-footer/hooks';
import CommonCardBox from '@/components/SIngleComponent/CommonCardBox';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';
import CustomAutocomplete from '@/ui/CustomAutocomplete/CustomAutocomplete';
import CustomButtonPrimary from '@/ui/CustomButtons/CustomButtonPrimary';

// Sub-component for rendering nested menu children
const MenuChildrenFieldArray = ({
  nestIndex,
  control,
  formState,
}: {
  nestIndex: number;
  control: any;
  formState: any;
}) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `menu.${nestIndex}.children`,
  });

  return (
    <Box
      sx={{
        pl: 3,
        pr: 1,
        py: 1.5,
        borderLeft: `2px dashed ${theme.palette.primary.main}`,
        mt: 1.5,
        mb: 1.5,
        borderRadius: '0 4px 4px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 1.5,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}
      >
        Sub-Menu Links ({fields.length})
      </Typography>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          className={`menu-child-row-${nestIndex}`}
          sx={{
            mb: 2.5,
            pb: 2.5,
            borderBottom:
              index < fields.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          }}
        >
          {/* Sub-menu Title (Full Width) */}
          <Box sx={{ mb: 1.5 }}>
            <Controller
              control={control}
              name={`menu.${nestIndex}.children.${index}.title`}
              render={({ field }) => (
                <InputFieldCommon
                  placeholder="Sub-menu Title"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!formState.errors?.menu?.[nestIndex]?.children?.[index]?.title}
                  helperText={
                    formState.errors?.menu?.[nestIndex]?.children?.[index]?.title?.message
                  }
                />
              )}
            />
          </Box>

          {/* URL, Checkbox, Delete Row */}
          <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 8.5 }}>
              <Controller
                control={control}
                name={`menu.${nestIndex}.children.${index}.url`}
                render={({ field }) => (
                  <UrlSelectorInput
                    placeholder="Sub-menu URL"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!formState.errors?.menu?.[nestIndex]?.children?.[index]?.url}
                    helperText={
                      formState.errors?.menu?.[nestIndex]?.children?.[index]?.url?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 2.5 }}
              sx={{ display: 'flex', alignItems: 'center', height: '40px' }}
            >
              <Controller
                control={control}
                name={`menu.${nestIndex}.children.${index}.isSource`}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          '&.Mui-checked': { color: '#D4AF37' },
                          p: 1,
                        }}
                      />
                    }
                    label="Third-Party Link"
                    sx={{
                      color: '#FFFFFF',
                      m: 0,
                      '.MuiFormControlLabel-label': { fontSize: '12px' },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
              }}
            >
              <IconButton
                size="small"
                onClick={() => remove(index)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  '&:hover': { color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)' },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <CustomButtonPrimary
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<AddCircleOutlineIcon fontSize="small" />}
        onClick={() => {
          append({ title: '', url: '', isSource: false });
          setTimeout(() => {
            const items = document.querySelectorAll(`.menu-child-row-${nestIndex}`);
            if (items.length > 0) {
              items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }}
        sx={{ py: 0.5, fontSize: '11px' }}
      >
        Add Sub-Menu Link
      </CustomButtonPrimary>
    </Box>
  );
};

// Sub-component for rendering nested footer children
const FooterChildrenFieldArray = ({
  nestIndex,
  control,
  formState,
}: {
  nestIndex: number;
  control: any;
  formState: any;
}) => {
  const theme = useTheme();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `footer.${nestIndex}.children`,
  });

  return (
    <Box
      sx={{
        pl: 3,
        pr: 1,
        py: 1.5,
        borderLeft: `2px dashed ${theme.palette.primary.main}`,
        mt: 1.5,
        mb: 1.5,
        borderRadius: '0 4px 4px 0',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 1.5,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}
      >
        Column Links ({fields.length})
      </Typography>
      {fields.map((item, index) => (
        <Box
          key={item.id}
          className={`footer-child-row-${nestIndex}`}
          sx={{
            mb: 2.5,
            pb: 2.5,
            borderBottom:
              index < fields.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          }}
        >
          {/* Link Title (Full Width) */}
          <Box sx={{ mb: 1.5 }}>
            <Controller
              control={control}
              name={`footer.${nestIndex}.children.${index}.title`}
              render={({ field }) => (
                <InputFieldCommon
                  placeholder="Link Title"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!formState.errors?.footer?.[nestIndex]?.children?.[index]?.title}
                  helperText={
                    formState.errors?.footer?.[nestIndex]?.children?.[index]?.title?.message
                  }
                />
              )}
            />
          </Box>

          {/* URL, Checkbox, Delete Row */}
          <Grid container spacing={2} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 8.5 }}>
              <Controller
                control={control}
                name={`footer.${nestIndex}.children.${index}.url`}
                render={({ field }) => (
                  <UrlSelectorInput
                    placeholder="Link URL"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!formState.errors?.footer?.[nestIndex]?.children?.[index]?.url}
                    helperText={
                      formState.errors?.footer?.[nestIndex]?.children?.[index]?.url?.message
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 2.5 }}
              sx={{ display: 'flex', alignItems: 'center', height: '40px' }}
            >
              <Controller
                control={control}
                name={`footer.${nestIndex}.children.${index}.isSource`}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.6)',
                          '&.Mui-checked': { color: '#D4AF37' },
                          p: 1,
                        }}
                      />
                    }
                    label="Third-Party Link"
                    sx={{
                      color: '#FFFFFF',
                      m: 0,
                      '.MuiFormControlLabel-label': { fontSize: '12px' },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 1 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
              }}
            >
              <IconButton
                size="small"
                onClick={() => remove(index)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  '&:hover': { color: '#ff4d4d', backgroundColor: 'rgba(255, 77, 77, 0.1)' },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
      <CustomButtonPrimary
        variant="outlined"
        color="secondary"
        size="small"
        startIcon={<AddCircleOutlineIcon fontSize="small" />}
        onClick={() => {
          append({ title: '', url: '', isSource: false });
          setTimeout(() => {
            const items = document.querySelectorAll(`.footer-child-row-${nestIndex}`);
            if (items.length > 0) {
              items[items.length - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }}
        sx={{ py: 0.5, fontSize: '11px' }}
      >
        Add Link
      </CustomButtonPrimary>
    </Box>
  );
};

const customPath = [
  { label: 'Home', path: `${mainWebsiteUrl}` },
  { label: 'Why Hogani Jets?', path: `${mainWebsiteUrl}/why-hogani` },
  { label: 'Our Story', path: `${mainWebsiteUrl}/about-us` },
  { label: 'Concierge', path: `${mainWebsiteUrl}/concierge` },
  {
    label: 'Safety & Operator Vetting',
    path: `${mainWebsiteUrl}/resources/insider-guide-to-private-aviation/safety-operator-vetting/`,
  },
  { label: 'Partnerships', path: `${mainWebsiteUrl}/partnerships` },
  { label: 'Ways to Fly', path: `${mainWebsiteUrl}/membership` },
  { label: 'On Demand Charter', path: `${mainWebsiteUrl}/on-demand-charter` },
  { label: 'Jet Card', path: `${mainWebsiteUrl}/jet-card` },
  { label: 'Private Office', path: `${mainWebsiteUrl}/private-office` },
  { label: 'Loyalty Program', path: `${mainWebsiteUrl}/loyalty-program` },
  { label: 'Types of Charter', path: `${mainWebsiteUrl}/types-of-charter` },
  { label: 'Personal Charter', path: `${mainWebsiteUrl}/types-of-charter/personal` },
  { label: 'Corporate Charter', path: `${mainWebsiteUrl}/types-of-charter/corporate` },
  { label: 'Specialist Charter', path: `${mainWebsiteUrl}/types-of-charter/specialist` },
  { label: 'Instant Charter Estimate', path: `${mainWebsiteUrl}/pricing-calculator` },
  { label: 'Aircraft Options', path: `${mainWebsiteUrl}/aircraft-options` },
  { label: 'Available Aircraft', path: `${mainWebsiteUrl}/available-aircraft` },
  { label: 'Compare Aircraft', path: `${mainWebsiteUrl}/compare-aircraft` },
  { label: 'Empty Leg Flights', path: `${mainWebsiteUrl}/empty-leg-flights` },
  { label: 'Destinations', path: `${mainWebsiteUrl}/cities` },
  { label: 'Routes', path: `${mainWebsiteUrl}/routes` },
  { label: 'Airports', path: `${mainWebsiteUrl}/airport` },
  { label: 'Charter Uncensored', path: `${mainWebsiteUrl}/resources` },
  {
    label: 'Understanding Private Aviation',
    path: `${mainWebsiteUrl}/resources/insider-guide-to-private-aviation`,
  },
  { label: 'Ways to Fly Private', path: `${mainWebsiteUrl}/resources/ways-to-fly-private` },
  { label: 'Costs & Pricing', path: `${mainWebsiteUrl}/resources/costs-pricing` },
  { label: 'News & Blog', path: `${mainWebsiteUrl}/blog` },
  { label: 'Contact Us', path: `${mainWebsiteUrl}/contact-us` },
  // Commented out or extra routes:
  { label: 'Matt Hogan', path: `${mainWebsiteUrl}/matt-hogan` },
  { label: 'Referral Program', path: `${mainWebsiteUrl}/referral-program` },
  { label: 'Insider Guide', path: `${mainWebsiteUrl}/insider-guide-to-private-aviation` },
  { label: 'Jet Card Enquiry', path: `${mainWebsiteUrl}/jet-card-enquiry` },
  { label: 'Loyalty Program Enquiry', path: `${mainWebsiteUrl}/loyalty-program-enquiry` },
  { label: 'Private Office Enquiry', path: `${mainWebsiteUrl}/private-office-enquiry` },
];

const CUSTOM_URL_OPTION = { label: '✏️ Custom URL', path: '__custom__' };

const UrlSelectorInput = ({
  value,
  onChange,
  error,
  helperText,
  placeholder = 'Select URL',
}: {
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}) => {
  const isPredefined = customPath.some((item) => item.path === value);
  const [isCustomMode, setIsCustomMode] = useState(!isPredefined && value !== '');

  const autocompleteOptions = [...customPath, CUSTOM_URL_OPTION];

  return (
    <Stack spacing={1.5}>
      <CustomAutocomplete
        options={autocompleteOptions}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return option?.label || '';
        }}
        value={
          isCustomMode ? CUSTOM_URL_OPTION : customPath.find((item) => item.path === value) || null
        }
        onChange={(_, newValue) => {
          if (newValue === null) {
            setIsCustomMode(false);
            onChange('');
          } else if (typeof newValue === 'string') {
            setIsCustomMode(false);
            onChange(newValue);
          } else if ((newValue as any).path === '__custom__') {
            setIsCustomMode(true);
            onChange('');
          } else {
            setIsCustomMode(false);
            onChange((newValue as any).path);
          }
        }}
        placeholder={placeholder}
        error={error && !isCustomMode}
        helperText={!isCustomMode ? helperText : undefined}
        isOptionEqualToValue={(option, val) => {
          if (typeof option === 'string' || typeof val === 'string') return false;
          return (option as any)?.path === (val as any)?.path;
        }}
        renderOption={(props, option: any) => {
          const { key, ...optionProps } = props as any;
          const isCustom = option?.path === '__custom__';
          return (
            <Box component="li" key={key} {...optionProps}>
              {isCustom ? (
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: '#D4AF37', fontStyle: 'italic' }}
                >
                  {option.label}
                </Typography>
              ) : (
                <Stack direction="column" spacing={0.25}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                    {option.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '11px' }}
                  >
                    {option.path}
                  </Typography>
                </Stack>
              )}
            </Box>
          );
        }}
        slotProps={{
          popper: {
            sx: {
              '& .MuiAutocomplete-paper': {
                backgroundColor: '#6b0f1aeb',
                color: '#FFFFFF',
                borderRadius: CustomSize(4),
                marginTop: CustomSize(4),
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              '& .MuiAutocomplete-noOptions': {
                color: '#FFFFFF',
                backgroundColor: '#6b0f1aeb',
                padding: CustomSize(16),
                fontSize: CustomSize(14),
              },
              '& .MuiAutocomplete-loading': {
                color: '#FFFFFF',
                backgroundColor: '#6b0f1aeb',
                padding: CustomSize(16),
                fontSize: CustomSize(14),
              },
              '& .MuiAutocomplete-listbox': {
                padding: CustomSize(8),
                '& .MuiAutocomplete-option': {
                  padding: `${CustomSize(8)} ${CustomSize(12)}`,
                  borderRadius: CustomSize(4),
                  '&[aria-selected="true"]': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              },
            },
          },
        }}
      />

      {isCustomMode && (
        <InputFieldCommon
          placeholder="Enter custom URL (e.g. /custom-page or https://...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          helperText={helperText}
        />
      )}
    </Stack>
  );
};

const MenuFooterSettingsForm = () => {
  const router = useRouter();
  const theme = useTheme();

  const { data: menuFooterData, isLoading: menuFooterDetailsLoading } = useMenuFooterDetails();

  const { mutateAsync: menuFooterUpdate, isPending: menuFooterUpdateLoading } = useMenuFooterUpdate(
    {
      optionalCallback: () => {
        router.refresh();
      },
      errorCallback: () => {},
    },
  );

  const form = useForm<TMenuFooterSchemaType>({
    resolver: zodResolver(menuFooterSchema()),
    defaultValues: {
      menu: [],
      footer: [],
    },
  });

  const {
    fields: menuFields,
    append: appendMenu,
    remove: removeMenu,
  } = useFieldArray({
    control: form.control,
    name: 'menu',
  });

  const {
    fields: footerFields,
    append: appendFooter,
    remove: removeFooter,
  } = useFieldArray({
    control: form.control,
    name: 'footer',
  });

  useEffect(() => {
    if (menuFooterData) {
      form.reset({
        menu: menuFooterData.menu || [],
        footer: menuFooterData.footer || [],
      });
    }
  }, [menuFooterData, form]);

  const onSubmit = (data: TMenuFooterSchemaType) => {
    menuFooterUpdate(data);
  };

  if (menuFooterDetailsLoading) {
    return <PageLoader wrapperCls="page-loader-fix" />;
  }

  return (
    <CommonCardBox
      sx={{
        backgroundColor: '#6b0f1aeb',
      }}
    >
      <Box className="mainContainer">
        <Grid container spacing={4}>
          {/* Menu Section */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minHeight: '400px',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    fontSize: '18px',
                    fontFamily: '"Google Sans", sans-serif',
                    letterSpacing: '0.5px',
                  }}
                >
                  Menu Links
                </Typography>
                <CustomButtonPrimary
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    appendMenu({ title: '', url: '', isSource: false, children: [] });
                    setTimeout(() => {
                      const items = document.querySelectorAll('.menu-item-card');
                      if (items.length > 0) {
                        items[items.length - 1].scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                        });
                      }
                    }, 100);
                  }}
                >
                  Add Top Menu Item
                </CustomButtonPrimary>
              </Stack>

              {menuFields.length === 0 ? (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    mt: 4,
                  }}
                >
                  No menu items configured. Click "Add Top Menu Item" to start.
                </Typography>
              ) : (
                menuFields.map((field, index) => {
                  const title = form.watch(`menu.${index}.title`) || '[New Menu Item]';
                  const childrenCount = (form.watch(`menu.${index}.children`) || []).length;
                  return (
                    <Accordion
                      key={field.id}
                      className="menu-item-card"
                      sx={{
                        mb: 2.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: `1.5px dashed ${theme.palette.primary.main}`,
                        boxShadow: 'none',
                        backgroundImage: 'none',
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': {
                          margin: '0 0 20px 0',
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF' }} />}
                        sx={{
                          px: 2,
                          py: 0.5,
                          '& .MuiAccordionSummary-content': {
                            my: 0,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                          {title} {childrenCount > 0 ? `(${childrenCount} sub-menu links)` : ''}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          p: '16px !important',
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        {/* Top-Level Menu Title (Full Width) */}
                        <Box sx={{ mb: 2 }}>
                          <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '12px' }}>
                            Top Item Title*
                          </InputLabel>
                          <Controller
                            control={form.control}
                            name={`menu.${index}.title`}
                            render={({ field: { onChange, value } }) => (
                              <InputFieldCommon
                                placeholder="e.g. Services"
                                value={value}
                                onChange={onChange}
                                error={!!form.formState.errors?.menu?.[index]?.title}
                                helperText={form.formState.errors?.menu?.[index]?.title?.message}
                              />
                            )}
                          />
                        </Box>

                        {/* URL, Checkbox, Delete Row */}
                        <Grid container spacing={2} alignItems="flex-start">
                          <Grid size={{ xs: 12, md: 8.5 }}>
                            <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '12px' }}>
                              Top Item URL*
                            </InputLabel>
                            <Controller
                              control={form.control}
                              name={`menu.${index}.url`}
                              render={({ field: { onChange, value } }) => (
                                <UrlSelectorInput
                                  placeholder="Select Top Item URL"
                                  value={value}
                                  onChange={onChange}
                                  error={!!form.formState.errors?.menu?.[index]?.url}
                                  helperText={form.formState.errors?.menu?.[index]?.url?.message}
                                />
                              )}
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, md: 2.5 }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: { xs: 0, md: 3.5 },
                              height: '40px',
                            }}
                          >
                            <Controller
                              control={form.control}
                              name={`menu.${index}.isSource`}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={!!field.value}
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      sx={{
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        '&.Mui-checked': { color: '#D4AF37' },
                                      }}
                                    />
                                  }
                                  label="Third-Party Link"
                                  sx={{
                                    color: '#FFFFFF',
                                    m: 0,
                                    '.MuiFormControlLabel-label': { fontSize: '12px' },
                                  }}
                                />
                              )}
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, md: 1 }}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mt: { xs: 0, md: 3.5 },
                              height: '40px',
                            }}
                          >
                            <IconButton
                              onClick={() => removeMenu(index)}
                              sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                '&:hover': {
                                  color: '#ff4d4d',
                                  backgroundColor: 'rgba(255, 77, 77, 0.1)',
                                },
                              }}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Grid>
                        </Grid>

                        <MenuChildrenFieldArray
                          nestIndex={index}
                          control={form.control}
                          formState={form.formState}
                        />
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              )}
            </Box>
          </Grid>

          {/* Footer Section */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                minHeight: '400px',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    fontSize: '18px',
                    fontFamily: '"Google Sans", sans-serif',
                    letterSpacing: '0.5px',
                  }}
                >
                  Footer Columns
                </Typography>
                <CustomButtonPrimary
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => {
                    appendFooter({ label: '', children: [] });
                    setTimeout(() => {
                      const items = document.querySelectorAll('.footer-section-card');
                      if (items.length > 0) {
                        items[items.length - 1].scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                        });
                      }
                    }, 100);
                  }}
                >
                  Add Footer Section
                </CustomButtonPrimary>
              </Stack>

              {footerFields.length === 0 ? (
                <Typography
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    mt: 4,
                  }}
                >
                  No footer columns configured. Click "Add Footer Section" to start.
                </Typography>
              ) : (
                footerFields.map((field, index) => {
                  const label = form.watch(`footer.${index}.label`) || '[New Footer Section]';
                  const childrenCount = (form.watch(`footer.${index}.children`) || []).length;
                  return (
                    <Accordion
                      key={field.id}
                      className="footer-section-card"
                      sx={{
                        mb: 2.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: `1.5px dashed ${theme.palette.primary.main}`,
                        boxShadow: 'none',
                        backgroundImage: 'none',
                        '&:before': { display: 'none' },
                        '&.Mui-expanded': {
                          margin: '0 0 20px 0',
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF' }} />}
                        sx={{
                          px: 2,
                          py: 0.5,
                          '& .MuiAccordionSummary-content': {
                            my: 0,
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                      >
                        <Typography sx={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                          {label} {childrenCount > 0 ? `(${childrenCount} links)` : ''}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          p: '16px !important',
                          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="flex-start">
                          <Box sx={{ flexGrow: 1 }}>
                            <InputLabel sx={{ color: '#FFFFFF', mb: 0.5, fontSize: '12px' }}>
                              Column Heading / Label*
                            </InputLabel>
                            <Controller
                              control={form.control}
                              name={`footer.${index}.label`}
                              render={({ field: { onChange, value } }) => (
                                <InputFieldCommon
                                  placeholder="e.g. Quick Links"
                                  value={value}
                                  onChange={onChange}
                                  error={!!form.formState.errors?.footer?.[index]?.label}
                                  helperText={
                                    form.formState.errors?.footer?.[index]?.label?.message
                                  }
                                />
                              )}
                            />
                          </Box>
                          <IconButton
                            onClick={() => removeFooter(index)}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              mt: 3.5,
                              '&:hover': {
                                color: '#ff4d4d',
                                backgroundColor: 'rgba(255, 77, 77, 0.1)',
                              },
                            }}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </Stack>

                        <FooterChildrenFieldArray
                          nestIndex={index}
                          control={form.control}
                          formState={form.formState}
                        />
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            disableRipple
            loading={menuFooterUpdateLoading}
            disabled={menuFooterUpdateLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Update Menu & Footer Links
          </CustomButtonPrimary>
        </Box>
      </Box>
    </CommonCardBox>
  );
};

export default MenuFooterSettingsForm;
