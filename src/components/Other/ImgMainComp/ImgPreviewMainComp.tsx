'use client';

import { Delete } from '@mui/icons-material';
import { Box, IconButton, styled, SxProps, Theme, Typography } from '@mui/material';
import { useCallback } from 'react';

import ImgComp from '@/@core/components/images/ImgComp';
import { HIGH_QUALITY_IMAGE_DEFINE } from '@/constant';
import { formatBytes } from '@/lib/functions/validation';

export const ImgPreviewMainCompWrap = styled(Box)`
  width: 140px;
  height: 140px;
  background: ${({ theme }) => theme.palette.customColors.textColor};
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  @media (max-width: 479px) {
    width: 120px;
    height: 120px;
  }
  &:hover {
    opacity: 0.7;
  }
  input {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    opacity: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type TImgPreviewMainComp = {
  src: string;
  uniqueKey?: number;
  className?: string;
  sx?: SxProps<Theme>;
  isPreviewOnly: boolean;
  onDeleteHandler: (value: boolean) => void;
  imageSize?: number | null;
};

const ImgPreviewMainComp = ({
  src,
  uniqueKey,
  sx,
  className,
  isPreviewOnly = true,
  onDeleteHandler,
  imageSize,
}: TImgPreviewMainComp) => {
  // console.log(src, '@TEST:::');

  const deleteHandler = useCallback(
    (src: string) => {
      onDeleteHandler(true);
    },
    [onDeleteHandler],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <ImgPreviewMainCompWrap className={className} sx={sx}>
        <ImgComp
          src={src}
          alt={`uploaded-image-${uniqueKey}`}
          width={HIGH_QUALITY_IMAGE_DEFINE?.width}
          height={HIGH_QUALITY_IMAGE_DEFINE?.height}
          isImagePreview={true}
        />

        {!isPreviewOnly && (
          <IconButton
            size="small"
            onClick={() => deleteHandler(src)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            <Delete color="error" />
          </IconButton>
        )}
      </ImgPreviewMainCompWrap>
      {imageSize !== undefined && imageSize !== null && (
        <Typography variant="body2" sx={{ color: '#CCCCCC', fontSize: '12px', mt: 0.5 }}>
          Size: {formatBytes(imageSize)}
        </Typography>
      )}
    </Box>
  );
};

export default ImgPreviewMainComp;
