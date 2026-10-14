import { Avatar, AvatarProps } from '@mui/material';

import assest from '../../../../../../json/assest';

import { mediaUrl } from '@/api/endpoints';
import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

type ProfileAvatarProps = AvatarProps & {
  image?: string | null;
  size?: number;
};

const ProfileAvatar = ({ image, size = 36, ...avatarProps }: ProfileAvatarProps) => (
  <Avatar
    src={image ? mediaUrl(image) : assest.profileImg}
    sx={{
      width: CustomSize(size),
      height: CustomSize(size),
      ...avatarProps.sx,
    }}
    {...avatarProps}
  />
);

export default ProfileAvatar;
