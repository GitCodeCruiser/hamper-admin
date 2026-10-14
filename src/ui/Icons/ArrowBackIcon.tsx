import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function ArrowBackIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || `${CustomSize(18)}`}
      height={IconHeight || `${CustomSize(18)}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 14.25L3.75 9M3.75 9L9 3.75M3.75 9H14.25"
        stroke={IconColor || 'white'}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
