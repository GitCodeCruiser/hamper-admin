'use client';

/**
 * CKEditorBlock.tsx
 *
 * SSR-unsafe — only imported via dynamic(() => import('./CKEditorBlock'), { ssr: false })
 *
 * ─── Packages ────────────────────────────────────────────────────────────────
 *   npm install ckeditor5 @ckeditor/ckeditor5-react
 *
 * ─── Global CSS (app/layout.tsx or globals.css) ───────────────────────────
 *   import 'ckeditor5/ckeditor5.css';
 *
 * ─── Image Upload Strategy ───────────────────────────────────────────────────
 *   CKEditor needs a real upload adapter to handle file uploads.
 *   We implement a custom Base64UploadAdapter so images upload immediately
 *   from the computer without needing a backend endpoint.
 *   Images are stored as base64 strings inside the HTML output.
 *
 *   If you later want server-side storage, replace Base64UploadAdapter
 *   with SimpleUploadAdapter and set simpleUpload.uploadUrl in the config.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  Alignment,
  AutoImage,
  AutoLink,
  AutoMediaEmbed,
  BlockQuote,
  Bold,
  ButtonView,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlComment,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  UpcastWriter,
} from 'ckeditor5';
import { useCallback, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Base64 Upload Adapter
// Converts the selected file to a base64 data URL so it can be embedded
// directly into the HTML without needing a server upload endpoint.
// ─────────────────────────────────────────────────────────────────────────────

class Base64UploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ default: reader.result as string });
          };
          reader.onerror = (err) => {
            reject(err);
          };
          reader.readAsDataURL(file);
        }),
    );
  }

  abort() {
    // Nothing to abort for FileReader
  }
}

// CKEditor plugin that registers the adapter
function Base64UploaderPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new Base64UploadAdapter(loader);
  };
}

// Custom plugin to sanitize pasted HTML content by removing styles/classes/attributes
function PasteSanitizerPlugin(editor: any) {
  editor.plugins.get('ClipboardPipeline').on(
    'inputTransformation',
    (evt: any, data: any) => {
      const writer = new UpcastWriter(editor.editing.view.document);

      const sanitizeNode = (node: any) => {
        if (node.is('element')) {
          const attributeKeys = Array.from(node.getAttributeKeys()) as string[];

          // Explicitly allowed attributes per element type
          let allowedAttributes: string[] = [];

          if (node.name === 'a') {
            allowedAttributes = ['href', 'target', 'rel', 'download'];
          } else if (node.name === 'img') {
            allowedAttributes = [
              'src',
              'alt',
              'width',
              'height',
              'srcset',
              'sizes',
              'style',
              'class',
            ];
          } else if (['table', 'thead', 'tbody', 'tr', 'th', 'td'].includes(node.name)) {
            allowedAttributes = ['colspan', 'rowspan'];
          } else if (node.name === 'iframe') {
            allowedAttributes = [
              'src',
              'width',
              'height',
              'frameborder',
              'allow',
              'allowfullscreen',
              'title',
              'scrolling',
              'style',
              'class',
              'loading',
              'referrerpolicy',
            ];
          } else if (node.name === 'figure') {
            allowedAttributes = ['class', 'style'];
          } else if (node.name === 'oembed') {
            allowedAttributes = ['url'];
          } else if (node.name === 'div') {
            allowedAttributes = ['class', 'style', 'data-oembed-url'];
          } else if (['video', 'audio'].includes(node.name)) {
            allowedAttributes = ['src', 'controls', 'width', 'height', 'autoplay', 'loop', 'muted'];
          } else if (node.name === 'source') {
            allowedAttributes = ['src', 'type'];
          }

          // Strip any attribute not explicitly allowed
          for (const attr of attributeKeys) {
            if (!allowedAttributes.includes(attr)) {
              writer.removeAttribute(attr, node);
            }
          }
        }

        // Recursively clean children (both elements and document fragments have children)
        if (node.getChildren) {
          for (const child of node.getChildren()) {
            sanitizeNode(child);
          }
        }
      };

      sanitizeNode(data.content);
    },
    { priority: 'highest' },
  );
}

// Custom plugin to add a text button that clears all formatting
function ClearFormattingPlugin(editor: any) {
  editor.ui.componentFactory.add('clearFormatting', (locale: any) => {
    const view = new ButtonView(locale);

    view.set({
      label: 'Clear Formatting',
      withText: true,
      tooltip: true,
      class: 'ck-button-clear-formatting',
    });

    view.on('execute', () => {
      // 1) Built-in remove format (handles bold, italic, etc.)
      editor.execute('removeFormat');

      // 2) Force-strip any GeneralHtmlSupport or leftover style/class attributes
      editor.model.change((writer: any) => {
        const selection = editor.model.document.selection;
        const ranges = selection.getRanges();

        for (const range of ranges) {
          for (const item of range.getItems()) {
            const attrs = Array.from(item.getAttributeKeys()) as string[];
            for (const attr of attrs) {
              if (
                attr.startsWith('html') ||
                attr === 'style' ||
                attr === 'class' ||
                attr === 'fontFamily' ||
                attr === 'fontSize' ||
                attr === 'fontColor' ||
                attr === 'fontBackgroundColor'
              ) {
                // Preserve link attributes
                if (attr === 'htmlA') continue;
                writer.removeAttribute(attr, item);
              }
            }
          }
        }

        const blocks = Array.from(selection.getSelectedBlocks());
        for (const block of blocks) {
          const attrs = Array.from((block as any).getAttributeKeys()) as string[];
          for (const attr of attrs) {
            if (
              attr.startsWith('html') ||
              attr === 'style' ||
              attr === 'class' ||
              attr === 'alignment'
            ) {
              // Preserve link attributes on block level if any
              if (attr === 'htmlA') continue;
              writer.removeAttribute(attr, block);
            }
          }
        }
      });

      editor.editing.view.focus();
    });

    return view;
  });
}

// Custom plugin to add a button that inserts the "Reviewed by Matt Hogan" widget
function InsertReviewedByPlugin(editor: any) {
  editor.ui.componentFactory.add('insertReviewedBy', (locale: any) => {
    const view = new ButtonView(locale);

    view.set({
      label: 'Reviewed By Block',
      withText: true,
      tooltip: 'Insert "Reviewed by Matt Hogan" snippet',
      class: 'ck-button-insert-reviewed-by',
    });

    view.on('execute', () => {
      const htmlString =
        '<div style="background-color: #6b0f1a; border: 2px solid #dfb025; padding: 18px 24px; border-radius: 6px; margin: 25px auto; font-family: sans-serif; max-width: 750px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; text-align: center;">' +
        '<p style="color: #dfb025; font-size: 15px; line-height: 1.5; margin: 0; font-weight: 600; letter-spacing: 0.02em; width: 100%;">' +
        'Reviewed by Matt Hogan — Founder, Hogani Jets &amp; Aviation Specialist.' +
        '</p>' +
        '</div>' +
        '<p>&nbsp;</p>';

      const viewFragment = editor.data.processor.toView(htmlString);
      const modelFragment = editor.data.toModel(viewFragment);

      editor.model.change((writer: any) => {
        const insertedRange = editor.model.insertContent(modelFragment);
        if (insertedRange) {
          writer.setSelection(insertedRange.end);
        }
      });

      editor.editing.view.focus();
    });

    return view;
  });
}

// Custom plugin to add a button that inserts the "Matt's Recommendation" widget
function InsertRecommendationPlugin(editor: any) {
  editor.ui.componentFactory.add('insertRecommendation', (locale: any) => {
    const view = new ButtonView(locale);

    view.set({
      label: 'Matt Recommendation',
      withText: true,
      tooltip: 'Insert "Matt\'s Recommendation" snippet',
      class: 'ck-button-insert-recommendation',
    });

    view.on('execute', () => {
      const htmlString =
        '<div style="background-color:#ffffff;border-bottom-color:#e5e7eb;border-bottom-width:1px;border-left-color:#00171f;border-left-width:4px;border-radius:0px 8px 8px 0px;border-right-color:#e5e7eb;border-right-width:1px;border-style:solid;border-top-color:#e5e7eb;border-top-width:1px;box-shadow:0 1px 3px rgba(0,0,0,0.05);font-family:sans-serif;margin:20px 0;padding:24px;">' +
        '<h4 style="align-items:center;color:#00171f;display:flex;font-size:16px;letter-spacing:0.05em;margin:0 0 10px;text-transform:uppercase;">' +
        "<strong>Matt's Recommendation</strong>" +
        '</h4>' +
        '<p style="color:#374151;font-size:15px;font-weight:400;line-height:1.6;margin:0;">' +
        'Bimini is the one I recommend for clients who want the Bahamas without committing a full day to travel. You can be fishing the Gulf Stream within an hour of leaving Miami. It is the classic weekend run, and the fishing heritage here is the real deal, this is where Hemingway fished. For a quick getaway or a serious fishing trip, nothing else in the Bahamas is this close or this easy to reach.' +
        '</p>' +
        '</div>' +
        '<p>&nbsp;</p>';

      const viewFragment = editor.data.processor.toView(htmlString);
      const modelFragment = editor.data.toModel(viewFragment);

      editor.model.change((writer: any) => {
        const insertedRange = editor.model.insertContent(modelFragment);
        if (insertedRange) {
          writer.setSelection(insertedRange.end);
        }
      });

      editor.editing.view.focus();
    });

    return view;
  });
}

const BRAND_COLORS = [
  { color: '#6B0F1A', label: 'Dark Red (Brand)' },
  { color: '#E0B125', label: 'Gold (Brand)' },
  { color: '#f3e6df', label: 'Light Gold' },
  { color: 'hsl(0, 0%, 0%)', label: 'Black' },
  { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
  { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
  { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
  { color: 'hsl(0, 0%, 100%)', label: 'White' },
  { color: 'hsl(0, 75%, 60%)', label: 'Red' },
  { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
  { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
  { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
  { color: 'hsl(120, 75%, 60%)', label: 'Green' },
  { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
  { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
  { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
  { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
  { color: 'hsl(270, 75%, 60%)', label: 'Purple' },
];

// ─────────────────────────────────────────────────────────────────────────────

interface CKEditorBlockProps {
  content?: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
  isDark?: boolean;
  primaryColor?: string;
}

// ─── Full toolbar definition ──────────────────────────────────────────────────

const TOOLBAR_ITEMS = [
  'undo',
  'redo',
  '|',
  'showBlocks',
  'sourceEditing',
  'findAndReplace',
  'selectAll',
  '|',
  'style',
  'heading',
  '|',
  'fontSize',
  'fontFamily',
  'fontColor',
  'fontBackgroundColor',
  '|',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'subscript',
  'superscript',
  'code',
  'clearFormatting',
  'insertReviewedBy',
  'insertRecommendation',
  '|',
  'specialCharacters',
  'horizontalLine',
  'pageBreak',
  '|',
  'link',
  'insertImage', // ← opens panel with both Upload + URL tabs
  'mediaEmbed',
  'insertTable',
  'highlight',
  'blockQuote',
  'codeBlock',
  'htmlEmbed',
  '|',
  'alignment',
  '|',
  'bulletedList',
  'numberedList',
  'todoList',
  'outdent',
  'indent',
];

// ─────────────────────────────────────────────────────────────────────────────

const CKEditorBlock = ({
  content,
  onChange,
  placeholder,
  disabled = false,
}: CKEditorBlockProps) => {
  const editorRef = useRef<any>(null);
  const ignoreNextSync = useRef(false);

  // Sync external content without clobbering user edits
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || content === undefined) return;
    if (ignoreNextSync.current) {
      ignoreNextSync.current = false;
      return;
    }
    if (content !== editor.getData()) {
      editor.setData(content ?? '');
    }
  }, [content]);

  const handleReady = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      if (content) editor.setData(content);
      if (disabled) editor.enableReadOnlyMode('prop-disabled');

      // ── Set sticky toolbar offset = actual admin header height ───────────────
      // The admin AppBar uses position:sticky so its height shifts with padding.
      // We measure the real rendered height and pass it to CKEditor's StickyPanel
      // so the toolbar stops exactly below the header when editing.
      try {
        // The header is the first nav[role] in the page (MUI AppBar renders as <header>)
        const adminHeader =
          document.querySelector<HTMLElement>('header') ||
          document.querySelector<HTMLElement>('nav[role="navigation"]') ||
          document.querySelector<HTMLElement>('.MuiAppBar-root');
        const headerH = adminHeader ? adminHeader.getBoundingClientRect().height : 0;
        if (headerH > 0) {
          editor.ui.viewportOffset = { top: Math.ceil(headerH) };
        }
      } catch {
        // Ignore if viewportOffset cannot be set
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChange = useCallback(
    (_event: any, editor: any) => {
      ignoreNextSync.current = true;
      onChange(editor?.getData());
    },
    [onChange],
  );

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        // ── ✅ FREE open-source GPL license ────────────────────────────────
        licenseKey: 'GPL',

        // ── ✅ Sticky toolbar offset — matches the fixed admin AppBar height ──
        // CKEditor's built-in StickyPanel positions the toolbar when the editor
        // is focused. Without this, it sticks at top:0 and hides under the nav.
        // The actual value is set dynamically in handleReady after measuring the
        // real header height from the DOM.
        ui: { viewportOffset: { top: 0 } },

        // ── ✅ Base64 upload adapter — enables "Upload from computer" ──────
        extraPlugins: [
          Base64UploaderPlugin,
          PasteSanitizerPlugin,
          ClearFormattingPlugin,
          InsertReviewedByPlugin,
          InsertRecommendationPlugin,
        ],

        plugins: [
          Essentials,
          Paragraph,
          Heading,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          Subscript,
          Superscript,
          Code,
          CodeBlock,
          BlockQuote,
          Link,
          AutoLink,
          List,
          ListProperties,
          TodoList,
          Alignment,
          Indent,
          IndentBlock,
          FontSize,
          FontFamily,
          FontColor,
          FontBackgroundColor,
          Highlight,
          // ── All image plugins needed for upload + URL insert ────────────
          Image,
          ImageCaption,
          ImageInsert, // ← renders the unified insert panel (Upload + URL)
          ImageInsertViaUrl, // ← enables the "Via URL" tab inside the panel
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload, // ← enables the "Upload from computer" tab
          AutoImage, // ← auto-embeds pasted image URLs
          AutoMediaEmbed, // ← auto-embeds pasted media URLs
          LinkImage,
          // ───────────────────────────────────────────────────────────────
          Table,
          TableToolbar,
          TableCaption,
          TableCellProperties,
          TableProperties,
          TableColumnResize,
          MediaEmbed,
          HorizontalLine,
          RemoveFormat,
          FindAndReplace,
          SelectAll,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          PasteFromOffice,
          TextTransformation,
          ShowBlocks,
          SourceEditing,
          GeneralHtmlSupport,
          HtmlEmbed,
          HtmlComment,
          PageBreak,
          Style,
        ],

        toolbar: {
          items: TOOLBAR_ITEMS,
          shouldNotGroupWhenFull: false,
        },

        placeholder: placeholder ?? 'Write something…',

        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
          ],
        },

        style: {
          definitions: [
            { name: 'Width 100%', element: 'figure', classes: ['width-100'] },
            { name: 'Width 75%', element: 'figure', classes: ['width-75'] },
            { name: 'Width 50%', element: 'figure', classes: ['width-50'] },
            { name: 'Width 25%', element: 'figure', classes: ['width-25'] },
            { name: 'Width 100%', element: 'iframe', classes: ['width-100'] },
            { name: 'Width 75%', element: 'iframe', classes: ['width-75'] },
            { name: 'Width 50%', element: 'iframe', classes: ['width-50'] },
            { name: 'Width 25%', element: 'iframe', classes: ['width-25'] },
            { name: 'Width 100%', element: 'div', classes: ['width-100'] },
            { name: 'Width 75%', element: 'div', classes: ['width-75'] },
            { name: 'Width 50%', element: 'div', classes: ['width-50'] },
            { name: 'Width 25%', element: 'div', classes: ['width-25'] },
          ],
        },

        fontFamily: {
          // options: ['default', 'Cormorant', 'Google Sans', 'sans-serif'],
          options: ['default', 'Cormorant', 'Lato', 'sans-serif'],
          supportAllValues: false,
        },

        fontSize: {
          options: [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 26, 28, 30, 32, 36, 40, 48, 56,
            64, 72,
          ],
          supportAllValues: true,
        },

        fontColor: {
          colors: BRAND_COLORS,
          columns: 5,
        },

        fontBackgroundColor: {
          colors: BRAND_COLORS,
          columns: 5,
        },

        highlight: {
          options: [
            {
              model: 'yellowMarker',
              class: 'marker-yellow',
              title: 'Yellow Marker',
              color: 'var(--ck-highlight-marker-yellow)',
              type: 'marker' as const,
            },
            {
              model: 'greenMarker',
              class: 'marker-green',
              title: 'Green Marker',
              color: 'var(--ck-highlight-marker-green)',
              type: 'marker' as const,
            },
            {
              model: 'pinkMarker',
              class: 'marker-pink',
              title: 'Pink Marker',
              color: 'var(--ck-highlight-marker-pink)',
              type: 'marker' as const,
            },
            {
              model: 'blueMarker',
              class: 'marker-blue',
              title: 'Blue Marker',
              color: 'var(--ck-highlight-marker-blue)',
              type: 'marker' as const,
            },
            {
              model: 'redPen',
              class: 'pen-red',
              title: 'Red Pen',
              color: 'var(--ck-highlight-pen-red)',
              type: 'pen' as const,
            },
            {
              model: 'greenPen',
              class: 'pen-green',
              title: 'Green Pen',
              color: 'var(--ck-highlight-pen-green)',
              type: 'pen' as const,
            },
          ],
        },

        link: {
          decorators: {
            openInNewTab: {
              mode: 'manual' as const,
              label: 'Open in a new tab',
              defaultValue: true,
              attributes: { target: '_blank', rel: 'noopener noreferrer' },
            },
            toggleDownloadable: {
              mode: 'manual' as const,
              label: 'Downloadable',
              attributes: { download: 'file' },
            },
          },
        },

        // ── Image config — both upload and URL modes enabled ────────────────
        image: {
          insert: {
            // 'auto' shows both Upload tab and URL tab in the insert panel
            type: 'auto' as const,
          },
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
            '|',
            'linkImage',
          ],
          resizeOptions: [
            { name: 'resizeImage:original', label: 'Default image width', value: null },
            { name: 'resizeImage:25', label: '25% page width', value: '25' },
            { name: 'resizeImage:50', label: '50% page width', value: '50' },
            { name: 'resizeImage:75', label: '75% page width', value: '75' },
          ],
        },

        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties',
            'toggleTableCaption',
          ],
          tableProperties: {
            backgroundColors: BRAND_COLORS,
            borderColors: BRAND_COLORS,
          },
          tableCellProperties: {
            backgroundColors: BRAND_COLORS,
            borderColors: BRAND_COLORS,
          },
        },

        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },

        codeBlock: {
          languages: [
            { language: 'plaintext', label: 'Plain text' },
            { language: 'javascript', label: 'JavaScript' },
            { language: 'typescript', label: 'TypeScript' },
            { language: 'python', label: 'Python' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            { language: 'json', label: 'JSON' },
            { language: 'bash', label: 'Bash / Shell' },
            { language: 'sql', label: 'SQL' },
            { language: 'java', label: 'Java' },
            { language: 'csharp', label: 'C#' },
            { language: 'php', label: 'PHP' },
            { language: 'ruby', label: 'Ruby' },
            { language: 'go', label: 'Go' },
            { language: 'rust', label: 'Rust' },
          ],
        },

        alignment: {
          options: [
            { name: 'left' as const },
            { name: 'center' as const },
            { name: 'right' as const },
            { name: 'justify' as const },
          ],
        },

        htmlSupport: {
          allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
        },

        mediaEmbed: {
          previewsInData: true,
        },
      }}
      data={content ?? ''}
      onReady={handleReady}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default CKEditorBlock;
