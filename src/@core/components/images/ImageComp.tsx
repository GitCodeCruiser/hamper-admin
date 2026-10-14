'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';
import assest from '../../../../json/assest';

import AvatarFallBackImage from './AvatarFallBackImage';
import { isBase64Image } from './isBase64Image';

import { mediaUrl } from '@/api/endpoints';
import { cn } from '@/lib/utils';

import { Avatar } from '@mui/material';

type ImageCompProps = {
  img?: string | null;
  alt?: string;
  errorImage?: string;
  isImagePreview?: boolean;
  imagePreviewTitle?: string;
  isAvatar?: boolean;
  size?: number; // avatar size
  className?: string;
  bucketName?: string;
  [key: string]: unknown;
};

const ImageComp = ({
  img = '',
  alt = '?',
  isImagePreview = false,
  imagePreviewTitle,
  isAvatar = false,
  size = 40,
  className,
  bucketName,
  ...rest
}: ImageCompProps) => {
  // compute src
  const hasImage = img && img.trim() !== '';

  const src = hasImage ? (isBase64Image(img!) ? img! : mediaUrl(img!, 'admin')) : ''; // empty means fallback

  const fallbackLetter = alt?.charAt(0)?.toUpperCase() || '?';

  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageURI, setImageURI] = useState(src);

  useEffect(() => {
    setImageURI(src);
  }, [src]);

  const handleError = useCallback(() => {
    setImageURI(''); // this will trigger fallback avatar instead of broken image
  }, []);

  const handlePreviewOpen = useCallback(() => {
    if (isImagePreview && hasImage) setPreviewOpen(true);
  }, [isImagePreview, hasImage]);

  const handlePreviewClose = useCallback(() => {
    setPreviewOpen(false);
  }, []);

  const PreviewLightbox = (
    <>
      {previewOpen && (
        <Lightbox
          open={previewOpen}
          close={handlePreviewClose}
          slides={[{ src: imageURI ?? '' }]}
          render={{ buttonPrev: () => null, buttonNext: () => null }}
          controller={{ closeOnBackdropClick: true }}
        />
      )}

      {imagePreviewTitle && previewOpen && (
        <div className="mt-2 flex justify-center">
          <p className="text-base font-semibold">{imagePreviewTitle}</p>
        </div>
      )}
    </>
  );

  // ----------------------------
  // AVATAR MODE
  // ----------------------------
  if (isAvatar) {
    return (
      <div className={isImagePreview && src !== '' ? 'cursor-pointer' : 'cursor-default'}>
        <Avatar
          key={src || alt}
          className={cn('border', className)}
          style={{ width: size, height: size }}
          onClick={handlePreviewOpen}
        >
          {/* Automatically fallback to AvatarFallback if no image */}
          {hasImage && imageURI ? (
            <Avatar
              src={imageURI}
              alt={alt}
              className="object-cover"
              // loading="lazy"
              onError={handleError}
            />
          ) : (
            <AvatarFallBackImage content={fallbackLetter} />
          )}
        </Avatar>

        {PreviewLightbox}
      </div>
    );
  }

  // ----------------------------
  // DEFAULT IMAGE MODE
  // ----------------------------
  if (!hasImage || !imageURI) {
    return <AvatarFallBackImage content={fallbackLetter} />;
  }

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div
        className={isImagePreview ? 'cursor-pointer' : 'cursor-default'}
        onClick={handlePreviewOpen}
      >
        <Image
          src={imageURI}
          alt={alt}
          // fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={assest.blurImgSkeleton}
          loading="lazy"
          onError={handleError}
          {...rest}
        />

        {PreviewLightbox}
      </div>
    </div>
  );
};

export default ImageComp;
