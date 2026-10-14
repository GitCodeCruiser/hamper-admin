'use client';

import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { useState } from 'react';

import CKEditorPlainText from '@/ui/CkEditor/CKEditorPlainText';

export default function EditorTestPage() {
  const [editorValue, setEditorValue] = useState<string>(
    'Hello World!\nThis is a plain text editor.\nTry entering spaces, tabs, and newlines here.',
  );
  const [submittedValue, setSubmittedValue] = useState<string>('');

  const handleSave = () => {
    setSubmittedValue(editorValue);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#D4AF37' }}>
        Plain Text CKEditor Test Page
      </Typography>

      <Card
        sx={{ mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Editor Component (Text/Plain Output)
          </Typography>

          <CKEditorPlainText
            label="Plain Text Input"
            placeholder="Type your plain text content here..."
            content={editorValue}
            onChange={(text) => setEditorValue(text)}
            minHeight={250}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2, backgroundColor: '#D4AF37', '&:hover': { backgroundColor: '#B39230' } }}
          >
            Submit / Save Text
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Real-time Plain Text State (Raw String)
          </Typography>
          <Box
            sx={{
              p: 2,
              backgroundColor: '#000000',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#4AF626',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(editorValue)}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            Submitted Value (Pre-formatted Preview)
          </Typography>
          <Box
            sx={{
              p: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
              fontFamily: 'inherit',
              whiteSpace: 'pre-wrap',
              minHeight: '100px',
              border: '1px dashed rgba(255, 255, 255, 0.2)',
            }}
          >
            {submittedValue || '(Click "Submit / Save Text" to preview saved plain text)'}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
