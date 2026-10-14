'use client';

import { Box, Grid, InputLabel } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { mediaUrl } from '@/api/endpoints';
import ImgPreviewMainComp from '@/components/Other/ImgMainComp/ImgPreviewMainComp';
import { TSlidingImageFormItem } from '@/types/apps/aircraft/index.type';
import InputFieldCommon from '@/ui/CommonInput/CommonInput';

interface SlidingImageItemRowProps {
  item: TSlidingImageFormItem;
  index: number;
  onRemove: (index: number) => void;
  onTagChange: (index: number, newTag: string) => void;
  labelPrefix?: string;
}

const SlidingImageItemRow: React.FC<SlidingImageItemRowProps> = React.memo(
  ({ item, index, onRemove, onTagChange, labelPrefix = 'Sliding Image' }) => {
    const [localTag, setLocalTag] = useState<string>(item.tag ?? '');

    useEffect(() => {
      setLocalTag(item.tag ?? '');
    }, [item.tag]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocalTag(val);
        onTagChange(index, val);
      },
      [index, onTagChange],
    );

    const handleDelete = useCallback(
      (shouldDelete: boolean) => {
        if (shouldDelete) {
          onRemove(index);
        }
      },
      [index, onRemove],
    );

    const previewSrc =
      item.previewUrl ||
      (typeof item.image === 'string' ? mediaUrl(item.image) : '');

    return (
      <Box
        sx={{
          p: 2,
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Grid container spacing={2} alignItems="flex-start">
          <Grid size={{ xs: 12, sm: 'auto' }}>
            <ImgPreviewMainComp
              sx={{
                width: '120px !important',
                height: '90px !important',
                marginBottom: '0px !important',
              }}
              src={previewSrc}
              isPreviewOnly={false}
              onDeleteHandler={handleDelete}
              imageSize={item.size ?? null}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 'grow' }}>
            <InputLabel sx={{ color: '#FFFFFF', mb: 1, fontSize: '14px' }}>
              {labelPrefix} {index + 1} Alt Tag*
            </InputLabel>
            <InputFieldCommon
              labelName={`${labelPrefix} ${index + 1} Alt Tag`}
              placeholder={`Enter ${labelPrefix.toLowerCase()} alt tag`}
              value={localTag}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  },
);

SlidingImageItemRow.displayName = 'SlidingImageItemRow';

export default SlidingImageItemRow;
