import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

import assest from '../../../json/assest';

const CustomNextImage = (props: ImageProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={props.alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(assest.logo);
      }}
    />
  );
};

export default CustomNextImage;
