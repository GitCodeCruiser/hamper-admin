'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph } from 'ckeditor5';
import { useCallback, useEffect, useRef } from 'react';

// CKEditor styles required
import 'ckeditor5/ckeditor5.css';

export interface CKEditorPlainTextBlockProps {
  content?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  minHeight?: number;
  disabled?: boolean;
}

const CKEditorPlainTextBlock = ({
  content,
  onChange,
  placeholder,
  disabled = false,
}: CKEditorPlainTextBlockProps) => {
  const editorRef = useRef<any>(null);
  const ignoreNextSync = useRef(false);

  // Helper to convert plain text to CKEditor HTML paragraphs
  const textToHtml = (text: string) => {
    if (!text) return '';
    return text
      .split('\n\n')
      .map((para) => {
        const lineWithBrs = para.replace(/\n/g, '<br>');
        return `<p>${lineWithBrs || '&nbsp;'}</p>`;
      })
      .join('');
  };

  // Sync external content changes back into the editor
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || content === undefined) return;
    if (ignoreNextSync.current) {
      ignoreNextSync.current = false;
      return;
    }
    const htmlContent = textToHtml(content);
    if (htmlContent !== editor.getData()) {
      editor.setData(htmlContent);
    }
  }, [content]);

  const handleReady = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      if (content) {
        editor.setData(textToHtml(content));
      }
      if (disabled) {
        editor.enableReadOnlyMode('prop-disabled');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleChange = useCallback(
    (_event: any, editor: any) => {
      ignoreNextSync.current = true;
      const html = editor.getData();

      // Convert HTML back to plain text with newlines
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;

      // Replace <br> elements with newlines explicitly
      tempDiv.querySelectorAll('br').forEach((br) => {
        br.replaceWith(document.createTextNode('\n'));
      });

      const paragraphs = tempDiv.querySelectorAll('p');
      const paragraphTexts: string[] = [];

      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => {
          const text = p.innerText || p.textContent || '';
          if (text === '\u00A0' || text.trim() === '') {
            paragraphTexts.push('');
          } else {
            paragraphTexts.push(text);
          }
        });
      } else {
        // Fallback if no paragraphs are found
        const text = tempDiv.innerText || tempDiv.textContent || '';
        paragraphTexts.push(text);
      }

      const plainText = paragraphTexts.join('\n\n');
      onChange?.(plainText);
    },
    [onChange],
  );

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        licenseKey: 'GPL',
        plugins: [Essentials, Paragraph],
        toolbar: [],
        placeholder: placeholder ?? 'Write something…',
      }}
      onReady={handleReady}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default CKEditorPlainTextBlock;
