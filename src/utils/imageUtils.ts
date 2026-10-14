/**
 * Creates an image from a URL.
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * Returns the cropped image as a File.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  fileName: string = 'cropped-image.png',
  targetWidth?: number,
  targetHeight?: number,
): Promise<File | null> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  // Detect mime type from DataURL or URL extension
  let mimeType = 'image/png';
  if (imageSrc.startsWith('data:')) {
    const match = imageSrc.match(/^data:([^;]+);/);
    if (match) {
      mimeType = match[1];
    }
  } else {
    const cleanUrl = imageSrc.split('?')[0].split('#')[0];
    const ext = cleanUrl.split('.').pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg') {
      mimeType = 'image/jpeg';
    } else if (ext === 'webp') {
      mimeType = 'image/webp';
    } else if (ext === 'png') {
      mimeType = 'image/png';
    }
  }

  // set canvas size to match the target size or pixelCrop
  const width = targetWidth || pixelCrop.width;
  const height = targetHeight || pixelCrop.height;
  canvas.width = width;
  canvas.height = height;

  // Fill background
  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = 'white';
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw cropped image scaled to the target size
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    width,
    height,
  );

  // Maximum allowed file size (500KB)
  const MAX_FILE_SIZE = 500 * 1024;

  // Helper: convert canvas to blob at a given quality
  const canvasToBlob = (quality: number): Promise<Blob | null> =>
    new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/webp', quality);
    });

  // Always output as WebP; iteratively reduce quality to stay under 500KB
  let quality = 0.85;
  const MIN_QUALITY = 0.1;
  const QUALITY_STEP = 0.05;

  let blob = await canvasToBlob(quality);

  while (blob && blob.size > MAX_FILE_SIZE && quality > MIN_QUALITY) {
    quality = Math.max(quality - QUALITY_STEP, MIN_QUALITY);
    blob = await canvasToBlob(quality);
  }

  if (!blob) {
    return null;
  }

  const finalFileName = `${fileName.split('.')[0]}.webp`;
  return new File([blob], finalFileName, { type: 'image/webp' });
}
