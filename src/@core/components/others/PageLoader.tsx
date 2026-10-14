import styled from '@emotion/styled';
import { Box, SxProps, Theme } from '@mui/material';
import Image from 'next/image';

import assest from '../../../../json/assest';

export const LoaderWrapper = styled(Box)`
  background-color: #f8f4dc;
  display: flex;
  align-items: center;
  justify-content: center;

  .loaderWrapper {
    position: relative;
    display: inline-block;
  }

  .brandLogo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .lds-dual-ring {
    display: inline-block;
    // width: 150px;
    // height: 150px;
  }

  .lds-dual-ring:after {
    content: ' ';
    display: block;
    width: 100px;
    height: 100px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid transparent;
    border-color: #6b0f1aeb transparent #6b0f1aeb transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const PageLoader = ({
  wrapperCls,
  sx,
}: {
  wrapperCls?: string;
  sx?: SxProps<Theme> | undefined;
}) => {
  return (
    <LoaderWrapper className={wrapperCls} sx={{ ...sx }}>
      <Box className="loaderWrapper">
        <div className="lds-dual-ring" />
        <Image
          src={assest.hoganiJetslogoGolden}
          width={45}
          height={45}
          alt="Logo"
          className="brandLogo"
        />
      </Box>
    </LoaderWrapper>
  );
};

export default PageLoader;
