import { Box, Stack, styled, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import assest from '../../../../json/assest';

import MuiModalWrapper from '@/ui/Modal/MuiModalWrapper';

type ImgCompProps = {
  src: string;
  errorImage?: string;
  [key: string]: unknown;
  isImagePreview?: boolean;
  imagePreviewTitle?: string;
  isAutoClose?: boolean;
  isAvatar?: boolean;
};

const ImgComp = ({
  src,
  errorImage = assest?.noImage,
  isImagePreview = false,
  isAutoClose = false,
  imagePreviewTitle,
  isAvatar = false,
  ...rest
}: ImgCompProps) => {
  const [imagePreviewEnabled, setImagePreviewEnabled] = useState(false);
  const [imageURI, setImageURI] = useState(src);

  const openImagePreviewHandler = useCallback(() => {
    setImagePreviewEnabled(true);
  }, [setImagePreviewEnabled]);

  const closeImagePreviewHandler = useCallback(() => {
    setImagePreviewEnabled(false);
  }, [setImagePreviewEnabled]);

  const handleImageError = useCallback(() => {
    setImageURI(errorImage);
  }, [setImageURI]);

  useMemo(() => {
    setImageURI(src);
  }, [src]);

  return (
    <>
      <Image
        src={imageURI}
        alt={imageURI}
        onError={handleImageError}
        blurDataURL={assest?.blurImageSkelton}
        placeholder="blur"
        loading="lazy"
        {...rest}
        onClick={() => (isImagePreview ? openImagePreviewHandler() : () => {})}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          ...(isAvatar && {
            borderRadius: '50%',
            aspectRatio: '1/1',
          }),
        }}
      />

      <MuiModalWrapper
        open={imagePreviewEnabled}
        onClose={closeImagePreviewHandler}
        isAutoClose={isAutoClose}
        maxWidth="lg"
      >
        <CommonModalContentWrap>
          <Stack direction="row" alignItems="center" className="headStack" flexDirection="column">
            {imagePreviewTitle && (
              <Typography sx={{ textAlign: 'center' }}>{imagePreviewTitle}</Typography>
            )}
            <Box className="wrapper_imgBox">
              <Image
                src={imageURI}
                alt={imageURI}
                onError={handleImageError}
                blurDataURL={assest?.blurImageSkelton}
                placeholder="blur"
                loading="lazy"
                {...rest}
                onClick={closeImagePreviewHandler}
              />
            </Box>
          </Stack>
        </CommonModalContentWrap>
      </MuiModalWrapper>
    </>
  );
};

export default ImgComp;

export const CommonModalContentWrap = styled(Box)`
  .btnStack {
    gap: 20px;
    margin-top: 20px;
    button {
      padding: 20px;
      min-width: 160px;
      border-radius: 12px;
    }
  }
  .headStack {
    p {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }
  .wrapper_inputFld {
    .MuiFormLabel-root {
      font-weight: 500;
      margin-bottom: 5px;
    }
  }
  .wrapper_imgBox {
    img {
      width: 100%;
      border-radius: 16px;
    }
  }
`;

// export const ModalWrapperMain = styled(Dialog, {
//   shouldForwardProp: (data) => data !== 'paperSize',
// })<{ paperSize?: 'lg' | 'sm' | 'xl' }>`
//   &.cmnModal {
//     .MuiDialog-paper {
//       background: transparent;
//       box-shadow: none;
//       max-width: ${({ paperSize }) =>
//         paperSize === 'lg'
//           ? '685px'
//           : paperSize === 'sm'
//             ? '473px'
//             : paperSize === 'xl'
//               ? '830px'
//               : '100%'};
//       width: 100%;
//       margin: 0 16px;
//       height: auto;
//       overflow-x: hidden;
//       .MuiDialogContent-root {
//         background: #fff;
//         border-radius: 20px;
//         padding: 32px;
//         max-height: 90vh;
//         overflow-y: auto;
//         @media (max-width: 899px) {
//           padding: 30px 19px;
//         }
//       }
//       .btnWrapperModal {
//         margin-bottom: 20px;
//       }
//       .modalCloseBtn {
//         padding: 0;
//         &:hover {
//           opacity: 0.7;
//         }
//       }
//     }
//   }
//   .workingHours {
//     .headStack {
//       margin-bottom: 25px;
//       p {
//         font-size: 20px;
//         font-weight: 600;
//         margin-right: 10px;
//       }
//       span {
//         display: inline-block;
//         background: ${({ theme }) => theme.palette.primary.light};
//         color: ${({ theme }) => theme.palette.primary.main};
//         font-size: 14px;
//         border-radius: 8px;
//         padding: 2px 5px;
//       }
//     }
//     .inputHead {
//       font-weight: 500;
//       margin-bottom: 5px;
//       @media (max-width: 599px) {
//         font-size: 14px;
//       }
//     }
//     .addButton {
//       margin-top: 20px;
//       min-width: 170px;
//       padding: 20px 25px;
//     }
//   }

//   .tabMain_wrapper {
//     .MuiTabs-root {
//       background: ${({ theme }) => theme.palette.primary.light};
//       border: 1px solid ${({ theme }) => theme.palette.primary.light};
//       border-radius: 12px;
//       padding: 24px 70px;
//       .MuiTabs-indicator {
//         display: none;
//       }
//       .MuiTab-root {
//         min-height: auto;
//         padding: 0;
//         text-transform: none;
//         font-size: 16px;
//         color: ${({ theme }) => theme.palette.customColors?.light};
//         font-weight: 600;
//         i {
//           display: inline-flex;
//           margin-right: 6px;
//         }

//         &.Mui-selected {
//           color: ${({ theme }) => theme.palette.customColors?.dark};
//           svg {
//             path {
//               stroke: ${({ theme }) => theme.palette.customColors?.dark};
//             }
//           }
//         }
//         &:not(:last-child) {
//           margin-right: 40px;
//         }
//       }
//       .MuiTabs-flexContainer {
//         justify-content: space-between;
//       }
//     }
//   }
//   .tabContent {
//     margin-top: 24px;
//   }
//   .mobileSelect {
//     background: ${({ theme }) => theme.palette.primary.light} !important;
//     border: 1px solid rgb(240, 247, 255) !important;
//     border-radius: 12px !important;
//     box-shadow: none !important;
//     padding: 18px 10px 18px 20px !important;
//   }
// `;
