'use client';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';

import { ChoiceControl, HintCallout } from './FormPreviewChoiceControl';
import { FormBuilderField, FormInputVariant } from './types';

import 'react-international-phone/style.css';

const choiceTypes = ['radio', 'select', 'multiselect'] as const;

const isChoiceField = (field: FormBuilderField) =>
  choiceTypes.includes(field.type as (typeof choiceTypes)[number]);

export function groupPreviewFields(fields: FormBuilderField[]) {
  return fields.reduce<{ field: FormBuilderField; nestedFields: FormBuilderField[] }[]>(
    (groups, field) => {
      if (field.isInPreviousFieldBox && groups.length) {
        groups[groups.length - 1].nestedFields.push(field);
      } else {
        groups.push({ field, nestedFields: [] });
      }
      return groups;
    },
    [],
  );
}

/* =====================================>
   UI for a preview field and its nested fields
====================================== */
export default function PreviewField({
  field,
  nestedFields,
  inputVariant,
}: {
  field: FormBuilderField;
  nestedFields: FormBuilderField[];
  inputVariant: FormInputVariant;
}) {
  const isChoice = isChoiceField(field);
  const needsBox = isChoice || nestedFields.length > 0;

  if (needsBox) {
    return (
      <Box
        sx={{
          height: '100%',
        }}
      >
        {isChoice ? (
          <>
            <QuestionCopy field={field} />
            <ChoiceControl field={field} inputVariant={inputVariant} />
          </>
        ) : (
          <BasicControl field={field} inputVariant={inputVariant} />
        )}
        {nestedFields.length > 0 && (
          <Stack spacing={3} mt={3}>
            {nestedFields.map((nestedField) =>
              isChoiceField(nestedField) ? (
                <Box key={nestedField.id}>
                  <QuestionCopy field={nestedField} />
                  <ChoiceControl field={nestedField} inputVariant={inputVariant} />
                  <HintCallout hint={nestedField.hint} />
                </Box>
              ) : (
                <Box key={nestedField.id}>
                  <BasicControl field={nestedField} inputVariant={inputVariant} />
                  <HintCallout hint={nestedField.hint} />
                </Box>
              ),
            )}
          </Stack>
        )}
        <HintCallout hint={field.hint} />
      </Box>
    );
  }

  return (
    <Box>
      <BasicControl field={field} inputVariant={inputVariant} />
      <HintCallout hint={field.hint} />
    </Box>
  );
}

/* =====================================>
   UI for question title and supporting copy
====================================== */
function QuestionCopy({ field }: { field: FormBuilderField }) {
  const required = field.validationRules.some((rule) => rule.type === 'required');

  return (
    <>
      <Typography
        sx={{
          color: '#10212b',
          fontSize: { xs: 15, sm: 17 },
          fontWeight: 700,
          lineHeight: 1.4,
          overflowWrap: 'anywhere',
        }}
      >
        {field.questionContent || 'Untitled question'}
        {required ? '*' : ''}
      </Typography>
      {field.subcontent && (
        <Typography
          sx={{
            color: '#50656e',
            fontSize: { xs: 14, sm: 15 },
            mt: 0.75,
            mb: 2.5,
            lineHeight: 1.5,
            overflowWrap: 'anywhere',
          }}
        >
          {field.subcontent}
        </Typography>
      )}
    </>
  );
}

/* =====================================>
   UI for text, checkbox, file and basic controls
====================================== */
function BasicControl({
  field,
  inputVariant,
}: {
  field: FormBuilderField;
  inputVariant: FormInputVariant;
}) {
  const placeholder = field.placeholder || '';
  const [numberValue, setNumberValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  if (field.type === 'checkbox') {
    return (
      <Box>
        <QuestionCopy field={field} />
        <FormControlLabel
          sx={{ mt: field.subcontent ? 0 : 1.5 }}
          control={<Checkbox sx={{ color: '#760d19', '&.Mui-checked': { color: '#760d19' } }} />}
          label={placeholder}
        />
      </Box>
    );
  }

  if (field.type === 'file') {
    return (
      <Box>
        <QuestionCopy field={field} />
        {placeholder && (
          <Typography sx={{ color: '#50656e', fontSize: 14, mb: 1.5 }}>{placeholder}</Typography>
        )}
        <Button variant="outlined" sx={{ color: '#760d19', borderColor: '#760d19' }}>
          Choose file
        </Button>
      </Box>
    );
  }

  if (field.type === 'country' || field.type === 'state' || field.type === 'city') {
    return (
      <Box>
        <QuestionCopy field={field} />
        <TextField
          select
          fullWidth
          value=""
          variant={inputVariant === 'underline' ? 'standard' : inputVariant}
          slotProps={{ input: { disableUnderline: inputVariant === 'underline' } }}
          sx={{
            mt: field.subcontent ? 0 : 2,
            borderBottom: inputVariant === 'underline' ? '1px solid #10212b' : 'none',
            pb: inputVariant === 'underline' ? 1.5 : 0,
          }}
        >
          <MenuItem value="" disabled>
            {placeholder || `Select ${field.type}`}
          </MenuItem>
        </TextField>
      </Box>
    );
  }

  if (field.type === 'phone' && field.isCountryCodeEnabled) {
    const isUnderline = inputVariant === 'underline';

    return (
      <Box>
        <QuestionCopy field={field} />
        <Box
          sx={{
            mt: field.subcontent ? 0 : 2,
            border: isUnderline ? 'none' : '1px solid #c9ccce',
            borderBottom: isUnderline ? '1px solid #10212b' : undefined,
            borderRadius: isUnderline ? 0 : '4px',
            bgcolor: inputVariant === 'filled' ? '#f5f3ed' : undefined,
            px: isUnderline ? 0 : 1.5,
            pb: 0,
            '& .react-international-phone-input-container': {
              width: '100%',
              alignItems: 'center',
              bgcolor: 'transparent',
            },
            '& .react-international-phone-input': {
              width: '100%',
              height: 40,
              border: '0 !important',
              borderRadius: '0 !important',
              bgcolor: 'transparent !important',
              color: '#10212b !important',
              fontSize: '16px !important',
              px: '8px !important',
              '&:focus': { outline: 'none' },
              '&::placeholder': { color: '#10212b', opacity: 1 },
            },
            '& .react-international-phone-country-selector-button': {
              height: 40,
              border: '0 !important',
              borderRadius: '0 !important',
              bgcolor: 'transparent !important',
              pl: '0 !important',
              pr: '4px !important',
              '&:hover': { bgcolor: 'transparent !important' },
            },
            '& .react-international-phone-country-selector-dropdown': {
              zIndex: 10,
            },
          }}
        >
          <PhoneInput
            defaultCountry="us"
            value={phoneValue}
            onChange={setPhoneValue}
            inputProps={{ placeholder }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <QuestionCopy field={field} />
      <TextField
        fullWidth
        multiline={field.type === 'textarea'}
        rows={field.type === 'textarea' ? 4 : undefined}
        type={field.type === 'phone' ? 'tel' : field.type}
        value={field.type === 'number' ? numberValue : undefined}
        onChange={
          field.type === 'number'
            ? (event) => {
              if (!event.target.value.includes('-')) setNumberValue(event.target.value);
            }
            : undefined
        }
        onKeyDown={
          field.type === 'number'
            ? (event) => {
              if (event.key === '-') event.preventDefault();
            }
            : undefined
        }
        placeholder={placeholder}
        variant={inputVariant === 'underline' ? 'standard' : inputVariant}
        slotProps={{
          input: { disableUnderline: inputVariant === 'underline' },
          htmlInput: field.type === 'number' ? { min: 0 } : undefined,
        }}
        sx={{
          mt: field.subcontent ? 0 : 2,
          borderBottom: inputVariant === 'underline' ? '1px solid #10212b' : 'none',
          pb: inputVariant === 'underline' ? 1.5 : 0,
          '& .MuiInputBase-root': {
            borderRadius: inputVariant === 'underline' ? 0 : '4px',
            bgcolor: inputVariant === 'filled' ? '#f5f3ed' : undefined,
          },
          '& .MuiInputBase-input': {
            p: inputVariant === 'underline' ? 0 : undefined,
            color: '#10212b',
            fontSize: 16,
          },
          '& .MuiInputBase-input::placeholder': { color: '#10212b', opacity: 1 },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#c9ccce' },
        }}
      />
    </Box>
  );
}
