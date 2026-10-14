import { Avatar } from '@mui/material';

const AvatarFallBackImage = ({ content }: { content: string }) => {
  return <Avatar>{content}</Avatar>;
};

export default AvatarFallBackImage;
