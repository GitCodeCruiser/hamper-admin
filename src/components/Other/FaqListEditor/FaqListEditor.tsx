'use client';

import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, IconButton, InputLabel, Typography } from '@mui/material';

import InputFieldCommon from '@/ui/CommonInput/CommonInput';

export type TFaqRow = { question: string; answer: string };

type TFaqListEditorProps = {
  value: TFaqRow[];
  onChange: (rows: TFaqRow[]) => void;
  /** Shown under the heading, e.g. which placeholders can be used */
  helperText?: string;
};

/** Add / edit / remove question + answer rows. Empty rows are dropped by the backend on save. */
const FaqListEditor = ({ value, onChange, helperText }: TFaqListEditorProps) => {
  const rows = value ?? [];

  const update = (index: number, patch: Partial<TFaqRow>) =>
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));

  return (
    <Box>
      {helperText ? (
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', mb: 2 }}>
          {helperText}
        </Typography>
      ) : null}

      {rows.map((row, index) => (
        <Box
          // Rows have no id; the index is stable because rows are only added at the end or removed
          key={index}
          sx={{
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            p: 2,
            mb: 2,
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <InputLabel sx={{ color: '#FFFFFF' }}>Question {index + 1}</InputLabel>
            <IconButton
              aria-label={`Remove FAQ ${index + 1}`}
              size="small"
              sx={{ color: '#FFFFFF' }}
              onClick={() => onChange(rows.filter((_, i) => i !== index))}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Box>
          <InputFieldCommon
            labelName="Question"
            placeholder="e.g. Who operates [TAIL]?"
            value={row.question}
            onChange={(e) => update(index, { question: e.target.value })}
          />
          <InputLabel sx={{ color: '#FFFFFF', mt: 2 }}>Answer {index + 1}</InputLabel>
          <InputFieldCommon
            labelName="Answer"
            placeholder="Write the answer"
            multiline
            rows={4}
            value={row.answer}
            onChange={(e) => update(index, { answer: e.target.value })}
          />
        </Box>
      ))}

      <Button
        startIcon={<AddIcon />}
        variant="outlined"
        onClick={() => onChange([...rows, { question: '', answer: '' }])}
        sx={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
      >
        Add FAQ
      </Button>
    </Box>
  );
};

export default FaqListEditor;
