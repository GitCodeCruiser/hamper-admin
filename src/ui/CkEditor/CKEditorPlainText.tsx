'use client';

import { Box, Typography, styled, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { ComponentType, Suspense } from 'react';

import type { CKEditorPlainTextBlockProps } from './CKEditorPlainTextBlock';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

// SSR-safe dynamic import for plain text editor block
const CKEditorPlainTextBlock = dynamic(() => import('./CKEditorPlainTextBlock'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        minHeight: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.disabled',
        fontSize: 14,
        fontFamily: "'Lato', sans-serif",
      }}
    >
      Loading plain text editor…
    </Box>
  ),
}) as ComponentType<CKEditorPlainTextBlockProps>;

const PlainEditorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'editorMinHeight',
})<{ editorMinHeight: number }>(({ theme, editorMinHeight }) => ({
  border: `${CustomSize(1)} solid ${theme.palette.divider}`,
  borderRadius: CustomSize(8),
  backgroundColor: theme.palette.background.paper,
  overflow: 'visible',
  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },

  '& .ck.ck-editor': {
    width: '100%',
    fontFamily: "'Lato', sans-serif",
    overflow: 'visible !important',
  },
  '& .ck.ck-editor__main': {
    backgroundColor: 'transparent',
    overflow: 'visible !important',
  },
  '& .ck.ck-editor__editable': {
    border: 'none !important',
    boxShadow: 'none !important',
    padding: `${CustomSize(16)} !important`,
    minHeight: `${CustomSize(editorMinHeight)} !important`,
    overflow: 'visible !important',
    fontFamily: "'Lato', sans-serif !important",
    fontSize: `${CustomSize(14)} !important`,
    lineHeight: '1.6 !important',
    color: `${theme.palette.text.primary} !important`,
    backgroundColor: 'transparent !important',
  },
  '& .ck .ck-placeholder::before': {
    color: `${theme.palette.text.disabled} !important`,
    fontFamily: "'Lato', sans-serif",
  },
  '& .ck.ck-editor__editable.ck-focused': {
    outline: 'none !important',
    boxShadow: 'none !important',
    borderColor: 'transparent !important',
  },
  '& .ck.ck-powered-by': {
    display: 'none !important',
  },
}));

export interface CKEditorPlainTextProps {
  content?: string;
  onChange?: (text: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
}

const CKEditorPlainText = ({
  content,
  onChange,
  label,
  placeholder,
  minHeight = 150,
  disabled = false,
}: CKEditorPlainTextProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontFamily: "'Lato', sans-serif",
          }}
        >
          {label.length > 0 ? label : ''}
        </Typography>
      )}

      <PlainEditorWrapper editorMinHeight={minHeight}>
        <Suspense>
          <CKEditorPlainTextBlock
            content={content}
            onChange={onChange}
            placeholder={placeholder}
            minHeight={minHeight}
            disabled={disabled}
          />
        </Suspense>
      </PlainEditorWrapper>
    </Box>
  );
};

export default CKEditorPlainText;
