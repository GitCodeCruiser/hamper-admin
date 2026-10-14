'use client';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
  Switch,
  TextField as MuiTextField,
  Typography,
} from '@mui/material';

import TextField from './BuilderInput';
import HintEditor from './HintEditor';
import OptionsEditor from './OptionsEditor';
import { FORM_FIELD_TYPES, FormBuilderField, FormFieldType, ValidationRuleType } from './types';

import { useLocationCountryList, useLocationStateList } from '@/api/hooks/location/hooks';

const optionFieldTypes: FormFieldType[] = ['select', 'multiselect', 'radio'];
const validationTypes: ValidationRuleType[] = [
  'required',
  'minLength',
  'maxLength',
  'min',
  'max',
  'pattern',
];

const uid = (prefix: string) =>
  `${prefix}_${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

const locationAutocompleteSx = {
  '& .MuiInputBase-root': {
    minHeight: 42,
    color: 'common.white',
    px: '0 !important',
  },
  '& .MuiInputBase-input': {
    fontSize: 16,
    '&::placeholder': { color: 'rgba(255,255,255,.52)', opacity: 1 },
  },
  '& .MuiInput-root:before': { borderBottomColor: 'rgba(255,255,255,.72)' },
  '& .MuiInput-root:hover:not(.Mui-disabled):before': {
    borderBottomColor: 'common.white',
  },
  '& .MuiInput-root:after': { borderBottomColor: 'primary.main' },
  '& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator': {
    color: 'common.white',
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: 'rgba(255,255,255,.62) !important',
  },
};

const locationAutocompleteSlotProps = {
  paper: {
    sx: {
      mt: 0.75,
      bgcolor: '#fffdf5',
      color: '#10212b',
      border: '1px solid #e0d8c2',
      borderRadius: 1,
      boxShadow: '0 12px 30px rgba(16,4,7,.24)',
      '& .MuiAutocomplete-noOptions, & .MuiAutocomplete-loading': { color: '#50656e' },
      '& .MuiAutocomplete-option': {
        minHeight: 42,
        '&[aria-selected="true"]': { bgcolor: 'rgba(220,181,47,.2)' },
        '&.Mui-focused': { bgcolor: 'rgba(118,13,25,.08)' },
      },
    },
  },
};

interface QuestionConfigurationDrawerProps {
  field: FormBuilderField;
  fieldIndex: number;
  open: boolean;
  onClose: () => void;
  onChange: (field: FormBuilderField) => void;
  previousFields: FormBuilderField[];
}

export default function QuestionConfigurationDrawer({
  field,
  fieldIndex,
  open,
  onClose,
  onChange,
  previousFields,
}: QuestionConfigurationDrawerProps) {
  const { data: countryOptions = [], isLoading: isCountryLoading } = useLocationCountryList({});
  const { data: stateOptions = [], isLoading: isStateLoading } = useLocationStateList({
    country: field.locationCountry?.name ?? '',
  });
  const update = (updates: Partial<FormBuilderField>) => onChange({ ...field, ...updates });
  const eligiblePreviousFields = previousFields.filter(
    (item) => item.id !== field.id && item.key !== field.key,
  );
  const condition = field.conditions?.[0];
  const conditionSource = eligiblePreviousFields.find((item) => item.id === condition?.field);

  const changeFieldType = (type: FormFieldType) => {
    update({
      type,
      options: optionFieldTypes.includes(type) ? (field.options ?? []) : undefined,
      isSwitchDesign: type === 'radio' ? Boolean(field.isSwitchDesign) : undefined,
      radioDesign: type === 'radio' ? (field.radioDesign ?? 'normal') : undefined,
      multiSelectDesign:
        type === 'multiselect' ? (field.multiSelectDesign ?? 'dropdown') : undefined,
      isCountryCodeEnabled: type === 'phone' ? Boolean(field.isCountryCodeEnabled) : undefined,
      locationCountry: type === 'state' || type === 'city' ? field.locationCountry : undefined,
      locationState: type === 'city' ? field.locationState : undefined,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { bgcolor: 'rgba(16, 4, 7, .55)' },
        },
        paper: {
          sx: {
            width: { xs: '100%', sm: '75vw' },
            maxWidth: '100vw',
            bgcolor: '#741722',
            backgroundImage: 'none',
            color: 'common.white',
            '& .MuiTypography-root, & .MuiFormControlLabel-label': { color: 'common.white' },
            '& .MuiIconButton-root': { color: 'common.white' },
            '& .MuiIconButton-colorError': { color: '#ff8f8f' },
            '& .MuiFormControlLabel-root.Mui-disabled .MuiFormControlLabel-label': {
              color: 'rgba(255,255,255,.35)',
            },
            '& .MuiSwitch-track': { bgcolor: 'rgba(255,255,255,.45)' },
            '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
          },
        },
      }}
    >
      {/* =====================================>
          UI for drawer heading
      ====================================== */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 2,
          px: { xs: 2, sm: 3 },
          py: 2,
          bgcolor: '#741722',
          borderBottom: '1px solid rgba(255,255,255,.2)',
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: 'primary.main', fontSize: 12 }}>
            QUESTION {fieldIndex + 1} · {field.type.toUpperCase()}
          </Typography>
          <Typography
            fontSize={{ xs: 17, sm: 20 }}
            fontWeight={700}
            sx={{ overflowWrap: 'anywhere' }}
          >
            {field.questionContent || `Untitled ${field.type} question`}
          </Typography>
          <Typography sx={{ mt: 0.25, fontSize: 12, opacity: 0.75 }}>
            Modify configuration
          </Typography>
        </Box>
        <IconButton aria-label="Close question configuration" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Stack spacing={3} sx={{ p: { xs: 2, sm: 3 }, pb: 10 }}>
        {/* =====================================>
            UI for question type and content
        ====================================== */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            select
            label="Field type"
            value={field.type}
            sx={{ minWidth: 190 }}
            onChange={(event) => changeFieldType(event.target.value as FormFieldType)}
          >
            {FORM_FIELD_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Field width"
            value={String(field.grid ?? 12)}
            sx={{ minWidth: 150 }}
            onChange={(event) => update({ grid: Number(event.target.value) as 4 | 6 | 12 })}
          >
            <MenuItem value="4">4 columns</MenuItem>
            <MenuItem value="6">6 columns</MenuItem>
            <MenuItem value="12">12 columns</MenuItem>
          </TextField>
          <TextField
            fullWidth
            required
            label="Question content"
            value={field.questionContent}
            onChange={(event) =>
              update({ questionContent: event.target.value, key: slugify(event.target.value) })
            }
          />
        </Stack>

        {field.type === 'phone' && (
          <TextField
            select
            label="Phone field type"
            value={field.isCountryCodeEnabled ? 'with-country-code' : 'without-country-code'}
            sx={{ maxWidth: 300 }}
            onChange={(event) =>
              update({ isCountryCodeEnabled: event.target.value === 'with-country-code' })
            }
          >
            <MenuItem value="with-country-code">Phone with country code</MenuItem>
            <MenuItem value="without-country-code">Phone without country code</MenuItem>
          </TextField>
        )}

        {(field.type === 'state' || field.type === 'city') && (
          <Box
            sx={{
              p: { xs: 2, sm: 2.5 },
              border: '1px solid rgba(255,255,255,.25)',
              borderRadius: 1.25,
              bgcolor: 'rgba(255,255,255,.04)',
            }}
          >
            <Typography fontWeight={700}>Location source</Typography>
            <Typography sx={{ mt: 0.25, mb: 2, fontSize: 13, opacity: 0.72 }}>
              Choose the parent location used to populate this field on the public form.
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2.5, md: 2 }}>
              <Box sx={{ width: '100%', minWidth: 0 }}>
                <InputLabel
                  required
                  sx={{ color: 'common.white', fontSize: 13, lineHeight: 1.2, mb: 1.25 }}
                >
                  Country
                </InputLabel>
                <Autocomplete
                  fullWidth
                  options={countryOptions}
                  loading={isCountryLoading}
                  value={
                    countryOptions.find((country) => country._id === field.locationCountry?.id) ??
                    null
                  }
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  onChange={(_, country) =>
                    update({
                      locationCountry: country
                        ? { id: country._id, name: country.name, slug: country.slug }
                        : undefined,
                      locationState: undefined,
                    })
                  }
                  sx={locationAutocompleteSx}
                  slotProps={locationAutocompleteSlotProps}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      variant="standard"
                      placeholder="Select country"
                      slotProps={{
                        input: {
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {isCountryLoading ? (
                                <CircularProgress color="inherit" size={18} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>
              {field.type === 'city' && (
                <Box sx={{ width: '100%', minWidth: 0, opacity: field.locationCountry ? 1 : 0.55 }}>
                  <InputLabel
                    required
                    sx={{ color: 'common.white', fontSize: 13, lineHeight: 1.2, mb: 1.25 }}
                  >
                    State
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    options={stateOptions}
                    loading={isStateLoading}
                    disabled={!field.locationCountry}
                    value={
                      stateOptions.find((state) => state._id === field.locationState?.id) ?? null
                    }
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    onChange={(_, state) =>
                      update({
                        locationState: state
                          ? { id: state._id, name: state.name, slug: state.slug }
                          : undefined,
                      })
                    }
                    sx={locationAutocompleteSx}
                    slotProps={locationAutocompleteSlotProps}
                    renderInput={(params) => (
                      <MuiTextField
                        {...params}
                        variant="standard"
                        placeholder={
                          field.locationCountry ? 'Select state' : 'Select country first'
                        }
                        slotProps={{
                          input: {
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isStateLoading ? (
                                  <CircularProgress color="inherit" size={18} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          },
                        }}
                      />
                    )}
                  />
                </Box>
              )}
            </Stack>
          </Box>
        )}

        {/* =====================================>
            UI for question subcontent and hint
        ====================================== */}
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Placeholder (optional)"
            value={field.placeholder ?? ''}
            placeholder="Uses question content when empty"
            onChange={(event) => update({ placeholder: event.target.value })}
          />
          <TextField
            fullWidth
            label="Subcontent (optional)"
            value={field.subcontent ?? ''}
            onChange={(event) => update({ subcontent: event.target.value })}
          />
          <HintEditor value={field.hint ?? ''} onChange={(hint) => update({ hint })} />
        </Stack>

        {/* =====================================>
            UI for choice-field display settings
        ====================================== */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {field.type === 'radio' && (
            <TextField
              select
              label="Radio view"
              value={field.radioDesign ?? 'normal'}
              sx={{ minWidth: 220 }}
              onChange={(event) =>
                update({
                  radioDesign: event.target.value as
                    | 'normal'
                    | 'combined-pill'
                    | 'separate-pill'
                    | 'card',
                  isSwitchDesign: event.target.value === 'separate-pill',
                })
              }
            >
              <MenuItem value="normal">Normal radio</MenuItem>
              <MenuItem value="combined-pill">Combined pill / switch</MenuItem>
              <MenuItem value="separate-pill">Separate pill / switch</MenuItem>
              <MenuItem value="card">Option cards</MenuItem>
            </TextField>
          )}
          {field.type === 'multiselect' && (
            <TextField
              select
              label="Multiselect view"
              value={field.multiSelectDesign ?? 'dropdown'}
              sx={{ minWidth: 220 }}
              onChange={(event) =>
                update({ multiSelectDesign: event.target.value as 'dropdown' | 'card' })
              }
            >
              <MenuItem value="dropdown">Dropdown</MenuItem>
              <MenuItem value="card">Selectable cards</MenuItem>
            </TextField>
          )}
          <FormControlLabel
            disabled={fieldIndex === 0}
            control={
              <Switch
                checked={Boolean(field.isInPreviousFieldBox)}
                onChange={(event) => update({ isInPreviousFieldBox: event.target.checked })}
              />
            }
            label="Place inside previous question box"
          />
        </Stack>

        {/* =====================================>
            UI for choice options
        ====================================== */}
        {optionFieldTypes.includes(field.type) && (
          <OptionsEditor
            options={field.options ?? []}
            onChange={(options) => update({ options })}
          />
        )}

        <Divider />
        <Typography variant="subtitle2" fontWeight={700}>
          Conditional visibility
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.75 }}>
          Show this question only when a previous question has the selected answer.
        </Typography>
        <FormControlLabel
          disabled={eligiblePreviousFields.length === 0}
          control={
            <Switch
              checked={Boolean(condition)}
              onChange={(event) => {
                if (!event.target.checked) {
                  update({ conditions: [] });
                  return;
                }
                const source = eligiblePreviousFields[eligiblePreviousFields.length - 1];
                update({
                  conditions: source
                    ? [
                      {
                        field: source.id,
                        operator: 'eq',
                        value: source.options?.[0]?.value ?? '',
                      },
                    ]
                    : [],
                });
              }}
            />
          }
          label="Depends on a previous answer"
        />
        {condition && (
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Previous question"
              value={condition.field}
              onChange={(event) => {
                const source = eligiblePreviousFields.find(
                  (item) => item.id === event.target.value,
                );
                update({
                  conditions: [
                    {
                      field: event.target.value,
                      operator: 'eq',
                      value: source?.options?.[0]?.value ?? '',
                    },
                  ],
                });
              }}
            >
              {eligiblePreviousFields.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.questionContent || 'Untitled question'}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select={Boolean(conditionSource?.options?.length)}
              fullWidth
              label="Answer must equal"
              value={condition.value}
              onChange={(event) =>
                update({ conditions: [{ ...condition, value: event.target.value }] })
              }
            >
              {(conditionSource?.options ?? []).map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        )}

        {/* =====================================>
            UI for validation rules
        ====================================== */}
        <Divider />
        <Typography variant="subtitle2" fontWeight={700}>
          Validation rules
        </Typography>
        <Stack spacing={1.5}>
          {field.validationRules.map((rule) => (
            <Stack key={rule.id} direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
              <TextField
                select
                label="Rule"
                value={rule.type}
                sx={{ minWidth: 170 }}
                onChange={(event) =>
                  update({
                    validationRules: field.validationRules.map((item) =>
                      item.id === rule.id
                        ? { ...item, type: event.target.value as ValidationRuleType }
                        : item,
                    ),
                  })
                }
              >
                {validationTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              {rule.type !== 'required' && (
                <TextField
                  label="Value"
                  value={rule.value ?? ''}
                  onChange={(event) =>
                    update({
                      validationRules: field.validationRules.map((item) =>
                        item.id === rule.id ? { ...item, value: event.target.value } : item,
                      ),
                    })
                  }
                />
              )}
              <TextField
                fullWidth
                label="Error message (optional)"
                value={rule.message ?? ''}
                onChange={(event) =>
                  update({
                    validationRules: field.validationRules.map((item) =>
                      item.id === rule.id ? { ...item, message: event.target.value } : item,
                    ),
                  })
                }
              />
              <IconButton
                aria-label="Delete validation rule"
                color="error"
                onClick={() =>
                  update({
                    validationRules: field.validationRules.filter((item) => item.id !== rule.id),
                  })
                }
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          ))}
          <Button
            startIcon={<AddIcon />}
            sx={{ alignSelf: 'flex-start' }}
            onClick={() =>
              update({
                validationRules: [
                  ...field.validationRules,
                  { id: uid('rule'), type: 'required', message: '' },
                ],
              })
            }
          >
            Add validation
          </Button>
        </Stack>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            position: 'sticky',
            bottom: 16,
            alignSelf: 'flex-end',
            minWidth: 150,
            bgcolor: 'primary.main',
            color: '#10212b',
          }}
        >
          Done
        </Button>
      </Stack>
    </Drawer>
  );
}
