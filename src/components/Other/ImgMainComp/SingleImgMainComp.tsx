'use client';

import { Box, styled, SxProps, Theme } from '@mui/material';
import { ChangeEvent, DragEvent, JSX, useCallback, useRef, useState } from 'react';

import validationText from '../../../../json/messages/validationText';

import ImageCropperModal from './ImageCropperModal';

import {
  IMAGE_ACCEPT,
  IMAGE_ACCEPT_SIZE,
  IMAGE_ACCEPT_TYPE,
  VIDEO_ACCEPT,
  VIDEO_ACCEPT_TYPE,
} from '@/constant';
import { formatBytes } from '@/lib/functions/validation';
import { FolderTypeEnum, SourceTypeEnum } from '@/types/enums/common.emums';

const SingleImgMainCompWrapper = styled(Box)`
  position: relative;
  .input_div {
    width: 103px;
    height: 103px;
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.customColors.textColor};
    border: 1px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border 0.2s ease;
  }
  .drag-over {
    border: ${({ theme }) => `2px dashed ${theme.palette.customColors.lightPaperBg}`};
  }
  input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  &.dragDropFileSec {
    .input_div {
      width: 100%;
      height: auto;
      padding: 20px;
    }
    .dargDropSc {
      width: 100%;
      text-align: center;
      .iconsec {
        display: table;
        margin: 0 auto;
        margin-bottom: 10px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        line-height: 1.3;
        color: ${({ theme }) => theme.palette.common.white};
      }
      .ulaoderOptions {
        padding: 0;
        margin: 0;
        margin-top: 10px;
        li {
          padding: 0;
          margin: 0;
          display: inline-block;
          width: auto;
          margin-right: 10px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .uploaderInfospn {
    display: inline-block;
    padding: 6px 12px;
    font-size: 12px;
    line-height: 1.3;
    color: ${({ theme }) => theme.palette.error.main};
    background: rgba(220, 43, 49, 0.1);
    border-radius: 50px;

    display: flex;
    align-items: center;
    .iconGllry {
      line-height: 0;
      margin-right: 8px;
    }
  }
`;

type TSingleImgMainCompProps = {
  children: JSX.Element | JSX.Element[];
  accept?: IMAGE_ACCEPT_TYPE | VIDEO_ACCEPT_TYPE;
  multiple?: boolean;
  max?: number;
  className?: string;
  classNameFile?: string;
  sxForBox?: SxProps<Theme> | undefined;
  errorValueGetter?: (errorMessage: string) => void;
  dataValueGetter: (value: File | null) => void;
  loadingValueGetter?: (loading: boolean) => void;
  disabled?: boolean;
  needCrop?: boolean;
  aspectRatio?: number;
  targetWidth?: number;
  targetHeight?: number;
};
const SingleImgMainComp = ({
  accept = IMAGE_ACCEPT,
  children,
  classNameFile,
  multiple = true,
  max = 5,
  sxForBox,
  dataValueGetter,
  errorValueGetter,
  loadingValueGetter,
  disabled,
  needCrop = false,
  aspectRatio = 1000 / 450,
  targetWidth,
  targetHeight,
}: TSingleImgMainCompProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const folderType = FolderTypeEnum.Profile;
  const sourceType = SourceTypeEnum.Web;

  // -----------------------------------------------------
  // const { mutateAsync: uploadFiles, isPending: loading } = useMediaUploadSingleFile({
  //   valueGetter: (value) => {
  //     if (dataValueGetter) {
  //       dataValueGetter(value);
  //     }
  //     if (inputRef.current) {
  //       inputRef.current.value = '';
  //     }
  //   },
  //   errorGetter: (errorMessage) => {
  //     if (errorValueGetter) {
  //       errorValueGetter(errorMessage);
  //     }
  //   },
  //   optionalCallback: () => {},
  //   errorCallback: () => {},
  // });

  // useEffect(() => {
  //   loadingValueGetter?.(loading);
  // }, [loading, loadingValueGetter]);

  // -----------------------------------------------------

  const handleDropImages = useCallback(
    async (e: DragEvent) => {
      e.preventDefault();
      // if (disabled || loading) return;
      setDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = e?.dataTransfer?.files;

        const prevStoreFileLength = 20;
        const fileLength = Math.min(files?.length as number, prevStoreFileLength);

        const filesArray = Array.from({ length: fileLength as number });
        const x: File[] = [];
        filesArray?.map((eFile, eFileIndex) => {
          const file = files?.[eFileIndex];
          if (file) {
            const allowedTypes = [...IMAGE_ACCEPT.split(','), ...VIDEO_ACCEPT.split(',')];

            if (allowedTypes.includes(file?.type)) {
              if (file.size > IMAGE_ACCEPT_SIZE) {
                if (errorValueGetter) {
                  errorValueGetter(`File size must not exceed ${formatBytes(IMAGE_ACCEPT_SIZE)}`);
                }
                return;
              }
              x.push(file);
            } else {
              if (errorValueGetter) {
                errorValueGetter(validationText?.error?.invalidImageFileFormat);
              }
              return;
            }
          }
        });

        if (x.length > 0) {
          if (needCrop && x?.[0] && x?.[0].type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(x?.[0]);
            reader.onload = () => {
              setSelectedImage(reader.result as string);
              setCropperOpen(true);
            };
          } else {
            dataValueGetter(x?.[0] as File);
          }
        }
      }
    },
    [
      disabled,
      // loading,
      errorValueGetter,
      // folderType,
      // sourceType,
      // uploadFiles,
      dataValueGetter,
    ],
  );

  const handleUploadImages = useCallback(
    async (event: ChangeEvent<HTMLInputElement> | FileList) => {
      // if (disabled || loading) return;
      const files = event instanceof FileList ? event : event?.target?.files;

      const prevStoreFileLength = 5;
      const fileLength = Math.min(files?.length as number, prevStoreFileLength);

      if ((files?.length as number) > 1) {
        const filesArray = Array.from({ length: fileLength as number });
        const x: File[] = [];
        filesArray?.map((eFile, eFileIndex) => {
          const file = files?.[eFileIndex];
          if (file) {
            const allowedTypes = [...IMAGE_ACCEPT.split(','), ...VIDEO_ACCEPT.split(',')];

            if (allowedTypes.includes(file?.type)) {
              if (file.size > IMAGE_ACCEPT_SIZE) {
                if (errorValueGetter) {
                  errorValueGetter(`File size must not exceed ${formatBytes(IMAGE_ACCEPT_SIZE)}`);
                }
                return;
              }
              x.push(file);
            } else {
              if (errorValueGetter) {
                errorValueGetter(validationText?.error?.invalidImageFileFormat);
              }
              return;
            }
          }
        });

        if (x.length > 0) {
          // const formData = new FormData();

          // formData.append('file', x?.[0]);

          // await uploadFiles(formData);
          dataValueGetter(x?.[0] as File);

          // await uploadFiles({
          //   files: x,
          //   folder: folderType,
          //   source: sourceType,
          // });
        }
      } else {
        const file = files?.[0];
        if (file) {
          const allowedTypes = [...IMAGE_ACCEPT.split(','), ...VIDEO_ACCEPT.split(',')];

          if (allowedTypes.includes(file?.type)) {
            if (file.size > IMAGE_ACCEPT_SIZE) {
              if (errorValueGetter) {
                errorValueGetter(`File size must not exceed ${formatBytes(IMAGE_ACCEPT_SIZE)}`);
              }
              return;
            }
            if (needCrop && file && file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                setSelectedImage(reader.result as string);
                setCropperOpen(true);
              };
            } else {
              dataValueGetter(file as File);
            }
          } else {
            if (errorValueGetter) {
              errorValueGetter(validationText?.error?.invalidImageFileFormat);
            }
            return;
          }
        }
      }
    },
    [
      disabled,
      // loading,
      errorValueGetter,
      // folderType,
      // sourceType,
      // uploadFiles,
      dataValueGetter,
    ],
  );

  return (
    <SingleImgMainCompWrapper
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDropImages}
      className={classNameFile}
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleUploadImages}
        multiple={multiple}
        max={max}
        disabled={disabled}
      />
      <Box
        className={`input_div ${dragOver ? 'drag-over' : ''}`}
        sx={{
          ...sxForBox,
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        {/* {loading ? <LoaderIcon /> : children} */}
        {children}
      </Box>
      {selectedImage && (
        <ImageCropperModal
          open={cropperOpen}
          image={selectedImage}
          aspectRatio={aspectRatio}
          targetWidth={targetWidth}
          targetHeight={targetHeight}
          onClose={() => {
            setCropperOpen(false);
            if (inputRef.current) inputRef.current.value = '';
          }}
          onCropComplete={(croppedFile) => {
            if (croppedFile.size > IMAGE_ACCEPT_SIZE) {
              if (errorValueGetter) {
                errorValueGetter(
                  `Cropped file size (${formatBytes(croppedFile.size)}) exceeds ${formatBytes(IMAGE_ACCEPT_SIZE)}. Please crop a smaller area.`,
                );
              }
            } else {
              dataValueGetter(croppedFile);
            }
            setCropperOpen(false);
            if (inputRef.current) inputRef.current.value = '';
          }}
        />
      )}
    </SingleImgMainCompWrapper>
  );
};

export default SingleImgMainComp;
