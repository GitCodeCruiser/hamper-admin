import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function CrossIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || CustomSize(18)}
      height={IconHeight || CustomSize(18)}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
        stroke={IconColor || '#10212B'}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
