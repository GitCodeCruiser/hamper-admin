'use client';

import { Box, Typography, styled, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useCallback, useMemo, useState } from 'react';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

// ─── SSR-safe dynamic import ───────────────────────────────────────────────
// CKEditor accesses browser globals (window, document) at module level,
// so we must never let Next.js server-render it.
const CKEditorBlock = dynamic(() => import('./Ckeditorblock'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        minHeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.disabled',
        fontSize: 14,
        // fontFamily: "'Google Sans', sans-serif",
        fontFamily: "'Lato', sans-serif",
      }}
    >
      Loading editor…
    </Box>
  ),
});

// ─── Styled wrappers — identical to Tiptap version ────────────────────────
type TEditorBackgroundType = '#6B0F1A' | 'white';
const EditorWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'editorMinHeight' && prop !== 'editorBackground',
})<{ editorMinHeight: number; editorBackground?: TEditorBackgroundType }>(
  ({ theme, editorMinHeight, editorBackground }) => ({
    border: `${CustomSize(1)} solid ${theme.palette.divider}`,
    borderRadius: CustomSize(8),
    backgroundColor: editorBackground,
    overflow: 'visible',
    transition: 'border-color 0.2s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },

    // ── CKEditor toolbar & content overrides ──────────────────────────────
    '& .ck.ck-editor': {
      width: '100%',
      // fontFamily: "'Google Sans', sans-serif",
      fontFamily: "'Lato', sans-serif",
      overflow: 'visible !important',
    },
    // CKEditor's built-in StickyPanel handles toolbar positioning via
    // ui.viewportOffset.top in the editor config (Ckeditorblock.tsx).
    // No CSS sticky needed here — it would conflict with the StickyPanel plugin.
    '& .ck.ck-editor__top': {
      zIndex: '9999 !important',
    },
    '& .ck.ck-toolbar': {
      border: 'none !important',
      borderBottom: `${CustomSize(1)} solid ${theme.palette.divider} !important`,
      borderTopLeftRadius: `${CustomSize(7)} !important`,
      borderTopRightRadius: `${CustomSize(7)} !important`,
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
      backgroundColor:
        theme.palette.mode === 'light'
          ? '#fcfcfc !important'
          : `${theme.palette.background.default} !important`,
      padding: `${CustomSize(8)} !important`,
      flexWrap: 'wrap !important', // ← already there
      gap: `${CustomSize(4)} !important`,
    },
    '& .ck.ck-toolbar__items': {
      flexWrap: 'wrap !important',
    },
    '& .ck.ck-toolbar__separator': {
      backgroundColor: `${theme.palette.divider} !important`,
    },
    '& .ck.ck-button:not(.ck-insert-table-dropdown-grid-box)': {
      borderRadius: `${CustomSize(4)} !important`,
      padding: `${CustomSize(6)} !important`,
      color: `${theme.palette.text.secondary} !important`,
      transition: 'background 0.15s, color 0.15s',
    },
    '& .ck.ck-button:not(.ck-insert-table-dropdown-grid-box):hover:not(.ck-disabled)': {
      backgroundColor: `${theme.palette.action.hover} !important`,
      color: `${theme.palette.primary.main} !important`,
    },
    '& .ck.ck-button:not(.ck-insert-table-dropdown-grid-box).ck-on': {
      backgroundColor: `${theme.palette.action.selected} !important`,
      color: `${theme.palette.primary.main} !important`,
    },
    '& .ck.ck-button.ck-button-clear-formatting': {
      backgroundColor: ' #6B0F1A !important',
      color: '#fff !important',
      fontWeight: '600 !important',
      paddingLeft: '12px !important',
      paddingRight: '12px !important',
      marginLeft: '4px !important',
    },
    '& .ck.ck-button.ck-button-clear-formatting:hover:not(.ck-disabled)': {
      backgroundColor: '#ed6f70 !important',
      color: '#fff !important',
    },
    '& .ck.ck-button.ck-button-insert-reviewed-by': {
      backgroundColor: '#dfb025 !important',
      color: '#000000 !important',
      fontWeight: '600 !important',
      paddingLeft: '12px !important',
      paddingRight: '12px !important',
      marginLeft: '4px !important',
    },
    '& .ck.ck-button.ck-button-insert-reviewed-by:hover:not(.ck-disabled)': {
      backgroundColor: '#f3c53c !important',
      color: '#000000 !important',
    },
    '& .ck.ck-button.ck-button-insert-recommendation': {
      backgroundColor: '#00171f !important',
      color: '#ffffff !important',
      fontWeight: '600 !important',
      paddingLeft: '12px !important',
      paddingRight: '12px !important',
      marginLeft: '4px !important',
    },
    '& .ck.ck-button.ck-button-insert-recommendation:hover:not(.ck-disabled)': {
      backgroundColor: '#002e3e !important',
      color: '#ffffff !important',
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
      // fontFamily: "'Google Sans', sans-serif !important",
      fontFamily: "'Lato', sans-serif !important",
      fontSize: `${CustomSize(14)} !important`,
      lineHeight: '1.6 !important',
      color: `${theme.palette.text.primary} !important`,
      backgroundColor: 'transparent !important',
    },

    // ── Prose content styles inside CK editable (mirrors Tiptap) ──────────
    '& .ck.ck-editor__editable p': {
      margin: '0',
    },
    '& .ck.ck-editor__editable ul, & .ck.ck-editor__editable ol': {
      padding: '0 1rem',
      margin: '1rem 1rem 1rem 0.4rem',
    },
    '& .ck.ck-editor__editable h1, & .ck.ck-editor__editable h2, & .ck.ck-editor__editable h3': {
      lineHeight: 1.1,
      margin: '1.5rem 0 0.5rem 0',
      color: theme.palette.text.primary,
    },
    '& .ck.ck-editor__editable code': {
      backgroundColor: theme.palette.action.hover,
      padding: '0.2rem 0.4rem',
      borderRadius: '0.4rem',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      color: theme.palette.text.primary,
    },
    '& .ck.ck-editor__editable pre': {
      background: '#0D0D0D',
      color: '#FFF',
      fontFamily: 'JetBrainsMono, monospace',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
    },
    '& .ck.ck-editor__editable blockquote': {
      paddingLeft: '1rem',
      borderLeft: `3px solid ${theme.palette.divider}`,
      margin: '1rem 0',
      fontStyle: 'italic',
    },
    '& .ck.ck-editor__editable a': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    '& .ck.ck-editor__editable img': {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      margin: '1rem 0',
    },
    '& .ck.ck-editor__editable iframe': {
      maxWidth: '100%',
      borderRadius: '8px',
      margin: '1rem 0',
      minHeight: '300px',
    },
    '& .ck.ck-editor__editable figure.media': {
      margin: '1rem 0',
      display: 'block',
      width: '100%',
    },
    '& .ck.ck-editor__editable .width-100': {
      width: '100% !important',
    },
    '& .ck.ck-editor__editable .width-75': {
      width: '75% !important',
      margin: '1rem auto',
      display: 'block',
    },
    '& .ck.ck-editor__editable .width-50': {
      width: '50% !important',
      margin: '1rem auto',
      display: 'block',
    },
    '& .ck.ck-editor__editable .width-25': {
      width: '25% !important',
      margin: '1rem auto',
      display: 'block',
    },
    // Table styles
    '& .ck.ck-editor__editable table': {
      borderCollapse: 'collapse',
      width: '100%',
      margin: '1rem 0',
      tableLayout: 'fixed',
    },
    '& .ck.ck-editor__editable th, & .ck.ck-editor__editable td': {
      border: `1px solid ${theme.palette.divider}`,
      padding: '6px 10px',
      minWidth: '60px',
      verticalAlign: 'top',
    },
    '& .ck.ck-editor__editable th': {
      backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.action.hover,
      fontWeight: 600,
    },
    // Dropdowns, dialogs
    '& .ck.ck-dropdown__panel, & .ck.ck-balloon-panel': {
      borderColor: `${theme.palette.divider} !important`,
      borderRadius: `${CustomSize(8)} !important`,
      backgroundColor: `${theme.palette.background.paper} !important`,
      boxShadow: theme.shadows[4],
      zIndex: '9999 !important',
    },
    '& .ck.ck-dropdown__panel .ck-list': {
      maxHeight: '250px !important',
      overflowY: 'auto !important',
    },
    '& .ck.ck-dropdown__panel .ck-list::-webkit-scrollbar': {
      width: '6px',
    },
    '& .ck.ck-dropdown__panel .ck-list::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '& .ck.ck-dropdown__panel .ck-list::-webkit-scrollbar-thumb': {
      background: theme.palette.divider,
      borderRadius: '4px',
    },
    '& .ck.ck-dropdown__panel .ck-list::-webkit-scrollbar-thumb:hover': {
      background: theme.palette.text.disabled,
    },
    '& .ck.ck-list__item .ck-button': {
      color: `${theme.palette.text.primary} !important`,
    },
    '& .ck.ck-list__item .ck-button:hover': {
      backgroundColor: `${theme.palette.action.hover} !important`,
    },
    // Placeholder
    '& .ck .ck-placeholder::before': {
      color: `${theme.palette.text.disabled} !important`,
      // fontFamily: "'Google Sans', sans-serif",
      fontFamily: "'Lato', sans-serif",
    },
    // Focus ring
    '& .ck.ck-editor__editable.ck-focused': {
      outline: 'none !important',
      boxShadow: 'none !important',
      borderColor: 'transparent !important',
    },
    '& .ck.ck-powered-by': {
      display: 'none !important',
    },
  }),
);

const WordCountBar = styled(Box)(({ theme }) => ({
  padding: `${CustomSize(4)} ${CustomSize(16)}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: CustomSize(12),
  backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : theme.palette.background.default,
  borderBottomLeftRadius: CustomSize(7),
  borderBottomRightRadius: CustomSize(7),
}));

// ─── Props ─────────────────────────────────────────────────────────────────
export interface CKEditorRichTextProps {
  content?: string;
  onChange?: (html: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
  editorBackground?: 'burgundy' | 'white';
}

// ─── Main component ────────────────────────────────────────────────────────

const CKEditorRichText = ({
  content,
  onChange,
  label,
  placeholder,
  minHeight = 800,
  disabled = false,
  editorBackground = 'white',
}: CKEditorRichTextProps) => {
  const theme = useTheme();
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const optimizedEditorBackground: TEditorBackgroundType = useMemo(() => {
    return editorBackground === 'burgundy' ? '#6B0F1A' : 'white';
  }, [editorBackground]);

  const handleChange = useCallback(
    (html: string) => {
      // Word / char count (mirrors Tiptap onUpdate logic)
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      setWordCount(words);
      setCharCount(text.length);
      onChange?.(html);
    },
    [onChange],
  );

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: theme.palette.text.secondary,
            fontWeight: 500,
            // fontFamily: "'Google Sans', sans-serif",
            fontFamily: "'Lato', sans-serif",
          }}
        >
          {label}
        </Typography>
      )}

      <EditorWrapper editorMinHeight={minHeight} editorBackground={optimizedEditorBackground}>
        {/* CKEditor — loaded client-side only via dynamic import */}
        <Suspense>
          <CKEditorBlock
            content={content}
            onChange={handleChange}
            placeholder={placeholder}
            minHeight={minHeight}
            disabled={disabled}
            isDark={theme.palette.mode === 'dark'}
            primaryColor={theme.palette.primary.main}
          />
        </Suspense>

        {/* Word / character count bar — identical to Tiptap version */}
        <WordCountBar>
          <Typography variant="caption" color="text.disabled">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {charCount} {charCount === 1 ? 'character' : 'characters'}
          </Typography>
        </WordCountBar>
      </EditorWrapper>
    </Box>
  );
};

export default CKEditorRichText;
