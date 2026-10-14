'use client';

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Slider,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import { getCroppedImg } from '@/utils/imageUtils';

interface ImageCropperModalProps {
  open: boolean;
  image: string;
  aspectRatio?: number;
  fileName?: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
  targetWidth?: number;
  targetHeight?: number;
}

const ImageCropperModal = ({
  open,
  image,
  aspectRatio = 1000 / 450,
  fileName,
  onClose,
  onCropComplete,
  targetWidth,
  targetHeight,
}: ImageCropperModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [lockAspect, setLockAspect] = useState(true);

  // Reset crop state whenever the image changes (e.g. Next file in crop queue)
  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }, [image]);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteInternal = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Guard against double-clicks / rapid re-invocations
  const isProcessingRef = useRef(false);

  const handleCrop = async () => {
    // Debounce: ignore if a crop is already in-flight
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    try {
      if (croppedAreaPixels && image) {
        // Resolve target dimensions based on aspect ratio if not explicitly provided
        let resolvedTargetWidth = targetWidth;
        let resolvedTargetHeight = targetHeight;

        if (!resolvedTargetWidth || !resolvedTargetHeight) {
          const tolerance = 0.01;
          if (Math.abs(aspectRatio - 1000 / 450) < tolerance) {
            resolvedTargetWidth = 1000;
            resolvedTargetHeight = 450;
          } else if (Math.abs(aspectRatio - 2067 / 743) < tolerance) {
            resolvedTargetWidth = 2067;
            resolvedTargetHeight = 743;
          } else if (Math.abs(aspectRatio - 570 / 741) < tolerance) {
            resolvedTargetWidth = 570;
            resolvedTargetHeight = 741;
          }
        }

        const resolvedFileName = fileName || `cropped-image-${Date.now()}.png`;

        const croppedFile = await getCroppedImg(
          image,
          croppedAreaPixels,
          resolvedFileName,
          resolvedTargetWidth,
          resolvedTargetHeight,
        );
        if (croppedFile) {
          onCropComplete(croppedFile);
          // onClose is intentionally NOT called here; the parent's handleCropComplete
          // advances the crop queue and closes the modal itself via processNextCrop.
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      isProcessingRef.current = false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Crop Image
        <FormControlLabel
          control={
            <Checkbox
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="body2">Lock Aspect Ratio ({aspectRatio.toFixed(2)})</Typography>
          }
        />
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative', width: '100%', height: 400, background: '#333' }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={lockAspect ? aspectRatio : undefined}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
            restrictPosition={false}
            minZoom={0.1}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom variant="body2">
            Zoom
          </Typography>
          <Slider
            value={zoom}
            min={0.1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(_e, newValue) => setZoom(newValue as number)}
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleCrop} variant="contained" color="primary">
          Crop & Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropperModal;
