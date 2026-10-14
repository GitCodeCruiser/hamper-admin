'use client';
import {
  ViewColumn as AddColAfterIcon,
  KeyboardArrowUp as AddRowAboveIcon,
  AddBox as AddRowBelowIcon,
  FormatAlignCenter as AlignCenterIcon,
  FormatAlignJustify as AlignJustifyIcon,
  FormatAlignLeft as AlignLeftIcon,
  FormatAlignRight as AlignRightIcon,
  FormatBold as BoldIcon,
  FormatListBulleted as BulletListIcon,
  // ── CMS feature icons ─────────────────────────────────────────
  ColorLens as CellBgColorIcon,
  FormatClear as ClearFormattingIcon,
  Terminal as CodeBlockIcon,
  Code as CodeIcon,
  ViewWeek as DeleteColIcon,
  IndeterminateCheckBox as DeleteRowIcon,
  DeleteOutline as DeleteTableIcon,
  FindReplace as FindReplaceIcon,
  FormatColorText as FontColorIcon,
  BorderColor as HighlightColorIcon,
  HorizontalRule as HorizontalRuleIcon,
  Image as ImageIcon,
  AddPhotoAlternate as ImageUrlIcon,
  FormatItalic as ItalicIcon,
  AddLink as LinkIcon,
  LinkOff as LinkOffIcon,
  CallMerge as MergeCellsIcon,
  FormatListNumbered as OrderedListIcon,
  FormatQuote as QuoteIcon,
  Redo as RedoIcon,
  CallSplit as SplitCellIcon,
  StrikethroughS as StrikethroughIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  // ── NEW icons ──────────────────────────────────────────────────
  TableChart as TableIcon,
  PlaylistAddCheck as TaskListIcon,
  ViewStream as ToggleHeaderColIcon,
  ViewHeadline as ToggleHeaderRowIcon,
  FormatUnderlined as UnderlineIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
// ── NEW tiptap extensions ──────────────────────────────────────────────────
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useDebounceFn } from 'ahooks';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

// ─────────────────────────────────────────────────────────────────────────────
// Existing styled components — UNCHANGED
// ─────────────────────────────────────────────────────────────────────────────

const EditorWrapper = styled(Box)(({ theme }) => ({
  border: `${CustomSize(1)} solid ${theme.palette.divider}`,
  borderRadius: CustomSize(8),
  backgroundColor: theme.palette.background.paper,
  overflow: 'hidden',
  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const ToolbarWrapper = styled(Stack)(({ theme }) => ({
  padding: CustomSize(8),
  borderBottom: `${CustomSize(1)} solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'light' ? '#fcfcfc' : theme.palette.background.default,
  flexWrap: 'wrap',
  gap: CustomSize(4),
}));

const StyledEditorContent = styled(EditorContent)(({ theme }) => ({
  padding: CustomSize(16),
  minHeight: CustomSize(800),
  cursor: 'text',
  '& .ProseMirror': {
    outline: 'none',
    minHeight: CustomSize(800),
    fontFamily: "'Google Sans', sans-serif",
    fontSize: CustomSize(14),
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    '& p': {
      margin: '0 0 1em 0',
    },
    '& ul, & ol': {
      padding: '0 1rem',
      margin: '1rem 1rem 1rem 0.4rem',
    },
    '& h1, & h2, & h3': {
      lineHeight: 1.1,
      margin: '1.5rem 0 0.5rem 0',
    },
    '& code': {
      backgroundColor: theme.palette.action.hover,
      padding: '0.2rem 0.4rem',
      borderRadius: '0.4rem',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
    },
    '& pre': {
      background: '#0D0D0D',
      color: '#FFF',
      fontFamily: 'JetBrainsMono, monospace',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      code: {
        color: 'inherit',
        padding: 0,
        background: 'none',
        fontSize: '0.8rem',
      },
    },
    '& blockquote': {
      paddingLeft: '1rem',
      borderLeft: `3px solid ${theme.palette.divider}`,
      margin: '1rem 0',
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      margin: '1rem 0',
      '&.has-text-align-center': {
        margin: '1rem auto',
        display: 'block',
      },
      '&.has-text-align-right': {
        margin: '1rem 0 1rem auto',
        display: 'block',
      },
    },
    '& .has-text-align-left': { textAlign: 'left' },
    '& .has-text-align-center': { textAlign: 'center' },
    '& .has-text-align-right': { textAlign: 'right' },
    '& .has-text-align-justify': { textAlign: 'justify' },
    '& .resizable-image': {
      position: 'relative',
      display: 'inline-block',
      lineHeight: 0,
      '& img': { display: 'block' },
      '&.ProseMirror-selectednode': {
        outline: `2px solid ${theme.palette.primary.main}`,
        '& .resize-handle': { display: 'block' },
      },
    },
    '& .resize-handle': {
      position: 'absolute',
      width: '12px',
      height: '12px',
      backgroundColor: theme.palette.primary.main,
      border: '2px solid white',
      borderRadius: '2px',
      display: 'none',
      zIndex: 10,
      '&:hover': { cursor: 'nwse-resize' },
      '&.resize-handle-nw': { top: '-6px', left: '-6px', cursor: 'nw-resize' },
      '&.resize-handle-ne': { top: '-6px', right: '-6px', cursor: 'ne-resize' },
      '&.resize-handle-sw': { bottom: '-6px', left: '-6px', cursor: 'sw-resize' },
      '&.resize-handle-se': { bottom: '-6px', right: '-6px', cursor: 'se-resize' },
    },

    // ── NEW: Table styles ────────────────────────────────────────
    '& table': {
      borderCollapse: 'collapse',
      width: '100%',
      margin: '1rem 0',
      tableLayout: 'fixed',
      overflowX: 'auto',
      display: 'block',
    },
    '& th, & td': {
      border: `1px solid ${theme.palette.divider}`,
      padding: '6px 10px',
      minWidth: '60px',
      verticalAlign: 'top',
      position: 'relative',
      '& > *': { marginBottom: 0 },
    },
    '& th': {
      backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.action.hover,
      fontWeight: 600,
    },
    '& .selectedCell:after': {
      zIndex: 2,
      position: 'absolute',
      content: '""',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: `${theme.palette.primary.main}22`,
      pointerEvents: 'none',
    },
    '& .column-resize-handle': {
      position: 'absolute',
      right: '-2px',
      top: 0,
      bottom: '-2px',
      width: '4px',
      backgroundColor: theme.palette.primary.main,
      cursor: 'col-resize',
    },

    // ── NEW: Task list styles ────────────────────────────────────
    '& ul[data-type="taskList"]': {
      listStyle: 'none',
      padding: 0,
      '& li': {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        margin: '4px 0',
        '& > label': {
          display: 'flex',
          alignItems: 'center',
          marginTop: '2px',
          flexShrink: 0,
          '& input[type="checkbox"]': {
            width: '16px',
            height: '16px',
            accentColor: theme.palette.primary.main,
            cursor: 'pointer',
          },
        },
        '& > div': { flex: 1, minWidth: 0 },
        '&[data-checked="true"] > div': {
          textDecoration: 'line-through',
          opacity: 0.6,
        },
      },
    },
  },
}));

const ToolbarButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  borderRadius: CustomSize(4),
  padding: CustomSize(6),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
}));

// ─────────────────────────────────────────────────────────────────────────────
// NEW: small styled components for the new controls only
// ─────────────────────────────────────────────────────────────────────────────

const CompactSelect = styled(Select)(({ theme }) => ({
  height: '32px',
  fontSize: '12px',
  fontFamily: "'Google Sans', sans-serif",
  color: theme.palette.text.secondary,
  '& .MuiSelect-select': { padding: '4px 8px' },
  '& fieldset': { border: 'none' },
  '&:hover': { backgroundColor: theme.palette.action.hover },
  borderRadius: CustomSize(4),
}));

const ColorInput = styled('input')({
  width: '28px',
  height: '28px',
  padding: 0,
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  '&::-webkit-color-swatch-wrapper': { padding: '2px' },
  '&::-webkit-color-swatch': { borderRadius: '3px', border: 'none' },
});

const WordCountBar = styled(Box)(({ theme }) => ({
  padding: `${CustomSize(4)} ${CustomSize(16)}`,
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: CustomSize(12),
  backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : theme.palette.background.default,
}));

// ─────────────────────────────────────────────────────────────────────────────
// Constants for new dropdowns
// ─────────────────────────────────────────────────────────────────────────────

const FONT_FAMILIES = [
  { label: 'Default', value: '' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Courier New', value: "'Courier New', monospace" },
  { label: 'Times New Roman', value: "'Times New Roman', serif" },
  { label: 'Trebuchet MS', value: "'Trebuchet MS', sans-serif" },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
];

const FONT_SIZES = [
  { label: '12', value: '12px' },
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '20', value: '20px' },
  { label: '24', value: '24px' },
  { label: '28', value: '28px' },
  { label: '32', value: '32px' },
  { label: '36', value: '36px' },
  { label: '48', value: '48px' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Extend TextStyle to support font-size (tiptap/extension-font-size alternative)
// ─────────────────────────────────────────────────────────────────────────────

import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
          ({ chain }: any) =>
            chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
          ({ chain }: any) =>
            chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    } as any;
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Props interface — UNCHANGED
// ─────────────────────────────────────────────────────────────────────────────

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  label?: string;
  placeholder?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// NEW: Custom TableCell / TableHeader — adds backgroundColor attribute for CMS
// ─────────────────────────────────────────────────────────────────────────────

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.backgroundColor) return {};
          return { style: `background-color: ${attributes.backgroundColor}` };
        },
      },
    };
  },
});

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
        renderHTML: (attributes: Record<string, any>) => {
          if (!attributes.backgroundColor) return {};
          return { style: `background-color: ${attributes.backgroundColor}` };
        },
      },
    };
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// NEW: FindReplacePopover — find & replace content in editor (CMS essential)
// ─────────────────────────────────────────────────────────────────────────────

interface FindReplacePopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  editor: Editor | null;
}

const FindReplacePopover = ({ anchorEl, onClose, editor }: FindReplacePopoverProps) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const handleFind = useCallback(() => {
    if (!findText || !editor) return;
    const text = editor.state.doc.textContent;
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = text.match(regex);
    setMatchCount(matches ? matches.length : 0);
  }, [findText, editor]);

  const handleReplaceAll = useCallback(() => {
    if (!findText || !editor) return;
    const html = editor.getHTML();
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const replaced = html.replace(regex, replaceText);
    editor.commands.setContent(replaced);
    setMatchCount(null);
    onClose();
  }, [findText, replaceText, editor, onClose]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{ sx: { p: 1.5, borderRadius: 1.5, width: 260 } }}
    >
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.disabled',
          mb: 1,
          display: 'block',
        }}
      >
        FIND &amp; REPLACE
      </Typography>
      <Stack spacing={1}>
        <TextField
          size="small"
          placeholder="Find…"
          value={findText}
          fullWidth
          onChange={(e) => {
            setFindText(e.target.value);
            setMatchCount(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleFind()}
          inputProps={{ style: { fontSize: 12, padding: '5px 8px' } }}
          InputLabelProps={{ style: { fontSize: 12 } }}
        />
        <TextField
          size="small"
          placeholder="Replace with…"
          value={replaceText}
          fullWidth
          onChange={(e) => setReplaceText(e.target.value)}
          inputProps={{ style: { fontSize: 12, padding: '5px 8px' } }}
        />
        {matchCount !== null && (
          <Typography sx={{ fontSize: 11, color: matchCount > 0 ? 'primary.main' : 'error.main' }}>
            {matchCount > 0
              ? `${matchCount} match${matchCount > 1 ? 'es' : ''} found`
              : 'No matches found'}
          </Typography>
        )}
        <Stack direction="row" spacing={0.75}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleFind}
            sx={{ fontSize: 11, py: 0.5, flex: 1, textTransform: 'none', minWidth: 0 }}
          >
            Find
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleReplaceAll}
            disabled={!findText || matchCount === 0}
            sx={{ fontSize: 11, py: 0.5, flex: 1, textTransform: 'none', minWidth: 0 }}
          >
            Replace All
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NEW: ImageUrlPopover — insert remote image by URL with alt text (SEO-friendly)
// ─────────────────────────────────────────────────────────────────────────────

interface ImageUrlPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  editor: Editor | null;
}

const ImageUrlPopover = ({ anchorEl, onClose, editor }: ImageUrlPopoverProps) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleInsert = useCallback(() => {
    if (!url.trim() || !editor) return;
    editor
      .chain()
      .focus()
      .setImage({ src: url.trim(), alt: alt.trim() || undefined } as any)
      .run();
    setUrl('');
    setAlt('');
    onClose();
  }, [url, alt, editor, onClose]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{ sx: { p: 1.5, borderRadius: 1.5, width: 280 } }}
    >
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.disabled',
          mb: 1,
          display: 'block',
        }}
      >
        INSERT IMAGE FROM URL
      </Typography>
      <Stack spacing={1}>
        <TextField
          size="small"
          placeholder="https://example.com/image.jpg"
          value={url}
          fullWidth
          onChange={(e) => {
            setUrl(e.target.value);
            setImgError(false);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
          inputProps={{ style: { fontSize: 12, padding: '5px 8px' } }}
        />
        <TextField
          size="small"
          placeholder="Alt text (SEO)"
          value={alt}
          fullWidth
          onChange={(e) => setAlt(e.target.value)}
          inputProps={{ style: { fontSize: 12, padding: '5px 8px' } }}
        />
        {url && !imgError && (
          <Box
            component="img"
            src={url}
            alt="preview"
            onError={() => setImgError(true)}
            sx={{
              maxHeight: 80,
              objectFit: 'contain',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              width: '100%',
            }}
          />
        )}
        {imgError && (
          <Typography sx={{ fontSize: 11, color: 'error.main' }}>
            Cannot load preview — check the URL.
          </Typography>
        )}
        <Button
          size="small"
          variant="contained"
          onClick={handleInsert}
          disabled={!url.trim()}
          sx={{ fontSize: 11, py: 0.5, textTransform: 'none' }}
        >
          Insert Image
        </Button>
      </Stack>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NEW: CellBgPickerPopover — preset swatches + custom color for table cells
// ─────────────────────────────────────────────────────────────────────────────

const CELL_BG_PRESETS = [
  '#ffffff',
  '#f8f9fa',
  '#e9ecef',
  '#dee2e6',
  '#fff3cd',
  '#ffeeba',
  '#d4edda',
  '#c3e6cb',
  '#cce5ff',
  '#b8daff',
  '#f8d7da',
  '#f5c6cb',
  '#e2d9f3',
  '#d1ecf1',
  '#fde8d8',
  '#1a1a1a',
];

interface CellBgPickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onApply: (color: string) => void;
  onClear: () => void;
}

const CellBgPickerPopover = ({ anchorEl, onClose, onApply, onClear }: CellBgPickerPopoverProps) => {
  const cellCustomColorRef = useRef<HTMLInputElement>(null);
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{ sx: { p: 1.25, borderRadius: 1.5 } }}
    >
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.disabled',
          mb: 0.75,
          display: 'block',
        }}
      >
        CELL BACKGROUND
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(8, 20px)', gap: '3px', mb: 0.75 }}>
        {CELL_BG_PRESETS.map((color) => (
          <Box
            key={color}
            onClick={() => {
              onApply(color);
              onClose();
            }}
            title={color}
            sx={{
              width: 20,
              height: 20,
              borderRadius: '3px',
              backgroundColor: color,
              border: '1.5px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              transition: 'transform 0.1s, box-shadow 0.1s',
              '&:hover': { transform: 'scale(1.25)', borderColor: 'primary.main', boxShadow: 1 },
            }}
          />
        ))}
      </Box>
      <Divider sx={{ my: 0.75 }} />
      <Stack direction="row" spacing={0.75} alignItems="center">
        <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>Custom</Typography>
        <Box
          sx={{
            position: 'relative',
            width: 24,
            height: 24,
            borderRadius: '3px',
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={() => cellCustomColorRef.current?.click()}
        >
          <input
            ref={cellCustomColorRef}
            type="color"
            defaultValue="#ffffff"
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
            onChange={(e) => {
              onApply(e.target.value);
              onClose();
            }}
          />
          <CellBgColorIcon
            sx={{
              fontSize: 14,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              color: 'text.secondary',
              pointerEvents: 'none',
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }} />
        <Button
          size="small"
          variant="text"
          color="error"
          onClick={() => {
            onClear();
            onClose();
          }}
          sx={{ fontSize: 10, py: 0.25, px: 0.75, textTransform: 'none', minWidth: 0 }}
        >
          Clear
        </Button>
      </Stack>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NEW: TablePickerPopover — hover grid + manual input for custom size
// ─────────────────────────────────────────────────────────────────────────────

const GRID_MAX = 10; // max grid cells shown in the hover picker

interface TablePickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onInsert: (rows: number, cols: number) => void;
}

const TablePickerPopover = ({ anchorEl, onClose, onInsert }: TablePickerPopoverProps) => {
  const theme = useTheme();
  const [hovered, setHovered] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });
  const [customRows, setCustomRows] = useState('');
  const [customCols, setCustomCols] = useState('');

  const handleGridClick = (rows: number, cols: number) => {
    onInsert(rows, cols);
    onClose();
  };

  const handleCustomInsert = () => {
    const r = parseInt(customRows, 10);
    const c = parseInt(customCols, 10);
    if (r > 0 && c > 0) {
      onInsert(r, c);
      onClose();
    }
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          p: 1.25,
          borderRadius: 1.5,
          boxShadow: theme.shadows[6],
          minWidth: 220,
        },
      }}
    >
      {/* Hover grid picker */}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.disabled',
          mb: 0.75,
          display: 'block',
        }}
      >
        SELECT SIZE
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_MAX}, 18px)`,
          gap: '2px',
          mb: 0.75,
        }}
        onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
      >
        {Array.from({ length: GRID_MAX * GRID_MAX }).map((_, idx) => {
          const row = Math.floor(idx / GRID_MAX) + 1;
          const col = (idx % GRID_MAX) + 1;
          const isActive = row <= hovered.rows && col <= hovered.cols;
          return (
            <Box
              key={idx}
              onMouseEnter={() => setHovered({ rows: row, cols: col })}
              onClick={() => handleGridClick(row, col)}
              sx={{
                width: 18,
                height: 18,
                borderRadius: '2px',
                border: '1px solid',
                borderColor: isActive ? 'primary.main' : 'divider',
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                opacity: isActive ? 0.85 : 0.35,
                cursor: 'pointer',
                transition: 'background-color 0.1s, border-color 0.1s',
                '&:hover': { opacity: 1 },
              }}
            />
          );
        })}
      </Box>

      {/* Live label */}
      <Typography
        sx={{ fontSize: 11, display: 'block', textAlign: 'center', color: 'text.secondary', mb: 1 }}
      >
        {hovered.rows > 0 && hovered.cols > 0
          ? `${hovered.rows} × ${hovered.cols} table`
          : 'Hover to select size'}
      </Typography>

      {/* Divider */}
      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mb: 1 }} />

      {/* Custom size inputs */}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.08em',
          color: 'text.disabled',
          mb: 0.75,
          display: 'block',
        }}
      >
        CUSTOM SIZE
      </Typography>
      <Stack direction="row" spacing={0.75} alignItems="center">
        <TextField
          size="small"
          placeholder="Rows"
          type="number"
          value={customRows}
          onChange={(e) => setCustomRows(e.target.value)}
          inputProps={{ min: 1, max: 50, style: { padding: '4px 6px', fontSize: 12 } }}
          sx={{ width: 72 }}
        />
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>×</Typography>
        <TextField
          size="small"
          placeholder="Cols"
          type="number"
          value={customCols}
          onChange={(e) => setCustomCols(e.target.value)}
          inputProps={{ min: 1, max: 20, style: { padding: '4px 6px', fontSize: 12 } }}
          sx={{ width: 72 }}
          onKeyDown={(e) => e.key === 'Enter' && handleCustomInsert()}
        />
        <Tooltip title="Insert table">
          <IconButton
            size="small"
            onClick={handleCustomInsert}
            disabled={!customRows || !customCols}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 1,
              width: 28,
              height: 28,
              '&:hover': { bgcolor: 'primary.dark' },
              '&:disabled': { bgcolor: 'action.disabledBackground' },
            }}
          >
            <TableIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Popover>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main component — existing logic UNCHANGED; new features appended
// ─────────────────────────────────────────────────────────────────────────────

const TiptapEditor = ({ content, onChange, label, placeholder }: TiptapEditorProps) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const ignoreNextSync = useRef(false);
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [redoAvailable, setRedoAvailable] = useState(false);

  // ── NEW state ──────────────────────────────────────────────────
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [selectedFontFamily, setSelectedFontFamily] = useState('');
  const [selectedFontSize, setSelectedFontSize] = useState('14px');
  const [tableAnchorEl, setTableAnchorEl] = useState<HTMLElement | null>(null);
  const [cellBgAnchorEl, setCellBgAnchorEl] = useState<HTMLElement | null>(null);
  const [findReplaceAnchorEl, setFindReplaceAnchorEl] = useState<HTMLElement | null>(null);
  const [imageUrlAnchorEl, setImageUrlAnchorEl] = useState<HTMLElement | null>(null);
  const textColorRef = useRef<HTMLInputElement>(null);
  const highlightColorRef = useRef<HTMLInputElement>(null);

  const { run: debouncedOnChange } = useDebounceFn(
    (html: string) => {
      onChange?.(html);
    },
    { wait: 500 },
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({
        allowBase64: true,
        // @ts-ignore
        resize: { enabled: true },
        HTMLAttributes: { style: 'max-width: 100%; height: auto; cursor: default;' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: placeholder || 'Write something...' }),

      // ── NEW extensions ─────────────────────────────────────────
      TextStyle,
      Color,
      FontSize,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Subscript,
      Superscript,
      Table.configure({ resizable: true }),
      TableRow,
      CustomTableHeader,
      CustomTableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }: { editor: Editor }) => {
      setUndoAvailable(Boolean(editor?.can()?.undo()));
      setRedoAvailable(Boolean(editor?.can()?.redo()));

      // ── NEW: word / char count ─────────────────────────────────
      const text = editor.state.doc.textContent;
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      setWordCount(words);
      setCharCount(text.length);

      ignoreNextSync.current = true;
      debouncedOnChange(editor.getHTML());
    },
  });

  // ─── Existing callbacks — UNCHANGED ─────────────────────────────────────

  const addLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          editor.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
    if (event.target) event.target.value = '';
  };

  useEffect(() => {
    if (!editor || content === undefined) return;
    if (ignoreNextSync.current) {
      ignoreNextSync.current = false;
      return;
    }
    const currentHTML = editor.getHTML();
    if (content !== currentHTML && !editor.isFocused) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  // ── NEW callbacks ──────────────────────────────────────────────

  const insertTable = useCallback(
    (rows: number, cols: number) => {
      editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    },
    [editor],
  );

  const handleFontFamilyChange = useCallback(
    (value: string) => {
      setSelectedFontFamily(value);
      if (value === '') {
        editor?.chain().focus().unsetFontFamily().run();
      } else {
        editor?.chain().focus().setFontFamily(value).run();
      }
    },
    [editor],
  );

  const handleFontSizeChange = useCallback(
    (value: string) => {
      setSelectedFontSize(value);
      (editor?.chain().focus() as any).setFontSize(value).run();
    },
    [editor],
  );

  // ── NEW: Cell background color — uses ProseMirror transaction directly ──────
  // updateAttributes() only works when the cursor is on the exact node type.
  // For table cells we must walk the selection and patch every selected cell node.
  const setCellBackground = useCallback(
    (color: string | null) => {
      if (!editor) return;
      const { state, dispatch } = editor.view;
      const { tr, selection } = state;
      let changed = false;

      // Collect all cell positions in the current selection
      state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
        if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            backgroundColor: color,
          });
          changed = true;
        }
      });

      // If nothing was selected (cursor just placed), target the wrapping cell
      if (!changed) {
        const resolved = state.doc.resolve(selection.from);
        for (let depth = resolved.depth; depth >= 0; depth--) {
          const node = resolved.node(depth);
          if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
            const pos = resolved.before(depth);
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              backgroundColor: color,
            });
            changed = true;
            break;
          }
        }
      }

      if (changed) dispatch(tr);
    },
    [editor],
  );

  const clearCellBackground = useCallback(() => setCellBackground(null), [setCellBackground]);

  if (!editor) return null;

  const isInTable = editor.isActive('table');

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: theme.palette.text.secondary,
            fontWeight: 500,
            fontFamily: "'Google Sans', sans-serif",
          }}
        >
          {label}
        </Typography>
      )}
      <EditorWrapper>
        {/* ── Toolbar ──────────────────────────────────────────────── */}
        <ToolbarWrapper direction="row">
          {/* ════════════════════════════════════════════════════════
              EXISTING TOOLBAR BUTTONS — NOT MODIFIED
          ════════════════════════════════════════════════════════ */}
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <BoldIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <ItalicIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strike"
          >
            <StrikethroughIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive('code')}
            title="Inline Code"
          >
            <CodeIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Heading 1"
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              H1
            </Typography>
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              H2
            </Typography>
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <QuoteIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <CodeBlockIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <BulletListIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <OrderedListIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <AlignLeftIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <AlignCenterIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <AlignRightIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            active={editor.isActive({ textAlign: 'justify' })}
            title="Align Justify"
          >
            <AlignJustifyIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={addLink}
            active={editor.isActive('link')}
            title="Add/Edit Link"
          >
            <LinkIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          {editor.isActive('link') && (
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
            >
              <LinkOffIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          )}
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={addImage}
            title="Upload Image"
          >
            <ImageIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <HorizontalRuleIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            title="Clear Formatting"
          >
            <ClearFormattingIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <Box sx={{ flexGrow: 1 }} />
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!undoAvailable}
            title="Undo"
          >
            <UndoIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>
          <ToolbarButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!redoAvailable}
            title="Redo"
          >
            <RedoIcon sx={{ fontSize: 20 }} />
          </ToolbarButton>

          {/* ════════════════════════════════════════════════════════
              NEW TOOLBAR ROW — appended after existing buttons
              Rendered on a new visual row thanks to flexWrap
          ════════════════════════════════════════════════════════ */}

          {/* Full-width separator to push new controls to next visual row */}
          <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider' }} />

          {/* Font Family */}
          <Tooltip title="Font Family">
            <CompactSelect
              value={selectedFontFamily}
              onChange={(e) => handleFontFamilyChange(e.target.value as string)}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              {FONT_FAMILIES.map((f) => (
                <MenuItem key={f.value} value={f.value} sx={{ fontSize: 13 }}>
                  {f.label}
                </MenuItem>
              ))}
            </CompactSelect>
          </Tooltip>

          {/* Font Size */}
          <Tooltip title="Font Size">
            <CompactSelect
              value={selectedFontSize}
              onChange={(e) => handleFontSizeChange(e.target.value as string)}
              sx={{ minWidth: 70 }}
            >
              {FONT_SIZES.map((s) => (
                <MenuItem key={s.value} value={s.value} sx={{ fontSize: 13 }}>
                  {s.label}
                </MenuItem>
              ))}
            </CompactSelect>
          </Tooltip>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Text Color */}
          <Tooltip title="Text Color">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => textColorRef.current?.click()}
              title="Text Color"
            >
              <FontColorIcon sx={{ fontSize: 20 }} />
              <ColorInput
                ref={textColorRef}
                type="color"
                defaultValue="#000000"
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              />
            </ToolbarButton>
          </Tooltip>

          {/* Highlight Color */}
          <Tooltip title="Highlight Color">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => highlightColorRef.current?.click()}
              active={editor.isActive('highlight')}
              title="Highlight Color"
            >
              <HighlightColorIcon sx={{ fontSize: 20 }} />
              <ColorInput
                ref={highlightColorRef}
                type="color"
                defaultValue="#FFFF00"
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                onChange={(e) =>
                  editor.chain().focus().setHighlight({ color: e.target.value }).run()
                }
              />
            </ToolbarButton>
          </Tooltip>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Subscript */}
          <Tooltip title="Subscript">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              active={editor.isActive('subscript')}
              title="Subscript"
            >
              <SubscriptIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          {/* Superscript */}
          <Tooltip title="Superscript">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              active={editor.isActive('superscript')}
              title="Superscript"
            >
              <SuperscriptIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Task List */}
          <Tooltip title="Task List">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              active={editor.isActive('taskList')}
              title="Task List"
            >
              <TaskListIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Insert Table — opens custom picker popover */}
          <Tooltip title="Insert Table">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => setTableAnchorEl(e.currentTarget)}
              active={isInTable || Boolean(tableAnchorEl)}
              title="Insert Table"
            >
              <TableIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          <TablePickerPopover
            anchorEl={tableAnchorEl}
            onClose={() => setTableAnchorEl(null)}
            onInsert={insertTable}
          />

          {/* Contextual table controls — only shown when cursor is inside a table */}
          {isInTable && (
            <>
              {/* Row controls */}
              <Tooltip title="Add Row Above">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                  title="Add Row Above"
                >
                  <AddRowAboveIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Add Row Below">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  title="Add Row Below"
                >
                  <AddRowBelowIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Delete Row">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().deleteRow().run()}
                  title="Delete Row"
                >
                  <DeleteRowIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>

              <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

              {/* Column controls */}
              <Tooltip title="Add Column Before">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                  title="Add Column Before"
                >
                  <AddColAfterIcon sx={{ fontSize: 20, transform: 'scaleX(-1)' }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Add Column After">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  title="Add Column After"
                >
                  <AddColAfterIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Delete Column">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                  title="Delete Column"
                >
                  <DeleteColIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>

              <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

              {/* Merge / Split */}
              <Tooltip title="Merge Cells">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().mergeCells().run()}
                  title="Merge Cells"
                >
                  <MergeCellsIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Split Cell">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().splitCell().run()}
                  title="Split Cell"
                >
                  <SplitCellIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>

              <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

              {/* Toggle header row / column */}
              <Tooltip title="Toggle Header Row">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                  title="Toggle Header Row"
                >
                  <ToggleHeaderRowIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
              <Tooltip title="Toggle Header Column">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
                  title="Toggle Header Column"
                >
                  <ToggleHeaderColIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>

              <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

              {/* Cell background color */}
              <Tooltip title="Cell Background Color">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={(e) => setCellBgAnchorEl(e.currentTarget)}
                  title="Cell Background Color"
                  active={Boolean(cellBgAnchorEl)}
                >
                  <CellBgColorIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>

              <CellBgPickerPopover
                anchorEl={cellBgAnchorEl}
                onClose={() => setCellBgAnchorEl(null)}
                onApply={setCellBackground}
                onClear={clearCellBackground}
              />

              <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

              {/* Delete Table */}
              <Tooltip title="Delete Table">
                <ToolbarButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  title="Delete Table"
                  sx={{ color: 'error.main' }}
                >
                  <DeleteTableIcon sx={{ fontSize: 20 }} />
                </ToolbarButton>
              </Tooltip>
            </>
          )}

          {/* ════════════════════════════════════════════════════════
              CMS TOOLBAR ROW 3 — Find & Replace + Image URL insert
          ════════════════════════════════════════════════════════ */}
          <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider' }} />

          {/* Heading 3 (was missing) */}
          <Tooltip title="Heading 3">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              active={editor.isActive('heading', { level: 3 })}
              title="Heading 3"
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                H3
              </Typography>
            </ToolbarButton>
          </Tooltip>

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Insert Image from URL */}
          <Tooltip title="Insert Image from URL">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => setImageUrlAnchorEl(e.currentTarget)}
              active={Boolean(imageUrlAnchorEl)}
              title="Insert Image from URL"
            >
              <ImageUrlIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          <ImageUrlPopover
            anchorEl={imageUrlAnchorEl}
            onClose={() => setImageUrlAnchorEl(null)}
            editor={editor}
          />

          <Box sx={{ width: '1px', height: '24px', bgcolor: 'divider', mx: 0.5 }} />

          {/* Find & Replace */}
          <Tooltip title="Find & Replace">
            <ToolbarButton
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => setFindReplaceAnchorEl(e.currentTarget)}
              active={Boolean(findReplaceAnchorEl)}
              title="Find & Replace"
            >
              <FindReplaceIcon sx={{ fontSize: 20 }} />
            </ToolbarButton>
          </Tooltip>

          <FindReplacePopover
            anchorEl={findReplaceAnchorEl}
            onClose={() => setFindReplaceAnchorEl(null)}
            editor={editor}
          />
        </ToolbarWrapper>

        {/* Editor content — UNCHANGED */}
        <StyledEditorContent editor={editor} />

        {/* ── NEW: Word / Character count bar ─────────────────────── */}
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

export default TiptapEditor;
